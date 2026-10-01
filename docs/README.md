# Documentazione del progetto

- [Pubblicazione Aruba e form](pubblicazione-aruba.md): build, caricamento, SMTP e verifiche.
- [Configurazione SMTP di esempio](contact-config.example.php): segnaposto senza password reali.
- [Verifica documenti](verifica-documenti.md): fonti e decisioni sulla pubblicazione dei PDF.
- [Materiali e immagini](materiali-e-immagini.md): provenienza e criteri delle immagini.
- [Prompt immagini](materials-image-prompts.json): dati delle immagini illustrative.

Gli originali ricevuti sono in `DOCUMENTAZIONE_RICEVUTA`; le copie destinate al
sito hanno nomi stabili in `public/certificazioni` e sono necessarie alla build.
I doppioni identici di AUA e modello 231 sono stati archiviati localmente dopo
confronto SHA-256. La comunicazione AGCM è in `DOCUMENTAZIONE_RICEVUTA/CERTIFICAZIONI`.

Backup del vecchio hosting, video sorgenti e pacchetti di caricamento restano
locali, rispettivamente in `backups`, `media-masters` e `release`, esclusi da Git.
