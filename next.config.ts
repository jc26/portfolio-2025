import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://jchang.cc/:path*',
        permanent: true,
      }
    ]
  },

  images: {
    domains: ['res.cloudinary.com', 'image.mux.com'],
  },
  transpilePackages: ['@mux/mux-player-react']
};

export default nextConfig;