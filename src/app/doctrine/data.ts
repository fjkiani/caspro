import { FC } from 'react';

export type DoctrineCardData = {
  title: string;
  description: string;
  href: string;
  iconName: 'BookOpen' | 'Dna' | 'ShieldCheck' | 'Crosshair';
  status: 'active' | 'coming-soon';
};

export const doctrineCardsData: DoctrineCardData[] = [
  {
    title: 'VUS Annihilation',
    description: 'Our first principle: systematically eliminating Variants of Uncertain Significance (VUS) to bring unparalleled clarity to cancer diagnosis and treatment.',
    href: '/doctrine/vus-annihilation',
    iconName: 'BookOpen',
    status: 'active',
  },
  {
    title: 'Metastasis Prevention',
    description: 'Our second principle: proactively identifying and neutralizing metastatic threats before they can endanger the patient, transforming reactive care into preemptive defense.',
    href: '/doctrine/metastasis-prevention',
    iconName: 'Dna',
    status: 'active',
  },
  {
    title: 'DeSci & IP-NFTs',
    description: 'Our third principle: pioneering a decentralized scientific ecosystem where research is transparent, collaborative, and equitably monetized through IP-NFTs.',
    href: '/doctrine/de-sci-and-ip-nfts',
    iconName: 'ShieldCheck',
    status: 'active',
  },
  {
    title: "Trial Conquest",
    description: "Clinical trial recruitment is a slow, manual failure that costs billions and delays cures. Their systems match keywords; our AI understands biology. We don't just find eligible patients; we identify the ones most likely to respond, transforming recruitment from a guessing game into a precision strike.",
    href: "/doctrine/trial-conquest",
    iconName: 'Crosshair',
    status: 'active',
  }
]; 