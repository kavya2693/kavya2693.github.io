import { Hero } from "@/components/hero/Hero";
import { SelectedSystems } from "@/components/projects/SelectedSystems";
import { Evaluation } from "@/components/sections/Evaluation";
import { EngineeringProof } from "@/components/sections/EngineeringProof";
import { Lifecycle } from "@/components/sections/Lifecycle";
import { Stack } from "@/components/sections/Stack";
import { GraphBand, ContactBand } from "@/components/sections/Bands";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedSystems num="01" />
      <GraphBand />
      <Evaluation num="02" />
      <EngineeringProof num="03" />
      <Lifecycle num="04" />
      <Stack num="05" />
      <ContactBand />
    </>
  );
}
