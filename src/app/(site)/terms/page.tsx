import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { TermsClient } from "./terms-client";
import { pageMetadata } from "@/lib/seo";

// Title and search description come from the CMS; the fallbacks cover a
// field left blank.
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await client.queries.termsPage({ relativePath: "terms.json" });
  return pageMetadata({
    title: data.termsPage.title || "Website terms of use",
    description:
      data.termsPage.seo?.description ||
      "The terms that apply to your use of the Childhood is Now website.",
    path: "/terms",
  });
}

export default async function TermsPage() {
  const { data, query, variables } = await client.queries.termsPage({
    relativePath: "terms.json",
  });

  return <TermsClient data={data} query={query} variables={variables} />;
}
