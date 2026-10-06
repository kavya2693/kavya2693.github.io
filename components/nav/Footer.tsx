import Link from "next/link";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-8 text-[0.8rem] text-dim sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} {SITE.name} · {SITE.location}</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-5">
          <Link href="/work/" className="hover:text-ink">Work</Link>
          <Link href="/graph/" className="hover:text-ink">Graph</Link>
          <Link href="/lab/" className="hover:text-ink">Lab</Link>
          <Link href="/resume/" className="hover:text-ink">Résumé</Link>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink">GitHub</a>
          <a href={`mailto:${SITE.email}`} className="hover:text-ink">{SITE.email}</a>
        </nav>
      </div>
    </footer>
  );
}
