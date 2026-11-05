import { ZetaNavbar } from '@/components/ui/ZetaNavbar';

/** Same chrome as /tumor-board/ — one fixed nav, content below. */
export default function TumorBoardProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ZetaNavbar />
      <div className="pt-14">{children}</div>
    </>
  );
}
