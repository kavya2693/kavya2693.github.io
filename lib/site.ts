// Site-wide facts: identity, links, credibility strip, lifecycle, stack, timeline.
// Every fact here is traceable to the master résumé or a public repository.

export const SITE = {
  name: "Kavyasri Jadala",
  url: "https://kavya2693.github.io",
  title: "Kavyasri Jadala — AI systems, knowledge graphs, applied ML",
  description:
    "Senior AI engineer building agentic AI, knowledge graphs, Graph-RAG and applied ML systems — from data and models through evaluation and production.",
  email: "kavyasri.2693@gmail.com",
  github: "https://github.com/kavya2693",
  linkedin: "https://www.linkedin.com/in/kavyasri-jadala",
  location: "Dubai, UAE",
};

export const NAV = [
  { href: "/work/", label: "Work" },
  { href: "/graph/", label: "Graph" },
  { href: "/lab/", label: "Lab" },
  { href: "/about/", label: "About" },
];

export const CRED = [
  { value: "8+ years", label: "data, ML and AI in production" },
  { value: "Purdue MS", label: "Business Analytics & Information Mgmt" },
  { value: "20+ systems", label: "unified into one enterprise knowledge graph" },
  { value: "6 domains", label: "pharma, claims, retail, e-commerce, energy, cities" },
];

export const FOCUS = ["Knowledge Graphs", "Agentic AI", "Applied ML", "Multimodal", "AI Evaluation", "Production Systems"];

export type Stage = { name: string; does: string; artifacts: string[] };

export const LIFECYCLE: Stage[] = [
  { name: "Discover", does: "Find the decision the system serves and the data that actually exists.", artifacts: ["decision owner", "baseline", "success metric"] },
  { name: "Model the domain", does: "Write the meaning down before writing code.", artifacts: ["ontology", "entity model", "SHACL shapes"] },
  { name: "Build the data layer", does: "Ingest, resolve identities, validate on load.", artifacts: ["entity resolution", "lineage", "feature store"] },
  { name: "Train · retrieve · reason", does: "Pick the cheapest method that clears the bar.", artifacts: ["LightGBM", "hybrid retrieval", "agents + tools"] },
  { name: "Evaluate", does: "Golden sets, two metrics that can disagree, the embarrassing test.", artifacts: ["golden set", "groundedness", "ablations"] },
  { name: "Deploy", does: "Behind an API, with access control and a rollback path.", artifacts: ["FastAPI", "Docker", "MLflow registry"] },
  { name: "Observe", does: "Watch drift, latency, cost and the questions it fails.", artifacts: ["PSI drift", "P95 latency", "token cost"] },
  { name: "Improve", does: "Failures become test cases; test cases become the next release.", artifacts: ["error taxonomy", "regression set", "retraining"] },
];

export const STACK: { group: string; items: string[] }[] = [
  { group: "AI systems", items: ["LLMs", "RAG", "Agents", "VLMs", "PyTorch", "TensorFlow", "LangChain"] },
  { group: "Knowledge systems", items: ["RDF", "OWL", "SHACL", "SPARQL", "LinkML", "Ontologies", "Entity resolution"] },
  { group: "Graph", items: ["AWS Neptune", "Neo4j", "Cypher", "GraphQL", "Graph-RAG", "Graph ML"] },
  { group: "Data", items: ["Python", "SQL", "Spark", "Databricks", "Microsoft Fabric", "FAISS · Pinecone"] },
  { group: "Production", items: ["AWS", "Azure", "GCP", "Docker", "FastAPI", "Airflow · MLflow", "Monitoring"] },
];

export type Role = { when: string; org: string; title: string; what: string };

export const TIMELINE: Role[] = [
  { when: "Now", org: "Healthcare claims AI", title: "Knowledge graph & document AI", what: "Linking medical receipts to the claims built from them, with extraction, schema validation and human review." },
  { when: "2026", org: "Dalfin.AI · Dubai", title: "Lead Data Scientist", what: "Demand forecasting across 4,000+ SKUs × 33 stores; an agentic application-generation platform; geospatial site selection." },
  { when: "2024 — 26", org: "Bristol Myers Squibb", title: "Senior Manager, Data Science", what: "Enterprise knowledge graph over 20+ commercial systems, Graph-RAG, entity resolution, GenAI for market access." },
  { when: "2023 — 24", org: "Purdue University", title: "MS · Data Scientist, industry partners", what: "Vehicle-routing optimisation for a 300-vehicle fleet, shelf vision with YOLOv8, speech-alignment research presented at INFORMS 2024." },
  { when: "2021 — 23", org: "Noon · Dubai", title: "Analytics Manager", what: "E-commerce logistics and operations analytics." },
  { when: "2019 — 21", org: "Shell", title: "Senior Data Analyst, Supply Planning", what: "Inventory, pricing and supply planning; demand forecasting." },
];
