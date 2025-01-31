/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      colors:{
        darkPurple:"#280A4F"
      }
    },
   
  },
  plugins: [

    require('tailwind-scrollbar'),
  ],
}

