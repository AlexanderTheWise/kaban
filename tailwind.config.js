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
        bordSecond: "var(--bord-sc)",
        bordInput: "var(--bord-inp)",
        textDarkWhite: "var(--text-dark-white)",
        textGrayWhite: "var(--text-gray-white)",
        purple: "#635fc7",
        red: "#ea5555",
        gray: "#828fa3",
      },
      fontSize: {
        headingXL: [
          "24px",
          {
            fontWeight: "700",
            lineHeight: "30px",
          },
        ],
        headingL: [
          "18px",
          {
            fontWeight: "700",
            lineHeight: "23px",
          },
        ],
        headingM: [
          "15px",
          {
            fontWeight: "700",
            lineHeight: "19px",
          },
        ],
        headingS: [
          "12px",
          {
            fontWeight: "700",
            lineHeight: "15px",
            letterSpacing: "2.4px",
          },
        ],
        bodyL: [
          "13px",
          {
            fontWeight: "500",
            lineHeight: "23px",
          },
        ],
        bodyM: [
          "12px",
          {
            fontWeight: "700",
            lineHeight: "15px",
          },
        ],
      },
    },
    animation: {
      fadeIn: "fadeIn 0.28s ease-in-out",
    },
    keyframes: {
      fadeIn: {
        "0%": { opacity: "0" },
        "100%": { opacity: "100%" },
      },
    },
    screens: {
      mobile: { max: "768px" },
      tablet: "768px",
      desktop: "1200px",
    },
  },
  plugins: [],
}
