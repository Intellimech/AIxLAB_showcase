---
title: "Manutenzione Predittiva Cuscinetti"
summary: "Sistema IoT per monitorare la salute dei cuscinetti e prevedere guasti con 48h di anticipo."
img_card: "assets/progetto.png"
media: "assets/vibrazioni.mp4"
contact_email: "maintenance.ai@intellimech.it"

labels:
  - text: "IoT"
    type: "domain"
  - text: "Python"
    type: "tech"
  - text: "Sklearn"
    type: "lib"
  - text: "PoC"
    type: "type"
---

## Il Problema
I guasti improvvisi ai cuscinetti delle macchine CNC causano fermi linea non pianificati che costano all'azienda circa 15.000€ l'ora. La manutenzione a calendario spesso sostituisce pezzi ancora buoni o interviene troppo tardi.

## La Soluzione
Abbiamo sviluppato un sistema di **Anomaly Detection** basato su sensori di vibrazione (accelerometri).
Il modello apprende il comportamento "sano" della macchina e segnala deviazioni significative.

### Stack Tecnologico
* **Hardware:** Sensori IO-Link collegati a Edge Gateway
* **Software:** Python, Scikit-learn (Isolation Forest)
* **Dashboard:** Grafana per la visualizzazione in tempo reale

## Risultati
Il PoC, testato su 3 macchine per 6 mesi, ha identificato **2 guasti reali** con un anticipo medio di 36 ore, permettendo la sostituzione programmata durante il turno di notte.