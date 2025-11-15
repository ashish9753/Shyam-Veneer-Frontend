export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        wood: {
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#f59e0b',
          500: '#d97706',
          600: '#b45309',
          700: '#92400e',
          800: '#78350f',
          900: '#451a03',
        }
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'sway': 'sway 8s ease-in-out infinite',
        'slide-right': 'slideRight 20s linear infinite',
        'slide-left': 'slideLeft 25s linear infinite',
        'rotate-slow': 'rotateSlow 30s linear infinite',
        'fade-in-out': 'fadeInOut 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(2deg)' },
          '75%': { transform: 'rotate(-2deg)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(calc(100vw + 100%))' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(calc(100vw + 100%))' },
          '100%': { transform: 'translateX(-100%)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeInOut: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 0.8 },
        },
      }
    },
  },
  plugins: [],
}