// Curated public repositories for the "Engineering proof" section.
// `evidence` is the headline measured result from each README (null when the README states none).

export type Repo = { name: string; does: string; area: string; language: string; evidence: string | null; tags: string[] };

export const GH = "https://github.com/kavya2693";

export const REPOS: Repo[] = [
  { name: "ontoloop", does: "Agent loop that repairs an extracted safety record until SHACL validates it.", area: "Agents · SHACL", language: "Python", evidence: "3B model 0% → 85% conformant", tags: ["agentic", "shacl", "eval", "llms", "guardrails"] },
  { name: "blastradius", does: "Column-level lineage across SQL and Python: see what breaks before you change a column.", area: "Lineage · static analysis", language: "Python", evidence: "100% precision · 90% recall · 42 tests", tags: ["governance", "ks"] },
  { name: "mdm-entity-resolution", does: "Fragmented HCP records → golden records with survivorship, scored vs ground truth.", area: "Entity resolution", language: "Python", evidence: "P 0.93 · R 0.84 · F1 0.88", tags: ["er", "c360", "eval"] },
  { name: "global-flood-hotspots", does: "Provenance-validated flood dataset for 12 regions, and why rainfall→extent can't be fit.", area: "Geospatial · provenance", language: "Python", evidence: "2 / 48 events paired · ρ −0.76 · 57 tests", tags: ["geo", "riskmodel", "eval"] },
  { name: "landcover-spatial-cv", does: "EuroSAT land-cover with spatial cross-validation on 50 km held-out blocks.", area: "Computer vision · EO", language: "Python", evidence: "95.8% spatial accuracy · κ 0.953", tags: ["cv", "spatialcv", "satellite", "geo"] },
  { name: "crypto-risk-kg", does: "Crypto-asset knowledge graph with PQC risk scoring and guarded on-prem NL→Cypher.", area: "Knowledge graph · security", language: "Python", evidence: "~6,400-node graph · 12 guarded intents", tags: ["ks", "neo4j", "shacl", "graphrag", "riskmodel", "guardrails"] },
  { name: "customer360-ontology-graph", does: "OWL ontology, SHACL ingestion gate, graph analytics and cited NL→Cypher answers.", area: "Ontology · Graph-RAG", language: "Python", evidence: null, tags: ["ontology", "owl", "shacl", "graphrag", "c360", "neo4j", "recsys"] },
  { name: "commercial-metadata-catalog", does: "Glossary, catalog and lineage — a slide traces back to its MLR approval.", area: "Governance · lineage", language: "Python", evidence: null, tags: ["governance", "ks"] },
  { name: "governed-slide-generator", does: "Generates decks from approved claims only, with slide-level lineage, via FastAPI.", area: "Governed GenAI", language: "Python", evidence: "3 approved rendered · 1 draft refused", tags: ["guardrails", "governance", "serving"] },
  { name: "pharma-commercial-datamodel", does: "One domain modelled as 3NF, a dimensional warehouse with SCD-2, and a graph.", area: "Data modelling", language: "Python", evidence: "5,000 / 5,000 engagements conserved", tags: ["ks", "rdf", "c360", "features"] },
  { name: "gulf-shield-osint", does: "Arabic OSINT classifier plus Sentinel-1 SAR change detection.", area: "Multimodal · SAR", language: "Python", evidence: null, tags: ["mm", "satellite", "cv"] },
  { name: "youtube-summarizer", does: "Video intelligence: Whisper transcripts, summaries and visual analysis behind FastAPI.", area: "Multimodal · GenAI", language: "Python", evidence: null, tags: ["mm", "speech", "llms", "serving"] },
  { name: "agentic-supply-planning", does: "Demand forecasts turned into budgeted, approved purchase orders by a LangGraph supervisor and four agents.", area: "Agents · supply chain", language: "Python", evidence: "WAPE 8.4% vs 19.6% naive · 88% touchless POs", tags: ["agentic", "forecasting", "planning", "guardrails"] },
  { name: "shelf-vision", does: "CCTV shelf frames to planogram compliance, store tasks and replenishment, with a 3D store twin (in progress).", area: "Computer vision · retail", language: "Python", evidence: "mAP50 0.976 · false alerts 6.1% → 0% smoothed", tags: ["cv", "agentic", "eval", "serving"] },
  { name: "retail-demand-forecasting", does: "Store × SKU replenishment forecasting with a with/without-graph ablation.", area: "Forecasting · graph features", language: "Python", evidence: "WMAPE 0.227 → 0.183 · graph lift +0.4%", tags: ["forecasting", "features", "ontology", "eval"] },
  { name: "ecommerce-intel", does: "Daily Noon UAE and Amazon.ae price and review tracker that ranks product candidates and fails loudly.", area: "Data collection · e-commerce", language: "TypeScript", evidence: "115 daily runs · 57% of terms collected", tags: ["pipelines", "product"] },
  { name: "uae-business-mcp", does: "MCP server that makes a local UAE business usable by AI agents (in progress).", area: "Agents · MCP", language: "TypeScript", evidence: null, tags: ["agentic", "tools"] },
];
