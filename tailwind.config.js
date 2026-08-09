/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './**/*.html',
    './assets/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#122324',
          navy: '#1C3438',
          light: '#F7F4EC',
          teal: '#D1AC66',
          tealHover: '#B8933F',
          tealLight: '#E4C98C'
        },
        // "saude" = família dourada (marca) — usada em ícones/gradientes de destaque suave
        saude: { light: '#E4C98C', dark: '#D1AC66' },
        // "vida" = família petróleo (marca) — cuidado, humanização
        vida: { light: '#7FB4BD', dark: '#256F7C' },
        // "qualidade" = neutro esverdeado frio — tecnologia/institucional
        qualidade: { light: '#B9C7C4', dark: '#4C6763' },
        neutral: { light: '#E7E2D3', dark: '#122324' },
        sec: {
          yellow: '#D1AC66',
          orange: '#C08A3E',
          red: '#B85C50',
          green: '#5C8C6B',
          blue: '#4C7A85',
          purple: '#6B5C7B'
        },
        palette: {
          50: '#FFFFFF',
          100: '#F1EFE6',
          200: '#E7E2D3',
          300: '#D3CDBC',
          400: '#9CA5A0',
          500: '#5F6B66'
        }
      },
      backgroundImage: {
        'gradient-saude': 'linear-gradient(135deg, #E4C98C 0%, #D1AC66 100%)',
        'gradient-vida': 'linear-gradient(135deg, #7FB4BD 0%, #256F7C 100%)',
        'gradient-qualidade': 'linear-gradient(135deg, #B9C7C4 0%, #4C6763 100%)',
        'gradient-neutral': 'linear-gradient(135deg, #E7E2D3 0%, #122324 100%)'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        display: ['Outfit', 'sans-serif']
      }
    }
  },
  plugins: []
};
