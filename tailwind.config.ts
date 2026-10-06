import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#ECEAE4",
        ink: "#16181B",
        road: "#25272B",
        lane: "#F2F0EA",
        papaya: "#F26B0F",
      },
      fontFamily: {
        display: ['"Unbounded Variable"', "system-ui", "sans-serif"],
        sans: ['"Instrument Sans Variable"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
