'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TargetAcquisitionViz from '../kill-chain-visualizations/TargetAcquisitionViz';
import IntelligenceGatheringViz from '../kill-chain-visualizations/IntelligenceGatheringViz';
import VulnerabilityAssessmentViz from '../kill-chain-visualizations/VulnerabilityAssessmentViz';
import WeaponForgingViz from '../kill-chain-visualizations/WeaponForgingViz';
import StructuralValidationViz from '../kill-chain-visualizations/StructuralValidationViz';
import FinalLethalityAssessmentViz from '../kill-chain-visualizations/FinalLethalityAssessmentViz';
import FinalBattlePlanViz from '../kill-chain-visualizations/FinalBattlePlanViz';
import { DEEP_DIVE_CONFIG } from '@/data/technology-deep-dive-config';

const LiveOpsPanel = ({ activeStepId }: { activeStepId: string | null }) => {

    const renderVisualization = () => {
        switch (activeStepId) {
            case 'step-1':
                return <TargetAcquisitionViz />;
            case 'step-2':
                return <IntelligenceGatheringViz />;
            case 'step-3':
                return <VulnerabilityAssessmentViz />;
            case 'step-4':
                return <WeaponForgingViz />;
            case 'step-5':
                return <StructuralValidationViz />;
            case 'step-6':
                return <FinalLethalityAssessmentViz />;
            case 'step-7':
                return <FinalBattlePlanViz />;
            default:
                return (
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-slate-500 mb-4">Live Operations</h3>
                        <p className="text-slate-400">Scroll down to view operational data for each step of the Kill Chain.</p>
                    </div>
                );
        }
    };

    const activeStep = activeStepId ? DEEP_DIVE_CONFIG.workflow.steps[parseInt(activeStepId.split('-')[1]) - 1] : null;

    return (
        <div className="sticky top-24 h-[calc(100vh-12rem)] w-full rounded-lg border-2 border-slate-700 bg-slate-900/50 shadow-2xl flex flex-col">
            <div className="flex-shrink-0 p-4 border-b border-slate-700">
                 <h2 className="text-lg font-bold text-slate-200">Live Operations</h2>
                 {activeStep && (
                     <p className="text-sm text-slate-400 mt-1">
                         <span className="font-semibold text-red-400">Briefing:</span> {activeStep.text}
                     </p>
                 )}
            </div>
            <div className="flex-grow p-4 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStepId || 'initial'}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full"
                    >
                        {renderVisualization()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LiveOpsPanel; 