"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Container } from "@/components/container";
import { SectionCurve } from "@/components/section-curve";
import { Band, PageBand } from "@/components/page-band";
import { SectionHeading, Card } from "@/components/section-heading";
import { TiltedPhoto } from "@/components/tilted-photo";
import { RichText } from "@/components/tina/rich-text";
import { Button } from "@/components/button";
import type { OurWorkPageQuery, OurWorkPageQueryVariables } from "../../../../tina/__generated__/types";

export function OurWorkClient({
  data: initialData,
  query,
  variables,
}: {
  data: OurWorkPageQuery;
  query: string;
  variables: OurWorkPageQueryVariables;
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const content = data.ourWorkPage;

  return (
    <>
      <PageBand
        title={content.pageBand?.title ?? ""}
        standfirst={content.pageBand?.standfirst ?? ""}
        titleField={tinaField(content.pageBand, "title")}
        standfirstField={tinaField(content.pageBand, "standfirst")}
        rule="bg-yellow-50t"
      />

      <Band tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeading tone={2} data-tina-field={tinaField(content.intro, "heading")}>
              {content.intro?.heading}
            </SectionHeading>
            <p className="mt-6 text-lg leading-relaxed text-brand-blue/75" data-tina-field={tinaField(content.intro, "paragraph")}>
              {content.intro?.paragraph}
            </p>
          </div>
          <div className="px-2 sm:px-6 lg:px-0">
            {content.intro?.image && (
              <TiltedPhoto
                src={content.intro.image}
                alt={content.intro.imageAlt ?? ""}
                block="red"
                tilt="right"
                data-tina-field={tinaField(content.intro, "image")}
              />
            )}
          </div>
        </div>

        {(content.trackRecord?.items ?? []).length > 0 && (
          <div className="mt-16">
            <h3
              className="max-w-3xl text-balance text-2xl text-brand-blue sm:text-3xl"
              data-tina-field={tinaField(content.trackRecord, "heading")}
            >
              {content.trackRecord?.heading}
            </h3>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {(content.trackRecord?.items ?? []).map((item, i) => (
                <li key={i}>
                  <Card className="h-full p-5">
                    <p className="font-bold text-brand-blue" data-tina-field={tinaField(item, "title")}>
                      {item?.title}
                    </p>
                    <div
                      className="track-record-text mt-2 text-sm leading-relaxed text-brand-blue/80"
                      data-tina-field={tinaField(item, "description")}
                    >
                      <RichText content={item?.description} />
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Band>

      <Band tone="soft" curveFrom="white" curveVariant={0}>
        <SectionHeading tone={3} data-tina-field={tinaField(content.advisory, "heading")}>
          {content.advisory?.heading}
        </SectionHeading>

        <h3
          className="mt-10 text-xs font-bold uppercase tracking-wide text-brand-blue/70"
          data-tina-field={tinaField(content.advisory, "currentLabel")}
        >
          {content.advisory?.currentLabel}
        </h3>
        <ul className="mt-5 grid gap-4 lg:grid-cols-3">
          {(content.advisory?.current ?? []).map((item, i) => (
            <li key={i}>
              <Card className="h-full p-5">
                <p className="font-bold" data-tina-field={tinaField(item, "title")}>{item?.title}</p>
                {item?.description && (
                  <p className="mt-2 text-sm text-brand-blue/75" data-tina-field={tinaField(item, "description")}>
                    {item.description}
                  </p>
                )}
              </Card>
            </li>
          ))}
        </ul>

        <h3
          className="mt-12 text-xs font-bold uppercase tracking-wide text-brand-blue/70"
          data-tina-field={tinaField(content.advisory, "previousLabel")}
        >
          {content.advisory?.previousLabel}
        </h3>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {(content.advisory?.previous ?? []).map((item, i) => (
            <li key={i} className="border-b border-brand-blue/15 pb-4">
              <p className="text-sm font-bold" data-tina-field={tinaField(item, "title")}>{item?.title}</p>
              {item?.description && (
                <p className="mt-1 text-sm text-brand-blue/75" data-tina-field={tinaField(item, "description")}>
                  {item.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="white" curveFrom="soft" curveVariant={1}>
        <SectionHeading tone={0} data-tina-field={tinaField(content.publicationsSection, "heading")}>
          {content.publicationsSection?.heading}
        </SectionHeading>
        <ul className="mt-10">
          {(content.publicationsSection?.items ?? []).map((pub, i) => (
            <li key={i} className="border-b border-brand-blue/15 py-5">
              <p className="font-bold" data-tina-field={tinaField(pub, "citation")}>{pub?.citation}</p>
              <p className="mt-1 text-sm leading-relaxed text-brand-blue/75" data-tina-field={tinaField(pub, "description")}>
                {pub?.description}
              </p>
              {pub?.link && (
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-arrow focus-ring mt-2 min-h-11 items-center text-sm font-bold text-brand-blue underline underline-offset-4 transition-colors hover:text-blue-50t"
                  data-tina-field={tinaField(content.publicationsSection, "linkLabel")}
                >
                  {content.publicationsSection?.linkLabel}
                </a>
              )}
              {(pub?.links ?? []).length > 0 && (
                <ul className="mt-2 flex flex-col items-start">
                  {(pub?.links ?? []).map((l, j) =>
                    l?.url ? (
                      <li key={j}>
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-arrow focus-ring min-h-11 items-center text-sm font-bold text-brand-blue underline underline-offset-4 transition-colors hover:text-blue-50t"
                          data-tina-field={tinaField(l, "label")}
                        >
                          {l.label ? `${l.label} →` : content.publicationsSection?.linkLabel}
                        </a>
                      </li>
                    ) : null
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Band>

      <SectionCurve from="white" to="yellow" variant={2} />

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
            <span data-tina-field={tinaField(content.cta, "buttonLabel")}>{content.cta?.buttonLabel}</span>
          </Button>
        </Container>
      </section>
      <SectionCurve from="yellow" to="navy" variant={1} straight />
    </>
  );
}
