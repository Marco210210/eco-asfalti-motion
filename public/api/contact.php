<?php

declare(strict_types=1);

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('X-Content-Type-Options: nosniff');

function respond(int $status, bool $ok, string $message): void
{
    http_response_code($status);
    echo json_encode(
        ['ok' => $ok, 'message' => $message],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

function success_response(string $message): void
{
    $accept = $_SERVER['HTTP_ACCEPT'] ?? '';
    if (stripos($accept, 'application/json') === false) {
        header('Location: ../grazie.html', true, 303);
        exit;
    }

    respond(200, true, $message);
}

function input(string $key): string
{
    $value = $_POST[$key] ?? '';
    return is_string($value) ? trim($value) : '';
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function same_origin_request(): bool
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        return true;
    }

    $originHost = parse_url($origin, PHP_URL_HOST);
    $requestHost = preg_replace('/:\\d+$/', '', $_SERVER['HTTP_HOST'] ?? '');

    return is_string($originHost)
        && $requestHost !== ''
        && hash_equals(strtolower($requestHost), strtolower($originHost));
}

function rate_limit_exceeded(string $clientKey, int $limit = 5, int $window = 600): bool
{
    $path = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR)
        . DIRECTORY_SEPARATOR
        . 'ecoasfalti_contact_'
        . hash('sha256', $clientKey)
        . '.json';
    $handle = @fopen($path, 'c+');

    // The endpoint must keep working even if the shared hosting temp directory
    // is unavailable; the honeypot and timing check remain active.
    if ($handle === false || !flock($handle, LOCK_EX)) {
        if (is_resource($handle)) {
            fclose($handle);
        }
        return false;
    }

    $raw = stream_get_contents($handle);
    $timestamps = json_decode($raw ?: '[]', true);
    $timestamps = is_array($timestamps) ? $timestamps : [];
    $now = time();
    $timestamps = array_values(array_filter(
        $timestamps,
        static fn ($timestamp): bool => is_int($timestamp) && $timestamp > $now - $window
    ));
    $exceeded = count($timestamps) >= $limit;

    if (!$exceeded) {
        $timestamps[] = $now;
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, (string) json_encode($timestamps));
        fflush($handle);
    }

    flock($handle, LOCK_UN);
    fclose($handle);

    return $exceeded;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Metodo non consentito.');
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > 32768) {
    respond(413, false, 'La richiesta è troppo grande.');
}

if (!same_origin_request()) {
    respond(403, false, 'Origine della richiesta non valida.');
}

// A bot normally fills every field. Return a neutral success response without
// sending mail, so the protection is not disclosed to the sender.
if (input('website') !== '') {
    success_response('Richiesta ricevuta.');
}

$startedAt = filter_input(INPUT_POST, 'form_started_at', FILTER_VALIDATE_INT);
if ($startedAt !== false && $startedAt !== null && time() - $startedAt < 2) {
    respond(429, false, 'Invio troppo rapido. Attendi un momento e riprova.');
}

$name = input('nome');
$email = input('email');
$phone = input('tel');
$message = input('messaggio');
$privacyAcceptance = input('privacy_acceptance');

if (text_length($name) < 2 || text_length($name) > 100) {
    respond(422, false, 'Inserisci un nome valido.');
}

if (text_length($email) > 254 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(422, false, 'Inserisci un indirizzo email valido.');
}

if (preg_match('/[\\r\\n]/', $email) === 1 || preg_match('/[\\r\\n]/', $name) === 1) {
    respond(422, false, 'I dati inseriti non sono validi.');
}

if (text_length($phone) > 40) {
    respond(422, false, 'Inserisci un numero di telefono valido.');
}

if (text_length($message) < 10 || text_length($message) > 5000) {
    respond(422, false, 'Il messaggio deve contenere da 10 a 5000 caratteri.');
}

if ($privacyAcceptance !== '1') {
    respond(422, false, 'È necessario dichiarare di aver letto la Privacy Policy.');
}

$clientKey = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (rate_limit_exceeded($clientKey)) {
    respond(429, false, 'Hai effettuato troppi tentativi. Riprova tra qualche minuto.');
}

$subjectText = 'Nuova richiesta dal sito Eco Asfalti';
$safePhone = $phone !== '' ? $phone : 'Non indicato';
$body = implode("\r\n", [
    'Nuova richiesta ricevuta dal sito ecoasfaltisrl.it',
    '',
    'Nome e cognome: ' . $name,
    'Email: ' . $email,
    'Telefono: ' . $safePhone,
    'Informativa privacy presa visione: sì',
    '',
    'Messaggio:',
    $message,
    '',
    'Data invio: ' . date('d/m/Y H:i:s'),
]);
// Aruba shared hosting: configuration in a directory denied to HTTP clients.
$configPath = __DIR__ . '/private/contact-config.php';
$deliveryStage = 'CONFIG';
$mail = null;
try {
    if (!is_file($configPath)) {
        throw new RuntimeException('SMTP configuration missing.');
    }
    define('ECOASFALTI_CONTACT_CONFIG', true);
    $config = require $configPath;
    if (!is_array($config)) {
        throw new RuntimeException('Invalid SMTP configuration.');
    }
    foreach (['host', 'username', 'password', 'from', 'recipient'] as $key) {
        if (!isset($config[$key]) || !is_string($config[$key]) || trim($config[$key]) === '') {
            throw new RuntimeException('Incomplete SMTP configuration.');
        }
    }
    if ($config['password'] === 'INSERISCI_QUI_LA_PASSWORD') {
        throw new RuntimeException('SMTP password not configured.');
    }
    $encryption = $config['encryption'] ?? 'ssl';
    $port = $config['port'] ?? 465;
    if (!in_array($encryption, ['ssl', 'tls'], true) || !is_int($port) || $port < 1 || $port > 65535) {
        throw new RuntimeException('Invalid SMTP transport configuration.');
    }

    $deliveryStage = 'LIBRARY';
    require_once __DIR__ . '/lib/phpmailer/Exception.php';
    require_once __DIR__ . '/lib/phpmailer/PHPMailer.php';
    require_once __DIR__ . '/lib/phpmailer/SMTP.php';

    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $config['host'];
    $mail->SMTPAuth = true;
    $mail->Username = $config['username'];
    $mail->Password = $config['password'];
    $mail->SMTPSecure = $encryption;
    $mail->Port = $port;
    $mail->Timeout = 20;
    $mail->CharSet = 'UTF-8';
    $mail->XMailer = '';
    $mail->setFrom($config['from'], 'Sito Eco Asfalti');
    $mail->addAddress($config['recipient']);
    $mail->addReplyTo($email, $name);
    $mail->Subject = $subjectText;
    $mail->Body = $body;
    $deliveryStage = 'PREPARAZIONE';
    $mail->preSend();
    $deliveryStage = 'SMTP_CONNECT';
    $mail->smtpConnect();
    $deliveryStage = 'SMTP_DELIVERY';
    $mail->postSend();
} catch (\Throwable $error) {
    // Only allowlisted categories: never return raw SMTP responses or credentials.
    $code = $deliveryStage;
    if ($mail !== null) {
        $smtpError = $mail->getSMTPInstance()->getError();
        $smtpCode = (string) ($smtpError['smtp_code'] ?? '');
        if ($smtpCode === '535' || stripos($mail->ErrorInfo, 'authenticate') !== false) {
            $code = 'SMTP_AUTH';
        } elseif (stripos($mail->ErrorInfo, 'connect') !== false) {
            $code = 'SMTP_CONNECT';
        }
        if (preg_match('/^[45][0-9]{2}$/D', $smtpCode)) {
            $code .= '_' . $smtpCode;
        }
    }
    if ($error instanceof \Error) {
        $code .= '_PHP';
    }
    error_log('Eco Asfalti contact form: delivery failed [' . $code . '].');
    respond(503, false, 'Invio non riuscito. Riprova tra poco o scrivi a info@ecoasfaltisrl.it.');
}

success_response('Richiesta inviata correttamente.');
