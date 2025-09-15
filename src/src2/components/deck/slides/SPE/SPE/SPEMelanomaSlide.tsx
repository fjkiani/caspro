import React from 'react';
import { motion } from 'framer-motion';
import { Code2, CircleCheckBig, GitBranch, FileText } from 'lucide-react';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';
import { 
  MELANOMA_CASE_STUDY,
  SLIDE_ANIMATIONS, 
  COLORS, 
  GRADIENTS, 
  SIZES, 
  LAYOUT,
  COMPONENT_STYLES 
} from './constants';

const SPEMelanomaSlide = () => (
    <motion.section
        key="slide11"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
    >
        <DigitalSynapseBackground />
        <div className="relative z-10 w-full max-w-6xl space-y-12">
            <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                    {MELANOMA_CASE_STUDY.title}
                </h1>
                <p className="text-2xl md:text-3xl font-light text-slate-300">
                    {MELANOMA_CASE_STUDY.subtitle}
                </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-start">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/2 overflow-x-auto text-left">
                    <h3 className="text-2xl font-bold text-slate-200 mb-4">{MELANOMA_CASE_STUDY.liveOutput.title}</h3>
                    <Code2 size={24} className="text-slate-400 mb-4"/>
                    <pre className="text-sm md:text-base text-slate-300 bg-slate-700 p-4 rounded-lg">
                        <code>
{`{
  "therapy": "BRAF inhibitor",
  "disease": "melanoma",
  "on_label": true,
  "tier": "I",
  "strength": "moderate",
  "efficacy_score": 0.261,
  "confidence": 0.51,
  "insights": { /* ... */ },
  "rationale": ["MoA alignment: MAPK blockade", "evidence_strength=0.6"],
  "citations": ["39866931", "40411938", "40484006"],
  "evidence_tier": "consider",
  "badges": [],
  "provenance": { "efficacy_run": "eee0cee0315c" }
}`}
                        </code>
                    </pre>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/2 text-left">
                    <h3 className="text-2xl font-bold text-slate-200 mb-4">{MELANOMA_CASE_STUDY.whyItMatters.title}</h3>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <CircleCheckBig size={48} className="text-green-500 flex-shrink-0 mt-1"/>
                            <div>
                                <h4 className="font-bold text-xl text-slate-200">Direct FDA Alignment</h4>
                                <p className="text-lg text-slate-300 mt-1">The `on_label: true` field confirms this is an FDA-approved therapy for this specific mutation and disease, leading to a high-confidence, actionable <strong>Tier I</strong> recommendation.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <GitBranch size={48} className="text-purple-500 flex-shrink-0 mt-1"/>
                            <div>
                                <h4 className="font-bold text-xl text-slate-200">Clinical Gating in Action</h4>
                                <p className="text-lg text-slate-300 mt-1">Even with a moderate confidence score, the system's clinical gates recognize the therapy's on-label status and strong evidence, pushing it to the definitive <strong>"Yes GO"</strong> verdict.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <FileText size={48} className="text-sky-500 flex-shrink-0 mt-1"/>
                            <div>
                                <h4 className="font-bold text-xl text-slate-200">Transparent Provenance</h4>
                                <p className="text-lg text-slate-300 mt-1">Every decision is fully auditable. The output provides a list of citations and a rationale, ensuring every step of the recommendation is transparent and traceable.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.section>
);

export default SPEMelanomaSlide;
