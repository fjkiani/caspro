'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { TRIAL_RECEIPT_NAV } from '@/data/trial-receipt-nav';
import { DATA_ROOM_URL, ORG_URL } from '@/components/ui/zeta-navbar/constants';

const SITE_NAV = [
  { label: 'ORG', href: ORG_URL, external: true },
  { label: 'Data Room', href: DATA_ROOM_URL, external: true },
  { label: 'Contact', href: ROUTES.CONTACT_PAGE, external: false },
] as const;

function pillClasses(active: boolean, isDarkMode: boolean): string {
  return `px-2.5 sm:px-4 py-2 sm:py-2.5 text-[9px] sm:text-[11px] font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] rounded border transition-colors ${
    active
      ? isDarkMode
        ? 'text-white border-cyan-400 bg-cyan-500/15'
        : 'text-slate-900 border-sky-700 bg-sky-50'
      : isDarkMode
        ? 'text-white border-zinc-600 bg-zinc-950 hover:border-zinc-400'
        : 'text-slate-900 border-slate-300 bg-white hover:border-slate-500'
  }`;
}

interface ProofCaseFooterProps {
  activeTrialId: string;
  isDarkMode: boolean;
}

export function ProofCaseFooter({ activeTrialId, isDarkMode }: ProofCaseFooterProps) {
  const router = useRouter();

  return (
    <footer
      className={`relative z-[110] mt-4 sm:mt-8 flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 px-1 sm:px-2 py-4 sm:py-6 border-t ${
        isDarkMode ? 'border-zinc-800' : 'border-slate-200'
      }`}
    >
      {TRIAL_RECEIPT_NAV.map(({ id, label }) => {
        const active = activeTrialId === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => {
              router.push(`/ledger/${id}/`);
            }}
            className={pillClasses(active, isDarkMode)}
          >
            {label}
          </button>
        );
      })}

      <span
        className={`hidden sm:inline-block w-px h-7 mx-0.5 shrink-0 ${isDarkMode ? 'bg-zinc-700' : 'bg-slate-300'}`}
        aria-hidden
      />

      {SITE_NAV.map(({ label, href, external }) =>
        external ? (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={pillClasses(false, isDarkMode)}
          >
            {label}
          </a>
        ) : (
          <Link key={label} href={href} className={pillClasses(false, isDarkMode)}>
            {label}
          </Link>
        ),
      )}
    </footer>
  );
}
