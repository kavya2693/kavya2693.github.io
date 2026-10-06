import type { Metadata } from "next";
import { SelectedSystems } from "@/components/projects/SelectedSystems";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies: enterprise knowledge graph and Graph-RAG, agentic app generation, flood intelligence, governed content, demand forecasting, self-repairing extraction.",
};

export default function WorkPage() {
  return <SelectedSystems all num="—" />;
}
