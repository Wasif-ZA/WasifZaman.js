"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import NeoButton from "./NeoButton";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = ["Work", "Services", "History", "Contact"];

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-4 py-4 pointer-events-none">
                {/* Logo */}
                <div className="bg-neo-primary border-[3px] border-black p-2 font-black text-xl pointer-events-auto shadow-neo">
                    WZ.
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-4 pointer-events-auto">
                    <NeoButton size="sm" onClick={() => document.getElementById('contact')?.scrollIntoView()}>Let's Talk</NeoButton>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden pointer-events-auto bg-white border-[3px] border-black p-2 shadow-neo active:translate-y-1 active:shadow-none transition-all"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </nav>

            {/* Mobile Full Screen Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="fixed inset-0 z-[110] bg-neo-bg flex flex-col items-center justify-center border-b-[4px] border-black"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-6 right-6 bg-neo-accent text-white border-[3px] border-black p-2 shadow-neo"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="flex flex-col gap-8 text-center">
                            {menuItems.map((item, i) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-6xl font-black uppercase text-stroke-black hover:text-neo-primary hover:text-stroke-0 transition-all"
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}