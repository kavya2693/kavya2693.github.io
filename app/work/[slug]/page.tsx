import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { CASES, caseBySlug } from "@/lib/projects";
import { FlowDiagram } from "@/components/diagrams/FlowDiagram";
import { Badge, ButtonLink, Chips, Container } from "@/components/ui/primitives";

export const dynamicParams = false;
export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = caseBySlug((await params).slug);
  if (!c) return {};
  return { title: c.title, description: c.problem, openGraph: { title: c.title, description: c.problem } };
}

const SECTIONS = ["Problem", "Context", "Data", "Architecture", "What I built", "Modeling / AI approach", "Evaluation", "Production considerations", "Results", "Tradeoffs / lessons"];

export default async function CasePage({ params }: Props) {
  const { slug } = await params;
  const c = caseBySlug(slug);
  if (!c) notFound();
  const { default: Body } = await import(`@/content/work/${slug}.mdx`);
  const i = CASES.findIndex((x) => x.slug === slug);
  const prev = CASES[(i - 1 + CASES.length) % CASES.length];
  const next = CASES[(i + 1) % CASES.length];

  const ld = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: c.title,
    about: c.kicker,
    author: { "@type": "Person", name: "Kavyasri Jadala" },
    keywords: c.stack.join(", "),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <Container className="pt-10 md:pt-14">
        <Link href="/work/" className="inline-flex items-center gap-2 font-mono text-[0.74rem] text-mute hover:text-accent">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All work
        </Link>

        <header className="grid gap-10 pb-12 pt-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-14">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <Badge tone={c.visibility === "public" ? "accent" : "mute"}>{c.status}</Badge>
              <span className="font-mono text-[0.72rem] text-accent">{c.kicker}</span>
            </div>
            <h1 className="mt-5 text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[1.04] tracking-[-0.035em]">{c.title}</h1>
            <p className="mt-6 max-w-2xl text-[1.12rem] leading-relaxed text-ink-2">{c.problem}</p>
            <p className="mt-4 max-w-2xl text-[0.95rem] text-mute"><span className="text-ink">My role.</span> {c.role}</p>
            <dl className="mt-9 grid gap-5 border-y border-line py-6 sm:grid-cols-3">
              {c.metrics.map((m) => (
                <div key={m.label}>
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]">{m.value}</span>
                    <span className="mt-1 block text-[0.8rem] text-mute">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <Chips items={c.stack} className="mt-6" />
            <div className="mt-7 flex flex-wrap gap-3">
              {c.links.map((l) => (
                <ButtonLink key={l.href} href={l.href}>{l.label}</ButtonLink>
              ))}
            </div>
            {c.note && <p className="mt-5 max-w-2xl border-l-2 border-line-2 pl-4 text-[0.85rem] text-mute">{c.note}</p>}
          </div>
          <aside className="rounded-2xl border border-line bg-surface p-6 sm:p-7 lg:sticky lg:top-24 lg:self-start">
            <FlowDiagram flow={c.flow} label={c.flowLabel} size="lg" />
          </aside>
        </header>

        <nav aria-label="On this page" className="hidden flex-wrap gap-x-5 gap-y-2 border-t border-line py-5 font-mono text-[0.6875rem] text-dim md:flex">
          {SECTIONS.map((s, k) => (
            <a key={s} href={`#${s.toLowerCase().replace(/[^a-z]+/g, "-")}`} className="hover:text-accent">
              {String(k + 1).padStart(2, "0")} {s}
            </a>
          ))}
        </nav>

        <div className="border-t border-line">
          <Body />
        </div>

        <nav aria-label="More case studies" className="grid gap-3 py-16 sm:grid-cols-2">
          <Link href={`/work/${prev.slug}/`} className="rounded-xl border border-line bg-surface p-5 transition-colors hover:border-accent/40">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-dim">← Previous</span>
            <b className="mt-1 block text-[1.05rem] font-semibold">{prev.title}</b>
          </Link>
          <Link href={`/work/${next.slug}/`} className="rounded-xl border border-line bg-surface p-5 text-right transition-colors hover:border-accent/40">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-dim">Next →</span>
            <b className="mt-1 block text-[1.05rem] font-semibold">{next.title}</b>
          </Link>
        </nav>
      </Container>
    </article>
  );
}
