'use client';

import { usePersona, PERSONA_LABELS, type Persona } from '@/context/PersonaContext';
import { getHeroForPersona } from '@/data/persona-hero-content';

interface Props {
  pageId: string;
  className?: string;
}

const PERSONA_TINT: Record<Persona, string> = {
  oncologist: 'border-cyan-400/60 bg-cyan-500/[0.07] text-cyan-100',
  patient: 'border-emerald-400/60 bg-emerald-500/[0.07] text-emerald-100',
  pharma: 'border-amber-400/60 bg-amber-500/[0.07] text-amber-100',
};

export default function PersonaHero({ pageId, className = '' }: Props) {
  const { persona, isHydrated } = usePersona();
  const hero = getHeroForPersona(pageId, persona);
  if (!hero) return null;
  const active = hero.active;

  return (
    <section className={`border-b border-white/10 pb-6 ${className}`}>
      <div className="text-[10px] uppercase tracking-[0.24em] text-cyan-300">{hero.eyebrow}</div>
      <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-white">{hero.headline}</h1>
      <p className="mt-2 max-w-3xl text-sm text-white/60">{hero.subhead}</p>

      <div className={`mt-5 rounded border p-4 text-sm ${PERSONA_TINT[persona]}`}>
        <div className="text-[10px] uppercase tracking-widest mb-1 opacity-70">
          Viewing as {PERSONA_LABELS[persona]}{isHydrated ? '' : ' (default)'}
        </div>
        <div className="font-medium">{active.lead}</div>
        <div className="mt-1 opacity-80">{active.detail}</div>
      </div>
    </section>
  );
}
