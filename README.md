# AI-InnoScEnCE Ecosystem Viewer

![AI-InnoScEnCE Logo](src/assets/AI-INNOCENSE-LOGO.png)

## Overview

The **Circular Economy (CE) Ecosystem Viewer** is an interactive web application designed to visualize and explore the innovation ecosystems of three pilot regions: **Hamburg** (Germany), **Novi Sad** (Serbia), and **Cahul** (Moldova).

This tool allows stakeholders, researchers, and policymakers to discover entities involved in Circular Economy activities, understand their relationships, identify gaps and synergies, and foster collaboration across the ecosystem using the **CE Taxonomy**.

This project is part of the **AI-InnoScEnCE** initiative (Work Package 4).

## ✨ Key Features

*   **Ecosystem Dashboard**: Real-time metrics on ecosystem growth, partnerships, and confidence levels.
*   **Entity Registry**: Browsable database of organizations with role-based filtering and search.
*   **Partnership Network**: Visualizing connections between entities locally and internationally.
*   **Collaboration Finder**: Dynamic clustering of entities based on shared **Activities**, **Capabilities**, and **Needs** (grouped by CE Taxonomy categories).
*   **Geospatial Mapping**: Interactive maps showing the physical distribution of ecosystem actors.
*   **Data Integrity**: Verified, clean datasets with no duplicate or spurious entries.

## 🛠️ Technologies

*   **Frontend Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Routing**: [React Router](https://reactrouter.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Maps**: [Leaflet](https://leafletjs.com/) / [React Leaflet](https://react-leaflet.js.org/)
*   **Deployment**: GitHub Pages (via GitHub Actions)

## 📂 Project Structure

```text
src/
├── components/      # Reusable UI components
│   ├── Layout/      # AppShell, Navigation
│   ├── Map/         # Leaflet Map components
│   └── UI/          # StatsCard, Charts
├── hooks/           # Custom hooks
│   └── useEcosystemData.ts  # Core data fetching & clustering logic
├── pages/           # Main application views
│   ├── Dashboard.tsx
│   ├── Entities.tsx
│   ├── Collaboration.tsx    # Clusters & Taxonomy browsing
│   └── Partnerships.tsx
├── types/           # TypeScript definitions
│   ├── index.ts     # Entity & Cluster interfaces
│   └── taxonomy.ts  # CE Activity Taxonomy
└── assets/          # Static assets (Logos, Images)
```

## 🔌 Data Sources

The application consumes structured, verified JSON data located in `public/data/`:
*   `hamburg.json`: Ecosystem data for Hamburg region.
*   `cahul.json`: Ecosystem data for Oldenburg/Cahul region.
*   `novi_sad.json`: Ecosystem data for Novi Sad region.

## 🚀 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/TUHHStartupEngineers/ai-innoscence-wp4-frontend-react.git
    cd ai-innoscence-wp4-frontend-react
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` in your browser.

## 🌍 Deployment

This project is automatically deployed to **GitHub Pages** via GitHub Actions.
Any push to the `main` branch triggers the deployment workflow defined in `.github/workflows/deploy.yml`.

**Live Demo**: [https://TUHHStartupEngineers.github.io/ai-innoscence-wp4-frontend-react/](https://TUHHStartupEngineers.github.io/ai-innoscence-wp4-frontend-react/)

## About

© 2026 AI-InnoScEnCE Project. AI-Empowered Innovation in Natural Science and Engineering for the Circular Economy.
A project funded by EIT HEI Initiative.
