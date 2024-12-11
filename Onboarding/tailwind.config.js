/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#43506D',
          dark: '#343F57',
          light: '#536284'
        },
        background: {
          primary: '#FFFFFF',
          secondary: '#F7F7F7'
        },
        text: {
          heading: '#43506D',
          body: '#333333',
        },
        border: {
          primary: '#43506D',
          divider: '#E0E0E0'
        },
        neutral: {
          500: '#6B7280',
        }
      },
      fontSize: {
        'h1': '36px',
        'h2': '28px',
        'body': '16px',
        'small': '14px'
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        regular: 400,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        heading: '1.4',
        body: '1.6'
      },
      zIndex: {
        '50': '50',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}
