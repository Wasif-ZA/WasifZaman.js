"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Github } from "lucide-react";
import NeoButton from "../components/NeoButton";
import ProjectCard from "../components/ProjectCard";
import {
  getSortedProjects,
  PROJECT_CATEGORIES,
  type Project,
  type ProjectCategory,
} from "../lib/projects";

type Filter = "All" | ProjectCategory;

interface WorkProps {
  githubUrl: string;
  onOpenProject: (project: Project) => void;
}

export default function Work({ githubUrl, onOpenProject }: WorkProps) {
  const [filter, setFilter] = useState<Filter>("All");

  const allProjects = useMemo(() => getSortedProjects(), []);
  const filtered = useMemo(
    () =>
      filter === "All"
        ? allProjects
        : allProjects.filter((p) => p.category === filter),
    [allProjects, filter]
  );

  return (
    <section
      id="work"
      className="relative overflow-hidden border-b-[4px] border-black bg-neo-bg py-20 md:py-28"
    >
      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-6xl font-black uppercase leading-[0.85] tracking-tighter md:text-8xl lg:text-9xl"
          >
            Selected
            <br />
            Work
          </motion.h2>

          <div className="flex items-start gap-3">
            <a href={githubUrl} target="_blank" rel="noreferrer" className="shrink-0">
              <NeoButton variant="secondary" type="button" className="flex items-center">
                <Github className="mr-2 h-5 w-5" /> All on GitHub
              </NeoButton>
            </a>
          </div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-wrap items-center gap-3 border-y-[3px] border-black bg-white px-4 py-3 shadow-neo-sm"
        >
          <span className="font-mono text-[10px] font-bold uppercase opacity-60">
            Filter:
          </span>
          {PROJECT_CATEGORIES.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`relative border-[3px] border-black px-3 py-1 font-mono text-xs font-bold uppercase transition-all active:translate-x-[2px] active:translate-y-[2px] ${
                  active
                    ? "bg-black text-neo-primary shadow-neo-sm"
                    : "bg-white text-black hover:bg-neo-bg"
                }`}
              >
                {cat}
                {active ? (
                  <motion.span
                    layoutId="filter-underline"
                    className="absolute -bottom-[7px] left-0 right-0 h-1 bg-neo-primary"
                  />
                ) : null}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-[10px] font-bold uppercase opacity-60">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </span>
        </motion.div>

        {/* Grid */}
        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            style={{ gridAutoFlow: "dense" }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  featured={project.featured}
                  onOpen={onOpenProject}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
