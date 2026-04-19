import { getEnginesForNav, type EngineEntry } from '@/data/engine-registry';

/** Product menu: fixed IA order (navbar labels differ from registry `shortLabel` where noted). */
const PRODUCT_SLUG_ORDER = ['target-lock', 'mechanism-alignment', 'synthetic-lethality', 'safety-dosing'] as const;

export function getProductEngines(): EngineEntry[] {
  const nav = getEnginesForNav();
  return PRODUCT_SLUG_ORDER.map((slug) => nav.find((e) => e.slug === slug)).filter((e): e is EngineEntry => e != null);
}

export function productMenuTitle(engine: EngineEntry): string {
  switch (engine.slug) {
    case 'target-lock':
      return 'TARGET LOCK';
    case 'mechanism-alignment':
      return 'MOA ALIGN';
    case 'synthetic-lethality':
      return 'SL ENGINE';
    case 'safety-dosing':
      return 'PGX';
    default:
      return (engine.shortLabel || engine.label).toUpperCase();
  }
}
