import Image from "next/image";

interface IconProps {
    className?: string;
    size?: number;
}

export function AiIcon({ className, size = 32 }: IconProps) {
    return (
        <div className={`relative ${className}`} style={{ width: size, height: size }}>
            <Image
                src="/ai-icon.png"
                alt="AI Icon"
                fill
                className="object-contain" // Ensures the icon scales correctly within the box
            />
        </div>
    );
}
