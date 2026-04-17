"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

import Navbar from "./components/navbar";
import { ProjectModal } from "./components/ProjectModal";
import AppSplash from "./components/AppSplash";

import Hero from "./sections/Hero";
import Work from "./sections/Work";
import Now from "./sections/Now";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

import type { Project } from "./lib/projects";

const LINKS = {
  email: "wasif.zaman1@gmail.com",
  github: "https://github.com/Wasif-ZA",
  linkedin: "https://www.linkedin.com/in/wasif-zaman-4228b5245/",
  resume: "/resume.pdf",
};

type ModalProject = {
  title: string;
  tech: string[];
  description: string;
  imgSrc?: string;
  projectLink?: string;
  code?: string;
  previewUrl?: string;
  previewMode?: "iframe" | "stackblitz" | "none";
};

function resolvePreview(project: Project): string | undefined {
  if (project.links.preview) return project.links.preview;
  if (project.links.live) return project.links.live;
  return undefined;
}

function toModalProject(project: Project): ModalProject {
  return {
    title: project.title,
    tech: project.tech,
    description: project.description,
    imgSrc: project.imgSrc,
    projectLink: project.links.live,
    code: project.links.repo,
    previewUrl: resolvePreview(project),
  };
}

export default function Home() {
  const [active, setActive] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const openProject = useCallback((project: Project) => {
    setActive(project);
    setModalOpen(true);
  }, []);

  const closeProject = useCallback(() => {
    setModalOpen(false);
    setTimeout(() => setActive(null), 180);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  const modalProject = active ? toModalProject(active) : null;

  return (
    <main className="min-h-screen bg-neo-bg text-neo-text overflow-x-hidden selection:bg-black selection:text-white">
      <AppSplash />
      <Navbar />

      <motion.div
        aria-hidden
        className="fixed top-0 left-0 right-0 z-[90] h-2 origin-left border-b-2 border-black bg-neo-primary"
        style={{ scaleX }}
      />

      <Hero email={LINKS.email} resumeHref={LINKS.resume} />
      <Now />
      <Work githubUrl={LINKS.github} onOpenProject={openProject} />
      <About />
      <Contact
        email={LINKS.email}
        linkedin={LINKS.linkedin}
        github={LINKS.github}
        resume={LINKS.resume}
      />
      <Footer
        email={LINKS.email}
        github={LINKS.github}
        linkedin={LINKS.linkedin}
      />

      <AnimatePresence>
        {modalProject ? (
          <ProjectModal
            isOpen={modalOpen}
            setIsOpen={(open) => (open ? setModalOpen(true) : closeProject())}
            {...modalProject}
          />
        ) : null}
      </AnimatePresence>
    </main>
  );
}
