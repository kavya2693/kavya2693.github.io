# kavya2693.github.io

The source for my personal site, live at **https://kavya2693.github.io**.

It is a static site — four small files, no build step, no framework. Content is
kept separate from layout so posting a new project or video is a one-line change.

## Add a project

Open `data.js` and copy one block inside `PROJECTS`:

```js
{
  name: "project-name",
  tag: "Category · Category",
  problem: "Who is stuck, doing what, at what cost. Plain language.",
  approach: "What it does and the one key decision. One or two sentences.",
  stack: ["Python", "RDF/SHACL", "SPARQL"],
  repo: "https://github.com/kavya2693/project-name",
  featured: true            // shows a Featured badge; use false for the rest
}
```

Top-to-bottom order in the array is the order on the page. Commit and push — the
site updates in about a minute.

## Add a video

Open `data.js` and add a block inside `VIDEOS`:

```js
{
  title: "Talk title",
  blurb: "One line on what it covers.",
  youtube: "dQw4w9WgXcQ"   // the id after ?v= in the YouTube URL
}
```

Leave `youtube` empty (`""`) to show a "coming soon" placeholder card instead of
an embed.

## Use a custom domain

1. Register a domain (e.g. `kavyasrijadala.com`).
2. Rename `CNAME.example` to `CNAME` and put your domain in it (one line).
3. At your registrar, point DNS at GitHub Pages:
   - `A` records for the apex domain → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - a `CNAME` record for `www` → `kavya2693.github.io`
4. In the repo: **Settings → Pages → Custom domain**, enter the domain, and tick
   **Enforce HTTPS** once the certificate is issued.

Until then the site serves at `kavya2693.github.io`, so leaving `CNAME.example`
as-is keeps the live site working.

## Local preview

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Files

| File          | What it holds                                  |
|---------------|------------------------------------------------|
| `index.html`  | Page structure and copy                        |
| `styles.css`  | The entire look — one stylesheet               |
| `data.js`     | Projects and videos — the file you edit often  |
| `main.js`     | Renders the cards from `data.js`               |
