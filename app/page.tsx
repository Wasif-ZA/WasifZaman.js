import Image from "next/image";
import { Nav, Footer } from "./components/Shell";
import { ScrubText, ScaleFade, Rise, PinnedSplit } from "./components/Motion";
import ArchDiagram from "./components/ArchDiagram";
import {
  LINKS, HERO_PROOF, TOOLBOX, PROJECTS, EXPERIENCE, EDUCATION, CERTIFICATES,
} from "./lib/data";

/** Bento weights, interlocked so the 6-column grid never leaves a void. */
const SPAN: Record<string, string> = {
  lead: "md:col-span-4 md:row-span-2",
  tall: "md:col-span-2 md:row-span-2",
  normal: "md:col-span-2",
};

export default function EngineerPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden">
      <Nav />

      {/* Attention */}
      <section className="ambient relative flex min-h-svh flex-col justify-center overflow-hidden px-6 pb-20 pt-32">
        {/* Brand art. Generated for this site, not a stock photo, and masked so
            it never competes with the type. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <Image
            src="/brand/hero-field.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-bottom opacity-100"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--ink)_0%,rgba(11,11,13,0.72)_38%,rgba(11,11,13,0.42)_62%,var(--ink)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
          <p className="mono-label mb-8">Sydney, Australia</p>

          <h1 className="display mx-auto max-w-6xl text-[clamp(2.75rem,7vw,6.5rem)] text-paper">
            Wasif Zaman
            <br />
            <span className="text-acid">Software Engineer</span>
          </h1>

          <p className="mx-auto mt-10 max-w-2xl text-balance text-lg leading-relaxed text-muted md:text-xl">
            Honours student at Macquarie, graduating 2027. Building the report pipeline
            at ACU&apos;s Institute for Positive Psychology and Education.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer noopener"
              className="border border-acid bg-acid px-8 py-4 font-mono text-xs uppercase tracking-[0.14em] text-black shadow-[6px_6px_0px_0px_rgba(244,241,234,1)] transition-transform hover:-translate-y-1"
            >
              View the code
            </a>
            <a
              href={LINKS.resume}
              download
              className="border border-[color:var(--line-strong)] px-8 py-4 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:border-acid hover:text-acid"
            >
              Download CV
            </a>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 flex justify-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-faint">
            Scroll
          </span>
        </div>
      </section>

      {/* Proof strip, kept out of the hero so the hero stays clean */}
      <section className="rule border-b border-[color:var(--line)] px-6 py-10">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-6 lg:grid-cols-4">
          {HERO_PROOF.map((p) => (
            <div key={p} className="font-mono text-[11px] uppercase leading-relaxed tracking-[0.08em] text-muted">
              {p}
            </div>
          ))}
        </div>
      </section>

      {/* Interest: the statement, scrubbed */}
      <section className="px-6 py-32 md:py-48">
        <div className="mx-auto w-full max-w-5xl">
          <ScrubText
            as="h2"
            className="display text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.08] text-paper"
            text="I build the part that has to be right when nobody is watching. Solvers, pipelines and control loops, checked against a contract rather than a conversation."
          />
        </div>
      </section>

      {/* Interest: gapless bento */}
      <section id="work" className="px-6 pb-32 md:pb-48">
        <div className="mx-auto w-full max-w-6xl">
          <Rise className="mb-14 flex items-end justify-between gap-6">
            <h2 className="display text-[clamp(2.2rem,6vw,4.5rem)] text-paper">
              Selected work
            </h2>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer noopener"
              className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-acid"
            >
              All repos →
            </a>
          </Rise>

          <div className="grid auto-rows-[minmax(190px,auto)] grid-flow-dense grid-cols-1 gap-4 md:grid-cols-6">
            {PROJECTS.map((p) => (
              <article
                key={p.title}
                className={`${SPAN[p.weight ?? "normal"]} group relative flex flex-col overflow-hidden border border-[color:var(--line)] bg-ink-raised transition-colors hover:border-[color:var(--line-strong)]`}
              >
                {(p.imgSrc || p.arch) && (
                  <div className="relative min-h-[170px] flex-1 overflow-hidden border-b border-[color:var(--line)]">
                    {p.imgSrc ? (
                      <Image
                        src={p.imgSrc}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover object-left-top opacity-80 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                      />
                    ) : (
                      p.arch && <ArchDiagram spec={p.arch} />
                    )}
                  </div>
                )}

                <div className="flex flex-col gap-3 p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="display text-2xl text-paper">{p.title}</h3>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
                      {p.tech[0]}
                    </span>
                  </div>

                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-acid">
                    {p.blurb}
                  </p>

                  <p className="text-sm leading-relaxed text-muted">{p.description}</p>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.projectLink && (
                      <a
                        href={p.projectLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="border border-acid px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-acid transition-colors hover:bg-acid hover:text-black"
                      >
                        Live
                      </a>
                    )}
                    {p.code && (
                      <a
                        href={p.code}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="border border-[color:var(--line-strong)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper transition-colors hover:border-acid hover:text-acid"
                      >
                        Code
                      </a>
                    )}
                    {p.altCode && (
                      <a
                        href={p.altCode}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="border border-[color:var(--line-strong)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-paper transition-colors hover:border-acid hover:text-acid"
                      >
                        {p.altCodeLabel}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Desire: pinned split */}
      <section id="history" className="rule px-6 py-32 md:py-48">
        <div className="mx-auto w-full max-w-6xl">
          <PinnedSplit
            aside={
              <div>
                <h2 className="display text-[clamp(2.2rem,5vw,3.8rem)] text-paper">
                  Where
                  <br />
                  I&apos;ve
                  <br />
                  <span className="text-acid">worked</span>
                </h2>
                <p className="mono-label mt-6">Four roles, two current</p>
              </div>
            }
          >
            <div className="flex flex-col">
              {EXPERIENCE.map((e) => (
                <ScaleFade key={e.company} className="border-t border-[color:var(--line)] py-10 first:border-t-0 first:pt-0">
                  <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="display text-2xl text-paper md:text-3xl">{e.company}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                      {e.period}
                    </span>
                  </div>

                  <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.1em] text-acid">
                    {e.role}
                  </p>
                  <p className="mb-5 font-mono text-[11px] text-faint">{e.location}</p>

                  <ul className="mb-5 flex flex-col gap-3">
                    {e.points.map((pt, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-acid" />
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <span
                        key={s}
                        className="border border-[color:var(--line)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-faint"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </ScaleFade>
              ))}
            </div>
          </PinnedSplit>
        </div>
      </section>

      {/* Toolbox + education */}
      <section className="rule px-6 py-32 md:py-40">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mono-label mb-8">What I reach for</p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {TOOLBOX.map((t) => (
                <span key={t} className="display text-xl text-muted transition-colors hover:text-acid md:text-3xl">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <p className="mono-label mb-8">Education</p>
            <h3 className="display text-2xl text-paper md:text-3xl">{EDUCATION.institution}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{EDUCATION.degree}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-acid">
              {EDUCATION.period} · {EDUCATION.detail}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {EDUCATION.coursework.map((c) => (
                <span
                  key={c}
                  className="border border-[color:var(--line)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-faint"
                >
                  {c}
                </span>
              ))}
            </div>

            <p className="mono-label mb-4 mt-12">Certifications</p>
            <ul className="flex flex-col gap-2">
              {CERTIFICATES.map((c) => (
                <li key={c.name} className="text-sm text-muted">
                  {c.name}
                  <span className="text-faint"> — {c.issuer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer variant="engineer" />
    </main>
  );
}
