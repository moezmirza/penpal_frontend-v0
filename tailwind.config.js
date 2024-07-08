/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "web-display-1": ["68px", "98%"],
        "web-heading-1": ["56px", "132%"],
        "web-heading-2": ["44px", "128%"],
        "web-heading-3": ["32px", "150%"],
        "web-heading-4": ["24px", "128%"],
        "web-heading-5": ["18px", "auto"],
        "web-heading-6": ["16px", "auto"],
        "web-eyebrow": ["24px", "auto"],
        "web-paragraph-1": ["24px", "150%"],
        "web-paragraph-2": ["20px", "155%"],
        "web-paragraph-3": ["16px", "155%"],
      },
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
