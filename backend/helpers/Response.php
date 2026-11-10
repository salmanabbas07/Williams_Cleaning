<?php
/**
 * JSON Response Helper
 * 
 * Standardizes API responses, sets appropriate Content-Type and HTTP status codes,
 * and ensures responses strictly match the frontend's expected format.
 */

class Response
{
    /**
     * Send a JSON response with the given status code.
     *
     * @param array $payload
     * @param int $statusCode
     * @return void
     */
    public static function json(array $payload, int $statusCode = 200): void
    {
        // Clear any previous output or headers
        if (!headers_sent()) {
            http_response_code($statusCode);
            header('Content-Type: application/json; charset=UTF-8');
            header('Cache-Control: no-cache, no-store, must-revalidate');
            header('Pragma: no-cache');
            header('Expires: 0');
        }

        echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    }

    /**
     * Send a standardized success JSON response.
     *
     * @param string $message
     * @param array $extraData
     * @param int $statusCode
     * @return void
     */
    public static function success(string $message, array $extraData = [], int $statusCode = 200): void
    {
        $payload = array_merge([
            'success' => true,
            'message' => $message,
        ], $extraData);

        self::json($payload, $statusCode);
    }

    /**
     * Send a standardized error JSON response.
     *
     * @param string $message
     * @param int $statusCode
     * @param array|null $errors
     * @return void
     */
    public static function error(string $message, int $statusCode = 400, ?array $errors = null): void
    {
        $payload = [
            'success' => false,
            'message' => $message,
        ];

        if ($errors !== null && count($errors) > 0) {
            $payload['errors'] = $errors;
        }

        self::json($payload, $statusCode);
    }
}
