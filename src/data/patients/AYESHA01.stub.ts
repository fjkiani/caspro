// ============================================================================
// src/data/patients/AYESHA01.stub.ts
//
// RESERVED. The `AYESHA01` id is claimed by the demo landing pages:
//   /demo/patient/       — src/data/demos/demo_patient_spec.json
//   /demo/tumor-board/   — src/data/demos/demo_tumor_board_spec.json
//
// Both specs describe the same clinical scenario (HGS ovarian, MBD4
// homozygous, PD-L1 CPS 10, MSS, post-carbo/bev). It intentionally has NO
// L1 bundle here — the demos read from src/data/demos/, not from
// PATIENT_REGISTRY.
//
// The existing `AK01` bundle under src/data/patients/AK01.ts carries the
// audit-chain / PARP-falsification arc and stays untouched.
//
// If you need a real AYESHA01 bundle later, ask the user first — the
// current demo framing recommends PARP therapy, which conflicts with the
// AK01 audit chain. Cross those wires only with explicit approval.
// ============================================================================

export const AYESHA01_RESERVED = true;
