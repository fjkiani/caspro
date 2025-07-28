'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { DEEP_DIVE_CONFIG } from '@/data/technology-deep-dive-config';
import { LucideIcon } from 'lucide-react';

type KillChainStepWithId = (typeof DEEP_DIVE_CONFIG.workflow.steps)[number] & { id: string };

const positionClasses = {
    'top-left': 'top-2 left-2 border-t-2 border-l-2',
    'top-right': 'top-2 right-2 border-t-2 border-r-2',
    'bottom-left': 'bottom-2 left-2 border-b-2 border-l-2',
    'bottom-right': 'bottom-2 right-2 border-b-2 border-r-2',
};

type HUDPosition = keyof typeof positionClasses;

const HUDCorner = ({ position }: { position: HUDPosition }) => {
    const baseClasses = "absolute w-8 h-8 border-red-500/50";
    return <div className={`${baseClasses} ${positionClasses[position]}`}></div>;
};

const WorkflowStep = ({ step, index }: { step: { title: string; text: string; icon: LucideIcon }, index: number }) => (
    <div className="relative flex items-start p-6 text-left">
        <div className="flex-shrink-0 w-16 h-16 bg-red-900/50 border-2 border-red-500/60 rounded-full flex items-center justify-center mr-6">
            <step.icon className="w-8 h-8 text-red-400" />
        </div>
        <div>
            <h3 className="text-xl font-bold text-red-300 mb-2 tracking-wider">{step.title}</h3>
            <p className="text-slate-400">{step.text}</p>
        </div>
    </div>
);

interface KillChainCardProps {
    item: KillChainStepWithId;
    onInView: (id: string) => void;
    isFirst: boolean;
}

const KillChainCard = ({ item, onInView, isFirst }: KillChainCardProps) => {
    const ref = useRef(null);
    // Let the first item be in view by default on the server
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

    useEffect(() => {
        // For the first item, we set it as active initially on the client.
        // For subsequent items, we rely on the isInView hook.
        if (isFirst && ref.current) {
            onInView(item.id);
        }
        if (!isFirst && isInView) {
            onInView(item.id);
        }
    }, [isInView, item.id, onInView, isFirst]);

    return (
        <div ref={ref} className="h-[100vh] flex items-center">
             <div className="w-full max-w-lg mx-auto relative">
                <HUDCorner position="top-left" />
                <HUDCorner position="top-right" />
                <HUDCorner position="bottom-left" />
                <HUDCorner position="bottom-right" />
                <div className="bg-slate-900/80 p-4 rounded-lg border border-red-500/30 backdrop-blur-sm shadow-2xl shadow-red-900/50">
                    <WorkflowStep step={item} index={parseInt(item.id.split('-')[1]) -1} />
                </div>
            </div>
        </div>
    );
};

interface KillChainNarrativeProps {
    onStepInView: (id: string | null) => void;
}

const KillChainNarrative = ({ onStepInView }: KillChainNarrativeProps) => {
    const stepsWithIds: KillChainStepWithId[] = DEEP_DIVE_CONFIG.workflow.steps.map((step, index) => ({ ...step, id: `step-${index + 1}` }));

    return (
        <div className="w-full">
            {stepsWithIds.map((step, i) => (
                <KillChainCard key={i} item={step} onInView={onStepInView} isFirst={i === 0} />
            ))}
        </div>
    );
};

export default KillChainNarrative; 