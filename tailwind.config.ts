import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./app/providers.tsx", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "#f7fbff",
        canvasSoft: "#ebf4ff",
        surface: "rgba(255, 255, 255, 0.82)",
        brand: "#3ab0ff",
        primary: "#1e293b",
        secondary: "#40506c"
      },
      borderRadius: {
        bubble: "2rem"
      },
      boxShadow: {
        float: "0 20px 40px -15px rgba(58, 176, 255, 0.18)",
        glow: "0 0 0 5px rgba(58, 176, 255, 0.25), 0 18px 35px -20px rgba(58, 176, 255, 0.4)"
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 20% 20%, rgba(58,176,255,0.18), transparent 40%), radial-gradient(circle at 80% 15%, rgba(147,197,253,0.2), transparent 35%), radial-gradient(circle at 70% 85%, rgba(191,219,254,0.2), transparent 42%), linear-gradient(130deg, #fafcff 0%, #ebf4ff 100%)"
      }
    }
  },
  plugins: []
};

export default config;
