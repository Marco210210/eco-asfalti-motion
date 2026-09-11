# Scena 0 — Stabilimento (apertura)

## Stile (identico per ogni scena — non modificare)

- **Resa**: cinematica fotorealistica, come un filmato promozionale
  industriale di alta gamma — mood cinematico minimal da sito prodotto di fascia alta, in resa fotoreale, non
  illustrata. **Niente diorama, niente effetto miniatura/tilt-shift, niente
  stile cartone animato o "giocattolo"**: metallo, polvere, vapore e luce
  devono avere una resa fisica credibile, come girato con una vera camera su
  un vero impianto.
- **Palette**: accento arancio brand `#ff8a50 → #ff5c1a → #bc3108` (mezzi,
  livree, dettagli meccanici, luci di lavoro) · metallo/grafite macchinari
  `#4b4d53 → #25262b → #121317` · vetro cabine azzurro pallido `#9bd5e8` con
  riflessi scuri · bitume/conglomerato caldo bruno-antracite lucido con
  bagliore arancio (~150°C, vapore leggero) · cielo mediterraneo caldo, tardo
  pomeriggio, colline dei Monti Lattari sullo sfondo.
- **Livree**: tutti i mezzi (camion, finitrice, rullo) portano il logo "ECO
  ASFALTI" in bianco su arancio, stile industriale pulito.
- **Figure umane**: operai in scala, gilet alta visibilità arancio/giallo,
  elmetto — presenti ma non protagonisti.
- **Luce**: un'unica sorgente calda e coerente (sole basso, ombre lunghe
  morbide) — deve restare identica in tutte le scene, è quello che le farà
  sembrare parte dello stesso filmato anche se generate separatamente.
- **Niente testo/UI bruciato nel video**: nessuna scritta overlay, contatore
  o logo animato. Nessun marchio/logo reale diverso da "ECO ASFALTI"
  da nessuna parte nella scena (cartelli, edifici, sfondo, macchinari).
- **Audio**: nessuna narrazione, nessuna voce fuori campo, nessun dialogo,
  nessuna musica. Se il generatore include comunque una traccia audio, deve
  essere solo rumore ambientale realistico (vento, industria in lontananza)
  — mai una voce che descrive o commenta la scena.

## Grammatica di camera

Camera che avanza in modo continuo lungo il percorso fisico della scena, non
torna mai indietro, non attraversa mai muri o macchinari nel senso sbagliato.
Movimento fluido, non a scatti.

## Continuità

Questa è la **prima** scena della sequenza (nessuna scena precedente).
L'ultimo fotogramma deve preparare il collegamento con la Scena 1: la camera
termina scesa ad altezza strada, allineata con la strada d'ingresso
all'impianto, **inquadratura vuota** — pronta per "raccogliere" il camion
che entrerà in scena all'inizio della Scena 1. Il camion che arriva con il
fresato è l'azione della Scena 1, non di questa: se compare già qui, l'arrivo
sembrerà ripetuto due volte quando le scene vengono unite.

## La scena

Vista aerea che scende dolcemente sulla campagna di Nocera Superiore: tetti
in cotto, colline dei Monti Lattari sullo sfondo, poi l'impianto Eco Asfalti
che appare — ciminiere, silos, piazzale — con la strada di accesso (Via
Alveo Santa Croce) che entra nell'inquadratura. La camera scende fino ad
altezza strada e si allinea con la strada d'ingresso, che resta **vuota**:
**nessun camion, nessun veicolo e nessuna persona in movimento in questa
scena** — solo l'impianto, il piazzale e la strada deserta, pronti ad
accogliere il camion nella scena successiva.

## Parametri tecnici

- Durata: **massimo 8 secondi** (limite Veo per generazioni 1080p/4K)
- Risoluzione: **1080p o 4K**, va richiesta esplicitamente (il default è 720p)
- Audio: **niente narrazione/voce** — al massimo rumore ambientale, verrà comunque rimosso in montaggio
- Clip indipendente: verrà unita alle altre in post-produzione.
