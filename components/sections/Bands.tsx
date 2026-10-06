import { SITE, TIMELINE } from "@/lib/site";
import { GRAPH_NODES } from "@/lib/graph";
import { LAB } from "@/lib/lab";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import Link from "next/link";

/** Teaser that sends visitors into the interactive graph, with one-tap entry points per branch. */
export function GraphBand() {
  const branches = GRAPH_NODES.filter((n) => n.kind === "branch");
  return (
    <section className="border-t border-line py-20">
      <Container>
        <div className="grid items-center gap-10 rounded-2xl border border-line bg-[radial-gradient(600px_300px_at_85%_50%,rgb(114_230_193/0.08),transparent_70%)] p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Eyebrow className="mb-5">The graph</Eyebrow>
            <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight tracking-[-0.03em]">
              Navigate the work by skill, not by job title.
            </h2>
            <p className="mt-4 max-w-md text-mute">
              Pick a node — SHACL, Forecasting, Agents — and see every case study, experiment and repository that uses it. {LAB.length} experiments and 12 repositories are wired in.
            </p>
            <div className="mt-7"><ButtonLink href="/graph/" variant="primary">Open the graph</ButtonLink></div>
          </div>
          <ul className="flex flex-wrap gap-2">
            {branches.map((b) => (
              <li key={b.id}>
                <Link href={`/graph/?focus=${b.id}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line-2 bg-surface px-4 text-[0.9rem] text-ink-2 transition-colors hover:border-accent hover:text-accent">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  {b.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

export function ContactBand() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent">06 <span className="text-dim">—</span> About</p>
            <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
              Hands on the system, <span className="font-serif font-normal italic text-warm">eyes on the decision.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink-2">
              I work where AI engineering, data systems and product meet — writing the ontology, the pipeline and the evaluation myself,
              and sitting with the people who will act on the output. Eight years across pharma, claims, retail, e-commerce and energy. MS from Purdue. Based in Dubai.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${SITE.email}`} variant="primary">{SITE.email}</ButtonLink>
              <ButtonLink href="/about/">More about me</ButtonLink>
            </div>
          </div>
          <ol className="border-l border-line-2">
            {TIMELINE.slice(0, 4).map((r, i) => (
              <li key={r.org} className="relative pb-6 pl-6 last:pb-0">
                <span aria-hidden className={`absolute -left-[5px] top-[7px] h-[9px] w-[9px] rounded-full border-[1.5px] ${i === 0 ? "border-accent bg-accent" : "border-dim bg-bg"}`} />
                <span className="font-mono text-[0.7rem] tracking-[0.08em] text-accent">{r.when}</span>
                <span className="block font-semibold">{r.org}</span>
                <span className="block text-[0.85rem] text-mute">{r.title}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
