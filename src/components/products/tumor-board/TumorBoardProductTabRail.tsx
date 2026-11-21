'use client';

import { motion } from 'framer-motion';
import { Focus, Package, Shield, Zap, type LucideIcon } from 'lucide-react';

import { TB_PRODUCT_TABS, type TbProductTab } from '@/data/pages/tumor-board-workspace-data';
import { tbTabClass, type TbProductChrome } from './useTbProductChrome';

const ICONS: Record<TbProductTab, LucideIcon> = {
  decision: Focus,
  package: Package,
  proof: Shield,
  engage: Zap,
};

export function TumorBoardProductTabRail({
  chrome,
  tab,
  onSelectTab,
}: {
  chrome: TbProductChrome;
  tab: TbProductTab;
  onSelectTab: (t: TbProductTab) => void;
}) {
  return (
    <div className={`shrink-0 border-b ${chrome.tabBar}`}>
      <div className="mx-auto flex max-w-[1600px] overflow-x-auto px-4 scrollbar-hide sm:px-8">
        {TB_PRODUCT_TABS.map((t) => {
          const on = t.key === tab;
          const TabIcon = ICONS[t.key];
          const cls = tbTabClass(on, chrome);
          return (
            <button key={t.key} type="button" onClick={() => onSelectTab(t.key)} className={cls}>
              <TabIcon className="h-3.5 w-3.5 shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-widest">
                <span className="opacity-60">{t.n} · </span>
                {t.label}
              </span>
              {on ? (
                <motion.div
                  layoutId="tb-product-tab"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${chrome.tabIndicator}`}
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}