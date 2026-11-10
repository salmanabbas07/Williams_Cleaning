<?php
/**
 * SMTP Mail Configuration
 * 
 * Provides connection credentials and parameters for PHPMailer.
 * Credentials are read exclusively from environment variables to prevent exposure.
 */

// Ensure configuration and environment are loaded
if (!isset($_ENV['SMTP_USER']) && file_exists(__DIR__ . '/config.php')) {
    require_once __DIR__ . '/config.php';
}

$port = (int)($_ENV['SMTP_PORT'] ?? 465);

// Port 465 uses SSL/SMTPS; port 587 uses STARTTLS
$encryption = $port === 465 ? 'ssl' : 'tls';

return [
    // SMTP Server
    'host'       => $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com',
    'port'       => $port,
    'encryption' => $encryption,
    'auth'       => true,

    // Credentials
    'username'   => $_ENV['SMTP_USER'] ?? '',
    'password'   => $_ENV['SMTP_PASS'] ?? '',

    // Sender Details
    'from_email' => $_ENV['SMTP_FROM_EMAIL'] ?? ($_ENV['SMTP_USER'] ?? 'info.willamscleaning@gmail.com'),
    'from_name'  => $_ENV['SMTP_FROM_NAME'] ?? 'William Cleaning Services',

    // Administrator Inquiries Recipient (As specified in PRD Section 5 & 6)
    'receiver_email' => $_ENV['RECEIVER_EMAIL'] ?? 'info.willamscleaning@gmail.com',
    'receiver_name'  => 'William Cleaning Services Admin',

    // Debugging level: 0 = off, 1 = client commands, 2 = client and server
    // Always keep 0 in production/API mode so SMTP raw conversation is never sent to browser
    'debug'      => 0,
];
