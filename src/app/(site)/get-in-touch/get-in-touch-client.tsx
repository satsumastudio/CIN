"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";
import { SectionCurve } from "@/components/section-curve";
import { Band, PageBand } from "@/components/page-band";
import { SectionHeading, Card } from "@/components/section-heading";
import type { GetInTouchPageQuery, GetInTouchPageQueryVariables } from "../../../../tina/__generated__/types";

const chips = ["bg-green-30t", "bg-red-30t", "bg-yellow-30t"];

export function GetInTouchClient({
  data: initialData,
  query,
  variables,
}: {
  data: GetInTouchPageQuery;
  query: string;
  variables: GetInTouchPageQueryVariables;
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const content = data.getInTouchPage;

  return (
    <>
      <PageBand
        title={content.pageBand?.title ?? ""}
        standfirst={content.pageBand?.standfirst ?? ""}
        rule="bg-blue-50t"
      />

      <Band tone="white">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading tone={3} data-tina-field={tinaField(content.form, "heading")}>
              {content.form?.heading}
            </SectionHeading>
            <p className="mt-6 leading-relaxed text-brand-blue/75" data-tina-field={tinaField(content.form, "intro")}>
              {content.form?.intro}
            </p>

            <div className="mt-8 space-y-4">
              {(content.contactRoutes ?? []).map((route, i) => (
                <Card key={i} hover className="p-5">
                  <div className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className={`mt-1 h-8 w-8 shrink-0 rounded-full ${chips[i % chips.length]}`}
                    />
                    <div>
                      <h3 className="text-lg" data-tina-field={tinaField(route, "title")}>{route?.title}</h3>
                      <p className="mt-1 text-sm text-brand-blue/75" data-tina-field={tinaField(route, "body")}>
                        {route?.body}
                      </p>
                      <a
                        href={`mailto:${route?.email}`}
                        className="mt-1 inline-flex min-h-11 items-center break-all text-sm font-bold text-brand-blue underline underline-offset-4 hover:text-blue-50t"
                        data-tina-field={tinaField(route, "email")}
                      >
                        {route?.email}
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-green-30t p-6 sm:p-8">
            <h2 className="text-2xl" data-tina-field={tinaField(content.form, "cardHeading")}>
              {content.form?.cardHeading}
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Card>
        </div>
      </Band>

      <SectionCurve from="white" to="yellow" variant={1} />

      <section className="bg-yellow-30t text-brand-blue">
        <Container className="py-8 text-sm text-brand-blue/80">
          <p data-tina-field={tinaField(content, "legalNote")}>
            {content.legalNote}{" "}
            <a
              href="/privacy"
              className="font-bold underline underline-offset-4 hover:text-blue-50t"
            >
              privacy notice
            </a>
            .
          </p>
        </Container>
      </section>
      <SectionCurve from="yellow" to="navy" variant={2} straight />
    </>
  );
}
