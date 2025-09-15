import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { sampleDecks } from '../data/sampleDecks';
import type { SlideDeck } from '../types/slides';
import SlideRenderer from '../components/slides/SlideRenderer';
import AccessibilityToggle from '../components/AccessibilityToggle';

const DeckViewerPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [deck, setDeck] = useState<SlideDeck | null>(null);

  useEffect(() => {
    // First try to find in sampleDecks
    let foundDeck = sampleDecks.find(d => d.id === deckId);
    
    // If not found, try to load from localStorage (custom composed decks)
    if (!foundDeck && deckId?.startsWith('custom-')) {
      try {
        const customDeckData = localStorage.getItem(`deck-${deckId}`);
        if (customDeckData) {
          const customDeck = JSON.parse(customDeckData);
          foundDeck = {
            id: customDeck.id,
            title: customDeck.title,
            slides: customDeck.slides,
            metadata: customDeck.metadata
          };
        }
      } catch (error) {
        console.error('Failed to load custom deck:', error);
      }
    }
    
    if (foundDeck) {
      setDeck(foundDeck);
      // Hide sidebar for cinematic presentations and custom components by default
      const isCinematic = foundDeck.slides.some(slide => 
        slide.content?.some ? slide.content.some(content => content.type === 'cinematic' || content.type === 'custom-react') : false
      );
      setShowSidebar(!isCinematic);
      if (isCinematic) setIsFullscreen(false);
    } else {
      navigate('/');
    }
  }, [deckId, navigate]);

  // Flags for presentation types
  const isCustomReact = deck?.slides.some(slide => 
    slide.content && Array.isArray(slide.content) && slide.content.some(content => content.type === 'custom-react')
  ) || false;
  const isCinematic = deck?.slides.some(slide => 
    slide.content && Array.isArray(slide.content) && slide.content.some(content => content.type === 'cinematic' || content.type === 'custom-react')
  ) || false;

  // Derive slide list: for custom-react, use the slides as-is (each slide is individual)
  const derivedSlides = React.useMemo(() => {
    if (!deck) return [] as { id: string; title: string; content: any[] }[];
    
    // For custom-react slides, treat each slide as individual (like SPE deck)
    if (isCustomReact) {
      return deck.slides as any[];
    }
    
    // Fallback for other slide formats
    return deck.slides as any[];
  }, [deck, isCustomReact]);

  const totalSlides = derivedSlides.length;
  const currentSlide = derivedSlides[currentSlideIndex] as any;

  const goToNextSlide = () => {
    if (currentSlideIndex < totalSlides - 1) setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const goToPreviousSlide = () => {
    if (currentSlideIndex > 0) setCurrentSlideIndex(currentSlideIndex - 1);
  };

  const goToSlide = (index: number) => setCurrentSlideIndex(index);

  // Touch/swipe support state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => { setTouchEnd(null); setTouchStart(e.targetTouches[0].clientX); };
  const handleTouchMove = (e: React.TouchEvent) => { setTouchEnd(e.targetTouches[0].clientX); };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > minSwipeDistance) goToNextSlide();
    else if (distance < -minSwipeDistance) goToPreviousSlide();
  };

  const handleScreenClick = (e: React.MouseEvent) => {
    const screenWidth = window.innerWidth;
    const clickX = e.clientX;
    if (clickX < screenWidth / 3) goToPreviousSlide();
    else if (clickX > (screenWidth * 2) / 3) goToNextSlide();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPreviousSlide();
      if (e.key === 'ArrowRight') goToNextSlide();
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex, totalSlides]);

  if (!deck) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-center">
          <div className="text-gray-400 text-4xl mb-4">📂</div>
          <h2 className="text-xl font-semibold text-gray-100 mb-2">Deck not found</h2>
          <p className="text-gray-400">The requested slide deck could not be found.</p>
        </div>
      </div>
    );
  }

  if (isCinematic) {
    return (
      <div 
        className="cinematic-mode bg-slate-900 z-50"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleScreenClick}
        style={{ touchAction: 'pan-y' }}
      >
        <AccessibilityToggle positionClass="absolute top-5 left-5 z-50" />
        <div className="absolute inset-0 w-full h-full">
          {currentSlide && <SlideRenderer slide={currentSlide} />}
          <div className="absolute top-5 left-1/2 transform -translate-x-1/2 z-40 md:hidden animate-fade-in-out">
            <div className="bg-black/50 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
              ← Swipe to navigate →
            </div>
          </div>
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-2 bg-black/30 backdrop-blur-sm p-3 rounded-2xl">
            <button onClick={goToPreviousSlide} disabled={currentSlideIndex === 0} className="px-4 py-2 bg-slate-700/50 text-white rounded-xl hover:bg-slate-600/70 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed">←</button>
            <span className="text-white font-semibold px-4">{currentSlideIndex + 1} / {totalSlides}</span>
            <button onClick={goToNextSlide} disabled={currentSlideIndex === totalSlides - 1} className="px-4 py-2 bg-slate-700/50 text-white rounded-xl hover:bg-slate-600/70 transition-colors duration-200 disabled:opacity-50">→</button>
            <button onClick={() => navigate('/')} className="ml-4 px-4 py-2 bg-red-600/50 text-white rounded-xl hover:bg-red-500/70 transition-colors duration-200">Exit</button>
          </div>
        </div>
      </div>
    );
  }

  const containerClass = isFullscreen ? 'h-screen w-screen bg-black text-white' : 'min-h-screen bg-gray-50';

  return (
    <div className={containerClass}>
      {!isFullscreen && (
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/')} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Data Room</span>
              </button>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-lg font-semibold text-gray-900">{deck.title}</h1>
                <p className="text-sm text-gray-500">Slide {currentSlideIndex + 1} of {totalSlides}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <AccessibilityToggle positionClass="" />
              <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg" title={showSidebar ? 'Hide sidebar' : 'Show sidebar'}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showSidebar ? "M4 6h16M4 12h16M4 18h7" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
              <button onClick={() => setIsFullscreen(true)} className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>
      )}

      <div className="flex-1 flex h-full">
        {!isFullscreen && showSidebar && (
          <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Slides</h3>
              <div className="space-y-2">
                {derivedSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(index)}
                    className={`w-full text-left p-3 rounded-lg border transition-colors ${
                      index === currentSlideIndex ? 'border-blue-500 bg-blue-50 text-blue-900' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-sm font-medium truncate">{slide.title}</div>
                    <div className="text-xs text-gray-500 mt-1">Slide {index + 1}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 flex flex-col">
          <div 
            className={`flex-1 flex items-center justify-center w-full ${isFullscreen ? 'p-0' : 'p-8'}`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleScreenClick}
            style={{ touchAction: 'pan-y' }}
          >
            <div className="w-full h-full flex items-center justify-center">
              {currentSlide && <SlideRenderer slide={currentSlide} />} 
            </div>
          </div>

                      <div className={`flex items-center justify-between p-4 ${isFullscreen ? 'bg-black bg-opacity-75' : 'bg-white border-t border-gray-200'}`}>
            <button onClick={goToPreviousSlide} disabled={currentSlideIndex === 0} className={`px-4 py-2 rounded-lg font-medium transition-colors ${isFullscreen ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 disabled:opacity-50' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50'}`}>Previous</button>
            <div className="flex items-center space-x-4">
              <span className={isFullscreen ? 'text-white' : 'text-gray-900'}>{currentSlideIndex + 1} of {totalSlides}</span>
            </div>
            <button onClick={goToNextSlide} disabled={currentSlideIndex === totalSlides - 1} className={`px-4 py-2 rounded-lg font-medium transition-colors ${isFullscreen ? 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 disabled:opacity-50' : 'bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50'}`}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckViewerPage;
