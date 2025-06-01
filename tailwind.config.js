/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-inter)', 'sans-serif'],
        'heading': ['var(--font-space-grotesk)', 'sans-serif'],
      },
      colors: {
        // DNA-inspired color palette
        primary: {
          DEFAULT: '#0d6efd', // Deep blue representing DNA base pairs
          dark: '#0a58ca',
        },
        secondary: {
          DEFAULT: '#39b54a', // Green representing RNA
          dark: '#2d9e3c',
        },
        accent: {
          DEFAULT: '#8655e0', // Purple for protein structures
          dark: '#7142c2',
        },
        adenine: '#f87171', // Red for adenine base
        thymine: '#60a5fa', // Blue for thymine base
        guanine: '#fbbf24', // Yellow for guanine base
        cytosine: '#34d399', // Green for cytosine base
        helix: '#e1f0ff', // Light blue for DNA helix background
        protein: '#fef3c7', // Protein background color
        membrane: '#e9d5ff', // Cell membrane color
        background: '#001a33', // Dark blue background
        foreground: '#ffffff', // White text
        muted: '#f3f4f6',
        'muted-foreground': '#e2e8f0',
        card: '#ffffff',
        'card-foreground': '#171717',
      },
      animation: {
        'dna-spin': 'dna-spin 20s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s infinite ease-in-out',
        'blob': 'blob 15s infinite ease-in-out',
      },
      keyframes: {
        'dna-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse': {
          '0%, 100%': { opacity: 0.5, transform: 'scale(1)' },
          '50%': { opacity: 0.2, transform: 'scale(1.05)' },
        },
        'blob': {
          '0%': { transform: 'scale(1) translateY(0px) translateX(0px) rotate(0deg)' },
          '25%': { transform: 'scale(1.1) translateY(-10px) translateX(10px) rotate(10deg)' },
          '50%': { transform: 'scale(1) translateY(0px) translateX(0px) rotate(0deg)' },
          '75%': { transform: 'scale(0.9) translateY(10px) translateX(-10px) rotate(-10deg)' },
          '100%': { transform: 'scale(1) translateY(0px) translateX(0px) rotate(0deg)' },
        },
      },
      backgroundImage: {
        'dna-pattern': "url('/images/dna-pattern.svg')",
        'helix-gradient': 'linear-gradient(to right, #001a33, #002952, #001a33)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}; 