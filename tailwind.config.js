/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#EEF2F9",
          100: "#D5DFEF",
          200: "#AABFDF",
          300: "#789FCF",
          400: "#4D7FBF",
          500: "#2B62AF",
          600: "#214E92",
          700: "#193B76",
          800: "#122B5C",
          900: "#0C1E42",
          950: "#07122A",
        },
        saffron: {
          50:  "#FFF5ED",
          100: "#FFE8D0",
          200: "#FFCDA0",
          300: "#FFAb66",
          400: "#FF8535",
          500: "#E86020",
          600: "#C74712",
          700: "#A4360D",
          800: "#832B0E",
          900: "#6B230F",
        },
        surface: {
          bg:     "#F7F6F2",
          card:   "#FFFFFF",
          border: "#E5E2DA",
          muted:  "#EDEBE6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card:       "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.04)",
        "card-hover":"0 4px 14px 0 rgb(0 0 0 / 0.09), 0 2px 4px -1px rgb(0 0 0 / 0.05)",
        nav:        "0 1px 0 0 rgb(0 0 0 / 0.07)",
        panel:      "0 4px 24px 0 rgb(0 0 0 / 0.10)",
      },
      borderRadius: {
        DEFAULT: "6px",
      },
    },
  },
  plugins: [],
};
