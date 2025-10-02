/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1A5555",
          // DEFAULT: "#57564F",
          100: "#F0FC30"
        },
        secondary: {
          DEFAULT: "#FE4804",
          // DEFAULT: "#4A9782",
          100: "#FF9001",
          200: "#FF8E01",
        },
        black: {
          DEFAULT: "#000",
          100: "#1E1E2D",
          200: "#232533",
        },
        gray: {
          100: "#CDCDE0",
        },
      },
      // fontFamily: {
      //   pthin: ["Poppins-Thin", "sans-serif"],
      //   pextralight: ["Poppins-ExtraLight", "sans-serif"],
      //   plight: ["Poppins-Light", "sans-serif"],
      //   pregular: ["Poppins-Regular", "sans-serif"],
      //   pmedium: ["Poppins-Medium", "sans-serif"],
      //   psemibold: ["Poppins-SemiBold", "sans-serif"],
      //   pbold: ["Poppins-Bold", "sans-serif"],
      //   pextrabold: ["Poppins-ExtraBold", "sans-serif"],
      //   pblack: ["Poppins-Black", "sans-serif"],
      // },
    },
    borderColor: (theme) => ({
      ...theme('colors'),
    }),
  },
  plugins: [],
}