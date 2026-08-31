import client from "../../tina/__generated__/client";
import { SiteFooterClient } from "./site-footer-client";

export async function SiteFooter() {
  const { data, query, variables } = await client.queries.siteSettings({
    relativePath: "site-settings.json",
  });

  return <SiteFooterClient data={data} query={query} variables={variables} />;
}
