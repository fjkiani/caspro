import type { Metadata } from 'next';
import TargetLockWorkspace from '@/components/engine/TargetLockWorkspace';

export const metadata: Metadata = {
  title: 'Target Lock Workspace | CrisPRO Engine',
  description: 'Interactive metastatic cascade lock — step through targets and lock candidates.',
};

export default function TargetLockWorkspacePage() {
  return <TargetLockWorkspace />;
}
