import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        custom: "0px 7px 29px rgba(100, 100, 111, 0.2)",
      },
    },
  },
  plugins: [],
} satisfies Config;
