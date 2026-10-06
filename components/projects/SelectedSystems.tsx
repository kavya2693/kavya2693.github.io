import { CASES } from "@/lib/projects";
import { CaseCard } from "./CaseCard";
import { Container, SectionHead } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

export function SelectedSystems({ num = "01", all = false }: { num?: string; all?: boolean }) {
  const list = all ? CASES : CASES.filter((c) => c.home);
  return (
    <section id="work" className="py-24 md:py-28">
      <Container>
        <SectionHead
          num={num}
          label="Selected systems"
          title={<>Systems, not demos — <span className="font-serif font-normal italic text-warm">with the numbers.</span></>}
          lede="Knowledge graphs, agents, geospatial risk, governed GenAI and classical forecasting. Each one names the problem, the architecture, my part in it and what was measured — including results that disappointed."
        />
        <div className="grid gap-6">
          {list.map((c, i) => (
            <Reveal key={c.slug}>
              <CaseCard c={c} index={i} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
