# Ottimizzazione e contatti ? 5 ottobre 2026

Immagini responsive WebP (480/640/960/1600 pixel), logo ridotto per header/footer,
video H.264 faststart da 3,65 MB desktop e 2,10 MB mobile. Su mobile avvio manuale,
con pausa/ripresa e rispetto delle preferenze di movimento ridotto.
Font e stile cookie incorporati nella build; preload dei font; titolo subito visibile.
Cache settimanale per media/font, annuale solo per bundle con hash; HTML da rivalidare.
Compressione testuale tramite mod_deflate, da verificare dopo caricamento su Aruba.
Contrasto migliorato, animazione energia basata su transform.

Recapiti: ufficio 081 920 5409; Giuseppe Mele, direttore ufficio acquisti,
348 641 0150. Link tel e dati strutturati aggiornati. Contatti desktop con titolo
sopra la griglia, form e informazioni allineati sia in alto sia in basso.

## Verifica

9 test browser superati. Controllo visivo desktop e mobile; nessuna risorsa 404
nelle navigazioni provate. Lighthouse locale, non un nuovo risultato PageSpeed
pubblico: ambiente, server e versione Lighthouse possono differire.

| Ambiente | Prestazioni | Accessibilita | Best practice | SEO |
| --- | --- | --- | --- | --- |
| mobile | 88 | 100 | 100 | 100 |
| desktop | 98 | 100 | 100 | 100 |

Il report pubblico precedente riportava 69 mobile / 97 desktop. Non e un confronto
controllato: ripetere PageSpeed dopo il deploy. Controllare invio form, anteprima,
GA4 in tempo reale dopo consenso e header cache/compressione sulla risposta Aruba.

## Pubblicazione

Estrarre release/ecoasfaltisrl-AGGIORNAMENTO-ottimizzato.zip nella root del sito,
sovrascrivendo, senza svuotarla. Il file SMTP api/private/contact-config.php
non e incluso: la configurazione funzionante resta sul server. Eliminare lo ZIP
remoto dopo l'estrazione. Il video originale resta conservato localmente ma non
viene incluso nell'aggiornamento (non e piu usato dalla pagina).
