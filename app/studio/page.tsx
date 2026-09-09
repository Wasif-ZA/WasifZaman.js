import type { Metadata } from "next";
import Image from "next/image";
import { Nav, Footer } from "../components/Shell";
import { ScrubText, ScaleFade, Rise, PinnedSplit } from "../components/Motion";
import { LINKS, SERVICES, WEEK, STUDIO_TERMS } from "../lib/data";
import { SITE_URL } from "../lib/site";

export const metadata: Metadata = {
  title: "Studio — Websites and Clips | Wasif Zaman",
  description:
    "Website in a Week: A$990 one-off, full handover, live in five working days. Plus stream clipping for creators publishing long-form. Sydney.",
  alternates: { canonical: `${SITE_URL}/studio` },
};

export default function StudioPage() {
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
            className="scale-x-[-1] object-cover object-bottom opacity-100"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--ink)_0%,rgba(11,11,13,0.72)_38%,rgba(11,11,13,0.42)_62%,var(--ink)_100%)]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl text-center">
          <p className="mono-label mb-8">Sydney · Websites and video</p>

          <h1 className="display mx-auto max-w-6xl text-[clamp(2.75rem,7vw,6.5rem)] text-paper">
            You already have
            <br />
            the <span className="text-acid">customers</span>
          </h1>

          <p className="mx-auto mt-10 max-w-2xl text-balance text-lg leading-relaxed text-muted md:text-xl">
            Good reviews, steady traffic, and nothing online to catch it. I build the
            page that turns that into calls, in five working days.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href="#packages"
              className="border border-acid bg-acid px-8 py-4 font-mono text-xs uppercase tracking-[0.14em] text-black shadow-[6px_6px_0px_0px_rgba(244,241,234,1)] transition-transform hover:-translate-y-1"
            >
              See packages
            </a>
            <a
              href={`mailto:${LINKS.email}?subject=Website%20enquiry`}
              className="border border-[color:var(--line-strong)] px-8 py-4 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:border-acid hover:text-acid"
            >
              Start a build
            </a>
          </div>
        </div>
      </section>

      {/* Terms strip: the objections, answered before they are asked */}
      <section className="rule border-b border-[color:var(--line)] px-6 py-10">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-8 lg:grid-cols-4">
          {STUDIO_TERMS.map((t) => (
            <div key={t.label}>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-acid">
                {t.label}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interest */}
      <section className="px-6 py-32 md:py-48">
        <div className="mx-auto w-full max-w-5xl">
          <ScrubText
            as="h2"
            className="display text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.08] text-paper"
            text="Most of the businesses I build for are already busy. The site is not there to impress anyone. It is there so the person who searched your name at nine at night can find your hours and call you."
          />
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="px-6 pb-32 md:pb-48">
        <div className="mx-auto w-full max-w-6xl">
          <Rise className="mb-14">
            <h2 className="display text-[clamp(2.2rem,6vw,4.5rem)] text-paper">
              What I build
            </h2>
          </Rise>

          <div className="grid grid-flow-dense grid-cols-1 gap-4 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article
                key={s.name}
                className={`flex flex-col border p-8 transition-colors ${
                  s.featured
                    ? "border-acid bg-ink-raised shadow-[6px_6px_0px_0px_var(--acid)] lg:p-10"
                    : "border-[color:var(--line)] bg-ink-raised hover:border-[color:var(--line-strong)]"
                }`}
              >
                <h3 className="display text-2xl text-paper md:text-3xl">{s.name}</h3>

                <div className="mt-5 flex items-baseline gap-3">
                  <span className={`display text-4xl md:text-5xl ${s.featured ? "text-acid" : "text-paper"}`}>
                    {s.price}
                  </span>
                </div>
                {s.priceNote && (
                  <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
                    {s.priceNote}
                  </p>
                )}

                <p className="mt-6 text-sm leading-relaxed text-muted">{s.outcome}</p>

                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {s.includes.map((i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted">
                      <span aria-hidden className="mt-2 h-px w-3 shrink-0 bg-acid" />
                      {i}
                    </li>
                  ))}
                </ul>

                <a
                  href={`mailto:${LINKS.email}?subject=${encodeURIComponent(s.name + " enquiry")}`}
                  className={`mt-10 border px-6 py-3.5 text-center font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    s.featured
                      ? "border-acid bg-acid text-black hover:bg-transparent hover:text-acid"
                      : "border-[color:var(--line-strong)] text-paper hover:border-acid hover:text-acid"
                  }`}
                >
                  {s.price === "Quoted" ? "Get a quote" : "Start this build"}
                </a>
              </article>
            ))}
          </div>

          <p className="mt-8 font-mono text-[11px] leading-relaxed text-faint">
            Payment is 50% to start and 50% before handover, both by Stripe link. Small
            edits after handover are priced per job, from A$60. Optional hosting is
            A$149/yr and buys uptime, not a retainer.
          </p>
        </div>
      </section>

      {/* Desire: the week, pinned */}
      <section className="rule px-6 py-32 md:py-48">
        <div className="mx-auto w-full max-w-6xl">
          <PinnedSplit
            aside={
              <div>
                <h2 className="display text-[clamp(2.2rem,5vw,3.8rem)] text-paper">
                  Live in
                  <br />
                  <span className="text-acid">five days</span>
                </h2>
                <p className="mono-label mt-6">Deposit Monday, yours Friday</p>
              </div>
            }
          >
            <div className="flex flex-col">
              {WEEK.map((d) => (
                <ScaleFade
                  key={d.day}
                  className="flex items-baseline gap-6 border-t border-[color:var(--line)] py-8 first:border-t-0 first:pt-0 md:gap-12"
                >
                  <span className="display w-14 shrink-0 text-3xl text-acid md:w-20 md:text-5xl">
                    {d.day}
                  </span>
                  <span className="text-base leading-relaxed text-muted md:text-xl">
                    {d.work}
                  </span>
                </ScaleFade>
              ))}
            </div>
          </PinnedSplit>
        </div>
      </section>

      {/* Proof: real work only */}
      <section className="rule px-6 py-32 md:py-40">
        <div className="mx-auto w-full max-w-6xl">
          <Rise className="mb-12">
            <h2 className="display text-[clamp(2rem,5vw,3.6rem)] text-paper">
              Recent build
            </h2>
          </Rise>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <ScaleFade className="lg:col-span-7">
              <a
                href="https://utbdsoc-website.vercel.app/home"
                target="_blank"
                rel="noreferrer noopener"
                className="group relative block aspect-[16/10] overflow-hidden border border-[color:var(--line)]"
              >
                <Image
                  src="/projects/utsbdsoc.jpg"
                  alt="The UTSBDSOC website, built and maintained by Wasif Zaman"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </a>
            </ScaleFade>

            <div className="lg:col-span-5 lg:pt-6">
              <h3 className="display text-3xl text-paper md:text-4xl">UTSBDSOC</h3>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.1em] text-acid">
                Society site and awards voting platform
              </p>
              <p className="mt-6 text-base leading-relaxed text-muted">
                A live site serving roughly 300 members, plus the Graamys awards platform
                shipped end to end in a two-week sprint: nine categories, duplicate-vote
                prevention, and an audit trail the committee reviews each cycle. A headless
                CMS lets non-technical members publish without calling a developer.
              </p>
              <a
                href="https://utbdsoc-website.vercel.app/home"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-8 inline-block border border-acid px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-acid transition-colors hover:bg-acid hover:text-black"
              >
                Visit the site
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer variant="studio" />
    </main>
  );
}
