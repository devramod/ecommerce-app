/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brown: {
          50: '#655850',
          100: '#423a34',
        }
      }
    },
  },
  plugins: [],
}
