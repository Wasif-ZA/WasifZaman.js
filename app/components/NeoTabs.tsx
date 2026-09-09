"use client";

import React, { useId } from "react";

export type NeoTabVariant = "primary" | "accent";

export interface NeoTab {
    id: string;
    label: string;
    disabled?: boolean;
    variant?: NeoTabVariant;
}

interface NeoTabsProps {
    tabs: NeoTab[];
    value: string;
    onChange: (id: string) => void;
    className?: string;
    ariaLabel?: string;
    /** Per-tab IDs are required by ARIA tab pattern; pass an idPrefix so panels can map aria-labelledby */
    idPrefix?: string;
}

const variantActive: Record<NeoTabVariant, string> = {
    primary: "bg-neo-primary text-black",
    accent: "bg-neo-accent text-white",
};

export default function NeoTabs({
    tabs,
    value,
    onChange,
    className = "",
    ariaLabel,
    idPrefix,
}: NeoTabsProps) {
    const fallback = useId();
    const prefix = idPrefix ?? fallback;

    const selectable = tabs.filter((t) => !t.disabled);

    function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
        if (!keys.includes(e.key) || selectable.length === 0) return;
        e.preventDefault();

        const current = selectable.findIndex((t) => t.id === value);
        const at =
            e.key === "Home"
                ? 0
                : e.key === "End"
                    ? selectable.length - 1
                    : e.key === "ArrowRight"
                        ? (current + 1) % selectable.length
                        : (current - 1 + selectable.length) % selectable.length;

        const next = selectable[at];
        onChange(next.id);
        document.getElementById(`${prefix}-tab-${next.id}`)?.focus();
    }

    return (
        <div
            role="tablist"
            aria-label={ariaLabel}
            onKeyDown={onKeyDown}
            className={`flex border-[3px] border-black bg-white shrink-0 ${className}`}
        >
            {tabs.map((tab, i) => {
                const selected = tab.id === value;
                const variant = tab.variant ?? "primary";
                const isLast = i === tabs.length - 1;

                return (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        id={`${prefix}-tab-${tab.id}`}
                        aria-selected={selected}
                        aria-controls={`${prefix}-panel-${tab.id}`}
                        tabIndex={selected ? 0 : -1}
                        disabled={tab.disabled}
                        onClick={() => onChange(tab.id)}
                        className={`px-4 py-2 font-mono font-bold text-xs uppercase w-1/2 lg:w-auto transition-colors ${!isLast ? "border-r-[3px] border-black" : ""
                            } ${tab.disabled
                                ? "opacity-40 cursor-not-allowed"
                                : selected
                                    ? variantActive[variant]
                                    : "bg-white text-black hover:bg-neo-bg"
                            }`}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}

interface NeoTabPanelProps {
    tabId: string;
    idPrefix: string;
    children: React.ReactNode;
    className?: string;
}

export function NeoTabPanel({ tabId, idPrefix, children, className = "" }: NeoTabPanelProps) {
    return (
        <div
            role="tabpanel"
            id={`${idPrefix}-panel-${tabId}`}
            aria-labelledby={`${idPrefix}-tab-${tabId}`}
            className={className}
        >
            {children}
        </div>
    );
}
