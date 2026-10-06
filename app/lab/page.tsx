import type { Metadata } from "next";
import Link from "next/link";
import { LAB, type Experiment } from "@/lib/lab";
import { Badge, Container, Eyebrow, TextLink } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Lab",
  description: "Experiments framed as questions with measured answers — agents vs verifiers, spatial CV, graph features in forecasting, lineage, entity resolution.",
};

const VERDICT: Record<Experiment["verdict"], { label: string; tone: "accent" | "amber" | "mute" }> = {
  confirmed: { label: "Holds up", tone: "accent" },
  mixed: { label: "Mixed result", tone: "amber" },
  refuted: { label: "Hypothesis refuted", tone: "amber" },
  built: { label: "Built · eval pending", tone: "mute" },
};

export default function LabPage() {
  return (
    <Container className="pb-24 pt-12 md:pt-16">
      <Eyebrow className="mb-6">Lab · experiments</Eyebrow>
      <h1 className="max-w-3xl text-[clamp(2.1rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
        Questions I tested, <span className="font-serif font-normal italic text-warm">and what came back.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-[1.05rem] text-mute">
        Each card states the question before the result. Several answers were &ldquo;no&rdquo; or &ldquo;less than hoped&rdquo; — they are here on purpose.
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {LAB.map((e) => {
          const v = VERDICT[e.verdict];
          return (
            <article id={e.slug} key={e.slug} className="flex scroll-mt-24 flex-col gap-4 rounded-2xl border border-line bg-surface p-6 transition-colors target:border-accent/60 hover:border-accent/30 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-[0.6875rem] text-dim">{e.area}</span>
                <Badge tone={v.tone}>{v.label}</Badge>
              </div>
              <h2 className="text-[1.2rem] font-semibold leading-snug tracking-[-0.015em]">{e.title}</h2>
              <dl className="grid gap-3 text-[0.88rem] leading-relaxed">
                {([["Question", e.question], ["Approach", e.approach], ["Experiment", e.experiment]] as const).map(([k, val]) => (
                  <div key={k} className="grid gap-1 sm:grid-cols-[92px_minmax(0,1fr)] sm:gap-3">
                    <dt className="pt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-dim">{k}</dt>
                    <dd className="text-mute">{val}</dd>
                  </div>
                ))}
                <div className="grid gap-1 rounded-lg border border-line-2 bg-bg-2 p-3 sm:grid-cols-[80px_minmax(0,1fr)] sm:gap-3">
                  <dt className="pt-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent">Result</dt>
                  <dd className="text-ink-2">{e.result}</dd>
                </div>
              </dl>
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-1">
                {e.code ? <TextLink href={e.code}>Code</TextLink> : <span className="text-[0.82rem] text-dim">Code private · walkthrough on request</span>}
                {e.caseStudy && <TextLink href={e.caseStudy}>Case study</TextLink>}
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-10 text-[0.9rem] text-mute">
        Talks and walkthrough videos will appear here as they are recorded. Browse by topic in the <Link href="/graph/" className="text-accent hover:underline">graph</Link>.
      </p>
    </Container>
  );
}
