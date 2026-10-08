import { LIFECYCLE } from "@/lib/site";
import { Container, SectionHead } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

export function Lifecycle({ num = "05" }: { num?: string }) {
  return (
    <section id="how" className="border-t border-line py-24 md:py-28">
      <Container>
        <SectionHead
          num={num}
          label="How I build"
          title={<>From an ambiguous problem to a system <span className="font-serif font-normal italic text-warm">that stays correct.</span></>}
          lede="The same loop on every project. Each stage leaves an artifact behind — that is what makes the next one checkable."
        />
        <Reveal>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {LIFECYCLE.map((s, i) => (
              <li key={s.name} className={`flex flex-col gap-3 bg-surface p-6 ${s.name === "Evaluate" ? "bg-[linear-gradient(180deg,rgb(8_121_93/0.07),var(--color-surface))]" : ""}`}>
                <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-dim">
                  {String(i + 1).padStart(2, "0")} {i < LIFECYCLE.length - 1 ? "→" : "↺"}
                </span>
                <h3 className="text-[1.05rem] font-semibold tracking-[-0.01em]">{s.name}</h3>
                <p className="text-[0.86rem] leading-relaxed text-mute">{s.does}</p>
                <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {s.artifacts.map((a) => (
                    <li key={a} className="rounded border border-line-2 px-1.5 py-0.5 font-mono text-[0.6875rem] text-ink-2">{a}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
