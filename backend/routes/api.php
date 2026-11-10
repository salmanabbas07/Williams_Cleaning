<?php
/**
 * API Router
 * 
 * Maps HTTP methods and request paths to appropriate controllers and handlers.
 * Normalizes base paths to support root deployment, subdirectories, and Apache rewrites.
 */

require_once dirname(__DIR__) . '/helpers/Response.php';
require_once dirname(__DIR__) . '/helpers/RateLimiter.php';
require_once dirname(__DIR__) . '/controllers/InquiryController.php';

class Router
{
    /**
     * Dispatch the current request.
     *
     * @param array $config Application configuration
     * @param array $requestData Parsed request payload
     * @return void
     */
    public static function dispatch(array $config, array $requestData): void
    {
        $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $uri = $_SERVER['REQUEST_URI'] ?? '/';
        $path = parse_url($uri, PHP_URL_PATH) ?: '/';

        // Normalize base path for subfolder deployments (e.g., /backend/api/health)
        $scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
        $scriptDir = rtrim(str_replace('\\', '/', dirname($scriptName)), '/');

        if ($scriptDir !== '' && str_starts_with($path, $scriptDir)) {
            $path = substr($path, strlen($scriptDir));
        }

        // If path begins with /index.php, strip it
        if (str_starts_with($path, '/index.php')) {
            $path = substr($path, strlen('/index.php'));
        }

        $path = '/' . trim($path, '/');
        if ($path === '//') {
            $path = '/';
        }

        // Apply global rate limiting for all /api endpoints
        if (str_starts_with($path, '/api')) {
            $globalLimit = RateLimiter::check(
                'global',
                $config['rate_limit']['global_max'] ?? 100,
                $config['rate_limit']['global_window'] ?? 900
            );

            if (!$globalLimit['allowed']) {
                if (!headers_sent()) {
                    header("Retry-After: {$globalLimit['retry_after']}");
                }
                Response::error(
                    'Preveč zahtev. Prosimo, poskusite kasneje (Too many requests, please try again later).',
                    429
                );
                return;
            }
        }

        // 1. Root Welcome Route
        if ($method === 'GET' && $path === '/') {
            Response::json([
                'success'         => true,
                'message'         => 'William Cleaning Services Backend is running.',
                'healthCheck'     => '/api/health',
                'inquiryEndpoint' => 'POST /api/inquiry/send',
            ], 200);
            return;
        }

        // 2. Health Check Endpoint
        if ($method === 'GET' && $path === '/api/health') {
            // Calculate server uptime approximation or system info
            $timestamp = (new DateTime('now', new DateTimeZone('UTC')))->format('Y-m-d\TH:i:s\Z');
            Response::json([
                'success'   => true,
                'service'   => 'William Cleaning Services Backend API',
                'status'    => 'UP',
                'timestamp' => $timestamp,
            ], 200);
            return;
        }

        // 3. Customer Inquiry Submissions
        // Supports both POST /api/inquiry/send and POST /api/inquiry alias
        if ($method === 'POST' && ($path === '/api/inquiry/send' || $path === '/api/inquiry')) {
            InquiryController::handleSend($requestData);
            return;
        }

        // 4. Fallback 404 Route Handler
        Response::error("Pot {$path} ne obstaja (Endpoint not found).", 404);
    }
}
