# Maison Noir — Architectural Real Estate Platform

An editorial, media-rich portfolio experience for **Maison Noir**, an elite real estate atelier brokering architectural residences. Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**, the application relies on performance-focused interactions, fluid smooth scrolling, and an interactive structural layout.

---

## Technical Highlights

- **Next.js 14 & App Router**: Leverages React Server Components with client-side interactive sub-components.
- **Lenis Smooth Scroll**: Implements non-blocking, performance-oriented layout panning and anchor-link transition controllers.
- **Dynamic CSS Variables & Dark Mode**: Implements instantaneous light/dark theme transition without style flash, managed via a theme script injecting local storage states prior to document mount.
- **Interactive Drafting Blueprint Map (Atlas)**: A responsive world map drafted in vector graphic paths, containing a coordinate tracker and automated viewport cycling.
- **Aspect-Ratio Locked Horizontal Scroll**: A viewport-height bound horizontal portfolio carousel preventing text-clashing on wider or shorter screens.
- **Fluid Micro-Animations**: Native Framer Motion spring states control custom pointer tracking, letterbox fades, and subtle noise grain filters.

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Animation Framework**: [Framer Motion v11](https://www.framer.com/motion/)
- **Scroll Engine**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Languages**: TypeScript, CSS3

---

## Directory Structure

```text
├── app/
│   ├── globals.css          # Core design variables, overrides, custom utilities, and layers
│   ├── layout.tsx           # Base HTML structure, fonts, scripts, and global layout wrappers
│   └── page.tsx             # Consolidated page entry point bringing together sections
├── components/
│   ├── Navigation.tsx       # Dynamic desktop/mobile menu with theme toggles
│   ├── SmoothScroll.tsx     # Lenis smooth-scroll initiator and anchor interceptor
│   ├── GrainOverlay.tsx     # Low-opacity ambient film grain filter
│   ├── Cursor.tsx           # Context-aware magnetic micro-pointer
│   └── sections/
│       ├── Hero.tsx         # Media background with parallax content overlays
│       ├── Philosophy.tsx   # Text chapter layouts with auto-dimming perspective transitions
│       ├── Manifesto.tsx    # Scroll-linked structural typography triggers
│       ├── Portfolio.tsx    # Vertically pinned horizontal multi-card viewport list
│       ├── Atlas.tsx        # Blueprint world map with interactive city nodes
│       └── Contact.tsx      # Multi-column encrypted contact form with custom select components
├── public/                  # Static assets (images, vectors, video feeds)
├── tailwind.config.ts       # Core theme configuration, palette, and custom transition configurations
├── tsconfig.json            # Strict TypeScript configuration
└── package.json             # Build commands and dependency configurations
```

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.17.0 or higher recommended) and npm/yarn/pnpm installed.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/maison-noir.git
   cd maison-noir
   ```

2. **Install package dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Provide Assets:**
   Place your media assets in the `public` directory. Specifically:
   - `/hero.mp4` - A cinematic loop used in the hero background video structure.

4. **Launch the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Architectural Configurations

### Tailwind Color Palette & Theme Tokens

Custom color design tokens are integrated directly within `tailwind.config.ts` and synced dynamically inside `@layer base` in `app/globals.css`.

Theme adjustments can be completed by re-defining key variables inside `app/globals.css`:

```css
:root {
  /* LIGHT MODE (Warm Stone & Dark Slate) */
  --color-bg: #fafaf9;
  --color-bg-elev: #ffffff;
  --color-ink: #1c1917;
  --color-accent: #9c7e37;
  --color-line: rgba(28, 25, 23, 0.1);
}

.dark {
  /* DARK MODE (Obsidian & Metallic Gold) */
  --color-bg: #0a0908;
  --color-bg-elev: #131110;
  --color-ink: #f5f1e8;
  --color-accent: #c9a961;
  --color-line: rgba(245, 241, 232, 0.08);
}
```

### Performance Optimization for Video

The background video uses a combination of modern browser flags:

```tsx
<video
  ref={videoRef}
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  className="..."
>
  <source src="/hero.mp4" type="video/mp4" />
</video>
```

To minimize rendering load on weak client processors, components pause or simplify animation states when the user has enabled OS level `prefers-reduced-motion` settings.

---

## Available Scripts

- `npm run dev`: Starts the Next.js development server.
- `npm run build`: Compiles the React application for optimized production delivery.
- `npm run start`: Runs the built Next.js production server.
- `npm run lint`: Analyzes files with ESLint to discover code style patterns and quality deviations.
