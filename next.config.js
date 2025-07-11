/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Force dynamic rendering
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

module.exports = nextConfig; 