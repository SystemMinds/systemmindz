/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          light: 'rgb(139, 92, 246)',
          dark: 'rgb(124, 58, 237)',
        }
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        syne: ['Syne', 'sans-serif'],
        cinzel: ['Cinzel', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        marker: ['"Permanent Marker"', 'cursive'],
        rock: ['"Rock Salt"', 'cursive'],
        bodoni: ['"Bodoni Moda"', 'serif'],
        abril: ['"Abril Fatface"', 'serif'],
      },
      maxWidth: {
        '1920': '1920px',
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
