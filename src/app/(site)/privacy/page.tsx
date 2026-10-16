import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { PrivacyClient } from "./privacy-client";
import { pageMetadata } from "@/lib/seo";

// Title and search description come from the CMS; the fallbacks cover a
// field left blank.
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await client.queries.privacyPage({ relativePath: "privacy.json" });
  return pageMetadata({
    title: data.privacyPage.title || "Privacy notice",
    description:
      data.privacyPage.seo?.description ||
      "How Childhood is Now Ltd collects, uses and protects your personal data.",
    path: "/privacy",
  });
}

export default async function PrivacyPage() {
  const { data, query, variables } = await client.queries.privacyPage({
    relativePath: "privacy.json",
  });

  return <PrivacyClient data={data} query={query} variables={variables} />;
}
