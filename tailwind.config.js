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
    }
  } 
}
