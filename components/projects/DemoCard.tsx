import type { Applied } from "@/lib/applied";
import { Chips, TextLink } from "@/components/ui/primitives";
import { DemoPlayer } from "@/components/projects/DemoPlayer";

/** Repository card with an animated walkthrough preview: problem, one headline result, stack, links. */
export function DemoCard({ a }: { a: Applied }) {
  return (
    <article id={a.name} className="flex scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-accent/30">
      <div className="border-b border-line">
        <DemoPlayer gif={a.gif} video={a.links.video} title={a.title} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <div>
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-dim">{a.repo.area}</span>
          <h3 className="mt-1 text-[1.12rem] font-semibold leading-snug tracking-[-0.015em]">
            <a href={a.links.repo} target="_blank" rel="noopener noreferrer" className="hover:text-accent">{a.title}</a>
          </h3>
        </div>
        <p className="text-[0.88rem] leading-relaxed text-mute">{a.repo.does}</p>
        {a.repo.evidence && (
          <p className="rounded-lg border border-line-2 bg-bg-2 px-3 py-2 font-mono text-[0.76rem] leading-relaxed text-ink-2">
            {a.repo.evidence}
          </p>
        )}
        <Chips items={a.stack} />
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-1">
          <TextLink href={a.links.repo}>Repo</TextLink>
          <TextLink href={a.links.video}>Video</TextLink>
          <TextLink href={a.links.audit}>Audit report (PDF)</TextLink>
        </div>
      </div>
    </article>
  );
}
