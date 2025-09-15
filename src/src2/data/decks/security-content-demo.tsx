import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../../contexts/AccessibilityContext';

// Import our new security content components
import SecurityArchitectureContent from '../components/slides/content/SecurityArchitectureContent';
import AIEngineSecurityContent from '../components/slides/content/AIEngineSecurityContent';
import ComplianceAuditContent from '../components/slides/content/ComplianceAuditContent';

// Import existing content components
import MetricsContent from '../components/slides/content/MetricsContent';
import ComparisonContent from '../components/slides/content/ComparisonContent';
import PathwayContent from '../components/slides/content/PathwayContent';

// Import our content adapters
import { SecurityContentAdapters } from '../adapters/securityContentAdapters';

//================================================================================
// SECURITY CONTENT DEMO DECK
// Demonstrates new security content components with extracted data
//================================================================================

const Brand = () => (
    <div className="absolute bottom-6 right-6 z-20 text-lg font-semibold text-slate-400/70">
        Security Content Demo 🛡️
    </div>
);

const DigitalSynapseBackground = () => (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"></div>
);

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

const NavigationControls = ({ current, total, onPrev, onNext }) => (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/30 backdrop-blur-sm p-2 rounded-full border border-slate-700">
        <button onClick={onPrev} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&larr;</button>
        <span className="text-slate-300 font-semibold text-sm">Slide {current + 1} / {total}</span>
        <button onClick={onNext} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&rarr;</button>
    </div>
);

//================================================================================
// DEMO SLIDES - SHOWCASING NEW SECURITY CONTENT COMPONENTS
//================================================================================

const demoSlidesData = [
    // SLIDE 1: DEMO TITLE
    {
        title: "Security Content Components Demo",
        subtitle: "New slide content components for security presentations",
        titleGradient: "from-blue-500 via-cyan-400 to-teal-300",
        content: {
            type: 'demo-title',
            useEnhancedLayout: true,
            description: "This demo showcases new security-specific content components that work with our extracted security content from the monolithic deck."
        }
    },

    // SLIDE 2: SECURITY ARCHITECTURE COMPONENT
    {
        title: "Security Architecture Component",
        subtitle: "Two-layer security architecture visualization",
        titleGradient: "from-sky-400 to-cyan-400",
        content: SecurityContentAdapters.createSecuritySlideContent('architecture')
    },

    // SLIDE 3: AI ENGINE SECURITY COMPONENT
    {
        title: "AI Engine Security Component",
        subtitle: "Protecting autonomous AI systems that generate billion-dollar IP",
        titleGradient: "from-orange-400 to-red-400",
        content: SecurityContentAdapters.createSecuritySlideContent('ai-security')
    },

    // SLIDE 4: COMPLIANCE AUDIT COMPONENT
    {
        title: "Compliance Audit Component",
        subtitle: "Immutable records for regulatory excellence",
        titleGradient: "from-emerald-400 to-teal-400",
        content: SecurityContentAdapters.createSecuritySlideContent('compliance')
    },

    // SLIDE 5: DEPLOYMENT MODELS (using existing ComparisonContent)
    {
        title: "Deployment Models Component",
        subtitle: "Flexible security for every organization",
        titleGradient: "from-indigo-400 to-purple-400",
        content: SecurityContentAdapters.createSecuritySlideContent('deployment')
    },

    // SLIDE 6: RESEARCH PIPELINE (using existing PathwayContent)
    {
        title: "Research Pipeline Component",
        subtitle: "End-to-end protection for therapeutic development",
        titleGradient: "from-purple-400 to-indigo-400",
        content: SecurityContentAdapters.createSecuritySlideContent('research')
    },

    // SLIDE 7: SECURITY METRICS (using existing MetricsContent)
    {
        title: "Security Metrics Component",
        subtitle: "Performance and compliance metrics",
        titleGradient: "from-green-400 to-teal-300",
        content: SecurityContentAdapters.toSecurityMetrics({})
    },

    // SLIDE 8: SECURITY COMPARISON (using existing ComparisonContent)
    {
        title: "Security Comparison Component",
        subtitle: "Traditional vs. IP-centric security",
        titleGradient: "from-amber-400 to-orange-400",
        content: SecurityContentAdapters.toSecurityComparison({})
    }
];

//================================================================================
// MAIN APP COMPONENT
//================================================================================

const Slide = ({ slideData }) => {
    const { title, subtitle, titleGradient, content } = slideData;

    return (
        <SlideLayout>
            <SlideHeader title={title} subtitle={subtitle} titleGradient={titleGradient} />

            {/* Render content based on type */}
            {content.type === 'demo-title' && (
                <div className="relative z-10 w-full px-4 space-y-8">
                    <div className="mt-16 bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-2xl p-8 backdrop-blur-sm border border-blue-500/30 max-w-4xl mx-auto">
                        <p className="text-2xl md:text-3xl font-bold text-white mb-4">
                            {content.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                <h3 className="text-lg font-bold text-cyan-400 mb-2">New Components</h3>
                                <p className="text-slate-300 text-sm">Security-specific content components</p>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                <h3 className="text-lg font-bold text-green-400 mb-2">Extracted Data</h3>
                                <p className="text-slate-300 text-sm">Real content from security deck</p>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                <h3 className="text-lg font-bold text-purple-400 mb-2">Reusable</h3>
                                <p className="text-slate-300 text-sm">Works with existing slide system</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Render security content components */}
            {content.type === 'security-architecture' && (
                <SecurityArchitectureContent data={content.data} layout={content.layout} />
            )}

            {content.type === 'ai-engine-security' && (
                <AIEngineSecurityContent data={content.data} layout={content.layout} />
            )}

            {content.type === 'compliance-audit' && (
                <ComplianceAuditContent data={content.data} layout={content.layout} />
            )}

            {/* Render existing content components */}
            {content.type === 'comparison' && (
                <ComparisonContent data={content.data} layout={content.layout} />
            )}

            {content.type === 'pathway' && (
                <PathwayContent data={content.data} layout={content.layout} />
            )}

            {content.type === 'metrics' && (
                <MetricsContent data={content.data} layout={content.layout} />
            )}
        </SlideLayout>
    );
};

const App = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % demoSlidesData.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + demoSlidesData.length) % demoSlidesData.length);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') nextSlide();
            else if (event.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const currentSlideData = demoSlidesData[currentSlide];

    return (
        <div className="relative w-full h-screen bg-slate-900 overflow-hidden">
            <AnimatePresence mode="wait">
                <Slide key={currentSlide} slideData={currentSlideData} />
            </AnimatePresence>
            <Brand />
            <NavigationControls 
                current={currentSlide}
                total={demoSlidesData.length}
                onPrev={prevSlide}
                onNext={nextSlide}
            />
        </div>
    );
};

export default App;
