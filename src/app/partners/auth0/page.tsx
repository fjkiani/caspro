import React from 'react';
import { Metadata } from 'next';
import PartnerPage from '@/components/partners/PartnerPage';

export const metadata: Metadata = {
  title: 'Auth0 - CrisPRO.ai Partner',
  description: 'Learn about our partnership with Auth0, the identity platform providing secure authentication and authorization solutions.',
};

const auth0Data = {
  id: 'auth0',
  name: 'Auth0',
  logo: '/images/partners/events/auth0.png',
  description: 'Identity platform providing secure authentication and authorization solutions',
  website: 'https://auth0.com',
  color: 'text-purple-600',
  bgColor: 'bg-purple-50',
  fullDescription: 'Auth0 is a leading identity platform that provides authentication and authorization services for applications. Founded in 2013, Auth0 serves thousands of customers worldwide with secure, scalable identity solutions.',
  partnership: {
    title: 'Security Partnership',
    description: 'CrisPRO.ai integrates with Auth0 to provide enterprise-grade security and identity management for our AI platform.',
    benefits: [
      'Enterprise-grade authentication and authorization',
      'Single sign-on (SSO) integration for enterprise customers',
      'Role-based access control for sensitive research data',
      'Compliance with healthcare and research security standards'
    ]
  },
  impact: {
    title: 'Security Impact',
    metrics: [
      { label: 'Enterprise Customers', value: '100+', description: 'Enterprise customers using Auth0 integration' },
      { label: 'Security Incidents', value: '0', description: 'Zero security incidents since implementation' },
      { label: 'Compliance', value: '100%', description: 'Compliance with healthcare security standards' },
      { label: 'User Satisfaction', value: '98%', description: 'User satisfaction with authentication experience' }
    ]
  },
  testimonials: [
    {
      quote: "Auth0's integration with CrisPRO.ai has enabled us to provide enterprise-grade security while maintaining a seamless user experience for our research teams.",
      author: "Jennifer Kim",
      title: "Chief Security Officer",
      organization: "CrisPRO.ai"
    }
  ],
  caseStudies: [
    {
      title: 'Enterprise Security Implementation',
      description: 'Implemented Auth0 for enterprise customers requiring advanced security and compliance features.',
      results: '100% compliance with HIPAA and SOC 2 standards',
      impact: 'Enabled enterprise adoption of CrisPRO.ai platform'
    },
    {
      title: 'Single Sign-On Integration',
      description: 'Deployed SSO integration for large research institutions and pharmaceutical companies.',
      results: '98% user satisfaction with authentication experience',
      impact: 'Streamlined access management for research teams'
    }
  ]
};

export default function Auth0PartnerPage() {
  return <PartnerPage data={auth0Data} />;
}
