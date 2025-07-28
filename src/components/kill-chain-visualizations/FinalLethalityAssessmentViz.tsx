'use client';

import React from 'react';
import { DashboardLayout, ScientificNotation, RiskHeatmap } from '@/components/visualization';
import { offTargetSafetyData } from '@/data/kill-chain-off-target-data';

const FinalLethalityAssessmentViz = () => {
    const assassinScore = 0.95; // Composite score

    const dashboardPanels = [
        {
          id: 'assassin-score',
          title: 'Composite "Assassin Score"',
          content: (
            <div className="text-center p-4">
                <div className="text-6xl font-bold text-green-400">
                    <ScientificNotation value={assassinScore} />
                </div>
                <p className="text-sm text-slate-500 mt-1">Overall Lethality & Safety Profile</p>
            </div>
          ),
          width: 'half' as const,
          height: 'small' as const,
        },
        {
            id: 'on-target-efficacy',
            title: 'On-Target Efficacy (Zeta Score)',
            content: (
              <div className="text-center p-4">
                  <div className="text-6xl font-bold text-teal-400">
                      <ScientificNotation value={0.98} />
                  </div>
                  <p className="text-sm text-slate-500 mt-1">Predicted Functional Disruption</p>
              </div>
            ),
            width: 'half' as const,
            height: 'small' as const,
        },
        {
          id: 'off-target-risk',
          title: 'Off-Target Safety Profile',
          content: (
            <div className="h-full w-full">
                <RiskHeatmap 
                    data={offTargetSafetyData} 
                    showLegend={false}
                    showLabels={true}
                />
            </div>
          ),
          width: 'full' as const,
          height: 'large' as const,
        },
      ];

    return (
        <div>
            <h3 className="text-xl font-bold text-red-400 mb-4">Step 6: Final Lethality Assessment</h3>
            <p className="text-slate-400 mb-6">
                Fusing all intelligence into a single "Assassin Score" that quantifies the weapon's overall lethality and safety profile, ensuring maximum impact with minimal collateral damage.
            </p>
            <div className="h-[500px] w-full">
                <DashboardLayout panels={dashboardPanels} gap="medium" />
            </div>
        </div>
    );
};

export default FinalLethalityAssessmentViz; 
 
 