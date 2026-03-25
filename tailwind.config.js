/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A2B4A',
          light: '#243860',
          dark: '#0F1E35',
        },
        accent: {
          DEFAULT: '#00C2A8',
          dark: '#00A892',
          light: '#E0FAF7',
        },
        bg: {
          DEFAULT: '#F8FAFB',
          card: '#FFFFFF',
        },
        muted: '#64748B',
        border: '#E2E8F0',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(0, 194, 168, 0.4)' },
          '70%': { boxShadow: '0 0 0 12px rgba(0, 194, 168, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0, 194, 168, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.5s ease-in-out infinite',
        shimmer: 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};