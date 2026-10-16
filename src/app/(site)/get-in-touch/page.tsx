import type { Metadata } from "next";
import client from "../../../../tina/__generated__/client";
import { GetInTouchClient } from "./get-in-touch-client";
import { pageMetadata } from "@/lib/seo";

// Title and search description come from the CMS; the fallbacks cover a
// field left blank.
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await client.queries.getInTouchPage({ relativePath: "get-in-touch.json" });
  return pageMetadata({
    title: data.getInTouchPage.pageBand?.title || "Get in touch",
    description:
      data.getInTouchPage.seo?.description ||
      "Get in touch with Childhood is Now. Whether you're from a local authority, the NHS, or a voluntary sector partner, we'd love to hear from you.",
    path: "/get-in-touch",
  });
}

export default async function GetInTouchPage() {
  const { data, query, variables } = await client.queries.getInTouchPage({
    relativePath: "get-in-touch.json",
  });

  return <GetInTouchClient data={data} query={query} variables={variables} />;
}
