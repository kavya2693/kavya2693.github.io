// "Supply chain & applied AI" page (/supply-chain/) and the home-page feature.
// Problem line and headline result come from REPOS in lib/repos.ts (headline copied from each
// README's "At a glance" table). Stack chips come from each repo's pyproject.toml and README.
// Each repo hosts its walkthrough video and audit report under docs/demo/.

import { REPOS, GH, type Repo } from "@/lib/repos";

export type Theme = { id: string; label: string; blurb: string };

export const THEMES: Theme[] = [
  { id: "forecasting", label: "Forecasting & demand", blurb: "Which model to trust per SKU, and forecasts judged by the stock they let you hold." },
  { id: "inventory", label: "Inventory & supply planning", blurb: "Buffers, policies and capacity plans tested against the same demand before anything changes." },
  { id: "routing", label: "Routing & last mile", blurb: "Vehicle routing, dispatch and the experiment that says what actually moved." },
  { id: "commercial", label: "Pricing & commercial", blurb: "Markdowns, order margin, targeting and next-best-action, each priced in money." },
  { id: "agents", label: "Agents & LLM platforms", blurb: "LLM cost control and agentic data engineering, scored against a known answer." },
  { id: "reliability", label: "Reliability", blurb: "Maintenance scheduled by expected savings under a fixed crew." },
];

type Meta = { name: string; title: string; theme: Theme["id"]; stack: string[] };

const META: Meta[] = [
  { name: "intermittent-demand-forecasting", title: "Intermittent demand forecasting", theme: "forecasting", stack: ["LightGBM", "statsforecast", "Croston · TSB · ETS", "pandas"] },
  { name: "order-forecast-inventory", title: "Order forecasting for inventory", theme: "forecasting", stack: ["DuckDB SQL", "LightGBM", "XGBoost", "order-up-to policy"] },
  { name: "ddmrp-buffers", title: "DDMRP replenishment buffers", theme: "inventory", stack: ["DDMRP", "policy simulation", "pandas", "NumPy"] },
  { name: "supply-chain-twin", title: "Supply chain digital twin", theme: "inventory", stack: ["SimPy", "paired-seed harness", "SciPy", "pandas"] },
  { name: "peak-capacity-planner", title: "Peak-season capacity planner", theme: "inventory", stack: ["PuLP · CBC MIP", "DuckDB", "scikit-learn", "order replay"] },
  { name: "fleet-routing-cvrp", title: "Fleet routing (CVRP with time windows)", theme: "routing", stack: ["OR-Tools", "XGBoost", "statsmodels", "scikit-learn"] },
  { name: "last-mile-dispatch", title: "Last-mile dispatch", theme: "routing", stack: ["Hungarian assignment", "A/B test", "SciPy", "pandas"] },
  { name: "markdown-optimizer", title: "Markdown optimizer", theme: "commercial", stack: ["Poisson GLM", "empirical Bayes", "exhaustive search", "NumPy"] },
  { name: "order-outcome-margin", title: "Order outcome & margin", theme: "commercial", stack: ["LightGBM", "calibration", "unit economics", "scikit-learn"] },
  { name: "hcp-graph-targeting", title: "HCP graph targeting", theme: "commercial", stack: ["XGBoost", "NetworkX", "node2vec", "GraphSAGE"] },
  { name: "genai-recommender", title: "Governed next-best-action recommender", theme: "commercial", stack: ["BERT4Rec (PyTorch)", "gradient boosting", "governed RAG", "local LLM"] },
  { name: "llm-cost-router", title: "LLM cost router", theme: "agents", stack: ["Ollama", "Qwen2.5", "verifier cascade", "Python stdlib"] },
  { name: "agentic-pipeline-builder", title: "Agentic pipeline builder", theme: "agents", stack: ["dbt", "DuckDB", "Airflow", "state-machine agents"] },
  { name: "predictive-maintenance", title: "Predictive maintenance", theme: "reliability", stack: ["LightGBM", "lifelines (Cox)", "crew scheduler", "scikit-learn"] },
];

export type Applied = Meta & {
  repo: Repo;
  gif: string;
  links: { repo: string; video: string; audit: string };
};

const demo = (name: string, file: string) => `${GH}/${name}/blob/main/docs/demo/${file}`;

export const APPLIED: Applied[] = META.map((m) => {
  const repo = REPOS.find((r) => r.name === m.name);
  if (!repo) throw new Error(`lib/applied.ts: ${m.name} is missing from lib/repos.ts`);
  return {
    ...m,
    repo,
    gif: `/work-demos/${m.name}.gif`,
    links: { repo: `${GH}/${m.name}`, video: `/work-demos/${m.name}.mp4`, audit: demo(m.name, "AUDIT_REPORT.pdf") },
  };
});

/** The project featured on the home page. */
export const FEATURED = APPLIED.find((a) => a.name === "fleet-routing-cvrp")!;
