/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content:
      [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
      ],
  theme: {
    extend: {
      colors: {
        // flowbite-svelte
        primary: {
          50: '#96e1da',
          100: '#81dbd3',
          200: '#6cd5cb',
          300: '#57cfc4',
          400: '#42c9bd',
          500: '#2EC4B6',
          600: '#29b0a3',
          700: '#249c91',
          800: '#20897f',
          900: '#1b756d'
        },
        secondary: {
          50: '#f1b49c',
          100: '#eea588',
          200: '#ec9675',
          300: '#e98761',
          400: '#e6784d',
          500: '#E46A3A',
          600: '#cd5f34',
          700: '#b6542e',
          800: '#9f4a28',
          900: '#883f22'
        },
        tertiary: {
          50: '#a3cca7',
          100: '#90c296',
          200: '#7eb884',
          300: '#6bae72',
          400: '#59a461',
          500: '#479A50',
          600: '#3f8a48',
          700: '#387b40',
          800: '#316b38',
          900: '#2a5c30'
        },
        quaternary: {
          50: '#e2cfe4',
          100: '#dcc5de',
          200: '#d6bbd9',
          300: '#d0b2d3',
          400: '#caa8ce',
          500: '#c59fc9',
          600: '#c59fc9',
          700: '#9d7fa0',
          800: '#896f8c',
          900: '#765f78'
        },
      }
    }
  },
  plugins: []
};
