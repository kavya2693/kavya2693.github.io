// Lab: experiments, each framed as a question with a measured answer.
// Results are copied from the repo READMEs / result files — including the unflattering ones.

export type Experiment = {
  slug: string;
  title: string;
  area: string;
  question: string;
  approach: string;
  experiment: string;
  result: string;
  verdict: "confirmed" | "mixed" | "refuted" | "built";
  code?: string;
  caseStudy?: string;
  tags: string[];
};

export const LAB: Experiment[] = [
  {
    slug: "verifier-vs-model-size",
    title: "Can a 3B model + a verifier beat a 14B model?",
    area: "Agent architecture · LLM evaluation",
    question: "Can a deterministic SHACL validator replace an LLM judge as the stop condition — and does structural validity imply factual correctness?",
    approach: "Extract → RDF → validate against SHACL + SPARQL rules; violations become repair instructions; loop until conformant, 4 rounds, or no progress.",
    experiment: "20 synthetic adverse-event narratives, Ollama on CPU, temperature 0. Four arms: llama3.2 3B, phi4 14B, each with and without the loop.",
    result: "3B + loop: 0% → 85% conformant (17/20), beating the 14B's 65%. But repair improved accuracy on 0 of 20 cases and the 14B fell from 85.5% to 83.5%.",
    verdict: "mixed",
    code: "https://github.com/kavya2693/ontoloop",
    caseStudy: "/work/ontoloop/",
    tags: ["agentic", "llms", "eval", "guardrails", "shacl", "sparql", "ks"],
  },
  {
    slug: "random-vs-spatial-cv",
    title: "Do random splits overstate satellite accuracy?",
    area: "Geospatial ML · Model comparison",
    question: "Does a random train/val split overstate land-cover accuracy versus holding out whole geographic blocks — and does leakage grow with model capacity?",
    approach: "Recovered coordinates of all 27,000 EuroSAT patches from GeoTIFF metadata; held out whole 50 km blocks; compared frozen ResNet18, fine-tuned ResNet18 and ViT-tiny on identical folds.",
    experiment: "10 classes, Sentinel-2 patches; random 80/20 vs spatial 50 km blocks; single holdout per condition on laptop CPU.",
    result: "Frozen ResNet18: no gap (85.2% vs 85.6%). Full fine-tune: 96.4% random vs 95.8% spatial (+0.7%). ViT-tiny reaches 96.1% spatial with half the parameters.",
    verdict: "mixed",
    code: "https://github.com/kavya2693/landcover-spatial-cv",
    tags: ["geo", "spatialcv", "cv", "satellite", "eval", "mm", "aml"],
  },
  {
    slug: "rainfall-to-extent",
    title: "Can rainfall predict flooded area?",
    area: "Geospatial · Data provenance",
    question: "Is there enough sourced data to fit a rainfall → inundated-extent relationship across the world's worst flood regions?",
    approach: "Wrote the provenance validator first — every figure needs a URL, evidence tier and method — then built the dataset to pass it, with a model that refuses to fit on too few points.",
    experiment: "12 regions (2 in the UAE), 48 events 2000–2025, 57 tests.",
    result: "Only 2 of 48 events have both numbers, so the model raises NotEstimable. Rainfall and extent coverage are anti-correlated across sites: ρ −0.76, p = 0.0042.",
    verdict: "refuted",
    code: "https://github.com/kavya2693/global-flood-hotspots",
    caseStudy: "/work/flood-intelligence/",
    tags: ["geo", "riskmodel", "eval", "aml"],
  },
  {
    slug: "graph-features-forecasting",
    title: "Do graph features help demand forecasting?",
    area: "Applied ML · Graph features",
    question: "Do substitute, complement and store-similarity features from a product/store graph improve LightGBM — especially for brand-new SKUs?",
    approach: "OWL ontology → product/store graph → SVD embeddings, centrality and neighbour-demand features; three-arm ablation: seasonal-naive, LightGBM, LightGBM + graph.",
    experiment: "Simulated 6 stores × 200 SKUs × 730 days; time holdout with a 7-day embargo; cold-start subsets by item age.",
    result: "LightGBM beats naive (WMAPE 0.2273 → 0.1838). Graph lift is small: +0.4% overall, +2.1% on items under 14 days old (n = 1,662); 0.3% of total gain.",
    verdict: "mixed",
    caseStudy: "/work/demand-forecasting/",
    tags: ["forecasting", "features", "aml", "ks", "eval"],
  },
  {
    slug: "column-blast-radius",
    title: "Can lineage cross from SQL into application code?",
    area: "Data lineage · Static analysis",
    question: "Can static analysis join warehouse lineage with Python consumers so “what breaks if I change this column” becomes a reachability query?",
    approach: "Parse DDL, model SQL (SELECT * resolved, CTEs walked), Python string SQL and pandas access into one graph; refuse to attribute ambiguous columns rather than guess.",
    experiment: "Synthetic pharma fixture plus dbt jaffle-shop in CI; 30 hand-labelled column references; 42 tests.",
    result: "100% precision, 90% recall (27/30). All 3 misses are runtime-built names. The first version extracted zero columns from jaffle-shop — four bugs, now guarded in CI.",
    verdict: "confirmed",
    code: "https://github.com/kavya2693/blastradius",
    tags: ["governance", "ks", "eval"],
  },
  {
    slug: "precision-first-er",
    title: "How precise can HCP entity resolution be?",
    area: "Entity resolution · Master data",
    question: "How accurately can fragmented healthcare-professional records merge into golden records without merging two people who share a name?",
    approach: "Block on surname key; NPI or email decide deterministically; otherwise fuzzy names plus one corroborating field; union-find clusters; survivorship CRM > offline > web.",
    experiment: "220 true entities, ~435 fragmented records across 3 sources; the run fails below F1 0.85.",
    result: "Pairwise precision ~0.93, recall ~0.84, F1 ~0.88 — precision favoured on purpose, because over-merging two real doctors is the worse error.",
    verdict: "confirmed",
    code: "https://github.com/kavya2693/mdm-entity-resolution",
    caseStudy: "/work/healthcare-360/",
    tags: ["er", "c360", "ks", "eval"],
  },
  {
    slug: "local-nl2cypher",
    title: "Which guardrails fix a small local NL→Cypher model?",
    area: "Graph-RAG · Local LLMs",
    question: "Can a 7B model on CPU write correct read-only Cypher over an ontology-backed graph, and which non-model fixes matter most?",
    approach: "RML → RDF → SHACL gate → Neo4j; qwen2.5-coder:7b with JSON-schema output, read-only guard, few-shot retrieval, entity linking, schema pruning and a deterministic direction corrector.",
    experiment: "Small sample ontology (47 instance triples); hand-checked questions per phase. Not yet a held-out benchmark.",
    result: "5/5 NL→Cypher, 5/5 harder grounding and 4/4 agentic questions correct. The deterministic corrector fixed a reversed edge that LLM self-retry did not.",
    verdict: "built",
    tags: ["graphrag", "llms", "guardrails", "neo4j", "ontology", "shacl", "rag", "ks"],
  },
  {
    slug: "governed-generation",
    title: "Can a generator refuse unapproved claims?",
    area: "Governed GenAI · Lineage",
    question: "Can market-specific decks be generated so every claim is MLR-approved and traceable to its source?",
    approach: "Content as data with an approval status and source reference; render behind an approval gate; lineage written to speaker notes and a sidecar JSON; served by FastAPI.",
    experiment: "Three approved claims and one in-review draft for a UAE market deck.",
    result: "Renders the three approved claims, refuses the draft, and ties every slide to its approval ID. A mechanism demo, not a production benchmark.",
    verdict: "confirmed",
    code: "https://github.com/kavya2693/governed-slide-generator",
    caseStudy: "/work/content-intelligence/",
    tags: ["guardrails", "governance", "llms", "serving"],
  },
  {
    slug: "arabic-osint-sar",
    title: "Arabic OSINT + desert SAR change detection",
    area: "Multimodal · Arabic NLP · SAR",
    question: "Can an Arabic-native text classifier and a desert-tuned SAR change detector feed one alerting pipeline?",
    approach: "LoRA-tuned CAMeLBERT (6 labels) for Arabic text; Siamese U-Net (ResNet34) on Sentinel-1 image pairs; alerts fused in a Streamlit dashboard.",
    experiment: "300 synthetic labelled Arabic sentences in the repo; LoRA r = 16, α = 32.",
    result: "Pipeline built end-to-end. Not yet evaluated on real data — no accuracy is claimed.",
    verdict: "built",
    code: "https://github.com/kavya2693/gulf-shield-osint",
    tags: ["mm", "satellite", "cv", "llms", "geo"],
  },
];
