import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { RESUME_HEADLINE, RESUME_SUMMARY, JOBS, SKILLS, EDUCATION, CERTS } from "@/lib/resume";
import { Container } from "@/components/ui/primitives";
import { PrintButton } from "@/components/ui/PrintButton";

export const metadata: Metadata = { title: "Résumé", description: "Résumé of Kavyasri Jadala — Senior AI Engineer: knowledge graphs, agentic AI, applied ML." };

export default function ResumePage() {
  return (
    <Container className="resume pb-24 pt-12 md:pt-16">
      <div className="mx-auto max-w-3xl">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
          <div>
            <h1 className="text-[2.4rem] font-semibold leading-none tracking-[-0.03em]">{SITE.name}</h1>
            <p className="mt-3 text-[1rem] text-accent">{RESUME_HEADLINE}</p>
            <p className="mt-3 font-mono text-[0.76rem] text-mute">
              {SITE.location} · <a href={`mailto:${SITE.email}`} className="hover:text-ink">{SITE.email}</a> ·{" "}
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">github.com/kavya2693</a>
              {SITE.linkedin && <> · <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">linkedin.com/in/kavyasri-jadala</a></>}
            </p>
          </div>
          <PrintButton />
        </header>

        <p className="mt-8 text-[1rem] leading-relaxed text-ink-2">{RESUME_SUMMARY}</p>

        <h2 className="mt-12 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent">Experience</h2>
        <div className="mt-4 grid gap-8">
          {JOBS.map((j) => (
            <section key={j.org} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="text-[1.08rem] font-semibold">{j.title} · {j.org}</h3>
                <span className="font-mono text-[0.74rem] text-dim">{j.when}</span>
              </div>
              <p className="text-[0.84rem] text-mute">{j.place}</p>
              <ul className="mt-3 grid gap-2">
                {j.bullets.map((b) => (
                  <li key={b} className="relative pl-5 text-[0.93rem] leading-relaxed text-ink-2 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2.5 before:bg-accent">{b}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <h2 className="mt-12 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent">Skills</h2>
        <dl className="mt-4 grid gap-2.5">
          {SKILLS.map(([k, v]) => (
            <div key={k} className="grid gap-1 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-4">
              <dt className="text-[0.88rem] font-medium text-ink">{k}</dt>
              <dd className="text-[0.9rem] text-ink-2">{v}</dd>
            </div>
          ))}
        </dl>

        <h2 className="mt-12 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent">Education</h2>
        <ul className="mt-4 grid gap-2">
          {EDUCATION.map(([school, deg, yr]) => (
            <li key={school} className="flex flex-wrap justify-between gap-x-4 text-[0.92rem]">
              <span><b className="font-medium text-ink">{deg}</b> <span className="text-mute">· {school}</span></span>
              <span className="font-mono text-[0.74rem] text-dim">{yr}</span>
            </li>
          ))}
        </ul>
        <h2 className="mt-12 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent">Certifications</h2>
        <p className="mt-3 text-[0.9rem] text-ink-2">{CERTS}</p>
      </div>
    </Container>
  );
}
