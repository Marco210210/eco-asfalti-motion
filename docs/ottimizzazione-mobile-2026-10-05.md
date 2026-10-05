# Secondo intervento mobile

Report pubblico di partenza: https://pagespeed.web.dev/analysis/https-www-ecoasfaltisrl-it/1thlrdvb9y?form_factor=mobile

Prestazioni mobile 84, FCP 2,6 s, LCP 3,8 s. Le altre categorie sono a 100.

## Modifiche

- Compressione Apache estesa a `text/javascript`: una richiesta al bundle pubblico con `Accept-Encoding: gzip` restituiva 332540 byte senza Content-Encoding. Aruba serve quel MIME, prima assente dalla regola. La compressione effettiva va ricontrollata dopo il caricamento: il proxy Aruba potrebbe conservare la risposta precedente.
- CSS principale incorporato nell'HTML generato dalla build, eliminando una richiesta che blocca la prima visualizzazione. Nessuna modifica grafica né ai dati del form.

## Verifica

9 test Playwright superati. Lighthouse locale mobile: 91 prestazioni, 100 accessibilità, 100 best practice, 100 SEO; FCP 1,4 s, LCP 3,3 s. Il precedente test locale era 88, FCP 1,9 s, LCP 3,6 s. I punteggi locali non garantiscono lo stesso risultato su Aruba.

## Caricamento

Estrarre lo ZIP di aggiornamento nella radice del sito sovrascrivendo i file, incluso `.htaccess`. Non cancellare prima lo spazio web: lo ZIP esclude `api/private/contact-config.php`, che deve conservare la password SMTP già funzionante. Escluso anche il vecchio video originale da 22 MB, non utilizzato.

Dopo il caricamento ripetere PageSpeed mobile e desktop e verificare Content-Encoding del JavaScript. Non occorre reinviare sitemap o modificare Analytics.
