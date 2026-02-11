import "./global.css";

import "@/styles/soplang-syntax.css";
import "@/styles/terminal.css";
import { RootProvider } from "fumadocs-ui/provider/next";

import { inter } from "@/lib/fonts";

import { Metadata } from "next/types";

export const metadata: Metadata = {
  applicationName: "Soplang - Somali Programming Language",
  authors: [
    { name: "Mr Sharafdin", url: "https://github.com/sharafdin" },
    { name: "Soplang Development Team", url: "https://github.com/soplang" },
  ],
  creator: "Mr Sharafdin",
  publisher: "Soplang Software Foundation",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  keywords: [
    "barnaamijyada soomaali",
    "dhis software soomaali",
    "barashada programinka",
    "horumarinta software",
    "luuqada programinka soomaali",
    "afka hooyo",
    "waxbarashada teknolojiyada",
    "barashada kumbuyutarka",
    "software development soomaali",
    "coding soomaali",
    "soplang tutorial",
    "barashada soplang",
    "tusaale soplang",
    "casharo soplang",
    "teknoolojiyada Soomaaliya",
    "horumarka casriga Soomaaliya",
    "waxbarashada casriga soomaali",
    "fursadaha teknoolojiyada",
    "xalinta dhibaatooyinka barnaamijyada",
    "guruubka horumarinta software soomaali",
    // English Keywords
    "Soplang",
    "Somali programming language",
    "learn coding in Somali",
    "software development in Somali",
    "programming for Somalis",
    "mother tongue programming",
    "Somali developers",
    "Somali tech community",
    "learn to code in Somali",
    "programming education",
    "Soplang examples",
    "Soplang tutorials",
    "Somali code learning",
    "technology in Somalia",
    "tech development Somalia",
    "coding for Somali diaspora",
    "Somali language software",
    "accessible programming Somali",
    "Somali tech innovation",
    "Horn of Africa tech",
    // Additional keywords for better discoverability
    "learn programming in native language",
    "accessible coding",
    "inclusive programming",
    "indigenous programming languages",
    "cultural tech innovation",
    "Somali tech education",
    "programming in East Africa",
    "beginner-friendly programming",
    "ethnic language programming",
    "linguistic diversity in tech",
    // Even more targeted keywords
    "Python-based interpreter",
    "Somali syntax",
    "beginner programming language",
    "educational programming",
    "programming language for schools",
    "Somali IT education",
    "African programming languages",
    "culturally-aware computing",
    "localized programming",
    "mother tongue coding education",
  ],
  alternates: {
    languages: {
      "so-SO": "/so",
      "en-US": "/en",
    },
    canonical: "https://soplang.org",
  },
  openGraph: {
    title: "Soplang - The First Somali Programming Language",
    description:
      "Soplang is a modern Somali programming language created by Mr Sharafdin, first released in October 2023. It makes coding intuitive and accessible with native Somali syntax. Dhis Software Adigoo Adeegsanaya Afkaaga Hooyo!",
    url: "https://soplang.org",
    siteName: "Soplang",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "so_SO",
    alternateLocale: ["en_US"],
    type: "website",
    countryName: "Somalia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soplang - The First Somali Programming Language",
    description:
      "Soplang is a modern Somali programming language created by Mr Sharafdin. It makes coding intuitive and accessible with native Somali syntax. Dhis Software Adigoo Adeegsanaya Afkaaga Hooyo!",
    site: "@soplangorg",
    creator: "@soplangorg",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  other: {
    "google-site-verification": "your-verification-code",
    "baidu-site-verification": "your-verification-code",
    "yandex-verification": "your-verification-code",
    "msvalidate.01": "your-bing-verification-code",
    "facebook-domain-verification": "your-facebook-verification-code",
    // Additional geo meta tags
    "geo.region": "SO",
    "geo.placename": "Somalia",
    "geo.position": "2.0469;45.3182", // Mogadishu coordinates
    ICBM: "2.0469, 45.3182",
    // Additional social media tags
    "og:email": "info@soplang.org",
    "og:phone_number": "+252 61 SOPLANG",
    "og:latitude": "2.0469",
    "og:longitude": "45.3182",
    "og:street-address": "Mogadishu",
    "og:locality": "Mogadishu",
    "og:region": "Banaadir",
    "og:postal-code": "00000",
    "og:country-name": "Somalia",
    // Article specific for blog integration
    "article:publisher": "https://soplang.org",
    "article:author": "https://github.com/sharafdin",
    // App specific
    "al:ios:app_name": "Soplang",
    "al:android:app_name": "Soplang",
    // Apple specific
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "Soplang",
    // Pinterest verification
    "p:domain_verify": "your-pinterest-verification-code",
    // Norton Safe Web verification
    "norton-safeweb-site-verification": "your-norton-verification-code",
    // Additional platform verifications
    "pocket-site-verification": "your-pocket-verification-code",
    // Educational tags
    "edu:language-of-instruction": "Somali",
    "edu:target-audience": "Somali speakers, students, developers",
    "edu:skill-level": "Beginner to Advanced",
    // Technology tags
    "tech:programming-language": "Soplang",
    "tech:implementation-language": "Python",
    "tech:primary-purpose": "Education, Software Development",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  classification:
    "Programming Language, Education, Software Development, Cultural Technology, Linguistic Innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="so"
      suppressHydrationWarning
      className={`${inter.className} antialiased`}
      dir="ltr"
      translate="no"
    >
      <body
        className={`${inter.className} font-sans antialiased`}
        suppressHydrationWarning
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
