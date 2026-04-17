"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileDown } from "lucide-react";
import NeoButton from "../components/NeoButton";
import ScrollReveal from "../components/ScrollReveal";

interface ContactProps {
  email: string;
  linkedin: string;
  github: string;
  resume: string;
}

const buttonTilt = {
  whileHover: { rotate: -2, y: -4 },
  whileTap: { scale: 0.98, rotate: 0, y: 0 },
};

export default function Contact({ email, linkedin, github, resume }: ContactProps) {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-b-[4px] border-black bg-black py-24 text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <ScrollReveal>
          <span className="inline-block border-[3px] border-neo-primary bg-neo-primary px-2 py-1 font-mono text-xs font-bold uppercase text-black">
            Contact
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="mt-4 text-6xl font-black uppercase leading-[0.85] md:text-8xl lg:text-[10rem]">
            Let&apos;s build
            <br />
            <span className="text-stroke-white">something.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="mt-8 max-w-2xl text-lg font-bold opacity-80 md:text-xl">
            Graduate SWE roles, freelance front-end work, AI prototyping, or just to say hi —
            I read every message.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <motion.a href={`mailto:${email}`} {...buttonTilt} className="block">
            <NeoButton
              variant="primary"
              size="lg"
              type="button"
              className="flex w-full items-center justify-center"
            >
              <Mail className="mr-2 h-5 w-5" /> Email
            </NeoButton>
          </motion.a>
          <motion.a href={linkedin} target="_blank" rel="noreferrer" {...buttonTilt} className="block">
            <NeoButton
              variant="secondary"
              size="lg"
              type="button"
              className="flex w-full items-center justify-center"
            >
              <Linkedin className="mr-2 h-5 w-5" /> LinkedIn
            </NeoButton>
          </motion.a>
          <motion.a href={github} target="_blank" rel="noreferrer" {...buttonTilt} className="block">
            <NeoButton
              variant="accent"
              size="lg"
              type="button"
              className="flex w-full items-center justify-center"
            >
              <Github className="mr-2 h-5 w-5" /> GitHub
            </NeoButton>
          </motion.a>
          <motion.a href={resume} download {...buttonTilt} className="block">
            <NeoButton
              variant="base"
              size="lg"
              type="button"
              className="flex w-full items-center justify-center"
            >
              <FileDown className="mr-2 h-5 w-5" /> Résumé
            </NeoButton>
          </motion.a>
        </div>

        <ScrollReveal delay={0.25}>
          <div className="mt-16 flex flex-wrap items-center gap-4 border-t border-white/20 pt-8 font-mono text-xs font-bold uppercase">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-neo-primary" />
              Open to graduate SWE roles
            </span>
            <span className="opacity-40">·</span>
            <span>Reply within 24h</span>
            <span className="opacity-40">·</span>
            <span className="opacity-70">{email}</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
