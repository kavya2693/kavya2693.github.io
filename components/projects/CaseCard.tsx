import Link from "next/link";
import type { Case } from "@/lib/projects";
import { FlowDiagram } from "@/components/diagrams/FlowDiagram";
import { Badge, Chips, TextLink } from "@/components/ui/primitives";

const tone = (v: Case["visibility"]) => (v === "public" ? "accent" : v === "prototype" ? "amber" : "mute");

/** Large two-column case card: the argument on the left, the system on the right. */
export function CaseCard({ c, index }: { c: Case; index: number }) {
  const code = c.links.filter((l) => l.href.includes("github.com"));
  return (
    <article className="group grid overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-surface to-bg-2 transition-colors duration-300 hover:border-accent/30 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      <div className="flex flex-col gap-5 p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[0.72rem] tracking-[0.1em] text-dim">{String(index + 1).padStart(2, "0")}</span>
          <Badge tone={tone(c.visibility)}>{c.status}</Badge>
        </div>
        <div>
          <h3 className="text-[clamp(1.45rem,2.6vw,1.95rem)] font-semibold leading-tight tracking-[-0.025em]">
            <Link href={`/work/${c.slug}/`} className="hover:text-accent">{c.title}</Link>
          </h3>
          <p className="mt-2 font-mono text-[0.72rem] text-accent">{c.kicker}</p>
        </div>

        <dl className="grid gap-4 text-[0.93rem] leading-relaxed">
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim">Problem</dt>
            <dd className="mt-1 text-ink-2">{c.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim">System</dt>
            <dd className="mt-1 text-ink-2">{c.system}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim">My role</dt>
            <dd className="mt-1 text-mute">{c.role}</dd>
          </div>
        </dl>

        <dl className="grid grid-cols-1 gap-4 border-t border-line pt-5 sm:grid-cols-3">
          {c.metrics.map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd>
                <span className="block text-[1.2rem] font-semibold leading-tight tracking-[-0.02em] text-ink">{m.value}</span>
                <span className="mt-1 block text-[0.76rem] leading-snug text-mute">{m.label}</span>
              </dd>
            </div>
          ))}
        </dl>

        <Chips items={c.stack} />

        <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-1">
          <TextLink href={`/work/${c.slug}/`}>View case study</TextLink>
          {code.slice(0, 1).map((l) => (
            <TextLink key={l.href} href={l.href}>Code</TextLink>
          ))}
          {c.visibility === "enterprise" && code.length === 0 && <span className="text-[0.82rem] text-dim">System design · code private</span>}
        </div>
      </div>

      <div className="border-t border-line bg-[radial-gradient(420px_260px_at_50%_0%,rgb(8_121_93/0.06),transparent_70%)] p-6 sm:p-8 lg:border-l lg:border-t-0">
        <FlowDiagram flow={c.flow} label={c.flowLabel} />
      </div>
    </article>
  );
}
