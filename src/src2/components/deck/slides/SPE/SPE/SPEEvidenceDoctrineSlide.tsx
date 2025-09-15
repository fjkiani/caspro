import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Lock, FileText, Wrench } from 'lucide-react';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';
import { 
  EVIDENCE_DOCTRINE,
  SLIDE_ANIMATIONS, 
  COLORS, 
  GRADIENTS, 
  SIZES, 
  LAYOUT,
  COMPONENT_STYLES 
} from './constants';

const SPEEvidenceDoctrineSlide = () => {
    console.log('SPEEvidenceDoctrineSlide - EVIDENCE_DOCTRINE:', EVIDENCE_DOCTRINE);
    console.log('SPEEvidenceDoctrineSlide - principles:', EVIDENCE_DOCTRINE?.principles);
    
    return (
    <motion.section
        key="slide8"
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
                    {EVIDENCE_DOCTRINE.mainTitle}
                </h1>
                <p className="text-2xl md:text-3xl font-light text-slate-300">
                    {EVIDENCE_DOCTRINE.mainSubtitle}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-left">
                {EVIDENCE_DOCTRINE.principles.map((principle, index) => (
                    <div key={index} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
                        {principle.icon === "CheckCircle" && <CheckCircle size={48} className="text-green-500 mb-4" />}
                        {principle.icon === "Lock" && <Lock size={48} className="text-red-500 mb-4" />}
                        {principle.icon === "FileText" && <FileText size={48} className="text-purple-500 mb-4" />}
                        {principle.icon === "Wrench" && <Wrench size={48} className="text-orange-500 mb-4" />}
                        {!principle.icon && <CheckCircle size={48} className="text-cyan-500 mb-4" />}
                        <h3 className="text-2xl font-bold text-slate-200 mb-2">{principle.title}</h3>
                        <p className="text-lg text-slate-300">{principle.description}</p>
                        {principle.details && (
                            <div className="mt-3 p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                                <p className={`text-sm font-semibold text-${principle.iconColor || 'cyan'}-400`}>
                                    {principle.details.title || 'Details'}
                                </p>
                                {principle.details.items && Array.isArray(principle.details.items) && principle.details.items.map((item, itemIndex) => (
                                    <p key={itemIndex} className="text-sm text-slate-300">{item}</p>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg text-center">
                <p className="text-xl font-semibold text-slate-200 mb-6">{EVIDENCE_DOCTRINE.benefits.title}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {EVIDENCE_DOCTRINE.benefits.items.map((benefit, index) => (
                        <div key={index} className="bg-slate-700/50 p-6 rounded-lg border border-slate-600">
                            <div className="flex items-center justify-center mb-3">
                                {index === 0 && <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>}
                                {index === 1 && <div className="w-3 h-3 bg-blue-400 rounded-full mr-3"></div>}
                                {index === 2 && <div className="w-3 h-3 bg-purple-400 rounded-full mr-3"></div>}
                            </div>
                            <p className="text-slate-300 text-center leading-relaxed">{benefit}</p>
                        </div>
                    ))}
                </div>
                <p className="text-lg text-slate-300 mt-6 max-w-4xl mx-auto">{EVIDENCE_DOCTRINE.benefits.summary}</p>
            </div>
        </div>
    </motion.section>
    );
};

export default SPEEvidenceDoctrineSlide;
