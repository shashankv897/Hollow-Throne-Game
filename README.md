# Hollow Throne: Card Kingdom
> **Rule, Betray, Survive.** A dark roguelike strategy deckbuilder inspired by medieval illuminated manuscripts.

[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![Framework: React 19](https://img.shields.io/badge/Framework-React_19-61dafb.svg)](https://react.dev/)
[![Styling: Tailwind CSS v4](https://img.shields.io/badge/Styling-Tailwind_CSS_v4-38b2ac.svg)](https://tailwindcss.com/)
[![Built with: Vite](https://img.shields.io/badge/Bundler-Vite_8-646cff.svg)](https://vitejs.dev/)

---

## 👑 Overview

*Every crown is stolen. Every court is lying.*

You’ve seized a kingdom by force, and nobody in it trusts you. Every run is one reign lasting **12 seasons** across 3 grueling years. Each season brings severe crises: famine, rebellion, foreign envoys, and assassination plots. You answer with a hand of cards representing **Advisors**, **Armies**, **Secrets**, and **Royal Decrees**.

Balance your kingdom's **Four Pillars (0–10)**:
- **Crown**: Royal authority & treasury. At 0 you are bankrupt; at 10 terrified nobles strangle you in bed.
- **Army**: Martial readiness. At 0 barbarian hordes sack the capital; at 10 the generals stage a praetorian coup.
- **Church**: Holy legitimacy. At 0 you burn on the inquisitor's pyre; at 10 priests cloister you as a silent puppet.
- **People**: Commons & grain stores. At 0 starving mobs storm the gates; at 10 lazy subjects welcome foreign conquerors.

---

## ⚔️ Key Features

- **Deck-Building Rule**: Play cards to resolve crises and draft powerful new edicts into your royal deck between seasons.
- **Living Court Intrigue**: Courtiers track **Loyalty** and **Ambition** (0–10). If Ambition exceeds Loyalty, advisors hatch conspiracies or coups. Bribe, bestow titles, imprison in the dungeons, or banish them into exile.
- **4 Unlockable Sovereigns**:
  - **The Usurper**: Feared martial commander with discounted army cards, but decaying crown stability.
  - **The Regent**: Master of diplomatic treaties and court loyalty, ruling for a child king.
  - **The Heretic**: Miraculous forbidden rites powered by pillar blood sacrifices rather than gold.
  - **The Merchant Queen**: Massive seasonal bullion income with ability to overcharge actions.
- **30+ Story Epilogues**: Unique illuminated manuscript endings for every pillar collapse, advisor treason, and triumph.
- **Multiple Game Modes**:
  - **Standard Reign**: Survive 12 seasons to build an enduring dynasty.
  - **Dynasty Mode**: 3-generation succession where heirs inherit family vaults and reputations.
  - **Daily Seeded Reign**: Shared daily challenge with score rankings.
  - **Iron Crown Challenge**: Hardcore difficulty with lower starting pillars and no card redraws.
- **Reign Log**: Real-time decision review overlay tracking the last 5 cards played in the current season with exact resource & pillar impacts.
- **Atmospheric Procedural Audio**: Web Audio API engine synthesizing cathedral bells, dark cello drones, wax seal stamps, coin clinks, and drawn blades with zero external audio assets.

---

## 🛠️ Tech Stack

- **Runtime & Bundler**: Vite 8
- **Core Library**: React 19 (TypeScript)
- **Styling**: Tailwind CSS v4 + Medieval Illuminated Manuscript Aesthetics
- **Icons**: Lucide React
- **Sound Engine**: Custom Web Audio API procedural synthesizer
- **Persistence**: Browser `localStorage` for unlocks, history, and achievements

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/hollow-throne-game.git

# Enter project directory
cd hollow-throne-game

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build production bundle
npm run build

# Preview build locally
npm run preview
```

The compiled static assets will be in the `/dist` directory, ready to deploy to **Vercel**, **Netlify**, or **Cloudflare Pages**.

---

## 📜 License

Licensed under the Apache-2.0 License.
