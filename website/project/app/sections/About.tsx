"use client";

import React from "react";
import { motion } from "framer-motion";
import NeoBrutalistShape from "../components/NeoBrutalistShape";
import SkillTag from "../components/SkillTag";
import ScrollReveal from "../components/ScrollReveal";
import { SKILLS } from "../lib/skills";

export default function About() {
  return (
    <section
      id="about"
      className="relative border-b-[4px] border-black bg-white py-20 md:py-28"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left — portrait / shape composition */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="relative h-[520px] border-[4px] border-black bg-neo-bg shadow-neo-lg">
                <div className="absolute inset-4 border-[3px] border-dashed border-black/40" />

                <motion.div
                  initial={{ rotate: -20, scale: 0.6, opacity: 0 }}
                  whileInView={{ rotate: -12, scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 90, damping: 16 }}
                  className="absolute left-10 top-10 h-48 w-48 md:h-64 md:w-64"
                >
                  <NeoBrutalistShape
                    type="square"
                    color="bg-neo-primary"
                    className="h-full w-full"
                  />
                </motion.div>
                <motion.div
                  initial={{ rotate: 20, scale: 0.6, opacity: 0 }}
                  whileInView={{ rotate: 8, scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.15 }}
                  className="absolute right-8 top-28 h-40 w-40 md:h-56 md:w-56"
                >
                  <NeoBrutalistShape
                    type="circle"
                    color="bg-neo-accent"
                    className="h-full w-full"
                  />
                </motion.div>
                <motion.div
                  initial={{ rotate: 35, scale: 0.6, opacity: 0 }}
                  whileInView={{ rotate: -6, scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 90, damping: 16, delay: 0.3 }}
                  className="absolute bottom-10 left-16 h-40 w-40 md:h-52 md:w-52"
                >
                  <NeoBrutalistShape
                    type="triangle"
                    color="bg-neo-secondary"
                    className="h-full w-full"
                  />
                </motion.div>

                <span className="absolute bottom-4 left-4 bg-black px-3 py-1 font-mono text-xs font-bold uppercase text-neo-primary">
                  WZ. / 2026
                </span>
                <span className="absolute right-4 top-4 border-2 border-black bg-white px-2 py-1 font-mono text-[10px] font-bold uppercase">
                  Signature composition
                </span>
              </div>
            </ScrollReveal>
          </div>

          {/* Right — copy */}
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.1}>
              <span className="inline-block border-[3px] border-black bg-neo-primary px-2 py-1 font-mono text-xs font-bold uppercase shadow-neo-sm">
                About
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h2 className="mt-4 text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl">
                Engineer.
                <br />
                <span className="text-stroke-black">Builder.</span>
                <br />
                Shipper.
              </h2>
            </ScrollReveal>

            <div className="mt-8 space-y-5 text-lg font-bold leading-snug md:text-xl">
              <ScrollReveal delay={0.2}>
                <p>
                  I&apos;m a Software Engineering (Honours) student at{" "}
                  <span className="bg-neo-primary px-1">Macquarie University</span>,
                  graduating <span className="underline decoration-4">June 2027</span>.
                  I ship fast, prototype often, and care about what actually ends up in a
                  user&apos;s hands.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.25}>
                <p>
                  Day job: <span className="bg-neo-secondary px-1 text-white">Hardware Deployment Technician at Lenovo</span>.
                  Night job: <span className="bg-neo-accent px-1 text-white">IT Director at UTSBDSOC</span>,
                  where I run the tech stack for ~300 members — voting system, event ops,
                  the website, all of it.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p>
                  Based in <span className="font-mono">Sydney</span>. Looking for a junior
                  or graduate SWE role where I can write code that matters and keep shipping
                  my own things on the side.
                </p>
              </ScrollReveal>
            </div>

            {/* Skills grid */}
            <ScrollReveal delay={0.35}>
              <div className="mt-10 border-t-[3px] border-black pt-8">
                <h3 className="mb-5 font-mono text-sm font-bold uppercase tracking-widest opacity-70">
                  // Skills · hover to read notes
                </h3>

                <div className="space-y-6">
                  {SKILLS.map((group) => (
                    <div key={group.label}>
                      <div className="mb-2 flex items-center gap-2">
                        <span className="h-2 w-2 bg-black" />
                        <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                          {group.label}
                        </span>
                        <span className="h-[2px] flex-1 bg-black/20" />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((s) => (
                          <SkillTag key={s.name} name={s.name} note={s.note} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
