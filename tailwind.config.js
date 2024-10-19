/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        pink:{
          500: '#F2B0B5' // nova cor para rosa 500, terdeira cor padrão da athena
        }
      }
    },
  },
  plugins: [],
}

