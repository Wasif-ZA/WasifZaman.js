"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import NeoButton from "./NeoButton";
import NeoTabs, { NeoTabPanel, type NeoTab } from "./NeoTabs";
import ArchDiagram, { type ArchSpec } from "./ArchDiagram";
import { X } from "lucide-react";

type Project = {
    title: string;
    blurb?: string;
    tech: string[];
    description: string;
    imgSrc?: string;
    imgNote?: string;
    arch?: ArchSpec;

    projectLink?: string;
    code?: string;
    altCode?: string;
    altCodeLabel?: string;
    previewUrl?: string;
};

type Props = Project & {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
};

const FOCUSABLE =
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({
    isOpen,
    setIsOpen,
    title,
    blurb,
    tech,
    description,
    imgSrc,
    imgNote,
    arch,
    projectLink,
    code,
    altCode,
    altCodeLabel,
    previewUrl,
}: Props) {
    const hasPreview = !!previewUrl;
    const [tab, setTab] = useState<"preview" | "details">(hasPreview ? "preview" : "details");
    const [iframeLoaded, setIframeLoaded] = useState(false);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const baseId = useId();

    const tabs: NeoTab[] = useMemo(
        () => [
            { id: "preview", label: "Preview", disabled: !hasPreview, variant: "primary" },
            { id: "details", label: "Details", variant: "accent" },
        ],
        [hasPreview]
    );

    const slug = useMemo(
        () => title.toLowerCase().trim().replace(/\s+/g, "-"),
        [title]
    );

    useEffect(() => {
        if (!isOpen) return;

        // Without this, closing drops the keyboard user at the top of the
        // document instead of back on the card they opened.
        const opener = document.activeElement as HTMLElement | null;
        const focusTimer = window.setTimeout(() => {
            panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
        }, 0);

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
                return;
            }
            if (e.key !== "Tab" || !panelRef.current) return;

            const focusables = Array.from(
                panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
            ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
            if (focusables.length === 0) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement as HTMLElement | null;

            if (e.shiftKey && active === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.clearTimeout(focusTimer);
            window.removeEventListener("keydown", onKeyDown);
            opener?.focus?.();
        };
    }, [isOpen, setIsOpen]);

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
                    aria-labelledby={`${baseId}-title`}
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
                        ref={panelRef}
                        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-y-auto overscroll-contain border-[4px] border-black bg-white shadow-neo-lg"
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
                                aria-label="Close modal"
                            >
                                <X className="w-4 h-4" aria-hidden="true" />
                            </button>
                        </div>

                        {/* CONTENT */}
                        <div className="p-6 md:p-8">
                            {/* Header row */}
                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
                                <div className="min-w-0">
                                    <h3
                                        id={`${baseId}-title`}
                                        className="text-4xl md:text-6xl font-black uppercase leading-none"
                                    >
                                        {title}
                                    </h3>

                                    {blurb ? (
                                        <p className="mt-2 font-mono text-xs font-bold uppercase tracking-tight opacity-60">
                                            {blurb}
                                        </p>
                                    ) : null}

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

                                <NeoTabs
                                    tabs={tabs}
                                    value={tab}
                                    onChange={(id) => setTab(id as "preview" | "details")}
                                    ariaLabel="Project view"
                                    idPrefix={baseId}
                                    className="w-full lg:w-auto"
                                />
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                                {projectLink ? (
                                    <a
                                        href={projectLink}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="w-full sm:w-auto"
                                    >
                                        <NeoButton
                                            variant="primary"
                                            className="w-full justify-center"
                                            as="span"
                                        >
                                            Live Site
                                        </NeoButton>
                                    </a>
                                ) : null}

                                {code ? (
                                    <a
                                        href={code}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="w-full sm:w-auto"
                                    >
                                        <NeoButton
                                            variant="secondary"
                                            className="w-full justify-center"
                                            as="span"
                                        >
                                            Repo
                                        </NeoButton>
                                    </a>
                                ) : null}

                                {altCode ? (
                                    <a
                                        href={altCode}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="w-full sm:w-auto"
                                    >
                                        <NeoButton
                                            variant="secondary"
                                            className="w-full justify-center"
                                            as="span"
                                        >
                                            {altCodeLabel ?? "Second repo"}
                                        </NeoButton>
                                    </a>
                                ) : null}

                                {previewUrl ? (
                                    <a
                                        href={previewUrl}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="w-full sm:w-auto"
                                    >
                                        <NeoButton
                                            variant="base"
                                            className="w-full justify-center"
                                            as="span"
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
                                <NeoTabPanel
                                    tabId="preview"
                                    idPrefix={baseId}
                                    className="border-[3px] border-black bg-white shadow-neo overflow-hidden"
                                >
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
                                                rel="noreferrer noopener"
                                                className="font-mono text-[10px] underline hover:text-neo-primary whitespace-nowrap"
                                            >
                                                Open in new tab
                                            </a>
                                        ) : null}
                                    </div>

                                    {/* Preview area */}
                                    <div className="relative w-full bg-white">
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
                                </NeoTabPanel>
                            ) : (
                                <NeoTabPanel
                                    tabId="details"
                                    idPrefix={baseId}
                                    className="grid grid-cols-1 lg:grid-cols-5 gap-6"
                                >
                                    <div className="lg:col-span-3 border-[3px] border-black bg-white shadow-neo p-6">
                                        <h4 className="text-2xl md:text-3xl font-black uppercase mb-4">
                                            What it is
                                        </h4>
                                        <p className="font-bold text-sm md:text-base leading-relaxed border-l-4 border-black pl-4">
                                            {description}
                                        </p>

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

                                    <div className="lg:col-span-2 border-[3px] border-black bg-white shadow-neo overflow-hidden">
                                        <div className="bg-black text-white px-4 py-2 border-b-[3px] border-black">
                                            <span className="font-mono text-xs opacity-80">
                                                {imgSrc ? "SCREENSHOT" : arch ? "ARCHITECTURE" : "SCREENSHOT"}
                                            </span>
                                        </div>

                                        {imgSrc ? (
                                            <>
                                                <div className="relative w-full h-[260px] md:h-[340px]">
                                                    <Image
                                                        src={imgSrc}
                                                        alt={`${title} screenshot`}
                                                        fill
                                                        sizes="(min-width: 1024px) 40vw, 100vw"
                                                        className="object-cover"
                                                    />
                                                </div>
                                                {imgNote ? (
                                                    <p className="border-t-[3px] border-black px-4 py-2 font-mono text-[11px] leading-snug opacity-70">
                                                        {imgNote}
                                                    </p>
                                                ) : null}
                                            </>
                                        ) : arch ? (
                                            <div className="h-[260px] w-full md:h-[340px]">
                                                <ArchDiagram spec={arch} />
                                            </div>
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
                                </NeoTabPanel>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}
