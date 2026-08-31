"use client";

import { useTina } from "tinacms/dist/react";
import { LegalContent } from "@/components/legal-content";
import type { TermsPageQuery, TermsPageQueryVariables } from "../../../../tina/__generated__/types";

export function TermsClient({
  data: initialData,
  query,
  variables,
}: {
  data: TermsPageQuery;
  query: string;
  variables: TermsPageQueryVariables;
}) {
  const { data } = useTina({ query, variables, data: initialData });
  return <LegalContent content={data.termsPage} rule="bg-yellow-50t" />;
}
