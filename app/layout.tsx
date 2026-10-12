import "./global.css";

import "@/styles/soplang-syntax.css";
import "@/styles/terminal.css";
import { RootProvider } from "fumadocs-ui/provider/next";

import { JsonLd, creatorSchema, languageSchema, maintainerSchema, websiteSchema } from "@/components/JsonLd";
import { sans } from "@/lib/fonts";

import { CREATOR, MAINTAINER, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [
    { name: CREATOR.name, url: CREATOR.url },
    { name: MAINTAINER.name, url: MAINTAINER.url },
  ],
  creator: CREATOR.name,
  publisher: MAINTAINER.name,
  keywords: [
    "Soplang",
    "Somali programming language",
    "programming in Somali",
    "learn to code in Somali",
    "luuqadda barnaamijyada Soomaaliga",
    "barashada barnaamijyada",
    "Somali keywords",
    "open source programming language",
  ],
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["so_SO"],
    images: [{ url: "/og.png", width: 1200, height: 630, alt: SITE_TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Search Console and Bing verification, set only when the codes exist.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#4b8bc9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.className} antialiased`}
      dir="ltr"
      translate="no"
    >
      <body
        className={`${sans.className} font-sans antialiased`}
        suppressHydrationWarning
      >
        <JsonLd data={[websiteSchema, languageSchema, creatorSchema, maintainerSchema]} />
        <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
      </body>
    </html>
  );
}
