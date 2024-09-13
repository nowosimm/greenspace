/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
  theme: {
    fontFamily: {
      'decorative' : ['"Titan One", sans-serif'],
      'body' : ['"Inconsolata", monospace']
    },
    extend: {
      colors: {
        forest: 'rgba(83, 107, 76, 1)',
        soft: 'rgba(134, 153, 129, 1)',
        coolBlack: 'rgba(35,43,43)',
        light: 'rgba(219, 227, 218)',
      }
    }
  } 
}
