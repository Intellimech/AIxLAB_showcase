# AIxLAB_showcase
## struttura repository

/ (root del progetto)
├── .github/
│   └── workflows/
│       └── build.yml       <-- (NUOVO) Istruzioni per GitHub
├── img/                 <-- Loghi e immagini globali
├── templates/              <-- (NUOVO) Contiene il "master" index.html
│   └── index.html
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