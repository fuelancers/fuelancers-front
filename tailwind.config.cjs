/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        input: "0px 0px 4px 2px #18C29C",
        box: "0px 2px 6px 2px #C1C1C133",
        square: "0px 2px 4px 0 #23242633",
        into: "0px 2px 4px 0 #f2f2f280",
        extra: "0px 0px 4px 1px #FF549A4D",
        strong: "0px 4px 4px 0px #50505026",
        cards: "0px 4px 10px 2px #50505033",
      },
    },
    colors: {
      primary: "#18C29C",
      secondary: "#18C29C",
      extra: "#FF549A",
      white: "#ffffff",
      "primary-hover": "#036FB2",
      "secondary-hover": "#0B877D",
      "extra-hover": "#E93E84",
      "white-bg": "#FAFAFA",

      text: {
        100: "#232426",
        90: "#5B5B5B",
        80: "#014554",
        70: "#8D8D8D",
        50: "#C1C1C1",
        40: "#ECF3F4",
        30: "#F2F2F2",
      },

      "alert-success": "#04BF7B",
      "alert-info": "#0093C6",
      "alert-warnig": "#F2B705",
      "alert-danger": "#F24C3D",
    },

    borderRadius: {
      "5xl": "50px",
      full: "50%",
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "1rem",
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".btn-extra": {
          backgroundColor: "#FF549A",
          "&:hover": {
            backgroundColor: "#E93E84",
          },
        },
        ".btn": {
          padding: ".625rem 1rem",
          borderRadius: ".375rem",
          textTransform: "uppercase",
          color: "white",
          fontWeight: "bold",
          width: "75%",
          "max-width": "320px",
          display: "block",
          margin: "1.5rem auto 1rem",
          cursor: "default",
          transition: "all .3s linear",
          "&:disabled": {
            background: "#C1C1C1",
          },
          "&:disabled:hover": {
            background: "#C1C1C1",
          },
        },
        ".btn-primary": {
          backgroundColor: "#18C29C",
          "&:hover": {
            backgroundColor: "#129578",
          },
        },
        ".btn-secondary": {
          backgroundColor: "#18C29C",
          "&:hover": {
            backgroundColor: "#129578",
          },
        },

        ".btn-discard": {
          background: "transparent",
          color: "#C1C1C1",
          border: "1px solid transparent",
          "&:hover": {
            "border-color": "#C1C1C1",
          },
        },
        ".content-box": {
          background: "white",
          border: "1px solid #F2F2F2",
          padding: "1rem",
          "border-radius": "0.5rem",
          "box-shadow": "0px 2px 6px 2px #C1C1C133",
          transition: "all .3s linear",
        },
        ".content-sections": {
          "max-width": "1200px",
          margin: " 0 auto",
        },

        ".separator": {
          "border-color": "#C1C1C1",
          margin: "0.8rem 0 1.25rem",
        },

        ".transition": {
          transition: "all .3s linear",
        },

        ".paragraph": {
          "font-size": "14px",
          color: "#5B5B5B",
        },
      });
    }),
  ],
};
