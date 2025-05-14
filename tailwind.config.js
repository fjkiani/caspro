/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
        secondary: {
          DEFAULT: '#10b981',
          dark: '#059669',
        },
        accent: '#8b5cf6',
        background: '#ffffff',
        foreground: '#171717',
        muted: '#f3f4f6',
        'muted-foreground': '#6b7280',
        card: '#ffffff',
        'card-foreground': '#171717',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 