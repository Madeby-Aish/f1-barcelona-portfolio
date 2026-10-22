/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#0a0a0a',
        surface: '#111317',
        'surface-elevated': '#161920',
        neon: {
          emerald: '#00ff87',
          amber: '#ffaa00',
          red: '#ff0055',
          cyan: '#00e5ff',
          purple: '#b026ff',
        },
        hud: {
          dark: 'rgba(10, 10, 10, 0.75)',
          panel: 'rgba(17, 19, 23, 0.85)',
          border: 'rgba(255, 255, 255, 0.1)',
          glow: 'rgba(0, 255, 135, 0.25)',
        }
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-emerald': '0 0 20px rgba(0, 255, 135, 0.45)',
        'neon-amber': '0 0 20px rgba(255, 170, 0, 0.45)',
        'neon-red': '0 0 20px rgba(255, 0, 85, 0.45)',
        'neon-cyan': '0 0 20px rgba(0, 229, 255, 0.45)',
        'hud-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glitch': 'glitch 1s linear infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
