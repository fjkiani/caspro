import { ZetaNavbar } from '@/components/ui/ZetaNavbar';

/** Same chrome as blog: fixed Zeta nav + offset so manuscript list/detail align with Hygraph-driven IA. */
export default function ManuscriptsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ZetaNavbar />
      <div className="pt-14 min-h-[100dvh] flex flex-col w-full min-w-0 bg-background text-foreground">
        <div className="flex-1 min-h-0 w-full">{children}</div>
      </div>
    </>
  );
}
