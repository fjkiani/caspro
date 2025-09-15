// Dynamic Slide Registry - Auto-discovery of all slide decks
// This eliminates the need to manually register each new deck

import React from 'react';

// Base slide deck interface
export interface SlideDeck {
  id: string;
  name: string;
  category: 'core' | 'use-case' | 'custom';
  slides: any[];
  metadata?: {
    description?: string;
    tags?: string[];
    audience?: string[];
    created?: string;
    author?: string;
  };
}

// Registry for all discovered slide decks
class SlideRegistryClass {
  private decks: Map<string, SlideDeck> = new Map();
  private initialized = false;

  // Auto-discover all slide decks
  async initialize() {
    if (this.initialized) return;

    try {
      // Dynamically import all slide deck files
      const coreDecks = await this.discoverCoreDecks();
      const useCaseDecks = await this.discoverUseCaseDecks();
      const customDecks = await this.discoverCustomDecks();

      // Register all discovered decks
      [...coreDecks, ...useCaseDecks, ...customDecks].forEach(deck => {
        this.decks.set(deck.id, deck);
      });

      this.initialized = true;
      console.log(`SlideRegistry: Discovered ${this.decks.size} slide decks`);
    } catch (error) {
      console.error('Failed to initialize SlideRegistry:', error);
    }
  }

  // Discover core decks (101-business, 101-research, etc.)
  private async discoverCoreDecks(): Promise<SlideDeck[]> {
    const coreDecks: SlideDeck[] = [];

    // Core deck patterns
    const corePatterns = [
      { id: 'business', path: '../decks/101-business', name: 'Business Focus' },
      { id: 'research', path: '../decks/101-research', name: 'Research Focus' },
      { id: 'technical', path: '../decks/101-technical', name: 'Technical Focus' }
    ];

    for (const pattern of corePatterns) {
      try {
        const module = await import(pattern.path);
        const slides = module.default || module.slidesData || [];
        
        coreDecks.push({
          id: pattern.id,
          name: pattern.name,
          category: 'core',
          slides,
          metadata: {
            description: `${pattern.name} presentation deck`,
            audience: [pattern.id],
            tags: ['core', pattern.id]
          }
        });
      } catch (error) {
        console.warn(`Failed to load core deck: ${pattern.id}`, error);
      }
    }

    return coreDecks;
  }

  // Discover use case decks (multiple-myeloma, hereditary-breast-cancer, etc.)
  private async discoverUseCaseDecks(): Promise<SlideDeck[]> {
    const useCaseDecks: SlideDeck[] = [];

    // Use case deck patterns - these will be auto-discovered
    const useCasePatterns = [
      { id: 'multiple-myeloma', name: 'Multiple Myeloma Digital Twin' },
      { id: 'hereditary-breast-cancer', name: 'Hereditary Breast Cancer' },
      { id: 'crispr-therapy-design', name: 'CRISPR Therapy Design' }
    ];

    for (const pattern of useCasePatterns) {
      try {
        const module = await import(`../decks/use-cases/${pattern.id}`);
        const slides = module.default || module.slidesData || [];
        const slideData = module[`${pattern.id.replace(/-/g, '')}SlideData`] || {};
        
        useCaseDecks.push({
          id: pattern.id,
          name: pattern.name,
          category: 'use-case',
          slides,
          metadata: {
            description: slideData.description || `${pattern.name} use case presentation`,
            tags: ['use-case', ...pattern.id.split('-')],
            audience: ['research', 'clinical'],
            ...slideData.metadata
          }
        });
      } catch (error) {
        console.warn(`Failed to load use case deck: ${pattern.id}`, error);
      }
    }

    return useCaseDecks;
  }

  // Discover custom decks (future extensibility)
  private async discoverCustomDecks(): Promise<SlideDeck[]> {
    const customDecks: SlideDeck[] = [];
    
    // Future: Auto-discover custom decks from a custom/ directory
    // This would use file system scanning or a registry file
    
    return customDecks;
  }

  // Get all registered decks
  getAllDecks(): SlideDeck[] {
    return Array.from(this.decks.values());
  }

  // Get deck by ID
  getDeck(id: string): SlideDeck | undefined {
    return this.decks.get(id);
  }

  // Get decks by category
  getDecksByCategory(category: SlideDeck['category']): SlideDeck[] {
    return this.getAllDecks().filter(deck => deck.category === category);
  }

  // Get decks by tag
  getDecksByTag(tag: string): SlideDeck[] {
    return this.getAllDecks().filter(deck => 
      deck.metadata?.tags?.includes(tag)
    );
  }

  // Get decks by audience
  getDecksByAudience(audience: string): SlideDeck[] {
    return this.getAllDecks().filter(deck => 
      deck.metadata?.audience?.includes(audience)
    );
  }

  // Search decks
  searchDecks(query: string): SlideDeck[] {
    const lowerQuery = query.toLowerCase();
    return this.getAllDecks().filter(deck => 
      deck.name.toLowerCase().includes(lowerQuery) ||
      deck.metadata?.description?.toLowerCase().includes(lowerQuery) ||
      deck.metadata?.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Get slide sources (compatible with existing slideComposer)
  getSlideSources(): Record<string, any[]> {
    const sources: Record<string, any[]> = {};
    
    this.getAllDecks().forEach(deck => {
      sources[deck.id] = deck.slides;
    });
    
    return sources;
  }

  // Register a new deck dynamically
  registerDeck(deck: SlideDeck) {
    this.decks.set(deck.id, deck);
    console.log(`SlideRegistry: Registered new deck: ${deck.id}`);
  }

  // Unregister a deck
  unregisterDeck(id: string) {
    this.decks.delete(id);
    console.log(`SlideRegistry: Unregistered deck: ${id}`);
  }
}

// Singleton instance
export const SlideRegistry = new SlideRegistryClass();

// Hook for React components
export const useSlideRegistry = () => {
  const [initialized, setInitialized] = React.useState(SlideRegistry['initialized']);
  
  React.useEffect(() => {
    if (!initialized) {
      SlideRegistry.initialize().then(() => {
        setInitialized(true);
      });
    }
  }, [initialized]);
  
  return {
    initialized,
    getAllDecks: () => SlideRegistry.getAllDecks(),
    getDeck: (id: string) => SlideRegistry.getDeck(id),
    getDecksByCategory: (category: SlideDeck['category']) => SlideRegistry.getDecksByCategory(category),
    searchDecks: (query: string) => SlideRegistry.searchDecks(query)
  };
};

// Auto-discovery utility for new use cases
export const createUseCaseDeck = (config: {
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
      created: new Date().toISOString(),
      author: 'CrisPRO.ai'
    }
  };
  
  SlideRegistry.registerDeck(deck);
  return deck;
};

// Export for backward compatibility
export const getDiscoveredSlideSources = async () => {
  await SlideRegistry.initialize();
  return SlideRegistry.getSlideSources();
};
