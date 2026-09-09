"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LINKS } from "../lib/data";

const ROUTES = [
  { href: "/", label: "Engineer" },
  { href: "/studio", label: "Studio" },
];

export function Nav() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 py-4">
      <nav
        className={`pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 border px-3 py-2 transition-colors duration-300 ${
          solid
            ? "border-[color:var(--line)] bg-[color:var(--ink-raised)]/90 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="display shrink-0 px-2 text-lg tracking-tight text-paper">
          WZ
        </Link>

        {/* The switch is the whole navigation: two audiences, one control. */}
        <div className="flex items-center border border-[color:var(--line-strong)] p-0.5">
          {ROUTES.map((r) => {
            const active = pathname === r.href;
            return (
              <Link
                key={r.href}
                href={r.href}
                aria-current={active ? "page" : undefined}
                className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors sm:px-4 ${
                  active ? "bg-acid text-black" : "text-muted hover:text-paper"
                }`}
              >
                {r.label}
              </Link>
            );
          })}
        </div>

        <a
          href={`mailto:${LINKS.email}`}
          className="hidden shrink-0 px-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-acid sm:block"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}

export function Footer({ variant }: { variant: "engineer" | "studio" }) {
  const isStudio = variant === "studio";

  return (
    <footer className="relative overflow-hidden border-t border-[color:var(--line)] bg-ink-sunken px-6 py-24 md:py-32">
      <div className="mx-auto w-full max-w-6xl">
        <p className="mono-label mb-6">
          {isStudio ? "Start a build" : "Open to graduate and junior roles"}
        </p>

        <h2 className="display max-w-5xl text-[clamp(2.5rem,9vw,7rem)] text-paper">
          {isStudio ? (
            <>
              Let&apos;s get you
              <br />
              <span className="text-acid">online</span>
            </>
          ) : (
            <>
              Let&apos;s build
              <br />
              <span className="text-acid">something</span>
            </>
          )}
        </h2>

        <div className="mt-14 flex flex-wrap gap-4">
          <a
            href={`mailto:${LINKS.email}`}
            className="border border-paper bg-paper px-7 py-4 font-mono text-xs uppercase tracking-[0.14em] text-black transition-transform hover:-translate-y-1"
          >
            {LINKS.email}
          </a>
          {!isStudio && (
            <a
              href={LINKS.resume}
              download
              className="border border-[color:var(--line-strong)] px-7 py-4 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:border-acid hover:text-acid"
            >
              Download CV
            </a>
          )}
          <a
            href={LINKS.github}
            target="_blank"
            rel="noreferrer noopener"
            className="border border-[color:var(--line-strong)] px-7 py-4 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:border-acid hover:text-acid"
          >
            GitHub
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="border border-[color:var(--line-strong)] px-7 py-4 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:border-acid hover:text-acid"
          >
            LinkedIn
          </a>
        </div>

        <div className="rule mt-20 flex flex-wrap items-center justify-between gap-4 pt-8">
          <span className="font-mono text-[11px] text-faint">
            © {new Date().getFullYear()} Wasif Zaman — Sydney
          </span>
          <Link
            href={isStudio ? "/" : "/studio"}
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-acid"
          >
            {isStudio ? "See the engineering work →" : "Need a website or clips? →"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
