# Eco Asfalti SRL — Motion Edition (animation-maxed)

## Pubblicazione e form

Il dominio definitivo è **https://www.ecoasfaltisrl.it/**, su hosting Aruba.
Istruzioni in [docs/pubblicazione-aruba.md](docs/pubblicazione-aruba.md).
Il form PHP usa SMTP autenticato della casella aziendale tramite PHPMailer
incluso sul sito; le credenziali sono in `api/private`, protetta da accessi HTTP.
L'invio reale richiede la configurazione sul server e una prova di ricezione.

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
- **★ Materiali a scorrimento orizzontale**: pinned su desktop; su mobile avanzano di una card alla volta, in ciclo continuo, e restano trascinabili in entrambe le direzioni senza interferire con lo scroll verticale. Il tocco mette in pausa il movimento e ogni gesto manuale fa ripartire da zero il tempo di lettura.
- **Prodotti CAM**: fotografia in parallax e collegamento al certificato ReMade.
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

`HeroFilm.jsx` utilizza `public/videos/eco-asfalti-ai-1440p.mp4` su desktop e mobile (2560 × 1440, 24 fps, 10 secondi). La versione approvata è stata migliorata localmente con Real-ESRGAN general-x4v3 e ridimensionata a 1440p. Il risultato combina 85% AI e 15% sorgente; le aree del logo sono protette con maschere ricavate dal confronto con il filmato originale. Durata, sequenza e 240 fotogrammi restano invariati. Non viene precaricato alcun video
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

Il video originale è conservato in `media-masters/Soggetto_e_pitch_una_fr_gwr_video_mvp.mp4`.
La versione con logo prima del miglioramento è conservata in `media-masters/eco-asfalti-logo-naturale-v2.mp4`. La prova AI e il confronto sono archiviati localmente in `media-masters/ai-preview/`. La precedente versione HQ resta in `media-masters/eco-asfalti-logo-naturale-v2-hq.mp4`. Il video pubblicato è in `public/videos/eco-asfalti-ai-1440p.mp4`; `dist` ne riceve una copia durante la build. La traccia audio del file finale resta intatta, ma il sito riproduce il video in modalità silenziosa.
Le vecchie esportazioni, prove, fotogrammi, strumenti di compositing e istruzioni delle scene video sono stati rimossi dal progetto (spostati nel Cestino). Per cambiare il video, sostituire il file finale e aggiornare il riferimento in `HeroFilm.jsx` se cambia nome.

## Documenti e fonti dei contenuti

- I 13 PDF in `public/certificazioni/` sono copie dei documenti ricevuti in
  `DOCUMENTAZIONE_RICEVUTA`, con nomi pubblici brevi. Aggiornare anche numeri e
  validità in `src/components/Certificazioni.jsx` quando si sostituiscono i PDF.
- Le percentuali di riciclato e la FAQ quantitativa sono state rimosse su richiesta del cliente, anche dai metadati e dal JSON-LD. Non reintrodurle senza conferma. Il certificato originale ReMade resta consultabile, senza modifiche al documento.
- Il Rating di Legalità apre direttamente `rating-legalita-agcm.pdf`, copia della comunicazione ricevuta in `DOCUMENTAZIONE_RICEVUTA/CERTIFICAZIONI`.
- Il modello 231 è pubblicato integralmente su autorizzazione esplicita del cliente; solo l’AUA resta fuori da `public` e dalla build in attesa di decisione sui dati personali. Dettagli in [docs/verifica-documenti.md](docs/verifica-documenti.md).
- Il passaggio BTZ → GPL e il lavoro in corso con ANAS da 20 milioni di euro
  provengono dalle direttive del cliente. Non sono stati aggiunti località,
  CIG, quote di partecipazione o dettagli contrattuali non forniti.
- Le sezioni CAM, ReMade e recupero utilizzano fotografie reali dell'impianto.
  Le quattro famiglie di miscele hanno immagini illustrative distinte, in WebP,
  esplicitamente indicate sulle schede. Fonti, classificazione dei materiali e
  prompt sono descritti in [docs/materiali-e-immagini.md](docs/materiali-e-immagini.md).
  La scheda ANAS non attribuisce immagini generiche al lavoro citato.
