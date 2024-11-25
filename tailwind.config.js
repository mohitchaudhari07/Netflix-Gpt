/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      lightblack:'rgba(0, 0, 0, 0.7)',
    }
    },
  },
  plugins: [],
}

