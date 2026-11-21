'use client';

/**
 * Flagship /products/tumor-board/ — Cases · Treatment · Proof · Live runner.
 */

import { useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import { Focus, Package, Shield, Zap } from 'lucide-react';

import { TB_PRODUCT_TABS, type TbProductTab } from '@/data/pages/tumor-board-workspace-data';
import type { ClinicalCaseId } from '@/data/clinical-case-ui';
import { ClinicalCaseSwitcher } from '@/components/clinical/ClinicalCaseSwitcher';

import { useTbProductChrome } from './useTbProductChrome';
import { TumorBoardProductHeader } from './TumorBoardProductHeader';
import { TumorBoardProductFooter } from './TumorBoardProductFooter';
import { TumorBoardProductTabRail } from './TumorBoardProductTabRail';
import { TumorBoardProductAside } from './TumorBoardProductAside';
import { TreatmentDecisionPanel } from './TreatmentDecisionPanel';
import { ClinicalProofPanel } from './ClinicalProofPanel';
import { LiveRunnerPanel } from './LiveRunnerPanel';

const ICONS: Record<TbProductTab, LucideIcon> = {
  decision: Focus,
  package: Package,
  proof: Shield,
  engage: Zap,
};

export default function TumorBoardProductWorkspace() {
  const chrome = useTbProductChrome();
  const [tab, setTab] = useState<TbProductTab>('decision');
  const [activeCase, setActiveCase] = useState<ClinicalCaseId>('ovarian');
  const meta = TB_PRODUCT_TABS.find((t) => t.key === tab) ?? TB_PRODUCT_TABS[0];
  const Icon = ICONS[tab];

  return (
    <div className={`flex h-[calc(100dvh-3.5rem)] flex-col overflow-hidden font-mono ${chrome.bg}`}>
      <TumorBoardProductHeader chrome={chrome} />
      <TumorBoardProductTabRail chrome={chrome} tab={tab} onSelectTab={setTab} />

      <main className="mx-auto flex min-h-0 w-full max-w-[1600px] flex-1 flex-col overflow-hidden px-4 py-3 sm:px-8">
        <div
          key={tab}
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-5"
        >
          <section className="flex min-h-0 min-w-0 flex-col overflow-y-auto">
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <Icon className={`h-4 w-4 ${chrome.accent}`} />
              <p className={`text-[10px] font-black uppercase tracking-[0.3em] ${chrome.accent}`}>
                {meta.n} · {meta.label}
              </p>
            </div>
            <h2 className={`mt-1 shrink-0 text-lg font-black tracking-tight sm:text-xl ${chrome.main}`}>
              {meta.headline}
            </h2>
            <p className={`mt-1.5 shrink-0 text-[13px] leading-snug ${chrome.body}`}>
              {meta.value}
            </p>

            <div className="mt-3 flex min-h-0 flex-1 flex-col gap-3">
              {tab === 'decision' ? (
                <ClinicalCaseSwitcher
                  defaultCase={activeCase}
                  showTiles
                  variant="cases"
                  activeCase={activeCase}
                  onCaseChange={setActiveCase}
                />
              ) : tab === 'package' ? (
                <TreatmentDecisionPanel activeCase={activeCase} onCaseChange={setActiveCase} />
              ) : tab === 'proof' ? (
                <ClinicalProofPanel activeCase={activeCase} onCaseChange={setActiveCase} />
              ) : (
                <LiveRunnerPanel caseId={activeCase} />
              )}
            </div>
          </section>

          <TumorBoardProductAside chrome={chrome} tab={tab} />
        </div>
      </main>

      <TumorBoardProductFooter chrome={chrome} footerLabel={`Tumor Board · ${meta.label}`} />
    </div>
  );
}