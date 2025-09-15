import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import DeckCard from '../components/DeckCard';
import { sampleDecks, categories } from '../data/sampleDecks';
import type { SlideDeck } from '../types/slides';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDecks = useMemo(() => {
    return sampleDecks.filter(deck => {
      const matchesCategory = selectedCategory === 'all' || deck.category === selectedCategory;
      return matchesCategory;
    });
  }, [selectedCategory]);

  const handleDeckClick = (deck: SlideDeck) => {
    navigate(`/deck/${deck.id}`);
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
  

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search Bar */}
          <div className="flex-1 max-w-lg">
            {/* <input
              type="text"
              placeholder="Search decks, tags, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            /> */}
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {categories.map(category => {
          const categoryDecks = sampleDecks.filter(deck => deck.category === category.id);
          return (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{categoryDecks.length} decks</p>
                </div>
              </div>
              <p className="text-xs text-gray-500">{category.description}</p>
            </div>
          );
        })}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {selectedCategory === 'all' ? 'All Decks' : 
           categories.find(c => c.id === selectedCategory)?.name + ' Decks'}
          <span className="text-gray-500 font-normal ml-2">({filteredDecks.length})</span>
        </h2>
      </div>

      {/* Deck Grid/List */}
      {filteredDecks.length > 0 ? (
        <div className={viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'
          : 'space-y-4'
        }>
          {filteredDecks.map(deck => (
            <DeckCard
              key={deck.id}
              deck={deck}
              onClick={() => handleDeckClick(deck)}
              className={viewMode === 'list' ? 'max-w-none' : ''}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-4xl mb-4">📂</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No decks found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default HomePage; 