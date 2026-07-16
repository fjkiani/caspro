import type { Metadata } from 'next';
import InvestorDeck from '@/components/investors/InvestorDeck';

export const metadata: Metadata = {
  title: 'Investors · CrisPRO',
  description:
    'The CrisPRO thesis in five slides — problem, wedge, proof, model, ask. Every claim traces to the public ledger.',
};

export default function InvestorsPage() {
  return <InvestorDeck />;
}
