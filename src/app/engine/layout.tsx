import { ZetaNavbar } from '@/components/ui/ZetaNavbar';

export default function EngineLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ZetaNavbar />
      <div className="pt-14">{children}</div>
    </>
  );
}
