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

        // 3. Deliver email via EmailService
        $sendResult = EmailService::sendInquiry($validation['data']);

        if ($sendResult['success']) {
            Response::success($sendResult['message'], [], 200);
        } else {
            Response::error($sendResult['message'], $sendResult['statusCode']);
        }
    }
}
