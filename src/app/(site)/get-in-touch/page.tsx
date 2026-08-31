import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { GetInTouchClient } from "./get-in-touch-client";

export const metadata: Metadata = {
  title: "Get In Touch",
  description:
    "Get in touch with Childhood is Now. Whether you're from a local authority, the NHS, or a voluntary sector partner, we'd love to hear from you.",
};

export default async function GetInTouchPage() {
  const { data, query, variables } = await client.queries.getInTouchPage({
    relativePath: "get-in-touch.json",
  });

  return <GetInTouchClient data={data} query={query} variables={variables} />;
}
