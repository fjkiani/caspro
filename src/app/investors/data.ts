import { Briefcase, BarChart4 } from 'lucide-react';

export type InvestorCardData = {
  title: string;
  description: string;
  href: string;
  iconName: 'Briefcase' | 'BarChart4';
  status: 'active' | 'coming-soon';
};

export const investorCardsData: InvestorCardData[] = [
  {
    title: 'The Investment Thesis',
    description: 'A deep dive into our market, technology, and strategy. Understand the fundamental drivers of our mission to conquer the oncology market.',
    href: '/investors/thesis',
    iconName: 'Briefcase',
    status: 'active',
  },
  {
    title: 'Market Landscape Analysis',
    description: 'A comprehensive analysis of the competitive landscape, identifying key players, their weaknesses, and our strategic path to dominance.',
    href: '/investors/market-landscape',
    iconName: 'BarChart4',
    status: 'active',
  },
]; 