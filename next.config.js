/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  swcMinify: true,
  optimizeFonts: true,
  images: {
    domains: [
      "m.media-amazon.com",
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
