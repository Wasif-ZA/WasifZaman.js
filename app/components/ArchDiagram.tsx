import React from "react";

type ArchStage = string | string[];

export type ArchSpec = {
  stages: ArchStage[];
  note?: string;
};

// Text colour travels with the fill: black on #0000FF is 2.44:1 and fails AA,
// white on it is 8.59:1. The reverse holds for the acid green.
const PALETTE = [
  "bg-neo-primary text-black",
  "bg-neo-secondary text-black",
  "bg-neo-accent text-white",
  "bg-white text-black",
];

function Node({ label, tone }: { label: string; tone: string }) {
  return (
    <div
      className={`${tone} flex min-h-[42px] items-center justify-center border-[3px] border-black px-1.5 py-2 text-center font-mono text-[11px] font-black uppercase leading-[1.15] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}
    >
      <span className="block break-words hyphens-auto">{label}</span>
    </div>
  );
}

/**
 * Drawn in place of a screenshot for projects with no user interface. Shows the
 * real pipeline rather than a stock image, so a card without a UI still carries
 * technical information.
 */
export default function ArchDiagram({ spec }: { spec: ArchSpec }) {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-1.5 bg-neo-bg p-3">
      <div className="flex flex-1 items-stretch gap-1.5">
        {spec.stages.map((stage, i) => {
          const tone = PALETTE[i % PALETTE.length];
          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <div
                  aria-hidden
                  className="flex w-2 shrink-0 items-center justify-center font-mono text-[10px] font-black text-black/40"
                >
                  ▸
                </div>
              )}
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
                {Array.isArray(stage) ? (
                  stage.map((n) => <Node key={n} label={n} tone={tone} />)
                ) : (
                  <Node label={stage} tone={tone} />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {spec.note && (
        <p className="shrink-0 border-t-2 border-black/15 pt-1.5 text-center font-mono text-[9px] font-bold uppercase tracking-wide text-black/55">
          {spec.note}
        </p>
      )}
    </div>
  );
}
