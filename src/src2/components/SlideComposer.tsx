// Frontend Slide Composer - Pick and Choose Interface
import React, { useState, useEffect } from 'react';
import { Check, Plus, Trash2, Play, Eye } from 'lucide-react';
import { 
  composeCustomDeck, 
  getComposedDeck, 
  PREDEFINED_COMPOSITIONS,
  getAllSlidesMetadata 
} from '../data/adapters/slideComposer';

interface SlideMetadata {
  source: string;
  index: number;
  title: string;
  subtitle: string;
  notes: string;
  id: string;
}

interface SelectedSlide {
  source: string;
  slideIndex: number;
  title?: string;
  id: string;
}

const SlideComposer: React.FC = () => {
  const [allSlides, setAllSlides] = useState<SlideMetadata[]>([]);
  const [selectedSlides, setSelectedSlides] = useState<SelectedSlide[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState<string>('all');
  const [previewMode, setPreviewMode] = useState(false);
  const [previewDeck, setPreviewDeck] = useState<any[]>([]);

  // Load all available slides
  useEffect(() => {
    const loadSlides = async () => {
      try {
        const slides = getAllSlidesMetadata();
        setAllSlides(slides);
      } catch (error) {
        console.error('Failed to load slides:', error);
      }
    };
    loadSlides();
  }, []);

  // Filter slides based on search and source
  const filteredSlides = allSlides.filter(slide => {
    const matchesSearch = slide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         slide.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === 'all' || slide.source === selectedSource;
    return matchesSearch && matchesSource;
  });

  // Add slide to selection
  const addSlide = (slide: SlideMetadata) => {
    const newSlide: SelectedSlide = {
      source: slide.source,
      slideIndex: slide.index,
      title: slide.title,
      id: slide.id
    };
    setSelectedSlides([...selectedSlides, newSlide]);
  };

  // Remove slide from selection
  const removeSlide = (slideId: string) => {
    setSelectedSlides(selectedSlides.filter(slide => slide.id !== slideId));
  };

  // Reorder slides
  const moveSlide = (fromIndex: number, toIndex: number) => {
    const newSlides = [...selectedSlides];
    const [movedSlide] = newSlides.splice(fromIndex, 1);
    newSlides.splice(toIndex, 0, movedSlide);
    setSelectedSlides(newSlides);
  };

  // Load predefined composition
  const loadPredefined = (compositionName: keyof typeof PREDEFINED_COMPOSITIONS) => {
    try {
      const composition = PREDEFINED_COMPOSITIONS[compositionName];
      const slides = composition.map(selection => ({
        source: selection.source,
        slideIndex: selection.slideIndex,
        title: selection.title,
        id: `${selection.source}-${selection.slideIndex}`
      }));
      setSelectedSlides(slides);
    } catch (error) {
      console.error('Failed to load predefined composition:', error);
    }
  };

  // Compose final deck and navigate to viewer
  const composeDeck = () => {
    try {
      const deck = composeCustomDeck(selectedSlides);
      console.log('Composed deck:', deck);
      
      // Create a unique deck ID for this custom composition
      const deckId = `custom-${Date.now()}`;
      
      // Convert slides to the format expected by DeckViewerPage
      const formattedSlides = deck.map((slide, index) => ({
        id: `slide-${index}`,
        title: slide.title,
        subtitle: slide.subtitle,
        titleClassName: slide.titleClassName,
        backgroundClass: slide.backgroundClass,
        content: slide.content, // Keep original content structure
        notes: slide.notes
      }));

      // Store the deck in localStorage for the viewer to access
      localStorage.setItem(`deck-${deckId}`, JSON.stringify({
        id: deckId,
        title: 'Custom Composed Deck',
        slides: formattedSlides,
        metadata: {
          composedAt: new Date().toISOString(),
          slideCount: deck.length,
          sources: [...new Set(selectedSlides.map(s => s.source))]
        }
      }));
      
      // Navigate to the deck viewer
      window.location.href = `/deck/${deckId}`;
      
      return deck;
    } catch (error) {
      console.error('Failed to compose deck:', error);
      alert('Failed to compose deck. Please try again.');
    }
  };

  // Toggle preview mode
  const togglePreview = () => {
    if (!previewMode && selectedSlides.length > 0) {
      try {
        const deck = composeCustomDeck(selectedSlides);
        // Format slides for preview display
        const formattedSlides = deck.map((slide, index) => ({
          id: `slide-${index}`,
          title: slide.title,
          subtitle: slide.subtitle,
          titleClassName: slide.titleClassName,
          backgroundClass: slide.backgroundClass,
          content: slide.content, // Keep original content structure
          notes: slide.notes,
          _metadata: slide._metadata
        }));
        setPreviewDeck(formattedSlides);
        setPreviewMode(true);
      } catch (error) {
        console.error('Failed to generate preview:', error);
        alert('Failed to generate preview. Please try again.');
      }
    } else {
      setPreviewMode(false);
      setPreviewDeck([]);
    }
  };

  // Get unique sources for filter
  const sources = ['all', ...new Set(allSlides.map(slide => slide.source))];

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
            Slide Composer
          </h1>
          <p className="text-slate-400 mt-2">
            Pick and choose slides to create custom presentations
          </p>
        </div>

        {/* Preview Panel */}
        {previewMode && (
          <div className="mb-6 bg-slate-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Preview: Custom Deck</h2>
              <button
                onClick={() => setPreviewMode(false)}
                className="bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Close Preview
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {previewDeck.map((slide, index) => (
                <div key={index} className="bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-slate-600 px-2 py-1 rounded">
                      {index + 1}
                    </span>
                    <span className="text-xs text-slate-400">
                      {slide._metadata?.source || 'Unknown'}
                    </span>
                  </div>
                  <h4 className="font-medium text-white mb-1">{slide.title}</h4>
                  <p className="text-sm text-slate-400">{slide.subtitle}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={composeDeck}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Launch Full Presentation
              </button>
              <button
                onClick={() => setPreviewMode(false)}
                className="bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Back to Composer
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Slide Library */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Slide Library</h2>
              
              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search slides..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <select
                  value={selectedSource}
                  onChange={(e) => setSelectedSource(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  {sources.map(source => (
                    <option key={source} value={source}>
                      {source === 'all' ? 'All Sources' : source.replace('-', ' ').toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Predefined Compositions */}
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Quick Start</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(PREDEFINED_COMPOSITIONS).map(composition => (
                    <button
                      key={composition}
                      onClick={() => loadPredefined(composition as keyof typeof PREDEFINED_COMPOSITIONS)}
                      className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      {composition.replace('-', ' ').toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slide List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredSlides.map(slide => (
                  <div
                    key={slide.id}
                    className="bg-slate-700 rounded-lg p-4 hover:bg-slate-600 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{slide.title}</h4>
                        <p className="text-sm text-slate-400 mt-1">{slide.subtitle}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-slate-600 px-2 py-1 rounded">
                            {slide.source}
                          </span>
                          <span className="text-xs text-slate-500">
                            Slide {slide.index + 1}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => addSlide(slide)}
                        className="bg-green-600 hover:bg-green-700 p-2 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Slides */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Selected Slides</h2>
                <span className="text-sm text-slate-400">
                  {selectedSlides.length} slides
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={composeDeck}
                  disabled={selectedSlides.length === 0}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Compose Deck
                </button>
                <button
                  onClick={togglePreview}
                  disabled={selectedSlides.length === 0}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Selected Slides List */}
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {selectedSlides.length === 0 ? (
                  <div className="text-center text-slate-400 py-8">
                    <p>No slides selected</p>
                    <p className="text-sm mt-1">Add slides from the library</p>
                  </div>
                ) : (
                  selectedSlides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className="bg-slate-700 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs bg-slate-600 px-2 py-1 rounded">
                              {index + 1}
                            </span>
                            <span className="text-xs text-slate-400">
                              {slide.source}
                            </span>
                          </div>
                          <h4 className="font-medium text-sm text-white">
                            {slide.title}
                          </h4>
                        </div>
                        <button
                          onClick={() => removeSlide(slide.id)}
                          className="bg-red-600 hover:bg-red-700 p-1 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Clear All */}
              {selectedSlides.length > 0 && (
                <button
                  onClick={() => setSelectedSlides([])}
                  className="w-full mt-4 bg-slate-600 hover:bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideComposer;
