import { SITE, CRED, FOCUS } from "@/lib/site";
import { ButtonLink, Container, Eyebrow } from "@/components/ui/primitives";
import { HeroGraph } from "./HeroGraph";

export function Hero() {
  return (
    <section className="pb-16 pt-10 md:pb-20 md:pt-16">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-6">
          <div>
            <Eyebrow className="mb-7">AI systems · Knowledge · Agents · Applied ML</Eyebrow>
            <h1 className="text-[clamp(2.5rem,6vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              AI systems built for the <span className="font-serif font-normal italic tracking-[-0.02em] text-warm">real world.</span>
            </h1>
            <p className="mt-7 max-w-[34rem] text-[1.1rem] leading-relaxed text-ink-2">
              I design and ship agentic AI, knowledge systems, Graph-RAG and applied ML — from data and models to evaluation and production.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="/work/" variant="primary">Explore the work</ButtonLink>
              <ButtonLink href="/resume/">View résumé</ButtonLink>
              <div className="ml-1 flex gap-5 font-mono text-[0.8rem] text-mute">
                <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub ↗</a>
                {SITE.linkedin && <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn ↗</a>}
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[600px]">
            <HeroGraph />
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 border-y border-line md:grid-cols-4">
          {CRED.map((c, i) => (
            <div key={c.value} className={`py-5 pr-4 ${i % 2 ? "border-l border-line pl-4 md:pl-6" : "md:pl-0"} ${i >= 2 ? "border-t border-line md:border-t-0" : ""} ${i === 2 ? "md:border-l md:pl-6" : ""}`}>
              <dt className="text-[1.35rem] font-semibold tracking-[-0.02em] md:text-[1.5rem]">{c.value}</dt>
              <dd className="mt-0.5 text-[0.8rem] leading-snug text-mute">{c.label}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-dim">
          {FOCUS.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
              {f}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
