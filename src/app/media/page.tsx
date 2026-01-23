import { Metadata } from 'next';
import MediaPageClient from './MediaPageClient';
import { getAllMedia, getAllMediaCategories } from '@/lib/docs/hygraph/media-queries';

export const metadata: Metadata = {
  title: 'Media | CrisPRO.ai',
  description: 'Browse our collection of 1-pagers, slide decks, and videos',
};

export default async function MediaPage() {
  // Fetch media items and categories
  const [mediaItems, categories] = await Promise.all([
    getAllMedia({}, 'order_ASC'),
    getAllMediaCategories(),
  ]);

  return <MediaPageClient initialMedia={mediaItems} categories={categories} />;
}
