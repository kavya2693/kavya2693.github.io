"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";

export function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const active = (href: string) => path === href || path.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 ${
        scrolled || open ? "border-line bg-bg/80" : "border-transparent bg-bg/40"
      }`}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="whitespace-nowrap text-[0.95rem] font-semibold tracking-[-0.01em]">
          Kavyasri Jadala
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 text-[0.88rem] text-mute md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined} className={`transition-colors hover:text-ink ${active(n.href) ? "text-ink" : ""}`}>
              {n.label}
            </Link>
          ))}
          <Link href="/resume/" className={`rounded-full border px-4 py-1.5 transition-colors hover:border-accent hover:text-accent ${active("/resume/") ? "border-accent text-accent" : "border-line-2 text-ink"}`}>
            Résumé
          </Link>
          <span className="h-4 w-px bg-line-2" aria-hidden />
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-ink">
            <GitHubIcon />
          </a>
          {SITE.linkedin && (
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-ink">
              <LinkedInIcon />
            </a>
          )}
        </nav>

        <button
          type="button"
          className="-mr-2 grid h-11 w-11 place-items-center rounded-md text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line px-4 pb-5 pt-2 md:hidden">
          {[...NAV, { href: "/resume/", label: "Résumé" }].map((n) => (
            <Link key={n.href} href={n.href} className="flex min-h-12 items-center border-b border-line text-[1.05rem] text-ink-2">
              {n.label}
            </Link>
          ))}
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center gap-2 text-mute">
            <GitHubIcon /> GitHub
          </a>
        </nav>
      )}
    </header>
  );
}
