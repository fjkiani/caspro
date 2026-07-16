'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, X, ArrowRight, MessageSquare } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { unlockAllTrialGates, unlockTrialGateFromUrl } from '@/data/trial-gate';

/**
 * @deprecated For ledger contexts use `/ledger/[trialSlug]/unlock/` instead.
 * This modal is retained for non-ledger callers (HeroSlider, GatedEvidencePanel,
 * ZetaNavbar) that still gate on a passcode inline. The modal is a
 * `document.body.style.overflow = 'hidden'` trap on mobile — new call sites
 * should always prefer the route-based unlock.
 */
export interface PasscodeModalProps {
  open: boolean;
  onClose: () => void;
  /** Destination after correct code, e.g. '/ledger/ceacam5/' */
  proofUrl: string;
  /** Display label shown in the modal header, e.g. 'CEACAM5' */
  targetLabel: string;
}

export function PasscodeModal({ open, onClose, proofUrl, targetLabel }: PasscodeModalProps) {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Invalid code.');
  const [shaking, setShaking] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setCode('');
      setError(false);
      setErrorMessage('Invalid code.');
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const handleSubmit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/trial-gate/unlock/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      });

      if (res.ok) {
        unlockAllTrialGates();
        unlockTrialGateFromUrl(proofUrl);
        onClose();
        router.push(proofUrl);
        return;
      }

      const payload = (await res.json().catch(() => null)) as { error?: string } | null;
      setErrorMessage(
        payload?.error === 'gate_unconfigured'
          ? 'Access gate is not configured on this server.'
          : 'Invalid code.',
      );
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    } catch {
      setErrorMessage('Could not reach the unlock service. Try again.');
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    } finally {
      setSubmitting(false);
    }
  }, [code, proofUrl, router, onClose, submitting]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit();
    if (error) setError(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Access gate for ${targetLabel}`}
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative z-10 w-full max-w-sm rounded-xl border shadow-2xl font-mono transition-all duration-200 ${
          shaking ? 'animate-[shake_0.4s_ease-in-out]' : ''
        } ${
          isDarkMode
            ? 'bg-zinc-950 border-zinc-800 text-zinc-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
        style={shaking ? { animation: 'shake 0.4s ease-in-out' } : undefined}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className={`absolute top-3 right-3 p-1.5 rounded-md transition-colors ${
            isDarkMode ? 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
          }`}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 pt-5">
          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className={`p-2.5 rounded-lg ${isDarkMode ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-indigo-50 border border-indigo-200'}`}>
              <Lock className={`w-5 h-5 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`} />
            </div>
            <div>
              <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                RESTRICTED ACCESS
              </p>
              <h2 className={`text-sm font-black uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {targetLabel} · DE-RISKING MAP
              </h2>
            </div>
          </div>

          <p className={`text-[11px] mb-5 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
            Enter your access code to view the full de-risking map and trial evidence.
          </p>

          {/* Input */}
          <div className="space-y-3">
            <input
              ref={inputRef}
              type="password"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError(false); }}
              onKeyDown={handleKeyDown}
              placeholder="Access code"
              autoComplete="off"
              className={`w-full px-4 py-3 rounded-lg border text-sm font-mono tracking-widest transition-colors outline-none ${
                error
                  ? isDarkMode
                    ? 'border-red-500/60 bg-red-500/5 text-red-300 placeholder-red-500/40'
                    : 'border-red-400 bg-red-50 text-red-700 placeholder-red-300'
                  : isDarkMode
                    ? 'border-zinc-700 bg-zinc-900 text-zinc-100 placeholder-zinc-600 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20'
                    : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200'
              }`}
            />

            {error && (
              <p className={`text-[11px] font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                {errorMessage}
              </p>
            )}

            {/* Unlock button */}
            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={submitting}
              className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-[11px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
                isDarkMode
                  ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-black hover:border-cyan-500'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-700'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              {submitting ? 'VERIFYING…' : 'UNLOCK'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Divider */}
          <div className={`my-5 border-t ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`} />

          {/* Get in touch fallback */}
          <div className="text-center">
            <p className={`text-[10px] mb-3 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
              Don&apos;t have an access code?
            </p>
            <a
              href="/contact/"
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all border ${
                isDarkMode
                  ? 'border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white hover:bg-zinc-900'
                  : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Shake keyframe injected inline for portability */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-6px); }
          30% { transform: translateX(6px); }
          45% { transform: translateX(-4px); }
          60% { transform: translateX(4px); }
          75% { transform: translateX(-2px); }
          90% { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
}
