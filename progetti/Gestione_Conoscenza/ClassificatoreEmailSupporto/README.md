---
title: "Smistamento Automatico Ticket"
summary: "AI per analisi email in arrivo e smistamento al dipartimento corretto."
img_card: "assets/progetto.png"
media: "assets/mail_flow.mp4"
contact_email: "support.ai@intellimech.it"

labels:
  - text: "NLP"
    type: "domain"
  - text: "Bert"
    type: "lib"
  - text: "Automation"
    type: "tech"
  - text: "Production"
    type: "type"
---

## Il Problema
Il service desk riceve 500 email al giorno. Una persona dedica 4 ore al giorno solo per leggere l'oggetto e inoltrare la mail a "Meccanica", "Elettronica" o "Software".

## Soluzione
Un modello di classificazione del testo (basato su BERT fine-tuned) legge il contenuto della mail e predice la categoria di appartenenza con un grado di confidenza.

* Se confidenza > 85%: Smistamento automatico.
* Se confidenza < 85%: Assegnazione a operatore umano per revisione.

## Risultato
Il 78% dei ticket viene ora smistato automaticamente istantaneamente, liberando mezza risorsa FTE per attività a valore aggiunto.