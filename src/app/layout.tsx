import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://childhoodisnow.co.uk";

const description =
  "Childhood is Now works with local authorities, the NHS and the Voluntary and Community Sector to co-create fairer, healthier early years systems — built on evidence, creativity and authentic collaboration.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Childhood is Now — because children's futures can't wait",
    template: "%s | Childhood is Now",
  },
  description,
  keywords: [
    "early years",
    "public health",
    "local authority",
    "NHS",
    "Best Start in Life",
    "co-production",
    "children's services",
    "early years consultancy",
  ],
  authors: [{ name: "Childhood is Now Ltd" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteUrl,
    siteName: "Childhood is Now",
    title: "Childhood is Now — because children's futures can't wait",
    description,
    images: [
      {
        url: "/images/photography/photo-2.jpeg",
        width: 2400,
        height: 1600,
        alt: "Two young children sitting together in a field with arms around each other",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Childhood is Now — because children's futures can't wait",
    description,
    images: ["/images/photography/photo-2.jpeg"],
  },
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
      </body>
    </html>
  );
}
