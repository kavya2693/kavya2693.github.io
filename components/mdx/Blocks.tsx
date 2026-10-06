import { FlowDiagram } from "@/components/diagrams/FlowDiagram";
import type { FlowNode } from "@/lib/projects";

/** One numbered case-study section: label column on the left, prose on the right. */
export function S({ n, t, children }: { n: string; t: string; children: React.ReactNode }) {
  return (
    <section id={t.toLowerCase().replace(/[^a-z]+/g, "-")} className="grid scroll-mt-24 gap-4 border-b border-line py-12 last:border-b-0 md:grid-cols-[200px_minmax(0,1fr)] md:gap-8">
      <h2 className="pt-1 font-mono text-[0.72rem] font-medium uppercase tracking-[0.14em] text-accent">
        <span className="mr-2 text-dim">{n}</span>
        {t}
      </h2>
      <div className="prose-case min-w-0">{children}</div>
    </section>
  );
}

/** Highlighted callout used for the one-line lesson or a caveat. */
export function Note({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "amber" }) {
  const c = tone === "amber" ? "border-amber/50" : "border-accent/50";
  return <div className={`not-prose my-6 border-l-2 ${c} pl-5 font-serif text-[1.3rem] italic leading-snug text-warm`}>{children}</div>;
}

export function Flow({ flow, label }: { flow: FlowNode[]; label?: string }) {
  return (
    <div className="my-6 max-w-md">
      <FlowDiagram flow={flow} label={label} size="lg" />
    </div>
  );
}

/** Label for code that is synthetic / illustrative rather than copied from a repo. */
export function Illustrative({ children }: { children?: React.ReactNode }) {
  return (
    <p className="!mt-6 !mb-[-0.6rem] font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-amber">
      ◇ {children ?? "Illustrative · synthetic example, not production code"}
    </p>
  );
}
