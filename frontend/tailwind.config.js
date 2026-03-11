/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        flipkart: {
          blue: '#2874f0',
          yellow: '#ff9f00',
          green: '#388e3c',
          orange: '#ff6161',
          light: '#f1f3f6',
        },
      },
    },
  },
  plugins: [],
};
