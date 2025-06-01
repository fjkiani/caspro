import type { Config } from 'tailwindcss';

const THEME_COLORS = {
  primary: 'var(--primary)',
  'primary-dark': 'var(--primary-dark)',
  secondary: 'var(--secondary)',
  'secondary-dark': 'var(--secondary-dark)',
  accent: 'var(--accent)',
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  muted: 'var(--muted)',
  'muted-foreground': 'var(--muted-foreground)',
  card: 'var(--card)',
  'card-foreground': 'var(--card-foreground)',
};

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: THEME_COLORS,
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '25%': { transform: 'translate(20px, -30px) scale(1.1)' },
          '50%': { transform: 'translate(0px, 40px) scale(1)' },
          '75%': { transform: 'translate(-30px, -20px) scale(0.9)' },
        }
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        blob: 'blob 15s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config; 