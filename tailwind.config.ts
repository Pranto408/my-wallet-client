import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Our 3-color palette colors
        brand: {
          DEFAULT: '#10B981', // Emerald 500 (Accent)
          hover: '#059669',   // Emerald 600
        },
        slate: {
          900: '#0F172A',     // Deep slate background (Primary)
          50: '#F8FAFC',      // Off-white text/contrast elements (Secondary)
        }
      },
    },
  },
  plugins: [],
};

export default config;
