import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { PARTNERS_AUTH0_PAGE_DATA } from '@/data/pages/partners-auth0-page';

export const metadata: Metadata = {
  title: 'Identity partner · CrisPRO',
  description: 'Enterprise identity for the gated side of CrisPRO.',
};

export default function partners_auth0_Page() {
  return <VerticalSurface data={PARTNERS_AUTH0_PAGE_DATA} />;
}
