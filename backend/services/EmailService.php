<?php
/**
 * Email Service
 * 
 * Prepares and sends professional customer inquiry emails via PHPMailer using SMTP.
 * Implements HTML escaping, Slovenian localized date formatting, and secure error mapping.
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class EmailService
{
    /**
     * Slovenian labels for subject/service codes.
     */
    private static array $serviceLabels = [
        'hotel-housekeeping'   => 'Hotelsko gospodinjstvo (Hotel Housekeeping)',
        'seasonal-teams'       => 'Sezonske ekipe za čiščenje (Seasonal Cleaning Teams)',
        'temporary-support'    => 'Začasna podpora gospodinjstvu (Temporary Support)',
        'subcontracting'       => 'Prilagodljivo podizvajanje (Subcontracting)',
        'commercial-cleaning'  => 'Poslovno in pisarniško čiščenje (Commercial Cleaning)',
        'specialized-cleaning' => 'Specialno in globinsko čiščenje (Specialized/Deep Cleaning)',
        'other'                => 'Drugo splošno vprašanje (Other / General Inquiry)',
    ];

    /**
     * Format current submission timestamp in Slovenian locale.
     *
     * @return string
     */
    public static function formatSubmissionDate(): string
    {
        $timezone = new DateTimeZone('Europe/Ljubljana');
        $now = new DateTime('now', $timezone);

        if (class_exists('IntlDateFormatter')) {
            $formatter = new IntlDateFormatter(
                'sl_SI',
                IntlDateFormatter::FULL,
                IntlDateFormatter::MEDIUM,
                'Europe/Ljubljana'
            );
            $formatted = $formatter->format($now);
            if ($formatted !== false) {
                return $formatted;
            }
        }

        // Fallback Slovenian date formatting
        $days = [
            1 => 'ponedeljek', 2 => 'torek', 3 => 'sreda', 4 => 'četrtek',
            5 => 'petek', 6 => 'sobota', 7 => 'nedelja',
        ];
        $months = [
            1 => 'januar', 2 => 'februar', 3 => 'marec', 4 => 'april',
            5 => 'maj', 6 => 'junij', 7 => 'julij', 8 => 'avgust',
            9 => 'september', 10 => 'oktober', 11 => 'november', 12 => 'december',
        ];

        $dayOfWeek = $days[(int)$now->format('N')];
        $dayNum = $now->format('j');
        $monthName = $months[(int)$now->format('n')];
        $year = $now->format('Y');
        $time = $now->format('H:i:s');

        return "{$dayOfWeek}, {$dayNum}. {$monthName} {$year} {$time}";
    }

    /**
     * Send inquiry email to administrator.
     *
     * @param array $data Validated customer inquiry data
     * @return array ['success' => bool, 'statusCode' => int, 'message' => string]
     */
    public static function sendInquiry(array $data): array
    {
        $mailConfig = require dirname(__DIR__) . '/config/mail.php';

        $rawName    = $data['name'] ?? '';
        $rawEmail   = $data['email'] ?? '';
        $rawPhone   = $data['phone'] ?? '';
        $rawSubject = $data['subject'] ?? '';
        $rawMessage = $data['message'] ?? '';

        // Safe HTML-escaped content
        $safeName    = htmlspecialchars($rawName, ENT_QUOTES, 'UTF-8');
        $safeEmail   = htmlspecialchars($rawEmail, ENT_QUOTES, 'UTF-8');
        $safePhone   = $rawPhone !== '' ? htmlspecialchars($rawPhone, ENT_QUOTES, 'UTF-8') : 'Ni navedeno (Not provided)';
        $readableSubject = self::$serviceLabels[$rawSubject] ?? htmlspecialchars($rawSubject, ENT_QUOTES, 'UTF-8');
        $safeMessage = nl2br(htmlspecialchars($rawMessage, ENT_QUOTES, 'UTF-8'));

        $formattedDate = self::formatSubmissionDate();
        $receiverEmail = !empty($mailConfig['receiver_email']) ? $mailConfig['receiver_email'] : 'info.willamscleaning@gmail.com';

        // 1. Plain text version
        $phoneText = $rawPhone !== '' ? $rawPhone : 'Ni navedeno';
        $textContent = "Nova stranka je poslala povpraševanje preko spletne strani:\n\n"
            . "Ime in priimek: {$rawName}\n"
            . "E-poštni naslov: {$rawEmail}\n"
            . "Telefonska številka: {$phoneText}\n"
            . "Zadeva / Storitev: {$readableSubject}\n"
            . "Datum in čas oddaje: {$formattedDate}\n\n"
            . "Sporočilo:\n{$rawMessage}";

        // 2. HTML email version
        $htmlContent = <<<HTML
<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <title>Novo povpraševanje stranke</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f8; margin: 0; padding: 24px; color: #333333; }
    .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background-color: #0B4D26; color: #ffffff; padding: 24px 30px; text-align: left; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .header p { margin: 6px 0 0; font-size: 13px; color: #d1fae5; }
    .content { padding: 30px; }
    .info-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .info-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    .info-table td.label { width: 35%; font-weight: 600; color: #475569; background-color: #f8fafc; }
    .info-table td.value { width: 65%; color: #0f172a; }
    .message-box { background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #0B4D26; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #1e293b; margin-top: 8px; }
    .footer { background-color: #f8fafc; padding: 18px 30px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>New Customer Inquiry – William Cleaning Services</h1>
      <p>Novo povpraševanje je bilo oddano preko spletnega obrazca.</p>
    </div>
    <div class="content">
      <table class="info-table">
        <tr>
          <td class="label">Ime in priimek</td>
          <td class="value"><strong>{$safeName}</strong></td>
        </tr>
        <tr>
          <td class="label">E-poštni naslov</td>
          <td class="value"><a href="mailto:{$safeEmail}">{$safeEmail}</a></td>
        </tr>
        <tr>
          <td class="label">Telefonska številka</td>
          <td class="value">{$safePhone}</td>
        </tr>
        <tr>
          <td class="label">Zadeva / Storitev</td>
          <td class="value"><span style="color: #0B4D26; font-weight: 600;">{$readableSubject}</span></td>
        </tr>
        <tr>
          <td class="label">Datum in čas</td>
          <td class="value">{$formattedDate}</td>
        </tr>
      </table>

      <div style="font-weight: 600; font-size: 14px; color: #334155; margin-bottom: 6px;">
        Vsebina sporočila:
      </div>
      <div class="message-box">
        {$safeMessage}
      </div>
    </div>
    <div class="footer">
      To je avtomatsko generirano obvestilo spletne strani William Cleaning Services.<br>
      Če želite odgovoriti stranki, preprosto odgovorite (Reply) na to e-poštno sporočilo.
    </div>
  </div>
</body>
</html>
HTML;

        // Instantiate PHPMailer
        $mail = new PHPMailer(true);

        try {
            // SMTP Settings
            $mail->isSMTP();
            $mail->Host       = $mailConfig['host'];
            $mail->SMTPAuth   = $mailConfig['auth'];
            $mail->Username   = $mailConfig['username'];
            $mail->Password   = $mailConfig['password'];
            $mail->SMTPSecure = $mailConfig['port'] === 465 ? PHPMailer::ENCRYPTION_SMTPS : PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = $mailConfig['port'];
            $mail->CharSet    = 'UTF-8';
            $mail->SMTPDebug  = $mailConfig['debug'];
            $mail->Timeout    = 15; // 15-second socket timeout

            // Sender and Recipient
            $mail->setFrom($mailConfig['from_email'], $mailConfig['from_name']);
            $mail->addAddress($receiverEmail, $mailConfig['receiver_name']);
            $mail->addReplyTo($rawEmail, $rawName);

            // Email Content
            $mail->isHTML(true);
            $mail->Subject = 'New Customer Inquiry – William Cleaning Services';
            $mail->Body    = $htmlContent;
            $mail->AltBody = $textContent;

            // Deliver
            $mail->send();

            return [
                'success'    => true,
                'statusCode' => 200,
                'message'    => 'Your inquiry has been sent successfully.',
            ];
        } catch (Exception $e) {
            $errorInfo = $mail->ErrorInfo ?: $e->getMessage();
            error_log("🚨 [PHPMailer Error]: {$errorInfo}");

            // Map SMTP-specific failures to appropriate HTTP status codes
            $lowerError = strtolower($errorInfo);
            if (
                str_contains($lowerError, 'auth') ||
                str_contains($lowerError, 'password') ||
                str_contains($lowerError, 'credential') ||
                str_contains($lowerError, '535')
            ) {
                return [
                    'success'    => false,
                    'statusCode' => 502,
                    'message'    => 'Napaka pri povezavi z e-poštnim strežnikom (SMTP Authentication failed). Prosimo, preverite SMTP nastavitve v .env.',
                ];
            }

            if (
                str_contains($lowerError, 'timeout') ||
                str_contains($lowerError, 'timed out') ||
                str_contains($lowerError, 'connect() failed') ||
                str_contains($lowerError, 'connection refused')
            ) {
                return [
                    'success'    => false,
                    'statusCode' => 504,
                    'message'    => 'Povezava z e-poštnim strežnikom je potekla (SMTP Connection timeout). Prosimo, poskusite kasneje.',
                ];
            }

            return [
                'success'    => false,
                'statusCode' => 500,
                'message'    => 'Unable to send your inquiry. Please try again.',
            ];
        } catch (\Throwable $e) {
            error_log("🚨 [Unexpected Server Error]: " . $e->getMessage());
            return [
                'success'    => false,
                'statusCode' => 500,
                'message'    => 'Unable to send your inquiry. Please try again.',
            ];
        }
    }
}
