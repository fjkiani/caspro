# Media Preview Debug Guide

## Issue: Featured Media Preview Not Showing on Homepage

### Verification Steps

1. **Check Browser Console**
   - Open browser DevTools (F12)
   - Look for console logs:
     - `[Homepage] Fetched media items: X`
     - `[FeaturedMediaPreview] Received mediaItems: X`
   - Check for any errors

2. **Verify Environment Variables**
   ```bash
   # Check if HyGraph is configured
   echo $HYGRAPH_ENDPOINT
   echo $NEXT_PUBLIC_HYGRAPH_ENDPOINT
   ```

3. **Test Media Query Directly**
   - The media item exists in HyGraph (verified via MCP)
   - Slug: `glassbox-ai`
   - Type: `VIDEO`
   - Published: `true`

4. **Check Component Rendering**
   - Component exists at: `src/components/homepage/FeaturedMediaPreview.tsx`
   - Imported in: `src/app/page.tsx`
   - Condition: `{mediaItems && mediaItems.length > 0 && ...}`

### Common Issues

1. **Empty Array Returned**
   - `getAllMedia` might be returning `[]` if:
     - HyGraph endpoint not configured
     - Query failing silently
     - `isPublished: true` filter not matching

2. **Component Not Rendering**
   - Check if `mediaItems.length > 0`
   - Verify component is not returning `null` early

3. **Query Issues**
   - Verify `GET_ALL_MEDIA` query structure
   - Check if `where: { isPublished: true }` is correct
   - Ensure `orderBy: 'publishedAt_DESC'` is valid

### Quick Fix Test

Add this temporary test to see if data is being fetched:

```typescript
// In page.tsx, after getAllMedia call
console.log('Media items:', JSON.stringify(mediaItems, null, 2));
```

If you see an empty array, the issue is with the query.
If you see data but component doesn't render, the issue is with the component.
