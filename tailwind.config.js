/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blade-runner-dark': '#0a0e27',
        'blade-runner-neon': '#00fff9',
        'blade-runner-orange': '#ff6b35',
        'blade-runner-purple': '#8b5cf6',
      }
    },
  },
  plugins: [],
}
