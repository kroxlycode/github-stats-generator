<div align="center">

# Github Stats Generator

<p align="center">
  <strong>Dynamic, high-performance GitHub profile statistics cards, badges, and README template generator.</strong>
</p>

<p align="center">
  <a href="https://github.com/kroxlycode/github-stats-generator">
    <img src="https://img.shields.io/badge/Status-Active-emerald?style=for-the-badge&logo=github" alt="Status" />
  </a>
  <a href="https://github.com/kroxlycode/github-stats-generator/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License" />
  </a>
  <a href="https://skillicons.dev">
    <img src="https://img.shields.io/badge/Powered%20By-SkillIcons.dev-7928ca?style=for-the-badge" alt="SkillIcons" />
  </a>
</p>

<br />

<!-- 📸 SCREENSHOT PLACEHOLDER 1: MAIN DASHBOARD -->
<p align="center">
  <img src="./assets/screenshots/stats-preview.png" alt="Github Stats Generator Dashboard" width="900" />
</p>

</div>

---

## 🌟 Overview

**Github Stats Generator** is a modern, fast, and feature-packed web application designed to help developers create stunning GitHub profile `README.md` cards, badges, and templates effortlessly.

Built with **React, Vite, TypeScript, Tailwind CSS, Express, and Vercel Serverless Functions**.

---

## 📸 Screenshots & Showcase

<!-- 📌 FOTOĞRAF EKLEME REHBERİ:
  Projenize ekran görüntüleri eklemek için:
  1. Proje dizininizde "assets/screenshots" adında bir klasör oluşturun.
  2. Ekran görüntülerinizi bu klasöre kaydedin ve isimlerini aşağıdakilerle eşleştirin:
     - stats-preview.png
     - icons-preview.png
     - readme-generator-preview.png
-->

### 1. 📊 Dynamic Stats Cards (18+ Themes)
Generate real-time GitHub Profile Stats, Top Languages, Streak Stats, Activity Graphs, and Trophies.

<p align="center">
  <img src="./assets/screenshots/stats-preview.png" alt="Stats Cards Preview" width="850" />
</p>

---

### 2. 🛡️ Badges & Icon Library (SkillIcons & Shields)
Browse over 60+ tech icons, social media badges with modal link builders, and multi-skill strips.

<p align="center">
  <img src="./assets/screenshots/icons-preview.png" alt="Icon Library Preview" width="850" />
</p>

---

### 3. 📋 Complete README Template Generator
One-click README.md template generator with live side-by-side rendering and copy/download controls.

<p align="center">
  <img src="./assets/screenshots/readme-generator-preview.png" alt="README Generator Preview" width="850" />
</p>

---

## ✨ Key Features

- **⚡ 7 Core SVG Stats Cards**: Profile Stats, Top Languages, Streak Stats, Animated Typing SVG Header, Live Pinned Repo Stats, Activity Graph, and GitHub Trophies.
- **🎨 18+ Harmonious Themes**: Radical, Tokyo Night, Dracula, Catppuccin, Nord, Cyberpunk, Synthwave, Monokai, and custom 2-color linear gradients.
- **📦 Live GitHub REST API Fetching**: Real-time fetching of public repository details (stars, forks, description, main language).
- **🛡️ Integrated SkillIcons.dev**: Create 1:1 square skill strips with dark/light theme switching.
- **🔗 Social Link Modal Builder**: Instant link generator with fixed base URLs for Instagram, LinkedIn, X (Twitter), Telegram, Discord, etc.
- **📋 Profile README.md Generator**: Customize bio, socials, and cards to export a complete README.md template.
- **🌍 Full i18n Internationalization**: 5 languages supported out of the box (Turkish, English, German, Spanish, French).
- **☁️ Vercel Serverless Ready**: Zero-config deployment on Vercel as an SPA + Serverless Functions.

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/kroxlycode/github-stats-generator.git
cd github-stats-generator
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Servers
Run the Vite client dev server and native Express API server:

```bash
# Terminal 1: Run Vite Frontend
npm run dev

# Terminal 2: Run Express API Server (port 3001)
npm run api
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## ☁️ Vercel Deployment

Deploying on Vercel is seamless:

```bash
npx vercel
```

Or connect your GitHub repository directly in the [Vercel Dashboard](https://vercel.com/new). The included `vercel.json` and `api/index.ts` automatically handle static SPA routing and serverless SVG API endpoints.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Canvas Confetti
- **SVG Engine**: Custom Native Node/TS SVG Renderer (Bezier curves, HSL theming, i18n text rendering)
- **API Server**: Express.js, CORS, GitHub REST API integration
- **Deployment**: Vercel Serverless Functions (`@vercel/node`)

---

## 🤝 Credits & Acknowledgements

- **Author**: Dev by **kroxly** ([@kroxlycode](https://github.com/kroxlycode))
- **SkillIcons.dev**: Special thanks to [Gideon Tong](https://github.com/gideon-tong) for the amazing [SkillIcons.dev](https://skillicons.dev) project.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
