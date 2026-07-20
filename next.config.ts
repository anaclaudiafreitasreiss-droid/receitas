import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ufsb.edu.br",
      },
    ],
  },
};

export default nextConfig;