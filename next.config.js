/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Static export for Netlify
  output: 'export',
  distDir: 'out',
};

module.exports = nextConfig; 