import Link from 'next/link';
import { RELATED_LINKS } from '@/data/related-links';

/**
 * RelatedLinks — renders a nav of contextually relevant internal links
 * at the bottom of a page. Used to wire inbound links to orphan pages
 * that the audit flagged as having no internal link equity.
 *
 * Usage: <RelatedLinks route="/genome-editing" />
 */
interface RelatedLinksProps {
  route: string;
}

export default function RelatedLinks({ route }: RelatedLinksProps) {
  const links = RELATED_LINKS[route];
  if (!links || links.length === 0) return null;

  return (
    <nav
      aria-label="Related pages"
      className="mt-16 border-t border-zinc-800 pt-8"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-zinc-500 mb-4">
        Related
      </p>
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition"
            >
              {link.label}
              <span aria-hidden className="ml-1">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
