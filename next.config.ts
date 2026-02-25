import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ❌ retire output export
  // output: "export",
  images: { unoptimized: true }, // tu peux garder si tu veux
};

export default nextConfig;