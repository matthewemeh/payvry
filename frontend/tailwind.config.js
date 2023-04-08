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
      colors: {
        alto: '#d9d9d9',
        carnation: '#fd5a5d',
        'grey-200': '#eeeeee',
        'mine-shaft': '#3a3a3a',
        'athens-gray': '#eeeff2',
        'alto-shade-1': '#d8d8d8',
        'fountain-blue': '#4dbdc1',
        'mountain-meadow': '#13ad95',
      },
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
