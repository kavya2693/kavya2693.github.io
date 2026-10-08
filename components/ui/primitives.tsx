import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-accent ${className}`}>
      <span aria-hidden className="h-px w-7 bg-accent" />
      {children}
    </p>
  );
}

/** Numbered section header: "03 — Evaluation" on the left, title + lede on the right. */
export function SectionHead({ num, label, title, lede }: { num: string; label: string; title: React.ReactNode; lede?: React.ReactNode }) {
  return (
    <div className="mb-12 grid gap-4 md:mb-14 md:grid-cols-[200px_minmax(0,1fr)] md:gap-8">
      <p className="pt-2 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-accent">
        {num} <span className="text-dim">—</span> {label}
      </p>
      <div>
        <h2 className="text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.03em]">{title}</h2>
        {lede && <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-mute">{lede}</p>}
      </div>
    </div>
  );
}

export function Chips({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((s) => (
        <li key={s} className="rounded-md border border-line bg-black/[0.02] px-2 py-0.5 font-mono text-[0.6875rem] text-mute">
          {s}
        </li>
      ))}
    </ul>
  );
}

const isExternal = (href: string) => /^https?:|^mailto:/.test(href);

/** Pill button. External links open in a new tab; internal ones use client routing (except legacy .html pages). */
export function ButtonLink({ href, children, variant = "ghost", className = "" }: { href: string; children: React.ReactNode; variant?: "primary" | "ghost"; className?: string }) {
  const base =
    "group inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-[0.92rem] font-medium transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-px";
  const look =
    variant === "primary"
      ? "bg-accent text-accent-ink hover:shadow-[0_10px_34px_rgb(8_121_93/0.22)]"
      : "border border-line-2 text-ink hover:border-mute";
  const cls = `${base} ${look} ${className}`;
  const icon = isExternal(href) ? (
    <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  ) : (
    <ArrowRight aria-hidden className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
  );
  if (isExternal(href)) {
    return (
      <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className={cls}>
        {children}
        {icon}
      </a>
    );
  }
  if (href.endsWith(".html")) {
    return <a href={href} className={cls}>{children}{icon}</a>;
  }
  return <Link href={href} className={cls}>{children}{icon}</Link>;
}

/** Small accent text link used under cards. */
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  const ext = isExternal(href);
  const cls = "group inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-accent hover:underline underline-offset-4";
  const icon = ext ? <ArrowUpRight aria-hidden className="h-3.5 w-3.5" /> : <ArrowRight aria-hidden className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />;
  if (ext || href.endsWith(".html"))
    return (
      <a href={href} className={cls} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {icon}
      </a>
    );
  return <Link href={href} className={cls}>{children}{icon}</Link>;
}

export function Badge({ children, tone = "mute" }: { children: React.ReactNode; tone?: "mute" | "accent" | "amber" }) {
  const c =
    tone === "accent" ? "border-accent/35 text-accent" : tone === "amber" ? "border-amber/35 text-amber" : "border-line-2 text-mute";
  return <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] ${c}`}>{children}</span>;
}
