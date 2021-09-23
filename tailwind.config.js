const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [require('nightwind'), require('@tailwindcss/typography')],
};
