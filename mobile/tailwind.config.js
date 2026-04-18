const plugin = require('tailwindcss/plugin');
const colors = require('./src/theme/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        card: 'var(--card)',
        text: 'var(--text)',
        'text-muted': 'var(--textMuted)',
        primary: 'var(--primary)',
        border: 'var(--border)',
      }
    },
  },
  plugins: [
    plugin(function ({ addBase }) {
      addBase({
        ":root": {
          "--background": colors.light.background,
          "--card": colors.light.card,
          "--text": colors.light.text,
          "--textMuted": colors.light.textMuted,
          "--primary": colors.light.primary,
          "--border": colors.light.border,
        },
        ".dark": {
          "--background": colors.dark.background,
          "--card": colors.dark.card,
          "--text": colors.dark.text,
          "--textMuted": colors.dark.textMuted,
          "--primary": colors.dark.primary,
          "--border": colors.dark.border,
        },
      });
    }),
  ],
};
