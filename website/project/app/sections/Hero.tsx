"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, Download, Mail, ChevronDown } from "lucide-react";
import NeoButton from "../components/NeoButton";
import NeoBrutalistShape from "../components/NeoBrutalistShape";

interface HeroProps {
  email: string;
  resumeHref: string;
}

const wordStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const wordIn: Variants = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 140, damping: 16 },
  },
};

export default function Hero({ email, resumeHref }: HeroProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden border-b-[4px] border-black bg-white/70 pt-28"
    >
      {/* Decorative shapes */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.2 }}
        className="pointer-events-none absolute right-[-4%] top-20 z-0 h-40 w-40 md:h-56 md:w-56"
      >
        <NeoBrutalistShape
          type="circle"
          color="bg-neo-primary"
          className="h-full w-full"
          rotation={12}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: 45 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.35 }}
        className="pointer-events-none absolute bottom-24 left-[-2%] z-0 h-32 w-32 md:h-44 md:w-44"
      >
        <NeoBrutalistShape
          type="triangle"
          color="bg-neo-accent"
          className="h-full w-full"
          rotation={-8}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.5 }}
        className="pointer-events-none absolute right-[8%] bottom-40 z-0 h-24 w-24 md:h-32 md:w-32"
      >
        <NeoBrutalistShape
          type="square"
          color="bg-neo-secondary"
          className="h-full w-full"
          rotation={-14}
        />
      </motion.div>

      <div className="container relative z-10 mx-auto flex flex-1 flex-col justify-center px-4 pb-16 pt-10">
        {/* Available badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 inline-flex w-fit -rotate-1 items-center gap-2 border-[3px] border-black bg-black px-3 py-1 font-mono text-xs font-bold uppercase text-neo-primary shadow-neo-sm"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-neo-primary" />
          Open to graduate SWE roles · Sydney
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={wordStagger}
          initial="hidden"
          animate="visible"
          className="font-black uppercase leading-[0.82] tracking-tight"
        >
          <motion.span
            variants={wordIn}
            className="block text-[18vw] md:text-[12rem] xl:text-[14rem]"
          >
            Build
          </motion.span>
          <motion.span
            variants={wordIn}
            className="block text-[18vw] md:text-[12rem] xl:text-[14rem] text-stroke-black"
          >
            Ship
          </motion.span>
          <motion.span
            variants={wordIn}
            className="block text-[18vw] md:text-[12rem] xl:text-[14rem]"
          >
            <span className="bg-neo-primary px-3 py-1 md:px-6">Repeat.</span>
          </motion.span>
        </motion.h1>

        {/* Status tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 max-w-2xl border-l-[6px] border-black bg-white/70 pl-4 text-lg font-bold leading-snug md:text-2xl"
        >
          I&apos;m <span className="bg-black px-1 text-white">Wasif Zaman</span> — software
          engineer shipping AI products out of Sydney. Currently building{" "}
          <span className="bg-neo-accent px-1 text-white">Korvo</span>, an AI job-outreach
          SaaS, while finishing my Honours at Macquarie.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 flex flex-col flex-wrap gap-3 sm:flex-row"
        >
          <motion.div whileHover={{ rotate: -1 }} whileTap={{ scale: 0.98 }}>
            <NeoButton
              variant="primary"
              size="lg"
              type="button"
              onClick={() => scrollTo("work")}
              className="flex items-center"
            >
              See work <ArrowRight className="ml-2 h-5 w-5" />
            </NeoButton>
          </motion.div>
          <motion.a
            href={`mailto:${email}`}
            whileHover={{ rotate: 1 }}
            whileTap={{ scale: 0.98 }}
          >
            <NeoButton variant="accent" size="lg" type="button" className="flex items-center">
              <Mail className="mr-2 h-5 w-5" /> Get in touch
            </NeoButton>
          </motion.a>
          <motion.a href={resumeHref} download whileHover={{ rotate: -1 }} whileTap={{ scale: 0.98 }}>
            <NeoButton variant="base" size="lg" type="button" className="flex items-center">
              <Download className="mr-2 h-5 w-5" /> Résumé
            </NeoButton>
          </motion.a>
        </motion.div>

        {/* Meta strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-widest"
        >
          <span className="border border-black bg-white px-2 py-1">Sydney, AU</span>
          <span aria-hidden>·</span>
          <span className="border border-black bg-white px-2 py-1">IT Director @ UTSBDSOC</span>
          <span aria-hidden>·</span>
          <span className="border border-black bg-white px-2 py-1">Hardware @ Lenovo</span>
          <span aria-hidden>·</span>
          <span className="border border-black bg-neo-primary px-2 py-1">Grad 2027 · Available</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollTo("work")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="relative z-10 mx-auto mb-6 flex flex-col items-center gap-2 font-mono text-xs font-bold uppercase"
        aria-label="Scroll to work"
      >
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="flex h-8 w-8 items-center justify-center border-[3px] border-black bg-white shadow-neo-sm"
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </motion.button>
    </section>
  );
}
