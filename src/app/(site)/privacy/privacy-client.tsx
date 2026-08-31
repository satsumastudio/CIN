"use client";

import { useTina } from "tinacms/dist/react";
import { LegalContent } from "@/components/legal-content";
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
  return <LegalContent content={data.privacyPage} rule="bg-blue-50t" />;
}
