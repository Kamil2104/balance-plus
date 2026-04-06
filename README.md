# Balance+ ⚖️

A premium, high-performance financial tracking dashboard built with a "Futuristic Precision" aesthetic. This project focuses on clean architecture, real-time data processing, and a seamless user experience for personal wealth management.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## ✨ Key Features

- **Multi-Source Rate Sync**: Dynamic fetching of USD/PLN exchange rates using a multi-endpoint fallback system (NBP & Exchangerate API).
- **Live Portfolio Visualization**: Interactive donut charts powered by Recharts, featuring custom gradients and glassmorphism tooltips.
- **Smart Input Processing**: Advanced numeric fields that automatically handle localized separators (commas to dots) and ensure 2-decimal precision.
- **Instant Financial Insights**: Real-time calculation of liquidity ratios and USD exposure to provide immediate feedback on asset allocation.
- **Zero-Latency Persistence**: Automated state synchronization with `localStorage`, acting as a "Single Source of Truth" without the need for a database.
- **High-Fidelity UI**: A specialized dashboard layout featuring `backdrop-blur` effects, animated loaders, and glowing status indicators.

## ⚠️ Project Scope (Internal Use)

This project is a **custom tool built for personal use**, prioritizing speed and visual fidelity over general-purpose features:
- **Desktop First**: Optimized for workstation use; no mobile responsiveness implemented.
- **Local Data**: No backend or database integration; all data is stored client-side via LocalStorage.
- **Public Access**: No login or authentication system (designed for private, local environments).

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite.
- **Styling**: Tailwind CSS v4 using modern CSS variables and centralized theme configurations.
- **State Management**: React Hooks (useState, useMemo, useEffect) for reactive data flow.
- **Visualization**: Recharts for high-performance SVG data rendering.
- **Data Integrity**: TypeScript for strict typing of financial balances and API responses.

## 📂 Project Structure

The project follows the **Separation of Concerns** principle to ensure scalability:

- `src/hooks/`: Custom business logic for external API integration (e.g., currency fetching).
- `src/components/`: Modular UI elements and specialized input fields.
- `src/utils/`: Logic for data persistence and global TypeScript interfaces.
- `src/App.tsx`: The main layout engine connecting data entry with visual output.

## 🚦 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or pnpm

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/your-username/balance-plus.git](https://github.com/your-username/balance-plus.git)

2. Install dependencies:
   ```bash
  npm install
3. Start the development server:
   ```bash
   npm run dev