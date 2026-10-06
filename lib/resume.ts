// Résumé content, condensed from the master résumé. Contact line deliberately omits the phone number.

export const RESUME_HEADLINE = "Senior AI Engineer · Knowledge Graphs · Agentic AI · Applied ML";

export const RESUME_SUMMARY =
  "8+ years building production data, ML and AI systems across pharma, healthcare claims, retail, e-commerce logistics and energy — enterprise knowledge graphs and Graph-RAG, agentic application generation, forecasting and optimisation, with the evaluation and MLOps to run them. MS, Purdue University. UAE Golden Visa.";

export type Job = { org: string; place: string; title: string; when: string; bullets: string[] };

export const JOBS: Job[] = [
  {
    org: "Dalfin.AI", place: "Dubai, UAE", title: "Lead Data Scientist", when: "Feb 2026 – Jun 2026",
    bullets: [
      "Designed and deployed a demand-forecasting platform across 4,000+ SKUs and 33 stores for a large Philippine retail conglomerate, using global and hierarchical LightGBM/XGBoost models.",
      "Served SKU-store forecasts with confidence and model metadata through FastAPI; automated ingestion, retraining, validation and promotion with Airflow, MLflow and Docker.",
      "Built an AI application-development platform turning requirements, decks, screenshots and Figma designs into deployable full-stack apps via schema-first domain modelling, multi-agent code generation, automated validation and human-in-the-loop governance.",
      "Built geospatial network planning combining forecasts, trade areas, mobility data, H3 indexing and PostGIS to rank expansion sites and quantify cannibalisation.",
    ],
  },
  {
    org: "Bristol Myers Squibb", place: "New Jersey, USA", title: "Senior Manager, Data Science", when: "Jul 2024 – Jan 2026",
    bullets: [
      "Architected an enterprise knowledge graph integrating 20+ commercial systems on AWS Neptune with RDF, OWL, SHACL and governed semantic models.",
      "Built a Graph-RAG assistant translating business questions into governed, citation-supported graph queries, replacing ~80% of recurring ad-hoc data requests.",
      "Engineered deterministic and probabilistic entity resolution across CRM, offline engagement and web analytics with confidence scoring and survivorship.",
      "Built segmentation and customer-lifetime-value models contributing to a 15% improvement in sales conversion; built an in-house voice-analytics pipeline projected to save ~$600K a year.",
    ],
  },
  {
    org: "Purdue Corporate Partners", place: "West Lafayette, IN, USA", title: "Data Scientist, Consultant", when: "Aug 2023 – May 2024",
    bullets: [
      "Built a capacitated vehicle-routing model with time windows for a 300-vehicle J.B. Hunt fleet, cutting peak-period misrouted shipments 20% (~$300K a year).",
      "Built shelf-intelligence vision with YOLOv8 and Faster R-CNN for planogram compliance at Meijer.",
      "Developed Transformer and wav2vec2 audio-text alignment for under-represented languages (~90% accuracy); presented at INFORMS Analytics 2024.",
    ],
  },
  {
    org: "Noon.com", place: "Dubai, UAE", title: "Analytics Manager", when: "Jun 2021 – Aug 2023",
    bullets: [
      "Reduced daily delivery-demand forecasting MAPE from 25% to 18% across e-commerce, grocery and quick-commerce.",
      "Owned demand, capacity and cost forecasting for a $40M+ annual logistics budget across the UAE, Saudi Arabia and Egypt.",
      "Embedded model scores into operational APIs and workflows; designed A/B tests for routing and delivery features; led a team of 21.",
    ],
  },
  {
    org: "Royal Dutch Shell", place: "Gurgaon, India", title: "Senior Data Analyst, Supply Planning", when: "May 2019 – Jun 2021",
    bullets: [
      "Built inventory-optimisation and demand-forecasting models for 800+ products, reducing days inventory outstanding from ~300 to 120 (~$250K a year).",
    ],
  },
  {
    org: "Reliance Industries", place: "Gujarat, India", title: "Operations Analyst", when: "Jul 2014 – Jul 2016",
    bullets: ["Integrated sensor and maintenance data into predictive-maintenance capability that raised plant uptime by 20%."],
  },
];

export const SKILLS: [string, string][] = [
  ["AI & GenAI", "LLMs, RAG, Graph-RAG, agentic workflows, multimodal (vision, speech), prompt engineering, human-in-the-loop governance"],
  ["Knowledge graphs", "RDF, OWL, SHACL, SPARQL, LinkML, AWS Neptune, Neo4j, Cypher, entity resolution"],
  ["Machine learning", "Forecasting, classification, ranking, anomaly and fraud detection, XGBoost, LightGBM, PyTorch, TensorFlow, A/B testing"],
  ["Optimisation", "Vehicle routing (CVRPTW), network and inventory optimisation, Nextmv"],
  ["Data & MLOps", "Python, SQL, R, Spark, Databricks, Microsoft Fabric, BigQuery, Airflow, MLflow, Docker, FastAPI, CI/CD"],
  ["Cloud", "AWS (SageMaker, Neptune, Bedrock, Glue, Redshift), GCP (Vertex AI, BigQuery), Azure"],
];

export const EDUCATION: [string, string, string][] = [
  ["Purdue University, Daniels School of Business", "MS, Business Analytics and Information Management", "2024"],
  ["Indian Institute of Foreign Trade", "MBA, Marketing and Finance", "2019"],
  ["Sardar Vallabhbhai National Institute of Technology", "B.Tech", "2014"],
];

export const CERTS =
  "Certified Analytics Professional · AWS Certified Cloud Practitioner · Certified Scrum Product Owner · Microsoft Power BI Data Analyst · Google Advanced Data Analytics · Tableau Desktop Specialist";
