// The skills graph that drives /graph. A node's id is also a tag: any case,
// lab experiment or repository carrying that tag is listed when the node is selected.

export type GNode = {
  id: string;
  label: string;
  kind: "core" | "branch" | "leaf";
  parent?: string;
  blurb: string;
};

export const GRAPH_NODES: GNode[] = [
  { id: "me", label: "Kavyasri", kind: "core", blurb: "Every system on this site, in one place." },

  { id: "ks", label: "Knowledge Systems", kind: "branch", parent: "me", blurb: "Ontologies, governed graphs and the retrieval built on them." },
  { id: "agentic", label: "Agentic AI", kind: "branch", parent: "me", blurb: "LLMs that plan, call tools and repair their own output — under a verifier." },
  { id: "aml", label: "Applied ML", kind: "branch", parent: "me", blurb: "Classical and deep models where a number has to be right." },
  { id: "mm", label: "Multimodal", kind: "branch", parent: "me", blurb: "Images, screenshots, satellite radar, audio and text together." },
  { id: "geo", label: "Geospatial", kind: "branch", parent: "me", blurb: "Terrain, rainfall, imagery and location as first-class data." },
  { id: "mlops", label: "MLOps", kind: "branch", parent: "me", blurb: "Serving, retraining, promotion and monitoring." },
  { id: "product", label: "AI Product", kind: "branch", parent: "me", blurb: "Choosing the problem, the metric and the build-vs-buy call." },

  { id: "rdf", label: "RDF", kind: "leaf", parent: "ks", blurb: "Triples as the interchange format between systems." },
  { id: "owl", label: "OWL", kind: "leaf", parent: "ks", blurb: "Class hierarchies and relationships with formal meaning." },
  { id: "shacl", label: "SHACL", kind: "leaf", parent: "ks", blurb: "Shapes that reject bad data at the door." },
  { id: "sparql", label: "SPARQL", kind: "leaf", parent: "ks", blurb: "Queries and rules a schema alone cannot express." },
  { id: "ontology", label: "Ontology", kind: "leaf", parent: "ks", blurb: "The domain written down before the code." },
  { id: "er", label: "Entity Resolution", kind: "leaf", parent: "ks", blurb: "One golden record from many fragmented IDs." },
  { id: "neo4j", label: "Neo4j", kind: "leaf", parent: "ks", blurb: "Property graphs, Cypher and graph algorithms." },
  { id: "neptune", label: "AWS Neptune", kind: "leaf", parent: "ks", blurb: "Managed RDF graph for enterprise workloads." },
  { id: "graphrag", label: "Graph-RAG", kind: "leaf", parent: "ks", blurb: "Natural-language questions answered from the graph, with citations." },

  { id: "llms", label: "LLMs", kind: "leaf", parent: "agentic", blurb: "Hosted and local models, chosen per task and budget." },
  { id: "tools", label: "Tools", kind: "leaf", parent: "agentic", blurb: "Agents that act through typed, validated interfaces." },
  { id: "planning", label: "Planning", kind: "leaf", parent: "agentic", blurb: "Decomposing a goal into checkable steps." },
  { id: "memory", label: "Memory", kind: "leaf", parent: "agentic", blurb: "State that survives across steps — often a graph." },
  { id: "rag", label: "RAG", kind: "leaf", parent: "agentic", blurb: "Retrieval that grounds generation in sources." },
  { id: "eval", label: "Evaluation", kind: "leaf", parent: "agentic", blurb: "Golden sets, ablations and metrics that can disagree." },
  { id: "guardrails", label: "Guardrails", kind: "leaf", parent: "agentic", blurb: "Deterministic checks between a model and the world." },

  { id: "forecasting", label: "Forecasting", kind: "leaf", parent: "aml", blurb: "Hierarchical demand forecasts at SKU × store scale." },
  { id: "recsys", label: "Recommendation", kind: "leaf", parent: "aml", blurb: "Ranking with eligibility rules kept separate from relevance." },
  { id: "riskmodel", label: "Risk Modeling", kind: "leaf", parent: "aml", blurb: "Scoring exposure — crypto assets, flood cells." },
  { id: "features", label: "Feature Engineering", kind: "leaf", parent: "aml", blurb: "Lags, hierarchies, graph features, point-in-time correct." },

  { id: "vlm", label: "VLMs", kind: "leaf", parent: "mm", blurb: "Screenshots and designs as model input." },
  { id: "cv", label: "Computer Vision", kind: "leaf", parent: "mm", blurb: "Detection, segmentation and change detection." },
  { id: "speech", label: "Speech", kind: "leaf", parent: "mm", blurb: "Transcription and audio alignment." },

  { id: "satellite", label: "Satellite / SAR", kind: "leaf", parent: "geo", blurb: "Sentinel-1 radar and optical imagery." },
  { id: "spatialcv", label: "Spatial CV", kind: "leaf", parent: "geo", blurb: "Validation that blocks spatial leakage." },

  { id: "serving", label: "APIs & Serving", kind: "leaf", parent: "mlops", blurb: "FastAPI endpoints with model metadata." },
  { id: "pipelines", label: "Pipelines", kind: "leaf", parent: "mlops", blurb: "Airflow, MLflow and Docker for retrain → promote." },

  { id: "c360", label: "Customer 360", kind: "leaf", parent: "product", blurb: "One view of a customer across every system." },
  { id: "governance", label: "Governance & Lineage", kind: "leaf", parent: "product", blurb: "Who approved it, where it came from, what it breaks." },
];

/** Cross-links in addition to parent → child edges. */
export const GRAPH_LINKS: [string, string][] = [
  ["graphrag", "rag"], ["eval", "aml"], ["riskmodel", "geo"], ["satellite", "cv"],
  ["er", "c360"], ["shacl", "guardrails"], ["vlm", "llms"], ["forecasting", "pipelines"],
  ["governance", "shacl"], ["memory", "ks"],
];
