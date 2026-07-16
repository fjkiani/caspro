import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { CONTACT_PAGE_DATA } from '@/data/pages/contact-page';

export const metadata: Metadata = {
  title: 'Contact · CrisPRO',
  description: 'Talk to the team about sponsor, clinical, advocacy, or general inquiries.',
};

export default function contact_Page() {
  return <VerticalSurface data={CONTACT_PAGE_DATA} />;
}
