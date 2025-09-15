import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Play, 
  Eye, 
  Check,
  Zap,
  Dna,
  Target,
  FileText,
  Activity,
  Shield,
  Bot
} from 'lucide-react';
import { 
  beautifulSlideLibrary, 
  buildCustomDeck,
  type SlideSelection
} from '../../data/adapters/mixAndMatchSlideLibrary';

interface MixAndMatchComposerProps {
  onDeckCreated?: (deckComponent: React.ComponentType<any>, selectedSlides: SlideSelection[]) => void;
}

const MixAndMatchComposer: React.FC<MixAndMatchComposerProps> = ({ onDeckCreated }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [showAnimatedOnly, setShowAnimatedOnly] = useState(false);
  const [showDataDrivenOnly, setShowDataDrivenOnly] = useState(false);
  const [selectedSlides, setSelectedSlides] = useState<Set<string>>(new Set());
  const [previewMode, setPreviewMode] = useState(false);

  // Filter slides based on criteria
  const filteredSlides = useMemo(() => {
    let slides = beautifulSlideLibrary;

    // Search filter
    if (searchTerm) {
      slides = slides.filter(slide => 
        slide.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slide.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      slides = slides.filter(slide => slide.category === selectedCategory);
    }

    // Source filter
    if (selectedSource !== 'all') {
      slides = slides.filter(slide => slide.source === selectedSource);
    }

    // Complexity filter
    if (selectedComplexity !== 'all') {
      slides = slides.filter(slide => slide.complexity === selectedComplexity);
    }

    // Animation filter
    if (showAnimatedOnly) {
      slides = slides.filter(slide => slide.animations);
    }

    // Data-driven filter
    if (showDataDrivenOnly) {
      slides = slides.filter(slide => slide.dataDriven);
    }

    return slides;
  }, [searchTerm, selectedCategory, selectedSource, selectedComplexity, showAnimatedOnly, showDataDrivenOnly]);

  // Get unique categories, sources, and complexities for filters
  const categories = useMemo(() => {
    const cats = [...new Set(beautifulSlideLibrary.map(slide => slide.category))];
    return cats;
  }, []);

  const sources = useMemo(() => {
    const srcs = [...new Set(beautifulSlideLibrary.map(slide => slide.source))];
    return srcs;
  }, []);

  const complexities = useMemo(() => {
    const comps = [...new Set(beautifulSlideLibrary.map(slide => slide.complexity))];
    return comps;
  }, []);

  const handleSlideToggle = (slideId: string) => {
    const newSelected = new Set(selectedSlides);
    if (newSelected.has(slideId)) {
      newSelected.delete(slideId);
    } else {
      newSelected.add(slideId);
    }
    setSelectedSlides(newSelected);
  };

  const handleCreateDeck = () => {
    const selectedSlideObjects = beautifulSlideLibrary.filter(slide => 
      selectedSlides.has(slide.id)
    );
    
    if (selectedSlideObjects.length === 0) {
      alert('Please select at least one slide');
      return;
    }

    const deckComponent = buildCustomDeck(selectedSlideObjects.map(s => s.id));
    const slideSelections = selectedSlideObjects.map(slide => ({
      id: slide.id,
      name: slide.name,
      description: slide.description,
      category: slide.category,
      tags: slide.tags,
      source: slide.source,
      complexity: slide.complexity,
      animations: slide.animations,
      dataDriven: slide.dataDriven
    }));

    if (onDeckCreated) {
      onDeckCreated(deckComponent, slideSelections);
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'intro': return <Zap className="w-4 h-4" />;
      case 'framework': return <Dna className="w-4 h-4" />;
      case 'performance': return <Target className="w-4 h-4" />;
      case 'use-case': return <FileText className="w-4 h-4" />;
      case 'evidence': return <Activity className="w-4 h-4" />;
      case 'clinical': return <Shield className="w-4 h-4" />;
      case 'component': return <Bot className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'SPE': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'RUNX1': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'COMPONENT_FACTORY': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'SITE_BLOCKS': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'simple': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'complex': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-4">
            Mix & Match Slide Composer
          </h1>
          <p className="text-xl text-slate-300">
            Select beautiful slides from our library to create custom presentations
          </p>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search slides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Source Filter */}
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="all">All Sources</option>
              {sources.map(source => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>

            {/* Complexity Filter */}
            <select
              value={selectedComplexity}
              onChange={(e) => setSelectedComplexity(e.target.value)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option value="all">All Complexities</option>
              {complexities.map(complexity => (
                <option key={complexity} value={complexity}>
                  {complexity.charAt(0).toUpperCase() + complexity.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Toggle Filters */}
          <div className="flex items-center space-x-6 mt-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showAnimatedOnly}
                onChange={(e) => setShowAnimatedOnly(e.target.checked)}
                className="w-4 h-4 text-cyan-400 bg-slate-700 border-slate-600 rounded focus:ring-cyan-400"
              />
              <span className="text-slate-300">Animated Only</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showDataDrivenOnly}
                onChange={(e) => setShowDataDrivenOnly(e.target.checked)}
                className="w-4 h-4 text-cyan-400 bg-slate-700 border-slate-600 rounded focus:ring-cyan-400"
              />
              <span className="text-slate-300">Data-Driven Only</span>
            </label>
          </div>
        </div>

        {/* Selected Slides Counter */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-lg text-slate-300">
            {filteredSlides.length} slides found • {selectedSlides.size} selected
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 hover:bg-slate-600 transition-colors flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>{previewMode ? 'Hide' : 'Show'} Preview</span>
            </button>
            <button
              onClick={handleCreateDeck}
              disabled={selectedSlides.size === 0}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Create Deck ({selectedSlides.size})</span>
            </button>
          </div>
        </div>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredSlides.map((slide) => (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`relative bg-slate-800/50 backdrop-blur-sm border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedSlides.has(slide.id)
                    ? 'border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                    : 'border-slate-700 hover:border-slate-600 hover:bg-slate-800/70'
                }`}
                onClick={() => handleSlideToggle(slide.id)}
              >
                {/* Selection Indicator */}
                {selectedSlides.has(slide.id) && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-slate-900" />
                  </div>
                )}

                {/* Category Icon */}
                <div className="flex items-center space-x-2 mb-3">
                  {getCategoryIcon(slide.category)}
                  <span className="text-sm font-medium text-slate-300 capitalize">
                    {slide.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-200 mb-2">
                  {slide.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-400 mb-4 line-clamp-3">
                  {slide.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {slide.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                  {slide.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded-full">
                      +{slide.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Metadata */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full border ${getSourceColor(slide.source)}`}>
                      {slide.source}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full border ${getComplexityColor(slide.complexity)}`}>
                      {slide.complexity}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {slide.animations && (
                      <div className="w-2 h-2 bg-green-400 rounded-full" title="Animated" />
                    )}
                    {slide.dataDriven && (
                      <div className="w-2 h-2 bg-blue-400 rounded-full" title="Data-Driven" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredSlides.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No slides found
            </h3>
            <p className="text-slate-400">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MixAndMatchComposer;
