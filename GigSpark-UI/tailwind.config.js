import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

// @ts-ignore
const {
  default: flattenColorPalette,
}= require("tailwindcss/lib/util/flattenColorPalette");
/** @type {import('tailwindcss').Config} */

export default {
  darkMode: ["class"],
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        logo: ["Sour Gummy", "sans-serif"],
        primary: ["Exo 2", "sans-serif"],
        secondary: ["Poppins", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - 2.5rem))",
          },
        },
        rotateTxt: {
          from: {
            transform: "translate(-50%, -50%) rotate(0deg)",
          },
          to: {
            transform: "translate(-50%, -50%) rotate(360deg)",
          },
        },
        "box-slide": {
          from: {
            height: "0",
          },
          to: {
            height: "100%",
          },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        marquee: "marquee var(--duration) infinite linear",
        rotate: "rotateTxt 5s infinite linear",
        "toast-slide": "toast-slide 5s linear forwards",
        aurora: "aurora 60s linear infinite",
      },
      backgroundImage: {
        "custom-radial":
          "radial-gradient(63.44% 63.44% at 50% 50%, #c2ffe2 0, #fff 100%)",
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors
  ],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
