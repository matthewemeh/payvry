/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.{ts,tsx}', './src/**/*.{ts,tsx}', './public/*.html'],
  theme: {
    extend: {
      screens: {
        '840px': { max: '840px' },
        '640px': { max: '640px' },
        '600px': { max: '600px' },
        '500px': { max: '500px' },
        '430px': { max: '430px' },
      },
      fontFamily: {
        'sf-rounded-pro': ['SF Pro Rounded', 'sans-serif'],
      },
      colors: { 'fountain-blue': '#4dbdc1', 'mine-shaft': '#3a3a3a', 'grey-200': '#eeeeee' },
      keyframes: {
        loading: {
          '0%': { width: '0%', backgroundColor: '#00002d' },
          '50%': { width: '100%', backgroundColor: '#00ff91' },
          '100%': { width: '0%', marginLeft: 'auto' },
        },
      },
      animation: { loading: 'loading 3s linear infinite' },
    },
  },
};
