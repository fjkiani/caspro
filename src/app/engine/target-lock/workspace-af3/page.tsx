import type { Metadata } from 'next';
import TargetLockWorkspace from '@/components/engine/TargetLockWorkspace';

/**
 * /engine/target-lock/workspace-af3/
 *
 * ARCHIVE ROUTE. Renders the hand-authored 8-step AlphaFold-3 cascade
 * teaching visual (`METASTATIC_CASCADE_STEPS`) that used to live at
 * `/engine/target-lock/workspace/`. Kept as a structural / teaching view;
 * the audited target-lock evidence surface is now on `/workspace/`.
 */
export const metadata: Metadata = {
  title: 'Target Lock Workspace · AF3 Teaching View | CrisPRO Engine',
  description:
    'Archived AlphaFold-3 8-step cascade teaching visual. See /engine/target-lock/workspace/ for the audited evo2 pipeline surface.',
};

export default function TargetLockWorkspaceAf3Page() {
  return <TargetLockWorkspace />;
}
