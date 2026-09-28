/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
        dm: ['"DM Serif Display"', 'serif'],
        inter: ['Inter', 'sans-serif'],
        coolvetica: ['Coolvetica', 'sans-serif'],
      },
      colors: {
        black: '#000000',
        'grey-1': '#111111',
        'grey-2': '#1a1a1a',
        'grey-3': '#2a2a2a',
        'grey-4': '#555555',
        'grey-5': '#888888',
        'grey-6': '#aaaaaa',
        'off-white': '#f0ede8',
        accent: '#e8e0d0',
      },
      fontSize: {
        '10xl': '10rem',
        '11xl': '13rem',
      },
    },
  },
  plugins: [],
};
