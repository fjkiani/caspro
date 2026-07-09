import type { Metadata } from 'next';
import VerticalSurface from '@/components/audience/VerticalSurface';
import { COMMAND_CENTER_PAGE_DATA } from '@/data/pages/products-command-page';

export const metadata: Metadata = {
  title: 'Command Center · CrisPRO',
  description: "BD operator's workbench for franchise-scope diligence.",
};

export default function command_center_Page() {
  return <VerticalSurface data={COMMAND_CENTER_PAGE_DATA} />;
}
