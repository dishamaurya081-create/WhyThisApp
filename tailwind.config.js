/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#02C39A', // Accent
          600: '#028090', // Primary
          700: '#006573',
          800: '#034d58',
          900: '#053f49',
          950: '#01242b',
        },
        primary: {
          DEFAULT: '#028090',
          dark: '#016472',
          light: '#03a2b6',
        },
        accent: {
          DEFAULT: '#02C39A',
          dark: '#019e7c',
          light: '#35d6b3',
        },
        mismatch: {
          high: '#ef4444',
          medium: '#f59e0b',
          expected: '#10b981',
        }
      },
    },
  },
  plugins: [],
}
