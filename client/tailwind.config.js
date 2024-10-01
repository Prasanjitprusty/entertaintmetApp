/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customDark: '#10141E',
        customRed:'#FC4747',
        customBg:'#161D2F'
      },
    },
  },
  plugins: [],
}