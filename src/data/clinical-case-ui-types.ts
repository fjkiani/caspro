export type ClinicalCaseId = 'ovarian' | 'myeloma' | 'crc' | 'lung';

export type MetricTile = {
  id: string;
  value: string;
  label: string;
};

export type ClinicalCaseCard = {
  id: ClinicalCaseId;
  tabLabel: string;
  body: string;
  prioritize: string;
  block: string;
  href: string;
  evidenceTitle: string;
  evidenceLines: string[];
  /** AK Day-0 bundle gate5 — optional; ovarian only */
  prioritizeDay0?: string;
  blockDay0?: string;
  evidenceLinesDay0?: string[];
};