import { NextResponse } from 'next/server';
import { getResearchAbstractsForNav } from '@/lib/docs/hygraph/research-abstract-queries';

/**
 * Hygraph-driven abstract list for the navbar (updates as CMS grows).
 */
export async function GET() {
  try {
    const { source, items } = await getResearchAbstractsForNav({ noCache: true });
    return NextResponse.json(
      { source, items },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      },
    );
  } catch (e) {
    console.error('[api/abstracts/nav]', e);
    return NextResponse.json({ source: 'local', items: [] }, { status: 200 });
  }
}
