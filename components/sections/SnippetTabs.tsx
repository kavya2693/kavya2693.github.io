"use client";
import { useState } from "react";

export type RenderedSnippet = { id: string; title: string; why: string; repo: string; path: string; url: string; html: string };

/** Tabbed viewer for pre-highlighted code. Arrow keys move between tabs. */
export function SnippetTabs({ items }: { items: RenderedSnippet[] }) {
  const [i, setI] = useState(0);
  const s = items[i];
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setI((i + 1) % items.length);
    if (e.key === "ArrowLeft") setI((i - 1 + items.length) % items.length);
  };
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-[#0d1117]">
      <div role="tablist" aria-label="Code excerpts" onKeyDown={onKey} className="flex gap-1 overflow-x-auto border-b border-line bg-surface px-2 pt-2">
        {items.map((it, k) => (
          <button
            key={it.id}
            role="tab"
            id={`tab-${it.id}`}
            aria-selected={k === i}
            aria-controls={`panel-${it.id}`}
            tabIndex={k === i ? 0 : -1}
            onClick={() => setI(k)}
            className={`min-h-10 shrink-0 rounded-t-lg border-x border-t px-3.5 font-mono text-[0.72rem] transition-colors ${
              k === i ? "border-line bg-[#0d1117] text-ink" : "border-transparent text-dim hover:text-ink-2"
            }`}
          >
            {it.title}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${s.id}`} aria-labelledby={`tab-${s.id}`}>
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line/60 px-5 py-3">
          <p className="text-[0.88rem] text-ink-2">{s.why}</p>
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[0.7rem] text-accent hover:underline">
            {s.repo}/{s.path} ↗
          </a>
        </div>
        <div className="code-block max-h-[420px] overflow-auto" dangerouslySetInnerHTML={{ __html: s.html }} />
      </div>
    </div>
  );
}
