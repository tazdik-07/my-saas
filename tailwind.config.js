// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  /* 1.  All the paths you had, de‑duplicated */
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}',
    '*.{js,ts,jsx,tsx,mdx}',
  ],

  /* 2.  Theme extensions */
  theme: {
    extend: {
      /* ——— Fonts (use CSS vars set in globals.css) ——— */
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },

      /* ——— Custom animations you already wrote ——— */
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },

  /* 3.  Plugins */
  plugins: [require('tailwindcss-animate')],
};
