import React from "react";
import type { ArchSpec } from "../lib/data";

function Node({ label, lead }: { label: string; lead: boolean }) {
  return (
    <div
      className={`flex min-h-[40px] items-center justify-center border px-2 py-2 text-center font-mono text-[10px] font-bold uppercase leading-[1.15] tracking-[0.04em] ${
        lead
          ? "border-acid bg-acid text-black"
          : "border-[color:var(--line-strong)] bg-[color:var(--ink)] text-paper"
      }`}
    >
      <span className="block break-words">{label}</span>
    </div>
  );
}

/**
 * Drawn in place of a screenshot for projects with no interface, so a card
 * without a UI still carries the real pipeline instead of a stock image.
 */
export default function ArchDiagram({ spec }: { spec: ArchSpec }) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-2 bg-[color:var(--ink-sunken)] p-4">
      <div className="flex flex-1 items-stretch gap-1.5">
        {spec.stages.map((stage, i) => (
          <React.Fragment key={i}>
            {i > 0 && (
              <div
                aria-hidden
                className="flex w-2 shrink-0 items-center justify-center font-mono text-[10px] text-acid"
              >
                ▸
              </div>
            )}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
              {Array.isArray(stage) ? (
                stage.map((n) => <Node key={n} label={n} lead={false} />)
              ) : (
                <Node label={stage} lead={i === 0} />
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {spec.note && (
        <p className="shrink-0 border-t border-[color:var(--line)] pt-2 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
          {spec.note}
        </p>
      )}
    </div>
  );
}
