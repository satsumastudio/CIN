"use client";

import Image from "next/image";
import Link from "next/link";
import { useTina, tinaField } from "tinacms/dist/react";
import { Container } from "./container";
import { primaryNav } from "@/lib/nav";
import type { SiteSettingsQuery, SiteSettingsQueryVariables } from "../../tina/__generated__/types";

export function SiteFooterClient({
  data: initialData,
  query,
  variables,
}: {
  data: SiteSettingsQuery;
  query: string;
  variables: SiteSettingsQueryVariables;
}) {
  const { data } = useTina({ query, variables, data: initialData });
  const settings = data.siteSettings;

  return (
    <footer className="bg-brand-blue text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Image
            src="/images/logos/logo-white-hands.png"
            alt="Childhood is Now"
            width={180}
            height={54}
            className="mb-4 h-12 w-auto"
          />
          <p className="max-w-xs text-sm text-white/85" data-tina-field={tinaField(settings, "footerBlurb")}>
            {settings.footerBlurb}
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-green-30t">
            Explore
          </p>
          <ul className="text-sm">
            {[...primaryNav, { label: "Get In Touch", href: "/get-in-touch" }].map(
              (item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="focus-ring-invert group inline-flex min-h-11 items-center text-white/85 transition-colors hover:text-white"
                  >
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      {item.label}
                    </span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-wide text-green-30t">
            Get in touch
          </p>
          <a
            href={`mailto:${settings.contactEmail}`}
            className="focus-ring-invert inline-flex min-h-11 items-center text-sm text-white/85 transition-colors hover:text-white"
            data-tina-field={tinaField(settings, "contactEmail")}
          >
            {settings.contactEmail}
          </a>
          <p className="mt-4 text-sm text-white/70" data-tina-field={tinaField(settings, "footerUncrcNote")}>
            {settings.footerUncrcNote}
          </p>
        </div>
      </Container>

      <div className="border-t border-white/20">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/70 sm:flex-row">
          <p data-tina-field={tinaField(settings, "companyLine")}>
            © Childhood is Now {new Date().getFullYear()}. {settings.companyLine}
          </p>
          <Link
            href="/privacy"
            className="focus-ring-invert inline-flex min-h-11 items-center transition-colors hover:text-white"
          >
            Privacy Notice
          </Link>
        </Container>
      </div>
    </footer>
  );
}
