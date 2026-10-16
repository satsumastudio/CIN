import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { PrivacyClient } from "./privacy-client";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy notice",
  description:
    "How Childhood is Now Ltd collects, uses and protects your personal data.",
  path: "/privacy",
});

export default async function PrivacyPage() {
  const { data, query, variables } = await client.queries.privacyPage({
    relativePath: "privacy.json",
  });

  return <PrivacyClient data={data} query={query} variables={variables} />;
}
