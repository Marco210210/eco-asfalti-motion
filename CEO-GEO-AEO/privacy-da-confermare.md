# Privacy: verifica con il titolare prima dell'approvazione definitiva

Le pagine pubbliche descrivono il comportamento implementato, non sono una
certificazione di conformità legale. Confrontarle con l'informativa precedente
e far confermare al titolare o al suo consulente questi punti:

- Identità, sede e recapito privacy della società; eventuale DPO se nominato.
- Chi legge richieste e preventivi, eventuali altri destinatari e fornitori.
- Tempi effettivi di cancellazione delle richieste non convertite, conservazione
  dei rapporti contrattuali, log hosting, contatori antispam e backup. Non sono
  stati inventati periodi aziendali: nelle pagine sono indicati i criteri.
- Accordi applicabili con Aruba e Google, ruoli, trasferimenti e garanzie attuali.
- Attivazione GA4 solo dopo ID corretto, revisione dell'informativa e configurazione
  della proprietà (2 mesi proposti per dati evento/utente, niente Ads/Signals,
  misurazione avanzata del flusso disattivata).
- Processo di gestione delle richieste di accesso/cancellazione/revoca.
- Prova del consenso: l'implementazione conserva scelta, data e versione nel browser.
  Non esiste un registro CSV sul server né vengono registrati hash IP per il consenso.
  Valutare con il consulente se occorra un registro ulteriore, con minimizzazione,
  tempi di conservazione e accessi definiti, prima di attivare misurazioni reali.
- Controllo dei cookie effettivi dopo deploy, inclusi quelli eventualmente aggiunti
  dall'hosting; aggiornare l'inventario se cambiano servizi o configurazioni.

Gli strumenti tecnici non richiedono lo stesso consenso dei tracciamenti facoltativi.
Con GA4 configurato il banner resta bloccante per Analytics finché non si accetta;
con GA4 non configurato non vengono richieste accettazioni prive di oggetto.
La scelta dura sei mesi ed è modificabile dal footer; scorrimento e navigazione
non sono usati come consenso. Nessuna pubblicità o marketing dal modulo.

Fonti: [Garante, linee guida cookie](https://www.garanteprivacy.it/home/docweb/-/docweb-display/docweb/9677876),
[GDPR](https://eur-lex.europa.eu/eli/reg/2016/679/oj/ita).
