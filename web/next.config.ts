import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  async headers() {
    const year = "public, max-age=31536000, immutable";
    return [
      { source: "/media/hls/:path*", headers: [{ key: "Cache-Control", value: year }] },
      { source: "/media/posters/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=604800" }] },
    ];
  },
};

export default nextConfig;
