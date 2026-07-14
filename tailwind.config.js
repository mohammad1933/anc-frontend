/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        atelier: {
          obsidian: "#14120F",
          charcoal: "#1F1C18",
          panel: "#26221D",
          panelLight: "#302B24",
          line: "#3A342C",
          ivory: "#EDE6D8",
          ivoryMuted: "#B8AF9E",
          brass: "#B8935A",
          brassLight: "#D9B77E",
          brassDeep: "#8C6A3A",
          moss: "#5C6650",
          rust: "#9C4A2E",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      boxShadow: {
        panel: "0 8px 32px rgba(0,0,0,0.45)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.04)",
      },
      transitionTimingFunction: {
        atelier: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
