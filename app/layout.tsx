import Footer from "@/components/Footer";
import "./global.css";

import "@/lib/metadata";
import { getJsonLd } from "@/lib/schema";
import "@/styles/soplang-syntax.css";
import "@/styles/terminal.css";
import { RootProvider } from "fumadocs-ui/provider/next";

import { inter, roboto } from "@/lib/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="so"
      suppressHydrationWarning
      className={`${roboto.variable} antialiased`}
      dir="ltr"
      translate="no"
    >
      <head>
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function() {
            try {
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              const theme = localStorage.getItem('theme') || systemTheme;
              if (theme === 'dark') document.documentElement.classList.add('dark');
            } catch (e) {}
          })()
        `,
          }}
        />
        <link rel="alternate" hrefLang="so-SO" href="https://soplang.org/so" />
        <link rel="alternate" hrefLang="en-US" href="https://soplang.org/en" />
        <link rel="alternate" hrefLang="x-default" href="https://soplang.org" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="google" content="notranslate" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Favicons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#1e3a8a" />
        <meta name="theme-color" content="#ffffff" />

        {/* Facebook specific meta tags */}
        <meta property="fb:app_id" content="your-fb-app-id" />

        {/* Additional social media meta tags */}
        <meta property="og:site_name" content="Soplang" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="so_SO" />
        <meta property="og:locale:alternate" content="en_US" />

        {/* LinkedIn specific meta tags */}
        <meta property="linkedin:card" content="summary_large_image" />
        <meta
          property="linkedin:title"
          content="Soplang - The First Somali Programming Language"
        />
        <meta
          property="linkedin:description"
          content="Soplang is a modern Somali programming language created by Mr Sharafdin, first released in October 2023. It makes coding intuitive and accessible with native Somali syntax."
        />
        <meta
          property="linkedin:image"
          content="https://soplang.org/images/logo/logo-512.png"
        />

        {/* Mobile app specific */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="apple-mobile-web-app-title" content="Soplang" />
        <meta name="application-name" content="Soplang" />
        <meta name="format-detection" content="telephone=no" />

        {/* Rich snippets for search engines */}
        <meta
          name="description"
          content="Soplang is the first Somali programming language created by Mr Sharafdin in October 2023, making coding intuitive and accessible with native Somali syntax."
        />
        <meta name="author" content="Soplang Software Foundation" />
        <meta
          name="copyright"
          content={`© ${new Date().getFullYear()} Soplang Software Foundation`}
        />
        <meta name="language" content="Somali" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />

        {/* Schema.org JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getJsonLd()),
          }}
        />
      </head>
      <body
        className={`${roboto.className} ${inter.className} font-sans antialiased`}
        suppressHydrationWarning
      >
        <RootProvider>
          {children}
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
}
