/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  /* config options here */
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Redirects from old co-pilot routes to new hierarchical routes
  async redirects() {
    return [
      {
        source: '/target-validation',
        destination: '/ledger/ceacam5/',
        permanent: true,
      },
      {
        source: '/target-validation/',
        destination: '/ledger/ceacam5/',
        permanent: true,
      },
      {
        source: '/resistance',
        destination: '/ledger/capri/',
        permanent: true,
      },
      {
        source: '/resistance/',
        destination: '/ledger/capri/',
        permanent: true,
      },
      {
        source: '/moa',
        destination: '/ledger/latify/',
        permanent: true,
      },
      {
        source: '/moa/',
        destination: '/ledger/latify/',
        permanent: true,
      },
      {
        source: '/use-case',
        destination: '/manuscripts',
        permanent: true,
      },
      {
        source: '/use-case/',
        destination: '/manuscripts/',
        permanent: true,
      },
      {
        source: '/use-case/:slug',
        destination: '/manuscripts/:slug',
        permanent: true,
      },
      {
        source: '/use-case/:slug/',
        destination: '/manuscripts/:slug/',
        permanent: true,
      },
      {
        source: '/engine/evidence-matrix',
        destination: '/engine/safety/',
        permanent: true,
      },
      {
        source: '/engine/evidence-matrix/',
        destination: '/engine/safety/',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/research',
        permanent: true,
      },
      {
        source: '/blog/',
        destination: '/research/',
        permanent: true,
      },
      {
        source: '/blog/post/:slug',
        destination: '/research/blog/:slug',
        permanent: true,
      },
      {
        source: '/blog/post/:slug/',
        destination: '/research/blog/:slug/',
        permanent: true,
      },
      // Oncology co-pilots
      {
        source: '/platform/chemo',
        destination: '/products/oncology/match-patients-to-therapies/chemo',
        permanent: true,
      },
      {
        source: '/platform/clinical-trials',
        destination: '/products/oncology/clinical-trials',
        permanent: true,
      },
      // Redirect old co-pilot routes to capability pages (co-pilots are now tabs or direct content)
      {
        source: '/products/oncology/match-patients-to-therapies/chemo',
        destination: '/products/oncology/match-patients-to-therapies',
        permanent: true,
      },
      {
        source: '/products/oncology/match-patients-to-therapies/therapy-fit',
        destination: '/products/oncology/match-patients-to-therapies',
        permanent: true,
      },
      {
        source: '/products/oncology/match-patients-to-therapies/immunotherapy',
        destination: '/products/oncology/match-patients-to-therapies',
        permanent: true,
      },
      {
        source: '/products/oncology/prevent-toxicity/toxicity-risk',
        destination: '/products/oncology/prevent-toxicity',
        permanent: true,
      },
      {
        source: '/products/r-d/target-validation/pathway',
        destination: '/products/r-d/target-validation',
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
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-router-dom': path.resolve(__dirname, 'src/lib/router-compat.tsx'),
    };
    return config;
  },
};

module.exports = nextConfig; 