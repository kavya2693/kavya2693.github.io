"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { forceSimulation, forceLink, forceManyBody, forceCollide, forceX, forceY, type SimulationNodeDatum, type SimulationLinkDatum } from "d3-force";
import { useReducedMotion } from "motion/react";
import { GRAPH_NODES, GRAPH_LINKS, type GNode } from "@/lib/graph";
import { CASES } from "@/lib/projects";
import { LAB } from "@/lib/lab";
import { REPOS, GH } from "@/lib/repos";
import { ArrowUpRight } from "lucide-react";
import { useCompact } from "@/components/ui/useCompact";

type SimNode = GNode & SimulationNodeDatum;
type SimLink = SimulationLinkDatum<SimNode> & { cross?: boolean };

const W = 900;
const H = 640;
const byId = Object.fromEntries(GRAPH_NODES.map((n) => [n.id, n]));
const childrenOf = (id: string) => GRAPH_NODES.filter((n) => n.parent === id);

/** Tags a selection matches: the node itself plus, for a branch, all its leaves. */
function tagSet(id: string): Set<string> | null {
  if (id === "me") return null; // everything
  const s = new Set([id]);
  childrenOf(id).forEach((c) => s.add(c.id));
  return s;
}

/** Desktop: labels above branches, below leaves. Phone: labels sit beside the node, pointing away
 *  from the centre, which stops neighbouring labels from running into each other. */
function labelPos(n: SimNode, r: number, compact: boolean, k: number, branchy: boolean) {
  if (!compact) return { y: branchy ? -r - 9 : r + 12, textAnchor: "middle" as const };
  const dx = (n.x ?? W / 2) - W / 2;
  if (Math.abs(dx) < 40) return { y: branchy ? -r - 10 : r + 12 * k, textAnchor: "middle" as const };
  return { x: dx < 0 ? -r - 8 : r + 8, y: 5 * k, textAnchor: dx < 0 ? ("end" as const) : ("start" as const) };
}

function radius(n: GNode) {
  return n.kind === "core" ? 30 : n.kind === "branch" ? 12 : 5.5;
}

export function SkillGraph({ initial = "me" }: { initial?: string }) {
  const reduce = useReducedMotion();
  const [sel, setSel] = useState(byId[initial] ? initial : "me");
  const [hover, setHover] = useState<string | null>(null);
  const [, setFrame] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const compact = useCompact();
  const k = compact ? 2.1 : 1; // phone: scale marks and labels up so text stays legible
  const drag = useRef<SimNode | null>(null);
  const panel = useRef<HTMLElement>(null);

  const { nodes, links, sim, box } = useMemo(() => {
    const nodes: SimNode[] = GRAPH_NODES.map((n) => ({ ...n }));
    const map = Object.fromEntries(nodes.map((n) => [n.id, n]));
    const links: SimLink[] = [
      ...nodes.filter((n) => n.parent).map((n) => ({ source: map[n.parent!], target: n })),
      ...GRAPH_LINKS.map(([a, b]) => ({ source: map[a], target: map[b], cross: true })),
    ];
    // Seed branches on a ring and leaves near their branch, so the layout is stable and readable.
    const branches = nodes.filter((n) => n.kind === "branch");
    branches.forEach((b, i) => {
      const a = (i / branches.length) * Math.PI * 2 - Math.PI / 2;
      b.x = W / 2 + Math.cos(a) * 190;
      b.y = H / 2 + Math.sin(a) * 175;
    });
    map.me.fx = W / 2;
    map.me.fy = H / 2;
    nodes.filter((n) => n.kind === "leaf").forEach((l, i) => {
      const p = map[l.parent!];
      l.x = (p.x ?? W / 2) + Math.cos(i) * 40;
      l.y = (p.y ?? H / 2) + Math.sin(i) * 40;
    });
    const sim = forceSimulation(nodes)
      .force("link", forceLink<SimNode, SimLink>(links).distance((l) => (l.cross ? 170 : (l.source as SimNode).kind === "core" ? 200 : 86)).strength((l) => (l.cross ? 0.04 : 0.7)))
      .force("charge", forceManyBody<SimNode>().strength((n) => (n.kind === "leaf" ? -260 : -700)))
      .force("collide", forceCollide<SimNode>().radius((n) => radius(n) + (n.kind === "leaf" ? 34 : 46)))
      .force("x", forceX(W / 2).strength(0.04))
      .force("y", forceY(H / 2).strength(0.06))
      .stop();
    for (let i = 0; i < 400; i++) sim.tick();
    // Fit the view to where the layout actually landed, with room for labels.
    const xs = nodes.map((n) => n.x ?? 0), ys = nodes.map((n) => n.y ?? 0);
    const px = 130, py = 70; // horizontal room so side labels never clip
    const box = { x: Math.min(...xs) - px, y: Math.min(...ys) - py, w: Math.max(...xs) - Math.min(...xs) + px * 2, h: Math.max(...ys) - Math.min(...ys) + py * 2 };
    return { nodes, links, sim, box };
  }, []);

  // Gentle idle motion: a tiny re-heat that settles. Skipped under reduced motion.
  useEffect(() => {
    if (reduce) return;
    sim.on("tick", () => setFrame((f) => f + 1));
    return () => { sim.on("tick", null); sim.stop(); };
  }, [sim, reduce]);

  const toSvg = (e: React.PointerEvent) => {
    const svg = svgRef.current!;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM()!.inverse());
    return { x: p.x, y: p.y };
  };
  const onDown = (n: SimNode) => (e: React.PointerEvent) => {
    if (reduce || n.id === "me") return;
    (e.target as Element).setPointerCapture?.(e.pointerId);
    drag.current = n;
    sim.alphaTarget(0.25).restart();
  };
  const onMove = (e: React.PointerEvent) => {
    const n = drag.current;
    if (!n) return;
    const p = toSvg(e);
    n.fx = p.x;
    n.fy = p.y;
  };
  const onUp = () => {
    const n = drag.current;
    if (!n) return;
    n.fx = null;
    n.fy = null;
    drag.current = null;
    sim.alphaTarget(0);
  };

  const active = hover ?? sel;
  const near = useMemo(() => {
    const s = new Set([active]);
    links.forEach((l) => {
      const a = (l.source as SimNode).id, b = (l.target as SimNode).id;
      if (a === active) s.add(b);
      if (b === active) s.add(a);
    });
    return s;
  }, [active, links]);

  const tags = tagSet(sel);
  const hit = (t: string[]) => !tags || t.some((x) => tags.has(x));
  const cases = CASES.filter((c) => hit(c.tags));
  const lab = LAB.filter((e) => hit(e.tags));
  const repos = REPOS.filter((r) => hit(r.tags));
  const node = byId[sel];
  const related = node.id === "me" ? childrenOf("me") : [...childrenOf(node.id), ...(node.parent && node.parent !== "me" ? [byId[node.parent]] : [])];

  return (
    <div className="grid overflow-hidden rounded-2xl border border-line bg-bg-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.75fr)]">
      <div className="relative border-b border-line lg:border-b-0 lg:border-r">
        <svg
          ref={svgRef}
          viewBox={`${box.x} ${box.y} ${box.w} ${box.h}`}
          className="h-auto w-full touch-none select-none"
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={() => { onUp(); setHover(null); }}
          role="img"
          aria-label="Skills graph. Use the list beside it to choose a topic."
        >
          {links.map((l, i) => {
            const s = l.source as SimNode, t = l.target as SimNode;
            const on = near.has(s.id) && near.has(t.id) && (s.id === active || t.id === active);
            return (
              <line key={i} x1={s.x} y1={s.y} x2={t.x} y2={t.y}
                stroke={on ? "#72e6c1" : "#2a3441"} strokeOpacity={on ? 0.9 : l.cross ? 0.45 : 0.85}
                strokeDasharray={l.cross ? "3 4" : undefined} strokeWidth={on ? 1.4 : 1} />
            );
          })}
          {nodes.map((n) => {
            const isSel = n.id === sel;
            const dim = !near.has(n.id);
            const r = radius(n) * (compact ? 1.5 : 1);
            const branchy = n.kind !== "leaf";
            const showLabel = !compact || branchy; // phones: skills are listed as chips in the panel instead
            return (
              <g
                key={n.id}
                transform={`translate(${n.x} ${n.y})`}
                opacity={dim ? 0.35 : 1}
                className="cursor-pointer transition-opacity duration-300"
                onPointerDown={onDown(n)}
                onPointerEnter={() => setHover(n.id)}
                onPointerLeave={() => setHover(null)}
                onClick={() => {
                  setSel(n.id);
                  if (compact) panel.current?.scrollIntoView({ behavior: "smooth", block: "start" }); // results sit below the graph on phones
                }}
              >
                <circle r={r + 14} fill="transparent" />
                {isSel && <circle r={r + 7} fill="none" stroke="#72e6c1" strokeOpacity="0.55" />}
                <circle
                  r={r}
                  fill={n.kind === "core" ? "#72e6c1" : branchy ? "#10151c" : isSel ? "#72e6c1" : "#141a22"}
                  stroke={n.kind === "core" || isSel || (branchy && near.has(n.id)) ? "#72e6c1" : "#6b7582"}
                  strokeWidth={branchy ? 1.6 : 1.1}
                />
                {n.kind === "core" ? (
                  <text y={compact ? 8 : 3.5} textAnchor="middle" fontSize={compact ? 24 : 11} fontWeight="600" fill="#03140e" className="font-mono">{compact ? "KJ" : n.label.toUpperCase()}</text>
                ) : showLabel && (
                  <text {...labelPos(n, r, compact, k, branchy)} fontSize={(branchy ? 14 : 11.5) * (compact && !branchy ? 1.7 : k)} fontWeight={branchy ? 600 : 400}
                    fill={isSel || (hover === n.id) ? "#f3f5f7" : branchy ? "#c3cad3" : "#949eac"}
                    className={branchy ? "" : "font-mono"}>
                    {n.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="pointer-events-none flex flex-wrap gap-x-4 gap-y-1 px-4 pb-3 font-mono sm:absolute sm:bottom-3 sm:left-4 sm:p-0 text-[0.6875rem] text-dim">
          <span>● branch</span><span>· skill</span><span>– – cross-link</span>
          <span className="hidden sm:inline">drag to rearrange · click to filter</span>
          <span className="sm:hidden">tap a branch · skills listed below</span>
        </div>
      </div>

      <aside ref={panel} className="flex scroll-mt-20 max-h-none flex-col p-6 lg:max-h-[640px] lg:overflow-y-auto" aria-live="polite">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim">{node.kind === "core" ? "Everything" : node.kind === "branch" ? "Area" : `Skill · ${byId[node.parent!]?.label}`}</p>
        <h2 className="mt-1 text-[1.5rem] font-semibold tracking-[-0.02em]">{node.label}</h2>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-mute">{node.blurb}</p>

        <nav aria-label="Topics" className="mt-5 flex flex-wrap gap-1.5">
          {sel !== "me" && (
            <button onClick={() => setSel("me")} className="min-h-8 rounded-full border border-line-2 px-3 font-mono text-[0.6875rem] text-mute hover:text-ink">← all</button>
          )}
          {related.map((r) => (
            <button key={r.id} onClick={() => setSel(r.id)} className="min-h-8 rounded-full border border-line-2 px-3 font-mono text-[0.6875rem] text-ink-2 hover:border-accent hover:text-accent">
              {r.label}
            </button>
          ))}
        </nav>

        <Group title="Case studies" count={cases.length}>
          {cases.map((c) => (
            <Link key={c.slug} href={`/work/${c.slug}/`} className="block rounded-lg border border-line bg-surface px-3.5 py-2.5 transition-colors hover:border-accent/45">
              <b className="block text-[0.88rem] font-medium">{c.title}</b>
              <span className="font-mono text-[0.6875rem] text-dim">{c.status}</span>
            </Link>
          ))}
        </Group>
        <Group title="Experiments" count={lab.length}>
          {lab.map((e) => (
            <Link key={e.slug} href={`/lab/#${e.slug}`} className="block rounded-lg border border-line bg-surface px-3.5 py-2.5 transition-colors hover:border-accent/45">
              <b className="block text-[0.86rem] font-medium">{e.title}</b>
              <span className="font-mono text-[0.6875rem] text-dim">{e.area}</span>
            </Link>
          ))}
        </Group>
        <Group title="Repositories" count={repos.length}>
          {repos.map((r) => (
            <a key={r.name} href={`${GH}/${r.name}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-2 rounded-lg border border-line px-3.5 py-2 font-mono text-[0.76rem] text-ink-2 transition-colors hover:border-accent/45">
              {r.name} <ArrowUpRight className="h-3.5 w-3.5 text-dim" aria-hidden />
            </a>
          ))}
        </Group>
      </aside>
    </div>
  );
}

function Group({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  if (!count) return null;
  return (
    <section className="mt-6">
      <h3 className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-dim">
        {title} <span className="text-accent">{count}</span>
      </h3>
      <div className="grid gap-1.5">{children}</div>
    </section>
  );
}
