import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Madeira naturais
        wood: {
          50: '#FAF7F2',
          100: '#F5EFE5',
          200: '#E8D4BF',
          300: '#DBB999',
          400: '#CD853F',
          500: '#B8860B',
          600: '#A0522D',
          700: '#8B4513',
          800: '#654321',
          900: '#3E2723',
        },
        // Dourado elegante
        gold: {
          50: '#FFFEF7',
          100: '#FFFACD',
          200: '#FFF8DC',
          300: '#FFE55C',
          400: '#FFD700',
          500: '#FFA500',
          600: '#FF8C00',
          700: '#DAA520',
          800: '#B8860B',
          900: '#8B6914',
        },
        // Neutros sofisticados
        neutral: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
      backgroundImage: {
        'gradient-wood': 'linear-gradient(135deg, #CD853F 0%, #8B4513 100%)',
        'gradient-gold': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
        'gradient-neutral': 'linear-gradient(135deg, #F5F5F5 0%, #E5E5E5 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'wood-texture': "url('data:image/svg+xml,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><g fill=\"none\" fill-rule=\"evenodd\"><g fill=\"%23CD853F\" fill-opacity=\"0.1\"><path d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/></g></g></svg>')",
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'parallax': 'parallax 20s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        parallax: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'elegant': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      perspective: {
        '1000': '1000px',
        '1500': '1500px',
      },
    },
  },
  plugins: [],
} satisfies Config;