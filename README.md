# Ydigital Website

Mumbai's top-rated digital marketing agency website — built with React + Vite.

## Pages
- **Home** — Hero, stats, about, service preview, testimonials
- **Services** — SEO, PPC, Influencer Marketing, Product Marketing, Social Media
- **Blogs** — Future scope / coming soon page
- **FAQs** — Accordion FAQs + query submission form
- **Contact** — Contact form + footer

## Quick Start

### Prerequisites
- Node.js 18+ installed ([nodejs.org](https://nodejs.org))

### Steps

```bash
# 1. Navigate into the project folder
cd ydigital

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open **http://localhost:5173** in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## Tech Stack
- React 18
- Vite 5
- Google Fonts (Syne + DM Sans) — loaded via CSS @import
- Pure CSS animations (no external animation libraries needed)

## Customisation
- All content is in `src/App.jsx`
- Colours are CSS variables at the top of the `GlobalStyles` component:
  - `--blue: #0057FF`
  - `--orange: #FF6B1A`
  - Change these to rebrand instantly
- Replace `ImgPlaceholder` components with real `<img>` tags when you have assets
