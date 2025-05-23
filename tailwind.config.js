import { colors } from "./src/styles/colors";
import { fontFamily } from "./src/styles/fontFamily";

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  darkMode: "class", // Permite alternar tema usando classes
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors,
      fontFamily,
    },
  },

  plugins: [],
};
