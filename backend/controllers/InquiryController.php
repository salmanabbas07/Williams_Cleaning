<?php
/**
 * Inquiry Controller
 * 
 * Handles incoming customer inquiry requests, invokes validation, applies rate limiting,
 * coordinates email sending via EmailService, and returns compliant JSON responses.
 */

require_once dirname(__DIR__) . '/helpers/Response.php';
require_once dirname(__DIR__) . '/helpers/Validator.php';
require_once dirname(__DIR__) . '/helpers/RateLimiter.php';
require_once dirname(__DIR__) . '/services/EmailService.php';

class InquiryController
{
    /**
     * Process an inquiry submission.
     *
     * @param array $input Request payload
     * @return void
     */
    public static function handleSend(array $input): void
    {
        // 1. Rate Limiter check (5 submissions per 15 minutes per IP)
        $rateCheck = RateLimiter::check('inquiry', 5, 900);
        if (!$rateCheck['allowed']) {
            if (!headers_sent()) {
                header("Retry-After: {$rateCheck['retry_after']}");
            }
            Response::error(
                'Prejeli smo preveč povpraševanj iz vašega naslova. Prosimo, poskusite znova čez 15 minut (Too many requests, please try again later).',
                429
            );
            return;
        }

        // 2. Server-side validation
        $validation = Validator::validateInquiry($input);
        if (!$validation['isValid']) {
            $firstErrorMessage = $validation['errors'][0]['message'];
            Response::error($firstErrorMessage, 400, $validation['errors']);
            return;
        }

        // 3. Google reCAPTCHA verification
        $captchaToken = isset($input['captchaToken']) && is_string($input['captchaToken']) ? trim($input['captchaToken']) : '';
        if (empty($captchaToken)) {
            Response::error(
                'Prosimo, potrdite, da niste robot (reCAPTCHA is required).',
                400,
                [['field' => 'captcha', 'message' => 'Prosimo, potrdite, da niste robot.']]
            );
            return;
        }

        $recaptchaSecret = $_ENV['RECAPTCHA_SECRET_KEY'] ?? '';
        if (!empty($recaptchaSecret)) {
            $isHuman = self::verifyRecaptcha($captchaToken, $recaptchaSecret);
            if (!$isHuman) {
                Response::error(
                    'Preverjanje reCAPTCHA ni uspelo. Prosimo, poskusite znova (reCAPTCHA verification failed).',
                    400,
                    [['field' => 'captcha', 'message' => 'Preverjanje reCAPTCHA ni uspelo.']]
                );
                return;
            }
        }

        // 4. Deliver email via EmailService
        $sendResult = EmailService::sendInquiry($validation['data']);

        if ($sendResult['success']) {
            Response::success($sendResult['message'], [], 200);
        } else {
            Response::error($sendResult['message'], $sendResult['statusCode']);
        }
    }

    /**
     * Verify Google reCAPTCHA v2 token with Google servers.
     *
     * @param string $token Captcha response token from client
     * @param string $secretKey Secret key from Google reCAPTCHA console
     * @return bool True if valid human response, false otherwise
     */
    private static function verifyRecaptcha(string $token, string $secretKey): bool
    {
        $url = 'https://www.google.com/recaptcha/api/siteverify';
        $postData = http_build_query([
            'secret'   => $secretKey,
            'response' => $token,
            'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ]);

        $response = null;

        if (function_exists('curl_init')) {
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 10);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
            $response = curl_exec($ch);
            curl_close($ch);
        } else {
            $options = [
                'http' => [
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                    'method'  => 'POST',
                    'content' => $postData,
                    'timeout' => 10,
                ],
            ];
            $context = stream_context_create($options);
            $response = @file_get_contents($url, false, $context);
        }

        if (!$response) {
            return false;
        }

        $result = json_decode($response, true);
        return isset($result['success']) && $result['success'] === true;
    }
}
