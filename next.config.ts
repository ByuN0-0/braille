import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      { source: "/learn", headers: [{ key: "Cache-Control", value: "no-store" }] },
      { source: "/learn/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
      { source: "/practice", headers: [{ key: "Cache-Control", value: "no-store" }] },
      { source: "/practice/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
      { source: "/table", headers: [{ key: "Cache-Control", value: "no-store" }] },
      { source: "/table/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
};

export default nextConfig;
