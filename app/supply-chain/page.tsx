import type { Metadata } from "next";
import { APPLIED, THEMES } from "@/lib/applied";
import { GH } from "@/lib/repos";
import { DemoCard } from "@/components/projects/DemoCard";
import { Container, Eyebrow, ButtonLink } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Supply chain & applied AI",
  description:
    "Fourteen public repositories: demand forecasting, inventory and supply planning, vehicle routing, pricing, LLM platforms and predictive maintenance, each with a walkthrough video and an audit report.",
};

export default function SupplyChainPage() {
  return (
    <Container className="pb-24 pt-12 md:pt-16">
      <Eyebrow className="mb-6">Supply chain & applied AI</Eyebrow>
      <h1 className="max-w-3xl text-[clamp(2.1rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
        Forecasts, plans and routes, <span className="font-serif font-normal italic text-warm">priced in money.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-[1.05rem] text-mute">
        {APPLIED.length} public repositories, each starting from an operating problem and ending in a decision a planner can act on.
        Every one is scored against the baseline it has to beat, reports what didn&rsquo;t win, and ships a short walkthrough video and an audit report.
      </p>

      <nav aria-label="Themes" className="mt-8 flex flex-wrap gap-2">
        {THEMES.map((t) => (
          <a key={t.id} href={`#${t.id}`} className="inline-flex min-h-10 items-center rounded-full border border-line-2 px-4 text-[0.86rem] text-ink-2 transition-colors hover:border-accent hover:text-accent">
            {t.label}
          </a>
        ))}
      </nav>

      {THEMES.map((t) => {
        const items = APPLIED.filter((a) => a.theme === t.id);
        if (items.length === 0) return null;
        return (
          <section key={t.id} id={t.id} className="mt-16 scroll-mt-24">
            <div className="mb-6 border-b border-line pb-4">
              <h2 className="text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold tracking-[-0.025em]">{t.label}</h2>
              <p className="mt-1 text-[0.95rem] text-mute">{t.blurb}</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => (
                <DemoCard key={a.name} a={a} />
              ))}
            </div>
          </section>
        );
      })}

      <div className="mt-16">
        <ButtonLink href={GH}>All repositories on GitHub</ButtonLink>
      </div>
    </Container>
  );
}
