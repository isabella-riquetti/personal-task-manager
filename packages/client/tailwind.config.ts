/** @type {import('tailwindcss').Config} */
export default {
    important: true,
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            inherit: "inherit",
            current: "currentColor",
            transparent: "transparent",
            white: "#FFF",
            primary: "#c8756b",

            pink: {
                50: '#fbf6f5',
                100: '#f8eae8',
                200: '#f2d8d5',
                300: '#e8beb9',
                400: '#d99890',
                500: '#c8756b',
                600: '#b3594f',
                700: '#954940',
                800: '#7c3f38',
                900: '#693933',
                950: '#381a17'
            },

            pale: {
                DEFAULT: '#F0E1D7',
                50: '#F8F2ED',
                100: '#F5ECE6',
                200: '#F0E1D7',
                300: '#E0C2AF',
                400: '#D0A387',
                500: '#C0835E',
                600: '#A66741',
                700: '#7E4E31',
                800: '#553521',
                900: '#2D1C11',
                950: '#190F0A'
            },

            purple: {
                50: '#faf7fd',
                100: '#f3edfa',
                200: '#e3d4f2',
                300: '#d9c5ed',
                400: '#c2a0e0',
                500: '#a97bd1',
                600: '#935dc0',
                700: '#7d4aa6',
                800: '#6a4089',
                900: '#56356e',
                950: '#391d4e',
            },

            green: {
                '50': '#f1f8f2',
                '100': '#deeddf',
                '200': '#b7d7bc',
                '300': '#94c19e',
                '400': '#66a175',
                '500': '#458457',
                '600': '#326943',
                '700': '#285436',
                '800': '#22432d',
                '900': '#1c3825',
                '950': '#0f1f15',
            },

            blue: {
                50: '#f1f5fc',
                100: '#e5edfa',
                200: '#cddaf4',
                300: '#b4c6ed',
                400: '#95a7e4',
                500: '#7b8ad9',
                600: '#6169ca',
                700: '#5157b1',
                800: '#434890',
                900: '#3c4173',
                950: '#232543',
            },

            red: {
                DEFAULT: '#CC7D70',
                50: '#EACAC5',
                100: '#E4BBB4',
                200: '#D89C92',
                300: '#CC7D70',
                400: '#C16252',
                500: '#AC4E3E',
                600: '#8E4033',
                700: '#703328',
                800: '#52251E',
                900: '#341813',
                950: '#25110D'
            },

            orange: {
                DEFAULT: '#F1BB79',
                50: '#F9E7CA',
                100: '#F8DFBA',
                200: '#F4CE99',
                300: '#F1BB79',
                400: '#EDA554',
                500: '#E98D2F',
                600: '#D97417',
                700: '#B45C13',
                800: '#8F470F',
                900: '#6A320B',
                950: '#582809'
            },

            black: {
                50: '#f6f6f6',
                100: '#e7e7e7',
                200: '#d1d1d1',
                300: '#b0b0b0',
                400: '#888888',
                500: '#6d6d6d',
                600: '#5d5d5d',
                700: '#4f4f4f',
                800: '#454545',
                900: '#3d3d3d',
                950: '#000000',
            },

            error: {
                DEFAULT: "#AC4E3E",
                stroke: "#3BD9D9",
                background: "#844848",
            },

            warning: {
                DEFAULT: "#D97417",
                background: "#F1BB79",
            },
        },

        fontFamily: {
            base: '"Comfortaa", sans-serif',
            sans: ['"Anton"', "Rubik", "sans-serif"],
        },
    },
}
