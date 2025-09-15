import React from 'react';
import { motion } from 'framer-motion';
import { Dna, GitMerge, ShieldCheck } from 'lucide-react';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';
import { 
  MULTIPLE_MYELOMA_CASE_STUDY,
  SLIDE_ANIMATIONS, 
  COLORS, 
  GRADIENTS, 
  SIZES, 
  LAYOUT,
  COMPONENT_STYLES 
} from './constants';

const SPEMultipleMyelomaSlide = () => (
    <motion.section
        key="slide9"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
    >
        <DigitalSynapseBackground />
        <div className="relative z-10 w-full max-w-6xl space-y-12">
            <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-500">
                    {MULTIPLE_MYELOMA_CASE_STUDY.title}
                </h1>
                <p className="text-2xl md:text-3xl font-light text-slate-300">
                    {MULTIPLE_MYELOMA_CASE_STUDY.subtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
                {MULTIPLE_MYELOMA_CASE_STUDY.features.map((feature, index) => (
                    <div key={index} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg flex flex-col items-center text-center">
                        {feature.icon === "Dna" && <Dna size={48} className="text-sky-500 mb-4" />}
                        {feature.icon === "GitMerge" && <GitMerge size={48} className="text-purple-500 mb-4" />}
                        {feature.icon === "ShieldCheck" && <ShieldCheck size={48} className="text-green-500 mb-4" />}
                        <h3 className="text-2xl font-bold text-slate-200 mb-2">{feature.title}</h3>
                        <p className="text-lg text-slate-300" dangerouslySetInnerHTML={{ __html: feature.description }}></p>
                    </div>
                ))}
            </div>

            {/* Multiple Myeloma Driver Genes Section */}
            <div className="mt-12 bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-lg">
                <h2 className="text-3xl font-bold text-slate-200 mb-8 text-center">Multiple Myeloma Driver Genes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { gene: "KRAS", hotspots: "G12D/V/C/S/A, G13D", pathway: "MAPK", guidance: "MEK inhibitor guidance" },
                        { gene: "NRAS", hotspots: "G12D/V/C/S/A, G13D", pathway: "MAPK", guidance: "MEK inhibitor guidance" },
                        { gene: "BRAF", hotspots: "V600E, V600K", pathway: "BRAF/MEK", guidance: "BRAF/MEK inhibitor" },
                        { gene: "TP53", hotspots: "R175H, R248Q/W, R273C/H", pathway: "Tumor Suppressor", guidance: "Risk awareness" },
                        { gene: "MYC", hotspots: "Amplification, translocation", pathway: "Oncogene", guidance: "Targeted therapy" },
                        { gene: "CCND1", hotspots: "t(11;14) translocation", pathway: "Cell Cycle", guidance: "CDK4/6 inhibitor" }
                    ].map((geneData, index) => (
                        <div key={index} className="bg-slate-700/50 p-6 rounded-lg border border-slate-600">
                            <h3 className="text-xl font-bold text-cyan-400 mb-3">{geneData.gene}</h3>
                            <div className="space-y-2">
                                <div>
                                    <span className="text-sm font-semibold text-green-400">Hotspots:</span>
                                    <p className="text-slate-300 text-sm">{geneData.hotspots}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-blue-400">Pathway:</span>
                                    <p className="text-slate-300 text-sm">{geneData.pathway}</p>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-purple-400">Guidance:</span>
                                    <p className="text-slate-300 text-sm">{geneData.guidance}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <p className="text-xl text-slate-300 max-w-4xl mx-auto border-l-4 border-red-500 pl-6 text-left" dangerouslySetInnerHTML={{ __html: MULTIPLE_MYELOMA_CASE_STUDY.goal }}>
            </p>
        </div>
    </motion.section>
);

export default SPEMultipleMyelomaSlide;
