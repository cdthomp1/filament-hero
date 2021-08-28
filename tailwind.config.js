module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'regal-blue': '#3A405A',
        'vermilion': '#CA3C25',
        'black-shadows': '#C2B2B4'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['even'],

    },
  },
  plugins: [],
}
