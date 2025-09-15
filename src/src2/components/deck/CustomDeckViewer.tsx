import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  RotateCcw,
  Settings,
  Download,
  Share2
} from 'lucide-react';
import { type SlideSelection } from '../../data/adapters/mixAndMatchSlideLibrary';

interface CustomDeckViewerProps {
  deckComponent: React.ComponentType<any>;
  selectedSlides: SlideSelection[];
  onClose?: () => void;
}

const CustomDeckViewer: React.FC<CustomDeckViewerProps> = ({ 
  deckComponent, 
  selectedSlides, 
  onClose 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSlideList, setShowSlideList] = useState(false);

  // Auto-hide controls in fullscreen
  useEffect(() => {
    if (isFullscreen) {
      const timer = setTimeout(() => setShowControls(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setShowControls(true);
    }
  }, [isFullscreen]);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    if (isFullscreen) {
      setShowControls(true);
    }
  };

  const DeckComponent = deckComponent;

  return (
    <div 
      className="fixed inset-0 bg-slate-900 z-50"
      onMouseMove={handleMouseMove}
    >
      {/* Deck Component */}
      <div className="w-full h-full">
        <DeckComponent />
      </div>

      {/* Overlay Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Top Controls */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onClose}
                  className="p-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <div className="text-sm text-slate-300 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg px-3 py-2">
                  Custom Deck ({selectedSlides.length} slides)
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSlideList(!showSlideList)}
                  className="p-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 transition-all"
                >
                  <Settings className="w-5 h-5" />
                </button>
                <button
                  onClick={handleFullscreen}
                  className="p-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 transition-all"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {/* Share functionality */}}
                  className="p-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/80 transition-all"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Slide List Sidebar */}
            <AnimatePresence>
              {showSlideList && (
                <motion.div
                  initial={{ x: -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  className="absolute left-4 top-20 bottom-20 w-80 bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-xl p-4 pointer-events-auto overflow-y-auto"
                >
                  <h3 className="text-lg font-semibold text-slate-200 mb-4">
                    Slide List
                  </h3>
                  <div className="space-y-3">
                    {selectedSlides.map((slide, index) => (
                      <div
                        key={slide.id}
                        className="p-3 bg-slate-700/50 rounded-lg border border-slate-600 hover:bg-slate-700/70 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-cyan-400/20 rounded-full flex items-center justify-center text-sm font-semibold text-cyan-400">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-slate-200 truncate">
                              {slide.name}
                            </h4>
                            <p className="text-xs text-slate-400 truncate">
                              {slide.description}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="px-2 py-1 text-xs bg-slate-600 text-slate-300 rounded-full">
                            {slide.category}
                          </span>
                          <span className="px-2 py-1 text-xs bg-slate-600 text-slate-300 rounded-full">
                            {slide.source}
                          </span>
                          {slide.animations && (
                            <span className="px-2 py-1 text-xs bg-green-400/20 text-green-400 rounded-full">
                              Animated
                            </span>
                          )}
                          {slide.dataDriven && (
                            <span className="px-2 py-1 text-xs bg-blue-400/20 text-blue-400 rounded-full">
                              Data-Driven
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-auto"
          >
            <div className="flex items-center space-x-4 bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-xl p-3">
              <button className="p-2 text-slate-300 hover:text-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-300 hover:text-white transition-colors">
                <Play className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-300 hover:text-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDeckViewer;

