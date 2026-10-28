import { MoirePlate } from "@/components/moire";
import { ButtonLink, Container } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[90svh] items-center overflow-hidden pt-32 pb-16">
      <MoirePlate
        kind="radial"
        className="absolute inset-0 -z-10 bg-transparent! opacity-[0.12] [mask-image:radial-gradient(closest-side,black,transparent)]"
      />
      <Container className="text-center">
        <p className="text-[13px] text-ink-3 font-medium">
          Error 404
        </p>
        <h1 className="mx-auto mt-6 max-w-3xl text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] font-medium tracking-[-0.032em]">
          This page has moved on.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
          The address may have changed, or the page may no longer be here. You can return to the studio or explore the
          work.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/">Back to the studio</ButtonLink>
          <ButtonLink href="/work" variant="secondary">
            View the work
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
