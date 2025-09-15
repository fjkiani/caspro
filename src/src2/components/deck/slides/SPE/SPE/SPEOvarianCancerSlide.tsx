import React from 'react';
import { motion } from 'framer-motion';
import { Code2, GitMerge, CheckCircle, ShieldCheck } from 'lucide-react';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';

const SPEOvarianCancerSlide = () => (
    <motion.section
        key="slide10"
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
                    Ovarian Cancer Case Study
                </h1>
                <p className="text-2xl md:text-3xl font-light text-slate-300">
                    From Essentiality to Actionable Guidance
                </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-start">
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/2 overflow-x-auto text-left">
                    <h3 className="text-2xl font-bold text-slate-200 mb-4">Live JSON Output</h3>
                    <Code2 size={24} className="text-slate-400 mb-4"/>
                    <pre className="text-sm md:text-base text-slate-300 bg-slate-700 p-4 rounded-lg">
                        <code>
{`{
  "essentiality_report": [{
    "gene": "BRCA1",
    "result": {
      "essentiality_score": 0.35,
      "confidence": 0.55
    }
  }],
  "guidance": {
    "therapy": "BRAF inhibitor",
    "disease": "ovarian cancer",
    "on_label": false,
    "tier": "I",
    "strength": "moderate",
    "efficacy_score": 0.305,
    "confidence": 0.84,
    "insights": { /* ... */ },
    "rationale": ["MoA alignment: MAPK blockade", "evidence_strength=0.75"],
    "citations": ["40512670", "39845416"],
    "evidence_tier": "supported",
    "badges": ["ClinVar-Strong"]
  }
}`}
                        </code>
                    </pre>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/2 text-left">
                    <h3 className="text-2xl font-bold text-slate-200 mb-4">Why This Output Matters</h3>
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                            <GitMerge size={48} className="text-purple-500 flex-shrink-0 mt-1"/>
                            <div>
                                <h4 className="font-bold text-xl text-slate-200">Essentiality ≠ Sensitivity</h4>
                                <p className="text-lg text-slate-300 mt-1">A low <strong>essentiality score</strong> (0.35) for BRCA1 means the cancer isn't dependent on the gene, but the guidance layer correctly identifies that this specific mutation creates a new vulnerability to certain therapies.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <CheckCircle size={48} className="text-green-500 flex-shrink-0 mt-1"/>
                            <div>
                                <h4 className="font-bold text-xl text-slate-200">Actionable, Not Probabilistic</h4>
                                <p className="text-lg text-slate-300 mt-1">The system provides a <strong>Tier I</strong>, high-confidence verdict despite the therapy being off-label. It applies clinical wisdom to raw data, providing a clear path forward for clinicians.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-3">
                            <ShieldCheck size={48} className="text-blue-500 flex-shrink-0 mt-1"/>
                            <div>
                                <h4 className="font-bold text-xl text-slate-200">Total Transparency</h4>
                                <p className="text-lg text-slate-300 mt-1">The `essentiality_report` and the `guidance` layer's rationale are surfaced together, ensuring clinicians understand both the raw data and the higher-level conclusion, building trust in the system's decisions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </motion.section>
);

export default SPEOvarianCancerSlide;
