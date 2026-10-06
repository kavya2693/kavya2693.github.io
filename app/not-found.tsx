import { ButtonLink, Container } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Container className="py-32">
      <p className="font-mono text-[0.75rem] text-accent">404</p>
      <h1 className="mt-3 text-[2.4rem] font-semibold tracking-[-0.03em]">No node at this address.</h1>
      <div className="mt-8 flex gap-3"><ButtonLink href="/" variant="primary">Home</ButtonLink><ButtonLink href="/graph/">Open the graph</ButtonLink></div>
    </Container>
  );
}
