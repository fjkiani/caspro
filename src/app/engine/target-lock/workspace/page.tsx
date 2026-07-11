import type { Metadata } from 'next';
import BrmPipelineWorkspace from '@/components/engine/BrmPipelineWorkspace';

/**
 * /engine/target-lock/workspace/
 *
 * Audited 7-step brain-metastasis pipeline surface, sourced from
 *   src/data/evo2/brm_pipeline_20260328T070235Z.json
 * via typed accessors in src/data/evo2/brm_pipeline.ts.
 *
 * The prior AF3 8-step teaching visual (`TargetLockCascadeView` on
 * `METASTATIC_CASCADE_STEPS`) is preserved at
 *   /engine/target-lock/workspace-af3/
 * so nothing is lost — that page continues to render the older structural
 * cohort visual. The evidence surface that the /tabs, /scroll, and
 * /tumor-board/BM01 anchor panel all consume is this workspace.
 */
export const metadata: Metadata = {
  title: 'Target Lock Workspace · Evo2 Pipeline | CrisPRO Engine',
  description:
    'Audited 7-step brain-metastasis target-lock ranking from the evo2-e2e pipeline. Per-step AUROC, per-gene target-lock scores, BM01 patient-variant overlay.',
};

export default function TargetLockWorkspacePage() {
  return <BrmPipelineWorkspace />;
}
