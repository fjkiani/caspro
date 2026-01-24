# Unified Media Viewer Setup

## ✅ What Was Created

### 1. Unified Media Detail Page
**Location**: `/media/[slug]`
- **Route**: `src/app/media/[slug]/page.tsx` (Server Component)
- **Viewer**: `src/app/media/[slug]/UnifiedMediaViewer.tsx` (Client Component)

**Features**:
- ✅ Handles VIDEO, DECK, and PDF media types
- ✅ Fullscreen mode (press ESC to exit)
- ✅ Keyboard navigation (Arrow keys, ESC)
- ✅ Responsive design
- ✅ Back button navigation
- ✅ Description display

### 2. Homepage Preview Section
**Component**: `src/components/homepage/FeaturedMediaPreview.tsx`

**Features**:
- ✅ Shows featured media item prominently
- ✅ Grid of additional media items (up to 3 more)
- ✅ Hover effects and animations
- ✅ Type badges (Video/Deck/PDF)
- ✅ Click to navigate to full viewer

### 3. Updated Components
- ✅ `VideoViewer.tsx` - Added `showToolbar` prop for flexible usage
- ✅ `page.tsx` - Now fetches and displays featured media on homepage

## 🎯 How to Use

### Viewing Media

1. **From Homepage**:
   - Featured media appears in "Featured Content" section
   - Click on any media card to view full content

2. **Direct URL**:
   - Navigate to `/media/glassbox-ai` (or any media slug)
   - Full viewer opens with all controls

3. **From Media Page**:
   - Go to `/media` to see all media items
   - Click any item to view in unified viewer

### Fullscreen Mode

- Click the maximize icon (top right) or press `F11`
- Press `ESC` to exit fullscreen
- Use arrow keys to navigate (if applicable)

## 📝 Current Media Item

**"The Glass Box of Precision Oncology"** (slug: `glassbox-ai`)
- Type: VIDEO
- Status: Published ✅
- URL: Direct Google Video URL

## 🔄 Next Steps

### For Deck Support

When you publish a deck with the same slug (`glassbox-ai`), the unified viewer will:
1. Detect it's a DECK type
2. Show deck-specific UI
3. Integrate with slide deck system (when implemented)

### To Add More Media

1. Go to HyGraph → Content → MediaItem
2. Create new media item
3. Set `isPublished` to `true`
4. Add tag `featured` to make it appear prominently on homepage
5. Save and publish

## 🎨 Customization

### Featured Media Selection

The homepage preview selects featured media by:
1. First item with `featured` tag
2. Or first published item (by publish date)

### Styling

All components use Tailwind CSS and can be customized:
- Colors: Blue for videos, Purple for decks, Red for PDFs
- Layout: Responsive grid system
- Animations: Framer Motion for smooth transitions

## 🐛 Troubleshooting

### Video Not Playing

- Check if video URL is accessible
- Google Video URLs may require CORS headers
- Try using YouTube/Vimeo embed URLs instead

### Media Not Showing on Homepage

- Verify `isPublished` is `true` in HyGraph
- Check that media items are being fetched correctly
- Ensure `getAllMedia` is working (check browser console)

### Deck Not Rendering

- Deck viewer is currently a placeholder
- Will be enhanced when deck data structure is finalized
- For now, shows title and description
