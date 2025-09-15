// Enhanced Slide Composer - Uses Dynamic Registry
// Automatically discovers and composes from all available slide decks

import { SlideRegistry, type SlideDeck } from './slideRegistry';

// Enhanced slide selection with auto-discovery
export interface EnhancedSlideSelection {
  deckId: string;
  slideIndex: number;
  title?: string; // Optional override title
  customProps?: Record<string, any>; // Optional custom props
}

// Auto-discovering slide composer
export class EnhancedSlideComposer {
  private initialized = false;

  // Initialize the registry
  async initialize() {
    if (!this.initialized) {
      await SlideRegistry.initialize();
      this.initialized = true;
    }
  }

  // Get all available slide sources (auto-discovered)
  async getSlideSources() {
    await this.initialize();
    return SlideRegistry.getSlideSources();
  }

  // Compose custom deck from selections
  async composeCustomDeck(selections: EnhancedSlideSelection[]) {
    await this.initialize();
    
    return selections.map(selection => {
      const deck = SlideRegistry.getDeck(selection.deckId);
      if (!deck) {
        console.warn(`Deck ${selection.deckId} not found`);
        return null;
      }

      const slide = deck.slides[selection.slideIndex];
      if (!slide) {
        console.warn(`Slide ${selection.slideIndex} not found in deck ${selection.deckId}`);
        return null;
      }

      // Apply customizations
      let customizedSlide = { ...slide };
      
      if (selection.title) {
        customizedSlide.title = selection.title;
      }
      
      if (selection.customProps) {
        customizedSlide = { ...customizedSlide, ...selection.customProps };
      }

      // Add metadata
      customizedSlide._metadata = {
        sourceDeck: selection.deckId,
        originalIndex: selection.slideIndex,
        deckName: deck.name,
        category: deck.category
      };

      return customizedSlide;
    }).filter(Boolean);
  }

  // Smart deck composition by criteria
  async composeByAudience(audience: string, maxSlides?: number) {
    await this.initialize();
    
    const relevantDecks = SlideRegistry.getDecksByAudience(audience);
    const selections: EnhancedSlideSelection[] = [];

    // Smart selection logic
    relevantDecks.forEach(deck => {
      if (deck.category === 'core') {
        // Include title slide and key slides from core decks
        selections.push({ deckId: deck.id, slideIndex: 0 }); // Title
        if (deck.slides.length > 2) {
          selections.push({ deckId: deck.id, slideIndex: 1 }); // Problem
          selections.push({ deckId: deck.id, slideIndex: 2 }); // Solution
        }
      } else if (deck.category === 'use-case') {
        // Include title and key demonstration slides from use cases
        selections.push({ deckId: deck.id, slideIndex: 0 }); // Use case title
        if (deck.slides.length > 3) {
          selections.push({ deckId: deck.id, slideIndex: 3 }); // Key demo slide
        }
      }
    });

    // Limit if requested
    if (maxSlides) {
      selections.splice(maxSlides);
    }

    return this.composeCustomDeck(selections);
  }

  // Compose by tags
  async composeByTags(tags: string[], maxSlides?: number) {
    await this.initialize();
    
    const selections: EnhancedSlideSelection[] = [];
    
    for (const tag of tags) {
      const relevantDecks = SlideRegistry.getDecksByTag(tag);
      
      relevantDecks.forEach(deck => {
        // Add representative slides from each deck
        if (deck.slides.length > 0) {
          selections.push({ deckId: deck.id, slideIndex: 0 });
          
          // Add a demo slide if available
          if (deck.slides.length > 3) {
            selections.push({ deckId: deck.id, slideIndex: 3 });
          }
        }
      });
    }

    // Remove duplicates and limit
    const uniqueSelections = selections.filter((selection, index, self) => 
      index === self.findIndex(s => s.deckId === selection.deckId && s.slideIndex === selection.slideIndex)
    );

    if (maxSlides) {
      uniqueSelections.splice(maxSlides);
    }

    return this.composeCustomDeck(uniqueSelections);
  }

  // Get deck metadata for UI
  async getAllDecksMetadata() {
    await this.initialize();
    return SlideRegistry.getAllDecks().map(deck => ({
      id: deck.id,
      name: deck.name,
      category: deck.category,
      slideCount: deck.slides.length,
      description: deck.metadata?.description,
      tags: deck.metadata?.tags,
      audience: deck.metadata?.audience
    }));
  }

  // Get slides metadata for a specific deck
  async getDeckSlidesMetadata(deckId: string) {
    await this.initialize();
    
    const deck = SlideRegistry.getDeck(deckId);
    if (!deck) return [];

    return deck.slides.map((slide, index) => ({
      deckId,
      index,
      title: slide.title,
      subtitle: slide.subtitle,
      notes: slide.notes || '',
      id: `${deckId}-${index}`
    }));
  }

  // Search across all slides
  async searchSlides(query: string) {
    await this.initialize();
    
    const results = [];
    const decks = SlideRegistry.getAllDecks();
    
    decks.forEach(deck => {
      deck.slides.forEach((slide, index) => {
        const searchText = [
          slide.title,
          slide.subtitle,
          slide.notes,
          JSON.stringify(slide.content)
        ].join(' ').toLowerCase();
        
        if (searchText.includes(query.toLowerCase())) {
          results.push({
            deckId: deck.id,
            deckName: deck.name,
            slideIndex: index,
            title: slide.title,
            subtitle: slide.subtitle,
            relevance: this.calculateRelevance(searchText, query.toLowerCase())
          });
        }
      });
    });

    // Sort by relevance
    return results.sort((a, b) => b.relevance - a.relevance);
  }

  // Calculate search relevance score
  private calculateRelevance(text: string, query: string): number {
    const titleMatch = text.includes(query) ? 10 : 0;
    const words = query.split(' ');
    const wordMatches = words.filter(word => text.includes(word)).length;
    return titleMatch + wordMatches;
  }
}

// Singleton instance
export const enhancedSlideComposer = new EnhancedSlideComposer();

// Predefined compositions using the enhanced composer
export const ENHANCED_COMPOSITIONS = {
  'quick-demo': async () => enhancedSlideComposer.composeByAudience('business', 5),
  'investor-pitch': async () => enhancedSlideComposer.composeByTags(['business', 'core'], 6),
  'scientific-validation': async () => enhancedSlideComposer.composeByAudience('research', 8),
  'use-case-showcase': async () => enhancedSlideComposer.composeByTags(['use-case'], 10),
  'technical-deep-dive': async () => enhancedSlideComposer.composeByAudience('technical', 8)
};

// Utility function for creating new use case decks
export const registerNewUseCaseDeck = (config: {
  id: string;
  name: string;
  slides: any[];
  description?: string;
  tags?: string[];
  audience?: string[];
}) => {
  const deck: SlideDeck = {
    id: config.id,
    name: config.name,
    category: 'use-case',
    slides: config.slides,
    metadata: {
      description: config.description,
      tags: ['use-case', ...config.id.split('-'), ...(config.tags || [])],
      audience: config.audience || ['research'],
      created: new Date().toISOString()
    }
  };
  
  SlideRegistry.registerDeck(deck);
  console.log(`Registered new use case deck: ${config.name}`);
  
  return deck;
};

// Export the enhanced composer as default
export default enhancedSlideComposer;

