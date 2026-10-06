import type { Metadata } from "next";
import "@fontsource-variable/unbounded";
import "@fontsource-variable/instrument-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scroll-driven hero | Welcome ItzFizz",
  description: "A pinned hero where a top-down car drives across the screen and reveals the content as you scroll.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
