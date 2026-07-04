import { parseEndpointsMDC } from '@/lib/docs/parser';
import DocsHomePageClient from '@/components/docs/DocsHomePageClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Documentation",
  description: "CrisPRO.ai developer documentation: API reference, quickstart, authentication, and product guides for Boltz, Command Center, Forge, and Oracle.",
  alternates: { canonical: "/docs" },
};


// Server component that fetches data
export default async function DocsHomePage() {
  // Parse endpoints from MDC
  let oracleEndpoints: any[] = [];
  let forgeEndpoints: any[] = [];
  
  try {
    const endpoints = await parseEndpointsMDC();
    oracleEndpoints = endpoints.filter((e: any) => e.category === 'ORACLE_DISCRIMINATIVE');
    forgeEndpoints = endpoints.filter((e: any) => e.category === 'FORGE_GENERATIVE');
  } catch (error) {
    console.error('Error parsing endpoints:', error);
    // Continue with empty arrays - page still renders
  }

  return (
    <DocsHomePageClient 
      oracleEndpoints={oracleEndpoints}
      forgeEndpoints={forgeEndpoints}
    />
  );
}
