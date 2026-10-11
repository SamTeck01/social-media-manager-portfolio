import type { Metadata, Viewport } from "next";
import "@fontsource/instrument-serif/400.css";
import "@fontsource/instrument-serif/400-italic.css";
import "@fontsource-variable/inter-tight";
import "./globals.css";
import { site } from "@/content/site";

const description =
  "Miracle Akhimien is a social media manager, content creator and voice-over artist working with brands in Nigeria and the United States.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | Social Media, Content & Voice`,
  description,
  openGraph: {
    title: `${site.name} | Social Media, Content & Voice`,
    description,
    images: ["/media/portrait.webp"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0e0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
