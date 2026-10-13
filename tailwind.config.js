/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 18px 40px rgba(168,85,247,0.28)',
      },
      colors: {
        brand: {
          pink: '#EC4899',
          purple: '#8B5CF6',
          blue: '#3B82F6',
        },
      },
    },
  },
  plugins: [],
};

