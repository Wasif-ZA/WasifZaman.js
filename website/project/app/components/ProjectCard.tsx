"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import type { Project } from "../lib/projects";
import NeoBrutalistShape from "./NeoBrutalistShape";

const ACCENT_BG: Record<Project["accent"], string> = {
  primary: "bg-neo-primary",
  secondary: "bg-neo-secondary",
  accent: "bg-neo-accent",
};

const STATUS_STYLES: Record<Project["status"], string> = {
  shipped: "bg-green-400 text-black",
  "in-progress": "bg-neo-primary text-black",
  archived: "bg-gray-200 text-black",
};

const STATUS_LABEL: Record<Project["status"], string> = {
  shipped: "Shipped",
  "in-progress": "In progress",
  archived: "Archived",
};

const SHAPES: Project["accent"][] = ["primary", "secondary", "accent"];
const CORNER_SHAPES = ["circle", "triangle", "square"] as const;

function shapeFor(project: Project) {
  const i = project.slug.charCodeAt(0) % CORNER_SHAPES.length;
  return CORNER_SHAPES[i];
}

export interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onOpen: (project: Project) => void;
  index: number;
}

export default function ProjectCard({
  project,
  featured,
  onOpen,
  index,
}: ProjectCardProps) {
  const shape = shapeFor(project);
  const accentBg = ACCENT_BG[project.accent];
  const isPrivate = project.access === "private";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ type: "spring", stiffness: 120, damping: 18, delay: index * 0.05 }}
      className={`group relative flex flex-col border-[4px] border-black bg-white shadow-neo transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-neo-lg ${
        featured ? "lg:col-span-2" : ""
      }`}
    >
      {/* Top status bar */}
      <div className="flex items-center justify-between border-b-[3px] border-black bg-black px-4 py-2 text-xs font-mono font-bold uppercase text-white">
        <span className="flex items-center gap-2">
          <span className={`inline-block h-2 w-2 ${accentBg}`} />
          {project.category}
        </span>
        <span className="flex items-center gap-2">
          <span className="opacity-60">{project.year}</span>
          <span className={`${STATUS_STYLES[project.status]} border border-white/20 px-2 py-[2px]`}>
            {STATUS_LABEL[project.status]}
          </span>
        </span>
      </div>

      {/* Image / placeholder */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="relative block overflow-hidden border-b-[3px] border-black bg-neo-bg text-left"
        aria-label={`Open ${project.title}`}
      >
        {project.imgSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imgSrc}
            alt={`${project.title} cover`}
            className={`h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] md:h-56 ${
              featured ? "lg:h-64" : ""
            }`}
            loading="lazy"
          />
        ) : (
          <div
            className={`flex h-48 w-full items-center justify-center md:h-56 ${
              featured ? "lg:h-64" : ""
            } ${accentBg}`}
          >
            <span className="rotate-[-6deg] text-4xl font-black uppercase opacity-70">
              {project.title}
            </span>
          </div>
        )}

        {isPrivate ? (
          <span className="absolute left-3 top-3 flex items-center gap-1 bg-black px-2 py-1 font-mono text-[10px] font-bold uppercase text-white">
            <Lock className="h-3 w-3" /> Private
          </span>
        ) : null}
      </button>

      {/* Body */}
      <div className="relative flex flex-1 flex-col p-6">
        <div className="absolute -right-3 -top-3 h-16 w-16 opacity-90">
          <NeoBrutalistShape
            type={shape}
            color={accentBg}
            className="h-full w-full"
            rotation={(index * 17) % 45}
          />
        </div>

        <h3
          className={`mb-1 font-black uppercase leading-none tracking-tight ${
            featured ? "text-4xl md:text-5xl" : "text-3xl"
          }`}
        >
          {project.title}
        </h3>
        <p className="mb-4 font-mono text-sm font-bold uppercase opacity-70">
          {project.tagline}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.tech.slice(0, featured ? 8 : 5).map((t) => (
            <span
              key={t}
              className="border-2 border-black bg-white px-2 py-1 font-mono text-[10px] font-bold uppercase"
            >
              {t}
            </span>
          ))}
          {project.tech.length > (featured ? 8 : 5) ? (
            <span className="border-2 border-dashed border-black/60 bg-white px-2 py-1 font-mono text-[10px] font-bold uppercase opacity-60">
              +{project.tech.length - (featured ? 8 : 5)}
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => onOpen(project)}
          className="mt-auto flex items-center justify-between border-[3px] border-black bg-white px-4 py-3 font-black uppercase shadow-neo-sm transition-all hover:bg-neo-primary active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <span>{isPrivate ? "Request access" : "Open details"}</span>
          <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
        </button>
      </div>
    </motion.article>
  );
}

export { ACCENT_BG, SHAPES };
