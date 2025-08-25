/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brasil: { green: "#099E48", yellow: "#FFDD00", blue: "#0A2B7E" }
      },
      boxShadow: { soft: "0 6px 20px rgba(0,0,0,.06)" }
    }
  },
  plugins: [],
}
