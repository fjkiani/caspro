/**
 * gated-values.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Shared helpers for the vague-safe canon (2026-07-07): a case file with a
 * gated `cosineResponder` / `cosineITT` uses the sentinel value `-1` and MUST
 * NOT surface that number as `"-1.0000"`. Consumers should call
 * `isCosineGated(trial.cosineResponder)` to branch between numeric surfaces
 * and the `<MoaGlyphStrip />` ranked-glyph fallback.
 *
 * Tone → tailwind class mapping is centralised here so `mockups/latify.tsx`,
 * `VectorFailureAnalysis.tsx`, and `GateStatusPanel.tsx` render the same
 * chip / border / text color for a given publishedReadout or verdict tone.
 */

export const GATED_SENTINEL = -1;

export function isCosineGated(value: number): boolean {
  return !Number.isFinite(value) || value <= GATED_SENTINEL;
}

export type ToneKey = 'negative' | 'positive' | 'mixed' | 'gated';

export interface ToneClasses {
  text: string;
  bg: string;
  border: string;
  chipBg: string;
  chipText: string;
}

export function toneClasses(tone: ToneKey): ToneClasses {
  switch (tone) {
    case 'positive':
      return {
        text: 'text-emerald-500',
        bg: 'bg-emerald-500/5',
        border: 'border-emerald-500/20',
        chipBg: 'bg-emerald-500/5 border border-emerald-500/20',
        chipText: 'text-emerald-500',
      };
    case 'mixed':
      return {
        text: 'text-amber-400',
        bg: 'bg-amber-500/5',
        border: 'border-amber-500/20',
        chipBg: 'bg-amber-500/5 border border-amber-500/20',
        chipText: 'text-amber-400',
      };
    case 'gated':
      return {
        text: 'text-violet-400',
        bg: 'bg-violet-500/5',
        border: 'border-violet-500/20',
        chipBg: 'bg-violet-500/5 border border-violet-500/20',
        chipText: 'text-violet-400',
      };
    case 'negative':
    default:
      return {
        text: 'text-rose-500',
        bg: 'bg-rose-500/5',
        border: 'border-rose-500/20',
        chipBg: 'bg-rose-500/5 border border-rose-500/20',
        chipText: 'text-rose-500',
      };
  }
}
