import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from '../../contexts/AccessibilityContext';

// Import our slide composer
import SlideComposer, { PredefinedCompositions } from '../adapters/slideComposer';

//================================================================================
// COMBINED DEMO DECK
// Demonstrates how to use the slide composer to create custom presentations
//================================================================================

const Brand = () => (
    <div className="absolute bottom-6 right-6 z-20 text-lg font-semibold text-slate-400/70">
        Combined Demo 🚀
    </div>
);

const DigitalSynapseBackground = () => (
    <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
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
// DEMO SLIDES - SHOWCASING SLIDE COMPOSITION
//================================================================================

const demoSlidesData = [
    // SLIDE 1: DEMO TITLE
    {
        title: "Slide Composition Demo",
        subtitle: "Combining content from multiple decks using existing data",
        titleGradient: "from-purple-500 via-pink-400 to-red-300",
        content: {
            type: 'demo-title',
            useEnhancedLayout: true,
            description: "This demo shows how we can extract, combine, and reuse existing content from our monolithic decks to create focused, audience-specific presentations."
        }
    },

    // SLIDE 2: COMPOSITION CAPABILITIES
    {
        title: "Slide Composition Capabilities",
        subtitle: "What we can do with existing content",
        titleGradient: "from-cyan-400 to-blue-300",
        content: {
            type: 'capabilities',
            useEnhancedLayout: true,
            capabilities: [
                {
                    title: "Extract Existing Content",
                    description: "Pull real content from monolithic decks without hallucination",
                    example: "Security deck → Technical, Business, Compliance variants"
                },
                {
                    title: "Combine Multiple Sources", 
                    description: "Mix slides from different decks for custom presentations",
                    example: "CrisPRO 101 + Security → Mixed audience presentation"
                },
                {
                    title: "Filter by Audience",
                    description: "Create audience-specific compositions automatically",
                    example: "Research, Business, Technical, Compliance focus"
                },
                {
                    title: "Reuse Components",
                    description: "Leverage existing UI components with extracted data",
                    example: "ArchitectureDiagram, ComplianceBadges, etc."
                }
            ]
        }
    },

    // SLIDE 3: AVAILABLE COMPOSITIONS
    {
        title: "Available Compositions",
        subtitle: "Predefined slide combinations for different audiences",
        titleGradient: "from-green-400 to-teal-300",
        content: {
            type: 'compositions',
            useEnhancedLayout: true,
            compositions: [
                {
                    name: "Research Focus",
                    description: "Scientific validation, methodology, peer review",
                    slides: "9 slides from CrisPRO 101",
                    audience: "Scientists, researchers, academic institutions"
                },
                {
                    name: "Business Focus",
                    description: "ROI, market opportunity, competitive advantage", 
                    slides: "9 slides from CrisPRO 101",
                    audience: "Investors, executives, business development"
                },
                {
                    name: "Technical Focus",
                    description: "Architecture, performance, implementation",
                    slides: "8 slides from Security deck",
                    audience: "Engineers, developers, technical decision makers"
                },
                {
                    name: "Compliance Focus",
                    description: "Regulatory compliance, audit trails, certifications",
                    slides: "3 slides from Security deck",
                    audience: "FDA, regulatory affairs, compliance teams"
                }
            ]
        }
    },

    // SLIDE 4: CONTENT EXTRACTION EXAMPLE
    {
        title: "Content Extraction Example",
        subtitle: "How we extract real content from the security deck",
        titleGradient: "from-orange-400 to-red-300",
        content: {
            type: 'extraction-example',
            useEnhancedLayout: true,
            example: {
                source: "Security Deck (1139 lines)",
                extracted: [
                    {
                        section: "Problem Statement",
                        content: "Traditional IT security builds perimeters around servers and networks. But in biotech, the most valuable asset isn't the infrastructure—it's the **digital blueprint for a multi-billion dollar therapeutic**"
                    },
                    {
                        section: "Two-Layer Architecture", 
                        content: "Layer 1: Identity & Authentication (Auth0 Integration), Layer 2: Asset-Level Access Control (Blockchain)"
                    },
                    {
                        section: "AI Engine Security",
                        content: "Each AI engine operates in secure environments with blockchain-enforced permissions for specific therapeutic assets"
                    }
                ],
                result: "Technical, Business, and Compliance variants using REAL content"
            }
        }
    },

    // SLIDE 5: COMPONENT REUSE
    {
        title: "Component Reuse Strategy",
        subtitle: "Leveraging existing UI components with extracted data",
        titleGradient: "from-indigo-400 to-purple-300",
        content: {
            type: 'component-reuse',
            useEnhancedLayout: true,
            components: [
                {
                    name: "ArchitectureDiagram",
                    purpose: "Display security architecture layers",
                    data: "Extracted from security deck layers",
                    usage: "Technical presentations"
                },
                {
                    name: "ComplianceBadges", 
                    purpose: "Show compliance certifications",
                    data: "SOC 2, HIPAA, GDPR, ISO 27001",
                    usage: "Compliance presentations"
                },
                {
                    name: "DeploymentMatrix",
                    purpose: "Show deployment options",
                    data: "Cloud, Enterprise, Embedded models",
                    usage: "Business presentations"
                },
                {
                    name: "AccessMatrix",
                    purpose: "Show AI engine verification",
                    data: "Oracle, Forge, Boltz verification status",
                    usage: "Technical presentations"
                }
            ]
        }
    },

    // SLIDE 6: USAGE EXAMPLES
    {
        title: "Usage Examples",
        subtitle: "How to create custom presentations",
        titleGradient: "from-pink-400 to-rose-300",
        content: {
            type: 'usage-examples',
            useEnhancedLayout: true,
            examples: [
                {
                    title: "Research Presentation",
                    code: "PredefinedCompositions.research()",
                    result: "9 slides focused on scientific validation"
                },
                {
                    title: "Security Business Pitch",
                    code: "SlideComposer.createCustom({ sources: ['security'], filters: { keywords: ['business', 'market'] } })",
                    result: "Business-focused security slides"
                },
                {
                    title: "Mixed Audience Demo",
                    code: "PredefinedCompositions.mixed()",
                    result: "Combination of CrisPRO + Security slides"
                },
                {
                    title: "Technical Deep Dive",
                    code: "PredefinedCompositions.technical()",
                    result: "8 technical security architecture slides"
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
        <SlideLayout>
            <SlideHeader title={title} subtitle={subtitle} titleGradient={titleGradient} />

            {/* Render content based on type */}
            {content.type === 'demo-title' && (
                <div className="relative z-10 w-full px-4 space-y-8">
                    <div className="mt-16 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30 max-w-4xl mx-auto">
                        <p className="text-2xl md:text-3xl font-bold text-white mb-4">
                            {content.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                <h3 className="text-lg font-bold text-cyan-400 mb-2">Extract</h3>
                                <p className="text-slate-300 text-sm">Pull real content from existing decks</p>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                <h3 className="text-lg font-bold text-green-400 mb-2">Combine</h3>
                                <p className="text-slate-300 text-sm">Mix slides from multiple sources</p>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                                <h3 className="text-lg font-bold text-purple-400 mb-2">Reuse</h3>
                                <p className="text-slate-300 text-sm">Leverage existing components</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {content.type === 'capabilities' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {content.capabilities.map((capability, i) => (
                        <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 text-left">
                            <h3 className="text-xl font-bold text-cyan-400 mb-3">{capability.title}</h3>
                            <p className="text-slate-300 mb-4">{capability.description}</p>
                            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-600">
                                <p className="text-sm text-slate-400 font-mono">{capability.example}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {content.type === 'compositions' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {content.compositions.map((composition, i) => (
                        <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 text-left">
                            <h3 className="text-xl font-bold text-green-400 mb-2">{composition.name}</h3>
                            <p className="text-slate-300 mb-3">{composition.description}</p>
                            <div className="space-y-2 text-sm">
                                <p><span className="text-slate-400">Slides:</span> <span className="text-slate-200">{composition.slides}</span></p>
                                <p><span className="text-slate-400">Audience:</span> <span className="text-slate-200">{composition.audience}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {content.type === 'extraction-example' && (
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 mb-6">
                        <h3 className="text-xl font-bold text-orange-400 mb-4">Source: {content.example.source}</h3>
                        <div className="space-y-4">
                            {content.example.extracted.map((item, i) => (
                                <div key={i} className="bg-slate-900/50 p-4 rounded-lg border border-slate-600">
                                    <h4 className="font-bold text-slate-200 mb-2">{item.section}</h4>
                                    <p className="text-slate-300 text-sm">{item.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 p-6 rounded-2xl border border-green-500/50">
                        <h3 className="text-xl font-bold text-green-400 mb-2">Result</h3>
                        <p className="text-slate-300">{content.example.result}</p>
                    </div>
                </div>
            )}

            {content.type === 'component-reuse' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {content.components.map((component, i) => (
                        <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 text-left">
                            <h3 className="text-xl font-bold text-indigo-400 mb-2">{component.name}</h3>
                            <p className="text-slate-300 mb-3">{component.purpose}</p>
                            <div className="space-y-2 text-sm">
                                <p><span className="text-slate-400">Data:</span> <span className="text-slate-200">{component.data}</span></p>
                                <p><span className="text-slate-400">Usage:</span> <span className="text-slate-200">{component.usage}</span></p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {content.type === 'usage-examples' && (
                <div className="max-w-5xl mx-auto">
                    {content.examples.map((example, i) => (
                        <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 mb-6 text-left">
                            <h3 className="text-xl font-bold text-pink-400 mb-3">{example.title}</h3>
                            <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-600 mb-3">
                                <p className="text-sm text-slate-400 font-mono">{example.code}</p>
                            </div>
                            <p className="text-slate-300"><span className="text-slate-400">Result:</span> {example.result}</p>
                        </div>
                    ))}
                </div>
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
