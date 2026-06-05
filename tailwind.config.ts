import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        linkedin: {
          blue: "#0A66C2",
          "blue-dark": "#004182",
          "blue-light": "#EAF4FF",
          "blue-hover": "#0958A8",
          bg: "#F3F2EF",
          "bg-dark": "#1B1F23",
          card: "#FFFFFF",
          "card-dark": "#1D2226",
          border: "#E0DFDC",
          "border-dark": "#38434F",
          text: "#000000E6",
          "text-secondary": "#666666",
          "text-dark": "#E7E9EA",
          "text-secondary-dark": "#B0B7BE",
          green: "#057642",
          gold: "#915907",
          red: "#CC1016",
        },
      },
      borderRadius: {
        card: "12px",
      },
      boxShadow: {
        card: "0 0 0 1px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.05)",
        "card-hover": "0 0 0 1px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.10)",
        nav: "0 0 0 1px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.2s ease-out",
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-in": "bounceIn 0.4s ease-out",
        "shimmer": "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "70%": { transform: "scale(1.03)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
