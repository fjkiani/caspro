import { ZetaNavbar } from '@/components/ui/ZetaNavbar';
import ManuscriptDetailChrome from './ManuscriptDetailChrome';

/** Fixed Zeta nav + research breadcrumbs on detail pages. */
export default function ManuscriptsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ZetaNavbar />
      <div className="pt-14 min-h-[100dvh] flex flex-col w-full min-w-0 bg-background text-foreground">
        <ManuscriptDetailChrome />
        <div className="flex-1 min-h-0 w-full">{children}</div>
      </div>
    </>
  );
}
