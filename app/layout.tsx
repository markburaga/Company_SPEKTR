import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";

const manrope = Manrope({
  // Variable font: exposes the full 200–900 weight axis (incl. 900/font-black)
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.name} — Вывоз мусора в Сочи 24/7`,
  description: site.description,
  metadataBase: new URL(site.url),
  openGraph: {
    title: `${site.name} — Вывоз мусора в Сочи`,
    description: site.description,
    locale: "ru_RU",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a1a0f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${manrope.variable} antialiased`}>
      <body className="min-h-dvh bg-ink text-white">{children}</body>
    </html>
  );
}
