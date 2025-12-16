import { Metadata } from 'next';
import { oncologyProductData } from '@/data/products/oncology-data';
import OncologyPageClient from './OncologyPageClient';

// Generate metadata for the Oncology product page
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: oncologyProductData.pageTitle,
    description: oncologyProductData.heroSubtitle || oncologyProductData.vision,
  };
}

// Main Oncology Product Page Component (Server Component)
export default function OncologyProductPage() {
  return <OncologyPageClient content={oncologyProductData} />;
}
