# Eco Asfalti — generazione per scene separate

Invece di un unico prompt "tutto in uno" (`SCROLL_WORLD_BRIEF.md`), qui la
stessa storia è divisa in 7 file indipendenti, uno per scena — così puoi
generare (e rigenerare) ogni scena da sola, anche con tool diversi, senza
dover rifare tutto se una non ti convince.

## I file

| File | Scena | Dura |
|---|---|---|
| `scena-0-stabilimento.md` | Apertura aerea sull'impianto | ~8s |
| `scena-1-arrivo-recupero.md` | Camion che arriva, scarica il fresato | ~8s |
| `scena-2-valorizzazione.md` | Lavorazione del recuperato | ~8s |
| `scena-3-produzione.md` | Cuore dell'impianto, mescolazione | ~8s |
| `scena-4-carico-trasporto.md` | Carico del conglomerato, camion in partenza | ~8s |
| `scena-5-stesa.md` | Finitrice e rullo che stendono l'asfalto | ~8s |
| `scena-6-finitura-chiusura.md` | Segnaletica, chiusura aerea circolare | ~8s |

Ogni file è **autosufficiente**: contiene già lo stile, la palette, la
grammatica di camera e i parametri tecnici, così puoi incollarlo da solo in
qualunque tool (Gemini, Flow, altro) senza dover copiare anche gli altri file.

## Cosa è cambiato rispetto al brief originale

Il video uscito da Flow era tecnicamente più definito ma "a cartone";
quello uscito dalla Gemini app base era più realistico pur essendo a
risoluzione più bassa. La causa più probabile: il brief originale chiedeva
esplicitamente un "diorama isometrico, tilt-shift/miniatura" — che è la
tecnica visiva che fa sembrare una scena un plastico giocattolo. Flow/Veo
Quality la segue alla lettera (e infatti rende "a cartone"); il motore base
di Gemini l'ha ignorata, ottenendo per caso il look fotorealistico che
preferisci. In questi 7 file quella richiesta è stata tolta e sostituita con
un'indicazione esplicita di resa **cinematica fotorealistica**, con un
"niente diorama/miniatura/cartone" scritto chiaro — dovrebbe avvicinare
anche Flow al risultato che ti piace.

## Continuità tra le scene (limite onesto da sapere)

Generando le scene separatamente **non otterrai il "volo unico senza tagli"**
della pipeline a pagamento di scroll-world — quella tecnica lì funziona
perché ogni clip video parte esattamente dall'ultimo fotogramma della clip
precedente (frame-locking), cosa che Gemini/Flow in modalità normale non
permettono di fare con precisione pixel-per-pixel.

Quello che ho fatto per limitare il problema:
- **stile identico** (palette, luce, livree) ripetuto identico in ogni file,
  cosa che da sola aiuta molto a farle sembrare parte dello stesso filmato
- ogni file dice esplicitamente cosa deve mostrare il **primo** e l'**ultimo**
  fotogramma della scena, pensati per agganciarsi visivamente a quelli vicini
- se il tool che usi permette di partire da un'immagine (image-to-video),
  usa come immagine di partenza l'ultimo fotogramma della clip precedente —
  quando avrai le clip generate, mandamele e ti estraggo io quei fotogrammi
  con ffmpeg, così hai l'immagine pronta da dare in pasto alla scena dopo

## Il montaggio finale

Quando hai tutte e 7 le clip, mandamele (o dimmi dove sono salvate): le
monto io con ffmpeg, con una breve dissolvenza incrociata tra una scena e
l'altra per smussare i punti di taglio — non serve cercare un'altra AI per
questo, è un'operazione deterministica che faccio in locale, gratis.

Non è obbligatorio generarle tutte con lo stesso tool: se una scena viene
meglio su Gemini base e un'altra su Flow, va benissimo mescolare, purché lo
stile bible (sezione in cima a ogni file) resti quello.
