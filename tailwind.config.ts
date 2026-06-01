import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2.5rem" },
      screens: { "2xl": "1440px" },
    },
    extend: {
      colors: {
        // Light mode (architectural whites, warm stone, dark slate)
        bone: {
          50: "#FAFAF9",
          100: "#F5F5F4",
          200: "#E7E5E4",
          300: "#D6D3D1",
          400: "#A8A29E",
        },
        stone: {
          DEFAULT: "#78716C",
          dark: "#44403C",
        },
        slate: {
          ink: "#1C1917",
        },
        // Dark mode (obsidian, charcoal, brushed metallic gold)
        obsidian: {
          50: "#1C1917",
          100: "#181615",
          200: "#131110",
          300: "#0F0D0C",
          400: "#0A0908",
          500: "#050403",
        },
        charcoal: {
          DEFAULT: "#262422",
          soft: "#2D2A28",
        },
        gold: {
          DEFAULT: "#C9A961",
          50: "#F5EEDB",
          100: "#E8D9B0",
          200: "#D9C187",
          300: "#C9A961",
          400: "#B8954A",
          500: "#9C7E37",
          600: "#7A6328",
        },
        cream: "#F5F1E8",
      },
      fontFamily: {
        display: ["Cinzel", "Georgia", "Times New Roman", "serif"],
        sans: ["Josefin Sans", "Segoe UI", "Tahoma", "Geneva", "Verdana", "sans-serif"],
        mono: ["JetBrains Mono", "Consolas", "Courier New", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.06em",
        widest: "0.25em",
      },
      animation: {
        "fade-in": "fadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "marquee-slow": "marquee 60s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        "blob-1": "blob 18s ease-in-out infinite",
        "blob-2": "blob 22s ease-in-out infinite 4s",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(40px,-30px) scale(1.05)" },
          "66%": { transform: "translate(-30px,20px) scale(0.95)" },
        },
      },
      transitionTimingFunction: {
        cinematic: "cubic-bezier(0.22, 1, 0.36, 1)",
        silk: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
