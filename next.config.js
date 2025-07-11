/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Force dynamic rendering for all pages to avoid SSG issues
  experimental: {
    appDir: true,
    forceSwcTransforms: true,
  },
  // Disable static optimization
  generateStaticParams: false,
  dynamicParams: true,
};

module.exports = nextConfig; 