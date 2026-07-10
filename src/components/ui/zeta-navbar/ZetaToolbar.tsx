'use client';

import { Menu, X, Type, Loader2, User2, HeartPulse, Building2 } from 'lucide-react';
import { usePersona, PERSONA_LABELS, type Persona } from '@/context/PersonaContext';

interface Props {
  isDarkMode: boolean;
  mobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  isLargeText: boolean;
  toggleLargeText: () => void;
  isProcessing: boolean;
  onCtaClick: () => void;
}

const ICON: Record<Persona, typeof User2> = {
  oncologist: User2,
  patient: HeartPulse,
  pharma: Building2,
};

function PersonaPill({ p, active, isDarkMode, onClick }: { p: Persona; active: boolean; isDarkMode: boolean; onClick: () => void }) {
  const Icon = ICON[p];
  return (
    <button
      type="button"
      onClick={onClick}
      title={`View as ${PERSONA_LABELS[p]}`}
      className={
        `inline-flex items-center gap-1.5 px-2 py-1 text-[10px] uppercase tracking-widest transition-colors ` +
        (active
          ? (isDarkMode ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-400/50' : 'bg-cyan-100 text-cyan-800 border border-cyan-400')
          : (isDarkMode ? 'text-white/50 hover:text-white/80 border border-transparent' : 'text-zinc-500 hover:text-zinc-800 border border-transparent'))
      }
    >
      <Icon className="h-3 w-3" aria-hidden />
      <span className="hidden md:inline">{PERSONA_LABELS[p]}</span>
    </button>
  );
}

export function ZetaToolbar({
  isDarkMode,
  mobileMenuOpen,
  toggleMobileMenu,
  isLargeText,
  toggleLargeText,
  isProcessing,
  onCtaClick,
}: Props) {
  const { persona, setPersona } = usePersona();

  return (
    <div className="flex items-center gap-2">
      {/* Persona switcher */}
      <div
        role="group"
        aria-label="Persona view"
        className={`hidden sm:inline-flex items-center gap-1 rounded border px-1 py-0.5 ${isDarkMode ? 'border-white/10 bg-white/[0.03]' : 'border-black/10 bg-black/[0.02]'}`}
      >
        <PersonaPill p="oncologist" active={persona === 'oncologist'} isDarkMode={isDarkMode} onClick={() => setPersona('oncologist')} />
        <PersonaPill p="patient"    active={persona === 'patient'}    isDarkMode={isDarkMode} onClick={() => setPersona('patient')} />
        <PersonaPill p="pharma"     active={persona === 'pharma'}     isDarkMode={isDarkMode} onClick={() => setPersona('pharma')} />
      </div>

      <button
        type="button"
        onClick={toggleLargeText}
        title={isLargeText ? 'Standard text' : 'Larger text'}
        className={`hidden md:inline-flex items-center rounded p-1.5 text-xs transition-colors ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'}`}
      >
        <Type className="h-4 w-4" aria-hidden />
      </button>

      {isProcessing && (
        <Loader2 className={`h-4 w-4 animate-spin ${isDarkMode ? 'text-cyan-300' : 'text-cyan-600'}`} aria-hidden />
      )}

      <button
        type="button"
        onClick={onCtaClick}
        className={`hidden md:inline-flex items-center rounded border px-3 py-1.5 text-[11px] uppercase tracking-widest ${isDarkMode ? 'border-cyan-400/40 bg-cyan-500/10 text-cyan-200 hover:bg-cyan-500/20' : 'border-cyan-400 bg-cyan-50 text-cyan-800 hover:bg-cyan-100'}`}
      >
        Contact
      </button>

      <button
        type="button"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        className={`lg:hidden inline-flex items-center rounded p-1.5 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  );
}
