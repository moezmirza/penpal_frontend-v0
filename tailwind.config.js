/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins"],
      },  
      backgroundImage: {
        register: "url('https://penpal.musingsinc.co/wp-content/uploads/2024/07/register.png')",
      },
      colors: {
        "fr-blue": "#47C3F6",
        "fr-blue-100": "rgb(96 165 250)",
        "fr-red-": "rgb(239 68 68)",
      },
      textColor: {
        DEFAULT: "rgb(107 114 128)",
      },
    },
  },
  plugins: [
    // plugin(({ addBase, theme }) => {
    //   addBase({
    //     html: { color: theme("colors.gray.700") },
    //   });
    // }),
  ],
};
