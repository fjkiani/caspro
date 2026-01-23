# Quick Import Instructions

Since the Management API requires a special token, here's the **fastest way** to set up the schema:

## Option 1: Copy-Paste into HyGraph UI (Recommended - 2 minutes)

1. **Open your HyGraph project**: https://app.hygraph.com
2. **Go to Schema** (left sidebar)
3. **Click "Add model"** or look for **"Import Schema"** button
4. **Copy the entire contents** of `tools/hygraph-media-schema.graphql`
5. **Paste and import**

That's it! The schema will be created automatically.

## Option 2: Use HyGraph CLI

If you have the HyGraph CLI installed:

```bash
# Install CLI (if not installed)
npm install -g @hygraph/cli

# Login
hygraph login

# Import schema
hygraph schema:create --file tools/hygraph-media-schema.graphql
```

## Option 3: Get Management API Token

If you want to use the programmatic script:

1. Go to your HyGraph project → **Settings → API Access**
2. Create a new token with **"Management API"** permissions (not just Content API)
3. Add to `.env.local`:
   ```
   HYGRAPH_MANAGEMENT_TOKEN=your-management-token
   HYGRAPH_PROJECT_ID=cm65g7pxd09kx07my82376f33
   ```
4. Run: `npx tsx tools/setup-hygraph-media-schema.ts`

## What Gets Created

- ✅ `MediaType` enum (PDF, VIDEO, DECK)
- ✅ `MediaCategory` model
- ✅ `MediaItem` model  
- ✅ All fields and relations

## After Import

1. Verify models in Schema view
2. Set API permissions (Settings → API Access)
3. Start adding media items!
