/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode:'media',
  theme: {
    extend: {
      colors: {
        background: '#0f172a', // custom background color
        text: '#f1f5f9', // custom text color
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

