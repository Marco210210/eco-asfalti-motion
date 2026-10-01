# Pubblicazione su Aruba

## Configurazione definitiva

| Voce | Valore |
| --- | --- |
| Sito | https://www.ecoasfaltisrl.it/ |
| Piano | Aruba Hosting Easy Linux |
| FTP | ftp.ecoasfaltisrl.it |
| Mittente SMTP | sito@ecoasfaltisrl.it |
| Destinatario | info@ecoasfaltisrl.it |
| Server SMTP | smtps.aruba.it |
| Porta e cifratura | 465, TLS implicito (`ssl`) |
| Reply-To | Email del visitatore |

`ecoasfalti.it` è un dominio distinto, non modificato da questo deploy.
Il sito usa Vite, React e PHP con PHPMailer locale, senza servizi di inoltro.
Non richiede Node.js sul server né un database.

## Build e caricamento

1. Eseguire `npm ci` e `npm run build` con `VITE_ENABLE_ACCESS_GATE=false`.
   L'output è `dist`, non `out`. `npm run dev` serve solo allo sviluppo locale.
2. Conservare i file remoti e la configurazione SMTP prima degli aggiornamenti.
   Per ripristinare un precedente CMS occorre anche il suo database.
3. Caricare il contenuto di `dist` nella root `www.ecoasfaltisrl.it`, inclusi
   i file nascosti `.htaccess`, con PHP 8.2+ e OpenSSL disponibili.
4. Non pubblicare repository, documenti ricevuti, backup, sorgenti video o
   node_modules. Conservare la configurazione SMTP remota negli aggiornamenti.
5. Verificare HTTPS e le varianti del dominio, poi rimuovere gli ZIP caricati.
   Le modifiche DNS del sito non devono alterare i record della posta.

## Attivazione del form

1. Creare `sito@ecoasfaltisrl.it` nella gestione posta Aruba e scegliere una
   password. Non serve quella della casella destinataria info.
2. Copiare [contact-config.example.php](contact-config.example.php) sul server
   come `api/private/contact-config.php`. La directory contiene `.htaccess` con
   `Require all denied`; anche il PHP impedisce l'accesso diretto.
3. Prima di inserire credenziali, verificare che `/api/private/index.html` e
   `/api/private/contact-config.php` restituiscano 403.
4. Nel File Manager sostituire solo `INSERISCI_QUI_LA_PASSWORD` con la password
   di sito, conservando a capo e delimitatori `ARUBA_SMTP_PASSWORD`.
   Non salvare credenziali in Git, ZIP scaricabili o variabili `VITE_`.
5. Provare il form con una propria email, verificare l'arrivo a info (anche
   nello spam) e che Rispondi indirizzi al visitatore. L'accettazione SMTP
   da sola non dimostra la consegna in casella.

Vite preview e GitHub Pages non eseguono PHP. Il workflow GitHub Pages
pubblica una preview con gate, separata dal sito Aruba.

## Pacchetto iniziale e stato

`release/ecoasfaltisrl-aruba-completo.zip` contiene la build e la configurazione
iniziale con segnaposto. Sovrascrive il file SMTP: dopo la prima attivazione
preservare la configurazione sul server.

Al 1 ottobre 2026 il sito è raggiungibile e la casella info è confermata attiva.
Non è ancora confermato l'esito della prova reale del form. Il vecchio spazio
è conservato localmente in `backups`, escluso da Git; il database Joomla non
risulta esportato. La vecchia cartella pubblica è stata rimossa dall'utente.

## Verifiche dopo il caricamento

- Home, immagini, video, PDF, privacy, sitemap e pagina 404 raggiungibili.
- Gate di anteprima disattivato su Aruba.
- Configurazione privata e libreria PHP non scaricabili.
- Form ricevuto in casella e Reply-To corretto; errori SMTP mostrati senza
  reindirizzare alla pagina di ringraziamento.
