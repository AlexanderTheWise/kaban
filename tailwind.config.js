/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "var(--bg-pr)",
        bgSecond: "var(--bg-sc)",
        bgThird: "var(--bg-thr)",
        bgBtnPrimary: "var(--bg-btn-pr)",
        bgBtnPrimaryHov: "var(--bg-btn-pr-hov)",
        bgBtnSecond: "var(--bg-btn-sc)",
        bgBtnSecondHov: "var(--bg-btn-sc-hov)",
        bgBtnDelete: "var(--bg-btn-del)",
        bgBtnDeleteHov: "var(--bg-btn-del-hov)",
      },
    },
    screens: {
      tablet: "768px",
      desktop: "1200px",
    },
  },
  plugins: [],
}
