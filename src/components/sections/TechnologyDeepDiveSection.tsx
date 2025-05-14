'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FiBookOpen,      // For Scientific Basis
  FiSettings,      // For How it Works
  FiCpu,           // For Evo2
  FiShare2,        // For AlphaFold 3 (representing interactions/complexes)
  FiEdit,          // For CRISPR
  FiPlayCircle,    // For Workflow Step
  FiArrowRightCircle // For overall workflow direction
} from 'react-icons/fi';

interface PrincipleBlockProps {
  icon: React.ReactElement;
  title: string;
  bgColor?: string;
  children: React.ReactNode;
}

const PrincipleBlock: React.FC<PrincipleBlockProps> = ({ icon, title, bgColor = 'bg-slate-50', children }) => (
  <div className={`p-6 rounded-lg border border-slate-200 ${bgColor} shadow-md h-full flex flex-col`}>
    <div className="flex items-center text-primary mb-3">
      {React.cloneElement(icon, { className: "w-6 h-6 mr-2 flex-shrink-0" })}
      <h4 className="text-lg font-semibold text-slate-700">{title}</h4>
    </div>
    <div className="text-slate-600 space-y-2 text-sm md:text-base flex-grow">
      {children}
    </div>
  </div>
);

interface TechnologyDetailProps {
  id: string;
  mainIcon: React.ReactElement;
  title: string;
  scientificBasis: React.ReactNode;
  howItWorks: React.ReactNode;
  delay?: number;
}

const TechnologyDetail: React.FC<TechnologyDetailProps> = ({ id, mainIcon, title, scientificBasis, howItWorks, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="mb-10 md:mb-12 p-6 bg-white rounded-xl shadow-xl border border-slate-200"
  >
    <div className="flex items-center mb-4 md:mb-6">
      {React.cloneElement(mainIcon, { className: "w-10 h-10 text-primary mr-4 flex-shrink-0" })}
      <h3 className="text-xl md:text-2xl font-bold text-slate-800">{title}</h3>
    </div>
    <div className="grid md:grid-cols-2 gap-6">
      <PrincipleBlock icon={<FiBookOpen />} title="Scientific Basis">
        {scientificBasis}
      </PrincipleBlock>
      <PrincipleBlock icon={<FiSettings />} title="How it Works in CasPro">
        {howItWorks}
      </PrincipleBlock>
    </div>
  </motion.div>
);

const WORKFLOW_STEP_ICON_SIZE = "w-7 h-7";

const TechnologyDeepDiveSection: React.FC = () => {
  const animationVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay: number = 0) => ({ duration: 0.5, delay })
  };

  return (
    <section id="technology-deep-dive" className="py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={animationVariants.initial}
          whileInView={animationVariants.animate}
          viewport={{ once: true }}
          transition={animationVariants.transition()}
          className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            The Science & Engineering Behind CasPro
          </h2>
          <p className="text-lg text-slate-600">
            Cancer is driven by genomic alterations. Understanding their functional impact is key to effective treatment. CasPro integrates cutting-edge AI to achieve this.
          </p>
        </motion.div>

        {/* Evo2 Section */}
        <TechnologyDetail
          id="evo2-deep-dive"
          mainIcon={<FiCpu />}
          title="Evo2: Variant Analysis & Therapeutic Design"
          delay={0.1}
          scientificBasis={
            <p>
              A biological foundation model trained on vast DNA sequence data, Evo2 deciphers the complex "language" of DNA. It boasts <strong className="text-primary">over 90% accuracy</strong> in predicting the functional impact of genetic variants.
            </p>
          }
          howItWorks={
            <p>
              Analyzes patient tumor mutations, predicting functional impact via <strong className="text-primary">delta likelihood scores</strong>. Its generative abilities design novel DNA/RNA sequences for therapeutic constructs (e.g., CRISPR guide RNAs, repair templates).
            </p>
          }
        />

        {/* AlphaFold 3 Section */}
        <TechnologyDetail
          id="alphafold3-deep-dive"
          mainIcon={<FiShare2 />}
          title="AlphaFold 3: Structural Validation"
          delay={0.2}
          scientificBasis={
            <p>
              Predicts the 3D structure of biological molecules (proteins, DNA, RNA) and their interactions. Structure is fundamental to biological function.
            </p>
          }
          howItWorks={
            <p>
              After Evo2 designs therapeutic sequences, AlphaFold 3 predicts their 3D structures and complexes. Confidence metrics (<strong className="text-primary">pLDDT, ranking score</strong>) enable in silico validation of folding, target binding, and system interaction.
            </p>
          }
        />

        {/* CRISPR Section */}
        <TechnologyDetail
          id="crispr-deep-dive"
          mainIcon={<FiEdit />}
          title="CRISPR Gene Editing: Precision Intervention"
          delay={0.3}
          scientificBasis={
            <p>
              Programmable gene editing tools using a guide RNA to direct a Cas enzyme for precise DNA cuts. Can disrupt genes or, with a repair template, correct/insert genetic material.
            </p>
          }
          howItWorks={
            <p>
              Evo2&apos;s variant analysis and generative design directly inform CRISPR component creation. CasPro facilitates designing guide RNAs for patient mutations and, for specific goals, repair templates or modified Cas proteins.
            </p>
          }
        />

        {/* Integrated Workflow Section */}
        <motion.div
          initial={animationVariants.initial}
          whileInView={animationVariants.animate}
          viewport={{ once: true }}
          transition={animationVariants.transition(0.4)}
          className="mt-12 md:mt-16 pt-10 border-t border-slate-200"
        >
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-12">
            <div className="flex justify-center text-4xl text-primary mb-5">
              <FiArrowRightCircle />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              The CasPro Integrated Workflow
            </h3>
            <p className="text-lg text-slate-600">
              CasPro intelligently orchestrates these technologies into a seamless workflow from genomic data to therapeutic insights.
            </p>
          </div>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {[
              { title: "Genomic Data Input", text: "Patient genomic data, including mutations and coordinates." },
              { title: "Evo2 Variant Analysis", text: "Accurate functional impact prediction to identify key drivers and targets." },
              { title: "Target Identification", text: "Prioritize mutations/genomic regions for intervention based on Evo2 and clinical context." },
              { title: "AI-Guided Therapeutic Design", text: "Evo2 generates candidate sequences for CRISPR components (guides, templates)." },
              { title: "AlphaFold 3 Structural Evaluation", text: "Predict 3D structures and interactions of designed components and complexes." },
              { title: "Integrated Scoring & Evaluation", text: "Combine Evo2 & AlphaFold 3 insights to score therapeutic strategies for efficacy and safety." },
              { title: "Recommendation Generation", text: "Present top AI-designed therapeutic candidates with simulated supporting evidence." },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={animationVariants.initial}
                whileInView={animationVariants.animate}
                viewport={{ once: true }}
                transition={animationVariants.transition(index * 0.05 + 0.5)}
                className="flex items-start p-4 bg-white rounded-lg border border-slate-200 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <FiPlayCircle className={`flex-shrink-0 ${WORKFLOW_STEP_ICON_SIZE} text-primary mr-3 mt-0.5`} />
                <div>
                  <h4 className="font-semibold text-slate-800 mb-0.5">{index + 1}. {step.title}</h4>
                  <p className="text-slate-600 text-sm">{step.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Concluding Summary */}
        <motion.div
          initial={animationVariants.initial}
          whileInView={animationVariants.animate}
          viewport={{ once: true }}
          transition={animationVariants.transition(0.6)}
          className="mt-12 md:mt-16 pt-10 border-t border-slate-200 text-center"
        >
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 rounded-lg shadow-xl">
            <h4 className="text-xl font-semibold mb-3">Synergistic Power</h4>
            <p className="text-lg font-light leading-relaxed">
              CasPro synergizes Evo2&apos;s high-accuracy predictions and generative power with AlphaFold 3&apos;s structural insights. This enables rapid in silico design and evaluation of novel genetic sequences for targeted cancer therapies, accelerating the path from discovery to intervention.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyDeepDiveSection; 