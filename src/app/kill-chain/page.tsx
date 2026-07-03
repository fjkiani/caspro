'use client';

import React, { useState, useEffect } from 'react';
import KillChainNarrative from '@/components/sections/KillChainNarrative';
import LiveOpsPanel from '@/components/sections/LiveOpsPanel';
import { AnimatePresence, motion } from 'framer-motion';

import TargetAcquisitionViz from '@/components/kill-chain-visualizations/TargetAcquisitionViz';
import IntelligenceGatheringViz from '@/components/kill-chain-visualizations/IntelligenceGatheringViz';
import VulnerabilityAssessmentViz from '@/components/kill-chain-visualizations/VulnerabilityAssessmentViz';
import WeaponForgingViz from '@/components/kill-chain-visualizations/WeaponForgingViz';
import StructuralValidationViz from '@/components/kill-chain-visualizations/StructuralValidationViz';
import FinalLethalityAssessmentViz from '@/components/kill-chain-visualizations/FinalLethalityAssessmentViz';
import FinalBattlePlanViz from '@/components/kill-chain-visualizations/FinalBattlePlanViz';
import KillChainSummary from '@/components/sections/KillChainSummary';
import KillChainProblem from '@/components/sections/KillChainProblem';
import KillChainCta from '@/components/sections/KillChainCta';
import RelatedLinks from '@/components/shared/RelatedLinks';


const visualizationMap = {
    'step-1': TargetAcquisitionViz,
    'step-2': IntelligenceGatheringViz,
    'step-3': VulnerabilityAssessmentViz,
    'step-4': WeaponForgingViz,
    'step-5': StructuralValidationViz,
    'step-6': FinalLethalityAssessmentViz,
    'step-7': FinalBattlePlanViz,
};

type StepId = keyof typeof visualizationMap;

const MobileView = () => {
    const steps = Object.keys(visualizationMap) as StepId[];
    return (
        <div className="w-full">
            {steps.map((stepId) => {
                const Visualization = visualizationMap[stepId];
                return(
                    <div key={stepId} className="mb-16">
                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.3 }}>
                           <Visualization />
                        </motion.div>
                    </div>
                )
            })}
        </div>
    )
}

export default function KillChainPage() {
    const [activeStepId, setActiveStepId] = useState<string | null>('step-1');
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const pageTitle = (
        <div className="text-center pt-32 pb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-red-400 tracking-tighter uppercase">The 'In Silico' Kill Chain</h1>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                Our platform executes a seamless, end-to-end campaign, moving from raw intelligence to a validated therapeutic weapon with overwhelming speed and certainty.
            </p>
        </div>
    );

    if (isMobile) {
        return (
            <main className="bg-black text-white">
                <div className="container mx-auto px-4">
                    {pageTitle}
                    {/* <KillChainProblem /> */}
                    <MobileView />
                    <KillChainSummary />
                    <KillChainCta />
                </div>
            </main>
        )
    }

    return (
        <main className="bg-black text-white">
            <div className="container mx-auto">
                {pageTitle}
                <KillChainProblem />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="w-full">
                        <KillChainNarrative onStepInView={setActiveStepId} />
                    </div>
                    <div className="w-full lg:sticky top-0">
                       <LiveOpsPanel activeStepId={activeStepId} />
                    </div>
                </div>
                <div className="px-4">
                  <KillChainSummary />
                  <KillChainCta />
                </div>
            </div>
        
      <RelatedLinks route="/kill-chain" />
</main>
    );
} 