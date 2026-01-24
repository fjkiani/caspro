import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductSlug, CapabilitySlug, getCapabilityCoPilots } from '@/data/navigation/co-pilot-mappings';
import { getCapabilityDefinition, getProductCapabilityDefinitions } from '@/data/navigation/product-capabilities';
import { generateCapabilityStaticParams } from '@/data/navigation/navigation-helpers';
import TabbedCapabilityPage from '@/components/products/shared/TabbedCapabilityPage';
import DirectCapabilityPage from '@/components/products/shared/DirectCapabilityPage';
import EducationalDirectCapabilityPage from '@/components/products/shared/EducationalDirectCapabilityPage';
import { getEducationalCapabilityData } from '@/data/capabilities/educational';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Generate static params for all capability pages
export async function generateStaticParams() {
  return generateCapabilityStaticParams();
}

// Generate metadata for capability page
export async function generateMetadata({ 
  params 
}: { 
  params: { productSlug: string; capabilitySlug: string } 
}): Promise<Metadata> {
  const capabilityDef = getCapabilityDefinition(
    params.productSlug as ProductSlug,
    params.capabilitySlug as CapabilitySlug
  );
  
  if (!capabilityDef) {
    return {
      title: 'Capability Not Found',
    };
  }
  
  return {
    title: `${capabilityDef.title} | CrisPRO ${params.productSlug === 'oncology' ? 'Oncology' : params.productSlug === 'r-d' ? 'R&D' : 'Research'}`,
    description: capabilityDef.description,
  };
}

// Main capability page component
export default async function CapabilityDetailPage({ 
  params 
}: { 
  params: { productSlug: string; capabilitySlug: string } 
}) {
  // Validate params
  const productSlug = params.productSlug as ProductSlug;
  const capabilitySlug = params.capabilitySlug as CapabilitySlug;
  
  const capabilityDef = getCapabilityDefinition(productSlug, capabilitySlug);
  
  if (!capabilityDef) {
    notFound();
  }
  
  // Determine if this capability has multiple co-pilots (tabs) or single co-pilot (direct)
  const coPilotMappings = getCapabilityCoPilots(productSlug, capabilitySlug);
  const hasMultipleCoPilots = coPilotMappings.length > 1;

  // Check if educational data exists for this capability
  const educationalData = await getEducationalCapabilityData(capabilitySlug);

  // CSI Journey Levels: Use educational layout even with multiple co-pilots
  // These are: match-patients-to-therapies (Level 2), predict-resistance (Level 3), prevent-toxicity (Level 4)
  const csiJourneyLevels: CapabilitySlug[] = [
    'match-patients-to-therapies', // Level 2
    'predict-resistance', // Level 3
    'prevent-toxicity', // Level 4
  ];
  const isCSIJourneyLevel = csiJourneyLevels.includes(capabilitySlug);

  // If educational data exists and (single co-pilot OR CSI journey level), use educational page
  if (educationalData && (!hasMultipleCoPilots || isCSIJourneyLevel)) {
    return (
      <EducationalDirectCapabilityPage
        productSlug={productSlug}
        capabilitySlug={capabilitySlug}
        educationalData={educationalData}
      />
    );
  }
  
  // Standard page rendering (existing logic)
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white text-slate-800 pt-20 pb-12 px-4 md:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              Products
            </Link>
            <span>/</span>
            <Link 
              href={`/products/${productSlug}`} 
              className="hover:text-blue-600 transition-colors"
            >
              {productSlug === 'oncology' ? 'Oncology' : productSlug === 'r-d' ? 'R&D' : 'Research'}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{capabilityDef.title}</span>
          </div>
        </nav>
        
        {/* Back Button */}
        <Link
          href={`/products/${productSlug}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {productSlug === 'oncology' ? 'Oncology' : productSlug === 'r-d' ? 'R&D' : 'Research'}</span>
        </Link>
        
        {/* Capability Page Content - Tabbed for multiple co-pilots, Direct for single */}
        {hasMultipleCoPilots ? (
          <TabbedCapabilityPage 
            productSlug={productSlug} 
            capabilitySlug={capabilitySlug}
            defaultTab={capabilitySlug === 'match-patients-to-therapies' ? 'therapy-fit' : undefined}
          />
        ) : (
          <DirectCapabilityPage productSlug={productSlug} capabilitySlug={capabilitySlug} />
        )}
      </div>
    </main>
  );
}

