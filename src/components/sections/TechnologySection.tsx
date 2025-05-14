'use client';

import { motion } from 'framer-motion';
import { useState } from 'react'; // useState is used by Tab.Group implicitly
import { Tab as HeadlessUiTab } from '@headlessui/react';
import React, { Suspense } from 'react';
import { FiCpu, FiActivity, FiGitMerge, FiLock, FiEye } from 'react-icons/fi';
import dynamic from 'next/dynamic';

// Dynamically import ModelViewer with SSR turned off
const ModelViewer = dynamic(
  () => import('@/components/ui/ProteinModelViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-slate-200 rounded-lg">
        <div className="animate-pulse text-gray-600">Loading viewer...</div>
      </div>
    )
  }
);

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

// Constants for Technology Section configuration
const TECHNOLOGY_CONFIG = {
  sectionId: "science",
  title: "The Science & Technology Powering CasPro",
  subtitle: "CasPro brings together cutting-edge AI foundation models and robust engineering to create a powerful, secure platform for cancer genomics analysis and therapy design.",
  tabs: [
    {
      name: 'Evo2 Engine',
      description: 'Genomic Variant Prediction & Generation',
      icon: React.createElement(FiCpu),
      modelPath: '/models/dna_rna.glb',
      modelScale: 2,
      content: {
        heading: "Evo2: Evolutionary Genomic Analysis & Design",
        paragraphs: [
          "Evo2 is a state-of-the-art deep learning model that predicts the functional impact of genetic variants with over 90% accuracy, as validated in peer-reviewed publications. It understands the language of DNA.",
          "Beyond prediction, CasPro leverages Evo2s generative capabilities to design novel DNA/RNA sequences for therapeutic purposes, such as optimized gene editing constructs."
        ],
        listItems: [
          'Accurately interpret complex cancer-related genetic variants',
          'Identify high-potential therapeutic targets based on variant effects',
          'Generate novel DNA/RNA sequences for therapy design (e.g., CRISPR guides)',
          'Predict the efficacy and potential off-target effects of interventions'
        ],
        visualPlaceholder: "Animated visualization of Evo2 processing DNA sequences, highlighting variant predictions and generating novel therapeutic strands, with accuracy metrics displayed."
      }
    },
    {
      name: 'AlphaFold 3',
      description: 'Advanced Structural Analysis',
      icon: React.createElement(FiActivity),
      modelPath: '/models/dna_rna.glb',
      modelScale: 2.5,
      content: {
        heading: "AlphaFold 3: Deep Dive into Structural Biology",
        paragraphs: [
          "AlphaFold 3 represents a monumental leap in predicting the 3D structure of proteins, RNA, DNA, and their interactions with unprecedented accuracy.",
          "Within CasPro, AlphaFold 3 provides critical insights into how genetic variations affect molecular structures and how designed therapies might interact at a structural level, ensuring viability."
        ],
        listItems: [
          'Predict protein structure changes caused by somatic or germline mutations',
          'Evaluate the structural viability and stability of AI-designed therapeutic components',
          'Visualize complex molecular interactions for mechanistic understanding',
          'Simulate drug-target binding and interaction for designed therapies'
        ],
        visualPlaceholder: "Dynamic 3D rendering of protein structures predicted by AlphaFold 3, showing the impact of a mutation and a designed therapeutic molecule docking correctly."
      }
    },
    {
      name: 'Synergistic Workflow',
      description: 'Integrated Analysis & Design Process',
      icon: React.createElement(FiGitMerge),
      modelPath: '/models/dna_rna.glb',
      modelScale: 2,
      content: {
        heading: "Integrated & Intelligent Workflow",
        paragraphs: [
          "CasPro provides a seamless, AI-augmented workflow from raw genomic data to actionable therapeutic insights, all orchestrated by our modular Agent System.",
          "This intelligent system guides users, automates repetitive tasks, and integrates Evo2 and AlphaFold 3 into a cohesive analytical and design pipeline."
        ],
        listItems: [
          'Automated ingestion and pre-processing of genomic data (FASTQ, VCF, BAM)',
          'Evo2-powered variant interpretation and prioritization',
          'AI-guided therapy design using Evo2 generative models',
          'AlphaFold 3 for in silico structural validation of designed components',
          'Comprehensive scoring, ranking, and refinement of therapeutic candidates',
          'Agent-assisted clinical trial matching and treatment recommendation synthesis'
        ],
        visualPlaceholder: "Flowchart diagram illustrating the CasPro workflow: Data Input -> Evo2 Analysis -> Therapy Design (Evo2 Gen) -> AlphaFold 3 Validation -> Candidate Output -> Agent System Orchestration."
      }
    },
    {
      name: 'Security & Compliance',
      description: 'HIPAA, GDPR, & Data Protection',
      icon: React.createElement(FiLock),
      content: {
        heading: "Robust Security & Unwavering Compliance",
        paragraphs: [
          "CasPro is architected with patient data security and regulatory compliance (including HIPAA and GDPR considerations) as foundational principles.",
          "We employ state-of-the-art security measures to protect sensitive health information while enabling groundbreaking research and clinical application."
        ],
        listItems: [
          'End-to-end encryption for data at rest and in transit',
          'Secure, segregated cloud infrastructure with multi-factor authentication',
          'Granular access controls and comprehensive audit logs',
          'Regular third-party security assessments and penetration testing',
          'Strict data minimization, de-identification, and anonymization protocols where applicable',
          'Dedicated data protection agent (DPA) and continuous compliance monitoring'
        ],
        visualPlaceholder: "Schematic of CasPro's multi-layered security architecture, highlighting encryption, access controls, and compliance certifications (e.g., HIPAA seal)."
      }
    }
  ],
  animationVariants: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: (delay: number = 0) => ({ duration: 0.5, delay })
  }
};

const TechnologySection = () => {
  return (
    <section id={TECHNOLOGY_CONFIG.sectionId} className="section bg-white">
      <div className="container">
        <motion.div
          initial={TECHNOLOGY_CONFIG.animationVariants.initial}
          whileInView={TECHNOLOGY_CONFIG.animationVariants.animate}
          viewport={{ once: true }}
          transition={TECHNOLOGY_CONFIG.animationVariants.transition()}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="heading-2 mb-6">{TECHNOLOGY_CONFIG.title}</h2>
          <p className="subheading">
            {TECHNOLOGY_CONFIG.subtitle}
          </p>
        </motion.div>

        <HeadlessUiTab.Group>
          <HeadlessUiTab.List className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 rounded-xl bg-slate-100 p-2 max-w-3xl mx-auto mb-12 shadow-md">
            {TECHNOLOGY_CONFIG.tabs.map((tab) => (
              <HeadlessUiTab
                key={tab.name}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-3 px-2 text-sm font-medium leading-5 transition-colors duration-150',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-primary-dark ring-white ring-opacity-60',
                    selected
                      ? 'bg-primary text-white shadow-md'
                      : 'text-slate-700 hover:bg-white/70 hover:text-primary'
                  )
                }
              >
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <span className="text-lg">{tab.icon}</span>
                  <div>
                    <div className="font-semibold">{tab.name}</div>
                    <div className="text-xs mt-0.5 opacity-80 hidden sm:block">{tab.description}</div>
                  </div>
                </div>
              </HeadlessUiTab>
            ))}
          </HeadlessUiTab.List>
          <HeadlessUiTab.Panels className="mt-8">
            {TECHNOLOGY_CONFIG.tabs.map((tab, idx) => (
              <HeadlessUiTab.Panel
                key={idx}
                className="rounded-xl p-3 focus:outline-none"
              >
                <motion.div
                  initial={TECHNOLOGY_CONFIG.animationVariants.initial}
                  animate={TECHNOLOGY_CONFIG.animationVariants.animate}
                  transition={TECHNOLOGY_CONFIG.animationVariants.transition(0.2)}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start bg-slate-50 p-6 sm:p-8 rounded-lg shadow-lg border border-slate-200"
                >
                  <div className="prose prose-slate max-w-none lg:prose-base">
                    <h3 className="heading-3 mb-4 !mt-0">{tab.content.heading}</h3>
                    {tab.content.paragraphs.map((p, pIdx) => <p key={pIdx} className="text-slate-700">{p}</p>)}
                    <h4 className="font-semibold text-slate-800 mt-6 mb-2">Key Applications:</h4>
                    <ul className="space-y-1 text-slate-600">
                      {tab.content.listItems.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start">
                          <FiEye className="text-primary mr-2 mt-1 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative h-[300px] lg:h-[350px] bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center p-6 shadow-inner">
                    {tab.modelPath ? (
                      <Suspense fallback={
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="animate-pulse text-gray-600">Loading 3D viewer...</div>
                        </div>
                      }>
                        <div className="w-full h-full">
                          <ModelViewer 
                            className="w-full h-full" 
                            modelUrl={tab.modelPath}
                          />
                        </div>
                      </Suspense>
                    ) : (
                      <p className="text-center text-slate-500 italic">
                        {tab.content.visualPlaceholder}
                      </p>
                    )}
                  </div>
                </motion.div>
              </HeadlessUiTab.Panel>
            ))}
          </HeadlessUiTab.Panels>
        </HeadlessUiTab.Group>
      </div>
    </section>
  );
};

export default TechnologySection; 