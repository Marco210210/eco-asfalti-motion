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
    respond(200, true, 'Richiesta ricevuta.');
}

$startedAt = filter_input(INPUT_POST, 'form_started_at', FILTER_VALIDATE_INT);
if ($startedAt !== false && $startedAt !== null && time() - $startedAt < 2) {
    respond(429, false, 'Invio troppo rapido. Attendi un momento e riprova.');
}

$name = input('nome');
$email = input('email');
$phone = input('tel');
$message = input('messaggio');

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

$clientKey = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (rate_limit_exceeded($clientKey)) {
    respond(429, false, 'Hai effettuato troppi tentativi. Riprova tra qualche minuto.');
}

$recipient = 'info@ecoasfalti.it';
$subjectText = 'Nuova richiesta dal sito Eco Asfalti';
$subject = '=?UTF-8?B?' . base64_encode($subjectText) . '?=';
$safePhone = $phone !== '' ? $phone : 'Non indicato';
$body = implode("\r\n", [
    'Nuova richiesta ricevuta dal sito ecoasfalti.it',
    '',
    'Nome e cognome: ' . $name,
    'Email: ' . $email,
    'Telefono: ' . $safePhone,
    '',
    'Messaggio:',
    $message,
    '',
    'Data invio: ' . date('d/m/Y H:i:s'),
]);
$headers = implode("\r\n", [
    'From: Sito Eco Asfalti <info@ecoasfalti.it>',
    'Reply-To: ' . $email,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . PHP_VERSION,
]);

if (!@mail($recipient, $subject, $body, $headers)) {
    error_log('Eco Asfalti contact form: mail() returned false.');
    respond(500, false, 'Invio non riuscito. Riprova tra poco o scrivi a info@ecoasfalti.it.');
}

respond(200, true, 'Richiesta inviata correttamente.');
