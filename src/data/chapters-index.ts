// ============================================================================
// chapters-index.ts — the 9-chapter research library.
//
// Only chapters listed here are surfaced under /research/chapters/. Adding
// a new public-safe chapter requires: (1) a data file under src/data/chapters/,
// (2) an entry in CHAPTERS, (3) all forbidden-string checks passing.
// ============================================================================

import { CH_01_SL_FIRST_PRINCIPLES } from './chapters/ch01-sl-first-principles';
import { CH_02_EVIDENCE_HIERARCHY } from './chapters/ch02-evidence-hierarchy';
import { CH_03_SEVEN_MODALITIES } from './chapters/ch03-seven-modalities';
import { CH_04_MECHANISM_ALIGNMENT } from './chapters/ch04-mechanism-alignment';
import { CH_05_PATIENT_BIOLOGY_AXES } from './chapters/ch05-patient-biology-axes';
import { CH_06_TRIAL_TARGET_LIBRARY } from './chapters/ch06-trial-target-library';
import { CH_07_TARGET_LOCK } from './chapters/ch07-target-lock';
import { CH_08_THERAPY_BRIDGE } from './chapters/ch08-therapy-bridge';
import { CH_09_WHY_TRIALS_FAIL } from './chapters/ch09-why-trials-fail-on-responders';

export interface ResearchChapterSection {
  heading: string;
  body: string[]; // paragraphs (markdown-lite: **bold** allowed, no HTML)
}

export interface ResearchChapterDepthLinks {
  axes: string[];         // PATIENT_VECTOR_AXES slugs
  modalities: string[];   // EVIDENCE_MODALITIES_7 slugs
  tiers: string[];        // EVIDENCE_TIERS_4 slugs
  capabilities: string[]; // CAPABILITY_REGISTRY slugs
}

export interface ResearchChapter {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  readMinutes: number;
  publicAnchors: string[];
  sections: ResearchChapterSection[];
  keyInsight: string;
  linksIntoDepth: ResearchChapterDepthLinks;
}

export const CHAPTERS: ResearchChapter[] = [
  CH_01_SL_FIRST_PRINCIPLES,
  CH_02_EVIDENCE_HIERARCHY,
  CH_03_SEVEN_MODALITIES,
  CH_04_MECHANISM_ALIGNMENT,
  CH_05_PATIENT_BIOLOGY_AXES,
  CH_06_TRIAL_TARGET_LIBRARY,
  CH_07_TARGET_LOCK,
  CH_08_THERAPY_BRIDGE,
  CH_09_WHY_TRIALS_FAIL,
];

export const getChapter = (slug: string): ResearchChapter | undefined =>
  CHAPTERS.find((c) => c.slug === slug);

export const getAdjacentChapters = (slug: string): {
  prev?: ResearchChapter;
  next?: ResearchChapter;
} => {
  const idx = CHAPTERS.findIndex((c) => c.slug === slug);
  if (idx < 0) return {};
  return {
    prev: idx > 0 ? CHAPTERS[idx - 1] : undefined,
    next: idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : undefined,
  };
};
