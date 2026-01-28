---
title: "Schedulazione di test chimici"
summary: "Sistema ibrido NeuroSymbolic AI e Reinforcement Learning per l'ottimizzazione della schedulazione di test chimici, focalizzato su minimizzazione dei tempi interpretabile con Explainable AI."
img_card: "assets/progetto.png"
media: "assets/progetto.png"
contact_email: "contact@intellimech.it"

labels:
  - text: "Reinforcement Learning"
    type: "domain"
  - text: "Scheduling"
    type: "domain"
  - text: "PPO"
    type: "tech"
  - text: "stable-baselines3"
    type: "lib"
  - text: "RLlib"
    type: "lib"
  - text: "PoC"
    type: "type"
---

## Il Problema
Il progetto affronta la sfida della schedulazione di **test chimici** per lotti di produzione. L'obiettivo principale è ottimizzare la sequenza dei test per ogni lotto al fine di **minimizzarne la durata complessiva**, garantendo al contempo il rigoroso rispetto di **vincoli di processo e temporali** (scadenze dei lotti). Oltre all'efficienza temporale, il problema richiede la capacità di **estrarre informazioni** utili per spiegare e giustificare la soluzione ottenuta agli operatori umani.

## La Soluzione
L'approccio proposto si basa su un'architettura ibrida che integra **NeuroSymbolic AI** e **Reinforcement Learning**. Il sistema elabora un elenco di test da eseguire e genera una schedulazione ottimizzata. Un ulteriore componente fondamentale è l'**Explainable AI**, introdotta per rendere trasparente il processo decisionale dell'algoritmo generando diagrammi di Gantt della soluzione ottimizzata ed heat-map che permettono di avere sotto controllo il carico delle macchine.

<details>
<summary><strong>Approfondimento tecnico</strong></summary>
<ul>
  <li>🚀 <strong>Panoramica</strong>: Il problema viene modellato come Flexible Job‑Shop Scheduling Problem (FJSSP).</li>
  <li>🧩 <strong>Ambiente (<code>FJSSPEnv</code>)</strong>: ambiente Gym‑compatibile, altamente configurabile (job, task, macchine, durate e variabilità degli interventi umani) per simulare scenari di diversa complessità.</li>
  <li>🤖 <strong>Agent & Algoritmi</strong>: implementazioni di riferimento per <strong>PPO</strong> (stable‑baselines3) e esperimenti comparativi con <strong>RLlib</strong> per benchmarking.</li>
</ul>
</details>

## Risultati
Il PoC ha prodotto risultati incoraggianti: nelle istanze di test gli agenti hanno mostrato riduzioni del makespan e un migliore utilizzo delle risorse rispetto a politiche casuali e greedy, spingendo a proseguire nello sviluppo e nell'affinamento degli agenti.