/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "noto-sans-tc": ['"Noto Sans TC"', "sans-serif"], // 自定義字體
      },
      fontWeight: {
        100: "100",
        400: "400",
        700: "700",
        900: "900", // 你可以加入多種字重
      },
    },
  },
  plugins: [],
};
