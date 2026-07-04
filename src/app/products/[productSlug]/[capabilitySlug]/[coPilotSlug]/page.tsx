import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductSlug, CapabilitySlug, getCoPilotMapping, CO_PILOT_MAPPINGS } from '@/data/navigation/co-pilot-mappings';
import { generateCoPilotStaticParams } from '@/data/navigation/navigation-helpers';
import { getCapabilityDefinition } from '@/data/navigation/product-capabilities';
import { coPilotDetailsData } from '@/data/coPilotDetails';
import OutcomeFocusedCoPilotPage from '@/components/co-pilot-detail/OutcomeFocusedCoPilotPage';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Generate static params for all co-pilot pages
export async function generateStaticParams() {
  return generateCoPilotStaticParams();
}

// Generate metadata for co-pilot page
export async function generateMetadata({ 
  params 
}: { 
  params: { productSlug: string; capabilitySlug: string; coPilotSlug: string } 
}): Promise<Metadata> {
  const mapping = getCoPilotMapping(params.coPilotSlug);
  const coPilotData = mapping ? coPilotDetailsData[mapping.coPilotSlug] : undefined;
  
  if (!coPilotData) {
    return {
      title: 'Co-Pilot Not Found',
    };
  }
  
  const productLabel = params.productSlug === 'oncology' ? 'Oncology' : params.productSlug === 'r-d' ? 'R&D' : 'Research';
  return {
    title: `${coPilotData.pageTitle} | CrisPRO ${productLabel}`,
    description: `${productLabel} · ${params.capabilitySlug}: ${coPilotData.heroSubtitle || coPilotData.vision}`.slice(0, 160),
    alternates: { canonical: `/products/${params.productSlug}/${params.capabilitySlug}/${params.coPilotSlug}` },
  };
}

// Main co-pilot detail page component
export default async function CoPilotDetailPage({ 
  params 
}: { 
  params: { productSlug: string; capabilitySlug: string; coPilotSlug: string } 
}) {
  // Validate params
  const mapping = getCoPilotMapping(params.coPilotSlug);
  
  if (!mapping) {
    notFound();
  }
  
  // Verify mapping matches route params
  if (mapping.productSlug !== params.productSlug || mapping.capabilitySlug !== params.capabilitySlug) {
    notFound();
  }
  
  const coPilotData = coPilotDetailsData[mapping.coPilotSlug];
  const capabilityDef = getCapabilityDefinition(mapping.productSlug, mapping.capabilitySlug);
  
  if (!coPilotData || !capabilityDef) {
    notFound();
  }
  
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
              href={`/products/${mapping.productSlug}`} 
              className="hover:text-blue-600 transition-colors"
            >
              {mapping.productSlug === 'oncology' ? 'Oncology' : mapping.productSlug === 'r-d' ? 'R&D' : 'Research'}
            </Link>
            <span>/</span>
            <Link 
              href={`/products/${mapping.productSlug}/${mapping.capabilitySlug}`}
              className="hover:text-blue-600 transition-colors"
            >
              {capabilityDef.title}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">
              {coPilotData.pageTitle.split(':')[0] || coPilotData.pageTitle}
            </span>
          </div>
        </nav>
        
        {/* Back Button */}
        <Link
          href={`/products/${mapping.productSlug}/${mapping.capabilitySlug}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to {capabilityDef.title}</span>
        </Link>
        
        {/* Co-Pilot Page Content */}
        <OutcomeFocusedCoPilotPage content={coPilotData} />
      </div>
    </main>
  );
}

