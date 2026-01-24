# Media Learning Hub Architecture

## Overview

The Media Learning Hub transforms media pages from simple viewers into comprehensive learning experiences with rich content, related resources, and clear CTAs.

## Architecture

### 1. Homepage Video Player (`HomepageVideoPlayer.tsx`)
- **Inline video playback** on homepage
- Click to play without leaving the page
- Fullscreen mode support
- Smooth animations with Framer Motion

### 2. Media Learning Hub (`MediaLearningHub.tsx`)
- **Tabbed interface**:
  - **Video Tab**: Full video player (for videos)
  - **Details Tab**: Rich content, metadata, download links
  - **Resources Tab**: Related media items
- **Rich content sections**:
  - Full description from HyGraph
  - Tags and metadata
  - Download links (video, PDF)
  - External links
- **CTA Section**: Reusable CTAs for demos, contact, etc.

### 3. Enhanced Media Detail Page (`/media/[slug]/page.tsx`)
- Fetches media item with full details
- Finds related media by:
  - Same category
  - Shared tags
- Passes to `MediaLearningHub` component

### 4. Media Index Page (`/media/page.tsx`)
- Organized by categories
- Filtering and search
- Grid/list view options

## Data Flow

```
HyGraph CMS
    ↓
getAllMedia() / getMediaBySlug()
    ↓
MediaLearningHub Component
    ↓
- Video Player
- Rich Content Sections
- Related Media
- CTAs (local)
```

## HyGraph Schema Fields Used

### MediaItem Model
- `title`, `slug`, `description` (RichText)
- `excerpt`, `type`, `tags`
- `videoUrl`, `videoFile` (Asset)
- `pdfFile` (Asset)
- `thumbnail` (Asset)
- `category` (Relation to MediaCategory)
- `publishedAt`, `isPublished`

### Related Media Logic
1. Same category → `category.id` match
2. Shared tags → `tags` array intersection
3. Limit to 6 items
4. Exclude current item

## CTA Strategy

**Local CTAs** (not from HyGraph):
- "Schedule a Demo" → `/contact`
- "View All Media" → `/media`
- "Request a Strategic Briefing" → `/contact`
- Custom CTAs per page/section

**HyGraph Content**:
- All media content (title, description, files)
- Related media suggestions
- Categories and tags

## Features

### Homepage
- ✅ Inline video player
- ✅ Click to play without navigation
- ✅ Fullscreen support
- ✅ Link to full learning hub

### Detail Page
- ✅ Tabbed interface (Video/Details/Resources)
- ✅ Rich content display
- ✅ Related media suggestions
- ✅ Download links
- ✅ CTA sections
- ✅ Responsive design

### Index Page
- ✅ Category organization
- ✅ Filtering by type/tags
- ✅ Search functionality
- ✅ Grid/list views

## Next Steps

1. **Enhance Media Index Page**:
   - Better filtering UI
   - Category tabs
   - Search bar
   - Sort options

2. **Add More CTA Types**:
   - Product-specific CTAs
   - Use case CTAs
   - Industry-specific CTAs

3. **HyGraph Enhancements**:
   - Add `relatedMedia` relation field (optional)
   - Add `ctaConfig` JSON field for custom CTAs
   - Add `learningObjectives` field

4. **Analytics**:
   - Track video plays
   - Track CTA clicks
   - Track related media clicks

## Usage

### Homepage
```tsx
<FeaturedMediaPreview mediaItems={mediaItems} />
// Automatically uses HomepageVideoPlayer for videos
```

### Detail Page
```tsx
<MediaLearningHub 
  media={mediaItem} 
  relatedMedia={relatedItems} 
/>
```

### Adding CTAs
```tsx
<CTASection
  title="Ready to Learn More?"
  description="..."
  primaryButton={{
    text: 'Schedule a Demo',
    href: '/contact',
    color: 'blue',
  }}
  secondaryButton={{
    text: 'View All Media',
    href: '/media',
    color: 'blue',
  }}
/>
```
