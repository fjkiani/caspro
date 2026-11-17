/**
 * Backward-compatible bilinear decoder loader: v1 (8×15) always; v2 (8×24) when file is vendored.
 * RUO — does not change MOAT proxy behavior for /api/live/ranker-8d.
 */
import v1 from '@/data/brenus/crispro_8d_bilinear_decoder_v1.json';

export type BilinearDecoderContract = {
  model_id: string;
  model_version: 'v1' | 'v2';
  moa_width: number;
  signed_axes_8d: string[];
  moa_classes: string[];
  W_MoA_matrix: number[][];
  source_path: string;
};

function classesFromRaw(data: Record<string, unknown>): string[] {
  const direct =
    (data.moa_classes_24 as string[] | undefined) ??
    (data.moa_classes_15 as string[] | undefined) ??
    (data.moa_classes as string[] | undefined);
  if (!direct || direct.length === 0) {
    throw new Error('bilinear contract missing moa_classes_15 / moa_classes_24');
  }
  return direct.map(String);
}

function matrixFromRaw(
  data: Record<string, unknown>,
  width: number,
): number[][] {
  const raw =
    (data.W_MoA_matrix as number[][] | undefined) ??
    (data.W_MoA_matrix_8x24 as number[][] | undefined) ??
    (data.W_MoA_matrix_8x15 as number[][] | undefined);
  if (!raw) {
    throw new Error('bilinear contract missing W_MoA_matrix');
  }
  if (raw.length !== 8 || raw[0]?.length !== width) {
    throw new Error(
      `W_MoA_matrix shape invalid: rows=${raw.length}, cols=${raw[0]?.length}, expected (8, ${width})`,
    );
  }
  return raw;
}

function normalize(
  data: Record<string, unknown>,
  sourcePath: string,
): BilinearDecoderContract {
  const classes = classesFromRaw(data);
  const width =
    (typeof data.moa_width === 'number' ? data.moa_width : undefined) ??
    classes.length;
  if (width !== 15 && width !== 24) {
    throw new Error(`unsupported moa_width ${width}; expected 15 or 24`);
  }
  const axes = (data.signed_axes_8d ?? data.latent_axes_8d) as
    | string[]
    | undefined;
  if (!axes || axes.length !== 8) {
    throw new Error('signed_axes_8d must have length 8');
  }
  const modelId = String(data.model_id ?? 'crispro_8d_bilinear_decoder_v1');
  const modelVersion: 'v1' | 'v2' = width === 24 ? 'v2' : 'v1';
  return {
    model_id: modelId,
    model_version: modelVersion,
    moa_width: width,
    signed_axes_8d: axes,
    moa_classes: classes,
    W_MoA_matrix: matrixFromRaw(data, width),
    source_path: sourcePath,
  };
}

/** Prefer vendored v2 JSON when present (build-time optional import). */
export function loadBilinearDecoderContract(
  preferV2 = true,
): BilinearDecoderContract {
  if (preferV2) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const v2 = require('@/data/brenus/crispro_8d_bilinear_decoder_v2.json') as Record<
        string,
        unknown
      >;
      return normalize(
        v2,
        'src/data/brenus/crispro_8d_bilinear_decoder_v2.json',
      );
    } catch {
      /* v2 not vendored yet */
    }
  }
  return normalize(
    v1 as unknown as Record<string, unknown>,
    'src/data/brenus/crispro_8d_bilinear_decoder_v1.json',
  );
}

export function defaultBilinearDecoderV1(): BilinearDecoderContract {
  return loadBilinearDecoderContract(false);
}