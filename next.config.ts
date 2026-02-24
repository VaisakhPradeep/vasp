import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    qualities: [75, 95, 100],
  },
};

export default nextConfig;
