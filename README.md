# 📖 Find Manga

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Version](https://img.shields.io/badge/Version-0.1.0-orange?style=for-the-badge)](./package.json)

A premium, modern manga discovery platform built with **Next.js 15** and **Tailwind CSS 4**. Explore thousands of manga titles with a sleek, responsive interface powered by the **Kitsu API**.

---

## ✨ Features

- 🔍 **Dynamic Search**: Real-time manga search with debounced queries for a smooth experience.
- 📂 **Curated Collections**: Browse through "Most Popular", "Highest Rated", "New & Trending", and more.
- 🎲 **Random Discovery**: Feeling lucky? Find your next read with the random discovery feature.
- 📱 **Fully Responsive**: Optimized for every device, from mobile to desktop.
- ⚡ **Lightning Fast**: Built on Next.js 15 with SWR for intelligent data fetching and caching.
- 🎨 **Premium UI**: Modern aesthetics featuring gradients, skeleton loaders, and micro-animations.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Data Fetching**: [SWR](https://swr.vercel.app/) & [Axios](https://axios-http.com/)
- **Icons**: [Heroicons](https://heroicons.com/) & [Lucide React](https://lucide.dev/)
- **Components**: [Radix UI Slot](https://www.radix-ui.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/adam-ctrlc/find-manga.git
   cd find-manga
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory:

   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📦 Project Structure

```text
src/
├── app/            # Next.js App Router (Pages & API)
├── components/     # Reusable UI components
├── services/       # API services (Kitsu, HTTP)
└── lib/            # Utility functions
```

---

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality.

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE.md).
