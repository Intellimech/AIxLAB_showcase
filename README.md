# 🏭 AI Lab Showcase

Benvenuti nel repository ufficiale della **Vetrina Progetti del Laboratorio di Intelligenza Artificiale**.

Questo repository ospita il codice sorgente e i contenuti del sito web che raccoglie i PoC, i tutorial e i progetti di ricerca sviluppati dal laboratorio.

🔗 **Sito Live:** [https://DavideCesani-IMECH.github.io/AIxLAB_showcase/](https://DavideCesani-IMECH.github.io/AIxLAB_showcase/)

---

## 🚀 Come Funziona (Automazione)

Il sito è costruito con un approccio **"Docs as Code"** per ridurre a zero la manutenzione tecnica. Non serve modificare l'HTML per aggiungere contenuti.

1.  **Contenuto:** I progetti sono semplici cartelle contenenti un file `README.md` (formattato in un modo specifico) e i file media (immagini/video).
2.  **Motore:** Uno script Python (`build.py`) scansiona le cartelle, legge i metadati YAML e converte il Markdown in pagine HTML.
3.  **Deploy:** Ogni volta che si effettua un `push` sul branch `main`, una **GitHub Action** esegue lo script e pubblica automaticamente il sito aggiornato.

---

## 📂 Struttura del Repository

```text
/ (root del progetto)
├── .github/
│   └── workflows/
│       └── build.yml       <-- Istruzioni per GitHub
├── img/                 <-- Loghi e immagini globali
├── templates/              <-- Contiene il "master" index.html
│   └── index.html
|
├── progetti
|       Applicazioni_Industriali/       <-- Le tue cartelle categorie progetti
|       └── Progetto_X/
|           ├── README.md       <-- Con i dati YAML in cima
|           ├── index.html      <-- Il template dettaglio (copiato)
|           ├── assets/         <-- Video/img del progetto
|           └── altro come Data e Codice se vogliamo condividerli
├── styles                  <-- con gli stili delle pagine
├── scripts               <-- con gli script delle pagine
├── build.py                <-- Lo script Python che aggiorna il sito
└── requirements.txt        <-- Elenco librerie
```


## 📝 Guida: Come aggiungere un Nuovo Progetto
Per pubblicare un nuovo progetto, segui questi 4 passaggi:
1. **Crea la Cartella** ⟶
Vai nella categoria corretta e crea una cartella con il nome del progetto. Esempio: progetti/Applicazioni_Industriali/Visual_Inspection_System

2. **Aggiungi i Media** ⟶
Crea una sottocartella assets dentro la cartella del tuo progetto e inserisci il video (.mp4) e l'immagine (.png) che userai come copertina.

3. **Crea il file README.md** ⟶
Crea un file README.md nella cartella del progetto.
Deve iniziare con il seguente blocco YAML (copia e incolla questo template):

```YAML
---
title: "Titolo del Tuo Progetto"
summary: "Una descrizione breve (max 3 righe) che apparirà nella card in Home Page."
img_card: "assets/progetto.png"
media: "assets/tuo_video.mp4"       # Percorso relativo al file video
contact_email: "tua.mail@intellimech.it" # La mail a cui verranno inviate le richieste (se serve modificare quella di default)

# Configurazione delle Etichette (Labels)
labels:
  - text: "Computer Vision"
    type: "domain"       # Verde (Ambiti applicativi)
  - text: "YOLOv8"
    type: "lib"          # Viola (Librerie/Framework)
  - text: "Python"
    type: "tech"         # Blu (Linguaggi)
  - text: "PoC"
    type: "type"         # Arancione (Tipo di progetto)
---

## Descrizione
Qui inizia il testo del progetto in formato Markdown standard.
Il video/immagine definito sopra verrà inserito automaticamente in cima alla pagina.

Puoi usare:
* Liste puntate
* **Grassetto**
* [Link esterni](https://google.com)
* Codice: `print("Hello World")`

## Risultati
Descrivi qui i risultati tecnici o di business ottenuti.
```

🎨 Legenda Label <br>
Usa il campo type nel YAML per assegnare il colore corretto all'etichetta:
| Valore `type` | Colore | Utilizzo |
| :--- | :--- | :--- |
| `tech` | 🔵 **Blu** | Linguaggi e tecnologie base (Python, C++) |
| `domain` | 🟢 **Verde** | Ambito applicativo (Vision, NLP, IoT) |
| `lib` | 🟣 **Viola** | Librerie e Framework (Pandas, YOLO, PyTorch) |
| `type` | 🟠 **Arancione** | Tipologia (PoC, Pilot, Tutorial) |

4. **Pubblica** ⟶
Esegui il push su GitHub:
```Bash
git add .
git commit -m "Nuovo progetto: Visual Inspection"
git push
```
Attendi circa 60 secondi e controlla il sito live.



## 🛠 Sviluppo Locale (Per manutenzione)
Se devi modificare la grafica (gloabl.css / projects.css) o la logica di generazione (build.py):
Clona il repo e apri il terminale.
Crea un ambiente virtuale (opzionale ma consigliato) e installa le dipendenze:
```Bash
pip install -r requirements.txt
```
Esegui lo script di build:
```Bash
python build.py
```
Apri il file index.html generato nella root per testare le modifiche prima di fare push.

© Intellimech AI Lab - Documentazione Interna