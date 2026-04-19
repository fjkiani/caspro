import { NextResponse } from 'next/server';
import { getAllUseCasesCms } from '@/lib/docs/hygraph/use-case-queries';

/**
 * Hygraph-driven manuscript list for the navbar (no hardcoded PDFs).
 */
export async function GET() {
  try {
    const rows = await getAllUseCasesCms();
    const items = rows
      .filter((u) => u.slug && String(u.slug).trim())
      .map((u) => ({
        id: u.id,
        slug: String(u.slug).trim(),
        title: u.title,
      }));
    return NextResponse.json(
      { items },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
        },
      }
    );
  } catch (e) {
    console.error('[api/manuscripts]', e);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
