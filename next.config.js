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
  // Redirects from old co-pilot routes to new hierarchical routes
  async redirects() {
    return [
      // Oncology co-pilots
      {
        source: '/platform/chemo',
        destination: '/products/oncology/match-patients-to-therapies/chemo',
        permanent: true,
      },
      {
        source: '/platform/clinical-trials',
        destination: '/products/oncology/match-patients-to-therapies/clinical-trials',
        permanent: true,
      },
      {
        source: '/platform/therapy-fit',
        destination: '/products/oncology/match-patients-to-therapies/therapy-fit',
        permanent: true,
      },
      {
        source: '/platform/toxicity-risk',
        destination: '/products/oncology/prevent-toxicity/toxicity-risk',
        permanent: true,
      },
      {
        source: '/platform/pathway',
        destination: '/products/r-d/target-validation/pathway',
        permanent: true,
      },
      {
        source: '/platform/crispr-intelligence',
        destination: '/products/r-d/therapeutic-design/crispr-intelligence',
        permanent: true,
      },
      {
        source: '/platform/oracle-intelligence',
        destination: '/products/research/variant-analysis/oracle-intelligence',
        permanent: true,
      },
      {
        source: '/platform/forge-intelligence',
        destination: '/products/research/therapeutic-design/forge-intelligence',
        permanent: true,
      },
      {
        source: '/platform/scribe-intelligence',
        destination: '/products/research/variant-analysis/scribe-intelligence',
        permanent: true,
      },
      {
        source: '/platform/agentic-emr',
        destination: '/products/oncology/match-patients-to-therapies/agentic-emr',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig; 