"use client";

import Link from "next/link";
import { useTina, tinaField } from "tinacms/dist/react";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { TiltedPhoto } from "@/components/tilted-photo";
import { SectionHeading } from "@/components/section-heading";
import { SectionCurve } from "@/components/section-curve";
import { ValuesGrid } from "@/components/tina/values-grid";
import { NewsTeaser } from "@/components/tina/news-teaser";
import type { HomeQuery, HomeQueryVariables } from "../../../tina/__generated__/types";
import type { ValueConnectionQuery, ValueConnectionQueryVariables } from "../../../tina/__generated__/types";
import type { PostConnectionQuery, PostConnectionQueryVariables } from "../../../tina/__generated__/types";

const chips = ["bg-green-30t", "bg-red-30t", "bg-yellow-30t", "bg-blue-30t"];
const statDots = ["bg-green-50t", "bg-red-50t", "bg-yellow-50t"];

export function HomeClient({
  data: initialData,
  query,
  variables,
  valuesProps,
  newsProps,
}: {
  data: HomeQuery;
  query: string;
  variables: HomeQueryVariables;
  valuesProps: { data: ValueConnectionQuery; query: string; variables: ValueConnectionQueryVariables };
  newsProps: { data: PostConnectionQuery; query: string; variables: PostConnectionQueryVariables };
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const content = data.home;

  return (
    <>
      {/* Hero — light ground, colour as punctuation */}
      <section className="overflow-hidden">
        <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <h1
              className="text-balance text-[2.6rem] sm:text-6xl lg:text-[4.2rem] text-brand-blue"
              data-tina-field={tinaField(content.hero, "heading")}
            >
              {content.hero?.heading}{" "}
              <span className="relative inline-block" data-tina-field={tinaField(content.hero, "highlight")}>
                {content.hero?.highlight}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-2.5 w-full rounded-full bg-yellow-50t"
                />
              </span>
            </h1>

            <p
              className="mt-7 max-w-xl text-lg leading-relaxed text-brand-blue/75"
              data-tina-field={tinaField(content.hero, "paragraph")}
            >
              {content.hero?.paragraph}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/get-in-touch" variant="primary">
                {content.hero?.primaryButtonLabel}
              </Button>
              <Button href="/what-we-do" variant="outline">
                {content.hero?.secondaryButtonLabel}
              </Button>
            </div>
          </div>

          <div className="px-2 sm:px-6 lg:px-0">
            {content.hero?.image && (
              <TiltedPhoto
                src={content.hero.image}
                alt={content.hero.imageAlt ?? ""}
                block="green"
                tilt="left"
                aspect="aspect-[4/3]"
                priority
              />
            )}
          </div>
        </Container>

        {/* Stat strip */}
        <Container>
          <dl className="grid gap-6 border-t border-brand-blue/15 pt-8 sm:grid-cols-3">
            {(content.stats ?? []).map((s, i) => (
              <div key={i} className="flex items-start gap-3">
                <span
                  className={`mt-2 h-3 w-3 shrink-0 rounded-full ${statDots[i % statDots.length]}`}
                />
                <div>
                  <dt
                    className="text-2xl font-extrabold text-brand-blue"
                    data-tina-field={tinaField(s, "figure")}
                  >
                    {s?.figure}
                  </dt>
                  <dd className="text-sm text-brand-blue/70" data-tina-field={tinaField(s, "label")}>
                    {s?.label}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* How we help — the offer sits directly under the hero, so a
          commissioner arriving with a live problem sees what we actually do
          before any of the ethos material. */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading tone={2} data-tina-field={tinaField(content.help, "heading")}>
              {content.help?.heading}
            </SectionHeading>
            <Link
              href="/what-we-do"
              className="link-arrow focus-ring min-h-11 items-center text-sm font-bold text-brand-blue transition-colors hover:text-blue-50t"
              data-tina-field={tinaField(content.help, "linkLabel")}
            >
              {content.help?.linkLabel}
            </Link>
          </div>

          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {(content.help?.items ?? []).map((item, i) => (
              <article key={i} className="flex gap-5">
                <span
                  className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-brand-blue ${chips[i % chips.length]}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-xl text-brand-blue" data-tina-field={tinaField(item, "title")}>
                    {item?.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-brand-blue/75" data-tina-field={tinaField(item, "body")}>
                    {item?.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <SectionCurve from="white" to="soft" variant={0} />

      {/* Mission, quote and values together form one soft-toned "why us"
          chapter, so the tone shift marks the change of purpose rather than
          each section announcing itself separately. */}
      <section className="overflow-hidden bg-soft pb-16 pt-6 sm:pb-24 sm:pt-10">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="order-2 px-2 sm:px-6 lg:order-1 lg:px-0">
            {content.mission?.image && (
              <TiltedPhoto
                src={content.mission.image}
                alt={content.mission.imageAlt ?? ""}
                block="yellow"
                tilt="right"
                aspect="aspect-[4/3]"
              />
            )}
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading tone={1} data-tina-field={tinaField(content.mission, "heading")}>
              {content.mission?.heading}
            </SectionHeading>
            <div className="mt-6 space-y-4 leading-relaxed text-brand-blue/75" data-tina-field={tinaField(content.mission, "paragraphs")}>
              {(content.mission?.paragraphs ?? []).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <SectionCurve from="soft" to="green" variant={1} />

      {/* Quote — the one bright pop */}
      <section className="bg-green-30t py-16 sm:py-24">
        <Container className="max-w-4xl text-center">
          <p
            className="text-balance text-2xl leading-snug text-brand-blue sm:text-3xl lg:text-[2.5rem]"
            data-tina-field={tinaField(content.missionQuote, "quote")}
          >
            &ldquo;{content.missionQuote?.quote}&rdquo;
          </p>
          <p
            className="mt-7 text-balance text-xs font-bold text-brand-blue sm:text-sm"
            data-tina-field={tinaField(content.missionQuote, "attribution")}
          >
            {content.missionQuote?.attribution}
          </p>
        </Container>
      </section>

      <SectionCurve from="green" to="soft" variant={2} />

      {/* Values */}
      <section className="overflow-hidden bg-soft pb-16 pt-6 sm:pb-24 sm:pt-10">
        <Container>
          <SectionHeading tone={0} data-tina-field={tinaField(content.valuesSection, "heading")}>
            {content.valuesSection?.heading}
          </SectionHeading>

          <ValuesGrid {...valuesProps} />
        </Container>
      </section>

      <SectionCurve from="soft" to="white" variant={0} />

      {/* News teaser */}
      <section className="pb-16 pt-6 sm:pb-24 sm:pt-10">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading tone={3} data-tina-field={tinaField(content.newsSection, "heading")}>
              {content.newsSection?.heading}
            </SectionHeading>
            <Link
              href="/news"
              className="link-arrow focus-ring min-h-11 items-center text-sm font-bold text-brand-blue transition-colors hover:text-blue-50t"
              data-tina-field={tinaField(content.newsSection, "linkLabel")}
            >
              {content.newsSection?.linkLabel}
            </Link>
          </div>

          <NewsTeaser {...newsProps} />
        </Container>
      </section>

      <SectionCurve from="white" to="yellow" variant={1} />

      {/* Closing CTA */}
      <section className="bg-yellow-30t pb-16 pt-6 text-brand-blue sm:pb-20 sm:pt-10">
        <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-balance text-3xl sm:text-4xl lg:text-5xl" data-tina-field={tinaField(content.cta, "heading")}>
              {content.cta?.heading}
            </h2>
            <p className="mt-4 max-w-xl text-brand-blue/75" data-tina-field={tinaField(content.cta, "paragraph")}>
              {content.cta?.paragraph}
            </p>
          </div>
          <Button href="/get-in-touch" variant="primary" className="shrink-0">
            {content.cta?.buttonLabel}
          </Button>
        </Container>
      </section>
      <SectionCurve from="yellow" to="navy" variant={1} straight />
    </>
  );
}
