// Security Technical Content Adapters
// Transform technical security-focused content into component-ready props

// Transform security technical content into block components
export const toSecurityTechnicalBlocks = (content: any): any[] => {
  return [
    {
      kind: 'architecture-diagram',
      props: content.architecture || {
        title: 'Security Architecture Overview',
        description: 'Two-layer security architecture with identity and asset-level protection',
        layers: [
          { name: 'Identity Layer', technology: 'Auth0 Enterprise', features: ['MFA', 'SSO', 'RBAC'] },
          { name: 'Asset Layer', technology: 'Blockchain Smart Contracts', features: ['Granular Permissions', 'Audit Trails', 'Cryptographic Signatures'] }
        ]
      }
    },
    {
      kind: 'compliance-badges',
      props: content.compliance || {
        title: 'Compliance Certifications',
        description: 'Enterprise-grade compliance and security certifications',
        badges: [
          { name: 'SOC 2 Type II', status: 'Certified', icon: 'FileCheck' },
          { name: 'HIPAA', status: 'Certified', icon: 'Shield' },
          { name: 'GDPR', status: 'Certified', icon: 'Globe' },
          { name: 'ISO 27001', status: 'Certified', icon: 'Lock' }
        ]
      }
    },
    {
      kind: 'deployment-matrix',
      props: content.deployment || {
        title: 'Deployment Security Matrix',
        description: 'Security features across different deployment models',
        models: [
          { name: 'Cloud', security: ['Multi-tenant isolation', '24/7 monitoring', 'Automated compliance'] },
          { name: 'Enterprise', security: ['Complete isolation', 'Dedicated security team', 'Custom compliance'] },
          { name: 'Embedded', security: ['API-level security', 'Real-time monitoring', 'Embedded compliance'] }
        ]
      }
    },
    {
      kind: 'access-matrix',
      props: content.access || {
        title: 'Access Control Matrix',
        description: 'Granular access control for different user types and assets',
        controls: [
          { user: 'Researchers', assets: ['Variant data', 'Analysis results'], permissions: ['Read', 'Analyze'] },
          { user: 'Partners', assets: ['Project data', 'Results'], permissions: ['Read', 'Export'] },
          { user: 'Administrators', assets: ['All data', 'System config'], permissions: ['Full access'] }
        ]
      }
    },
    {
      kind: 'identity-integrations',
      props: content.identity || {
        title: 'Identity Integration',
        description: 'Auth0 integration with enterprise directory systems',
        integrations: [
          { name: 'Active Directory', status: 'Supported', features: ['SSO', 'Group sync', 'MFA'] },
          { name: 'LDAP', status: 'Supported', features: ['Authentication', 'User sync'] },
          { name: 'SAML', status: 'Supported', features: ['SSO', 'Attribute mapping'] }
        ]
      }
    },
    {
      kind: 'research-pipeline',
      props: content.pipeline || {
        title: 'Secure Research Pipeline',
        description: 'End-to-end security for AI research workflows',
        stages: [
          { name: 'Input Validation', security: ['Data sanitization', 'Access verification'] },
          { name: 'AI Processing', security: ['Isolated execution', 'Result signing'] },
          { name: 'Output Protection', security: ['Encryption', 'Access control'] }
        ]
      }
    }
  ];
};

// Transform security technical content into slide props
export const toSecurityTechnicalSlideProps = (content: any): any => {
  return {
    title: content.title,
    subtitle: content.subtitle,
    architecture: content.architecture,
    security: content.security,
    compliance: content.compliance,
    siteBlocks: toSecurityTechnicalBlocks(content)
  };
};

// Transform security architecture data
export const toSecurityArchitectureProps = (data: any) => {
  return {
    layers: data.layers || [
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
        compliance: "SOC 2, HIPAA, GDPR compliant"
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
        compliance: "Immutable compliance records"
      }
    ],
    integration: data.integration || {
      title: "Seamless Integration",
      description: "Auth0 handles identity verification while blockchain ensures asset-specific permissions with cryptographic precision."
    }
  };
};

// Transform multi-tenant architecture data
export const toMultiTenantArchitectureProps = (data: any) => {
  return {
    tenants: data.tenants || [
      {
        name: "Biotech Corp A",
        isolation: {
          data: "Encrypted data partitions with tenant-specific keys",
          compute: "Dedicated AI agent instances",
          network: "Isolated network namespaces",
          storage: "Separate encrypted storage volumes"
        },
        compliance: "Custom compliance configurations",
        monitoring: "Dedicated audit trails"
      },
      {
        name: "Zeta Shield Core",
        isolation: {
          data: "Unified identity management (Auth0)",
          compute: "Shared security infrastructure",
          network: "Global threat detection network",
          storage: "Centralized security logs"
        },
        compliance: "Platform-wide security standards",
        monitoring: "Global security monitoring"
      }
    ],
    guarantees: data.guarantees || [
      {
        title: "Data Sovereignty",
        description: "Complete data isolation with tenant-specific encryption keys and storage partitions",
        icon: "Database"
      },
      {
        title: "Network Segmentation",
        description: "Isolated network namespaces prevent cross-tenant data leakage",
        icon: "Network"
      },
      {
        title: "Compliance Per Tenant",
        description: "Customizable compliance controls for different regulatory requirements",
        icon: "FileCheck"
      }
    ]
  };
};

// Transform AI engine security data
export const toAIEngineSecurityProps = (data: any) => {
  return {
    engines: data.engines || [
      {
        name: "Zeta Oracle",
        security: {
          isolation: "Secure execution environment with blockchain-enforced permissions",
          tracking: "Every prediction cryptographically signed and recorded on-chain",
          access: "Automatic isolation protocols for unauthorized access attempts"
        },
        verification: {
          status: "✓ Verified",
          description: "RUNX1 variant classified as Pathogenic (Zeta Score: 0.97)",
          metadata: "Hash: 0x4f7a...b3d2 | Block: 12,847,293"
        }
      },
      {
        name: "Zeta Forge",
        security: {
          isolation: "Isolated design environment with smart contract permissions",
          tracking: "Every design output cryptographically protected and timestamped",
          access: "Only Oracle-verified targets can initiate design processes"
        },
        verification: {
          status: "✓ Verified",
          description: "Generated optimized CRISPR design for validated target",
          metadata: "Hash: 0x8a2f...c7e1 | Block: 12,847,305"
        }
      }
    ],
    accountability: data.accountability || {
      title: "Unprecedented AI Accountability",
      description: "When AI engines generate therapeutic designs worth billions, you need verifiable proof of every decision. Zeta Shield provides cryptographic evidence of every Oracle analysis, Forge design, and Boltz validation—creating an unforgeable record of your IP creation process."
    }
  };
};

// Transform threat detection data
export const toThreatDetectionProps = (data: any) => {
  return {
    detection: data.detection || {
      categories: [
        {
          title: "Access Anomalies",
          icon: "Eye",
          threats: [
            "Unusual access patterns",
            "Failed authentication attempts",
            "Privilege escalation attempts",
            "Cross-tenant access attempts"
          ],
          response: "Automatic account lockout and alert generation"
        },
        {
          title: "Data Exfiltration",
          icon: "Database",
          threats: [
            "Large data downloads",
            "Unauthorized data exports",
            "Suspicious API usage",
            "Bulk data access patterns"
          ],
          response: "Immediate data access suspension and forensic analysis"
        }
      ]
    },
    response: data.response || {
      title: "Automated Response Framework",
      sections: [
        {
          title: "Immediate Response",
          actions: [
            "Automatic threat isolation",
            "Real-time alert generation",
            "Security team notification",
            "Incident logging and tracking"
          ]
        },
        {
          title: "Forensic Analysis",
          actions: [
            "Blockchain audit trail analysis",
            "Access pattern investigation",
            "Threat actor identification",
            "Impact assessment and reporting"
          ]
        }
      ]
    }
  };
};

// Transform compliance data
export const toComplianceProps = (data: any) => {
  return {
    standards: data.standards || {
      title: "Supported Compliance Standards",
      items: [
        {
          standard: "SOC 2 Type II",
          description: "Continuous monitoring and reporting",
          status: "✓ Certified",
          icon: "FileCheck"
        },
        {
          standard: "HIPAA",
          description: "Healthcare data protection compliance",
          status: "✓ Certified",
          icon: "Shield"
        },
        {
          standard: "GDPR",
          description: "EU data privacy regulation compliance",
          status: "✓ Certified",
          icon: "Globe"
        },
        {
          standard: "ISO 27001",
          description: "Information security management",
          status: "✓ Certified",
          icon: "Lock"
        }
      ]
    },
    dashboard: data.dashboard || {
      title: "Real-Time Compliance Dashboard",
      metrics: [
        { label: "Data Access Events", value: "1,247 logged", status: "Compliant" },
        { label: "User Authentication", value: "98.7% success", status: "Compliant" },
        { label: "Blockchain Verifications", value: "100% verified", status: "Compliant" },
        { label: "Compliance Score", value: "99.2%", status: "Excellent" }
      ],
      export: {
        title: "Automated Audit Export",
        description: "Generate compliance reports in seconds for any auditor or regulatory body",
        formats: ["PDF", "CSV", "JSON", "XML"]
      }
    },
    advantages: data.advantages || [
      {
        title: "Immutable History",
        description: "Every action is permanently recorded on-chain, creating an unforgeable audit trail",
        icon: "FileClock"
      },
      {
        title: "Automated Reporting",
        description: "Compliance reports generate automatically, reducing audit preparation from weeks to hours",
        icon: "Workflow"
      },
      {
        title: "Continuous Monitoring",
        description: "Real-time compliance checking ensures you never fall out of regulatory requirements",
        icon: "CheckCircle"
      }
    ]
  };
};

// Transform deployment security data
export const toDeploymentSecurityProps = (data: any) => {
  return {
    models: data.models || [
      {
        title: "Zeta Shield Cloud",
        deployment: "Multi-tenant SaaS",
        security: {
          isolation: "Tenant-specific encryption and network segmentation",
          monitoring: "24/7 security monitoring and threat detection",
          compliance: "Automated compliance reporting and audit trails",
          backup: "Automated daily backups with cross-region replication"
        },
        infrastructure: {
          compute: "AWS EKS with auto-scaling",
          storage: "Encrypted S3 with versioning",
          network: "VPC isolation with WAF protection",
          monitoring: "CloudWatch + Datadog integration"
        }
      },
      {
        title: "Zeta Shield Enterprise",
        deployment: "Private cloud deployment",
        security: {
          isolation: "Complete infrastructure isolation",
          monitoring: "Dedicated security team and custom monitoring",
          compliance: "Custom compliance configurations",
          backup: "On-premises backup with air-gapped storage"
        },
        infrastructure: {
          compute: "Dedicated Kubernetes clusters",
          storage: "Private encrypted storage with custom policies",
          network: "Private network with dedicated connections",
          monitoring: "Custom monitoring and alerting systems"
        }
      }
    ],
    securityFeatures: data.securityFeatures || [
      {
        title: "Zero-Trust Architecture",
        description: "Every request is verified regardless of source or location",
        icon: "Shield"
      },
      {
        title: "End-to-End Encryption",
        description: "AES-256 encryption at rest and in transit with key rotation",
        icon: "Lock"
      },
      {
        title: "Disaster Recovery",
        description: "RTO < 1 hour, RPO < 15 minutes with automated failover",
        icon: "Activity"
      }
    ]
  };
};

// Transform security roadmap data
export const toSecurityRoadmapProps = (data: any) => {
  return {
    roadmap: data.roadmap || {
      q1: {
        focus: "Advanced Threat Detection",
        features: [
          "AI-powered threat detection",
          "Behavioral analytics",
          "Real-time risk scoring",
          "Automated incident response"
        ]
      },
      q2: {
        focus: "Zero-Trust Architecture",
        features: [
          "Micro-segmentation",
          "Identity-based access control",
          "Continuous verification",
          "Least privilege enforcement"
        ]
      },
      q3: {
        focus: "Quantum-Safe Cryptography",
        features: [
          "Post-quantum encryption",
          "Quantum key distribution",
          "Future-proof security",
          "Migration planning"
        ]
      },
      q4: {
        focus: "Global Security Operations",
        features: [
          "24/7 SOC operations",
          "Global threat intelligence",
          "Automated response playbooks",
          "Security orchestration"
        ]
      }
    },
    innovation: data.innovation || {
      ai: "AI-powered security analytics and threat detection",
      blockchain: "Advanced blockchain security with privacy-preserving techniques",
      quantum: "Quantum-safe cryptography for future-proof security"
    }
  };
};

// Validate security technical data
export const validateSecurityTechnicalData = (data: any): boolean => {
  return (
    data &&
    typeof data.title === 'string' &&
    typeof data.subtitle === 'string' &&
    (data.architecture || data.security || data.compliance)
  );
};

// Get security technical fallback data
export const getSecurityTechnicalFallback = () => {
  return {
    title: 'Security Architecture',
    subtitle: 'Technical security infrastructure and compliance',
    architecture: {
      layers: [
        { 
          title: "Identity & Authentication", 
          technology: "Auth0 Enterprise", 
          features: ["MFA", "SSO", "RBAC"] 
        },
        { 
          title: "Asset-Level Access Control", 
          technology: "Blockchain Smart Contracts", 
          features: ["Granular Permissions", "Audit Trails"] 
        }
      ]
    },
    security: {
      features: [
        { title: "Zero-Trust Architecture", description: "Every request is verified" },
        { title: "End-to-End Encryption", description: "AES-256 encryption" }
      ]
    }
  };
};
