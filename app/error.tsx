"use client";

import { useEffect } from "react";
import { ButtonLink, Container, PillButton } from "@/components/ui";

export default function Error({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[90svh] items-center pt-32 pb-16">
      <Container className="text-center">
        <p className="text-[13px] font-medium text-ink-3">Something went wrong</p>
        <h1 className="mx-auto mt-6 max-w-3xl text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] font-medium tracking-[-0.032em]">
          This page didn’t load properly.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
          Try again, or head back to the studio. If it keeps happening, please let me know.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <PillButton type="button" onClick={() => retry()}>
            Try again
          </PillButton>
          <ButtonLink href="/" variant="secondary">
            Back to the studio
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
