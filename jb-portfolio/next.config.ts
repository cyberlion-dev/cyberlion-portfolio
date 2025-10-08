import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Firebase hosting
  output: 'export',

  // Optional: Add trailing slashes for better Firebase routing
  trailingSlash: true,

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
