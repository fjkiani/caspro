import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Target, Shield, UserCheck, Activity, Dna, AlertTriangle, TrendingUp } from 'lucide-react';

// Import sophisticated components from other slides
import ZetaOracleInAction from '../../../components/deck/slides/ZetaOracleInAction';
import ZetaForgeTwoColumn from '../../../components/deck/slides/ZetaForgeTwoColumn';
import DigitalSynapseBackground from '../../../components/site/blocks/DigitalSynapseBackground';

// --- BRANDING COMPONENT ---
const Brand = () => (
    <div className="absolute bottom-6 right-6 z-20 text-lg font-semibold text-slate-400/70">
        CrisPRO.ai 🧬
    </div>
);

// --- PROGRESS BAR COMPONENT ---
const ProgressBar = ({ current, total, onSlideChange }: { current: number; total: number; onSlideChange: (index: number) => void }) => {
    return (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2">
            {Array.from({ length: total }, (_, i) => (
                <motion.button
                    key={i}
                    onClick={() => onSlideChange(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        i === current
                            ? 'bg-cyan-400 scale-125 shadow-lg shadow-cyan-400/50'
                            : 'bg-slate-600 hover:bg-slate-500'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                />
            ))}
        </div>
    );
};

// --- NAVIGATION CONTROLS ---
const NavigationControls = ({ current, total, onPrevious, onNext, isPlaying, onTogglePlay }: {
    current: number;
    total: number;
    onPrevious: () => void;
    onNext: () => void;
    isPlaying: boolean;
    onTogglePlay: () => void;
}) => {
    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-4">
            <motion.button
                onClick={onPrevious}
                disabled={current === 0}
                className="p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ChevronLeft size={24} />
            </motion.button>
            
            <motion.button
                onClick={onTogglePlay}
                className="p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-cyan-400 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>
            
            <motion.button
                onClick={onNext}
                disabled={current === total - 1}
                className="p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <ChevronRight size={24} />
            </motion.button>
        </div>
    );
};

// --- SLIDE 1: TITLE SLIDE ---
const TitleSlide = () => (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <DigitalSynapseBackground />
        <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-8"
            >
                <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-300 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl leading-none tracking-tight mb-6">
                    Hereditary Breast Cancer
                </h1>
                <h2 className="text-2xl md:text-3xl text-slate-300 font-light mb-8">
                    In-Silico Co-Pilot (RUO)
                </h2>
                <p className="text-xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
                    Transforming BRCA1/2 variant uncertainty into actionable precision prevention strategies through AI-powered discriminative and generative analysis
                </p>
            </motion.div>
            
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex justify-center space-x-8 text-slate-400"
            >
                <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400">95.7%</div>
                    <div className="text-sm">ClinVar AUROC</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">73%</div>
                    <div className="text-sm">VUS Resolution</div>
                </div>
                <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">89.1%</div>
                    <div className="text-sm">BRCA1 AUROC</div>
                </div>
            </motion.div>
        </div>
        <Brand />
    </div>
);

// --- SLIDE 2: TWO-HIT HYPOTHESIS ---
const TwoHitHypothesisSlide = () => (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="relative z-10 max-w-7xl mx-auto px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-4">
                    The Two-Hit Hypothesis
                </h1>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                    Understanding hereditary breast cancer through the lens of tumor suppressor gene inactivation
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* First Hit */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
                >
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mr-4">
                            <AlertTriangle className="w-6 h-6 text-red-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-200">First Hit</h3>
                    </div>
                    <p className="text-slate-400 mb-4">Inherited mutation in BRCA1/2</p>
                    <div className="space-y-2">
                        <div className="text-sm text-slate-500">• Germline variant</div>
                        <div className="text-sm text-slate-500">• Family history</div>
                        <div className="text-sm text-slate-500">• 50% risk inheritance</div>
                    </div>
                </motion.div>

                {/* Second Hit */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
                >
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mr-4">
                            <Target className="w-6 h-6 text-orange-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-200">Second Hit</h3>
                    </div>
                    <p className="text-slate-400 mb-4">Somatic mutation in remaining allele</p>
                    <div className="space-y-2">
                        <div className="text-sm text-slate-500">• Loss of heterozygosity</div>
                        <div className="text-sm text-slate-500">• Point mutation</div>
                        <div className="text-sm text-slate-500">• Chromosomal deletion</div>
                    </div>
                </motion.div>

                {/* Cancer Development */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
                >
                    <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center mr-4">
                            <TrendingUp className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-200">Cancer Development</h3>
                    </div>
                    <p className="text-slate-400 mb-4">Loss of tumor suppression</p>
                    <div className="space-y-2">
                        <div className="text-sm text-slate-500">• Uncontrolled cell growth</div>
                        <div className="text-sm text-slate-500">• DNA repair failure</div>
                        <div className="text-sm text-slate-500">• Tumor formation</div>
                    </div>
                </motion.div>
            </div>
        </div>
        <Brand />
    </div>
);

// --- SLIDE 3: ORACLE VUS RESOLUTION ---
const OracleVUSResolutionSlide = () => (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900">
        <div className="relative z-10 max-w-7xl mx-auto px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-4">
                    Oracle VUS Resolution
                </h1>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                    Transforming BRCA1/2 variants of uncertain significance into actionable clinical decisions
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* VUS Resolution Demo */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
                >
                    <h3 className="text-2xl font-semibold text-slate-200 mb-6">BRCA1 Variant Analysis</h3>
                    <ZetaOracleInAction
                        left={{
                            title: "Traditional Analysis",
                            value: "VUS",
                            subtitle: "Variant of Uncertain Significance"
                        }}
                        right={{
                            title: "CrisPRO Oracle",
                            value: "PATHOGENIC",
                            subtitle: "High-confidence classification"
                        }}
                        score={{
                            title: "Zeta Score",
                            value: "-26.8"
                        }}
                    />
                </motion.div>

                {/* Performance Metrics */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
                >
                    <h3 className="text-2xl font-semibold text-slate-200 mb-6">Performance Metrics</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400">ClinVar AUROC</span>
                            <span className="text-2xl font-bold text-cyan-400">95.7%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400">BRCA1 Zero-shot AUROC</span>
                            <span className="text-2xl font-bold text-green-400">89.1%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400">BRCA2 Zero-shot AUROC</span>
                            <span className="text-2xl font-bold text-purple-400">90.1%</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-400">VUS Resolution Rate</span>
                            <span className="text-2xl font-bold text-orange-400">73%</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
        <Brand />
    </div>
);

// --- SLIDE 4: FORGE THERAPEUTIC DESIGN ---
const ForgeTherapeuticDesignSlide = () => (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="relative z-10 max-w-7xl mx-auto px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                    Forge Therapeutic Design
                </h1>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                    Generating precision prevention strategies for hereditary breast cancer risk management
                </p>
            </motion.div>

            <ZetaForgeTwoColumn
                column1={{
                    input: "BRCA1/2 Pathogenic Variant",
                    mission: "Generate Precision Prevention Strategy",
                    assets: [
                        { icon: Dna, label: "CRISPR Guide Design" },
                        { icon: Shield, label: "Risk Stratification" },
                        { icon: Target, label: "Monitoring Protocol" }
                    ]
                }}
                column2={{
                    title: "Our Unfair Advantage:",
                    highlight: "1M Token Context",
                    description: "Complete genomic neighborhood analysis for comprehensive therapeutic design",
                    infoHeader: "Research Use Only",
                    infoText: "For research purposes only. Not for clinical decision making."
                }}
            />
        </div>
        <Brand />
    </div>
);

// --- SLIDE 5: CLINICAL IMPACT ---
const ClinicalImpactSlide = () => (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900">
        <div className="relative z-10 max-w-7xl mx-auto px-8">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent mb-4">
                    Clinical Impact & Next Steps
                </h1>
                <p className="text-xl text-slate-300 max-w-4xl mx-auto">
                    From AI-powered insights to actionable clinical decisions
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Clinical Benefits */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
                >
                    <h3 className="text-2xl font-semibold text-slate-200 mb-6">Clinical Benefits</h3>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                                <UserCheck className="w-4 h-4 text-green-400" />
                            </div>
                            <span className="text-slate-300">73% VUS resolution rate</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                                <Activity className="w-4 h-4 text-blue-400" />
                            </div>
                            <span className="text-slate-300">Precision prevention strategies</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center mr-3">
                                <Shield className="w-4 h-4 text-purple-400" />
                            </div>
                            <span className="text-slate-300">Risk stratification</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center mr-3">
                                <Target className="w-4 h-4 text-orange-400" />
                            </div>
                            <span className="text-slate-300">Personalized monitoring</span>
                        </div>
                    </div>
                </motion.div>

                {/* Next Steps */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
                >
                    <h3 className="text-2xl font-semibold text-slate-200 mb-6">Next Steps</h3>
                    <div className="space-y-4">
                        <div className="text-slate-300">
                            <div className="font-semibold text-cyan-400 mb-2">1. Clinical Validation</div>
                            <div className="text-sm text-slate-400">Prospective validation in clinical cohorts</div>
                        </div>
                        <div className="text-slate-300">
                            <div className="font-semibold text-green-400 mb-2">2. Regulatory Pathway</div>
                            <div className="text-sm text-slate-400">FDA Breakthrough Therapy Designation</div>
                        </div>
                        <div className="text-slate-300">
                            <div className="font-semibold text-purple-400 mb-2">3. Clinical Integration</div>
                            <div className="text-sm text-slate-400">Integration with existing clinical workflows</div>
                        </div>
                        <div className="text-slate-300">
                            <div className="font-semibold text-orange-400 mb-2">4. Population Impact</div>
                            <div className="text-sm text-slate-400">Scalable precision prevention programs</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
        <Brand />
    </div>
);

// --- MAIN COMPONENT ---
const HereditaryBreastCancerEnhancedComponent: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const slides = [
        TitleSlide,
        TwoHitHypothesisSlide,
        OracleVUSResolutionSlide,
        ForgeTherapeuticDesignSlide,
        ClinicalImpactSlide
    ];

    const totalSlides = slides.length;

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
    };

    const previousSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    // Auto-play functionality
    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(nextSlide, 5000);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    const CurrentSlideComponent = slides[currentSlide];

    return (
        <div className="relative w-full h-screen bg-slate-900 overflow-hidden">
            <ProgressBar current={currentSlide} total={totalSlides} onSlideChange={goToSlide} />
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                >
                    <CurrentSlideComponent />
                </motion.div>
            </AnimatePresence>

            <NavigationControls
                current={currentSlide}
                total={totalSlides}
                onPrevious={previousSlide}
                onNext={nextSlide}
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
            />
        </div>
    );
};

export default HereditaryBreastCancerEnhancedComponent;
