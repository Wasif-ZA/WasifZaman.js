"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink, X } from "lucide-react";
import { cn } from "../lib/utils";
import NeoButton from "./NeoButton";

interface Props {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    title: string;
    imgSrc?: string; // Optional for now
    code?: string;
    projectLink?: string;
    tech: string[];
    description: string; // Changed modalContent to description string for simplicity or keep JSX
    modalContent?: React.ReactNode;
}

export const ProjectModal = ({
    isOpen,
    setIsOpen,
    title,
    imgSrc,
    code,
    projectLink,
    tech,
    modalContent,
    description
}: Props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-12"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, rotate: -2 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.95, opacity: 0, rotate: 2 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-2xl overflow-hidden bg-neo-bg neo-box max-h-[90vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b-[3px] border-black p-6 bg-white">
                            <h4 className="text-3xl font-black uppercase tracking-tighter">{title}</h4>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-neo-primary border-[3px] border-transparent hover:border-black transition-all"
                            >
                                <X className="w-8 h-8" />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-8 custom-scrollbar">
                            {imgSrc && (
                                <img
                                    className="w-full mb-8 neo-box"
                                    src={imgSrc}
                                    alt={`An image of the ${title} project.`}
                                />
                            )}

                            <div className="flex flex-wrap gap-2 mb-6">
                                {tech.map((t) => (
                                    <span key={t} className="px-3 py-1 font-mono font-bold text-sm bg-neo-secondary text-white border-2 border-black transform hover:-translate-y-1 transition-transform cursor-default">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-4 mb-8 leading-relaxed font-medium text-lg">
                                {description}
                                {modalContent}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-[3px] border-black">
                                {code && (
                                    <Link href={code} target="_blank" className="w-full">
                                        <NeoButton variant="base" className="w-full justify-center gap-2">
                                            <Github className="w-5 h-5" /> Source Code
                                        </NeoButton>
                                    </Link>
                                )}
                                {projectLink && (
                                    <Link href={projectLink} target="_blank" className="w-full">
                                        <NeoButton variant="primary" className="w-full justify-center gap-2">
                                            <ExternalLink className="w-5 h-5" /> Live Project
                                        </NeoButton>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
};
