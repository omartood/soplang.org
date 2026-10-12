export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://soplang.org").replace(/\/$/, "");

export const SITE_NAME = "Soplang";

export const SITE_TITLE = "Soplang – The First Somali Programming Language";

export const SITE_DESCRIPTION =
  "Soplang is a free, open-source programming language with Somali keywords. Write programs with qor, haddii, and hawl, and learn to code in the language you think in.";

export const CONTACT_EMAIL = "info@soplang.org";

export const CREATOR = {
  name: "Sharafdin Yusuf",
  url: "https://www.sharafdin.com/",
  sameAs: ["https://github.com/sharafdin"],
};

export const MAINTAINER = {
  name: "Somast",
  url: "https://www.somast.so/",
};

export const REPOSITORY_URL = "https://github.com/soplang/soplang";

export const SAME_AS = ["https://github.com/soplang", REPOSITORY_URL];

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
