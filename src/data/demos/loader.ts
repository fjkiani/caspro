// ============================================================================
// src/data/demos/loader.ts
//
// Three typed loaders. Each imports the vendored JSON spec verbatim and casts
// to the narrow type from types.ts. Zero transformation — the JSON is the
// source of truth, the loader is just the type gate.
//
// Byte-identical vendoring is enforced by scripts/demos/freeze-manifest.mjs
// against manifest.frozen.json. Any drift blocks the build.
// ============================================================================

import demoIndexJson from './demo_index.json';
import patientSpecJson from './demo_patient_spec.json';
import pharmaSpecJson from './demo_pharma_spec.json';
import tumorBoardSpecJson from './demo_tumor_board_spec.json';

import type {
  DemoIndex,
  PatientDemoSpec,
  PharmaDemoSpec,
  TumorBoardDemoSpec,
} from './types';

export function loadDemoIndex(): DemoIndex {
  return demoIndexJson as unknown as DemoIndex;
}

export function loadPatientDemo(): PatientDemoSpec {
  return patientSpecJson as unknown as PatientDemoSpec;
}

export function loadPharmaDemo(): PharmaDemoSpec {
  return pharmaSpecJson as unknown as PharmaDemoSpec;
}

export function loadTumorBoardDemo(): TumorBoardDemoSpec {
  return tumorBoardSpecJson as unknown as TumorBoardDemoSpec;
}
