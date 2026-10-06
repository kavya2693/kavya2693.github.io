import { REPOS, GH } from "@/lib/repos";
import { SNIPPETS } from "@/lib/snippets";
import { highlight } from "@/components/mdx/Code";
import { Container, SectionHead, ButtonLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { SnippetTabs } from "./SnippetTabs";

export async function EngineeringProof({ num = "04" }: { num?: string }) {
  const rendered = await Promise.all(
    SNIPPETS.map(async (s) => ({ id: s.id, title: s.title, why: s.why, repo: s.repo, path: s.path, url: s.url, html: await highlight(s.code, s.lang) })),
  );
  return (
    <section id="proof" className="border-t border-line py-24 md:py-28">
      <Container>
        <SectionHead
          num={num}
          label="Engineering proof"
          title={<>Built, tested, <span className="font-serif font-normal italic text-warm">shipped.</span></>}
          lede="Real excerpts from public repositories — not screenshots, not pseudocode. Each links to the exact lines on GitHub."
        />
        <Reveal>
          <SnippetTabs items={rendered} />
        </Reveal>

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {REPOS.map((r) => (
            <a
              key={r.name}
              href={`${GH}/${r.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[150px] flex-col gap-2 rounded-xl border border-line p-5 transition-colors hover:border-accent/40"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-mono text-[0.88rem] text-ink group-hover:text-accent">{r.name}</span>
                <span className="shrink-0 font-mono text-[0.6875rem] text-dim">
                  <span className="text-accent">●</span> {r.language}
                </span>
              </div>
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-dim">{r.area}</span>
              <span className="flex-1 text-[0.85rem] leading-relaxed text-mute">{r.does}</span>
              <span className={`font-mono text-[0.72rem] ${r.evidence ? "text-ink-2" : "text-dim"}`}>
                {r.evidence ?? "demo · no benchmark claimed"}
              </span>
            </a>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href={GH}>All repositories on GitHub</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
