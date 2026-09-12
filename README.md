# Eco Asfalti SRL — Motion Edition (animation-maxed)

La variante **più dinamica e ricca di animazioni**. Vite + React + Framer Motion.
Palette carbone caldo + arancione vivido, tipografia **Syne + Inter**.

## Animazioni incluse

- **Apertura cinematografica** subito navigabile, senza contatore di caricamento.
- **Cursore personalizzato** con inerzia (dot + anello) che reagisce agli hover *(desktop)*.
- **Bottoni magnetici** (hero + CTA).
- **Hero cinetica**: filmato automatico in loop con dissolvenza sulla foto
  dell'impianto per cinque secondi tra i passaggi, titolo con reveal
  a maschera, badge circolare rotante, flusso di materia e parallax allo scroll.
  Pausa e ripresa sono sempre disponibili; su mobile il video mantiene
  l'inquadratura completa in 16:9.
- **Marquee doppi** in direzioni opposte (uno pieno, uno outline inclinato).
- **Manifesto**: testo che si "accende" parola per parola allo scroll.
- **★ Materiali a scorrimento orizzontale**: pinned su desktop; su mobile avanzano di una card alla volta, in ciclo continuo, e restano trascinabili in entrambe le direzioni senza interferire con lo scroll verticale. Dopo un gesto manuale ripartono in meno di due secondi.
- **Prodotti CAM**: fotografia in parallax e sigillo del contenuto riciclato animato.
- **Transizione BTZ → GPL**: flusso luminoso animato.
- **Recupero**: ciclo circolare che ruota allo scroll e sequenza di apparizione dei passaggi.
- **★ "La materia prende strada"**: la finitrice stende l'asfalto mentre scrolli, nel capitolo pavimentazioni.
- **Attività**: tre collegamenti con reveal progressivo e movimento al passaggio del mouse.
- **Lavoro ANAS**: scheda con tilt 3D che segue il mouse.
- **Certificazioni**: filtri per categoria e apertura diretta dei PDF.
- **Card contestuali**: attività, miscele e certificazioni evidenziano un solo elemento alla volta; su mobile segue il centro dello schermo, su desktop hover e tastiera.
- **FAQ** con accordion animato **+ JSON-LD schema.org FAQPage** (AEO).
- Barra di avanzamento scroll, header che si nasconde/mostra, footer con nome gigante scorrevole.

Tutte le animazioni rispettano `prefers-reduced-motion`.

## Comandi

```bash
npm install
npm run dev       # http://localhost:5177
npm run build
npm run preview
```

## Nota AEO

Il markup `FAQPage` (JSON-LD) è statico in `index.html`. Se modifichi le domande
in `src/data/faqs.json`, aggiorna anche il JSON-LD.

## Gerarchia dei contenuti

La pagina segue tre capitoli: **produzione** (attività principale, prodotti CAM,
ReMade, transizione dell'impianto e certificazioni), **recupero rifiuti**,
**esecuzione di pavimentazioni** (attività complementare, con scena della finitrice
e lavoro ANAS). Hero, menu, CTA e metadati riflettono questa priorità.

Gli stili aggiuntivi sono in `src/restructure.css` e `src/components/Hero.css`;
le scene animate originali restano in `src/styles.css`.

## Filmato della hero

`HeroFilm.jsx` seleziona un unico MP4 quando serve: 1080p per desktop (circa
5,3 MB), 720p fino a 900 px (circa 3,5 MB). Non viene precaricato alcun video
finché l'inquadratura non è visibile, con animazioni ridotte, con
risparmio dati o connessioni 2G rilevate. Il comando di riproduzione permette
comunque di avviarlo esplicitamente. L'immagine iniziale è la foto originale
`impianto-06.webp`, riutilizzata anche nell'intervallo fra le riproduzioni.

L'autoplay è silenzioso e non blocca testo, link o scorrimento. Al termine
il filmato sfuma per 850 ms sulla foto dell'impianto, la lascia visibile per
cinque secondi e riparte dall'inizio con una dissolvenza. Il ciclo continua
automaticamente mentre l'inquadratura è visibile. Scorrendo oltre il video
o cambiando scheda, si mettono in pausa sia il filmato sia l'intervallo sulla
foto; tornando, riprendono dal punto raggiunto. La sorgente e il buffer restano
disponibili, senza azzerare il tempo del video. La pausa manuale resta attiva
anche dopo uno scorrimento. Non è più presente il limite di una riproduzione
per sessione. Le dissolvenze sono disattivate con animazioni ridotte.
Autoplay negato ed errori di rete lasciano visibile il poster e permettono
un nuovo tentativo manuale.

La precedente sezione video allo scroll e il preloader sono stati rimossi,
insieme ai relativi asset e alle anteprime non più utilizzate.

Per rigenerare gli asset, con FFmpeg installato:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/prepare-hero-media.ps1
```

Il comando legge `media-masters/Soggetto_e_pitch_una_fr_gwr_video_mvp.mp4` senza modificarlo
e produce i file web in `public/videos`, più un master a
2560×1440 in `media-masters/ciclo-produttivo-1440p.mp4` (escluso da Git e dalla
build web). Il sorgente è 720p: il ridimensionamento Lanczos con lieve
nitidezza è convenzionale, senza AI, watermark o nuovi dettagli ricostruiti.
Durata di 10 secondi e 24 fps sono conservati; la traccia audio viene esclusa.

## Documenti e fonti dei contenuti

- Gli 11 PDF in `public/certificazioni/` sono copie dei documenti ricevuti in
  `DOCUMENTAZIONE_RICEVUTA`, con nomi pubblici brevi. Aggiornare anche numeri e
  validità in `src/components/Certificazioni.jsx` quando si sostituiscono i PDF.
- Il 16–45% di contenuto riciclato e le otto miscele derivano dal certificato
  ReMade 1591/001. Il PDF include l'allegato con le percentuali per prodotto.
- Il Rating di Legalità rimanda al registro pubblico AGCM. Nei documenti ricevuti
  non è presente un attestato specifico: non sono pubblicati punteggi o scadenze.
- Il passaggio BTZ → GPL e il lavoro in corso con ANAS da 20 milioni di euro
  provengono dalle direttive del cliente. Non sono stati aggiunti località,
  CIG, quote di partecipazione o dettagli contrattuali non forniti.
- Le sezioni CAM, ReMade e recupero utilizzano fotografie reali dell'impianto.
  Le quattro famiglie di miscele hanno immagini illustrative distinte, in WebP,
  esplicitamente indicate sulle schede. Fonti, classificazione dei materiali e
  prompt sono descritti in [docs/materiali-e-immagini.md](docs/materiali-e-immagini.md).
  La scheda ANAS non attribuisce immagini generiche al lavoro citato.
