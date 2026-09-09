import React from "react";

type Variant = "primary" | "secondary" | "accent" | "base";
type Size = "sm" | "md" | "lg";

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    size?: Size;
    /**
     * Render a <span> instead of a <button>. Use inside an <a>: a button nested
     * in a link is invalid HTML and produces two keyboard stops for one action.
     */
    as?: "button" | "span";
}

const BASE =
    "inline-flex items-center font-bold border-[3px] border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-neo-accent focus-visible:ring-offset-2";

// Text colour per background is set by measured WCAG contrast, not by taste:
// white on #FF00FF is 3.14:1 and fails AA, black on it is 6.70:1.
const VARIANTS: Record<Variant, string> = {
    primary: "bg-neo-primary text-black shadow-neo hover:bg-yellow-300",
    secondary: "bg-neo-secondary text-black shadow-neo hover:bg-fuchsia-400",
    accent: "bg-neo-accent text-white shadow-neo hover:bg-blue-700",
    base: "bg-white text-black shadow-neo hover:bg-gray-50",
};

const SIZES: Record<Size, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-xl uppercase tracking-wide",
};

export default function NeoButton({
    children,
    className = "",
    variant = "base",
    size = "md",
    as = "button",
    ...props
}: NeoButtonProps) {
    const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

    if (as === "span") {
        return <span className={classes}>{children}</span>;
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
