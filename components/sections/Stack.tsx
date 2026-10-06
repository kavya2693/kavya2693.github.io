import { STACK } from "@/lib/site";
import { Container, SectionHead } from "@/components/ui/primitives";

export function Stack({ num = "06" }: { num?: string }) {
  return (
    <section id="stack" className="border-t border-line py-24 md:py-28">
      <Container>
        <SectionHead num={num} label="Stack" title="Tools I reach for, grouped by the job they do." />
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
          {STACK.map((g) => (
            <div key={g.group}>
              <h3 className="border-b border-line pb-3 font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-accent">{g.group}</h3>
              <ul className="mt-4 grid gap-2">
                {g.items.map((it) => (
                  <li key={it} className="text-[0.93rem] text-ink-2">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
