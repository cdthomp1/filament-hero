module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'false', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'regal-blue': '#3A405A',
        'vermilion': '#CA3C25',
        'black-shadows': '#C2B2B4',
        'nav-gray': "#495057"
      },
      height: {
        "10v": "10vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "100v": "100vh",
      },
    },
    maxWidth: {
      '1/8': '13%',
      '1/2': '50%',
      '3/4': '75%',
    },
    backgroundImage: theme => ({
      'hero-image': "url('/hero-background.jpeg')",
    })
  },

  variants: {
    extend: {
      backgroundColor: ['even'],

    },
  },
  plugins: [],
}
