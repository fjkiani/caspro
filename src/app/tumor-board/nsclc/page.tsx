import type { Metadata } from 'next';
import NsclcBoardSurface from '@/components/tumor-board/nsclc/NsclcBoardSurface';

export const metadata: Metadata = {
  title: 'NSCLC · CT · Tumor Board',
  description:
    'Chest CT → MONAI RetinaNet → lung heuristic → NCCN-lite → Elo-ranked workup. RUO board twin from frozen LUNA16 receipts.',
};

/** Door A board walk — React twin of nsclc_luna16 E2E (receipts remain on resolve/). */
export default function NsclcTumorBoardPage() {
  return <NsclcBoardSurface />;
}
