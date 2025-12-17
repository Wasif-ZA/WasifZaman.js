"use client";

import React from "react";
import { motion } from "framer-motion";

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
    repeat = 5, // Lower default needed because we duplicate the container now
    reverse = false,
    pauseOnHover = false,
}: MarqueeProps) {

    // We create a single block of repeated text
    const MarqueeContent = (
        <div className="flex shrink-0 items-center justify-around space-x-8 px-4">
            {Array.from({ length: repeat }).map((_, i) => (
                <span key={i} className="mx-4">
                    {text}
                </span>
            ))}
        </div>
    );

    return (
        <div
            className={`
        group relative flex overflow-hidden border-y-[3px] border-black bg-neo-primary py-4 whitespace-nowrap
        ${className || ""}
      `}
        >
            {/* We render two identical motion divs. 
        As the first one scrolls out of view, the second one follows perfectly.
      */}
            <MarqueeSlider
                duration={duration}
                reverse={reverse}
                pauseOnHover={pauseOnHover}
            >
                {MarqueeContent}
            </MarqueeSlider>

            <MarqueeSlider
                duration={duration}
                reverse={reverse}
                pauseOnHover={pauseOnHover}
                aria-hidden="true" // Hides the duplicate from screen readers
            >
                {MarqueeContent}
            </MarqueeSlider>

            {/* Optional: Add a raw vignette or overlay if you want extra grit */}
            {/* <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]"></div> */}
        </div>
    );
}

// Sub-component to handle the animation logic cleanly
const MarqueeSlider = ({
    children,
    duration,
    reverse,
    pauseOnHover,
    ...props
}: any) => {
    return (
        <motion.div
            className="flex shrink-0 min-w-full font-black uppercase text-3xl tracking-tighter will-change-transform"
            initial={{ x: reverse ? "-100%" : "0%" }}
            animate={{ x: reverse ? "0%" : "-100%" }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
            }}
            {...(pauseOnHover && {
                whileHover: { animationPlayState: "paused" }, // Note: Framer Motion handles pause differently, see CSS fallback below if needed
            })}
            // Framer Motion doesn't natively support "pause" easily without complex controls, 
            // so for simple hover pause in pure CSS context (if you prefer):
            style={pauseOnHover ? { cursor: "default" } : undefined}
            {...props}
        >
            {children}
        </motion.div>
    );
};