'use client';

/**
 * LATIFY hero / ledger preview — sealed de-risk receipt (no public 8D radar).
 */

import VectorMapPreviewGated from './VectorMapPreviewGated';

const MoaRadarPreviewGated = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <VectorMapPreviewGated trialId="latify" targetLabel="LATIFY" isDarkMode={isDarkMode} />
);

export default MoaRadarPreviewGated;
