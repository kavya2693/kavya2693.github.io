// Case-study metadata. The long-form write-up for each lives in content/work/<slug>.mdx.
// Rule: every metric must trace to the résumé, a public repo, or the case write-up's sources.

export type Step = { t: string; d?: string };
/** A flow is a top-to-bottom pipeline; an array entry renders as parallel inputs on one row. */
export type FlowNode = Step | Step[];

export type Visibility = "public" | "enterprise" | "prototype";

export type Case = {
  slug: string;
  title: string;
  kicker: string;
  status: string;
  visibility: Visibility;
  role: string;
  problem: string;
  system: string;
  outcome: string;
  metrics: { value: string; label: string }[];
  flow: FlowNode[];
  flowLabel?: string;
  stack: string[];
  tags: string[]; // graph node ids — see lib/graph.ts
  links: { label: string; href: string }[];
  note?: string;
  home: boolean; // shown in "Selected systems" on the home page
};

export const ENTERPRISE_NOTE =
  "Architecture reconstructed with synthetic data; proprietary implementation excluded.";

export const CASES: Case[] = [
  {
    slug: "healthcare-360",
    title: "Healthcare 360 Intelligence",
    kicker: "Knowledge graph · Graph-RAG · AWS Neptune · LLMs",
    status: "Enterprise · Bristol Myers Squibb",
    visibility: "enterprise",
    role: "Architect and hands-on lead — semantic model, entity resolution, Graph-RAG, governance",
    problem:
      "Commercial customer data lived in 20+ systems with no shared meaning. Every business question became a bespoke SQL request, and two teams could get two answers.",
    system:
      "Entity resolution into a governed RDF/OWL model, SHACL-validated on load into AWS Neptune, with a Graph-RAG assistant that answers in natural language and cites its evidence.",
    outcome: "Replaced ~80% of recurring ad-hoc data requests; became the base for an HCP next-best-action design.",
    metrics: [
      { value: "20+", label: "source systems unified" },
      { value: "~80%", label: "recurring ad-hoc requests replaced" },
      { value: "Every load", label: "SHACL-validated before it reaches the graph" },
    ],
    flow: [
      [{ t: "CRM" }, { t: "Engagement" }, { t: "Web analytics" }, { t: "Offline" }],
      { t: "Entity resolution", d: "rules + fuzzy + embeddings · survivorship" },
      { t: "Semantic layer", d: "RDF / OWL ontology · SHACL gate" },
      { t: "Knowledge graph", d: "AWS Neptune · SPARQL" },
      { t: "Graph-RAG", d: "NL → governed query · hybrid retrieval" },
      { t: "Evidence-backed answer", d: "citations to source records" },
    ],
    flowLabel: "20+ systems → one governed answer",
    stack: ["AWS Neptune", "RDF / OWL", "SHACL", "SPARQL", "Graph-RAG", "Entity resolution", "LLMs"],
    tags: ["ks", "rdf", "owl", "shacl", "sparql", "er", "neptune", "graphrag", "ontology", "rag", "llms", "eval", "c360", "product"],
    links: [
      { label: "System design", href: "/hcp-nba-architecture.html" },
      { label: "Code · customer360-ontology-graph", href: "https://github.com/kavya2693/customer360-ontology-graph" },
      { label: "Code · mdm-entity-resolution", href: "https://github.com/kavya2693/mdm-entity-resolution" },
    ],
    note: ENTERPRISE_NOTE,
    home: true,
  },
  {
    slug: "agentic-app-generation",
    title: "Agentic Application Generation",
    kicker: "LLM agents · Code generation · Full-stack · AI platform",
    status: "Platform · Dalfin.AI",
    visibility: "enterprise",
    role: "Built the platform — domain model, agent orchestration, validation and governance",
    problem:
      "Every internal app re-models the domain by hand — schema, API, screens — and by the third iteration the layers no longer agree.",
    system:
      "A planner agent extracts the domain from a brief, deck, screenshot or Figma file into a graph; schema, API and UI agents generate from that one graph; 25 validators gate the output.",
    outcome: "A working generation platform, and a graph-native rebuild (GraphForge) that validates apps for any described domain.",
    metrics: [
      { value: "5", label: "input types incl. screenshots & Figma" },
      { value: "25", label: "automated validators per app" },
      { value: "4 / 4", label: "reference domains pass (2 after self-repair)" },
    ],
    flow: [
      [{ t: "Requirements" }, { t: "Screenshot" }, { t: "Figma" }],
      { t: "Planner agent", d: "domain extraction → knowledge graph IR" },
      [{ t: "Schema agent" }, { t: "API agent" }, { t: "UI agent" }],
      { t: "Validation", d: "25 validators · targeted repair" },
      { t: "Human approval", d: "governance gate" },
      { t: "Deployable application", d: "React · REST · database" },
    ],
    flowLabel: "One graph drives every agent",
    stack: ["Multi-agent orchestration", "Open-source LLMs", "VLM input", "Temporal KG (Graphiti)", "React", "REST"],
    tags: ["agentic", "llms", "tools", "planning", "memory", "guardrails", "vlm", "ks", "eval", "product", "mlops"],
    links: [],
    note: ENTERPRISE_NOTE,
    home: true,
  },
  {
    slug: "flood-intelligence",
    title: "Flood Intelligence",
    kicker: "Geospatial AI · Risk modelling · Data provenance",
    status: "Open research · urban twin in design",
    visibility: "public",
    role: "Sole author — research design, provenance validator, dataset, statistics",
    problem:
      "Cities need to know where water will collect, and what to do, before the storm. The obvious model — rainfall in, flooded area out — needs both numbers for the same flood.",
    system:
      "A provenance-enforced flood dataset across 12 regions (2 in the UAE) whose validator rejects any figure without a source, evidence tier and method — the foundation for an urban flood twin.",
    outcome: "Showed the planned regression cannot be fitted, and why: rainfall and extent are measured in different places (ρ −0.76).",
    metrics: [
      { value: "48", label: "flood events · 12 sites" },
      { value: "2 / 48", label: "have both rainfall & extent" },
      { value: "ρ −0.76", label: "coverage anti-correlation, p = 0.004" },
    ],
    flow: [
      [{ t: "Rainfall" }, { t: "Terrain" }, { t: "Roads" }, { t: "Buildings" }],
      { t: "Feature layer", d: "grid · drainage · land use" },
      { t: "Flood risk model", d: "blocked until paired data exist" },
      { t: "Hotspots", d: "ranked cells · drawdown time" },
      { t: "Ontology / agent layer", d: "assets, owners, interventions" },
      { t: "Investigation + actions", d: "scenario comparison" },
    ],
    flowLabel: "Target architecture · urban flood twin",
    stack: ["Python", "Geospatial", "Sentinel-1 / satellite", "Provenance validator", "Statistics"],
    tags: ["geo", "satellite", "riskmodel", "aml", "eval", "ontology", "agentic"],
    links: [{ label: "Code · global-flood-hotspots", href: "https://github.com/kavya2693/global-flood-hotspots" }],
    home: true,
  },
  {
    slug: "content-intelligence",
    title: "Governed Content Intelligence",
    kicker: "GenAI · Recommendation · Content lineage · Knowledge graph",
    status: "Enterprise · public companions",
    visibility: "enterprise",
    role: "Owned the content-lineage data product and GenAI market adaptation",
    problem:
      "In pharma, AI may only recommend or generate medically, legally and regulatory-approved content — and someone must prove which approved claim each sentence came from.",
    system:
      "A content graph linking every asset to its evidence, approval and use; generation constrained to approved material; slide-level lineage on every output.",
    outcome: "Per-market reimbursement-dossier adaptation fell from ~3 months to ~1 week across ~25 markets.",
    metrics: [
      { value: "~3 mo → 1 wk", label: "per-market dossier adaptation" },
      { value: "~25", label: "markets, incl. 6 low- & middle-income" },
      { value: "Slide-level", label: "lineage to source and approval" },
    ],
    flow: [
      { t: "Customer", d: "profile & specialty signals" },
      { t: "Interactions", d: "engagement history" },
      { t: "Content / metadata graph", d: "asset → claim → evidence → approval" },
      { t: "Ranking / recommendation", d: "eligibility first, relevance second" },
      { t: "Generated recommendation", d: "approved content only" },
      { t: "Evidence / content lineage", d: "every sentence traceable" },
    ],
    flowLabel: "Recommend only what can be traced",
    stack: ["GenAI", "Knowledge graph", "Lineage", "Recommendation", "FastAPI", "python-pptx"],
    tags: ["recsys", "llms", "rag", "ks", "guardrails", "c360", "product", "ontology"],
    links: [
      { label: "Code · commercial-metadata-catalog", href: "https://github.com/kavya2693/commercial-metadata-catalog" },
      { label: "Code · governed-slide-generator", href: "https://github.com/kavya2693/governed-slide-generator" },
    ],
    note: ENTERPRISE_NOTE,
    home: true,
  },
  {
    slug: "demand-forecasting",
    title: "Store × SKU Demand Forecasting",
    kicker: "Applied ML · Forecasting · LightGBM · MLOps",
    status: "Production · Dalfin.AI + research rebuild",
    visibility: "enterprise",
    role: "Lead data scientist — models, serving, retraining pipeline, graph-feature ablation",
    problem:
      "A large retailer replenishes 4,000+ SKUs across 33 stores. Per-series models do not scale, and naive forecasts ignore promotions, seasonality and how products steal demand from each other.",
    system:
      "Global LightGBM over lag, rolling and hierarchy features with a p90 quantile head for safety stock, served per SKU-store by FastAPI and retrained through Airflow + MLflow.",
    outcome: "In the simulated rebuild, LightGBM cuts WMAPE from 0.227 to 0.184 vs seasonal-naive; graph features add only +0.4%, and the write-up says so.",
    metrics: [
      { value: "4,000+ × 33", label: "SKUs × stores in production" },
      { value: "0.227 → 0.184", label: "WMAPE, naive → LightGBM (simulated rebuild)" },
      { value: "+0.4%", label: "graph-feature lift — small, and reported" },
    ],
    flow: [
      [{ t: "Sales history" }, { t: "Promotions" }, { t: "Calendar" }, { t: "Product / store graph" }],
      { t: "Feature pipeline", d: "lags · rolling stats · graph embeddings" },
      { t: "Global LightGBM", d: "point forecast + p90 quantile head" },
      { t: "Validation gate", d: "time holdout · 7-day embargo · vs naive" },
      { t: "MLflow registry", d: "promote on pass" },
      { t: "FastAPI forecasts", d: "SKU × store · confidence · metadata" },
    ],
    flowLabel: "From history to a served forecast",
    stack: ["Python", "SQL", "LightGBM", "XGBoost", "FastAPI", "Airflow", "MLflow", "Docker"],
    tags: ["aml", "forecasting", "features", "mlops", "pipelines", "serving", "eval", "ontology"],
    links: [],
    note: "Production system at Dalfin.AI is private. Rebuild metrics come from simulated data at demo scale (6 stores × 200 SKUs × 730 days).",
    home: true,
  },
  {
    slug: "ontoloop",
    title: "Self-Repairing Safety Extraction",
    kicker: "Agentic AI · SHACL · Local LLMs · Evaluation",
    status: "Open source",
    visibility: "public",
    role: "Sole author",
    problem:
      "Adverse-drug-event narratives must become structured records. A model will write one that reads perfectly and contains an invented date.",
    system:
      "An agent loop extracts to RDF and repairs until a SHACL validator accepts the graph. The verifier never calls a language model.",
    outcome: "A 3B model goes from 0% to 85% valid records — and the loop costs factual accuracy, which the benchmark shows.",
    metrics: [
      { value: "0% → 85%", label: "valid records, 3B model + loop" },
      { value: "85.5% → 83.5%", label: "accuracy cost of repair (14B)" },
      { value: "0", label: "LLM calls in the verifier" },
    ],
    flow: [
      { t: "Safety narrative" },
      { t: "LLM extraction", d: "local 3B / 14B" },
      { t: "RDF record" },
      { t: "SHACL + SPARQL rules", d: "deterministic verifier" },
      { t: "Violations → repair prompt", d: "until conformant or budget spent" },
      { t: "Conformant graph" },
    ],
    flowLabel: "Validator, not an opinion",
    stack: ["Python", "RDF", "SHACL", "SPARQL", "Local LLMs", "Benchmark harness"],
    tags: ["agentic", "llms", "guardrails", "eval", "ks", "rdf", "shacl", "sparql", "ontology"],
    links: [{ label: "Code · ontoloop", href: "https://github.com/kavya2693/ontoloop" }],
    home: false,
  },
];

export const caseBySlug = (slug: string) => CASES.find((c) => c.slug === slug);
