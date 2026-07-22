/*
 * data.js — the only file you edit to post new work.
 *
 * TO ADD A PROJECT: copy one { ... } block in PROJECTS, change the fields,
 * done. Order top-to-bottom is the order shown on the site.
 *
 * TO ADD A VIDEO: add a { ... } block in VIDEOS with a `youtube` id
 * (the part after v= in a YouTube URL). Leave `youtube` empty for a
 * "coming soon" placeholder card.
 */

const PROJECTS = [
  {
    name: "ontoloop",
    tag: "Knowledge Graph · Pharmacovigilance",
    problem:
      "Adverse drug-event reports arrive as prose and must become structured records against a reporting clock. A language model can read them, but in a regulated pipeline you cannot ship an extraction you cannot prove is correct.",
    approach:
      "An agent loop that extracts a record, turns it into RDF, and repairs it until a SHACL validator says it conforms. The verifier never calls a model — the stop condition is cardinality, datatypes, patterns, and SPARQL rules.",
    stack: ["Python", "RDF/SHACL", "SPARQL", "Agent loop"],
    repo: "https://github.com/kavya2693/ontoloop",
    featured: true,
  },
  {
    name: "blastradius",
    tag: "Data Lineage · Static Analysis",
    problem:
      "Someone drops a column that dbt says is unused. It was not — a pandas script, a tablet endpoint, and an export job read it, and none of them are dbt models. On Monday the report is empty.",
    approach:
      "Parse the SQL side and the Python side and join them into one graph, so \"what breaks if I change this column\" becomes a reachability query — statically, before the change ships, with no orchestrator.",
    stack: ["Python", "sqlglot", "AST", "Graph"],
    repo: "https://github.com/kavya2693/blastradius",
    featured: true,
  },
  {
    name: "landcover-spatial-cv",
    tag: "Computer Vision · Geospatial",
    problem:
      "Land-cover classification benchmarks are easy to overstate when train and test tiles bleed into each other. The honest question is how well a model does on ground it has never seen.",
    approach:
      "A spatial cross-validation setup for satellite land-cover classification that blocks spatial leakage, reporting an honest 95.8% accuracy rather than an inflated one.",
    stack: ["Python", "PyTorch", "Spatial CV", "Remote sensing"],
    repo: "https://github.com/kavya2693/landcover-spatial-cv",
    featured: false,
  },
  {
    name: "gulf-shield-osint",
    tag: "OSINT · Arabic NLP · SAR",
    problem:
      "Western defense-intelligence tooling is trained on English text and temperate, urban terrain — a real gap for Gulf security operations that work in Arabic and in desert.",
    approach:
      "A Gulf-native pipeline: a LoRA-tuned CAMeLBERT classifier for Arabic OSINT signals, plus a Siamese U-Net that detects construction and vehicle activity in arid terrain from free Sentinel-1 SAR imagery.",
    stack: ["Python", "CAMeLBERT/LoRA", "Siamese U-Net", "Sentinel-1"],
    repo: "https://github.com/kavya2693/gulf-shield-osint",
    featured: false,
  },
  {
    name: "youtube-summarizer",
    tag: "GenAI · Video Intelligence",
    problem:
      "You do not have time to watch every long video, and most summarizers choke on transcript length or quietly lose the middle of a talk.",
    approach:
      "A video-intelligence app that pulls the transcript first and summarizes it, with an inline transcript fast-path so short videos return instantly and long ones stay within model limits.",
    stack: ["Python", "LLM APIs", "Transcript pipeline"],
    repo: "https://github.com/kavya2693/youtube-summarizer",
    featured: false,
  },
];

const VIDEOS = [
  {
    // Replace `youtube` with your real video id (the part after ?v=).
    // Leave it empty ("") to show a styled "coming soon" placeholder.
    title: "Your first video goes here",
    blurb:
      "Add a YouTube id in data.js and this card becomes a real embed. Delete this entry once your first talk is up.",
    youtube: "",
  },
];
