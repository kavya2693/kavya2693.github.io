import type { Metadata } from "next";
import { SITE, TIMELINE } from "@/lib/site";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "About", description: "AI engineering, data systems, applied ML and AI product — hands-on, across pharma, claims, retail, e-commerce and energy." };

export default function AboutPage() {
  return (
    <Container className="pb-24 pt-12 md:pt-16">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <Eyebrow className="mb-6">About</Eyebrow>
          <h1 className="text-[clamp(2.1rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            I turn complex data into <span className="font-serif font-normal italic text-warm">intelligent products.</span>
          </h1>
          <div className="mt-8 grid max-w-2xl gap-5 text-[1.05rem] leading-relaxed text-ink-2">
            <p>
              I work at the intersection of AI engineering, data systems, applied ML and product. I write the ontology, the pipeline and the evaluation
              myself, and I work directly with the people who will act on the output — commercial teams, market access, operations, planners.
            </p>
            <p>
              Over eight years I have taken systems from ambiguous problems to production across pharma, healthcare claims, retail, e-commerce
              logistics and energy: an enterprise knowledge graph over 20+ systems, a Graph-RAG assistant, demand forecasting at 4,000+ SKUs × 33
              stores, routing for a 300-vehicle fleet, and an agentic platform that generates applications from a screenshot.
            </p>
            <p>
              I am most interested in where structured knowledge, machine learning and generative AI meet — knowledge graphs, Graph-RAG,
              agentic architectures under deterministic verifiers, and multimodal and geospatial intelligence. I hold an MS in Business Analytics
              and Information Management from Purdue University, and I am based in {SITE.location}.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href={`mailto:${SITE.email}`} variant="primary">Email me</ButtonLink>
            <ButtonLink href="/resume/">Résumé</ButtonLink>
            {SITE.linkedin && <ButtonLink href={SITE.linkedin}>LinkedIn</ButtonLink>}
          </div>
        </div>
        <section aria-label="Timeline">
          <h2 className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-dim">Timeline</h2>
          <ol className="border-l border-line-2">
            {TIMELINE.map((r, i) => (
              <li key={r.org} className="relative pb-8 pl-6 last:pb-0">
                <span aria-hidden className={`absolute -left-[5px] top-[7px] h-[9px] w-[9px] rounded-full border-[1.5px] ${i === 0 ? "border-accent bg-accent" : "border-dim bg-bg"}`} />
                <span className="font-mono text-[0.7rem] tracking-[0.08em] text-accent">{r.when}</span>
                <span className="block font-semibold">{r.org}</span>
                <span className="block text-[0.85rem] text-ink-2">{r.title}</span>
                <span className="mt-1 block text-[0.84rem] leading-relaxed text-mute">{r.what}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </Container>
  );
}
