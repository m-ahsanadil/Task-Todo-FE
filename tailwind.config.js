/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50', // Green
        secondary: '#FF9800', // Orange
        accent: '#2196F3', // Blue
        error: '#F44336', // Red
        warning: '#FFEB3B', // Yellow
        info: '#00BCD4', // Cyan
      },
    },
  },
  plugins: [],
}
