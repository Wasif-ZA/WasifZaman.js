"use client";

import React from "react";
import Marquee from "../components/Marquee";

export default function Now() {
  return (
    <section
      id="now"
      aria-label="What I'm working on now"
      className="border-b-[4px] border-black"
    >
      <div className="border-b-[3px] border-black bg-black py-2 text-center">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neo-primary">
          ● NOW · April 2026
        </span>
      </div>
      <Marquee
        text="SHIPPING KORVO • MULTI-AGENT DEV WORKFLOWS • HONOURS THESIS • SYDNEY • "
        duration={26}
        className="bg-neo-primary font-black text-black"
      />
    </section>
  );
}
