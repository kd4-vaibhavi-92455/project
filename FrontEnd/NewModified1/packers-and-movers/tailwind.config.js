/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Add this line
  theme: {
    extend: {
      colors: {
        primary: "#0052CC",
        secondary: "#FF6B00",
        accent: "#00C4B4",
      },
    },
  },
  plugins: [],
};
