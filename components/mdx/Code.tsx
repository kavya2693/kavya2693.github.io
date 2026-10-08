import { codeToHtml } from "shiki";

/** Build-time syntax highlighting (server component — zero client JS). */
export async function highlight(code: string, lang: string) {
  return codeToHtml(code.replace(/\n$/, ""), { lang, theme: "github-light" });
}

export async function Code({ code, lang, title, href }: { code: string; lang: string; title?: string; href?: string }) {
  const html = await highlight(code, lang);
  return (
    <figure className="code-block my-6 overflow-hidden rounded-xl border border-line bg-[#f6f8fa]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-4 py-2 font-mono text-[0.7rem] text-dim">
        <span>{title ?? lang}</span>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">source ↗</a>
        ) : (
          <span className="uppercase tracking-[0.1em]">{lang}</span>
        )}
      </figcaption>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </figure>
  );
}
