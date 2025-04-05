/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 'media'(시스템 기반) 또는 'class'(수동 전환)
  theme: {
    extend: {},
  },
  plugins: [],
}