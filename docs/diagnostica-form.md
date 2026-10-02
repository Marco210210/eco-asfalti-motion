# Diagnostica del form su Aruba

Il pacchetto SEO/privacy aggiorna il codice ma conserva la configurazione SMTP
remota: non cancellare `api/private/contact-config.php` e non condividere password.

Dopo il caricamento, inviare una richiesta di prova dal sito e controllare la
ricezione in `info@ecoasfaltisrl.it`, anche nella posta indesiderata. Rispondi
deve indirizzare la risposta all'indirizzo inserito dal visitatore.

In caso di errore il form mostra una categoria priva di dati riservati:

| Codice | Controllo |
| --- | --- |
| CONFIG | File `api/private/contact-config.php` presente, sintassi corretta, tutti i campi compilati, password diversa dal segnaposto. Confrontare con `docs/contact-config.example.php`. |
| LIBRARY | Caricare tutta `api/lib/phpmailer`, inclusi SMTP.php, PHPMailer.php ed Exception.php. |
| SMTP_AUTH | Verificare accesso alla webmail come `sito@ecoasfaltisrl.it` usando la stessa password configurata; username completo e casella abilitata. |
| SMTP_CONNECT | Verificare host `smtps.aruba.it`, porta intera `465`, encryption `ssl`; se corretti chiedere ad Aruba di verificare la connessione SMTP dall'hosting. |
| SMTP | Il server non ha completato l'invio: verificare mittente `sito@ecoasfaltisrl.it`, destinatario `info@ecoasfaltisrl.it` e chiedere ad Aruba il controllo indicando ora del tentativo. |

I codici indicano la fase del problema, non garantiscono da soli la causa.
Non attivare debug SMTP pubblico. Un errore prima dell'esecuzione PHP può
restituire una pagina generica anziché questo codice: consultare i log PHP Aruba.
La prova browser locale simula solo le risposte: non verifica le credenziali
remote né garantisce la consegna delle email.
