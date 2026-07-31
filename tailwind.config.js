/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F27823',
          'orange-dark': '#d0611a',
          'orange-light': '#f58f4f',
        },
        neutral: {
          50: '#f8f8f8',
          100: '#f0f0f0',
          200: '#e0e0e0',
          300: '#c8c8c8',
          400: '#a0a0a0',
          500: '#787878',
          600: '#5c5c5c',
          700: '#404040',
          800: '#2c2c2c',
          900: '#1a1a1a',
          950: '#0f0f0f',
        },
        white: '#ffffff',
      },
      fontFamily: {
        sans: ['Gilroy', 'Barlow', 'system-ui', 'sans-serif'],
        primary: ['Gilroy', 'system-ui', 'sans-serif'],
        secondary: ['var(--font-barlow)', 'Barlow', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.64rem', { lineHeight: '1.5' }],
        'sm': ['0.8rem', { lineHeight: '1.5' }],
        'base': ['1rem', { lineHeight: '1.5' }],
        'lg': ['1.25rem', { lineHeight: '1.5' }],
        'xl': ['1.563rem', { lineHeight: '1.4' }],
        '2xl': ['1.953rem', { lineHeight: '1.3' }],
        '3xl': ['2.441rem', { lineHeight: '1.2' }],
        '4xl': ['3.052rem', { lineHeight: '1.2' }],
        '5xl': ['3.815rem', { lineHeight: '1.1' }],
        '6xl': ['4.768rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
