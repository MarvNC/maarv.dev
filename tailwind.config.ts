import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./app/providers.tsx", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "rgb(var(--color-canvas) / <alpha-value>)",
        canvasSoft: "rgb(var(--color-canvas-soft) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        brand: "rgb(var(--color-brand) / <alpha-value>)",
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)"
      },
      borderRadius: {
        bubble: "2rem"
      },
      boxShadow: {
        float: "0 18px 36px -20px rgba(58, 176, 255, 0.24)",
        glow: "0 0 0 4px rgba(58, 176, 255, 0.2), 0 18px 34px -22px rgba(58, 176, 255, 0.36)"
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 20% 20%, rgba(58,176,255,0.18), transparent 40%), radial-gradient(circle at 80% 15%, rgba(147,197,253,0.2), transparent 35%), radial-gradient(circle at 70% 85%, rgba(191,219,254,0.2), transparent 42%), linear-gradient(130deg, #fafcff 0%, #ebf4ff 100%)"
      }
    }
  },
  plugins: []
};

export default config;
