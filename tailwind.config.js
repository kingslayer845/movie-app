/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,

  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "450px",
      md: "568px",
      lg: "1000px",
      xl: "1140px",
    },
    container: {
      padding: "1rem",
      center: true,
    },
    extend: {
      colors: {
        dark: "#0F0F0F",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
