/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        mist: "#f6f4ef",
        pearl: "#faf8f3",
        silver: {
          50: "#f5f7fa",
          100: "#ebeff5",
          200: "#d7dee8",
          300: "#bcc8d8",
          400: "#8b9ab0",
          500: "#67758b",
          600: "#4d5768",
          700: "#39404d",
          800: "#252a33",
          900: "#171b21"
        },
        champagne: "#d9c39a"
      },
      boxShadow: {
        luxe: "0 24px 80px rgba(23, 27, 33, 0.14)",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        sans: ["'Manrope'", "sans-serif"],
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 7s linear infinite",
      },
    },
  },
  plugins: [],
};

