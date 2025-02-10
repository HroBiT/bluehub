import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: 'dist',
  output: 'standalone', // Ensure server-side rendering
};

export default nextConfig;