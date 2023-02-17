/** @type {import("tailwindcss").Config} */
module.exports = {
  purge: ["./pages/**/*.{jsx,tsx}", "./lib/**/*.{jsx,tsx}"],
  content: [],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        custom: {
          primary: "#033DF7",
          secondary: "#8E3377",
          accent: "#CBE4B7",
          neutral: "#FCFCFC",
          "base-100": "#2A303C",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272"
        }
      }
    ]
  }
};
