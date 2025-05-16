

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Ajoute cette ligne
  ],
  theme: {
    extend: {
      colors: {
        'mine-shaft': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#2d2d2d',
        },

        'bright-sun': {
          '50': '#fffbeb',
          '100': '#fff3c6',
          '200': '#ffe588',
          '300': '#ffd149',
          '400': '#ffbd20',
          '500': '#f99b07',
          '600': '#dd7302',
          '700': '#b75006',
          '800': '#943c0c',
          '900': '#7a330d',
          '950': '#461902',
        },
      },
      keyframes: {
        'option-Animation': {
          from: {
            transform: 'translateX(20px)',
            opacity: 0,
          },
          to: {
            transform: 'translateX(0)',
            opacity: 1,
          },
        },
      },
      animation: {
        'option-Animation': 'option-Animation 200ms forwards',
      },
    },
    screens: {
      'xsm': '320px',
      'xs': '476px',
      'sm': '640px',
      'md': '768px',
      'bsm': '900px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'xs-mx': {'max':'475px'},
      'sm-mx': {'max':'639px'},
      'xsm-mx': {'max':'319px'},
      '2xl-mx': {'max':'1536px'},
      'xl-mx': {'max':'1279px'},
      'lg-mx': {'max':'1023px'},
      'bs-mx': {'max': '900px'},
      'md-mx': {'max': '767px'}
    }
  },
  plugins: [],
};
