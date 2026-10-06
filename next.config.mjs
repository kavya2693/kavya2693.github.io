import createMDX from "@next/mdx";

/** Static export: `next build` writes a plain site to out/, which GitHub Pages serves. */
const nextConfig = {
  outputFileTracingRoot: import.meta.dirname, // a stray lockfile in ~/Documents would otherwise be picked as root
  output: "export",
  trailingSlash: true, // /graph/ → graph/index.html, so it never collides with the legacy public/graph.html
  images: { unoptimized: true },
  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
