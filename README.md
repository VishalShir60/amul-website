<div align="center">

  <img src="public/amul-logo.png" alt="Amul - The Taste of India" width="220" />

  # 🫐 Amul — 3D Cinematic Scroll Animation Experience

  **An Apple-grade, high-performance scroll-driven web experience showcasing Amul High Protein Blueberry Shake with 240 HD frames, hardware-accelerated canvas rendering, and dynamic glassmorphism UI.**

  <br />

  [![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
  [![HTML5 Canvas](https://img.shields.io/badge/HTML5-Canvas_60FPS-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Modern_UI-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

  <br />

  [Explore Features](#-key-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture--performance) • [Project Structure](#-project-structure) • [License](#-license)

</div>

---

## 📖 Overview

This project delivers an interactive, high-fidelity product showcase for **Amul High Protein Blueberry Shake**. 

By mapping native window scroll progress to a sequence of **240 high-definition 1080p rendered frames**, users experience fluid, cinema-quality physics as the product bottle emerges, blueberries swirl, and a rich milk crown splash expands across the screen.

### 🌟 Highlights
- **Zero Video Latency**: Powered by `<canvas>` frame drawing instead of heavy `<video>` elements, eliminating scrubbing stutter, codec lag, and mobile playback restrictions.
- **Buttery 60/120 FPS Lerp**: Custom damping algorithm smoothly interpolates frame positions (`requestAnimationFrame`) to remove trackpad and mouse-wheel jitter.
- **Dynamic Scroll Fade**: The centered hero title (**Amul**) and tagline (**The taste of India**) automatically float and fade away precisely at 30% scroll progress.
- **Seamless Storytelling**: Smoothly transitions from the 3D scroll sequence directly into interactive nutrition tables, sensory meters, verified customer reviews, and pack selectors.

---

## ✨ Key Features

### 🎬 1. 240-Frame Canvas Scrub Engine
- Preloads all 240 image frames into memory (`Image()` objects) asynchronously.
- Implements a **nearest-loaded-frame fallback buffer**, ensuring that even during high-velocity rapid scrolling, the canvas never flashes blank or drops frames.
- Automatic **Retina & HiDPI scaling** (`1920x1080` base buffer) with CSS `object-fit: contain` for responsive presentation across mobile, tablet, and ultrawide monitors.

### 🎨 2. Transparent Floating Glass Navigation
- Ultra-modern frosted glass header (`backdrop-blur-md`) with the official **Amul ("The Taste of India")** logo.
- One-click smooth scrolling to page anchors:
  - `Experience` (`#scroll-section`)
  - `Nutrition Facts` (`#nutrition`)
  - `Flavor & Sourcing` (`#flavor-story`)
  - `Reviews` (`#reviews`)
  - `Shop Packs` (`#packs`)
- Responsive mobile drawer with smooth auto-closing links.

### 📊 3. Precision Nutrition & Macro Matrix
- Highlights **20g Pure Dairy Protein**, **Zero Added Sugar**, **130 Clean Kcal**, and **4.5g BCAAs**.
- Head-to-head comparison card contrasting Amul's cold-filtered native milk formulation against standard commercial milkshakes.

### 🫐 4. Flavor Sourcing & Sensory Meters
- Interactive progress meters measuring sweetness, creaminess, fruitiness, and protein density.
- Highlights Amul's cooperative model empowering **3.6 million farmer members**.

### 📦 5. Interactive Pack Selector
- 3-tier product pricing cards:
  - **Trial 6-Pack** (₹240)
  - **Starter 12-Pack** (₹456 — *Most Popular, Save 5%*)
  - **Monthly Athlete Box 30-Pack** (₹1,140 — *Best Value + Free Stainless Shaker*)
- One-time purchase vs. **Subscribe & Save 10%** toggle.

---

## 🛠️ Architecture & Performance

```
+-------------------------------------------------------------+
|                        Window Scroll                        |
+-------------------------------------------------------------+
                              │
                              ▼
            +-----------------------------------+
            |  Bounding Rect Progress (0 to 1)  |
            +-----------------------------------+
                              │
                              ▼
         +--------------------+---------------------+
         │                                          │
         ▼                                          ▼
+-----------------------+              +------------------------+
| Scroll Hero Text Fade |              | Target Frame Calculate |
| (0% - 30% Fade-out)   |              | (Progress * 239)       |
+-----------------------+              +------------------------+
                                                    │
                                                    ▼
                                       +------------------------+
                                       | Smooth Lerp Controller |
                                       | (current += diff * 0.2)|
                                       +------------------------+
                                                    │
                                                    ▼
                                       +------------------------+
                                       | Canvas Render Buffer   |
                                       | (1920 x 1080 1:1 Draw) |
                                       +------------------------+
```

### Performance Metrics:
- **Instant Preload**: All 240 frames (~8.4 MB total) load in parallel into browser cache.
- **Zero Third-Party Runtime Dependencies**: Core scroll animation runs purely on native **HTML5 Canvas 2D API** and vanilla JavaScript for minimal bundle size and lightning-fast load times.
- **Production Bundle**: Bundled via Vite to under **2.3 KB JS** (gzipped: ~1.0 KB).

---

## 📁 Project Structure

```bash
AMUL/
├── public/
│   ├── amul-logo.png             # Official cropped transparent Amul logo
│   └── frames/                   # 240 sequence frames (1920x1080 JPEG)
│       ├── ezgif-frame-001.jpg
│       ├── ezgif-frame-002.jpg
│       └── ... [up to frame-240.jpg]
├── src/
│   ├── main.js                   # Preloader, lerp loop, canvas renderer & text fade
│   └── style.css                 # Sticky canvas container, scroll margins & resets
├── index.html                    # Complete semantic page layout with Tailwind config
├── package.json                  # Scripts & project metadata
└── README.md                     # Documentation
```

---

## 🚀 Quick Start

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or higher recommended).

### 1. Clone the repository
```bash
git clone https://github.com/your-username/amul-scroll-animation.git
cd amul-scroll-animation
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser to view the application live.

### 4. Build for production
```bash
npm run build
```
The optimized static build will be generated in the `dist/` directory, ready to deploy to Vercel, Netlify, or GitHub Pages.

### 5. Preview production build
```bash
npm run preview
```

---

## 🎨 Design System & Palette

| Token | Hex Value | Description |
| :--- | :--- | :--- |
| **Primary** | `#441290` | Signature Amul royal purple |
| **Tertiary** | `#4300a0` | Deep electric violet |
| **Primary Container**| `#5c32a8` | Gradient highlight tone |
| **Background** | `#fef7ff` | Soft warm milk surface |
| **On-Surface** | `#1f1634` | Deep eggplant typography |
| **Secondary (Green)**| `#006e2d` | Iconic Amul vegetarian green badge |
| **Canvas Backing** | `#4b297d` | Ambient frame edge blending |

---

## 📱 Responsive & Cross-Browser Compatibility

Tested and optimized across:
- **Desktop**: macOS Safari, Google Chrome, Mozilla Firefox, Microsoft Edge (60Hz & 120Hz ProMotion displays).
- **Mobile & Tablet**: iOS Safari, Android Chrome (touch and swipe responsive).

---

## 👨‍💻 Author & Credits

Designed & Developed with ❤️ by **[Vishal Shirsath](https://github.com/VishalShir60)**.

---

## 📄 License

This project is created for educational and portfolio demonstration purposes. All trademarks, logos, and brand assets belong to their respective owners: **Gujarat Co-operative Milk Marketing Federation Ltd. (Amul)**.

Code released under the [MIT License](LICENSE).

<div align="center">
  <sub>Designed &amp; Developed by <a href="https://github.com/VishalShir60">Vishal Shirsath</a> • Crafted with ❤️ for Amul — The Taste of India.</sub>
</div>
