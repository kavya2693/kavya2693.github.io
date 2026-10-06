// Verbatim excerpts from public repositories (fetched from GitHub, line ranges in `url`).
// Do not edit the code text by hand — re-copy from the repo if it changes.

export type Snippet = { id: string; title: string; why: string; repo: string; lang: string; path: string; url: string; code: string };

export const SNIPPETS: Snippet[] = [
  {
    "id": "ontoloop-snippet_alt",
    "title": "SHACL shape",
    "why": "Closed shape: enumerated severity, ID pattern, exactly-one cardinality.",
    "repo": "ontoloop",
    "lang": "turtle",
    "path": "ontology/generated_shapes.ttl",
    "url": "https://github.com/kavya2693/ontoloop/blob/main/ontology/generated_shapes.ttl#L37-L57",
    "code": "pv:AdverseEvent a sh:NodeShape ;\n    rdfs:comment \"An untoward medical occurrence. Must name exactly one suspect drug, which is what makes the report actionable for signal detection.\" ;\n    sh:closed true ;\n    sh:ignoredProperties ( rdf:type ) ;\n    sh:property [ sh:in ( \"mild\" \"moderate\" \"severe\" \"life_threatening\" \"fatal\" ) ;\n            sh:maxCount 1 ;\n            sh:minCount 1 ;\n            sh:order 2 ;\n            sh:path pv:severity ],\n        [ sh:datatype xsd:string ;\n            sh:description \"Stable identifier, prefixed by record type.\" ;\n            sh:maxCount 1 ;\n            sh:nodeKind sh:Literal ;\n            sh:order 0 ;\n            sh:path pv:id ;\n            sh:pattern \"^(CASE|PT|DRUG|AE)-[0-9]{6}$\" ],\n        [ sh:in ( \"recovered\" \"recovering\" \"not_recovered\" \"fatal\" \"unknown\" ) ;\n            sh:maxCount 1 ;\n            sh:minCount 1 ;\n            sh:order 3 ;\n            sh:path pv:outcome ],"
  },
  {
    "id": "ontoloop-snippet",
    "title": "SPARQL rule",
    "why": "A constraint a schema can't express: no effect before the cause.",
    "repo": "ontoloop",
    "lang": "turtle",
    "path": "ontology/rules.ttl",
    "url": "https://github.com/kavya2693/ontoloop/blob/main/ontology/rules.ttl#L16-L29",
    "code": "pv:OnsetNotBeforeDrugStart\n    a sh:SPARQLConstraint ;\n    rdfs:label \"onset before drug start\" ;\n    sh:message \"Event onset {?onset} precedes suspect drug start {?start}; a drug cannot cause an event that began before it was administered.\" ;\n    sh:prefixes pv: ;\n    sh:select \"\"\"\n        SELECT $this ?onset ?start\n        WHERE {\n            $this pv:onset_date ?onset ;\n                  pv:suspect_drug ?drug .\n            ?drug pv:start_date ?start .\n            FILTER (?onset < ?start)\n        }\n    \"\"\" ."
  },
  {
    "id": "mdm-entity-resolution-snippet",
    "title": "Entity resolution",
    "why": "Deterministic IDs first; a surname alone is never enough.",
    "repo": "mdm-entity-resolution",
    "lang": "python",
    "path": "src/resolve.py",
    "url": "https://github.com/kavya2693/mdm-entity-resolution/blob/main/src/resolve.py#L63-L81",
    "code": "def is_match(a, b):\n    # deterministic identifiers decide when both records carry one\n    if a[\"npi\"] and b[\"npi\"]:\n        return a[\"npi\"] == b[\"npi\"]                 # equal -> match; differ -> not\n    if a[\"email\"] and b[\"email\"]:\n        return a[\"email\"] == b[\"email\"]             # a shared email is a strong match\n    # probabilistic: surname must agree, BOTH first names must be present and agree\n    # (surname alone is never enough), and one more field must corroborate.\n    if fuzz.ratio(a[\"last\"], b[\"last\"]) < 88:\n        return False\n    fa, fb = a[\"first\"], b[\"first\"]\n    if not fa or not fb:\n        return False\n    first_ok = (fa == fb or (fa[0] == fb[0] and (len(fa) == 1 or len(fb) == 1))\n                or fuzz.ratio(fa, fb) >= 78)\n    if not first_ok:\n        return False\n    return ((a[\"city\"] and a[\"city\"] == b[\"city\"])\n            or (a[\"org\"] and fuzz.token_sort_ratio(a[\"org\"], b[\"org\"]) >= 80))"
  },
  {
    "id": "blastradius-snippet",
    "title": "Lineage reachability",
    "why": "Impact as graph reachability, with evidence per consumer.",
    "repo": "blastradius",
    "lang": "python",
    "path": "src/blastradius/blast.py",
    "url": "https://github.com/kavya2693/blastradius/blob/main/src/blastradius/blast.py#L40-L62",
    "code": "def blast_radius(graph: nx.DiGraph, relation: str, column: str) -> Impact:\n    start = node_id(relation, column)\n    if start not in graph:\n        return Impact(column=start, exists=False)\n\n    reachable = nx.descendants(graph, start)\n\n    downstream = sorted(n for n in reachable if graph.nodes[n].get(\"kind\") == \"column\")\n\n    consumers = []\n    for name in sorted(n for n in reachable if graph.nodes[n].get(\"kind\") == \"consumer\"):\n        # Which column the consumer actually reads, and how it was found.\n        via = [\n            {\n                \"column\": predecessor,\n                \"confidence\": graph.edges[predecessor, name].get(\"confidence\"),\n                \"line\": graph.edges[predecessor, name].get(\"line\"),\n                \"evidence\": graph.edges[predecessor, name].get(\"evidence\"),\n            }\n            for predecessor in graph.predecessors(name)\n            if predecessor in reachable or predecessor == start\n        ]\n        consumers.append({\"source\": graph.nodes[name][\"source\"], \"reads\": via})"
  },
  {
    "id": "crypto-risk-kg-snippet",
    "title": "NL→Cypher guard",
    "why": "LLM-written Cypher is checked before it touches the graph.",
    "repo": "crypto-risk-kg",
    "lang": "python",
    "path": "src/cdt/nl2cypher.py",
    "url": "https://github.com/kavya2693/crypto-risk-kg/blob/main/src/cdt/nl2cypher.py#L159-L167",
    "code": "    def validate(self, cypher: str) -> tuple[bool, str]:\n        if WRITE_KEYWORDS.search(cypher):\n            return False, \"rejected: write/DDL keyword in a read-only assistant\"\n        if \":CDT\" not in cypher:\n            return False, \"rejected: query not scoped to the :CDT namespace\"\n        return True, \"ok\"\n\n    def _enforce_limit(self, cypher: str) -> str:\n        return cypher if re.search(r\"\\bLIMIT\\b\", cypher, re.I) else f\"{cypher} LIMIT {DEFAULT_LIMIT}\""
  },
  {
    "id": "global-flood-hotspots-snippet",
    "title": "Provenance validator",
    "why": "No source URL, no figure.",
    "repo": "global-flood-hotspots",
    "lang": "python",
    "path": "src/floodhotspots/validate.py",
    "url": "https://github.com/kavya2693/global-flood-hotspots/blob/main/src/floodhotspots/validate.py#L66-L83",
    "code": "def _check_provenance(df: pd.DataFrame, figures, key: str, table: str) -> list[Problem]:\n    \"\"\"A figure is admissible only with a resolvable URL, a tier, and a method\n    where the schema demands one. This is the rule the whole project rests on.\"\"\"\n    problems: list[Problem] = []\n    for _, row in df.iterrows():\n        rid = str(row.get(key, \"?\"))\n        for fig in figures:\n            if fig.value not in df.columns or not _present(row.get(fig.value)):\n                continue\n            url = row.get(fig.source_url)\n            if not _present(url):\n                problems.append(\n                    Problem(table, rid, fig.value, \"no_source\", \"figure present, source URL empty\")\n                )\n            elif not URL_RE.match(str(url).strip()):\n                problems.append(\n                    Problem(table, rid, fig.source_url, \"bad_source\", f\"not a URL: {url!r}\")\n                )"
  },
  {
    "id": "landcover-spatial-cv-snippet",
    "title": "Spatial CV split",
    "why": "Hold out whole 50 km blocks, not random tiles.",
    "repo": "landcover-spatial-cv",
    "lang": "python",
    "path": "src/spatial_cv.py",
    "url": "https://github.com/kavya2693/landcover-spatial-cv/blob/master/src/spatial_cv.py#L62-L81",
    "code": "    block_members = defaultdict(list)\n    for i, (path, _) in enumerate(ds.samples):\n        epsg, e, n = coords[Path(path).name]\n        block = (epsg, int(e // BLOCK_M), int(n // BLOCK_M))\n        block_members[block].append(i)\n\n    rng = np.random.default_rng(SEED)\n    blocks = list(block_members)\n    rng.shuffle(blocks)\n    target_val = int(len(ds) * VAL_FRACTION)\n    val_idx, n_val_blocks = [], 0\n    for b in blocks:\n        if len(val_idx) >= target_val:\n            break\n        n_val_blocks += 1\n        val_idx.extend(block_members[b])\n    train_idx = sorted(set(range(len(ds))) - set(val_idx))\n    print(f\"  spatial: {len(block_members)} blocks total, \"\n          f\"{n_val_blocks} held out -> {len(val_idx)} val images\")\n    return train_idx, val_idx"
  },
  {
    "id": "pharma-commercial-datamodel-snippet",
    "title": "Point-in-time SQL",
    "why": "SCD-2 join: each engagement gets the segment it had that day.",
    "repo": "pharma-commercial-datamodel",
    "lang": "sql",
    "path": "sql/03_transform.sql",
    "url": "https://github.com/kavya2693/pharma-commercial-datamodel/blob/main/sql/03_transform.sql#L71-L95",
    "code": "-- ---- fact_engagement: point-in-time SCD2 resolution ------------------\nINSERT INTO fact_engagement (engagement_id, date_key, hcp_key, rep_key, channel_key,\n                             content_key, campaign_key, territory_key,\n                             duration_min, engagement_count, meaningful_count)\nSELECT e.engagement_id,\n       CAST(strftime('%Y%m%d', e.engagement_date) AS INTEGER),\n       dh.hcp_key,\n       dr.rep_key,\n       dch.channel_key,\n       COALESCE(dc.content_key, 0),\n       dcam.campaign_key,\n       dt.territory_key,\n       e.duration_min,\n       1,\n       e.is_meaningful\nFROM engagement e\nJOIN hcp h            ON h.hcp_id = e.hcp_id\nJOIN dim_hcp dh       ON dh.hcp_id = e.hcp_id\n                     AND e.engagement_date >= dh.valid_from\n                     AND e.engagement_date <= dh.valid_to\nJOIN dim_channel dch  ON dch.channel_id = e.channel_code\nJOIN dim_territory dt ON dt.territory_id = h.territory_id\nLEFT JOIN dim_rep dr       ON dr.rep_id = e.rep_id\nLEFT JOIN dim_content dc   ON dc.content_id = e.content_id\nLEFT JOIN dim_campaign dcam ON dcam.campaign_id = e.campaign_id;"
  }
];
