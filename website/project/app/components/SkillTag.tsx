"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SkillTagProps {
  name: string;
  note: string;
}

export default function SkillTag({ name, note }: SkillTagProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onFocus={() => setFlipped(true)}
      onBlur={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
      className="relative overflow-hidden border-[3px] border-black bg-white px-3 py-2 font-mono text-xs font-bold uppercase shadow-neo-sm transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none hover:bg-neo-primary focus:outline-none focus:ring-2 focus:ring-neo-accent"
      aria-label={`${name} — ${note}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {flipped ? (
          <motion.span
            key="note"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.18 }}
            className="block whitespace-nowrap"
          >
            {note}
          </motion.span>
        ) : (
          <motion.span
            key="name"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.18 }}
            className="block whitespace-nowrap"
          >
            {name}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
