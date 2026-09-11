# Scena 1 — Arrivo e recupero

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
  essere solo rumore ambientale realistico (motore, ghiaia) — mai una voce
  che descrive o commenta la scena.

## Grammatica di camera

Camera che avanza in modo continuo lungo il percorso fisico della scena, non
torna mai indietro, non attraversa mai muri o macchinari nel senso sbagliato.
Movimento fluido, non a scatti.

## Continuità

Il primo fotogramma riprende da dove finiva la Scena 0 (vedi descrizione
esatta sotto, in "La scena" — non allegare immagini, l'agente non le usa in
modo affidabile come vincolo sul primo frame: la continuità va data solo a
parole, il più specifica possibile). L'ultimo fotogramma deve preparare la
Scena 2: il camion ha appena scaricato sul cumulo, la camera è vicina al
cumulo di fresato, pronta a staccarsi verso l'area di lavorazione.

## La scena

**Il primissimo fotogramma deve essere identico a questo, prima di qualunque
movimento**: una strada d'asfalto vuota, a livello del suolo (non aerea),
che punta dritta verso l'ingresso dell'impianto Eco Asfalti — un edificio
grigio/antracite con l'insegna "ECO ASFALTI" ben visibile in fondo alla
strada, silos e ciminiere dietro, colline sullo sfondo, luce calda di tardo
pomeriggio da destra. Nessun camion ancora in scena in questo primo istante.

Solo dopo, nei secondi successivi, un camion Eco Asfalti entra
nell'inquadratura da dietro/di lato e comincia a percorrere questa stessa
strada verso il cancello, polvere leggera, calura che vibra sull'asfalto. La
camera lo segue di fianco/dietro, entra con lui nel piazzale. Il camion si
posiziona su un cumulo di fresato (materiale bituminoso frantumato,
bruno-nerastro) e ribalta il cassone, scaricandolo sul cumulo esistente.
Altri cumuli di fresato sullo sfondo, gru/pale che si intravedono.

## Parametri tecnici

- Durata: **massimo 8 secondi** (limite Veo per generazioni 1080p/4K)
- Risoluzione: **1080p o 4K**, va richiesta esplicitamente (il default è 720p)
- Audio: **niente narrazione/voce** — al massimo rumore ambientale, verrà comunque rimosso in montaggio
- Clip indipendente: verrà unita alle altre in post-produzione.
