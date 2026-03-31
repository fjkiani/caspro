'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { getEngineBySlug } from '@/data/engine-registry';
import TargetIdentificationEngine from '@/components/mockups/targetLock';
import SyntheticLethalityEngine from '@/components/mockups/SyntheticLethalityEngine';
import SafetyDosingEngine from '@/components/mockups/dosing';
import EvidenceLedgerEngine from '@/components/mockups/evidenceMatrix';
import KillChainIntercept from '@/components/sections/mars/KillChainIntercept';
import { RiskBenefitGate } from '@/components/sections/mars/RiskBenefitGate';
import { IoRiskBenefitChart } from '@/components/sections/mars/IoRiskBenefitChart';
import { VectorFailureAnalysis } from '@/components/sections/mars/VectorFailureAnalysis';

/** Same IO layout as `EngineStack` engine `04` (RiskBenefitGate + chart). */
function IoGateEngineRoute() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanPos, setScanPos] = useState(0);
  const handleScan = useCallback(() => {
    if (isScanning) return;
    setIsScanning(true);
    let start: number | null = null;
    const duration = 2500;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const val = Math.min(progress / duration, 1);
      setScanPos(val);
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setIsScanning(false);
          setScanPos(0);
        }, 500);
      }
    };
    requestAnimationFrame(step);
  }, [isScanning]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="flex-1 overflow-hidden p-4 md:p-6 min-h-0">
        <RiskBenefitGate />
      </div>
      <div className="h-[200px] shrink-0 border-t border-[var(--border)] overflow-hidden bg-[var(--card)]">
        <IoRiskBenefitChart isScanning={isScanning} scanPos={scanPos} onInitiateScan={handleScan} />
      </div>
    </div>
  );
}

export default function EngineSlugClient({ slug }: { slug: string }) {
  const { isDarkMode } = useTheme();
  const engine = getEngineBySlug(slug);

  if (!engine) {
    return (
      <main className="min-h-screen bg-[#0A0A0F] text-white pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-black mb-2">Engine Not Found</h1>
          <p className="text-zinc-400 mb-6">
            The route <code className="text-cyan-400">/engine/{slug || '…'}/</code> does not map to an engine.
          </p>
          <Link
            href="/engine/"
            className="inline-flex px-5 py-3 rounded border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-black transition-colors"
          >
            Open Engine Index
          </Link>
        </div>
      </main>
    );
  }

  const renderEngine = () => {
    switch (engine.slug) {
      case 'target-lock':
        return <TargetIdentificationEngine />;
      case 'mechanism-alignment':
        return (
          <div className="p-4 md:p-6 min-h-[calc(100vh-3.5rem)]">
            <VectorFailureAnalysis />
          </div>
        );
      case 'kill-chain':
        return (
          <div className="p-4 md:p-6 min-h-[calc(100vh-3.5rem)] overflow-auto">
            <KillChainIntercept />
          </div>
        );
      case 'io-risk-benefit':
        return <IoGateEngineRoute />;
      case 'synthetic-lethality':
        return (
          <div className="p-4 md:p-6 min-h-[calc(100vh-3.5rem)] overflow-auto">
            <SyntheticLethalityEngine />
          </div>
        );
      case 'safety-dosing':
        return (
          <div className="p-4 md:p-6 min-h-[calc(100vh-3.5rem)] overflow-auto">
            <SafetyDosingEngine />
          </div>
        );
      case 'evidence-matrix':
        return (
          <div className="p-4 md:p-6 min-h-[calc(100vh-3.5rem)] overflow-auto">
            <EvidenceLedgerEngine />
          </div>
        );
      default:
        return (
          <div className="p-4 md:p-6 text-center text-zinc-500">
            Engine <span className="text-cyan-400">{engine.slug}</span> has no full-page view yet.
          </div>
        );
    }
  };

  return (
    <main className={`min-h-screen ${isDarkMode ? 'bg-[#020408]' : 'bg-slate-50'}`}>
      {renderEngine()}
    </main>
  );
}
