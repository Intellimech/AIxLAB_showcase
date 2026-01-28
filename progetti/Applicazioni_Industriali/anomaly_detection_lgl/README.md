---
title: "Rilevamento Anomalie per Alimentatori di Filo Tessile"
summary: "Sistema di anomaly detection online per manutenzione predittiva di alimentatori di filo in macchine tessili industriali."
img_card: "assets/ecompact2-2_JPG_500_375_cover_100.jpg"
media: "assets/lgl_ecoprogress.mp4"
contact_email: "davide.pasanisi@intellimech.it"

labels:
  - text: "Python"
    type: "tech"
  - text: "Analisi Dati"
    type: "domain"
  - text: "Grafana"
    type: "lib"
  - text: "Production"
    type: "type"
---

## Il Problema
Nelle macchine tessili industriali (macchine per maglieria, telai a pinza e a proiettile) operano numerosi alimentatori di filo in parallelo.

Derive lente di processo, causate da usura meccanica, variazioni di filato o condizioni operative non ottimali, possono degradare la qualità del tessuto o generare fermi macchina non pianificati.  
Queste anomalie sono difficili da individuare tramite semplici soglie statiche o controlli manuali.

## Soluzione
È stato sviluppato un sistema di anomaly detection online basato sull’analisi continua di serie temporali provenienti dagli alimentatori di filo.

Il progetto si articola in due fasi principali:

### Clustering degli alimentatori
Gli alimentatori vengono automaticamente raggruppati in famiglie omogenee di comportamento tramite algoritmo DBSCAN, consentendo confronti significativi solo tra dispositivi che operano in condizioni simili.

### Rilevamento delle anomalie
All’interno di ciascun cluster, ogni alimentatore viene monitorato rispetto al comportamento medio del gruppo mediante soglie dinamiche adattive, in grado di intercettare derive lente di processo.

Le grandezze fisiche monitorate includono:

* tensione meccanica del filo
* velocità dell’alimentatore di trama
* coppia del motore avvolgitrama
* consumo di filato
* tensione di alimentazione dell’alimentatore

## Risultato
La soluzione è attualmente in produzione in ambito industriale tessile e abilita un approccio di manutenzione predittiva basato sui dati.

Il sistema fornisce un output continuo e in tempo reale tramite dashboard interattive su Grafana, che permettono di:

* visualizzare indicatori di anomalia per singolo alimentatore
* confrontare il comportamento tra alimentatori appartenenti allo stesso cluster
* analizzare trend storici e deviazioni progressive

Le dashboard sono integrate nell’infrastruttura di fabbrica e accessibili agli operatori e alla manutenzione.

I principali benefici includono:

* individuazione precoce di derive di processo
* riduzione dei fermi macchina non pianificati
* maggiore stabilità del processo produttivo
* miglioramento della qualità del prodotto tessile
