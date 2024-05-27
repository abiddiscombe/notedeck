/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: colors.zinc,
            },
            fontFamily: {
                sans: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "avenir next",
                    "avenir",
                    "segoe ui",
                    "helvetica neue",
                    "helvetica",
                    "Cantarell",
                    "Ubuntu",
                    "roboto",
                    "noto",
                    "arial",
                    "sans-serif",
                ],
            },
        },
    },
    plugins: [require("@headlessui/tailwindcss")],
    darkMode: "selector",
};
