/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'image.mux.com'],
  },
  transpilePackages: ['@mux/mux-player-react']
}

module.exports = nextConfig 