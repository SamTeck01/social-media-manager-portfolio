import type { MetadataRoute } from "next";

// Keep crawlers and AI scrapers off the video and audio files: one sweep of
// /media downloads ~860 MB, which burned through Vercel's bandwidth.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/media/", "/api/", "/admin"] }],
  };
}
