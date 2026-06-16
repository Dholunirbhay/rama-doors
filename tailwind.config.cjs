

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F4FAFD',
          100: '#E0F2F9',
          200: '#B8E2F2',
          300: '#7ED3E8',
          400: '#4FAFD1',
          500: '#2A90B8',
          600: '#0A4D78',
          700: '#093E62',
          800: '#072F4C',
          900: '#071F35',
          950: '#040F1A',
        },
        accent: {
          50: '#F0FBFF',
          100: '#D0F0FA',
          200: '#A8E3F5',
          300: '#7ED3E8',
          400: '#4FAFD1',
          500: '#2A90B8',
          600: '#1A7599',
          700: '#156780',
          800: '#0F4F5F',
          900: '#0A3A47',
        },
        gold: {
          300: '#F5D987',
          400: '#E8C44A',
          500: '#D4A921',
          600: '#B88E00',
        },
      },

      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },

      boxShadow: {
        brand: '0 4px 24px -4px rgba(10, 77, 120, 0.25)',
        'brand-lg': '0 8px 40px -8px rgba(10, 77, 120, 0.35)',
        accent: '0 4px 24px -4px rgba(79, 175, 209, 0.35)',
      },
    },
  },
  plugins: [],
}