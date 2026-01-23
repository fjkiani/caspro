# Media Page Quick Start Guide

## ✅ What's Already Implemented

All the code is ready! The Media page infrastructure is complete:

- ✅ Type definitions (`src/lib/docs/hygraph/media-types.ts`)
- ✅ GraphQL queries (`src/lib/docs/hygraph/media-queries.ts`)
- ✅ Page components (`src/app/media/page.tsx`, `MediaPageClient.tsx`)
- ✅ Viewer components (PDFViewer, VideoViewer, DeckViewer, MediaCard, MediaViewer)
- ✅ Filtering and search functionality
- ✅ Client export fixed (`fetchWithCache` now exported from `client.ts`)

## 🔧 What You Need to Do in HyGraph

### ⚡ Quick Option: Automated Setup

**You can set up the schema programmatically!** See `docs/HYGRAPH_MEDIA_SCHEMA_AUTOMATION.md` for:
- TypeScript script using Management API
- GraphQL schema file import (easiest method)

### 📝 Manual Option: Step-by-Step Setup

If you prefer manual setup or automation doesn't work:

### Step 1: Create MediaType Enum

1. Go to your HyGraph project → Schema
2. Click "Add enum"
3. Name: `MediaType`
4. Add values: `PDF`, `VIDEO`, `DECK`
5. Save

### Step 2: Create MediaCategory Model

1. Click "Add model"
2. Name: `MediaCategory`
3. Add these fields:

| Field Name | Type | Required | Unique | Notes |
|------------|------|----------|--------|-------|
| `title` | Single line text | ✅ Yes | ❌ No | Category name (e.g., "1-Pagers") |
| `slug` | Single line text | ✅ Yes | ✅ Yes | URL-friendly (e.g., "1-pagers") |
| `description` | Rich text | ❌ No | ❌ No | Optional description |
| `order` | Integer | ❌ No | ❌ No | Display order (lower = first) |
| `mediaItems` | **Relation** | ❌ No | ❌ No | **Many relation to MediaItem** |

**About the `mediaItems` relation (line 83-84 in schema doc):**
- This is a **reverse relation** - it shows all MediaItems that belong to this category
- In HyGraph UI: Add a relation field, select "MediaItem", choose "Many" (one category can have many items)
- This field is automatically populated when you link MediaItems to this category

### Step 3: Create MediaItem Model

1. Click "Add model"
2. Name: `MediaItem`
3. Add these fields:

#### Basic Fields
- `title` (Single line text, required)
- `slug` (Single line text, required, unique)
- `description` (Rich text, optional)
- `excerpt` (Multi-line text, optional)
- `type` (Enum: MediaType, required) - Select the enum you created
- `category` (Relation to MediaCategory, optional) - **Single relation** (one item belongs to one category)
- `tags` (String list, optional)

#### PDF Fields
- `pdfFile` (Asset, optional) - Upload PDF files here

#### Video Fields
- `videoUrl` (Single line text, optional) - For YouTube/Vimeo links
- `videoFile` (Asset, optional) - For uploaded videos
- `thumbnail` (Asset, optional) - Video thumbnail image

#### Deck Fields
- `deckId` (Single line text, optional) - Reference to deck ID
- `deckSlug` (Single line text, optional) - Slug for deck navigation

#### Common Fields
- `featuredImage` (Asset, optional)
- `publishedAt` (DateTime, required)
- `updatedAt` (DateTime, required) - Auto-updated
- `author` (Relation to Author, optional) - If you have an Author model
- `seoMetadata` (Relation to SEOMetadata, optional) - If you have SEO model
- `order` (Integer, optional) - Display order
- `isPublished` (Boolean, default: false) - **Must be true for items to appear**

### Step 4: Set Up Relations

1. **In MediaCategory:**
   - Add relation field: `mediaItems`
   - Type: MediaItem
   - Cardinality: **Many** (one category → many items)
   - This is the reverse relation

2. **In MediaItem:**
   - Add relation field: `category`
   - Type: MediaCategory
   - Cardinality: **Single** (one item → one category)
   - This is the forward relation

### Step 5: Configure API Permissions

1. Go to Settings → API Access
2. Make sure your API has read permissions for:
   - ✅ `MediaItem` (where `isPublished: true`)
   - ✅ `MediaCategory`
   - ✅ `Asset` (for file access)

## 📝 Adding Your First Media Item

### Example: Add a PDF 1-Pager

1. Go to Content → MediaItem
2. Click "Create new"
3. Fill in:
   - **Title**: "Platform Overview"
   - **Slug**: "platform-overview"
   - **Type**: Select `PDF`
   - **PDF File**: Upload your PDF
   - **Category**: Select or create a category (e.g., "1-Pagers")
   - **Tags**: Add tags like ["platform", "overview"]
   - **Is Published**: ✅ Check this box
   - **Published At**: Set to today's date
4. Save

The PDF will automatically appear on `/media` page!

### Example: Add a YouTube Video

1. Create new MediaItem
2. **Title**: "Product Demo"
3. **Type**: `VIDEO`
4. **Video URL**: `https://www.youtube.com/watch?v=abc123`
5. **Thumbnail**: Upload a preview image
6. **Is Published**: ✅
7. Save

### Example: Add a Deck Link

1. Create new MediaItem
2. **Title**: "Investor Pitch"
3. **Type**: `DECK`
4. **Deck Slug**: "investor-pitch" (must match your deck route)
5. **Is Published**: ✅
6. Save

## 🔍 Understanding the Relation (Line 83-84)

The `mediaItems` field in `MediaCategory` is a **reverse relation**:

```
MediaCategory (1) ←→ (Many) MediaItem
```

- **Forward relation**: `MediaItem.category` → points to one category
- **Reverse relation**: `MediaCategory.mediaItems` → automatically shows all items in that category

When you link a MediaItem to a MediaCategory:
- The MediaItem's `category` field points to the category
- The Category's `mediaItems` field automatically includes that item

This is handled automatically by HyGraph - you don't manually populate `mediaItems`.

## 🚀 Testing

1. Make sure your `.env.local` has:
   ```
   HYGRAPH_ENDPOINT=https://your-project.hygraph.com/v2/your-endpoint
   HYGRAPH_TOKEN=your-token
   ```

2. Navigate to `/media` in your app

3. You should see:
   - All published media items
   - Filter buttons (All, PDFs, Videos, Decks)
   - Category filters
   - Search functionality

## 🐛 Troubleshooting

**Media items not showing?**
- ✅ Check `isPublished` is `true`
- ✅ Verify API permissions
- ✅ Check browser console for errors
- ✅ Verify environment variables

**Relation not working?**
- The `mediaItems` field in MediaCategory is read-only (auto-populated)
- Make sure you're linking items via `MediaItem.category` field
- Check that the relation is set up correctly in both models

**PDFs not loading?**
- Check file size (< 50MB recommended)
- Verify CORS settings
- Check PDF file is accessible

**Videos not playing?**
- For YouTube/Vimeo: Verify URL format
- For uploaded videos: Check file format (MP4, WebM)
- Verify thumbnail is set

## 📚 Next Steps

1. Set up the HyGraph schema (follow steps above)
2. Add your first media items
3. Test the `/media` page
4. Customize styling if needed
5. Add more categories as needed

For detailed schema documentation, see `docs/HYGRAPH_MEDIA_SCHEMA.md`.
