"use client";

import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";

interface FooterProps {
  email: string;
  github: string;
  linkedin: string;
}

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Footer({ email, github, linkedin }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t-[4px] border-black bg-neo-bg">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:items-center">
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-black uppercase underline decoration-4 underline-offset-4 hover:bg-neo-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <ul className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs font-bold uppercase">
            <li>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 border-2 border-black bg-white px-2 py-1 shadow-neo-sm hover:bg-black hover:text-neo-primary"
              >
                <Github className="h-3 w-3" /> GitHub
              </a>
            </li>
            <li>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 border-2 border-black bg-white px-2 py-1 shadow-neo-sm hover:bg-black hover:text-neo-primary"
              >
                <Linkedin className="h-3 w-3" /> LinkedIn
              </a>
            </li>
            <li>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1 border-2 border-black bg-white px-2 py-1 shadow-neo-sm hover:bg-black hover:text-neo-primary"
              >
                <Mail className="h-3 w-3" /> Email
              </a>
            </li>
          </ul>

          <div className="flex flex-wrap items-center justify-start gap-3 font-mono text-[10px] font-bold uppercase tracking-widest opacity-70 md:justify-end">
            <span>© {year} Wasif Zaman</span>
            <span aria-hidden>·</span>
            <span>Built with Next.js</span>
            <span aria-hidden>·</span>
            <span>Made in Sydney</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
