/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#AA014A',   // Main CTA color
        secondary: '#91C7C3', // Secondary CTA/Background color
        body: '#461E4F',      // Body text color (paragraphs, labels etc)
      },
    },
  },
  plugins: [],
}

