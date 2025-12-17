import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                neo: {
                    bg: "#F0F0F0",       // Light Grey background
                    text: "#050505",     // Near Black
                    primary: "#FFDE00",  // Cyber Yellow
                    secondary: "#8B5CF6", // Violet
                    accent: "#FF4D4D",   // Red/Pink
                },
            },
            boxShadow: {
                neo: "5px 5px 0px 0px rgba(0,0,0,1)",        // Hard shadow
                "neo-lg": "8px 8px 0px 0px rgba(0,0,0,1)",   // Larger hard shadow
                "neo-sm": "3px 3px 0px 0px rgba(0,0,0,1)",   // Small hard shadow
            },
            dropShadow: {
                neo: "4px 4px 0px #000", // For text
            },
            animation: {
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            }
        },
    },
    plugins: [],
};
export default config;