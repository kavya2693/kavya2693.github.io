# kavya2693.github.io

Source for my portfolio, live at **https://kavya2693.github.io**.

Next.js (App Router) + TypeScript + Tailwind CSS, exported as a static site and
deployed to GitHub Pages by GitHub Actions on every push to `main`. Hosting is free.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000 — live reload
npm run build        # static export to out/
npm run lint
npx serve out        # or: cd out && python3 -m http.server 8090
```

Node 20+ (CI uses Node 22).

## Where content lives

All content is data — no copy is hardcoded in components.

| To change… | Edit |
|---|---|
| Case-study cards (title, metrics, flow diagram, links) | `lib/projects.ts` |
| Case-study long-form pages (10 sections) | `content/work/<slug>.mdx` |
| Lab experiments | `lib/lab.ts` |
| Repositories in "Engineering proof" | `lib/repos.ts` |
| Code excerpts in "Engineering proof" | `lib/snippets.ts` (verbatim from GitHub — re-copy, don't hand-edit) |
| Skills graph on /graph | `lib/graph.ts` (a node id is also a tag) |
| Name, links, credibility strip, lifecycle, stack, timeline | `lib/site.ts` |
| Résumé page | `lib/resume.ts` |

### Add a case study

1. Append an object to `CASES` in `lib/projects.ts` (copy an existing one; `slug` must be unique).
2. Create `content/work/<slug>.mdx` using the ten `<S n="01" t="Problem">…</S>` sections.
3. Give it `tags` from `lib/graph.ts` so it shows up when someone clicks those nodes.

Fenced code blocks in MDX are highlighted at build time. For a snippet from a repo,
use `<Code lang="python" title="repo/path.py" href="https://github.com/…#L10-L30" code={`…`} />`.
Mark synthetic examples with `<Illustrative />` above them.

### Add a lab experiment

Append to `LAB` in `lib/lab.ts`: question, approach, experiment, result, verdict
(`confirmed` · `mixed` · `refuted` · `built`), optional `code` and `caseStudy` links.

## Structure

```
app/            routes: / · /work · /work/[slug] · /graph · /lab · /about · /resume · sitemap · robots
components/     nav · hero · projects · diagrams · graph · sections · mdx · ui
content/work/   MDX case studies
lib/            typed content (single source of truth)
public/         legacy pages (graph.html, hcp-nba-architecture.html), assets, icon
.github/workflows/deploy.yml   build + deploy to Pages
```

`public/graph.html` and `public/hcp-nba-architecture.html` are the original standalone
pages; their URLs are unchanged.

## Custom domain (optional, ~$10–15/year)

1. Register a domain.
2. Create `public/CNAME` containing the domain (one line).
3. At the registrar: `A` records for the apex → `185.199.108.153`, `185.199.109.153`,
   `185.199.110.153`, `185.199.111.153`; `CNAME` for `www` → `kavya2693.github.io`.
4. Repo **Settings → Pages → Custom domain**, then tick **Enforce HTTPS**.
5. Update `SITE.url` in `lib/site.ts`.
