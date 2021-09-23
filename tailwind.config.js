const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  theme: {
    nightwind: {
      colorClasses: ['gradient', 'ring', 'ring-offset', 'divide', 'placeholder'],
    },
  },
  variants: {
    nightwind: ['focus'],
  },
  plugins: [require('nightwind'), require('@tailwindcss/typography')],
};
