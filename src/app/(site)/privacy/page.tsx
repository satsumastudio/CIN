import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { PrivacyClient } from "./privacy-client";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Childhood is Now Ltd collects, uses and protects your personal data.",
};

export default async function PrivacyPage() {
  const { data, query, variables } = await client.queries.privacyPage({
    relativePath: "privacy.json",
  });

  return <PrivacyClient data={data} query={query} variables={variables} />;
}
