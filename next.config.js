/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Enable static export if needed
  // output: 'export',
};

module.exports = nextConfig; 