import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { SimplePDFDownloadButton, FullPDFDownloadButton } from '../../utils/pdfExport';

// Import the new use-case slides
import {
  SPEMultipleMyelomaUseCaseSlide,
  SPEOvarianCancerUseCaseSlide,
  SPEMelanomaUseCaseSlide,
  SPEAPIIntegrationSlide
} from '../../components/deck/slides/SPE_Slides';

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

// --- ENHANCED NAVIGATION CONTROLS ---
const NavigationControls = ({ onPrev, onNext, isPlaying, onTogglePlay, current, total, slides }: { 
    onPrev: () => void; 
    onNext: () => void; 
    isPlaying: boolean; 
    onTogglePlay: () => void; 
    current: number; 
    total: number; 
    slides: any[] 
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-6 bg-slate-800/80 backdrop-blur-md px-8 py-4 rounded-2xl border border-slate-700 shadow-xl"
        >
            <motion.button
                onClick={onPrev}
                className="p-3 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
            >
                <ChevronLeft size={24} />
            </motion.button>

            <motion.button
                onClick={onTogglePlay}
                className={`p-3 rounded-xl transition-all duration-200 ${
                    isPlaying
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </motion.button>

            <SimplePDFDownloadButton
              title="Current Slide"
              buttonText="PDF"
            />

            <FullPDFDownloadButton
              slides={slides}
              presentationTitle="SPE Use-Case Examples"
              buttonText="Full PDF"
            />

            <div className="flex flex-col items-center space-y-1">
                <span className="text-slate-300 font-semibold text-lg">{current + 1}</span>
                <span className="text-slate-400 text-xs">of {total}</span>
            </div>

            <motion.button
                onClick={onNext}
                className="p-3 rounded-xl bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white transition-all duration-200"
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
            >
                <ChevronRight size={24} />
            </motion.button>
        </motion.div>
    );
};

// --- MAIN APP COMPONENT ---
const App = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const slides = [
        SPEAPIIntegrationSlide,
        SPEMultipleMyelomaUseCaseSlide,
        SPEOvarianCancerUseCaseSlide,
        SPEMelanomaUseCaseSlide
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    const goToSlide = (index: number) => setCurrentSlide(index);
    const togglePlay = () => setIsPlaying(!isPlaying);

    // Auto-play functionality
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            nextSlide();
        }, 10000); // Change slide every 10 seconds for use-case slides

        return () => clearInterval(interval);
    }, [isPlaying, currentSlide]);

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight' || event.key === ' ') nextSlide();
            else if (event.key === 'ArrowLeft') prevSlide();
            else if (event.key === 'p' || event.key === 'P') togglePlay();
            else if (event.key >= '1' && event.key <= '9') {
                const slideIndex = parseInt(event.key) - 1;
                if (slideIndex < slides.length) goToSlide(slideIndex);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Mouse wheel navigation
    useEffect(() => {
        const handleWheel = (event: WheelEvent) => {
            event.preventDefault();
            if (event.deltaY > 0) nextSlide();
            else prevSlide();
        };

        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => window.removeEventListener('wheel', handleWheel);
    }, []);

    const CurrentSlideComponent = slides[currentSlide];

    return (
        <div className="relative w-full h-screen bg-slate-900 overflow-hidden">
            {/* Progress Bar */}
            <ProgressBar
                current={currentSlide}
                total={slides.length}
                onSlideChange={goToSlide}
            />

            {/* Main Slide Content */}
            <AnimatePresence mode="wait">
                <CurrentSlideComponent key={currentSlide} />
            </AnimatePresence>

            {/* Brand */}
            <Brand />

            {/* Navigation Controls */}
            <NavigationControls
                onPrev={prevSlide}
                onNext={nextSlide}
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
                current={currentSlide}
                total={slides.length}
                slides={slides}
            />

            {/* Slide Counter */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute top-8 right-8 z-30 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700"
            >
                <span className="text-slate-300 font-mono text-sm">
                    {String(currentSlide + 1).padStart(2, '0')}/{String(slides.length).padStart(2, '0')}
                </span>
            </motion.div>
        </div>
    );
};

export default App;
