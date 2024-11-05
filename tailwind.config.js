/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DD3333",
        "primary-dark": "#AA2B2D",
      },
    },
  },
  plugins: [],
};
