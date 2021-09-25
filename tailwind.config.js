const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  theme: {
    nightwind: {
      colorClasses: ['gradient', 'ring', 'ring-offset', 'divide', 'placeholder'],
    },
    gridTemplateColumns: {
      'fill-40': 'repeat(auto-fill, 10rem)',
    },
  },
  variants: {
    nightwind: ['focus'],
  },
  plugins: [require('nightwind'), require('@tailwindcss/typography')],
};
