import React from "react";

interface NeoCardProps {
    children: React.ReactNode;
    title?: string;
    className?: string;
}

export default function NeoCard({ children, title, className = "" }: NeoCardProps) {
    return (
        <div className={`bg-white border-[3px] border-black shadow-neo p-6 relative ${className}`}>
            {title && (
                <div className="bg-black text-white inline-block px-3 py-1 text-lg font-black uppercase border-b-[3px] border-r-[3px] border-transparent absolute -top-[3px] -left-[3px] z-10">
                    {title}
                </div>
            )}
            <div className={title ? "mt-6" : ""}>
                {children}
            </div>
        </div>
    );
}