<div align="center">

# 🧬 Human Digital Twin

**Un Digital Twin interattivo del corpo umano — esplorazione anatomica 3D in tempo reale**

[![Built with AI](https://img.shields.io/badge/Built%20with-Antigravity%20AI-blueviolet?style=for-the-badge&logo=google&logoColor=white)](#-sviluppato-interamente-con-ia)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-000000?style=for-the-badge&logo=threedotjs)](https://threejs.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<br/>

*Visualizza, esplora e interagisci con un modello anatomico 3D completo del corpo umano direttamente dal browser.*

</div>

---

## 📖 Indice

- [L'Idea](#-lidea)
- [Scopo del Progetto](#-scopo-del-progetto)
- [Sviluppato interamente con IA](#-sviluppato-interamente-con-ia)
- [Funzionalità](#-funzionalità)
- [Tech Stack](#-tech-stack)
- [Architettura](#-architettura)
- [Prerequisiti](#-prerequisiti)
- [Installazione e Setup](#-installazione-e-setup)
- [Struttura del Progetto](#-struttura-del-progetto)
- [Come Funziona](#-come-funziona)
- [Roadmap](#-roadmap)
- [Contribuire](#-contribuire)
- [Licenza](#-licenza)

---

## 💡 L'Idea

L'idea nasce da una domanda: **e se potessimo avere una replica digitale perfetta del nostro corpo, accessibile da un browser?**

Il corpo umano è il sistema più complesso che conosciamo — 206 ossa, oltre 600 muscoli, 100.000 km di vasi sanguigni, 86 miliardi di neuroni. Eppure, la maggior parte delle persone non ha mai avuto modo di esplorarlo in modo interattivo, intuitivo e visivamente coinvolgente.

**Human Digital Twin** vuole colmare questo divario. Non è un'app medica, non è un atlante statico: è un **gemello digitale vivo** del corpo umano — un modello 3D completo che puoi ruotare, sezionare, animare e, in futuro, personalizzare con i tuoi dati biometrici reali.

### L'Ideazione

Il progetto è stato concepito seguendo il **Metodo Sacchi** — un framework di sviluppo software strutturato in tre layer:

| Layer | Ruolo | Scopo |
|-------|-------|-------|
| **Directive** | Architect | Progettazione e specifiche tecniche |
| **Orchestration** | Orchestrator | Pianificazione, memoria e coordinamento |
| **Execution** | Developer | Implementazione con TDD rigoroso |

L'idea si è cristallizzata in milestone progressive:
1. **Milestone 1-2** *(corrente)*: Rendering 3D + UI interattiva + animazione battito cardiaco
2. **Milestone 3-4** *(futura)*: Integrazione dati biometrici reali (wearable, API salute)
3. **Milestone 5+** *(visione)*: Simulazioni predittive, digital twin personalizzato

---

## 🎯 Scopo del Progetto

Human Digital Twin ha tre obiettivi principali:

### 1. Educazione Anatomica
Fornire uno strumento visuale per esplorare l'anatomia umana in modo interattivo. Ogni sistema anatomico (scheletrico, muscolare, cardiovascolare, nervoso, organi) può essere attivato o disattivato indipendentemente, permettendo di studiare le relazioni tra i diversi apparati.

### 2. Visualizzazione Biomedica
Creare una piattaforma dove dati biometrici reali (frequenza cardiaca, temperatura, livelli di ossigeno) possano essere mappati su un modello 3D, trasformando dati astratti in una rappresentazione visiva comprensibile.

### 3. Piattaforma per Digital Twin Personali
La visione a lungo termine è permettere a ogni utente di avere il proprio "gemello digitale" — un avatar anatomico che riflette il proprio stato di salute in tempo reale, alimentato da dati provenienti da wearable e dispositivi IoT medicali.

---

## 🤖 Sviluppato Interamente con IA

> **Questo progetto è stato sviluppato al 100% con l'assistenza dell'Intelligenza Artificiale, utilizzando [Antigravity](https://www.antigravity.dev/) come ambiente di sviluppo agentico.**

Cosa significa in pratica:

- **Nessuna riga di codice è stata scritta manualmente.** Ogni file — dai componenti React alle configurazioni Vite, dagli stili CSS allo store Zustand — è stato generato, revisionato e iterato dall'agente IA.
- **L'IA ha gestito l'intero ciclo di vita:** analisi dei requisiti → pianificazione dell'architettura → scaffolding del progetto → implementazione dei componenti → testing nel browser → commit e push su GitHub.
- **Il ruolo umano è stato di direzione e validazione:** l'utente ha fornito la visione, approvato le decisioni architetturali, e confermato i risultati. L'IA ha eseguito.

Questo progetto dimostra che lo sviluppo software AI-assisted non è più un esperimento: è un flusso di lavoro produttivo e reale.

### Strumenti IA utilizzati
- **Antigravity** — IDE agentico con accesso a terminale, browser, file system
- **Fabbrica Agentica** — Framework DOE (Directive/Orchestration/Execution) per strutturare il lavoro IA
- **MCP Servers** — Sequential Thinking per analisi complesse, Context7 per memoria persistente

---

## ✨ Funzionalità

### Milestone 1-2 (Attuale)

| Feature | Descrizione |
|---------|-------------|
| 🧍 **Modello 3D completo** | Corpo umano caricato da file GLB con tutte le gerarchie anatomiche |
| 🔄 **Navigazione 3D** | Rotazione, zoom e pan con OrbitControls e damping |
| 🎛️ **Toggle Sistemi Anatomici** | 6 interruttori per mostrare/nascondere: Pelle, Scheletro, Muscoli, Cardiovascolare, Nervoso, Organi |
| 💓 **Battito Cardiaco Simulato** | Animazione sistole/diastole realistiche calcolata in tempo reale |
| 📊 **Pannello Dati Vitali** | Display BPM con indicatore cardiaco animato |
| 🌙 **UI Glassmorphism** | Sidebar semitrasparente con backdrop blur e design premium |
| 💡 **Illuminazione Cinematografica** | Multi-directional lighting + environment map per riflessi realistici |

---

## 🛠️ Tech Stack

| Tecnologia | Versione | Ruolo |
|------------|----------|-------|
| **React** | 19.x | UI Framework |
| **Vite** | 7.x | Build tool & dev server |
| **Tailwind CSS** | 4.x | Utility-first CSS |
| **Three.js** | 0.172+ | Motore 3D WebGL |
| **React Three Fiber** | 9.x | React renderer per Three.js |
| **@react-three/drei** | 10.x | Helper e componenti R3F |
| **Zustand** | 5.x | State management leggero |
| **Git LFS** | 3.x | Versionamento file 3D di grandi dimensioni |

---

## 🏗️ Architettura

```
┌─────────────────────────────────────────────────────────┐
│                      Browser                             │
│  ┌─────────────────────────────────────────────────────┐ │
│  │  App.jsx                                            │ │
│  │  ┌──────────────────────┐  ┌──────────────────────┐ │ │
│  │  │    Canvas3D.jsx      │  │    Sidebar.jsx       │ │ │
│  │  │  ┌────────────────┐  │  │  ┌────────────────┐  │ │ │
│  │  │  │  HumanModel    │  │  │  │ SystemToggle×6 │  │ │ │
│  │  │  │  • GLB Loader  │  │  │  │                │  │ │ │
│  │  │  │  • Node Classif │  │  │  ├────────────────┤  │ │ │
│  │  │  │  • Heartbeat   │  │  │  │  VitalSigns    │  │ │ │
│  │  │  └───────┬────────┘  │  │  └───────┬────────┘  │ │ │
│  │  └──────────┼───────────┘  └──────────┼───────────┘ │ │
│  │             │                         │              │ │
│  │             └────────┐   ┌────────────┘              │ │
│  │                      ▼   ▼                           │ │
│  │              ┌───────────────────┐                   │ │
│  │              │  useBodyStore.js  │                   │ │
│  │              │     (Zustand)     │                   │ │
│  │              └───────────────────┘                   │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

### Flusso Dati

1. **Zustand Store** mantiene lo stato globale (toggle visibilità, BPM)
2. **Sidebar** legge e scrive lo store tramite toggle switches
3. **HumanModel** legge lo store e applica `visible` ai nodi 3D classificati
4. **useFrame** (R3F) anima il battito cardiaco 60 volte/secondo

---

## 📋 Prerequisiti

- **Node.js** 18+ (consigliato 22 LTS)
- **npm** 9+
- **Git** con **Git LFS** installato
- Un browser moderno con supporto WebGL (Chrome, Firefox, Edge, Safari)

---

## 🚀 Installazione e Setup

### 1. Clona il repository

```bash
git clone https://github.com/TorchiaHub/human_digital_twin.git
cd human_digital_twin
```

> **Nota:** il file `human_body.glb` (~157MB) viene scaricato automaticamente tramite Git LFS. Assicurati di avere Git LFS installato (`git lfs install`).

### 2. Installa le dipendenze

```bash
npm install
```

### 3. Avvia il dev server

```bash
npm run dev
```

### 4. Apri nel browser

```
http://localhost:5173/
```

---

## 📁 Struttura del Progetto

```
human_digital_twin/
├── public/
│   ├── human_body.glb          # Modello 3D anatomico (Git LFS)
│   └── vite.svg                # Favicon
├── src/
│   ├── components/
│   │   ├── Canvas3D.jsx        # Scena R3F (Canvas, luci, OrbitControls)
│   │   ├── HumanModel.jsx      # Loader GLB + toggle visibilità + heartbeat
│   │   ├── Sidebar.jsx         # Pannello laterale glassmorphism
│   │   ├── SystemToggle.jsx    # Componente toggle singolo sistema
│   │   └── VitalSigns.jsx      # Display dati vitali (BPM)
│   ├── stores/
│   │   └── useBodyStore.js     # Zustand store (stato globale)
│   ├── App.jsx                 # Layout principale
│   ├── main.jsx                # Entry point React
│   └── index.css               # Tailwind CSS + stili custom
├── index.html                  # HTML entry point
├── vite.config.js              # Configurazione Vite + Tailwind plugin
├── package.json                # Dipendenze e script
├── .gitattributes              # Git LFS tracking per *.glb
└── .gitignore                  # Files ignorati
```

---

## ⚙️ Come Funziona

### Classificazione dei Nodi Anatomici

`HumanModel.jsx` attraversa il grafo della scena 3D usando `scene.traverse()` e classifica ogni nodo in un sistema anatomico basandosi sul nome:

```javascript
const SYSTEM_PATTERNS = {
  skeletal:       ['bone', 'skel', 'skull', 'spine', 'rib', ...],
  muscular:       ['muscle', 'bicep', 'tricep', 'deltoid', ...],
  cardiovascular: ['heart', 'vein', 'artery', 'aorta', ...],
  nervous:        ['nerve', 'brain', 'cerebr', 'neuron', ...],
  organs:         ['liver', 'kidney', 'lung', 'stomach', ...],
  integumentary:  ['skin', 'dermis', 'body', 'surface', ...],
}
```

Quando un toggle viene disattivato nella sidebar, tutti i nodi del sistema corrispondente vengono nascosti impostando `node.visible = false`.

### Animazione Battito Cardiaco

Il battito cardiaco è simulato con `useFrame()` di React Three Fiber, che esegue una funzione ad ogni frame (~60fps):

- Calcola la fase del ciclo cardiaco basandosi sul tempo elapsed
- Simula due contrazioni rapide (**lub-dub**) seguite da una fase di riposo
- Applica un fattore di scala ai nodi del cuore (sistole = contrazione, diastole = rilascio)

---

## 🗺️ Roadmap

- [x] **M1** — Setup progetto (React + Vite + Tailwind + R3F)
- [x] **M2** — Rendering 3D, toggle anatomici, battito cardiaco
- [ ] **M3** — Click su organi per info dettagliate
- [ ] **M4** — Integrazione dati biometrici (wearable API)
- [ ] **M5** — Simulazioni condizioni mediche
- [ ] **M6** — Digital Twin personalizzato con dati utente

---

## 🤝 Contribuire

Il progetto è open-source e accoglie contributi. Per contribuire:

1. Fai un fork del repository
2. Crea un branch per la tua feature (`git checkout -b feature/nome-feature`)
3. Committa le modifiche (`git commit -m 'feat: descrizione'`)
4. Pusha il branch (`git push origin feature/nome-feature`)
5. Apri una Pull Request

---

## 📄 Licenza

Distribuito con licenza MIT. Vedi `LICENSE` per maggiori informazioni.

---

<div align="center">

**Fatto con 🧠 dall'IA, diretto dall'umano.**

[TorchiaHub](https://github.com/TorchiaHub) · [Segnala un Bug](https://github.com/TorchiaHub/human_digital_twin/issues) · [Richiedi una Feature](https://github.com/TorchiaHub/human_digital_twin/issues)

</div>
