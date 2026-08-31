"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Container } from "@/components/container";
import { Band, PageBand } from "@/components/page-band";
import { SectionHeading, Card } from "@/components/section-heading";
import { TiltedPhoto } from "@/components/tilted-photo";
import { SectionCurve } from "@/components/section-curve";
import { Button } from "@/components/button";
import type { WhatWeDoPageQuery, WhatWeDoPageQueryVariables } from "../../../../tina/__generated__/types";

const chips = ["bg-green-30t", "bg-red-30t", "bg-yellow-30t", "bg-blue-30t"];

export function WhatWeDoClient({
  data: initialData,
  query,
  variables,
}: {
  data: WhatWeDoPageQuery;
  query: string;
  variables: WhatWeDoPageQueryVariables;
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const content = data.whatWeDoPage;

  return (
    <>
      <PageBand
        title={content.pageBand?.title ?? ""}
        standfirst={content.pageBand?.standfirst ?? ""}
        rule="bg-red-50t"
      />

      <Band tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading tone={1} data-tina-field={tinaField(content.intro, "heading")}>
              {content.intro?.heading}
            </SectionHeading>
            <p className="mt-6 text-lg leading-relaxed text-brand-blue/75" data-tina-field={tinaField(content.intro, "paragraph")}>
              {content.intro?.paragraph}
            </p>
          </div>
          <div className="px-2 sm:px-6 lg:px-0">
            <TiltedPhoto
              src="/images/photography/photo-1.jpg"
              alt="A young boy wearing glasses concentrates while building a tower out of toy blocks"
              block="yellow"
              tilt="left"
            />
          </div>
        </div>
      </Band>

      <SectionCurve from="white" to="green" variant={0} />

      <section className="bg-green-30t py-14 sm:py-20">
        <Container className="max-w-4xl text-center">
          <p className="text-balance text-2xl leading-snug text-brand-blue sm:text-3xl" data-tina-field={tinaField(content, "quote")}>
            &ldquo;{content.quote}&rdquo;
          </p>
        </Container>
      </section>

      <Band tone="white" curveFrom="green" curveVariant={1}>
        <SectionHeading
          tone={0}
          standfirst={content.supportAreas?.standfirst}
          data-tina-field={tinaField(content.supportAreas, "heading")}
        >
          {content.supportAreas?.heading}
        </SectionHeading>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {(content.supportAreas?.items ?? []).map((item, i) => (
            <article key={i} className="flex gap-5">
              <span
                className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-brand-blue ${chips[i % chips.length]}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="leading-relaxed text-brand-blue/80">{item}</p>
            </article>
          ))}
        </div>
      </Band>

      <Band tone="soft" curveFrom="white" curveVariant={2}>
        <SectionHeading tone={2} data-tina-field={tinaField(content.bespokeSupport, "heading")}>
          {content.bespokeSupport?.heading}
        </SectionHeading>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {(content.bespokeSupport?.items ?? []).map((item, i) => (
            <Card key={i} className="p-5">
              <p className="text-sm leading-relaxed text-brand-blue/80">{item}</p>
            </Card>
          ))}
        </div>
      </Band>

      <section className="bg-yellow-30t text-brand-blue">
        <Container className="flex flex-col items-start gap-6 py-14 sm:py-16 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-balance text-3xl sm:text-4xl lg:text-5xl" data-tina-field={tinaField(content.cta, "heading")}>
              {content.cta?.heading}
            </h2>
            <p className="mt-3 max-w-xl text-brand-blue/75" data-tina-field={tinaField(content.cta, "paragraph")}>
              {content.cta?.paragraph}
            </p>
          </div>
          <Button href="/get-in-touch" variant="primary" className="shrink-0">
            {content.cta?.buttonLabel}
          </Button>
        </Container>
      </section>
      <SectionCurve from="yellow" to="navy" variant={0} straight />
    </>
  );
}
