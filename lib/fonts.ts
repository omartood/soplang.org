import { Inter } from "next/font/google";

// export const roboto = Bricolage_Grotesque({
//   weight: ["400", "500", "700"],
//   subsets: ["latin"],
//   display: "block",
//   variable: "--font-roboto",
//   preload: true,
//   fallback: [
//     "system-ui",
//     "-apple-system",
//     "BlinkMacSystemFont",
//     "Segoe UI",
//     "Roboto",
//     "Arial",
//     "sans-serif",
//   ],
// });

export const inter = Inter({
  subsets: ["latin"],
  display: "block",
  preload: true,
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Arial",
    "sans-serif",
  ],
});
