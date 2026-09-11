# Scena 3 — Produzione (il cuore dell'impianto)

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
  essere solo rumore ambientale realistico (macchinari, bruciatori) — mai
  una voce che descrive o commenta la scena.

## Grammatica di camera

Camera che avanza in modo continuo lungo il percorso fisico della scena, non
torna mai indietro, non attraversa mai muri o macchinari nel senso sbagliato.
Movimento fluido, non a scatti.

## Continuità

Il primo fotogramma riprende da dove finiva la Scena 2: la camera entra nel
cuore dell'impianto seguendo il materiale appena salito ai silos. L'ultimo
fotogramma deve preparare la Scena 4: il conglomerato nuovo, caldo e lucido,
è appena caduto in un silo di stoccaggio/tramoggia, pronto per essere
caricato su un camion in attesa.

Se il tool permette di partire da un'immagine (image-to-video), usa come
immagine di partenza l'ultimo fotogramma della Scena 2.

## La scena

La camera entra nel cuore dell'impianto: torre di miscelazione, silos degli
aggregati, cisterne del bitume, il tamburo essiccatore/mescolatore. Un
dettaglio importante: un tubo/quadro con etichetta **GPL** (non più BTZ)
accanto ai bruciatori, fiamma pulita bluastra invece che fumosa — richiama la
transizione energetica dell'impianto. Il conglomerato bituminoso nuovo,
caldo e lucido, esce dal mescolatore e cade in un silo di stoccaggio con un
lieve vapore.

## Parametri tecnici

- Durata: **massimo 8 secondi** (limite Veo per generazioni 1080p/4K)
- Risoluzione: **1080p o 4K**, va richiesta esplicitamente (il default è 720p)
- Audio: **niente narrazione/voce** — al massimo rumore ambientale, verrà comunque rimosso in montaggio
- Clip indipendente: verrà unita alle altre in post-produzione.
