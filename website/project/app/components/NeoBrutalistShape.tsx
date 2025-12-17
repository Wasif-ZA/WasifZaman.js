import React from "react";

interface ShapeProps {
    type: "circle" | "triangle" | "square" | "polygon";
    color?: string;
    className?: string;
    rotation?: number;
}

export default function NeoBrutalistShape({
    type,
    color = "bg-black",
    className = "",
    rotation = 0
}: ShapeProps) {

    // Base classes for the SVG container
    const baseClass = `absolute pointer-events-none ${className}`;
    const fillClass = color.replace("bg-", "fill-"); // Convert tailwind bg to fill

    return (
        <div className={baseClass} style={{ transform: `rotate(${rotation}deg)` }}>
            <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]`}>
                {type === "circle" && <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="3" className={fillClass} />}
                {type === "square" && <rect x="5" y="5" width="90" height="90" stroke="black" strokeWidth="3" className={fillClass} />}
                {type === "triangle" && <polygon points="50,5 95,95 5,95" stroke="black" strokeWidth="3" className={fillClass} />}
            </svg>
        </div>
    );
}