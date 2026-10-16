import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import {
  JsonLd,
  defaultDescription,
  defaultTitle,
  organizationJsonLd,
  pageMetadata,
  siteName,
  siteUrl,
} from "@/lib/seo";

// V2 display face. Archivo is a sturdy grotesque with a width axis, so
// headings can be set heavy and slightly condensed — the chunky, high-impact
// look large UK charities use for scannable headlines. Inter carries body
// copy and UI, same as v1.
const archivo = Archivo({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const homeCard = pageMetadata({ description: defaultDescription, path: "/" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Childhood is Now",
  },
  description: defaultDescription,
  applicationName: siteName,
  authors: [{ name: "Childhood is Now Ltd", url: siteUrl }],
  creator: "Childhood is Now Ltd",
  publisher: "Childhood is Now Ltd",
  formatDetection: { telephone: false, email: false, address: false },
  // The homepage card; inner pages replace it via pageMetadata().
  openGraph: homeCard.openGraph,
  twitter: homeCard.twitter,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#14123f",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${archivo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-brand-blue font-body">
        {/* Keyboard users can jump the nav instead of tabbing it on every page */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-blue focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
