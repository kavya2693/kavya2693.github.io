import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { GraphFromQuery } from "@/components/graph/GraphFromQuery";
import { SkillGraph } from "@/components/graph/SkillGraph";

export const metadata: Metadata = {
  title: "Graph",
  description: "An interactive knowledge graph of skills, case studies, experiments and repositories — click a node to filter the work.",
};

export default function GraphPage() {
  return (
    <Container className="pb-24 pt-12 md:pt-16">
      <Eyebrow className="mb-6">Knowledge graph · portfolio navigation</Eyebrow>
      <h1 className="max-w-3xl text-[clamp(2.1rem,4.6vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
        Every skill, linked to <span className="font-serif font-normal italic text-warm">the work that proves it.</span>
      </h1>
      <p className="mt-5 max-w-2xl text-[1.05rem] text-mute">
        Select a node to list the case studies, experiments and repositories that use it. Branches include their skills; dashed edges are cross-links.
      </p>
      <div className="mt-10">
        <Suspense fallback={<SkillGraph />}>
          <GraphFromQuery />
        </Suspense>
      </div>
      <p className="mt-8 text-[0.9rem] text-mute">
        Looking for depth on graph engineering specifically — ontologies, Neptune, claims graphs?{" "}
        <a href="/graph.html" className="text-accent hover:underline">Knowledge-graph engineering deep dive →</a>
      </p>
    </Container>
  );
}
