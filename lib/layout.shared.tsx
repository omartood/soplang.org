import { NavLogo } from "@/components/Navbar";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <NavLogo />,
    },
    themeSwitch: {
      enabled: false,
    },
    links: [
      { text: "Home", url: "/", active: "nested-url" },
      { text: "Downloads", url: "/downloads", active: "nested-url" },
      { text: "Documentation", url: "/docs", active: "nested-url" },
      { text: "About", url: "/about", active: "nested-url" },
    ],
  };
}

export function docsOptions(): BaseLayoutProps {
  const { nav } = baseOptions();

  return {
    nav,
    links: [],
    themeSwitch: {
      enabled: false,
    },
  };
}
