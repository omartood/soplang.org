import {
  CONTACT_EMAIL,
  CREATOR,
  MAINTAINER,
  REPOSITORY_URL,
  SAME_AS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/site";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

// Renders structured data in the server HTML so crawlers see it without JavaScript.
export function JsonLd({ data }: JsonLdProps) {
  const graph = Array.isArray(data) ? data : [data];
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });

  return (
    <script
      type="application/ld+json"
      // Escape "<" so content can never close the script tag early.
      dangerouslySetInnerHTML={{ __html: json.replace(/</g, "\\u003c") }}
    />
  );
}

export const ids = {
  website: `${SITE_URL}/#website`,
  language: `${SITE_URL}/#language`,
  software: `${SITE_URL}/#software`,
  creator: `${SITE_URL}/#creator`,
  maintainer: `${SITE_URL}/#maintainer`,
};

export const creatorSchema = {
  "@type": "Person",
  "@id": ids.creator,
  name: CREATOR.name,
  url: CREATOR.url,
  sameAs: CREATOR.sameAs,
};

export const maintainerSchema = {
  "@type": "Organization",
  "@id": ids.maintainer,
  name: MAINTAINER.name,
  url: MAINTAINER.url,
  email: CONTACT_EMAIL,
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": ids.website,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: ["en", "so"],
  publisher: { "@id": ids.maintainer },
};

export const languageSchema = {
  "@type": "ComputerLanguage",
  "@id": ids.language,
  name: SITE_NAME,
  alternateName: "Somali Programming Language",
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: absoluteUrl("/og.png"),
  inLanguage: "so",
  dateCreated: "2023",
  creator: { "@id": ids.creator },
  maintainer: { "@id": ids.maintainer },
  license: "https://opensource.org/license/mit",
  sameAs: SAME_AS,
};

export function softwareSchema(version: string) {
  return {
    "@type": "SoftwareApplication",
    "@id": ids.software,
    name: SITE_NAME,
    description: "Compiler, REPL, and command-line tools for the Soplang programming language.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Windows, macOS, Linux",
    softwareVersion: version.replace(/^v/, ""),
    url: absoluteUrl("/downloads"),
    downloadUrl: absoluteUrl("/downloads"),
    codeRepository: REPOSITORY_URL,
    license: "https://opensource.org/license/mit",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@id": ids.creator },
    publisher: { "@id": ids.maintainer },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
