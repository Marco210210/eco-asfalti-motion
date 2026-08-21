# Pubblicazione su Aruba

Il form contatti usa esclusivamente PHP `mail()` sullo stesso hosting del sito.
Non dipende da servizi esterni e invia tutte le richieste a
`info@ecoasfalti.it`.

## Requisiti

- Hosting Aruba Linux con PHP attivo.
- Casella `info@ecoasfalti.it` esistente e abilitata alla ricezione.
- PHP 7.4 o successivo (consigliato PHP 8.2 o successivo).

## Pubblicazione

1. Eseguire `npm run build`.
2. Caricare **il contenuto** della cartella `dist` nella root pubblica del
   dominio Aruba, mantenendo la cartella `api` e il file `api/contact.php`.
3. Nel pannello Aruba aprire la gestione PHP ed eseguire il test della funzione
   `mail()` verso `info@ecoasfalti.it`.
4. Aprire il sito pubblicato e inviare una richiesta reale dal form.
5. Controllare sia la posta in arrivo sia la cartella spam della casella.

Il mittente tecnico è `info@ecoasfalti.it`; l'indirizzo inserito nel form viene
impostato come `Reply-To`, quindi rispondendo al messaggio si risponde
direttamente al visitatore senza compromettere i controlli antispam del dominio.
