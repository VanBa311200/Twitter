const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screens: {
      xm: { max: '299px' },
      sm: { min: '600px' },
      md: { min: '768px' },
      lg: { min: '1024px' },
      xl: { min: '1265px' },
    },
    fontFamily: {
      sans: ['TwitterChirp', 'sans-serif'],
    },
    extend: {
      colors: {
        textMain: '#D9D9D9',
        textSub: '#6e767d',
        primary: '#1d9bf0',
        primaryDark: 'rgb(26,140, 216)',
        divide: '#2f3336',
        success: '#00ba7c',
        pinkRed: '#f91880',
        greySmoke: '#202327',
      },
      boxShadow: {
        shadownApp:
          'rgb(255 255 255 / 20%) 0px 0px 15px, rgb(255 255 255 / 15%) 0px 0px 3px 1px',
      },
      animation: {
        loadingHorizontal: 'loading 1s linear infinite',
      },
      keyframes: {
        loading: {
          '0%': { left: 0 },
          '100%': { left: '100%', width: '6rem' },
        },
      },
    },
    container: {
      center: true,
      screen: {
        sm: '576px',
        md: '768px',
        lg: '1024px',
        xl: '1265px',
      },
    },
  },

  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
