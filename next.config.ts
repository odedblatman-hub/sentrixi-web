import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Allow MP4 video files to be served from public/videos/
  // and dashboard PNG screenshots from public/dashboards/
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/dashboards/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
