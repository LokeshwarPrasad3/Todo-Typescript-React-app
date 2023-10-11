/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        'overpass' : ['overpass', 'verdana'],
        'signika' : ['signika negative', 'verdana'],
        'bree' : ['bree serif', 'verdana']
      }
    },
  },
  plugins: [],
}

