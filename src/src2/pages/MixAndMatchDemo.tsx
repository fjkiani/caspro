import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Play, 
  Eye, 
  Zap,
  Dna,
  Target,
  FileText,
  Activity,
  Shield,
  Bot,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { beautifulSlideLibrary } from '../data/adapters/mixAndMatchSlideLibrary';

const MixAndMatchDemo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Slides', icon: Sparkles, count: beautifulSlideLibrary.length },
    { id: 'intro', name: 'Intro Slides', icon: Zap, count: beautifulSlideLibrary.filter(s => s.category === 'intro').length },
    { id: 'framework', name: 'Framework', icon: Dna, count: beautifulSlideLibrary.filter(s => s.category === 'framework').length },
    { id: 'performance', name: 'Performance', icon: Target, count: beautifulSlideLibrary.filter(s => s.category === 'performance').length },
    { id: 'use-case', name: 'Use Cases', icon: FileText, count: beautifulSlideLibrary.filter(s => s.category === 'use-case').length },
    { id: 'evidence', name: 'Evidence', icon: Activity, count: beautifulSlideLibrary.filter(s => s.category === 'evidence').length },
    { id: 'clinical', name: 'Clinical', icon: Shield, count: beautifulSlideLibrary.filter(s => s.category === 'clinical').length },
    { id: 'component', name: 'Components', icon: Bot, count: beautifulSlideLibrary.filter(s => s.category === 'component').length },
  ];

  const filteredSlides = selectedCategory === 'all' 
    ? beautifulSlideLibrary 
    : beautifulSlideLibrary.filter(slide => slide.category === selectedCategory);

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
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent mb-4">
              Mix & Match Slide Library
            </h1>
            <p className="text-xl text-slate-300 mb-6">
              Beautiful, sophisticated slides from our existing decks
            </p>
            <div className="flex items-center justify-center space-x-4 text-slate-400">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span>Animated</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                <span>Data-Driven</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span>Professional</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-xl border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'border-cyan-400 bg-cyan-400/10 text-cyan-400'
                    : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-600 hover:bg-slate-800/70'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center space-y-2">
                  <category.icon className="w-6 h-6" />
                  <span className="text-sm font-medium text-center">{category.name}</span>
                  <span className="text-xs text-slate-400">{category.count}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{beautifulSlideLibrary.length}</div>
            <div className="text-slate-300">Total Slides</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {beautifulSlideLibrary.filter(s => s.animations).length}
            </div>
            <div className="text-slate-300">Animated Slides</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {beautifulSlideLibrary.filter(s => s.dataDriven).length}
            </div>
            <div className="text-slate-300">Data-Driven</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {beautifulSlideLibrary.filter(s => s.source === 'SPE').length}
            </div>
            <div className="text-slate-300">SPE Framework</div>
          </div>
        </div>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSlides.map((slide, index) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 hover:bg-slate-800/70 transition-all duration-300"
            >
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
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-slate-200 mb-4">
              Ready to Create Your Custom Deck?
            </h2>
            <p className="text-slate-300 mb-6">
              Use our Mix & Match Composer to select and combine these beautiful slides
            </p>
            <motion.a
              href="/mix-and-match"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Palette className="w-5 h-5" />
              <span>Open Mix & Match Composer</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MixAndMatchDemo;

