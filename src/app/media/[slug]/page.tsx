import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMediaBySlug, getAllMedia } from '@/lib/docs/hygraph/media-queries';
import MultiContentMediaViewer from '@/components/media/MultiContentMediaViewer';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const media = await getMediaBySlug(params.slug);
  
  if (!media) {
    return {
      title: 'Media Not Found | CrisPRO.ai',
    };
  }
  
  return {
    title: `${media.title} | CrisPRO.ai Media`,
    description: media.excerpt || media.description?.text || 'View media content from CrisPRO.ai',
  };
}

export default async function MediaDetailPage({ params }: { params: { slug: string } }) {
  const media = await getMediaBySlug(params.slug);
  
  if (!media) {
    notFound();
  }
  
  // Fetch related media (same category or tags, excluding current item)
  const allMedia = await getAllMedia({}, 'publishedAt_DESC');
  const relatedMedia = allMedia
    .filter(item => 
      item.id !== media.id && 
      item.isPublished &&
      (
        // Same category
        (media.category?.id && item.category?.id === media.category.id) ||
        // Shared tags
        (media.tags && item.tags && 
         media.tags.some(tag => item.tags?.includes(tag)))
      )
    )
    .slice(0, 6); // Limit to 6 related items
  
  return <MultiContentMediaViewer media={media} />;
}
