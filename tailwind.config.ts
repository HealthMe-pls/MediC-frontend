import type { Config } from "tailwindcss";
// import tailwind

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FFF7EB",
        // foreground: "var(--foreground)",
      },
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
      },
      borderRadius: {
        4: "4px",
        8: "8px",
        16: "16px",
        20: "20px",
        24: "24px",
        40: "40px",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["checked"], // รองรับ checked:bg
      borderColor: ["checked"], // รองรับ checked:border
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
} satisfies Config;
