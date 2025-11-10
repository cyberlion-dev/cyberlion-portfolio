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

  // Exclude lambda directory from build
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/app/christmas-drawing/lambda/**'],
    };
    return config;
  },

  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
