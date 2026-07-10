# Eco Asfalti SRL — Motion Edition (animation-maxed)

La variante **più dinamica e ricca di animazioni**. Vite + React + Framer Motion.
Palette carbone caldo + arancione vivido, tipografia **Syne + Inter**.

## Animazioni incluse

- **Preloader** con contatore 0→100 e tendina di rivelazione.
- **Cursore personalizzato** con inerzia (dot + anello) che reagisce agli hover *(desktop)*.
- **Bottoni magnetici** (hero + CTA).
- **Hero cinetica**: titolo con reveal a maschera riga per riga, badge circolare
  rotante (testo su tracciato), strada animata, parallax allo scroll.
- **Marquee doppi** in direzioni opposte (uno pieno, uno outline inclinato).
- **Manifesto**: testo che si "accende" parola per parola allo scroll.
- **Numeri** con contatori e barre animate.
- **★ Materiali a scorrimento orizzontale** (pinned).
- **★ "Come nasce una strada"**: il rullo stende l'asfalto mentre scrolli.
- **Servizi**: card che si impilano (sticky stacking).
- **Realizzazioni**: card con tilt 3D che segue il mouse.
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
in `components/Faq.jsx`, aggiorna anche il JSON-LD.
