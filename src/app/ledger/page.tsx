import { Metadata } from 'next';
import LedgerMainPage from '@/components/ledger/LedgerMainPage';

export const metadata: Metadata = {
  title: 'Trial Ledger | CrisPRO.ai',
  description: 'Decoded clinical trials with receipt-locked 8D mechanism vectors and de-risking context.',
};

export default function LedgerIndexPage() {
  return <LedgerMainPage />;
}
