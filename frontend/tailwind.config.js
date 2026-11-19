/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0B0B0C',
          royal: '#0B0B0C',
          dark: '#0B0B0C',
        },
        midnight: {
          DEFAULT: '#141414',
          black: '#141414',
        },
        graphite: {
          DEFAULT: '#202020',
          black: '#202020',
        },
        gold: {
          DEFAULT: '#D4AF37',
          metallic: '#D4AF37',
          royal: '#C69B32',
          champagne: '#F5DF9B',
          antique: '#98752C',
        },
        champagne: {
          DEFAULT: '#F5DF9B',
        },
        antique: {
          DEFAULT: '#98752C',
        },
        ivory: {
          DEFAULT: '#F8F5ED',
          warm: '#F8F5ED',
        },
        warmwhite: {
          DEFAULT: '#F8F5ED',
        },
        darktext: '#252525',
        charcoal: '#252525',
        secondarytext: '#555555',
        lightborder: '#98752C',

        // Backwards compatibility mappings for older themes
        walnut: {
          DEFAULT: '#0B0B0C',
          rich: '#0B0B0C',
          dark: '#141414',
        },
        wood: {
          DEFAULT: '#141414',
          brown: '#141414',
        },
        caramel: {
          DEFAULT: '#D4AF37',
          golden: '#D4AF37',
        },
        cream: {
          DEFAULT: '#F8F5ED',
        },

        primary: {
          DEFAULT: '#D4AF37',
          metallic: '#D4AF37',
          gold: '#D4AF37',
          royal: '#C69B32',
          obsidian: '#0B0B0C',
          champagne: '#F5DF9B',
        },
        brand: {
          royalObsidian: '#0B0B0C',
          midnightBlack: '#141414',
          graphiteBlack: '#202020',
          richMetallicGold: '#D4AF37',
          royalGold: '#C69B32',
          champagneGold: '#F5DF9B',
          antiqueGold: '#98752C',
          warmIvory: '#F8F5ED',
          pureWhite: '#FFFFFF',
          darkCharcoal: '#252525',

          // Compatibility aliases
          obsidianBlack: '#0B0B0C',
          deepBlack: '#141414',
          metallicGold: '#D4AF37',
          warmWhite: '#F8F5ED',
          darkText: '#252525',
          richWalnut: '#0B0B0C',
          woodBrown: '#141414',
          goldenCaramel: '#D4AF37',
          warmGold: '#F5DF9B',
          cream: '#F8F5ED',
          secondaryText: '#555555',
          lightBorder: '#98752C',
          rusticBrown: '#0B0B0C',
          oliveGreen: '#D4AF37',
          mutedOlive: '#F5DF9B',
          sandBeige: '#98752C',
          warmIvoryLegacy: '#F8F5ED',
          petrol: '#0B0B0C',
          copper: '#D4AF37',
          teal: '#141414',
          softGray: '#555555',
          lightGray: '#98752C',
          blue: '#0B0B0C',
          yellow: '#D4AF37',
          lightBlue: '#141414',
          golden: '#D4AF37',
          paleYellow: '#F8F5ED',
          green: '#D4AF37',
          darkNavy: '#141414',
          darkNavyFooter: '#141414',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
