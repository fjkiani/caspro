import { Metadata } from 'next';
import BrenusDecodeWallPage from '@/components/ledger/BrenusDecodeWallPage';

export const metadata: Metadata = {
  title: 'Decode Wall | CrisPRO.ai',
  description:
    'CrisPRO 8D vector decode across the full Brenus registry (42 trials). Honest partial state: 17 decoded, 25 pending. 1 quarantined under governance lock.',
};

export default function DecodeWallPage() {
  return <BrenusDecodeWallPage />;
}
