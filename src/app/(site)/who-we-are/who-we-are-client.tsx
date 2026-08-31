"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Container } from "@/components/container";
import { SectionCurve } from "@/components/section-curve";
import { Band, PageBand } from "@/components/page-band";
import { SectionHeading } from "@/components/section-heading";
import { TiltedPhoto } from "@/components/tilted-photo";
import { Button } from "@/components/button";
import { TeamGrid } from "@/components/tina/team-grid";
import { ValuesGrid } from "@/components/tina/values-grid";
import type { WhoWeArePageQuery, WhoWeArePageQueryVariables } from "../../../../tina/__generated__/types";
import type { TeamConnectionQuery, TeamConnectionQueryVariables } from "../../../../tina/__generated__/types";
import type { ValueConnectionQuery, ValueConnectionQueryVariables } from "../../../../tina/__generated__/types";

export function WhoWeAreClient({
  data: initialData,
  query,
  variables,
  teamProps,
  valuesProps,
}: {
  data: WhoWeArePageQuery;
  query: string;
  variables: WhoWeArePageQueryVariables;
  teamProps: { data: TeamConnectionQuery; query: string; variables: TeamConnectionQueryVariables };
  valuesProps: { data: ValueConnectionQuery; query: string; variables: ValueConnectionQueryVariables };
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const content = data.whoWeArePage;

  return (
    <>
      <PageBand
        title={content.pageBand?.title ?? ""}
        standfirst={content.pageBand?.standfirst ?? ""}
        rule="bg-green-50t"
      />

      <Band tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading tone={0} data-tina-field={tinaField(content.intro, "heading")}>
              {content.intro?.heading}
            </SectionHeading>
            <div className="mt-6 space-y-4 leading-relaxed text-brand-blue/75" data-tina-field={tinaField(content.intro, "paragraphs")}>
              {(content.intro?.paragraphs ?? []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className="px-2 sm:px-6 lg:px-0">
            <TiltedPhoto
              src="/images/photography/together.jpeg"
              alt="Louise Harrington and Lucy Williams, co-founders of Childhood is Now"
              block="green"
              tilt="right"
            />
          </div>
        </div>
      </Band>

      <Band tone="soft" curveFrom="white" curveVariant={0}>
        <SectionHeading
          tone={1}
          standfirst={content.founders?.standfirst}
          data-tina-field={tinaField(content.founders, "heading")}
        >
          {content.founders?.heading}
        </SectionHeading>

        <TeamGrid {...teamProps} />
      </Band>

      <Band tone="white" curveFrom="soft" curveVariant={1} className="overflow-hidden">
        <div id="our-values">
          <SectionHeading tone={2} data-tina-field={tinaField(content.valuesSection, "heading")}>
            {content.valuesSection?.heading}
          </SectionHeading>
          <ValuesGrid {...valuesProps} />
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
      <SectionCurve from="yellow" to="navy" variant={2} straight />
    </>
  );
}
