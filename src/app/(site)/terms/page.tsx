import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { TermsClient } from "./terms-client";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Website terms of use",
  description:
    "The terms that apply to your use of the Childhood is Now website.",
  path: "/terms",
});

export default async function TermsPage() {
  const { data, query, variables } = await client.queries.termsPage({
    relativePath: "terms.json",
  });

  return <TermsClient data={data} query={query} variables={variables} />;
}
