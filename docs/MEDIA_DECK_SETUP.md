# Media Deck Setup Guide

## Problem
The deck is not showing because `deckSlug` or `deckId` is not set in HyGraph.

## Solution

### Option 1: Set deckSlug in HyGraph (Recommended)

1. Go to HyGraph → Content → MediaItem
2. Find your media item (e.g., "The Glass Box of Precision Oncology")
3. Set the `deckSlug` field to match a deck in the registry:
   - `safety` - ZETA Safety deck
   - `efficacy` - ZETA Efficacy deck
   - `trials` - ZETA Trials deck
   - `r-and-d` - R&D Transformation deck
   - `crispro-101` - CrisPRO 101 deck
   - `metastasis` - Metastasis Interception deck
   - Or add a new deck to `src/data/decks/deck-registry.ts`

4. Publish the media item

### Option 2: Add New Deck to Registry

If you have a new deck component:

1. Create the deck component in `src/data/decks/`
2. Add it to `src/data/decks/deck-registry.ts`:
```typescript
{
  id: 'glassbox-ai',
  title: 'The Glass Box of Precision Oncology',
  description: '...',
  category: '...',
  icon: '🔬',
  component: GlassBoxDeck,
  slideCount: 10,
  tags: ['precision-oncology', 'glass-box']
}
```
3. Set `deckSlug: 'glassbox-ai'` in HyGraph

### Current Media Item Status

- ✅ Video: Has `videoUrl`
- ❌ Deck: `deckSlug` and `deckId` are both `null`
- ❓ PDF: Check if `pdfFile` is uploaded (this would be the 1-pager)

## How to Check

1. Open browser console on `/media/glassbox-ai/`
2. Look for `[MultiContentMediaViewer] logs
3. Check what `hasDeck` shows
