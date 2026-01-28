---
title: "Assistente AI per compilazione relazione CdA"
summary: "Sistema RAG Agentico per il supporto alla segreteria del Consiglio di Amministrazione: analisi documenti, dati Excel e ricerche web."
img_card: "assets/assistente_cda_card.png"
media: "assets/assistente_cda_project.png"
contact_email: "it@intellmech.it"

labels:
  - text: "GenAI"
    type: "domain"
  - text: "Agentic AI"
    type: "domain"
  - text: "RAG"
    type: "tech"
  - text: "LangGraph"
    type: "lib"
  - text: "LlamaIndex"
    type: "lib"
  - text: "PoC"
    type: "type"
---

## Il Problema
La segreteria del Consiglio di Amministrazione deve gestire una grande mole di informazioni eterogenee: verbali storici in PDF, registri delle presenze in Excel e notizie finanziarie dal web. Recuperare rapidamente un dato specifico (es. "Chi era presente alla riunione del...?" o "Cosa è stato deciso riguardo a...?") richiede tempo e precisione, spesso rallentando i processi decisionali.

## La Soluzione
Abbiamo sviluppato un **Assistente AI Agentico** integrato in Microsoft Teams che supporta la segreteria in tempo reale.
A differenza di una chat classica, questo sistema "ragiona" sulla richiesta dell'utente e attiva lo strumento più adatto: consulta l'archivio documenti per informazioni qualitative, elabora i file Excel per statistiche e presenze, o naviga sul web per dati di borsa aggiornati.

<details>
<summary><strong>🛠️ Esplora l'Architettura Tecnica</strong></summary>

<p>Il sistema è basato su un'architettura a microservizi all'avanguardia:</p>
<ul>
<li>⚡ <strong>Backend:</strong> Potente API in Python con <strong>FastAPI</strong>.</li>
<li>🧠 <strong>Cervello Agente:</strong> Orchestrazione decisionale tramite <strong>LangGraph</strong>.</li>
<li>📚 <strong>RAG Evoluto:</strong> Ricerca semantica su documenti non strutturati con <strong>LlamaIndex</strong> e <strong>ChromaDB</strong>.</li>
<li>📊 <strong>Analisi Dati:</strong> Agente Pandas (crea ed esegue codice Python sicuro) autonomo per l'estrazione di insight da file Excel.</li>
<li>🌐 <strong>Live Web Search:</strong> Accesso a dati in tempo reale dal web.</li>
<li>🔒 <strong>Sicurezza:</strong> Backend privato per la gestione dei dati.</li>
</ul>
</details>

## Risultati
Il sistema permette di interrogare lo storico aziendale in linguaggio naturale, riducendo i tempi di ricerca. Garantisce risposte basate su dati reali (citando sempre la fonte, sia essa un PDF, una riga Excel o un sito web) e mantiene la riservatezza dei dati operando su un backend privato.
Trattandosi di un **Proof of Concept (PoC)**, è attualmente in fase di valutazione la scalatura dell'intera architettura verso **Microsoft Azure**.
