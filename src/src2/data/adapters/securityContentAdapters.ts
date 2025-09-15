// Security Content Adapters
// Transform extracted security content into slide content component formats

import { getAllSecurityContent } from './securityContentExtractor';

// Transform security content into slide content formats
export const toSecuritySlideContent = (contentType: 'architecture' | 'ai-security' | 'compliance' | 'deployment' | 'research') => {
  const securityContent = getAllSecurityContent();
  
  switch (contentType) {
    case 'architecture':
      return {
        type: 'security-architecture',
        data: {
          title: "Two-Layer Security Architecture",
          layers: [
            {
              title: "Layer 1: Identity & Authentication",
              technology: "Auth0 Enterprise Integration",
              features: [
                "Multi-factor authentication (MFA)",
                "Single Sign-On (SSO) support",
                "Role-based access control (RBAC)",
                "Enterprise directory integration"
              ],
              performance: "Sub-50ms authentication response",
              compliance: "SOC 2, HIPAA, GDPR compliant",
              color: "blue"
            },
            {
              title: "Layer 2: Asset-Level Access Control",
              technology: "Blockchain Smart Contracts",
              features: [
                "Granular permission mapping",
                "Immutable audit trails",
                "Cryptographic asset signatures",
                "Smart contract enforcement"
              ],
              performance: "Real-time permission validation",
              compliance: "Immutable compliance records",
              color: "purple"
            }
          ],
          integration: {
            title: "Seamless Integration",
            description: "Auth0 handles identity verification while blockchain ensures asset-specific permissions with cryptographic precision."
          }
        },
        layout: 'full'
      };

    case 'ai-security':
      return {
        type: 'ai-engine-security',
        data: {
          title: "AI Engine Security & Verification",
          protection: {
            title: "AI Engine Protection",
            items: [
              {
                title: "Isolated Execution",
                text: "Each AI engine operates in secure environments with blockchain-enforced permissions for specific therapeutic assets and research projects."
              },
              {
                title: "Real-time Tracking",
                text: "Every Oracle prediction, Forge design, and Boltz validation is cryptographically signed and recorded on-chain with timestamps."
              },
              {
                title: "Access Control",
                text: "Automatic isolation protocols activate if any AI engine attempts unauthorized access to restricted IP or partner data."
              }
            ]
          },
          verification: {
            title: "Verifiable AI Operations",
            items: [
              {
                label: "Zeta Oracle",
                status: "✓ Verified",
                statusColor: "green",
                description: "RUNX1 variant classified as Pathogenic (Zeta Score: 0.97)",
                metadata: "Hash: 0x4f7a...b3d2 | Block: 12,847,293"
              },
              {
                label: "Zeta Forge",
                status: "✓ Verified",
                statusColor: "green",
                description: "Generated optimized CRISPR design for validated target",
                metadata: "Hash: 0x8a2f...c7e1 | Block: 12,847,305"
              },
              {
                label: "Zeta Boltz",
                status: "✓ Verified",
                statusColor: "green",
                description: "Structural validation: 98.7% binding affinity confirmed",
                metadata: "Hash: 0x1c9e...f4a8 | Block: 12,847,312"
              }
            ]
          },
          accountability: {
            title: "Unprecedented AI Accountability",
            text: "When AI engines generate therapeutic designs worth billions, you need verifiable proof of every decision. Zeta Shield provides cryptographic evidence of every Oracle analysis, Forge design, and Boltz validation—creating an unforgeable record of your IP creation process."
          }
        },
        layout: 'full'
      };

    case 'compliance':
      return {
        type: 'compliance-audit',
        data: {
          title: "Compliance & Audit Trail",
          standards: {
            title: "Supported Standards",
            items: [
              {
                title: "SOC 2 Type II",
                subtitle: "Continuous monitoring"
              },
              {
                title: "HIPAA",
                subtitle: "Healthcare data protection"
              },
              {
                title: "GDPR",
                subtitle: "EU data privacy"
              },
              {
                title: "ISO 27001",
                subtitle: "Information security"
              }
            ]
          },
          dashboard: {
            title: "Real-Time Audit Dashboard",
            items: [
              {
                label: "Data Access Events",
                value: "1,247 logged"
              },
              {
                label: "User Authentication",
                value: "98.7% success"
              },
              {
                label: "Blockchain Verifications",
                value: "100% verified"
              },
              {
                label: "Compliance Score",
                value: "99.2%"
              }
            ],
            export: {
              title: "Audit Export Ready",
              text: "Generate compliance reports in seconds for any auditor or regulatory body."
            }
          },
          advantages: [
            {
              title: "Immutable History",
              text: "Every action is permanently recorded on-chain, creating an unforgeable audit trail."
            },
            {
              title: "Automated Reporting",
              text: "Compliance reports generate automatically, reducing audit preparation from weeks to hours."
            },
            {
              title: "Continuous Monitoring",
              text: "Real-time compliance checking ensures you never fall out of regulatory requirements."
            }
          ]
        },
        layout: 'full'
      };

    case 'deployment':
      return {
        type: 'comparison',
        data: {
          title: "Enterprise Deployment Models",
          items: [
            {
              title: "Zeta Shield Cloud",
              description: "Multi-tenant SaaS deployment with global edge infrastructure",
              pros: [
                "99.99% uptime SLA",
                "Global edge deployment",
                "Automatic scaling",
                "Starting at $10K/month"
              ],
              cons: [
                "Shared infrastructure",
                "Limited customization"
              ],
              metrics: {
                "Uptime": "99.99%",
                "Pricing": "$10K/month",
                "Target": "Startups & Mid-size Biotechs"
              },
              status: "advantage"
            },
            {
              title: "Zeta Shield Enterprise",
              description: "Private cloud deployment with dedicated infrastructure",
              pros: [
                "Complete infrastructure isolation",
                "Custom compliance configurations",
                "Dedicated support team",
                "On-premises option available"
              ],
              cons: [
                "Higher cost",
                "Longer deployment time"
              ],
              metrics: {
                "Isolation": "Complete",
                "Pricing": "Custom enterprise",
                "Target": "Large Pharma & Fortune 500"
              },
              status: "advantage"
            },
            {
              title: "Zeta Shield Embedded",
              description: "API-first integration for platform providers",
              pros: [
                "API-first integration",
                "White-label options",
                "Custom workflows",
                "Revenue sharing model"
              ],
              cons: [
                "Requires technical integration",
                "Per-transaction pricing"
              ],
              metrics: {
                "Integration": "API-first",
                "Pricing": "Per-transaction",
                "Target": "Platform Providers & VCs"
              },
              status: "advantage"
            }
          ]
        },
        layout: 'full'
      };

    case 'research':
      return {
        type: 'pathway',
        data: {
          steps: [
            {
              id: "predictive-analysis",
              title: "Predictive Analysis",
              description: "Zeta Oracle analyzes variants and delivers quantitative risk scores. Predictions are cryptographically signed.",
              icon: "🔍",
              status: "highlight"
            },
            {
              id: "therapeutic-design",
              title: "Therapeutic Design",
              description: "Zeta Forge generates candidates from validated targets. Smart contracts gate design initiation.",
              icon: "⚙️",
              status: "highlight"
            },
            {
              id: "structural-validation",
              title: "Structural Validation",
              description: "Zeta Boltz runs 3D simulations to validate binding; results stored on-chain.",
              icon: "🎯",
              status: "highlight"
            },
            {
              id: "ip-asset-creation",
              title: "IP Asset Creation",
              description: "Research packaged into verifiable IP-NFTs with complete provenance.",
              icon: "📦",
              status: "highlight"
            }
          ]
        },
        layout: 'full'
      };

    default:
      return null;
  }
};

// Create slide content for different security topics
export const createSecuritySlideContent = (topic: string) => {
  const contentMap = {
    'architecture': 'architecture',
    'ai-security': 'ai-security',
    'compliance': 'compliance',
    'deployment': 'deployment',
    'research': 'research'
  };

  const contentType = contentMap[topic as keyof typeof contentMap];
  if (!contentType) return null;

  return toSecuritySlideContent(contentType as any);
};

// Transform extracted content into metrics format
export const toSecurityMetrics = (content: any) => {
  return {
    type: 'metrics',
    data: {
      title: "Security Performance Metrics",
      metrics: [
        {
          label: "Uptime SLA",
          value: "99.99%",
          unit: "",
          trend: "stable",
          status: "good",
          description: "Enterprise-grade availability"
        },
        {
          label: "Auth Response Time",
          value: "<50ms",
          unit: "",
          trend: "up",
          status: "good",
          description: "Sub-50ms authentication response"
        },
        {
          label: "Encryption",
          value: "256-bit",
          unit: "AES",
          trend: "stable",
          status: "good",
          description: "Military-grade encryption"
        },
        {
          label: "Compliance Score",
          value: "99.2%",
          unit: "",
          trend: "up",
          status: "good",
          description: "Regulatory compliance rating"
        }
      ],
      layout: 'dashboard'
    },
    layout: 'full'
  };
};

// Transform extracted content into comparison format
export const toSecurityComparison = (content: any) => {
  return {
    type: 'comparison',
    data: {
      title: "Traditional Security vs. IP-Centric Security",
      items: [
        {
          title: "Traditional IT Security",
          description: "Network perimeter defense and server-based protection",
          pros: [
            "Network perimeter defense",
            "Server-based protection",
            "Role-based system access"
          ],
          cons: [
            "IP can be copied instantly",
            "No proof of data integrity",
            "Generic permissions for all assets"
          ],
          status: "disadvantage"
        },
        {
          title: "Cloud Security Platforms",
          description: "Infrastructure monitoring and general threat detection",
          pros: [
            "Infrastructure monitoring",
            "General threat detection",
            "Compliance dashboards"
          ],
          cons: [
            "One-size-fits-all approach",
            "No granular asset tracking",
            "No verifiable audit trails"
          ],
          status: "disadvantage"
        },
        {
          title: "Zeta Shield",
          description: "Purpose-built for securing biological intellectual property",
          pros: [
            "Asset-specific protection",
            "Cryptographic access control",
            "Immutable audit trails",
            "Smart contract permissions",
            "Therapeutic IP security"
          ],
          cons: [],
          status: "advantage"
        }
      ]
    },
    layout: 'full'
  };
};

// Export all adapters
export const SecurityContentAdapters = {
  toSecuritySlideContent,
  createSecuritySlideContent,
  toSecurityMetrics,
  toSecurityComparison
};

export default SecurityContentAdapters;
