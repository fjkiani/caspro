# Media Page Setup Guide

## Overview

The Media page allows you to upload and display PDFs (1-pagers), videos, and slide decks through HyGraph CMS. Content managers can simply upload files or add links in HyGraph, and they'll automatically appear on the Media page.

## What Was Created

### 1. Type Definitions
- `src/lib/docs/hygraph/media-types.ts` - TypeScript types for Media items

### 2. GraphQL Queries
- `src/lib/docs/hygraph/media-queries.ts` - HyGraph queries and API functions

### 3. Page Components
- `src/app/media/page.tsx` - Main Media page (server component)
- `src/app/media/MediaPageClient.tsx` - Client component with filtering/search

### 4. Viewer Components
- `src/components/media/MediaCard.tsx` - Card display for media grid
- `src/components/media/MediaViewer.tsx` - Modal viewer wrapper
- `src/components/media/PDFViewer.tsx` - PDF viewer with download
- `src/components/media/VideoViewer.tsx` - Video player (supports YouTube, Vimeo, uploaded videos)
- `src/components/media/DeckViewer.tsx` - Deck viewer (links to deck viewer page)

### 5. Documentation
- `docs/HYGRAPH_MEDIA_SCHEMA.md` - Complete HyGraph schema setup guide

## Features

✅ **PDF Support**
- Upload PDF files directly to HyGraph
- In-app PDF viewer with download option
- Opens in new tab option

✅ **Video Support**
- External video links (YouTube, Vimeo) - automatically converts to embed
- Uploaded video files
- Thumbnail support
- Full video player

✅ **Deck Support**
- Links to existing deck viewer
- Uses deck slug or ID for navigation
- Preview with link to full deck

✅ **Filtering & Search**
- Filter by type (PDF, Video, Deck)
- Filter by category
- Search by title, excerpt, or tags
- Real-time filtering

✅ **Minimal Upload Process**
- Just upload PDF or add video link in HyGraph
- No code changes needed
- Automatic rendering

## Setup Steps

### 1. Configure HyGraph Schema

Follow the instructions in `docs/HYGRAPH_MEDIA_SCHEMA.md` to:
- Create `MediaItem` model
- Create `MediaCategory` model
- Create `MediaType` enum
- Set up relations

### 2. Add Media Items in HyGraph

**For a PDF:**
1. Create new `MediaItem`
2. Set `type` to `PDF`
3. Upload `pdfFile`
4. Fill in title, slug, description
5. Set `isPublished` to `true`
6. Save

**For a Video:**
1. Create new `MediaItem`
2. Set `type` to `VIDEO`
3. Option A: Add `videoUrl` (YouTube/Vimeo link)
4. Option B: Upload `videoFile`
5. Upload `thumbnail` (optional but recommended)
6. Fill in title, slug, description
7. Set `isPublished` to `true`
8. Save

**For a Deck:**
1. Create new `MediaItem`
2. Set `type` to `DECK`
3. Set `deckSlug` (matches your deck route)
4. Fill in title, slug, description
5. Set `isPublished` to `true`
6. Save

### 3. Verify Environment Variables

Make sure your `.env.local` has:
```
HYGRAPH_ENDPOINT=https://your-project.hygraph.com/v2/your-endpoint
HYGRAPH_TOKEN=your-token
```

Or:
```
NEXT_PUBLIC_HYGRAPH_ENDPOINT=https://your-project.hygraph.com/v2/your-endpoint
```

### 4. Access the Media Page

Navigate to `/media` in your application.

## Usage Examples

### Adding a 1-Pager PDF

1. Go to HyGraph CMS
2. Create new `MediaItem`
3. Title: "Platform Overview"
4. Slug: "platform-overview"
5. Type: `PDF`
6. Upload PDF file to `pdfFile`
7. Category: "1-Pagers" (create category first if needed)
8. Tags: ["platform", "overview"]
9. Is Published: `true`
10. Save

The PDF will automatically appear on `/media` page!

### Adding a YouTube Video

1. Go to HyGraph CMS
2. Create new `MediaItem`
3. Title: "Product Demo"
4. Slug: "product-demo"
5. Type: `VIDEO`
6. Video URL: `https://www.youtube.com/watch?v=abc123`
7. Upload thumbnail image
8. Category: "Videos"
9. Is Published: `true`
10. Save

The video will appear with an embedded player!

### Adding a Deck Link

1. Go to HyGraph CMS
2. Create new `MediaItem`
3. Title: "Investor Pitch"
4. Slug: "investor-pitch"
5. Type: `DECK`
6. Deck Slug: "investor-pitch" (must match your deck route)
7. Category: "Presentations"
8. Is Published: `true`
9. Save

Users can click to view the full deck!

## Component Reuse

The Media page reuses components from `src/src2/pages/DeckViewerPage.tsx`:
- Navigation patterns (keyboard, touch/swipe)
- Fullscreen mode
- Accessibility features

The `DeckViewer` component links to your existing deck viewer infrastructure.

## Customization

### Styling
All components use Tailwind CSS. Customize colors, spacing, etc. in the component files.

### Video Providers
The `convertToEmbedUrl` function in `media-queries.ts` handles:
- YouTube (youtube.com/watch, youtu.be)
- Vimeo (vimeo.com)

To add more providers, extend this function.

### PDF Viewer
The PDF viewer uses an iframe. For advanced features (annotations, etc.), consider integrating:
- PDF.js
- react-pdf
- Other PDF libraries

## Troubleshooting

### Media items not showing
- Check `isPublished` is `true` in HyGraph
- Verify API permissions
- Check browser console for errors
- Verify environment variables are set

### PDFs not loading
- Check file size (recommend < 50MB)
- Verify CORS settings
- Check PDF file is accessible

### Videos not playing
- Verify URL format is correct
- Check video is not private/restricted
- For uploaded videos, check file format (MP4, WebM)

### Decks not linking
- Verify `deckSlug` matches your deck route
- Check deck viewer page exists
- Ensure deck is accessible

## Next Steps

1. Set up HyGraph schema (see `HYGRAPH_MEDIA_SCHEMA.md`)
2. Add your first media items
3. Test the Media page at `/media`
4. Customize styling if needed
5. Add more categories as needed

## Support

For issues or questions:
- Check `HYGRAPH_MEDIA_SCHEMA.md` for schema setup
- Review component code for customization
- Check HyGraph documentation for CMS usage
