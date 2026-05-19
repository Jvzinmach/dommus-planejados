/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#11251e', // Verde Floresta (Fundo da Logo)
        accent: '#e6deca', // Creme Off-White (Letras da Logo)
        offwhite: '#F5F5F0',
        dark: '#0b1a15', // Verde quase preto para fundos
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        drama: ['Playfair Display', 'serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
