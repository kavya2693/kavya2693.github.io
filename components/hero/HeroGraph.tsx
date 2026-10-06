"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useReducedMotion } from "motion/react";
import { useCompact } from "@/components/ui/useCompact";

type HNode = { id: string; label: string; x: number; y: number; go: string; info: string; primary?: boolean; lp?: "b" | "t" | "l" | "r" };

// Positions in a 600×560 viewBox. `go` is the /graph node it opens.
const NODES: HNode[] = [
  { id: "kg", label: "Knowledge Graph", x: 300, y: 222, go: "ks", info: "Governed RDF/OWL model · SHACL on load · Neptune / Neo4j", primary: true, lp: "t" },
  { id: "ontology", label: "Ontology", x: 196, y: 96, go: "ontology", info: "The domain written down before the code", lp: "t" },
  { id: "graphrag", label: "Graph-RAG", x: 418, y: 108, go: "graphrag", info: "Natural-language questions → governed graph queries → cited answers", primary: true, lp: "t" },
  { id: "er", label: "Entity Resolution", x: 74, y: 222, go: "er", info: "Rules + fuzzy + embedding matching, survivorship, confidence scores", lp: "b" },
  { id: "llms", label: "LLMs", x: 540, y: 196, go: "llms", info: "Hosted and local models, chosen per task, cost and data sensitivity", lp: "b" },
  { id: "c360", label: "Customer 360", x: 132, y: 352, go: "c360", info: "One customer across 20+ commercial systems", lp: "b" },
  { id: "recsys", label: "Recommendation", x: 300, y: 350, go: "recsys", info: "Eligibility as a graph rule, relevance as a ranker", lp: "b" },
  { id: "agents", label: "AI Agents", x: 468, y: 318, go: "agentic", info: "Plan, call tools, repair output until a verifier passes", primary: true, lp: "r" },
  { id: "vlm", label: "VLM", x: 560, y: 418, go: "vlm", info: "Screenshots and Figma designs as agent input", lp: "b" },
  { id: "eval", label: "Evaluation", x: 388, y: 452, go: "eval", info: "Golden sets, ablations, two metrics that can disagree", primary: true, lp: "b" },
  { id: "forecasting", label: "Forecasting", x: 100, y: 474, go: "forecasting", info: "Global LightGBM across 4,000+ SKUs × 33 stores", lp: "b" },
  { id: "prodml", label: "Production ML", x: 244, y: 500, go: "mlops", info: "FastAPI serving · Airflow + MLflow retrain → promote", lp: "b" },
  { id: "geo", label: "Geospatial AI", x: 520, y: 520, go: "geo", info: "Rainfall, terrain, radar imagery, flood risk", lp: "b" },
];

const EDGES: [string, string][] = [
  ["ontology", "kg"], ["er", "kg"], ["c360", "er"], ["c360", "kg"], ["kg", "graphrag"], ["graphrag", "llms"],
  ["llms", "agents"], ["agents", "vlm"], ["agents", "graphrag"], ["agents", "eval"], ["graphrag", "eval"],
  ["recsys", "kg"], ["recsys", "c360"], ["forecasting", "prodml"], ["prodml", "eval"], ["geo", "agents"],
  ["geo", "prodml"], ["ontology", "graphrag"], ["recsys", "eval"],
];

// Phones get fewer nodes with short labels, drawn larger, so text stays ≥ 12px on screen.
const COMPACT: Record<string, string> = {
  kg: "Knowledge Graph", graphrag: "Graph-RAG", er: "Entities", c360: "Customer 360", agents: "Agents",
  llms: "LLMs", eval: "Evaluation", forecasting: "Forecasts", geo: "Geospatial", ontology: "Ontology",
};

// Edges that carry a slow travelling pulse: data flowing toward an answer.
const PULSES = [["er", "kg"], ["kg", "graphrag"], ["graphrag", "llms"], ["prodml", "eval"]] as const;

export function HeroGraph() {
  const reduce = useReducedMotion();
  const router = useRouter();
  const wrap = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [t, setT] = useState(0);
  const [hover, setHover] = useState<string | null>(null);
  const compact = useCompact();
  const nodes = compact ? NODES.filter((n) => COMPACT[n.id]) : NODES;
  const edges = compact ? EDGES.filter(([a, b]) => COMPACT[a] && COMPACT[b]) : EDGES;

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const onMove = (e: React.PointerEvent) => {
    const r = wrap.current?.getBoundingClientRect();
    if (!r) return;
    pointer.current = { x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 };
  };

  // Slow drift plus a slight parallax toward the cursor; primaries move least (they feel heavier).
  const pos = useMemo(() => {
    const m: Record<string, { x: number; y: number }> = {};
    NODES.forEach((n, i) => {
      const depth = n.primary ? 6 : 12;
      const dx = Math.sin(t * 0.32 + i * 1.7) * 4 + pointer.current.x * depth;
      const dy = Math.cos(t * 0.27 + i * 2.3) * 4 + pointer.current.y * depth;
      m[n.id] = { x: n.x + dx, y: n.y + dy };
    });
    return m;
  }, [t]);

  const neighbors = useMemo(() => {
    if (!hover) return null;
    const s = new Set([hover]);
    edges.forEach(([a, b]) => {
      if (a === hover) s.add(b);
      if (b === hover) s.add(a);
    });
    return s;
  }, [hover, edges]);

  const hovered = NODES.find((n) => n.id === hover);

  return (
    <div ref={wrap} onPointerMove={onMove} onPointerLeave={() => { pointer.current = { x: 0, y: 0 }; setHover(null); }} className="relative">
      <svg viewBox="0 0 600 560" className="h-auto w-full overflow-visible" role="img" aria-label="System graph: knowledge graph, Graph-RAG, agents, evaluation, entity resolution, forecasting and geospatial AI, and how they connect">
        <defs>
          <radialGradient id="hg-glow">
            <stop offset="0%" stopColor="#72e6c1" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#72e6c1" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={pos.kg.x} cy={pos.kg.y} r="150" fill="url(#hg-glow)" />

        {edges.map(([a, b]) => {
          const on = neighbors ? neighbors.has(a) && neighbors.has(b) && (a === hover || b === hover) : false;
          return (
            <line
              key={a + b}
              x1={pos[a].x} y1={pos[a].y} x2={pos[b].x} y2={pos[b].y}
              stroke={on ? "#72e6c1" : "#2a3441"}
              strokeOpacity={neighbors && !on ? 0.35 : 1}
              strokeWidth={on ? 1.4 : 1}
            />
          );
        })}

        {!reduce &&
          PULSES.filter(([a, b]) => nodes.some((n) => n.id === a) && nodes.some((n) => n.id === b)).map(([a, b], i) => {
            const p = ((t * 0.18 + i * 0.27) % 1 + 1) % 1;
            return <circle key={a + b} cx={pos[a].x + (pos[b].x - pos[a].x) * p} cy={pos[a].y + (pos[b].y - pos[a].y) * p} r="2" fill="#72e6c1" opacity={Math.sin(p * Math.PI) * 0.9} />;
          })}

        {nodes.map((n) => {
          const p = pos[n.id];
          const dim = neighbors && !neighbors.has(n.id);
          const isH = hover === n.id;
          const r = (n.primary ? 7 : 4.5) * (compact ? 1.5 : 1);
          const fs = compact ? 21 : 12.5;
          const lx = n.lp === "l" ? -r - 8 : n.lp === "r" ? r + 8 : 0;
          const ly = n.lp === "t" ? -r - 10 : n.lp === "b" ? r + fs + 4 : 4;
          const anchor = n.lp === "l" ? "end" : n.lp === "r" ? "start" : "middle";
          return (
            <g
              key={n.id}
              transform={`translate(${p.x} ${p.y})`}
              opacity={dim ? 0.3 : 1}
              className="cursor-pointer transition-opacity duration-300"
              tabIndex={0}
              role="link"
              aria-label={`${n.label}: ${n.info}. Open in graph.`}
              onPointerEnter={() => setHover(n.id)}
              onFocus={() => setHover(n.id)}
              onBlur={() => setHover(null)}
              onClick={() => router.push(`/graph/?focus=${n.go}`)}
              onKeyDown={(e) => e.key === "Enter" && router.push(`/graph/?focus=${n.go}`)}
            >
              <circle r="20" fill="transparent" />
              {(n.primary || isH) && <circle r={r + 6} fill="none" stroke="#72e6c1" strokeOpacity={isH ? 0.5 : 0.18} />}
              <circle r={r} fill={n.primary || isH ? "#72e6c1" : "#10151c"} stroke={n.primary || isH ? "#72e6c1" : "#949eac"} strokeWidth="1.3" />
              <text x={lx} y={ly} textAnchor={anchor} className="select-none font-mono" fontSize={fs} fill={isH || n.primary ? "#f3f5f7" : "#949eac"}>
                {compact ? COMPACT[n.id] : n.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div
        aria-hidden
        className={`pointer-events-none absolute left-0 right-0 bottom-0 mx-auto max-w-sm rounded-lg border border-line-2 bg-surface/95 px-3.5 py-2.5 text-[0.8rem] text-ink-2 shadow-[0_14px_40px_rgb(0_0_0/0.45)] transition-all duration-200 ${
          hovered ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        <b className="block font-semibold text-ink">{hovered?.label}</b>
        {hovered?.info}
        <span className="mt-1 block font-mono text-[0.6875rem] text-accent">click to open in the graph →</span>
      </div>
    </div>
  );
}
