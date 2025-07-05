/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Ensure all React files are scanned
  ],
  theme: {
    extend: {
      colors: {
        clinicBlue: '#1e40af', // Primary blue
        clinicGreen: '#059669', // Accent green
        softGray: '#f1f5f9', // Background
      },
      fontFamily: {
        main: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};