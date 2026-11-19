# Scholastica - Open Academic Modules & Interactive Curriculum

> A minimalist, unrestricted browser portal disguised as a university curriculum repository. Every interactive module runs inside isolated, sandboxed `<iframe>` elements loaded dynamically from structured JSON, with zero AI bloat and complete academic vocabulary disguises.

---

## 🚀 How to View & Run the Website

### Option 1: Live Inside Google AI Studio (Instant)
The live application runs directly in the **Preview Panel** on the right side of the Google AI Studio interface. If you are in AI Studio, simply look at the preview tab or refresh the preview iframe.

### Option 2: Run Locally on Your Machine
To run this repository on your computer:

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/Curriculum-tasks.git
cd Curriculum-tasks

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Open **`http://localhost:3000`** in any browser.

To produce a production build:
```bash
npm run build
npm run preview
```

### Option 3: GitHub Pages Deployment (3 Simple Ways)
This repository includes a standalone pre-built distribution and an automated GitHub Actions pipeline. Your GitHub Pages site (`https://<your-username>.github.io/Curriculum-tasks/`) will work in any of the following 3 configurations:

#### Method A: Deploy from Branch - Root `/ (root)` (Default)
1. Go to your repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select branch **`main`** and folder **`/ (root)`**, then click **Save**.
4. The root `index.html` automatically boots the compiled standalone assets (`./assets/index.js` and `./assets/index.css`) with zero blank screens!

#### Method B: Deploy from Branch - `/docs`
1. Go to your repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select branch **`main`** and folder **`/docs`**, then click **Save**.
4. GitHub Pages serves the complete pre-built production bundle inside the `/docs` directory.

#### Method C: GitHub Actions (Recommended for Automated Continuous Deployment)
1. Go to your repository **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. The included workflow `.github/workflows/deploy.yml` will automatically build the latest TypeScript code and deploy it on every push to `main`.

---

## 🏛️ Academic Disguise & Features

| Gaming Terminology | Academic Curriculum Translation |
|---|---|
| Game | Interactive Practicum / Laboratory Module |
| Play / Launch | Initialize Practicum Session |
| High Score | Cumulative Honor Roll Index |
| Controls | Instrument Directives |
| Level / Difficulty | Academic Standing / Seminar Level |
| Game Over | Practicum Boundary Exhaustion |
| Boss / Objective | Scalar Target Thesis |

### Core Features
- **8 Built-in Standalone Modules** (HTML5 Canvas & Vanilla JS):
  - `MATH-2048`: Binary Matrix Reduction (2048)
  - `GEOM-101`: Orthogonal Polyomino Tessellation (Tetris)
  - `CS-102`: Linear Vector Traversal (Snake)
  - `PHYS-201`: Classical Kinematic Reflection (Pong)
  - `STAT-305`: Probabilistic Risk Field Deduction (Minesweeper)
  - `AERO-110`: Bernoulli Streamline Trajectory (Flappy Flight)
  - `LING-105`: Lexical Transcription Cadence (Typing Speed)
  - `NEUR-220`: Synaptic Association & Cognitive Recall (Memory Tiles)
- **JSON-Driven Architecture**: All modules, course codes, and directives are loaded from `/public/data/curriculum_modules.json`.
- **6 Academic Gradient Themes**: Oxford Collegiate, Cambridge Teal, Sorbonne Crimson, Caltech Amber, Midnight Auditorium, and Classic Parchment.
- **Emergency Stealth Mode (`Esc` or `~`)**: Instantly overlays a Cornell-style lecture note sheet on *Cellular Respiration* with interactive notes and diagram.
- **Tab Cloaking**: Disguise browser tab title and favicon as Canvas LMS, Google Classroom, Google Docs, or Wikipedia.
- **Pomodoro Focus Timer & Study Notes**: Built-in 25/5 study session timer and persistent research notes scratchpad alongside the sandbox.
- **Custom Practicum Importer**: Import any external iframe URL or embed code directly into the catalog.

---

## 🛠️ Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with subtle scholastic gradient tokens
- **Icons**: Lucide React
- **Persistence**: Browser `localStorage` for notes, starred syllabi, custom modules, and chosen themes.
