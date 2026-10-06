import { Badge, Container, SectionHead, TextLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

const PIPELINE = [
  { t: "Golden dataset", m: "questions + expected rows + sources" },
  { t: "Retrieval eval", m: "Precision@K · Recall@K" },
  { t: "Generation eval", m: "format · schema validity" },
  { t: "Groundedness", m: "every claim cites retrieved evidence" },
  { t: "Correctness", m: "field accuracy vs ground truth" },
  { t: "Latency / cost", m: "P50 · P95 · output tokens" },
  { t: "Human review", m: "sampled · disagreements become tests" },
];

// Measured — ontoloop benchmark/results.md, 20 synthetic cases, CPU, temperature 0.
const ARMS = [
  { arm: "3B", loop: false, conf: 0, acc: 71.0, p50: "9.2 s", tok: "3,300" },
  { arm: "14B", loop: false, conf: 65, acc: 85.5, p50: "27.2 s", tok: "3,693" },
  { arm: "3B + loop", loop: true, conf: 85, acc: 78.5, p50: "19.0 s", tok: "7,971" },
  { arm: "14B + loop", loop: true, conf: 80, acc: 83.5, p50: "31.6 s", tok: "5,826" },
];

// Illustrative — example release-gate thresholds for a Graph-RAG release. Not measured project data.
const GATE = [
  { k: "Recall@10", v: "≥ 0.85" },
  { k: "Groundedness", v: "≥ 0.95" },
  { k: "Answer correctness", v: "≥ 0.90" },
  { k: "Hallucination rate", v: "≤ 2%" },
  { k: "P95 latency", v: "≤ 2.5 s" },
  { k: "Cost / answer", v: "budgeted per use case" },
];

function BarPanel({ title, field, note }: { title: string; field: "conf" | "acc"; note: string }) {
  return (
    <figure>
      <figcaption className="mb-3 flex items-baseline justify-between gap-2">
        <span className="text-[0.9rem] font-medium text-ink">{title}</span>
        <span className="font-mono text-[0.6875rem] text-dim">{note}</span>
      </figcaption>
      <ul className="grid gap-2.5">
        {ARMS.map((a) => {
          const v = a[field];
          return (
            <li key={a.arm} className="group relative grid grid-cols-[84px_minmax(0,1fr)_48px] items-center gap-3">
              <span className="font-mono text-[0.72rem] text-mute">{a.arm}</span>
              <span className="relative h-[14px] rounded-[3px] bg-white/[0.03]">
                <span
                  className={`absolute inset-y-0 left-0 rounded-r-[4px] ${a.loop ? "bg-accent" : "bg-[#5b6675]"} transition-opacity group-hover:opacity-80`}
                  style={{ width: `${Math.max(v, 0.6)}%` }}
                />
              </span>
              <span className="text-right font-mono text-[0.76rem] text-ink-2">{v}%</span>
              <span
                role="tooltip"
                className="pointer-events-none absolute -top-9 left-0 right-0 z-10 hidden rounded-md group-hover:block sm:left-24 sm:right-auto sm:whitespace-nowrap border border-line-2 bg-elevated px-2.5 py-1 font-mono text-[0.6875rem] text-ink-2 shadow-lg"
              >
                {a.arm}: {title.toLowerCase()} {v}% · p50 {a.p50} · {a.tok} tokens
              </span>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

export function Evaluation({ num = "03" }: { num?: string }) {
  return (
    <section id="evaluation" className="border-t border-line py-24 md:py-28">
      <Container>
        <SectionHead
          num={num}
          label="Evaluation"
          title={<>AI isn&rsquo;t finished when <span className="font-serif font-normal italic text-warm">the demo works.</span></>}
          lede="Every system here ships behind an evaluation path. Measure two metrics that can disagree, and run the experiment most likely to embarrass the headline."
        />

        <Reveal>
          <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-7" aria-label="Evaluation pipeline">
            {PIPELINE.map((p, i) => (
              <li key={p.t} className="relative rounded-xl border border-line bg-surface p-4">
                <span className="font-mono text-[0.6875rem] text-dim">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-1.5 block text-[0.92rem] font-medium text-ink">{p.t}</span>
                <span className="mt-1 block text-[0.76rem] leading-snug text-mute">{p.m}</span>
                {i < PIPELINE.length - 1 && (
                  <span aria-hidden className="absolute -right-[9px] top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 place-items-center rounded-full border border-line-2 bg-bg text-[0.6875rem] text-accent lg:grid">→</span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <Reveal className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em]">Structural validity vs factual accuracy</h3>
              <Badge tone="accent">Measured · ontoloop</Badge>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <BarPanel title="SHACL conformance" field="conf" note="records that validate" />
              <BarPanel title="Field accuracy" field="acc" note="fields matching ground truth" />
            </div>
            <p className="mt-6 text-[0.9rem] leading-relaxed text-ink-2">
              The repair loop lifts a 3B model from 0% to 85% valid records — past a 14B model. It never once made a record more{" "}
              <em>correct</em>: a plausible invented date satisfies every shape. Two metrics, opposite verdicts; both are reported.
            </p>
            <details className="mt-5 text-[0.85rem]">
              <summary className="cursor-pointer font-mono text-[0.72rem] text-mute hover:text-ink">Table view · latency and cost</summary>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-left">
                  <thead>
                    <tr className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-dim">
                      <th className="py-2 pr-4 font-normal">Arm</th><th className="py-2 pr-4 font-normal">Conformance</th><th className="py-2 pr-4 font-normal">Accuracy</th><th className="py-2 pr-4 font-normal">p50 latency</th><th className="py-2 font-normal">Output tokens</th>
                    </tr>
                  </thead>
                  <tbody className="text-ink-2">
                    {ARMS.map((a) => (
                      <tr key={a.arm} className="border-t border-line">
                        <td className="py-2 pr-4 font-mono text-[0.78rem]">{a.arm}</td><td className="py-2 pr-4">{a.conf}%</td><td className="py-2 pr-4">{a.acc}%</td><td className="py-2 pr-4">{a.p50}</td><td className="py-2">{a.tok}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-2 text-[0.75rem] text-dim">20 synthetic cases · Ollama on CPU · temperature 0 · seed 20260720.</p>
              </div>
            </details>
            <div className="mt-5"><TextLink href="/work/ontoloop/">Read the case study</TextLink></div>
          </Reveal>

          <Reveal delay={0.08} className="rounded-2xl border border-dashed border-line-2 p-6 sm:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em]">Release gate</h3>
              <Badge tone="amber">Illustrative</Badge>
            </div>
            <p className="mb-5 text-[0.85rem] leading-relaxed text-mute">
              Example thresholds a Graph-RAG release must clear before it reaches users. These are design targets, not measured results.
            </p>
            <dl className="divide-y divide-line">
              {GATE.map((g) => (
                <div key={g.k} className="flex items-baseline justify-between gap-4 py-2.5">
                  <dt className="text-[0.88rem] text-ink-2">{g.k}</dt>
                  <dd className="font-mono text-[0.8rem] text-ink">{g.v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-[0.8rem] leading-relaxed text-dim">
              Other measured results on this site: entity resolution P 0.93 / R 0.84 · lineage P 100% / R 90% · spatial-CV accuracy 95.8%.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
