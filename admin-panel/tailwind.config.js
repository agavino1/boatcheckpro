/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0066CC',
        'brand-dark': '#1A1A2E',
        'brand-light': '#F5F7FA',
      },
    },
  },
  plugins: [],
}
