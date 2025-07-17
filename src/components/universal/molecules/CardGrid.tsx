'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, LayoutGrid } from 'lucide-react';
import UniversalCard from '../atoms/UniversalCard';
import UniversalButton from '../atoms/UniversalButton';
import { CardGridData } from '@/types/universal-content';

interface CardGridProps {
  data: CardGridData;
  className?: string;
}

const CardGrid: React.FC<CardGridProps> = ({ data, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [layout, setLayout] = useState<'grid' | 'masonry' | 'carousel' | 'list' | 'columns' | 'accordion'>(data.layout || 'grid');
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique categories from cards for filtering
  const categories = useMemo(() => {
    const cats = new Set<string>();
    data.cards.forEach(card => {
      if (card.metadata?.category) {
        cats.add(card.metadata.category);
      }
    });
    return Array.from(cats);
  }, [data.cards]);

  // Filter and search cards
  const filteredCards = useMemo(() => {
    return data.cards.filter(card => {
      const matchesSearch = !data.searchable || 
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof card.content === 'string' 
          ? card.content.toLowerCase().includes(searchTerm.toLowerCase())
          : (card.content.front || '').toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesFilter = !data.filterable || 
        selectedFilter === 'all' || 
        card.metadata?.category === selectedFilter;

      return matchesSearch && matchesFilter;
    });
  }, [data.cards, searchTerm, selectedFilter, data.searchable, data.filterable]);

  const getGridClasses = () => {
    const columns = data.columns || 3;
    switch (layout) {
      case 'list':
        return 'grid grid-cols-1 gap-4';
      case 'columns':
        return 'grid grid-cols-1 md:grid-cols-2 gap-6';
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6';
      case 'grid':
      default:
        return `grid grid-cols-1 md:grid-cols-${Math.min(columns, 2)} lg:grid-cols-${columns} gap-6`;
    }
  };

  const layoutIcons = {
    grid: LayoutGrid,
    list: List,
    columns: Grid,
    masonry: Grid,
    carousel: Grid,
    accordion: List
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      {(data.title || data.subtitle) && (
        <div className="text-center">
          {data.title && (
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">
              {data.title}
            </h3>
          )}
          {data.subtitle && (
            <p className="text-slate-600">{data.subtitle}</p>
          )}
        </div>
      )}

      {/* Controls */}
      {(data.searchable || data.filterable) && (
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            {data.searchable && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}

            {/* Filter Toggle */}
            {data.filterable && categories.length > 0 && (
              <UniversalButton
                variant="outline"
                color="slate"
                icon={Filter}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </UniversalButton>
            )}
          </div>

          {/* Layout Controls */}
          <div className="flex gap-2">
            {(['grid', 'list', 'columns'] as ('grid' | 'masonry' | 'carousel' | 'list' | 'columns' | 'accordion')[]).map((layoutType) => {
              const Icon = layoutIcons[layoutType];
              return (
                <UniversalButton
                  key={layoutType}
                  variant={layout === layoutType ? 'primary' : 'ghost'}
                  size="sm"
                  color="slate"
                  icon={Icon}
                  onClick={() => setLayout(layoutType)}
                ><></></UniversalButton>
              );
            })}
          </div>
        </div>
      )}

      {/* Filters */}
      <AnimatePresence>
        {showFilters && data.filterable && categories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2 p-4 bg-slate-50 rounded-lg">
              <UniversalButton
                variant={selectedFilter === 'all' ? 'primary' : 'ghost'}
                size="sm"
                color="slate"
                onClick={() => setSelectedFilter('all')}
              >
                All ({data.cards.length})
              </UniversalButton>
              {categories.map(category => {
                const count = data.cards.filter(card => card.metadata?.category === category).length;
                return (
                  <UniversalButton
                    key={category}
                    variant={selectedFilter === category ? 'primary' : 'ghost'}
                    size="sm"
                    color="blue"
                    onClick={() => setSelectedFilter(category)}
                  >
                    {category} ({count})
                  </UniversalButton>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Count */}
      {(data.searchable || data.filterable) && (
        <div className="text-sm text-slate-600">
          Showing {filteredCards.length} of {data.cards.length} cards
        </div>
      )}

      {/* Cards Grid */}
      <motion.div
        className={getGridClasses()}
        layout
      >
        <AnimatePresence mode="popLayout">
          {filteredCards.map((card, index) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <UniversalCard
                card={card}
                index={index}
                className={layout === 'masonry' ? 'break-inside-avoid' : ''}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredCards.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-slate-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-slate-600 mb-2">
            No cards found
          </h3>
          <p className="text-slate-500">
            Try adjusting your search or filter criteria
          </p>
          {(searchTerm || selectedFilter !== 'all') && (
            <UniversalButton
              variant="outline"
              color="slate"
              className="mt-4"
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
              }}
            >
              Clear filters
            </UniversalButton>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CardGrid; 