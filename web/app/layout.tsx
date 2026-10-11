import type { Metadata, Viewport } from "next";
import "@fontsource-variable/bodoni-moda/opsz.css";
import "@fontsource-variable/bodoni-moda/opsz-italic.css";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";

import { site } from "@/content/site";

const title = `${site.name}: Strategy, Story & Voice`;
const description =
  "Miracle Akhimien: Social Media Manager, Content Creator & Voice-Over Artist. Helping ambitious brands build a stronger digital presence through strategic content, creative storytelling and social media management.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  openGraph: { title, description, images: ["/media/about-suit-853.webp"], type: "website" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b0a09",
};

// Runs before paint so the page never flashes the wrong theme. Dark is the default.
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');d.dataset.theme=t==='light'?'light':'dark'}catch(e){d.dataset.theme='dark'}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/orange-avenue.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
