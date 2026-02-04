"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NeoButton from "./NeoButton";
import { X } from "lucide-react";

type Project = {
    title: string;
    tech: string[];
    description: string;
    imgSrc?: string;

    projectLink?: string; // live site
    code?: string;        // repo
    previewUrl?: string;  // computed in Home (projectLink or stackblitz)
    previewMode?: "iframe" | "stackblitz" | "none";
};

type Props = Project & {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

export function ProjectModal({
    isOpen,
    setIsOpen,
    title,
    tech,
    description,
    imgSrc,
    projectLink,
    code,
    previewUrl,
}: Props) {
    const [tab, setTab] = useState<"preview" | "details">("preview");
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const slug = useMemo(
        () => title.toLowerCase().trim().replace(/\s+/g, "-"),
        [title]
    );

    const hasPreview = !!previewUrl;

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [setIsOpen]);

    // Reset loader when opening / switching projects
    useEffect(() => {
        if (!isOpen) return;
        setIframeLoaded(false);
        setTab(hasPreview ? "preview" : "details");
    }, [isOpen, hasPreview, title]);

    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    className="fixed inset-0 z-[200] flex items-center justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    aria-modal="true"
                    role="dialog"
                >
                    {/* Backdrop */}
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setIsOpen(false)}
                        aria-label="Close modal"
                    />

                    {/* Panel */}
                    <motion.div
                        className="relative w-full max-w-6xl bg-white border-[4px] border-black shadow-neo-lg overflow-hidden"
                        initial={{ y: 30, scale: 0.985, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ y: 20, scale: 0.985, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 140, damping: 18 }}
                    >
                        {/* Top bar */}
                        <div className="bg-black text-white px-4 py-3 flex items-center justify-between border-b-[4px] border-black">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500 border border-white/20" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white/20" />
                                <div className="w-3 h-3 rounded-full bg-green-500 border border-white/20" />
                                <span className="ml-3 font-mono text-xs opacity-70">
                                    /projects/{slug}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="border-2 border-white/20 hover:border-white px-2 py-1"
                                aria-label="Close"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* CONTENT */}
                        <div className="p-6 md:p-8">
                            {/* Header row */}
                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
                                <div className="min-w-0">
                                    <h3 className="text-4xl md:text-6xl font-black uppercase leading-none">
                                        {title}
                                    </h3>

                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {tech.map((t) => (
                                            <span
                                                key={t}
                                                className="bg-black text-white text-[10px] font-mono px-2 py-1 font-bold uppercase"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div className="flex border-[3px] border-black w-full lg:w-auto bg-white shrink-0">
                                    <button
                                        type="button"
                                        onClick={() => setTab("preview")}
                                        disabled={!hasPreview}
                                        className={`px-4 py-2 font-mono font-bold text-xs uppercase border-r-[3px] border-black w-1/2 lg:w-auto transition-colors ${!hasPreview
                                                ? "opacity-40 cursor-not-allowed"
                                                : tab === "preview"
                                                    ? "bg-neo-primary text-black"
                                                    : "bg-white text-black hover:bg-neo-bg"
                                            }`}
                                    >
                                        Preview
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setTab("details")}
                                        className={`px-4 py-2 font-mono font-bold text-xs uppercase w-1/2 lg:w-auto transition-colors ${tab === "details"
                                                ? "bg-neo-accent text-white"
                                                : "bg-white text-black hover:bg-neo-bg"
                                            }`}
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                {projectLink ? (
                                    <a
                                        href={projectLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full sm:w-auto"
                                    >
                                        <NeoButton
                                            variant="primary"
                                            className="w-full justify-center"
                                            type="button"
                                        >
                                            Live Site
                                        </NeoButton>
                                    </a>
                                ) : null}

                                {code ? (
                                    <a
                                        href={code}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full sm:w-auto"
                                    >
                                        <NeoButton
                                            variant="secondary"
                                            className="w-full justify-center"
                                            type="button"
                                        >
                                            Repo
                                        </NeoButton>
                                    </a>
                                ) : null}

                                {previewUrl ? (
                                    <a
                                        href={previewUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full sm:w-auto"
                                    >
                                        <NeoButton
                                            variant="base"
                                            className="w-full justify-center"
                                            type="button"
                                        >
                                            Open Preview
                                        </NeoButton>
                                    </a>
                                ) : null}

                                <div className="flex-1" />
                                <NeoButton
                                    variant="base"
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="w-full sm:w-auto justify-center"
                                >
                                    Close
                                </NeoButton>
                            </div>

                            {/* Body */}
                            {tab === "preview" ? (
                                <div className="border-[3px] border-black bg-white shadow-neo overflow-hidden">
                                    {/* Browser bar */}
                                    <div className="bg-black text-white px-4 py-2 flex items-center justify-between border-b-[3px] border-black gap-3">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-3 h-3 rounded-full bg-red-500 border border-white/20" />
                                            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-white/20" />
                                            <div className="w-3 h-3 rounded-full bg-green-500 border border-white/20" />
                                            <span className="ml-3 font-mono text-[10px] opacity-80 truncate">
                                                {previewUrl || "No preview"}
                                            </span>
                                        </div>

                                        {previewUrl ? (
                                            <a
                                                href={previewUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="font-mono text-[10px] underline hover:text-neo-primary whitespace-nowrap"
                                            >
                                                Open in new tab
                                            </a>
                                        ) : null}
                                    </div>

                                    {/* Preview area */}
                                    <div className="relative w-full bg-white">
                                        {/* Loader */}
                                        {!iframeLoaded ? (
                                            <div className="absolute inset-0 z-10 bg-white">
                                                <div className="h-full w-full p-6">
                                                    <div className="h-6 w-40 bg-black/10 mb-4" />
                                                    <div className="h-4 w-72 bg-black/10 mb-2" />
                                                    <div className="h-4 w-64 bg-black/10 mb-2" />
                                                    <div className="h-4 w-52 bg-black/10 mb-6" />
                                                    <div className="h-[45vh] md:h-[60vh] w-full bg-black/10 border-2 border-black" />
                                                    <p className="mt-4 font-mono text-xs opacity-60">
                                                        Loading preview…
                                                    </p>
                                                </div>
                                            </div>
                                        ) : null}

                                        {previewUrl ? (
                                            <iframe
                                                src={previewUrl}
                                                title={`${title} preview`}
                                                className="w-full h-[55vh] md:h-[70vh] bg-white"
                                                loading="lazy"
                                                onLoad={() => setIframeLoaded(true)}
                                                referrerPolicy="no-referrer"
                                                sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
                                            />
                                        ) : (
                                            <div className="p-6">
                                                <p className="font-mono font-bold text-sm">
                                                    No preview available.
                                                </p>
                                                <p className="text-xs opacity-70 font-mono mt-2">
                                                    Add a <span className="font-bold">projectLink</span> or a GitHub{" "}
                                                    <span className="font-bold">code</span> repo to enable previews.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                                    {/* Details */}
                                    <div className="lg:col-span-3 border-[3px] border-black bg-white shadow-neo p-6">
                                        <h4 className="text-2xl md:text-3xl font-black uppercase mb-4">
                                            What it is
                                        </h4>
                                        <p className="font-bold text-sm md:text-base leading-relaxed border-l-4 border-black pl-4">
                                            {description}
                                        </p>

                                        {/* Links summary */}
                                        <div className="mt-6 border-t-2 border-dashed border-black/20 pt-4">
                                            <p className="font-mono text-[10px] uppercase opacity-60 mb-2">
                                                Links
                                            </p>
                                            <div className="space-y-2 font-mono text-xs">
                                                <div className="flex gap-2">
                                                    <span className="opacity-60 w-20">Live:</span>
                                                    <span className="break-all">{projectLink || "—"}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="opacity-60 w-20">Repo:</span>
                                                    <span className="break-all">{code || "—"}</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <span className="opacity-60 w-20">Preview:</span>
                                                    <span className="break-all">{previewUrl || "—"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Screenshot (ONLY if you actually have one) */}
                                    <div className="lg:col-span-2 border-[3px] border-black bg-white shadow-neo overflow-hidden">
                                        <div className="bg-black text-white px-4 py-2 border-b-[3px] border-black">
                                            <span className="font-mono text-xs opacity-80">SCREENSHOT</span>
                                        </div>

                                        {imgSrc ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={imgSrc}
                                                alt={`${title} screenshot`}
                                                className="w-full h-[260px] md:h-[340px] object-cover"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="p-6">
                                                <p className="font-mono text-xs opacity-70">
                                                    No screenshot provided.
                                                </p>
                                                <p className="font-mono text-xs opacity-50 mt-2">
                                                    Add <span className="font-bold">imgSrc</span> to show one here.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
