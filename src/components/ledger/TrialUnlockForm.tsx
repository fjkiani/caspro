'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowRight, MessageSquare, ArrowLeft } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { unlockAllTrialGates, unlockTrialGateFromUrl } from '@/data/trial-gate';

export interface TrialUnlockFormProps {
  slug: string;
  label: string;
  /** Default destination if `?next=` search param is absent. */
  nextHref: string;
}

/**
 * Full-page passcode form for ledger receipts. Replaces PasscodeModal in
 * ledger contexts. API contract matches the modal (POST /api/trial-gate/unlock/).
 */
export default function TrialUnlockForm({ slug, label, nextHref }: TrialUnlockFormProps) {
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const destination = searchParams.get('next') ?? nextHref;

  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Invalid code.');
  const [shaking, setShaking] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

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
        unlockTrialGateFromUrl(destination);
        router.push(destination);
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
  }, [code, destination, router, submitting]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') void handleSubmit();
    if (error) setError(false);
  };

  const shell = isDarkMode
    ? 'bg-[#020408] text-zinc-100'
    : 'bg-white text-slate-900';
  const card = isDarkMode
    ? 'bg-zinc-950 border-zinc-800 text-zinc-100'
    : 'bg-white border-slate-200 text-slate-900';
  const eyebrow = isDarkMode ? 'text-zinc-500' : 'text-slate-500';
  const heading = isDarkMode ? 'text-white' : 'text-slate-900';
  const body = isDarkMode ? 'text-zinc-400' : 'text-slate-600';
  const back = isDarkMode ? 'text-zinc-500 hover:text-zinc-200' : 'text-slate-500 hover:text-slate-800';

  const iconBadge = isDarkMode
    ? 'bg-cyan-500/10 border border-cyan-500/20'
    : 'bg-indigo-50 border border-indigo-200';
  const iconColor = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';

  const inputStyle = error
    ? isDarkMode
      ? 'border-red-500/60 bg-red-500/5 text-red-300 placeholder-red-500/40'
      : 'border-red-400 bg-red-50 text-red-700 placeholder-red-300'
    : isDarkMode
      ? 'border-zinc-700 bg-zinc-900 text-zinc-100 placeholder-zinc-600 focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/20'
      : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200';

  const submitBtn = isDarkMode
    ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500 hover:text-black hover:border-cyan-500'
    : 'bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-700';

  const contactBtn = isDarkMode
    ? 'border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white hover:bg-zinc-900'
    : 'border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50';

  const divider = isDarkMode ? 'border-zinc-800' : 'border-slate-100';
  const errorText = isDarkMode ? 'text-red-400' : 'text-red-600';

  return (
    <main
      className={`min-h-screen flex flex-col items-center justify-center px-4 py-10 font-mono transition-colors ${shell}`}
      aria-label={`Access gate for ${label}`}
    >
      <div className="w-full max-w-sm">
        <Link
          href="/ledger/"
          className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-widest mb-4 transition-colors ${back}`}
        >
          <ArrowLeft className="w-3 h-3" />
          Back to ledger
        </Link>

        <div
          className={`relative rounded-xl border shadow-2xl font-mono transition-all duration-200 ${
            shaking ? 'animate-[shake_0.4s_ease-in-out]' : ''
          } ${card}`}
          style={shaking ? { animation: 'shake 0.4s ease-in-out' } : undefined}
        >
          <div className="p-6 pt-5">
            <div className="flex items-center gap-3 mb-5">
              <div className={`p-2.5 rounded-lg ${iconBadge}`}>
                <Lock className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div>
                <p className={`text-[9px] font-black uppercase tracking-[0.4em] ${eyebrow}`}>
                  RESTRICTED ACCESS
                </p>
                <h2 className={`text-sm font-black uppercase tracking-widest ${heading}`}>
                  {label} · DE-RISKING MAP
                </h2>
              </div>
            </div>

            <p className={`text-[11px] mb-5 leading-relaxed ${body}`}>
              Enter your access code to view the full de-risking map and trial evidence for {label}.
            </p>

            <div className="space-y-3">
              <input
                ref={inputRef}
                type="password"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError(false);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Access code"
                autoComplete="off"
                aria-label={`Access code for ${label}`}
                className={`w-full px-4 py-3 rounded-lg border text-sm font-mono tracking-widest transition-colors outline-none ${inputStyle}`}
              />

              {error && (
                <p className={`text-[11px] font-bold ${errorText}`}>{errorMessage}</p>
              )}

              <button
                type="button"
                onClick={() => void handleSubmit()}
                disabled={submitting}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-[11px] font-black uppercase tracking-[0.2em] transition-all disabled:opacity-60 disabled:cursor-not-allowed ${submitBtn}`}
              >
                <Lock className="w-3.5 h-3.5" />
                {submitting ? 'VERIFYING…' : 'UNLOCK'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className={`my-5 border-t ${divider}`} />

            <div className="text-center">
              <p className={`text-[10px] mb-3 ${eyebrow}`}>Don&apos;t have an access code?</p>
              <a
                href="/contact/"
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-[11px] font-black uppercase tracking-widest transition-all border ${contactBtn}`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Get in Touch
              </a>
            </div>
          </div>
        </div>

        <p className={`mt-4 text-center text-[9px] uppercase tracking-widest ${eyebrow}`}>
          slug: <span className="font-mono">{slug}</span>
        </p>
      </div>

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
    </main>
  );
}
