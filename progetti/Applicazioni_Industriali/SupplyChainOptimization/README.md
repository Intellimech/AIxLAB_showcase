---
title: "Supply Chain Optimization PoC"
summary: "Proof of Concept per sistema di ottimizzazione di una Supply Chain multi-step."
img_card: "assets/SCO.png"
media: "assets/SCO.png"
contact_email: "daniele.crippa@intellimech.it" # La mail a cui verranno inviate le richieste (se serve modificare quella di default)

# Configurazione delle Etichette (Labels)
labels:
  - text: "Supply Chain"
    type: "domain"       # Verde (Ambiti applicativi)
  - text: "Process Optimization"
    type: "domain"       # Verde (Ambiti applicativi)
  - text: "Pandas"
    type: "lib"          # Viola (Librerie/Framework)
  - text: "pymoo"
    type: "lib"          # Viola (Librerie/Framework)
  - text: "SimPy"
    type: "lib"          # Viola (Librerie/Framework)
  - text: "Python"
    type: "tech"         # Blu (Linguaggi)
  - text: "PoC"
    type: "type"         # Arancione (Tipo di progetto)
---

## Descrizione del problema
**Introduzione**
Sviluppato nel contesto del progetto EU SM4RTENANCE, questo caso d'uso affronta l'ottimizzazione integrata di una Supply Chain, costituita da un'azienda che vende un prodotto (vari codici), dai suoi clienti che lo acquistano e da un fornitore che produce il prodotto.

L'obbiettivo complessivo è fornire uno strumento di pianificazione che permetta di utilizzare un previsionale di ordini di acquisto da parte dei clienti per minimizzare ritardi, costi ed emissioni.

Il previsionale è costituito da un elenco di ordini associati a identificativo del cliente, nazione per la spedizione, codice prodotto richiesto, quantità, data prevista per l'ordine e deadline per la consegna stabilita secondo le policy aziendali.

Partendo dal vincolo principale del problema, ovvero il soddisfacimento dei termini di consegna al cliente, il flusso di ottimizzazione si sviluppa all'indietro fino alla produzione dei codici prodotto stessi.

Il processo complessivo si divide in tre fasi principali: includendo i processi di consegna, approvvigionamento e produzione,
- **"Delivery":** consegna da parte dell'azienda al cliente.
- **"Supply":** approvvigionamento dei prodotti dal fornitore all'azienda.
- **"Production":** produzione interna del fornitore. Si considerano le richieste da parte dell'azienda e altre richieste nello stesso periodo provenienti da altri potenziali clienti del fornitore.

## Soluzione
**Introduzione:** La soluzione è suddivisa in tre step sequenziali integrati, ognuno con modelli specifici che interagiscono tramite output strutturati.
- **Step 1 — Delivery Optimization:** ottimizza mezzo e timing delle consegne ai clienti da parte dell'azinda per ogni ordine, bilanciando latenze, costi ed emissioni. Utilizza un algoritmo genetico (NSGA-II) per l'ottimizzazione multi-obbiettivo, tenendo conto delle riduzioni di costo e consumo complessivo per spedizioni che aggregano ordini diversi spediti allo stesso paese. Le soluzioni sub-ottimali sono scelte tramite psudo-pesi.
- **Step 2 — Supply Optimization:** pianifica anticipo e arrivi fornitori per ridurre numero di trasporti e costi di magazzino interni all'azienda. Anche in questo caso, si impiega un algoritmo genetico per l'ottimizzazione, tenendo conto delle riduzioni di costo per trasporti aggregati.
- **Step 3 — Production Simulation & Scheduling:** simula la linea produttiva e la allinea con i valori a stock per evadere ordini nei tempi stabiliti. Il processo produttivo simulato è quello di tre linee produttive parallele, che producono rispettivamente il materiale base ("Plates"), il semilavorato ("Strips") e i codici prodotto finali ("Tapes"). Utilizza una simulazione a eventi discreti (DES) che permette di tenere conto dei vincoli produttivi (es. disponibilità delle macchine, turni di lavoro) e di magazzino (es. quantità minime e capienza per ogni possibile codice prodotto). A differenza dei primi due step, ragiona su una scala temporale oraria, anzi che giornaliera.

<details>
<summary><strong>Vuoi saperne di più?</strong></summary>

Qui puoi trovare riferimenti alle librerie Python Open Source utilizzate e agli algoritmi implementati:
* Ottimizzazione multi-obiettivo: [pymoo](https://pymoo.org/).
* Algoritmo genetico: [NSGA-II](https://ieeexplore.ieee.org/document/996017)
* Scelta delle soluzioni: [Pseudo-Weights](https://pymoo.org/getting_started/part_3.html)
* Simulazione a eventi discreti e gestione risorse: [SimPy](https://simpy.readthedocs.io/en/latest/).
* Strutture dati: [Pandas](https://pandas.pydata.org/).
* Plotting e visualizzazione: [matplotlib](https://matplotlib.org/).

<!-- [Contattaci](mailto:daniele.crippa@intellimech.it?subject=Info_Use_Case_SCO) per altri dettagli! -->

</details>

## Risultati
Il modello sviluppato permette di ottenere degli schedule specifici per le tre fasi della Supply Chain considerate. Ciò si traduce in tabelle contenenti le date di inizio e fine delle spedizioni e dei trasporti associati a ogni ordine e un file JSON contenente i timestamp di inizio produzione per ogni possibile semilavorato e prodotto finale.

Nella figura seguente si può verificare il risultato dell'ottimizzazione per i processi di Delivery e Supply. Si nota come gli ottimizzatori tendano ad accorpare spedizioni relative a clienti della stessa nazione o trasporti vicini nel tempo.

![Delivery-Supply Schedule](assets/del_sup_schedule.png)

Di seguito invece si riporta l'andamento del livello a magazzino dei diversi codici prodotto, che evidenzia le evasioni relative agli ordini considerati e il rispetto dei vincoli di magazzino.

![Stock check](assets/prod_stock.png)