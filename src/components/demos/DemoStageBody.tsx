'use client';

/**
 * DemoStageBody — the active-tab body panel.
 *
 * Renders:
 *   Header row (stage number + name + evidence-grade badge + status pill)
 *   plain_language paragraph (from spec, verbatim)
 *   Dispatch to the correct renderer keyed by data_shown.type
 *
 * Every renderer sits in ./renderers/ and consumes the narrow type from
 * @/data/demos/types. If a renderer is missing, we fail loud so nothing
 * ships silently blank.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import GovernanceStatusPill from './GovernanceStatusPill';
import { UI_LABELS, EVIDENCE_GRADE_LABELS } from './labels';
import type { DemoStage } from '@/data/demos/types';

// Renderers
import PatientProfileTable from './renderers/PatientProfileTable';
import BiomarkerCardGrid from './renderers/BiomarkerCardGrid';
import TrialMatchCards from './renderers/TrialMatchCards';
import TherapyFitCategories from './renderers/TherapyFitCategories';
import ResistanceForecastPatientCard from './renderers/ResistanceForecastPatientCard';
import ResistanceForecastTumorBoardList from './renderers/ResistanceForecastTumorBoardList';
import CarePlanSections from './renderers/CarePlanSections';
import StatCalloutGrid from './renderers/StatCalloutGrid';
import MechanismProfileCard from './renderers/MechanismProfileCard';
import RankingOverviewTable from './renderers/RankingOverviewTable';
import SubgroupComparisonTable from './renderers/SubgroupComparisonTable';
import AxisContributionExplainer from './renderers/AxisContributionExplainer';
import TrialDecodeSummaryPanel from './renderers/TrialDecodeSummaryPanel';
import StrategicRecommendationList from './renderers/StrategicRecommendationList';
import CaseOverviewCard from './renderers/CaseOverviewCard';
import DataReadinessCard from './renderers/DataReadinessCard';
import DrugRankingTiers from './renderers/DrugRankingTiers';
import SyntheticLethalityCard from './renderers/SyntheticLethalityCard';
import EvidenceVaultCard from './renderers/EvidenceVaultCard';
import StrategicPrioritiesList from './renderers/StrategicPrioritiesList';

function renderData(data: DemoStage['data_shown']) {
  switch (data.type) {
    case 'patient_profile_summary':  return <PatientProfileTable data={data} />;
    case 'biomarker_intelligence':   return <BiomarkerCardGrid data={data} />;
    case 'trial_matching':           return <TrialMatchCards data={data} />;
    case 'therapy_fit':              return <TherapyFitCategories data={data} />;
    case 'resistance_forecast':      return 'forecasts' in data
      ? <ResistanceForecastTumorBoardList data={data} />
      : <ResistanceForecastPatientCard data={data} />;
    case 'care_plan_summary':        return <CarePlanSections data={data} />;
    case 'stat_callout':             return <StatCalloutGrid data={data} />;
    case 'mechanism_profile':        return <MechanismProfileCard data={data} />;
    case 'ranking_overview':         return <RankingOverviewTable data={data} />;
    case 'subgroup_comparison':      return <SubgroupComparisonTable data={data} />;
    case 'axis_contribution':        return <AxisContributionExplainer data={data} />;
    case 'trial_decode_summary':     return <TrialDecodeSummaryPanel data={data} />;
    case 'strategic_recommendation': return <StrategicRecommendationList data={data} />;
    case 'case_overview':            return <CaseOverviewCard data={data} />;
    case 'data_readiness':           return <DataReadinessCard data={data} />;
    case 'drug_ranking':             return <DrugRankingTiers data={data} />;
    case 'synthetic_lethality':      return <SyntheticLethalityCard data={data} />;
    case 'evidence_vault':           return <EvidenceVaultCard data={data} />;
    case 'strategic_priorities':     return <StrategicPrioritiesList data={data} />;
    default: {
      // Exhaustive check — the switch above covers every DemoStageData
      // union member. If TS doesn't complain here, a new type has been added
      // without a matching renderer. Never ship an unrendered stage.
      const _exhaustive: never = data;
      throw new Error(
        `DemoStageBody: no renderer for data_shown.type=${(_exhaustive as { type?: string }).type}`,
      );
    }
  }
}

export default function DemoStageBody({ stage }: { stage: DemoStage }) {
  const { isDarkMode } = useTheme();

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={stage.stage_id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18 }}
        className="mx-auto max-w-[1600px] px-6 py-8"
      >
        {/* Stage header */}
        <div className="mb-6">
          <div className="flex flex-wrap items-baseline gap-3">
            <span
              className={`font-mono text-[10px] ${
                isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
              }`}
            >
              {String(stage.stage_id).padStart(2, '0')}
            </span>
            <h2
              className={`text-2xl font-black uppercase tracking-[0.12em] ${
                isDarkMode ? 'text-white' : 'text-zinc-900'
              }`}
            >
              {stage.name}
            </h2>
            <GovernanceStatusPill status={stage.status} />
            <span
              className={`inline-flex items-center rounded border px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                isDarkMode
                  ? 'border-cyan-500/40 bg-cyan-950/30 text-cyan-300'
                  : 'border-indigo-500/40 bg-indigo-50 text-indigo-700'
              }`}
            >
              {EVIDENCE_GRADE_LABELS[stage.evidence_grade]}
            </span>
          </div>
          <p
            className={`mt-4 max-w-4xl text-[13px] leading-relaxed ${
              isDarkMode ? 'text-zinc-300' : 'text-zinc-700'
            }`}
          >
            {stage.plain_language}
          </p>
        </div>

        {/* Data-shown block */}
        <div className="mb-3">
          <p
            className={`mb-3 text-[10px] font-black uppercase tracking-[0.3em] ${
              isDarkMode ? 'text-cyan-400' : 'text-indigo-600'
            }`}
          >
            {UI_LABELS.data_shown_heading}
          </p>
          {renderData(stage.data_shown)}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
