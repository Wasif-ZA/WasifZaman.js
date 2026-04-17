"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AppSplash() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const done = () => setShow(false);
    if (document.readyState === "complete") {
      const t = setTimeout(done, 300);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", done);
    const fallback = setTimeout(done, 1500);
    return () => {
      window.removeEventListener("load", done);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-neo-bg"
        >
          <div className="relative flex flex-col items-center gap-4">
            <motion.div
              initial={{ scale: 0.8, rotate: -6 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 14 }}
              className="border-[4px] border-black bg-neo-primary px-6 py-3 shadow-neo"
            >
              <span className="font-black uppercase tracking-tight text-2xl md:text-4xl">
                WZ.
              </span>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 140 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-1 border-[2px] border-black bg-black"
            />
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest opacity-60">
              Booting portfolio…
            </span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
