/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: '#00A1B1',   // Extracted Cyan
                    secondary: '#00546B', // Extracted Dark Teal
                    background: '#F4FCFD', // Extracted Hero Background
                    dark: '#333333',
                },
                surface: {
                    DEFAULT: '#FFFFFF',
                }
            },
            fontFamily: {
                sans: ['"Segoe UI"', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
            },
            boxShadow: {
                'card': '0px 10px 30px 0px rgba(0,0,0,0.05)',
                'card-hover': '0px 15px 40px 0px rgba(0,0,0,0.1)',
                'navbar': '0px 2px 10px 0px rgba(0,0,0,0.1)',
            },
            borderRadius: {
                'card': '15px',
            }
        },
    },
    plugins: [],
}
