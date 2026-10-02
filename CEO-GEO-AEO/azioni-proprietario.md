# Cosa fare per Eco Asfalti

## 1. Pubblicare l'aggiornamento

Caricare il pacchetto SEO/privacy nella root `www.ecoasfaltisrl.it` con
sovrascrittura. Il pacchetto di aggiornamento **non contiene**
`api/private/contact-config.php`: la password SMTP già sul server resta intatta.
Non cancellare la cartella api remota. Dopo l'estrazione eliminare lo ZIP.
Controllare home, privacy, cookie policy, preferenze cookie, form e PDF.
Verificare che HTTP e il dominio senza www arrivino a HTTPS con www, senza loop.

## 2. Google Search Console: prima priorità

1. Usare un account Google controllato dall'azienda su
   https://search.google.com/search-console (non servono credenziali da inviare al tecnico).
2. Aggiungere una proprietà di tipo **Dominio**: `ecoasfaltisrl.it`, senza https e www.
3. Copiare il valore TXT assegnato da Google: deve essere quello di questa proprietà,
   non i vecchi codici del modello di un'altra azienda.
4. Aruba → Gestione DNS → Aggiungi record → TXT → Nome host `@` → valore copiato.
   Conservare SPF, DKIM, DMARC, MX e tutti i record esistenti; aggiungere un TXT separato.
5. Tornare su Google e verificare dopo la propagazione. Non eliminare il TXT.
6. Nella sezione Sitemap inviare `https://www.ecoasfaltisrl.it/sitemap.xml`.
7. In Controllo URL verificare `https://www.ecoasfaltisrl.it/`, eseguire il test
   dell'URL pubblicato e richiedere l'indicizzazione. Evitare invii ripetuti giornalieri.
8. Nei giorni/settimane successivi consultare Indicizzazione pagine e Rendimento.
   Il comando `site:` è solo un controllo indicativo, non una prova completa.

Se scegli invece la proprietà Prefisso URL, usa esattamente
`https://www.ecoasfaltisrl.it/` e fornisci il file/tag di verifica generato da Google.
Il metodo DNS non richiede modifiche al codice. Fonte:
[verifica proprietà Google](https://support.google.com/webmasters/answer/9008080?hl=it).

## 3. Microsoft: Bing Webmaster Tools

1. Aprire https://www.bing.com/webmasters con un account aziendale.
2. Importare la proprietà già verificata da Google Search Console, oppure aggiungere
   manualmente il sito usando la verifica specifica proposta da Bing.
3. Verificare che la sitemap sia presente; altrimenti inviare lo stesso URL completo.
4. Usare Ispezione URL per la home e controllare errori di scansione e indicizzazione.

Il record Google non verifica automaticamente una proprietà Bing creata manualmente.
IndexNow può essere aggiunto in seguito per notificare aggiornamenti frequenti;
non è necessario per lanciare questo sito e non garantisce indicizzazione.
Fonti: [Bing Webmaster](https://blogs.bing.com/webmaster/2025/6/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility/),
[IndexNow](https://www.bing.com/indexnow/getstarted).

## 4. Google Business Profile e vecchio dominio

Su https://business.google.com cercare prima il profilo esistente di Eco Asfalti,
richiedendone l'accesso invece di creare duplicati. Inserire il nuovo URL definitivo,
indirizzo e ragione sociale coerenti, telefono e orari reali, categoria pertinente
alla produzione di conglomerati, foto dell'impianto e servizi effettivi.
Google sceglie i metodi di verifica disponibili: non promettere cartoline o tempi fissi.

**ecoasfalti.it è un dominio distinto**, attualmente fuori da questo account Aruba.
Chiedere chi lo controlla. Se il nuovo sito deve sostituirlo, pianificare con quel
gestore redirect 301 URL per URL e la migrazione in Search Console; non effettuare
redirect indiscriminati verso la home e non alterare la posta del vecchio dominio.
Fino ad allora i due siti possono competere per le stesse ricerche aziendali.

Fonti: [profilo e verifica](https://support.google.com/business/answer/7107242?hl=it),
[visibilità locale](https://support.google.com/business/answer/7091?hl=it).

## 5. Google Analytics 4: dati da fornire

1. Su https://analytics.google.com creare account/proprietà Eco Asfalti, fuso
   Europe/Rome e valuta EUR. Creare un flusso Web per `https://www.ecoasfaltisrl.it/`.
2. Inviare al tecnico **solo l'ID di misurazione `G-…`**. Non usare l'ID del modello.
3. Impostare la conservazione dati evento/utente a 2 mesi come configurazione iniziale
   da approvare con il titolare; non collegare Ads, Google Signals o dati forniti
   dagli utenti senza una distinta valutazione.
4. Disattivare la misurazione avanzata automatica del flusso, in particolare le
   interazioni con moduli. Questa implementazione misura soltanto la visita di pagina
   dopo consenso e senza query string, frammenti o valori del form.
5. Il tecnico imposta `VITE_GA_MEASUREMENT_ID` nell'ambiente locale, ricostruisce e
   carica il sito. Con l'ID attivo apparirà il banner di consenso.
6. Provare accettazione, rifiuto e revoca. Controllare una visita accettata nel rapporto
   Tempo reale; con rifiuto non deve essere inviato traffico Analytics.

Il consenso nel browser dura sei mesi, mentre i cookie GA sono configurati a 180
giorni senza rinnovo automatico. La conservazione nei server Google è distinta
e va impostata nel pannello. Non incollare un secondo tag GA o GTM nel sito.

## Cosa mandare al tecnico

- ID GA4 `G-…` e conferma delle impostazioni del flusso.
- Conferma verifica Search Console e Bing, oppure i loro nuovi file/tag se richiesti.
- URL del profilo Google Business esistente, telefono e orari approvati.
- Vecchie informative e decisioni del titolare sui punti del documento privacy.
- Conferma della ricezione reale del form e del corretto destinatario di Rispondi.

Non occorre condividere password Google, Microsoft o della casella info.
