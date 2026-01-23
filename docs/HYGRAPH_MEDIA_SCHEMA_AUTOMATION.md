# HyGraph Media Schema Automation

## Overview

You can create the Media schema programmatically using HyGraph's Management API! This is much faster than manual setup.

## Prerequisites

1. **HyGraph Management Token**
   - Go to your HyGraph project → Settings → API Access
   - Create a new token with **Management API** permissions
   - Copy the token

2. **Project ID**
   - Found in your HyGraph project URL: `https://app.hygraph.com/[project-id]/...`
   - Or in Settings → General → Project ID

## Setup

### 1. Add Environment Variables

Add to your `.env.local`:

```env
HYGRAPH_MANAGEMENT_TOKEN=your-management-token-here
HYGRAPH_PROJECT_ID=your-project-id-here
```

### 2. Install Dependencies (if needed)

The script uses `graphql-request` which is already in your dependencies. If you need to run TypeScript directly:

```bash
npm install -D tsx
```

### 3. Run the Setup Script

```bash
# Option 1: Using npx tsx (if installed)
npx tsx tools/setup-hygraph-media-schema.ts

# Option 2: Using ts-node (if installed)
npx ts-node tools/setup-hygraph-media-schema.ts

# Option 3: Pass project ID as argument
npx tsx tools/setup-hygraph-media-schema.ts <your-project-id>
```

## What the Script Does

The script automatically:

1. ✅ Creates `MediaType` enum with values: `PDF`, `VIDEO`, `DECK`
2. ✅ Creates `MediaCategory` model with fields:
   - `title` (String, required)
   - `slug` (String, required, unique)
   - `description` (RichText, optional)
   - `order` (Int, optional)
3. ✅ Creates `MediaItem` model with all fields:
   - Basic: title, slug, description, excerpt, type, tags
   - PDF: pdfFile
   - Video: videoUrl, videoFile, thumbnail
   - Deck: deckId, deckSlug
   - Common: featuredImage, publishedAt, updatedAt, order, isPublished
4. ✅ Creates relation: `MediaItem.category` ↔ `MediaCategory.mediaItems`

## Manual Steps After Automation

After running the script, you'll need to complete a few things in the HyGraph UI:

### 1. Link Enum to Field

1. Go to Schema → MediaItem model
2. Click on the `type` field
3. Set the enum to `MediaType`
4. Save

### 2. Configure API Permissions

1. Go to Settings → API Access
2. Make sure your API has read permissions for:
   - ✅ `MediaItem` (where `isPublished: true`)
   - ✅ `MediaCategory`
   - ✅ `Asset` (for file access)

### 3. Verify Relations

1. Go to Schema → MediaItem
2. Verify `category` relation points to `MediaCategory`
3. Go to Schema → MediaCategory
4. Verify `mediaItems` relation shows up (reverse relation)

## Troubleshooting

### "Management API not available"

Some HyGraph plans might not have Management API access. In that case:
- Use the manual setup guide: `docs/MEDIA_PAGE_QUICK_START.md`
- Or contact HyGraph support to enable Management API

### "Field type not recognized"

The Management API might use different field type names. Common mappings:
- `String` → `Single line text`
- `RichText` → `Rich text`
- `Int` → `Integer`
- `Boolean` → `Boolean`
- `DateTime` → `DateTime`
- `Asset` → `Asset`
- `Enum` → `Enum` (needs to be linked manually)

### "Relation creation failed"

Relations might need to be created in a specific order:
1. Create both models first
2. Create the forward relation (`MediaItem.category`)
3. The reverse relation (`MediaCategory.mediaItems`) should appear automatically

If it doesn't, create it manually in the HyGraph UI.

### "Token doesn't have permissions"

Make sure your Management Token has:
- ✅ Schema read/write permissions
- ✅ Model creation permissions
- ✅ Field creation permissions

## Alternative: Using GraphQL Schema File (Easiest!)

The easiest way is to use the provided GraphQL schema file:

### Option 1: HyGraph CLI (Recommended)

```bash
# Install HyGraph CLI
npm install -g @hygraph/cli

# Login to HyGraph
hygraph login

# Import the schema
hygraph schema:create --file tools/hygraph-media-schema.graphql
```

### Option 2: Copy-Paste into HyGraph UI

1. Open `tools/hygraph-media-schema.graphql`
2. Copy the entire contents
3. Go to your HyGraph project → Schema
4. Click "Import Schema" or "Add from GraphQL"
5. Paste the schema
6. Review and apply

This is often the fastest method!

## Manual Setup (Fallback)

If automation doesn't work, follow the manual guide:
- `docs/MEDIA_PAGE_QUICK_START.md` - Step-by-step manual setup
- `docs/HYGRAPH_MEDIA_SCHEMA.md` - Complete schema documentation

## Next Steps

After schema is set up:

1. ✅ Test the Media page: Navigate to `/media`
2. ✅ Add your first media item in HyGraph
3. ✅ Verify it appears on the page
4. ✅ Add more categories and items

For adding content, see `docs/MEDIA_PAGE_SETUP.md`.
