import React from "react";

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "accent" | "base";
    size?: "sm" | "md" | "lg";
}

export default function NeoButton({
    children,
    className = "",
    variant = "base",
    size = "md",
    ...props
}: NeoButtonProps) {

    const baseStyles = "font-bold border-[3px] border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none";

    const variants = {
        primary: "bg-neo-primary text-black shadow-neo hover:bg-yellow-300",
        secondary: "bg-neo-secondary text-white shadow-neo hover:bg-purple-600",
        accent: "bg-neo-accent text-white shadow-neo hover:bg-pink-500",
        base: "bg-white text-black shadow-neo hover:bg-gray-50",
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-xl uppercase tracking-wide",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}