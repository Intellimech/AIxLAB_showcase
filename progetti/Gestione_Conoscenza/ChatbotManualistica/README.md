---
title: "Assistente Tecnico Intelligente"
summary: "Chatbot che risponde a domande tecniche interrogando i PDF dei manuali macchine."
media: "assets/chat_preview.png"
contact_email: "nlp.team@intellimech.it"

labels:
  - text: "GenAI"
    type: "domain"
  - text: "RAG"
    type: "tech"
  - text: "LangChain"
    type: "lib"
  - text: "Internal Tool"
    type: "type"
---

## Scenario
I tecnici dell'assistenza passano il 30% del loro tempo a cercare codici di errore su manuali PDF lunghi centinaia di pagine.

## La Soluzione (RAG)
Abbiamo implementato un'architettura **Retrieval-Augmented Generation**:
1.  I manuali vengono indicizzati in un Vector Database (ChromaDB).
2.  Quando il tecnico fa una domanda, il sistema recupera i paragrafi rilevanti.
3.  Un LLM (GPT-4 o Llama3 locale) genera la risposta basandosi *solo* sui documenti aziendali.

## Vantaggi
* **Risposte immediate:** Da 15 minuti di ricerca a 10 secondi.
* **Multilingua:** I manuali sono in italiano, ma il bot può rispondere in inglese ai colleghi esteri.
* **Citazioni:** Il bot indica sempre pagina e capitolo della fonte.