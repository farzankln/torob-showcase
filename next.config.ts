import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.torob.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "torob.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "statics.torob.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
