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
                        a: {
                            color: "#3182ce",
                            textDecoration: "none !important",
                            "&:hover": {
                                color: "#2c5282",
                            },
                        },
                    },
                },
                dark: {
                    css: {
                        li: {
                            "&::marker": {
                                color: "#ffffff",
                            },
                        },
                        blockquote: {
                            borderLeft: "5px solid #c9cfd6",
                            backgroundColor: "#222e42",
                            "&:hover": {
                                backgroundColor: "#4B8F8C",
                            },
                            "&::before": {
                                color: "#E6DBD0",
                            },
                        },
                        section: {
                            ol: {
                                backgroundColor: "#374151",
                            },
                        },
                    },
                },
                light: {
                    css: {
                        li: {
                            "&::marker": {
                                color: "#000000",
                            },
                        },
                        blockquote: {
                            borderLeft: "5px solid #38393b",
                            backgroundColor: "#c9cfd6",
                            "&:hover": {
                                backgroundColor: "#9EC1FA",
                            },
                            "&::before": {
                                color: "#E6DBD0",
                            },
                        },
                        section: {
                            ol: {
                                backgroundColor: "#9EA9BD",
                            },
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
