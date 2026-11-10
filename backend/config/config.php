<?php
/**
 * Application Configuration & Environment Loader
 * 
 * Loads environment variables from the .env file safely without external dependencies.
 * Configures error handling, logging, timezone, and CORS parameters.
 */

// 1. Safe .env loader function
if (!function_exists('loadEnv')) {
    function loadEnv(string $envFilePath): void {
        if (!file_exists($envFilePath) || !is_readable($envFilePath)) {
            return;
        }

        $lines = file($envFilePath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            // Ignore comments and empty lines
            if ($line === '' || str_starts_with($line, '#')) {
                continue;
            }

            // Split only on the first '=' to allow values to contain '='
            $parts = explode('=', $line, 2);
            if (count($parts) !== 2) {
                continue;
            }

            $key = trim($parts[0]);
            $val = trim($parts[1]);

            // Strip leading/trailing matching quotes
            if (
                (str_starts_with($val, '"') && str_ends_with($val, '"')) ||
                (str_starts_with($val, "'") && str_ends_with($val, "'"))
            ) {
                $val = substr($val, 1, -1);
            }

            // Set in $_ENV, $_SERVER, and putenv if not already defined in environment
            if (!array_key_exists($key, $_ENV)) {
                $_ENV[$key] = $val;
            }
            if (!array_key_exists($key, $_SERVER)) {
                $_SERVER[$key] = $val;
            }
            putenv("{$key}={$val}");
        }
    }
}

// Load .env from backend root
loadEnv(dirname(__DIR__) . '/.env');

// 2. Environment Settings
$appEnv = $_ENV['APP_ENV'] ?? 'development';

// 3. Timezone Setting (Matches original Europe/Ljubljana timezone)
date_default_timezone_set('Europe/Ljubljana');

// 4. Secure Error Reporting Configuration
// Never expose raw PHP notices, warnings, or stack traces in HTTP responses
if ($appEnv === 'production') {
    ini_set('display_errors', '0');
    ini_set('display_startup_errors', '0');
    error_reporting(0);
} else {
    // In development: log all errors, but suppress HTML display to keep JSON responses intact
    ini_set('display_errors', '0');
    ini_set('display_startup_errors', '0');
    error_reporting(E_ALL);
}
ini_set('log_errors', '1');

// 5. Allowed CORS Origins
$frontendUrlEnv = $_ENV['FRONTEND_URL'] ?? 'http://localhost:5173';
$allowedOrigins = array_map('trim', explode(',', $frontendUrlEnv));

return [
    'app_name' => 'William Cleaning Services Backend API',
    'app_env'  => $appEnv,
    'allowed_origins' => $allowedOrigins,
    'rate_limit' => [
        'global_max'       => 100, // 100 requests
        'global_window'    => 900, // 15 minutes (seconds)
        'inquiry_max'      => 5,   // 5 submissions
        'inquiry_window'   => 900, // 15 minutes (seconds)
    ],
    'storage_dir' => dirname(__DIR__) . '/storage',
];
