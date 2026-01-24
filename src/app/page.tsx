import HeroSection from '@/components/sections/HeroSection';
import { CSIJourneySection } from '@/components/landing/csi-journey';
import TrustedBy from '@/components/shared/TrustedBy';
import { getAllMedia } from '@/lib/docs/hygraph/media-queries';
import FeaturedMediaPreview from '@/components/homepage/FeaturedMediaPreview';

// Removed unnecessary imports for components not active on the homepage.

export default async function Home() {
  // Fetch featured media items
  let mediaItems: any[] = [];
  try {
    mediaItems = await getAllMedia({}, 'publishedAt_DESC');
    // Force log to see what's happening
    console.log('[Homepage Server] Fetched media items:', mediaItems.length);
    if (mediaItems.length > 0) {
      console.log('[Homepage Server] First item:', mediaItems[0]?.title);
    }
  } catch (error) {
    console.error('[Homepage Server] Error fetching media items:', error);
    // Continue without media items if fetch fails
  }

  return (
    <main className="min-h-screen bg-white w-full overflow-x-hidden">
      <HeroSection />
      <CSIJourneySection />
      <TrustedBy />
      {/* Featured Media Preview */}
      {mediaItems && mediaItems.length > 0 && (
        <FeaturedMediaPreview mediaItems={mediaItems} />
      )}
      
    </main>
  );
}