"use client";

import { tinaField, useTina } from "tinacms/dist/react";
import { PageBand } from "@/components/page-band";
import type { NewsPageQuery, NewsPageQueryVariables } from "../../../../tina/__generated__/types";

export function NewsPageBand({
  data: initialData,
  query,
  variables,
}: {
  data: NewsPageQuery;
  query: string;
  variables: NewsPageQueryVariables;
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const band = data.newsPage.pageBand;

  return (
    <PageBand
      title={band?.title ?? ""}
      standfirst={band?.standfirst ?? ""}
      rule="bg-green-50t"
      titleField={tinaField(band, "title")}
      standfirstField={tinaField(band, "standfirst")}
    />
  );
}
