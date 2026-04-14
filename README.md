# Balance+ ⚖️

Premium, desktop-first portfolio tracker with a futuristic, glassy aesthetic. Tracks balances, visualizes allocation, and persists everything locally for ultra-fast, private use.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
[![Deploy with Vercel](https://vercel.com/button)](https://twoj-link-z-vercela.vercel.app)

## ✨ Features
- **Multi-source rate sync**: USD/PLN from Exchangerate API with NBP fallback and safe default.
+- **Live portfolio donut**: Recharts chart with glow, custom tooltip, and responsive sizing across breakpoints.
- **Color palette with undo**: Per-slice pickers + undo history, persisted in `localStorage` (`sliceColors`).
- **Smart numeric inputs**: Accepts commas/dots, auto-rounds to 2 decimals.
- **Quick insights**: Highest bucket, liquidity ratio, USD exposure—stack nicely on small screens.
- **Stateful persistence**: Balances + `updatedAt` stored in `localStorage`; no backend.
- **Centered loading**: Full-screen loader while rates fetch.

## ⚠️ Scope
- **Local-only** data (no auth, no DB).
- Personal/internal tool.

## 🛠️ Tech
- React 18 + Vite
- TypeScript
- Tailwind CSS v4 (custom breakpoints)
- Recharts

## 🧭 Layout & Breakpoints
- Custom breakpoints in `src/index.css` (e.g., `lg` raised to `1200px`, `xl` 1440px, `2xl` 1600px).
- Layout shifts to 40/60 (Input/View) from `sm` up.
- Small screens: Quick Insights stack labels/values with subtle separators.

## 🎨 Color Controls
- Open the palette to pick exact colors per slice.
- Changes and history persist across reloads.

## 🚦 Getting Started
```bash
git clone https://github.com/your-username/balance-plus.git
cd balance-plus
npm install
npm run dev
```

## 📂 Structure
- `src/hooks/` – exchange rate logic, color state hook.
- `src/components/` – inputs, chart view, color palette, loader.
- `src/utils/` – persistence helpers & types.
- `src/App.tsx` – layout glue (data entry ↔ visualization).

## 🧪 Scripts
- `npm run dev` – dev server
- `npm run build` – production build

## 🤝 Contributing
Private tooling; no formal contributions expected. Suggestions welcome via issues.
