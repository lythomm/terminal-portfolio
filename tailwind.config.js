/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f1210',
        surface: '#161a15',
        fg: '#d4d8d0',
        dim: '#5a6058',
        accent: '#4ade80',
        'accent-border': '#2a5c38',
        orange: '#e8854a',
        err: '#d16060',
        border: '#2a2e28',
      },
      fontFamily: {
        mono: ['Geist Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
