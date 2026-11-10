<?php
/**
 * File-based Rate Limiter
 * 
 * Provides robust rate limiting without external services (e.g., Redis).
 * Mitigates brute-force and email spam attacks by restricting requests per IP address.
 */

class RateLimiter
{
    /**
     * Get the client's real IP address safely.
     *
     * @return string
     */
    public static function getClientIp(): string
    {
        if (!empty($_SERVER['HTTP_CF_CONNECTING_IP'])) {
            return trim($_SERVER['HTTP_CF_CONNECTING_IP']);
        }
        if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $ips = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);
            return trim($ips[0]);
        }
        return $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    }

    /**
     * Check if the client IP has exceeded the rate limit.
     *
     * @param string $action Identifying key for the endpoint (e.g. 'inquiry', 'global')
     * @param int $maxAttempts Maximum permitted attempts in the window
     * @param int $windowSeconds Time window in seconds
     * @return array ['allowed' => bool, 'remaining' => int, 'retry_after' => int]
     */
    public static function check(string $action, int $maxAttempts = 5, int $windowSeconds = 900): array
    {
        $ip = self::getClientIp();
        $safeIp = preg_replace('/[^a-zA-Z0-9_\-]/', '_', $ip);
        
        // Cache directory
        $storageDir = dirname(__DIR__) . '/storage/cache';
        if (!is_dir($storageDir) || !is_writable($storageDir)) {
            $storageDir = sys_get_temp_dir();
        }

        $cacheFile = $storageDir . "/rl_{$action}_{$safeIp}.json";
        $now = time();
        $timestamps = [];

        if (file_exists($cacheFile)) {
            $content = @file_get_contents($cacheFile);
            if ($content) {
                $decoded = json_decode($content, true);
                if (is_array($decoded)) {
                    // Filter out timestamps outside the active window
                    $cutoff = $now - $windowSeconds;
                    foreach ($decoded as $ts) {
                        if (is_numeric($ts) && $ts > $cutoff) {
                            $timestamps[] = (int)$ts;
                        }
                    }
                }
            }
        }

        // If attempts limit is reached
        if (count($timestamps) >= $maxAttempts) {
            $oldestInWindow = min($timestamps);
            $retryAfter = max(1, ($oldestInWindow + $windowSeconds) - $now);

            return [
                'allowed'     => false,
                'remaining'   => 0,
                'retry_after' => $retryAfter,
            ];
        }

        // Record this attempt
        $timestamps[] = $now;
        @file_put_contents($cacheFile, json_encode($timestamps), LOCK_EX);

        return [
            'allowed'     => true,
            'remaining'   => max(0, $maxAttempts - count($timestamps)),
            'retry_after' => 0,
        ];
    }
}
