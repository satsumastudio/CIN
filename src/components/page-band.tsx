import type { ReactNode } from "react";
import { Container } from "./container";
import { SectionCurve } from "./section-curve";

// Light page opener: a thin brand rule and the title on white, rather than a
// heavy full-bleed colour slab.
export function PageBand({
  title,
  standfirst,
  rule = "bg-green-50t",
}: {
  title: string;
  standfirst?: string;
  rule?: string;
}) {
  return (
    <div className="border-b border-brand-blue/10">
      <Container className="py-12 sm:py-16">
        <span className={`rule-top mb-5 block ${rule}`} />
        <h1 className="text-balance text-4xl sm:text-5xl lg:text-6xl text-brand-blue">
          {title}
        </h1>
        {standfirst && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-brand-blue/75">
            {standfirst}
          </p>
        )}
      </Container>
    </div>
  );
}

type Tone = "white" | "soft" | "green" | "navy";

const toneClasses: Record<Tone, string> = {
  white: "bg-white text-brand-blue",
  soft: "bg-soft text-brand-blue",
  green: "bg-green-30t text-brand-blue",
  navy: "bg-brand-blue text-white",
};

export function Band({
  children,
  tone = "white",
  curveFrom,
  curveVariant = 0,
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  /** Tone of the section above; renders a soft curve into this one. */
  curveFrom?: "white" | "soft" | "green" | "yellow" | "navy";
  curveVariant?: number;
  className?: string;
}) {
  const curveTone =
    tone === "soft" ? "soft" : tone === "green" ? "green" : tone === "navy" ? "navy" : "white";
  return (
    <>
      {curveFrom && (
        <SectionCurve from={curveFrom} to={curveTone} variant={curveVariant} />
      )}
      <section className={`${toneClasses[tone]} ${className}`}>
        <Container className={curveFrom ? "pb-16 pt-6 sm:pb-24 sm:pt-10" : "py-16 sm:py-24"}>
          {children}
        </Container>
      </section>
    </>
  );
}
