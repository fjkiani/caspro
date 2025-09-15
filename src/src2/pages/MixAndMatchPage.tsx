import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Play, 
  Eye, 
  Settings, 
  Download,
  Share2,
  Zap,
  Dna,
  Target,
  FileText,
  Activity,
  Shield,
  Bot
} from 'lucide-react';
import MixAndMatchComposer from '../components/deck/MixAndMatchComposer';
import CustomDeckViewer from '../components/deck/CustomDeckViewer';
import { type SlideSelection } from '../data/adapters/mixAndMatchSlideLibrary';

const MixAndMatchPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'composer' | 'viewer'>('composer');
  const [customDeck, setCustomDeck] = useState<React.ComponentType<any> | null>(null);
  const [selectedSlides, setSelectedSlides] = useState<SlideSelection[]>([]);

  const handleDeckCreated = (deckComponent: React.ComponentType<any>, slides: SlideSelection[]) => {
    setCustomDeck(deckComponent);
    setSelectedSlides(slides);
    setCurrentView('viewer');
  };

  const handleCloseViewer = () => {
    setCurrentView('composer');
    setCustomDeck(null);
    setSelectedSlides([]);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'intro': return <Zap className="w-5 h-5" />;
      case 'framework': return <Dna className="w-5 h-5" />;
      case 'performance': return <Target className="w-5 h-5" />;
      case 'use-case': return <FileText className="w-5 h-5" />;
      case 'evidence': return <Activity className="w-5 h-5" />;
      case 'clinical': return <Shield className="w-5 h-5" />;
      case 'component': return <Bot className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <AnimatePresence mode="wait">
        {currentView === 'composer' ? (
          <motion.div
            key="composer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <MixAndMatchComposer onDeckCreated={handleDeckCreated} />
          </motion.div>
        ) : (
          <motion.div
            key="viewer"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {customDeck && (
              <CustomDeckViewer
                deckComponent={customDeck}
                selectedSlides={selectedSlides}
                onClose={handleCloseViewer}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      {currentView === 'composer' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <div className="flex flex-col space-y-3">
            {/* Quick Stats */}
            <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-sm">
              <div className="text-slate-300 mb-2">Quick Stats</div>
              <div className="space-y-1 text-xs text-slate-400">
                <div>• 25+ Beautiful Slides</div>
                <div>• 4 Categories</div>
                <div>• 4 Sources</div>
                <div>• Animated & Data-Driven</div>
              </div>
            </div>

            {/* Category Icons */}
            <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
              <div className="text-slate-300 mb-3 text-sm">Categories</div>
              <div className="grid grid-cols-2 gap-2">
                {['intro', 'framework', 'performance', 'use-case', 'evidence', 'clinical', 'component'].map((category) => (
                  <div
                    key={category}
                    className="flex items-center space-x-2 p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700/70 transition-colors cursor-pointer"
                    title={category.charAt(0).toUpperCase() + category.slice(1)}
                  >
                    {getCategoryIcon(category)}
                    <span className="text-xs text-slate-300 capitalize">
                      {category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation Breadcrumb */}
      <div className="fixed top-4 left-4 z-40">
        <div className="flex items-center space-x-2 bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-lg px-3 py-2">
          <Palette className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-slate-300">
            {currentView === 'composer' ? 'Slide Composer' : 'Deck Viewer'}
          </span>
        </div>
      </div>

      {/* Help Tooltip */}
      {currentView === 'composer' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="fixed bottom-6 left-6 z-40 max-w-sm"
        >
          <div className="bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-slate-200 mb-2">
              💡 Pro Tips
            </h4>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Use filters to find specific slide types</li>
              <li>• Look for animated slides for better engagement</li>
              <li>• Data-driven slides are more flexible</li>
              <li>• Mix different sources for variety</li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MixAndMatchPage;

