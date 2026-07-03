import type { ReactNode } from 'react';

/**
 * Hygiene wrapper for raw data artifact downloads (.json, .py, .csv, etc).
 *
 * - `download` hints the browser to download rather than navigate
 * - `target="_blank"` opens a new tab so the user does not lose context
 * - `rel="nofollow noopener noreferrer"` keeps crawlers out of data files
 *   and prevents reverse-tabnabbing
 *
 * Replaces all raw `<a href="*.json">` and `<a href="*.py">` patterns
 * flagged by the audit.
 */

interface ArtifactLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}

export default function ArtifactLink({
  href,
  children,
  className,
  ariaLabel,
}: ArtifactLinkProps) {
  return (
    <a
      href={href}
      download
      target="_blank"
      rel="nofollow noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
}
