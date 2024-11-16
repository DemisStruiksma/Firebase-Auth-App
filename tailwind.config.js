/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#AA014A',    // Main CTA color
        secondary: '#91C7C3',  // Background color
        heading: '#461E4F',    // Heading and title/label text
      },
    },
  },
  plugins: [],
}

