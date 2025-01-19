/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { Inter: ["Inter", "sans-serif"] },
      colors: {
        primary: "#243B5A",
        secondary: "#EAF4FE",
      },
      backgroundImage: {
        "thermostat-gradient": "radial-gradient(circle, #1e2746, #0e122b)",
      },
    },
  },
  plugins: [],
};
