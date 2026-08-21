# Pubblicazione su Aruba

Il form contatti usa esclusivamente PHP `mail()` sullo stesso hosting del sito.
Non dipende da servizi esterni e invia tutte le richieste a
`info@ecoasfalti.it`.

## Requisiti

- Hosting Aruba Linux con PHP attivo.
- Casella `info@ecoasfalti.it` esistente e abilitata alla ricezione.
- PHP 7.4 o successivo (consigliato PHP 8.2 o successivo).

## Pubblicazione

1. Creare un file locale `.env.production.local` (non va pubblicato su Git) con:

   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_ENABLE_ACCESS_GATE=false
   ```

   Se Google Analytics non deve ancora essere attivato, lasciare vuoto
   `VITE_GA_MEASUREMENT_ID`. In questo caso non vengono caricati script Google e
   il banner Analytics non viene mostrato.
2. Verificare che il dominio definitivo sia `https://www.ecoasfaltisrl.it/`.
   Se cambia, aggiornare canonical e Open Graph in `index.html`, oltre a
   `public/robots.txt` e `public/sitemap.xml`.
3. Eseguire `npm run build`.
4. Caricare **il contenuto** della cartella `dist` nella root pubblica del
   dominio Aruba, mantenendo la cartella `api`, il file `api/contact.php` e il
   file nascosto `.htaccess`.
5. Nel pannello Aruba aprire la gestione PHP ed eseguire il test della funzione
   `mail()` verso `info@ecoasfalti.it`.
6. Aprire il sito pubblicato e inviare una richiesta reale dal form.
7. Controllare sia la posta in arrivo sia la cartella spam della casella.
8. Verificare `/404.html`, `/privacy-policy.html`, `/robots.txt` e
   `/sitemap.xml` sul dominio pubblico.
9. Prima del lancio, far verificare la Privacy Policy al titolare o al consulente
   privacy in base ai fornitori effettivamente usati da hosting e posta.

Il mittente tecnico è `info@ecoasfalti.it`; l'indirizzo inserito nel form viene
impostato come `Reply-To`, quindi rispondendo al messaggio si risponde
direttamente al visitatore senza compromettere i controlli antispam del dominio.
