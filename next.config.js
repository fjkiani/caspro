/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Use standalone for Netlify with dynamic rendering
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
};

module.exports = nextConfig; 