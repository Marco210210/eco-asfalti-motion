# Implementazione SEO e consenso

## Implementato

- Build Vite con prerender React: testi, link e FAQ nell'HTML iniziale; nessun
  server Node richiesto su Aruba. La parte interattiva viene montata dal client.
- FAQ native details/summary: tutte le risposte sono presenti nel documento,
  utilizzabili anche senza JavaScript. JSON-LD generato dal medesimo JSON.
- Dati LocalBusiness, WebSite e WebPage con identità e indirizzo reali. Nessuna
  recensione, social, telefono, orario, prezzo o SearchAction inventati.
- Canonical HTTPS con www, redirect nel .htaccess, sitemap dei soli URL reali,
  robots accessibile e area API esclusa dalla scansione (la protezione effettiva
  resta nel server). Grazie e 404 sono noindex.
- Font variabili locali Inter e Syne con licenze OFL. Nessuna chiamata Google Fonts.
- Privacy e Cookie Policy dedicate, preferenze accessibili da tutte le pagine.
- Analytics bloccato fino al consenso esplicito, rifiuto con pari evidenza,
  revoca con rimozione cookie e ricaricamento per arrestare il tag, scadenza e
  sincronizzazione tra schede. Nessun ping Analytics prima del consenso.
- Senza ID GA4 nessuna richiesta di consenso facoltativo automatica; le preferenze
  spiegano che sono in uso solo funzionalità tecniche.
- Preview con access gate: noindex su HTML, robots bloccante, niente Analytics
  e niente prerender dei contenuti aziendali. Il gate client non è autenticazione.

## GEO e AEO senza promesse improprie

Contano contenuti attendibili, fonti documentali, HTML leggibile, informazioni
aziendali coerenti e pagine indicizzabili. Google non richiede llms.txt né markup
speciale per le funzioni AI; per questo non si aggiunge un file ridondante.
Non si equiparano crawler di addestramento e crawler di ricerca. Nessuna
registrazione Bing garantisce automaticamente citazioni in un assistente AI.

FAQPage descrive le domande reali; non viene promesso un risultato FAQ arricchito.
Non si creano pagine-servizio fittizie, doorway per ogni città o contenuti nascosti.
Eventuali pagine dedicate richiederanno contenuti tecnici originali dell'azienda.
Fonte: [Google, AI e SEO](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## Build e prove

`npm run build` genera dist; `npm run test:site` esegue prove browser sul build.
I test usano un ID fittizio solo tramite intercettazione locale, mai in produzione.
Il caricamento successivo deve preservare il file remoto con password SMTP.
Verificare su Aruba i redirect e le protezioni .htaccess: Vite non li esegue.

In Search Console/Bing controllare canonical scelto, scansione, sitemap e query;
su PageSpeed Insights controllare LCP/INP/CLS su mobile dopo il caricamento.
Aggiornare lastmod solo quando il contenuto della pagina cambia realmente.
