"use client";

import { useTina, tinaField } from "tinacms/dist/react";
import { SectionCurve } from "@/components/section-curve";
import { Band, PageBand } from "@/components/page-band";
import type { PrivacyPageQuery, PrivacyPageQueryVariables } from "../../../../tina/__generated__/types";

export function PrivacyClient({
  data: initialData,
  query,
  variables,
}: {
  data: PrivacyPageQuery;
  query: string;
  variables: PrivacyPageQueryVariables;
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const content = data.privacyPage;

  return (
    <>
      <PageBand title={content.title ?? ""} rule="bg-blue-50t" />
      <Band tone="white">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-brand-blue/80" data-tina-field={tinaField(content, "paragraph")}>
            {content.paragraph}
          </p>
          <p className="mt-6 text-sm text-brand-blue/70" data-tina-field={tinaField(content, "lastUpdated")}>
            {content.lastUpdated}
          </p>
        </div>
      </Band>
      <SectionCurve from="white" to="navy" variant={1} straight />
    </>
  );
}
