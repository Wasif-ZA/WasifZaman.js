"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import NeoButton from "./NeoButton";

// href is explicit: deriving it from the label silently broke when the
// "Services" section was renamed to "Focus".
const MENU_ITEMS = [
    { label: "Work", href: "#work" },
    { label: "Focus", href: "#focus" },
    { label: "History", href: "#history" },
    { label: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef<HTMLDivElement>(null);
    const openerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
                return;
            }
            if (e.key !== "Tab") return;

            const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled])'
            );
            if (!focusables?.length) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        const opener = openerRef.current;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);

        panelRef.current?.querySelector<HTMLElement>("a[href], button")?.focus();

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = prevOverflow;
            opener?.focus();
        };
    }, [isOpen]);

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 py-4 pointer-events-none">
                <a
                    href="#top"
                    className="bg-neo-primary border-[3px] border-black p-2 font-black text-xl pointer-events-auto shadow-neo text-black"
                >
                    WZ.
                </a>

                <div className="hidden md:flex gap-2 pointer-events-auto items-center">
                    {MENU_ITEMS.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="bg-white border-[3px] border-black px-3 py-2 font-black uppercase text-sm shadow-neo-sm hover:bg-neo-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
                        >
                            {item.label}
                        </a>
                    ))}
                    <NeoButton
                        size="sm"
                        variant="accent"
                        onClick={() =>
                            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                        }
                    >
                        Let&apos;s Talk
                    </NeoButton>
                </div>

                <button
                    ref={openerRef}
                    onClick={() => setIsOpen(true)}
                    aria-label="Open menu"
                    aria-expanded={isOpen}
                    className="md:hidden pointer-events-auto bg-white border-[3px] border-black p-2 shadow-neo active:translate-y-1 active:shadow-none transition-all"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={panelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Site menu"
                        initial={{ y: "-100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="fixed inset-0 z-[110] bg-neo-bg flex flex-col items-center justify-center border-b-[4px] border-black"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                            className="absolute top-6 right-6 bg-neo-accent text-white border-[3px] border-black p-2 shadow-neo"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="flex flex-col gap-8 text-center">
                            {MENU_ITEMS.map((item, i) => (
                                <motion.a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-5xl sm:text-6xl font-black uppercase text-stroke-black hover:text-neo-primary hover:text-stroke-0 transition-all"
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
