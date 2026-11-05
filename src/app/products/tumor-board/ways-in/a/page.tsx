import { redirect } from 'next/navigation';

/** Door A → NSCLC CT board walk. */
export default function TumorBoardWaysInAPage() {
  redirect('/tumor-board/nsclc/');
}
