import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Products | CrisPRO',
    description: 'Explore CrisPRO products: Oncology, R&D, and Research platforms powered by AI.',
  };
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

