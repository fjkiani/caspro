# HyGraph Media Schema Documentation

This document describes the HyGraph CMS schema for the Media page, which supports PDFs, videos, and slide decks.

## Content Models

### MediaItem

The main content model for media items (1-pagers, videos, decks).

```graphql
type MediaItem {
  id: ID!
  title: String!
  slug: String! @unique
  description: RichText
  excerpt: String
  type: MediaType! # PDF, VIDEO, or DECK
  category: MediaCategory @relation
  tags: [String!]
  
  # PDF-specific
  pdfFile: Asset # Uploaded PDF file
  
  # Video-specific
  videoUrl: String # External video URL (YouTube, Vimeo, etc.)
  videoFile: Asset # Uploaded video file
  thumbnail: Asset # Video thumbnail image
  
  # Deck-specific
  deckId: String # Reference to existing deck ID
  deckSlug: String # Slug for deck navigation
  
  # Common fields
  featuredImage: Asset
  publishedAt: DateTime!
  updatedAt: DateTime!
  author: Author @relation
  seoMetadata: SEOMetadata
  order: Int
  isPublished: Boolean! @default(value: false)
}
```

### MediaCategory

Categories for organizing media items.

```graphql
type MediaCategory {
  id: ID!
  title: String!
  slug: String! @unique
  description: RichText
  order: Int
  mediaItems: [MediaItem!]! @relation
}
```

### MediaType Enum

```graphql
enum MediaType {
  PDF
  VIDEO
  DECK
}
```

## Setup Instructions

### 1. Create MediaCategory Model

1. Go to your HyGraph project
2. Navigate to Schema
3. Click "Add model"
4. Name it `MediaCategory`
5. Add fields:
   - `title` (Single line text, required)
   - `slug` (Single line text, required, unique)
   - `description` (Rich text, optional)
   - `order` (Integer, optional)
   - `mediaItems` (MediaItem relation, many)

### 2. Create MediaItem Model

1. Click "Add model"
2. Name it `MediaItem`
3. Add fields:

**Basic Fields:**
- `title` (Single line text, required)
- `slug` (Single line text, required, unique)
- `description` (Rich text, optional)
- `excerpt` (Multi-line text, optional)
- `type` (Enum: PDF, VIDEO, DECK, required)
- `category` (MediaCategory relation, optional)
- `tags` (String list, optional)

**PDF Fields:**
- `pdfFile` (Asset, optional) - For uploaded PDFs

**Video Fields:**
- `videoUrl` (Single line text, optional) - External video URL
- `videoFile` (Asset, optional) - Uploaded video file
- `thumbnail` (Asset, optional) - Video thumbnail

**Deck Fields:**
- `deckId` (Single line text, optional) - Deck ID reference
- `deckSlug` (Single line text, optional) - Deck slug for navigation

**Common Fields:**
- `featuredImage` (Asset, optional)
- `publishedAt` (DateTime, required)
- `updatedAt` (DateTime, required)
- `author` (Author relation, optional)
- `seoMetadata` (SEOMetadata, optional)
- `order` (Integer, optional)
- `isPublished` (Boolean, default: false)

### 3. Create MediaType Enum

1. Click "Add enum"
2. Name it `MediaType`
3. Add values: `PDF`, `VIDEO`, `DECK`

### 4. Set Up Relations

1. In `MediaCategory`, add relation to `MediaItem`
2. In `MediaItem`, add relation to `MediaCategory`
3. In `MediaItem`, add relation to `Author` (if you have one)
4. In `MediaItem`, add relation to `SEOMetadata` (if you have one)

### 5. Configure Permissions

Make sure the API has read permissions for:
- `MediaItem` (where `isPublished: true`)
- `MediaCategory`
- `Asset` (for file access)

## Usage Examples

### Adding a PDF 1-Pager

1. Create new `MediaItem`
2. Set `title`: "CrisPRO Platform Overview"
3. Set `slug`: "crispro-platform-overview"
4. Set `type`: `PDF`
5. Upload `pdfFile`: Select your PDF file
6. Set `category`: Choose appropriate category
7. Add `tags`: ["platform", "overview", "1-pager"]
8. Set `isPublished`: `true`
9. Set `publishedAt`: Current date
10. Save

### Adding a Video

1. Create new `MediaItem`
2. Set `title`: "CrisPRO Demo Video"
3. Set `slug`: "crispro-demo-video"
4. Set `type`: `VIDEO`
5. Option A: Set `videoUrl`: "https://www.youtube.com/watch?v=..."
6. Option B: Upload `videoFile`: Select your video file
7. Upload `thumbnail`: Select thumbnail image
8. Set `category`: Choose appropriate category
9. Set `isPublished`: `true`
10. Save

### Adding a Deck

1. Create new `MediaItem`
2. Set `title`: "Investor Pitch Deck"
3. Set `slug`: "investor-pitch-deck"
4. Set `type`: `DECK`
5. Set `deckSlug`: "investor-pitch" (matches your deck route)
6. Or set `deckId`: "your-deck-id"
7. Set `category`: Choose appropriate category
8. Set `isPublished`: `true`
9. Save

## Field Validation Rules

- `slug` must be unique and URL-friendly
- `type` must match the content (PDF requires `pdfFile`, VIDEO requires `videoUrl` or `videoFile`, DECK requires `deckSlug` or `deckId`)
- `isPublished` must be `true` for items to appear on the Media page
- `publishedAt` is required

## Best Practices

1. **Slugs**: Use kebab-case (e.g., `investor-pitch-deck`)
2. **Thumbnails**: Always add thumbnails for videos for better preview
3. **Categories**: Use categories to organize content (e.g., "1-Pagers", "Videos", "Presentations")
4. **Tags**: Use tags for searchability (e.g., ["platform", "demo", "overview"])
5. **Excerpts**: Keep excerpts concise (1-2 sentences) for card previews
6. **Order**: Use `order` field to control display sequence

## API Endpoint

The Media page will automatically fetch from:
- `GET_ALL_MEDIA` query (filters by `isPublished: true`)
- `GET_ALL_MEDIA_CATEGORIES` query

Make sure your HyGraph API endpoint is configured in `.env.local`:
```
HYGRAPH_ENDPOINT=https://your-project.hygraph.com/v2/your-endpoint
HYGRAPH_TOKEN=your-token
```

## Troubleshooting

### Media items not showing
- Check `isPublished` is set to `true`
- Verify API permissions allow reading `MediaItem`
- Check that required fields are filled (title, slug, type)

### PDFs not loading
- Verify `pdfFile` asset is uploaded and accessible
- Check CORS settings if PDFs are hosted externally
- Ensure PDF file size is reasonable (< 50MB recommended)

### Videos not playing
- For external videos: Verify URL is correct and accessible
- For uploaded videos: Check file format is supported (MP4, WebM)
- Verify `thumbnail` is set for better UX

### Decks not linking
- Verify `deckSlug` matches your deck route structure
- Check that deck exists and is accessible
- Ensure deck viewer page is set up correctly
