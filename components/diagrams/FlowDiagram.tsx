import type { FlowNode } from "@/lib/projects";

/**
 * Top-to-bottom system flow. A plain step is one box; an array renders as parallel
 * inputs on one row. The final step is the output and carries the accent.
 */
export function FlowDiagram({ flow, label, size = "md" }: { flow: FlowNode[]; label?: string; size?: "md" | "lg" }) {
  const big = size === "lg";
  return (
    <figure className="w-full">
      {label && <figcaption className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim">{label}</figcaption>}
      <ol className="flex flex-col" aria-label={label ?? "System flow"}>
        {flow.map((node, i) => {
          const last = i === flow.length - 1;
          return (
            <li key={i} className="flex flex-col">
              {i > 0 && <span aria-hidden className="flow-link" />}
              {Array.isArray(node) ? (
                <div className="flex flex-wrap gap-1.5">
                  {node.map((s) => (
                    <span key={s.t} className={`rounded-md border border-dashed border-line-2 bg-bg-2 px-2.5 py-1.5 font-mono text-mute ${big ? "text-[0.8rem]" : "text-[0.7rem]"}`}>
                      {s.t}
                    </span>
                  ))}
                </div>
              ) : (
                <div
                  className={`flex items-start gap-3 rounded-lg border px-3.5 ${big ? "py-3" : "py-2.5"} ${
                    last ? "border-accent/45 bg-accent/[0.08]" : "border-line-2 bg-surface"
                  }`}
                >
                  <span aria-hidden className={`mt-[0.45rem] h-[7px] w-[7px] flex-none rounded-full border-[1.5px] ${last ? "border-accent bg-accent" : "border-dim"}`} />
                  <span className="min-w-0">
                    <span className={`block font-medium ${last ? "text-ink" : "text-ink-2"} ${big ? "text-[0.98rem]" : "text-[0.86rem]"}`}>{node.t}</span>
                    {node.d && <span className={`block font-mono text-dim ${big ? "text-[0.76rem]" : "text-[0.6875rem]"}`}>{node.d}</span>}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
