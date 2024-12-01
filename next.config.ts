import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'image.mux.com'],
  },
  transpilePackages: ['@mux/mux-player-react']
};

export default nextConfig;