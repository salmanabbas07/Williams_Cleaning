<?php
/**
 * Application Entry Point (Front Controller)
 * 
 * Intercepts all incoming requests, sets security headers, manages CORS negotiations,
 * parses JSON/form bodies safely, and forwards execution to the API Router.
 */

// Handle PHP CLI built-in web server static files
if (php_sapi_name() === 'cli-server') {
    $file = __DIR__ . parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
    if (is_file($file)) {
        return false;
    }
}

// 1. Autoload vendor dependencies
require_once __DIR__ . '/vendor/autoload.php';

// 2. Load application configuration
$config = require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/helpers/Response.php';

// 3. Security Headers (Equivalent to Helmet in Node.js)
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: SAMEORIGIN');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

// 4. CORS Negotiation
$incomingOrigin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = $config['allowed_origins'] ?? ['http://localhost:5173'];
$originAllowed = false;
$echoOrigin = '';

if ($incomingOrigin === '') {
    // Non-browser requests (e.g. curl, Postman, automated tests) without Origin header
    $originAllowed = true;
    $echoOrigin = '*';
} elseif (in_array('*', $allowedOrigins, true)) {
    $originAllowed = true;
    $echoOrigin = $incomingOrigin;
} elseif (in_array($incomingOrigin, $allowedOrigins, true)) {
    $originAllowed = true;
    $echoOrigin = $incomingOrigin;
}

if ($originAllowed) {
    if ($incomingOrigin !== '') {
        header("Access-Control-Allow-Origin: {$echoOrigin}");
        header('Access-Control-Allow-Credentials: true');
    } else {
        header("Access-Control-Allow-Origin: *");
    }
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Access-Control-Max-Age: 86400');
} else {
    // Preflight or request blocked by CORS
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(403);
        exit;
    }
    Response::error("CORS policy blocked access from origin: {$incomingOrigin}", 403);
    exit;
}

// Handle CORS OPTIONS Preflight
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// 5. Safe Request Body Parsing (10KB limit matches original Node.js parser)
$requestData = [];
$contentType = $_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '';

if (str_contains($contentType, 'application/json')) {
    $rawInput = file_get_contents('php://input');

    if (strlen($rawInput) > 10240) {
        Response::error('Payload Too Large. Telo zahteve presega dovoljeno velikost 10KB.', 413);
        exit;
    }

    if (trim($rawInput) !== '') {
        $parsed = json_decode($rawInput, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            Response::error('Neveljavna oblika JSON podatkov (Invalid JSON format).', 400);
            exit;
        }
        if (is_array($parsed)) {
            $requestData = $parsed;
        }
    }
} else {
    $requestData = $_POST;
}

// 6. Dispatch Request to Router
require_once __DIR__ . '/routes/api.php';
Router::dispatch($config, $requestData);
