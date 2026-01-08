---
title: "Controllo Qualità Saldature"
summary: "Analisi automatica della porosità delle saldature tramite Computer Vision."
img_card: "assets/progetto.png"
media: "assets/weld_demo.mp4"
contact_email: "vision.lab@intellimech.it"

labels:
  - text: "Computer Vision"
    type: "domain"
  - text: "Deep Learning"
    type: "tech"
  - text: "YOLOv8"
    type: "lib"
  - text: "Pilot"
    type: "type"
---

## Obiettivo
Automatizzare l'ispezione visiva delle saldature su componenti automotive, attualmente svolta manualmente con lampade UV, un processo lento e soggetto a stanchezza dell'operatore.

## Approccio
Utilizziamo una rete neurale convoluzionale (CNN) addestrata su un dataset di 1.200 immagini di saldature classificate come "Conformi", "Porosità" o "Cricche".

### Caratteristiche
* **Velocità:** Analisi in < 50ms per pezzo.
* **Hardware:** Jetson Orin Nano per inferenza on-edge.
* **Integrazione:** Segnale OK/NOK inviato direttamente al PLC via Modbus.

## Performance
Il sistema ha raggiunto un'accuratezza del **96.5%** sul set di validazione, riducendo i falsi positivi del 12% rispetto al sistema di visione tradizionale precedente.