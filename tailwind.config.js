module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Rubik, sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
