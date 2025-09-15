import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Gem, Zap, ArrowRight } from 'lucide-react';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';

const SPEForBiotechsSlide = () => (
    <motion.section
        key="slide4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
    >
        <DigitalSynapseBackground />
        <div className="relative z-10 w-full max-w-7xl space-y-8"> 
  <div className="space-y-6 text-center"> 
    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-tight"> 
      For Biotechs: In‑Silico Design & Validation 
    </h1> 
    <p className="text-xl md:text-2xl lg:text-3xl font-light text-slate-300 max-w-4xl mx-auto"> 
      From target to a confident plan in weeks 
    </p> 
  </div> 

  <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto"> 
    <div className="flex flex-col lg:flex-row items-center justify-around w-full mt-12"> 

      {/* Card 1 */} 
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }} 
        className="flex flex-col items-center space-y-3 text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/3 mb-8 lg:mb-0" 
      > 
        <div className="p-4 rounded-full text-red-500"> 
          <FlaskConical size={48} /> 
        </div> 
        <h3 className="text-2xl font-bold text-slate-200">Validate targets before big spend</h3> 
        <p className="text-lg text-slate-300">Get clear, evidence‑backed readouts on targets and variants before committing preclinical budgets.</p> 
      </motion.div> 

      <ArrowRight size={48} className="text-slate-400 rotate-90 lg:rotate-0" /> 

      {/* Card 2 */} 
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.7 }} 
        className="flex flex-col items-center space-y-3 text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/3 mb-8 lg:mb-0" 
      > 
        <div className="p-4 rounded-full text-purple-500"> 
          <Gem size={48} /> 
        </div> 
        <h3 className="text-2xl font-bold text-slate-200">Design smarter, faster</h3> 
        <p className="text-lg text-slate-300">Generate and score therapeutic concepts (e.g., CRISPR guides/sequences) with built‑in safety checks and simple quality signals.</p> 
      </motion.div> 

      <ArrowRight size={48} className="text-slate-400 rotate-90 lg:rotate-0" /> 

      {/* Card 3 */} 
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5, delay: 1.2 }} 
        className="flex flex-col items-center space-y-3 text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/3" 
      > 
        <div className="p-4 rounded-full text-orange-500"> 
          <Zap size={48} /> 
        </div> 
        <h3 className="text-2xl font-bold text-slate-200">Test in‑silico, focus wet‑lab</h3> 
        <p className="text-lg text-slate-300">Use computational triage to shortlist best options, then advance the most promising to wet‑lab and IND planning.</p> 
      </motion.div> 
    </div> 
  </div> 

  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg text-center"> 
    <p className="text-xl font-semibold text-slate-200 mb-4">What you get</p> 
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> 
      <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600"> 
        <p className="text-sm text-slate-300">Faster decisions: weeks, not years, to a prioritized, evidence‑backed plan.</p> 
      </div> 
      <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600"> 
        <p className="text-sm text-slate-300">Lower risk: transparent rationale, sources, and reproducible runs for every recommendation.</p> 
      </div> 
      <div className="bg-slate-700/50 p-4 rounded-lg border border-slate-600"> 
        <p className="text-sm text-slate-300">Fundraising‑ready: shareable cohorts, benchmarks, and artifacts to support diligence.</p> 
      </div> 
    </div> 
  </div> 

  <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg text-left"> 
    <p className="text-xl font-semibold text-slate-200 mb-4">Example outcomes (research‑mode)</p> 
    <ul className="list-disc pl-6 text-slate-300 space-y-2"> 
      <li>Target triage: earlier go/no‑go on variants and pathways</li> 
      <li>Portfolio focus: fewer, higher‑quality candidates entering wet‑lab</li> 
      <li>Partner confidence: clear audit trails (what we used, how we decided)</li> 
    </ul> 
  </div> 

  <p className="text-xl text-slate-300 max-w-4xl mx-auto border-l-4 border-red-500 pl-6 text-left mt-12"> 
    Summary — By combining generation with transparent in‑silico validation, we help biotechs de‑risk earlier, focus experiments, and accelerate toward the clinic with evidence that investors and partners can understand. 
  </p> 
</div> 

    </motion.section>
);

export default SPEForBiotechsSlide;
