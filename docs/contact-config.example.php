<?php

// Install as api/private/contact-config.php only after checking HTTP access is denied.
if (!defined('ECOASFALTI_CONTACT_CONFIG')) {
    http_response_code(404);
    exit;
}
return [
    'host' => 'smtps.aruba.it',
    'port' => 465,
    'encryption' => 'ssl', // 'tls' for STARTTLS on port 587
    'username' => 'sito@ecoasfaltisrl.it',
    'password' => <<<'ARUBA_SMTP_PASSWORD'
INSERISCI_QUI_LA_PASSWORD
ARUBA_SMTP_PASSWORD,
    'from' => 'sito@ecoasfaltisrl.it',
    'recipient' => 'info@ecoasfaltisrl.it',
];
