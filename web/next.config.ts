import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  async headers() {
    const year = "public, max-age=31536000, immutable";
    const lock = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
      { key: "X-Robots-Tag", value: "noindex, nofollow" },
      { key: "Cache-Control", value: "no-store" },
      { key: "Referrer-Policy", value: "no-referrer" },
      { key: "X-Content-Type-Options", value: "nosniff" },
    ];
    return [
      { source: "/admin", headers: lock },
      { source: "/api/:path*", headers: lock },
      { source: "/media/hls/:path*", headers: [{ key: "Cache-Control", value: year }] },
      { source: "/media/posters/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800" }] },
    ];
  },
};

export default nextConfig;
