# Circuit de Barcelona-Catalunya — Interactive 3D F1 Portfolio

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r174-black?logo=threedotjs&logoColor=white)](https://threejs.org/)
[![R3F](https://img.shields.io/badge/React_Three_Fiber-9.0-black)](https://r3f.docs.pmnd.rs/)
[![Drei](https://img.shields.io/badge/@react--three/drei-10.0-red)](https://github.com/pmndrs/drei)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-black?logo=framer&logoColor=blue)](https://www.framer.com/motion/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-orange)](https://github.com/pmndrs/zustand)

A production-ready, interactive 3D Formula 1 Grand Prix-themed web portfolio for **Aishwarya H.C.** centered around the iconic **Circuit de Barcelona-Catalunya**. Features an anime/fighting game character select menu, dynamic PBR daylight rendering with environment reflections, high-speed camera transitions down to tarmac apexes, and 5 interactive career milestones.

---

## 🏎️ Key Features

* **Character Select Entry Screen**: Fighting-game inspired overlay with animated telemetry stats, Player 1 status badge, driver bio, skill gauges, and a cutout driver portrait with rim-lighting effects.
* **Photorealistic Daylight 3D Circuit**: Circuit de Barcelona-Catalunya rendered with Three.js ACESFilmicToneMapping, sRGB color space, realistic PBR city environment reflections, and soft horizon sky atmosphere (`#b0d4ec`).
* **Interactive Career Checkpoints (5 Turns)**:
  * **Turn 1 (Curva Elf)**: `SKILLS & EDUCATION` — Python, Swift, SQL, C, Java, UI/UX (Figma), MediaPipe, and AJIET BE-AIML (CGPA: 8.02).
  * **Turn 4 (Curva de Repsol)**: `ACHIEVEMENTS & LITERATURE` — World Record Holder ("The Mega Manuscript", True Dreamers Press), Published Author ("Letters Never Sent"), Medium Essayist, and Keynote Anchor.
  * **Turn 10 (La Caixa Hairpin)**: `PROJECTS` — **Swasth-AI** (Frontend Lead, Google MediaPipe 33-point tracking + ESP32 IoT sync) and **Tour Buddy Lite** (Solo Developer native Swift app for iOS & macOS).
  * **Turn 12 (Banc de Sabadell)**: `EXPERIENCE & LEADERSHIP` — Terrazoe Lead Web Developer (`terrazoe.in`), AJIET Campus Events Master of Ceremonies, and GeeksforGeeks Campus Ambassador.
  * **Turn 14 (Curva New Holland)**: `CONTACT & CREDENTIALS` — Direct contact channels (`rya.hc007@gmail.com`, `+91 9743474334`), verified GitHub, LinkedIn, and Medium profiles, and trilingual fluency (English, Kannada, Hindi).
* **Cinematic Camera Transitions**: Powered by `@react-three/drei`'s `CameraControls`. Smoothly descends from an isometric diagonal overview (`[-250, 180, 260]`) directly down to street-level apexes (`y ~ 7-9`) tilted along the racing line.
* **Double-Click Zoom to Point**: Double-clicking anywhere on the track surface smoothly swoops into that exact asphalt coordinate.
* **Audio FX Synthesizer**: Web Audio API synthesized F1 engine acceleration roar, transition whooshes, and tactile UI beeps.
* **Mobile & Safari Ready**: Optimized with `100dvh` (dynamic viewport height) preventing address bar clipping on iOS Safari and mobile browsers.

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18.0.0` or higher
- npm `v9.0.0` or higher

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Madeby-Aish/f1-barcelona-portfolio.git
cd f1-barcelona-portfolio
npm install
```

### Local Development
Run the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & Preview
Validate the production bundle:
```bash
npm run build
npm run preview
```

---

## 🌐 Netlify Deployment

This project builds as a static Single Page Application (SPA).

1. https://fabulous-unicorn-1ca7d4.netlify.app
2. The Interactive 3D F1 Portfolio v1 is already live, thanks to netlify!!
---

## 🛠️ Tech Stack Architecture

| Layer | Technologies |
|---|---|
| **Core Framework** | React 19, Vite 6 |
| **3D Graphics & WebGL** | Three.js, @react-three/fiber, @react-three/drei |
| **Camera & Controls** | CameraControls (Drei), ACESFilmicToneMapping |
| **State Management** | Zustand |
| **Styling & HUD Design** | Tailwind CSS, CSS Grid/Flexbox, Custom Polygons |
| **Micro-Interactions** | Framer Motion, Canvas Confetti |
| **Audio** | Web Audio API (real-time procedural sound synthesizer) |

---

## 🏛️ Asset Attribution & Licensing

* **3D Circuit Model**: Circuit de Barcelona-Catalunya 3D model licensed under [Creative Commons Attribution (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).
* **Original Creator**: Attributed to original model creators on Sketchfab.
* **Optimization**: Model compressed and quantized with `meshopt` and `KHR_mesh_quantization` for real-time WebGL performance.

---

## 📬 Contact & Connect

**Aishwarya H.C.**  
* 📍 Mangaluru, Karnataka, India  
* 📧 Email: [rya.hc007@gmail.com](mailto:rya.hc007@gmail.com)  
* 💻 GitHub: [github.com/Madeby-Aish](https://github.com/Madeby-Aish)  
* 💼 LinkedIn: [linkedin.com/in/aishwaryahc5506](https://linkedin.com/in/aishwaryahc5506)  
* ✍️ Medium: [medium.com/@rya.hc007](https://medium.com/@rya.hc007)
