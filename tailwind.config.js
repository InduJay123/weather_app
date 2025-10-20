/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts}"],
  theme: {
    extend: {
      fontFamily:{
        'poppins': ['poppins','sans-serif'],
      },
      backgroundImage:{
        'card-bg-4': "linear-gradient(135deg, #2C3E50 0%,#4CA1AF 100%)",
      }
    },
  },
  plugins: [],
}

