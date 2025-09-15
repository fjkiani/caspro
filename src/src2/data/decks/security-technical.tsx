import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  UserCheck, 
  Fingerprint, 
  FileClock, 
  Bot, 
  Lock, 
  Database, 
  Network, 
  Layers, 
  FileCheck, 
  Monitor, 
  Bell, 
  Search, 
  BarChart3, 
  Target,
  Eye,
  AlertTriangle,
  CheckCircle,
  KeyRound,
  Building,
  Globe,
  Cpu,
  Workflow,
  Activity
} from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

// Import our existing security components
import { ArchitectureDiagram } from '../components/site/security/ArchitectureDiagram';
import { ComplianceBadges } from '../components/site/security/ComplianceBadges';
import { DeploymentMatrix } from '../components/site/security/DeploymentMatrix';
import { AccessMatrix } from '../components/site/security/AccessMatrix';
import { IdentityIntegrations } from '../components/site/security/IdentityIntegrations';
import { ResearchPipeline } from '../components/site/security/ResearchPipeline';

// Import content extractor
import { getAllSecurityContent } from '../adapters/securityContentExtractor';

//================================================================================
// TECHNICAL SECURITY-FOCUSED SLIDE DECK
// Using ACTUAL extracted content from the monolithic security deck
//================================================================================

const Brand = () => (
    <div className="absolute bottom-6 right-6 z-20 text-lg font-semibold text-slate-400/70">
        Zeta Shield Technical 🛡️⚙️
    </div>
);

const DigitalSynapseBackground = () => {
    const mountRef = useRef(null);
    useEffect(() => {
        // Placeholder for a more complex background.
    }, []);
    return <div ref={mountRef} className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"></div>;
};

const SlideLayout = ({ children, className = '' }) => (
    <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-slate-200 ${className}`}
    >
        <DigitalSynapseBackground />
        <div className="relative z-10 w-full max-w-6xl space-y-12">
            {children}
        </div>
    </motion.section>
);

const SlideHeader = ({ title, subtitle, titleGradient, subtitleClassName = '' }) => {
    const { getTextSize } = useAccessibility();
    
    return (
        <div className="space-y-4">
            <h1 className={`${getTextSize('text-5xl')} md:${getTextSize('text-7xl')} font-black text-transparent bg-clip-text bg-gradient-to-r ${titleGradient}`}>
                {title}
            </h1>
            <p className={`${getTextSize('text-2xl')} md:${getTextSize('text-3xl')} font-light text-slate-300 ${subtitleClassName}`}>
                {subtitle}
            </p>
        </div>
    );
};

const InfoBlock = ({ icon, mainText, subText, iconColor, animateIcon }) => {
    const { getTextSize, getIconSize } = useAccessibility();
    
    return (
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 max-w-4xl mx-auto text-center">
            {React.createElement(icon, {
                size: getIconSize(64),
                className: `mx-auto ${iconColor} mb-6 ${animateIcon ? 'animate-pulse' : ''}`
            })}
            <p className={`${getTextSize('text-xl')} text-slate-200 mb-4 max-w-3xl mx-auto`} dangerouslySetInnerHTML={{ __html: mainText }}></p>
            <p className={`${getTextSize('text-lg')} text-slate-300 mt-6`} dangerouslySetInnerHTML={{ __html: subText }}></p>
        </div>
    );
};

const NavigationControls = ({ current, total, onPrev, onNext }) => (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/30 backdrop-blur-sm p-2 rounded-full border border-slate-700">
        <button onClick={onPrev} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&larr;</button>
        <span className="text-slate-300 font-semibold text-sm">Slide {current + 1} / {total}</span>
        <button onClick={onNext} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&rarr;</button>
    </div>
);

//================================================================================
// EXTRACTED SECURITY CONTENT
//================================================================================

const securityContent = getAllSecurityContent();

//================================================================================
// TECHNICAL SECURITY SLIDES - USING ACTUAL EXTRACTED CONTENT
//================================================================================

const technicalSecuritySlidesData = [
    // SLIDE 1: TECHNICAL TITLE
    {
        title: securityContent.technical.title,
        subtitle: securityContent.technical.subtitle,
        titleGradient: "from-blue-500 via-cyan-400 to-teal-300",
        content: {
            type: 'title',
            useEnhancedLayout: true,
            metrics: [
                { value: "99.99%", label: "Uptime SLA", className: "text-green-400" },
                { value: "<50ms", label: "Auth Response", className: "text-cyan-400" },
                { value: "256-bit", label: "Encryption", className: "text-purple-400" }
            ]
        },
        presenter: 'Security Engineering Team',
        presenterTitle: 'Zeta Shield 🛡️⚙️',
        notes: "Lead with technical credibility and security performance metrics."
    },

    // SLIDE 2: TWO-LAYER SECURITY ARCHITECTURE (from extracted content)
    {
        title: securityContent.technical.architecture.title,
        subtitle: securityContent.technical.architecture.subtitle,
        titleGradient: "from-sky-400 to-cyan-400",
        content: {
            type: 'two-layer-architecture',
            useEnhancedLayout: true,
            layers: securityContent.technical.architecture.layers,
            siteBlocks: [
                {
                    kind: 'architecture-diagram',
                    props: {
                        layers: [
                            {
                                title: "Layer 1: Identity & Authentication",
                                color: "blue",
                                icon: UserCheck,
                                features: [
                                    "Auth0 enterprise integration",
                                    "Multi-factor authentication",
                                    "Role-based access control",
                                    "Enterprise directory sync"
                                ]
                            },
                            {
                                title: "Layer 2: Asset-Level Access Control", 
                                color: "purple",
                                icon: Fingerprint,
                                features: [
                                    "Blockchain smart contracts",
                                    "Granular permission mapping",
                                    "Immutable audit trails",
                                    "Cryptographic asset signatures"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },

    // SLIDE 3: MULTI-TENANT ARCHITECTURE (from extracted content)
    {
        title: securityContent.technical.multiTenant.title,
        subtitle: securityContent.technical.multiTenant.subtitle,
        titleGradient: "from-purple-400 to-indigo-400",
        content: {
            type: 'multi-tenant-architecture',
            useEnhancedLayout: true,
            tenants: securityContent.technical.multiTenant.tenants,
            guarantees: securityContent.technical.multiTenant.guarantees,
            siteBlocks: [
                {
                    kind: 'deployment-matrix',
                    props: {
                        models: [
                            {
                                title: "Biotech Corp A",
                                features: ["Isolated data layer", "Dedicated AI agents", "Unique encryption keys"],
                                color: "blue"
                            },
                            {
                                title: "Zeta Shield Core", 
                                features: ["Unified identity", "Blockchain verification", "Global threat detection"],
                                color: "cyan"
                            },
                            {
                                title: "Pharma Giant B",
                                features: ["Isolated data layer", "Dedicated AI agents", "Unique encryption keys"],
                                color: "purple"
                            }
                        ]
                    }
                }
            ]
        }
    },

    // SLIDE 4: AI ENGINE SECURITY (from extracted content)
    {
        title: securityContent.technical.aiSecurity.title,
        subtitle: securityContent.technical.aiSecurity.subtitle,
        titleGradient: "from-orange-400 to-red-400",
        content: {
            type: 'ai-engine-security',
            useEnhancedLayout: true,
            protection: securityContent.technical.aiSecurity.protection,
            verification: securityContent.technical.aiSecurity.verification,
            accountability: securityContent.technical.aiSecurity.accountability,
            siteBlocks: [
                {
                    kind: 'access-matrix',
                    props: securityContent.technical.aiSecurity.verification
                }
            ]
        }
    },

    // SLIDE 5: COMPLIANCE & AUDIT (from extracted content)
    {
        title: securityContent.technical.compliance.title,
        subtitle: securityContent.technical.compliance.subtitle,
        titleGradient: "from-emerald-400 to-teal-400",
        content: {
            type: 'compliance-audit',
            useEnhancedLayout: true,
            standards: securityContent.technical.compliance.standards,
            dashboard: securityContent.technical.compliance.dashboard,
            advantages: securityContent.technical.compliance.advantages,
            siteBlocks: [
                {
                    kind: 'compliance-badges',
                    props: {
                        badges: [
                            { label: 'SOC 2 Type II' },
                            { label: 'HIPAA' },
                            { label: 'GDPR' },
                            { label: 'ISO 27001' }
                        ]
                    }
                }
            ]
        }
    },

    // SLIDE 6: DEPLOYMENT MODELS (from extracted content)
    {
        title: securityContent.technical.deployment.title,
        subtitle: securityContent.technical.deployment.subtitle,
        titleGradient: "from-indigo-400 to-purple-400",
        content: {
            type: 'deployment-models',
            useEnhancedLayout: true,
            models: securityContent.technical.deployment.models,
            footer: securityContent.technical.deployment.footer,
            siteBlocks: [
                {
                    kind: 'deployment-matrix',
                    props: {
                        models: securityContent.technical.deployment.models
                    }
                }
            ]
        }
    },

    // SLIDE 7: RESEARCH PIPELINE SECURITY (from extracted content)
    {
        title: "Secure AI Research Pipeline",
        subtitle: "End-to-end protection for therapeutic development",
        titleGradient: "from-purple-400 to-indigo-400",
        content: {
            type: 'research-pipeline',
            useEnhancedLayout: true,
            steps: securityContent.technical.researchPipeline?.steps || [],
            footerText: securityContent.technical.researchPipeline?.footerText || "",
            siteBlocks: [
                {
                    kind: 'research-pipeline',
                    props: securityContent.technical.researchPipeline
                }
            ]
        }
    },

    // SLIDE 8: IDENTITY INTEGRATIONS (from extracted content)
    {
        title: "Enterprise Identity Management",
        subtitle: "Auth0 integration for seamless, secure access control",
        titleGradient: "from-orange-400 to-red-400",
        content: {
            type: 'identity-integrations',
            useEnhancedLayout: true,
            auth0: { title: "Identity Verification", text: "Auth0 verifies *who* you are." },
            blockchain: { title: "Permission Verification", text: "The blockchain verifies *what you're allowed to do*." },
            strategic: {
                title: "The Strategic Opportunity",
                points: [
                    { title: "Bridge Web2 & Web3", text: "Combines Auth0's enterprise-grade identity with the immutable, verifiable nature of the blockchain." },
                    { title: "Solve a High-Value Problem", text: "Purpose-built for securing multi-billion dollar digital assets in biotech, AI development, and beyond." },
                    { title: "Expand the Ecosystem", text: "Creates a new product category that extends Auth0's reach into the high-growth world of verifiable, decentralized data." }
                ]
            },
            siteBlocks: [
                {
                    kind: 'identity-integrations',
                    props: {
                        auth0: { title: "Identity Verification", text: "Auth0 verifies *who* you are." },
                        blockchain: { title: "Permission Verification", text: "The blockchain verifies *what you're allowed to do*." },
                        strategic: {
                            title: "The Strategic Opportunity",
                            points: [
                                { title: "Bridge Web2 & Web3", text: "Combines Auth0's enterprise-grade identity with the immutable, verifiable nature of the blockchain." },
                                { title: "Solve a High-Value Problem", text: "Purpose-built for securing multi-billion dollar digital assets in biotech, AI development, and beyond." },
                                { title: "Expand the Ecosystem", text: "Creates a new product category that extends Auth0's reach into the high-growth world of verifiable, decentralized data." }
                            ]
                        }
                    }
                }
            ]
        }
    }
];

//================================================================================
// MAIN APP COMPONENT
//================================================================================

const Slide = ({ slideData }) => {
    const { title, subtitle, titleGradient, content } = slideData;

    return (
        <SlideLayout className={content.backgroundClass}>
            <SlideHeader title={title} subtitle={subtitle} titleGradient={titleGradient} />

            {/* Render content based on type */}
            {content.type === 'title' && (
                <div className="relative z-10 w-full px-4 space-y-8">
                    <div className="mt-16 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-2xl p-8 backdrop-blur-sm border border-blue-500/30 max-w-3xl mx-auto">
                        <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                            Technical Security: <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">{content.presenter}</span>
                        </p>
                        <p className="text-xl text-slate-300">{content.presenterTitle}</p>
                    </div>
                </div>
            )}

            {/* Render site blocks using existing components */}
            {Array.isArray(content?.siteBlocks) && (
                <div className="mt-8 space-y-6">
                    {content.siteBlocks.map((block, i) => {
                        switch (block?.kind) {
                            case 'architecture-diagram':
                                return <ArchitectureDiagram key={i} {...block.props} />;
                            case 'compliance-badges':
                                return <ComplianceBadges key={i} {...block.props} />;
                            case 'deployment-matrix':
                                return <DeploymentMatrix key={i} {...block.props} />;
                            case 'access-matrix':
                                return <AccessMatrix key={i} {...block.props} />;
                            case 'identity-integrations':
                                return <IdentityIntegrations key={i} {...block.props} />;
                            case 'research-pipeline':
                                return <ResearchPipeline key={i} {...block.props} />;
                            default:
                                return null;
                        }
                    })}
                </div>
            )}

            {/* Add other content type renderers as needed */}
            {content.notes && (
                <p className="text-slate-400 text-lg max-w-4xl mx-auto mt-8" dangerouslySetInnerHTML={{ __html: content.notes }}></p>
            )}
        </SlideLayout>
    );
};

const App = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % technicalSecuritySlidesData.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + technicalSecuritySlidesData.length) % technicalSecuritySlidesData.length);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') nextSlide();
            else if (event.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const currentSlideData = technicalSecuritySlidesData[currentSlide];

    return (
        <div className="relative w-full h-screen bg-slate-900 overflow-hidden">
            <AnimatePresence mode="wait">
                <Slide key={currentSlide} slideData={currentSlideData} />
            </AnimatePresence>
            <Brand />
            <NavigationControls 
                current={currentSlide}
                total={technicalSecuritySlidesData.length}
                onPrev={prevSlide}
                onNext={nextSlide}
            />
        </div>
    );
};

export default App;