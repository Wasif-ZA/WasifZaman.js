"use client";

import React from "react";

interface MarqueeProps {
    /** The text content to display */
    text: string;
    /** Optional custom styling */
    className?: string;
    /** Speed of the scroll in seconds (lower is faster) */
    duration?: number;
    /** Number of times to repeat text inside the block to ensure it fills screen */
    repeat?: number;
    /** Direction of scroll */
    reverse?: boolean;
    /** Pause the animation when user hovers */
    pauseOnHover?: boolean;
}

export default function Marquee({
    text,
    className,
    duration = 20,
    repeat = 5,
    reverse = false,
    pauseOnHover = false,
}: MarqueeProps) {
    const content = (
        <div className="flex shrink-0 items-center justify-around space-x-8 px-4">
            {Array.from({ length: repeat }).map((_, i) => (
                <span key={i} className="mx-4">
                    {text}
                </span>
            ))}
        </div>
    );

    const animationName = reverse ? "marquee-right" : "marquee-left";
    const trackClass = `flex shrink-0 min-w-full font-black uppercase text-3xl tracking-tighter will-change-transform ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`;
    const trackStyle = { animation: `${animationName} ${duration}s linear infinite` };

    return (
        <div
            className={`group relative flex overflow-hidden border-y-[3px] border-black bg-neo-primary py-4 whitespace-nowrap ${className || ""}`}
        >
            <div className={trackClass} style={trackStyle}>
                {content}
            </div>
            <div aria-hidden="true" className={trackClass} style={trackStyle}>
                {content}
            </div>
        </div>
    );
}
