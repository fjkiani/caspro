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
  title: "The Science & Technology Powering CrisPRO",
  subtitle: "CrisPRO brings together cutting-edge AI foundation models and robust engineering to create a powerful, secure platform for cancer genomics analysis and therapy design.",
  tabs: [
    {
      name: 'Evo2 Engine',
      description: 'Genomic Variant Prediction & Generation',
      icon: FiCpu,
      modelPath: '/models/dna_rna.glb',
      modelScale: 2,
      content: {
        heading: "Evo2: Evolutionary Genomic Analysis & Design",
        paragraphs: [
          "Evo2 is a state-of-the-art deep learning model that predicts the functional impact of genetic variants with over 90% accuracy, as validated in peer-reviewed publications. It understands the language of DNA.",
          "Beyond prediction, CrisPRO leverages Evo2s generative capabilities to design novel DNA/RNA sequences for therapeutic purposes, such as optimized gene editing constructs."
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
      icon: FiActivity,
      modelPath: '/models/dna_rna.glb',
      modelScale: 2.5,
      content: {
        heading: "AlphaFold 3: Deep Dive into Structural Biology",
        paragraphs: [
          "AlphaFold 3 represents a monumental leap in predicting the 3D structure of proteins, RNA, DNA, and their interactions with unprecedented accuracy.",
          "Within CrisPRO, AlphaFold 3 provides critical insights into how genetic variations affect molecular structures and how designed therapies might interact at a structural level, ensuring viability."
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
      name: 'Core Capabilities',
      description: 'Platform Features & AI Co-pilot',
      icon: FiGitMerge,
      modelPath: '/models/dna_rna.glb',
      modelScale: 2,
      content: {
        heading: "CrisPRO's Integrated Capabilities",
        paragraphs: [
          "CrisPRO offers a comprehensive suite of AI-driven tools designed to revolutionize cancer genomics analysis, therapy design, and clinical decision-making.",
          "What truly sets CrisPRO apart is not just the individual power of each feature, but their seamless integration into a cohesive ecosystem. This synergy creates an unparalleled workflow from raw data to actionable insights and therapeutic innovation."
        ],
        listItems: [
          "AI-Powered Genomic Analysis: Deep variant interpretation, functional impact prediction (Evo2 scores), and identification of novel therapeutic targets from complex genomic data.",
          "AI-Guided Therapy Design: Leverage Evo2's generative power to design bespoke gene editing constructs (e.g., CRISPR guide RNAs, repair templates) and other biologics.",
          "In Silico Design Evaluation: Predict structural viability and efficacy of designed therapies using AlphaFold 3, with comprehensive multi-modal scoring of candidates.",
          "Predictive Biomarker Discovery: Identify novel predictive biomarkers for treatment response and resistance, enhancing patient stratification for clinical trials and therapies.",
          "Intelligent Clinical Trial Matching: AI agent-based assistance to find relevant clinical trials based on comprehensive patient genomic and clinical profiles, accelerating enrollment.",
          "Modular Agent Assistance (AI Co-pilot): Key capabilities include: understands your questions about specific genes, genetic changes (variants), or particular genomic conditions; uses advanced AI (Evo2) to predict how genetic changes might affect a patient and their condition; checks a patient's unique genetic makeup against the criteria you're interested in; provides clear, organized summaries of its findings, including gene details, variant information, and how it relates to the patient's clinical situation; helps identify potential therapeutic options based on genomic insights."
        ],
        visualPlaceholder: "Flowchart diagram illustrating the CrisPRO workflow: Data Input -> AI Analysis & Design -> Candidate Output -> Agent System Orchestration."
      }
    },
    {
      name: 'Security & Compliance',
      description: 'HIPAA, GDPR, & Data Protection',
      icon: FiLock,
      content: {
        heading: "Robust Security & Unwavering Compliance",
        paragraphs: [
          "CrisPRO is architected with patient data security and regulatory compliance (including HIPAA and GDPR considerations) as foundational principles.",
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
        visualPlaceholder: "Schematic of CrisPRO's multi-layered security architecture, highlighting encryption, access controls, and compliance certifications (e.g., HIPAA seal)."
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
            {TECHNOLOGY_CONFIG.tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
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
                    {TabIcon && <TabIcon className="text-lg w-5 h-5" />}
                    <div>
                      <div className="font-semibold">{tab.name}</div>
                      <div className="text-xs mt-0.5 opacity-80 hidden sm:block">{tab.description}</div>
                    </div>
                  </div>
                </HeadlessUiTab>
              );
            })}
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
                  <div className="max-w-none lg:text-base text-slate-800">
                    <h3 className="heading-3 mb-4 mt-0 text-slate-800">{tab.content.heading}</h3>
                    {tab.content.paragraphs.map((p, pIdx) => <p key={pIdx} className="text-slate-700 mb-4 leading-relaxed">{p}</p>)}
                    {tab.content.listItems && tab.content.listItems.length > 0 && (
                      <>
                        <h4 className="font-semibold text-slate-800 mt-6 mb-4 text-xl">Key Aspects:</h4>
                        <ul className="space-y-3 text-slate-700 list-none pl-0">
                          {tab.content.listItems.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start text-slate-700 my-2">
                              <FiEye className="text-primary mr-3 mt-1 flex-shrink-0 w-5 h-5" />
                              <span className="flex-1 text-slate-700 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
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