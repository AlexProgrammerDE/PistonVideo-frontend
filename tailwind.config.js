// const defaultTheme = require('tailwindcss/defaultTheme');
// "nightwind": "^1.1.12",
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
  plugins: [require('@tailwindcss/typography')],
  content: [`components/**/*.{vue,js}`, `layouts/**/*.vue`, `pages/**/*.vue`, `plugins/**/*.{js,ts}`, `nuxt.config.{js,ts}`],
};
/* require('nightwind'), */
