/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            typography: {
                DEFAULT: {
                    css: {
                        blockquote: {
                            fontStyle: "normal",
                            fontWeight: "normal",
                        },
                    },
                },
                dark: {
                    css: {
                        "blockquote p:first-of-type::before": {
                            content: "none",
                        },
                        "blockquote p:first-of-type::after": {
                            content: "none",
                        },
                        a: {
                            color: "#3182ce",
                            "&:hover": {
                                color: "#2c5282",
                            },
                        },
                        blockquote: {
                            backgroundColor: "#222e42",
                            padding: "0.25rem",
                        },
                    },
                },
            },
            fontFamily: {
                body: "Montserrat",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
    ],
};
