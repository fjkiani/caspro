'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Shield, 
  Users, 
  Target, 
  Zap, 
  AlertTriangle, 
  Microscope,
  Navigation,
  ArrowRight,
  Activity
} from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import ConceptCard from '../shared/ConceptCard';
import { circulationExtravasationData } from '@/data/learn/oncology-101/metastasis-data';

// Reusable Definitions Grid - can be used for any glossary/definitions
const DefinitionsGrid = ({ definitions, title }: {
  definitions: any[];
  title: string;
}) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-slate-900 mb-6">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {definitions.map((def, index) => (
        <motion.div
          key={def.term}
          className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h4 className="font-semibold text-slate-900 mb-2">{def.term}</h4>
          <p className="text-sm text-slate-700 mb-2">{def.definition}</p>
          <p className="text-xs text-blue-600 italic">{def.significance}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

// Reusable Gene Grid - can be used for any gene/protein information
const GeneGrid = ({ genes, title, subtitle }: {
  genes: any[];
  title: string;
  subtitle?: string;
}) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-slate-900 mb-4">{title}</h3>
    {subtitle && <p className="text-slate-600 mb-6">{subtitle}</p>}
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {genes.map((gene, index) => (
        <motion.div
          key={gene.gene}
          className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h4 className="font-semibold text-red-700 mb-2">{gene.gene}</h4>
          <div className="space-y-2 text-sm">
            <p><strong className="text-slate-700">Function:</strong> <span className="text-slate-600">{gene.function}</span></p>
            <p><strong className="text-slate-700">Loss Effect:</strong> <span className="text-slate-600">{gene.lossEffect}</span></p>
            {gene.cancerType && (
              <p><strong className="text-slate-700">Cancer Type:</strong> <span className="text-slate-600">{gene.cancerType}</span></p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// Reusable Survival Challenges Component
const SurvivalChallenges = ({ challenges, title }: {
  challenges: any[];
  title: string;
}) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-slate-900 mb-6">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {challenges.map((challenge, index) => (
        <motion.div
          key={challenge.challenge}
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            {index === 0 && <AlertTriangle className="w-8 h-8 text-red-600" />}
            {index === 1 && <Shield className="w-8 h-8 text-red-600" />}
            {index === 2 && <Activity className="w-8 h-8 text-red-600" />}
          </div>
          <h4 className="font-semibold text-slate-900 mb-2">{challenge.challenge}</h4>
          <p className="text-sm text-slate-700 mb-3">{challenge.description}</p>
          <div className="bg-green-50 border border-green-200 rounded p-3">
            <p className="text-xs text-green-700">
              <strong>Evasion:</strong> {challenge.evasion}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// Reusable Pathway Cascade Component
const PathwayCascade = ({ pathway, title }: {
  pathway: any;
  title: string;
}) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-600 mb-6">{pathway.description}</p>
    
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-800 mb-2">Trigger</h4>
        <p className="text-blue-700">{pathway.egfrPathway.trigger}</p>
      </div>
      
      <div className="flex flex-col space-y-2">
        {pathway.egfrPathway.cascade.map((step: string, index: number) => (
          <motion.div
            key={index}
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded p-3">
              <p className="text-slate-700">{step}</p>
            </div>
            {index < pathway.egfrPathway.cascade.length - 1 && (
              <ArrowRight className="w-4 h-4 text-blue-400" />
            )}
          </motion.div>
        ))}
      </div>
      
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-800 mb-2">Outcome</h4>
        <p className="text-green-700">{pathway.egfrPathway.outcome}</p>
      </div>
    </div>
  </div>
);

// Reusable Theory Comparison Component
const TheoryComparison = ({ theories, title }: {
  theories: any;
  title: string;
}) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-slate-900 mb-6">{title}</h3>
    
    <div className="grid md:grid-cols-2 gap-8">
      {/* Random Theory */}
      <motion.div
        className="border-2 border-gray-200 bg-gray-50 rounded-lg p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h4 className="text-lg font-semibold text-slate-900 mb-3">{theories.randomTheory.name}</h4>
        <p className="text-slate-700 text-sm mb-3">{theories.randomTheory.description}</p>
        <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-3">
          <p className="text-blue-700 text-sm italic">"{theories.randomTheory.analogy}"</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <p className="text-red-700 text-xs">
            <strong>Limitation:</strong> {theories.randomTheory.limitation}
          </p>
        </div>
      </motion.div>

      {/* Seed and Soil Theory */}
      <motion.div
        className="border-2 border-green-200 bg-green-50 rounded-lg p-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h4 className="text-lg font-semibold text-slate-900 mb-3">{theories.seedSoilTheory.name}</h4>
        <p className="text-slate-700 text-sm mb-2">{theories.seedSoilTheory.concept}</p>
        <p className="text-slate-600 text-xs mb-4">
          <strong>Author:</strong> {theories.seedSoilTheory.author}<br/>
          <strong>Paper:</strong> {theories.seedSoilTheory.paper}
        </p>
        
        <div className="space-y-2">
          {theories.seedSoilTheory.examples.map((example: any, index: number) => (
            <div key={index} className="bg-white border border-green-200 rounded p-2">
              <p className="text-xs">
                <strong className="text-green-700">{example.cancer}:</strong> {example.preferredSite} ✓, 
                <span className="text-red-600"> not {example.avoidedSite} ✗</span>
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

const CirculationExtravasationSection: React.FC = () => {
  const { 
    introduction, 
    keyDefinitions,
    lymphaticSystem,
    metastasisSuppressorGenes,
    anoikisResistance,
    ctcCharacteristics,
    ctcCellularAssociations,
    ctcDetection,
    homingExtravasation
  } = circulationExtravasationData;

  return (
    <div className="space-y-12">
      <SectionHeader
        title={introduction.title}
        subtitle={introduction.description}
        color="purple"
      />

      {/* Introduction with Key Points */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center mb-6">
          <Heart className="w-8 h-8 text-purple-600 mr-3" />
          <h3 className="text-xl font-semibold text-slate-900">Learning Objectives</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {introduction.keyPoints.map((point, index) => (
            <motion.div
              key={index}
              className="flex items-start space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Target className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
              <p className="text-slate-700">{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Key Definitions - Using Reusable DefinitionsGrid */}
      <DefinitionsGrid 
        definitions={keyDefinitions}
        title="Key Terminology"
      />

      {/* Lymphatic System - Using Reusable ConceptCard */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">{lymphaticSystem.title}</h3>
          <p className="text-slate-600">{lymphaticSystem.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ConceptCard
            title="Lymphatic Structure & Function"
            description={`
              <strong>Composition:</strong> ${lymphaticSystem.structure.composition}<br/><br/>
              <strong>Function:</strong> ${lymphaticSystem.structure.function}
            `}
            color="teal"
            index={0}
          />
          <ConceptCard
            title="Metastatic Advantage"
            description={`
              <strong>Alternative Route:</strong> ${lymphaticSystem.metastaticAdvantage.description}<br/><br/>
              <strong>Pathway:</strong><br/>
              ${lymphaticSystem.metastaticAdvantage.pathway.map((step: string) => `• ${step}`).join('<br/>')}
            `}
            color="red"
            index={1}
          />
        </div>
      </div>

      {/* Metastasis Suppressor Genes - Using Reusable GeneGrid */}
      <GeneGrid
        genes={metastasisSuppressorGenes.knownGenes}
        title={metastasisSuppressorGenes.title}
        subtitle={metastasisSuppressorGenes.description}
      />

      {/* CD82 Mechanism Detail */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <h3 className="text-xl font-semibold text-slate-900 mb-6">{metastasisSuppressorGenes.cd82Mechanism.title}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Normal Function</h4>
            <p className="text-green-700 text-sm mb-2">{metastasisSuppressorGenes.cd82Mechanism.normalFunction}</p>
            <p className="text-green-600 text-xs"><strong>Outcome:</strong> {metastasisSuppressorGenes.cd82Mechanism.normalOutcome}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">Cancer Loss</h4>
            <p className="text-red-700 text-sm mb-2">{metastasisSuppressorGenes.cd82Mechanism.cancerLoss}</p>
            <p className="text-red-600 text-xs"><strong>Outcome:</strong> {metastasisSuppressorGenes.cd82Mechanism.cancerOutcome}</p>
          </div>
        </div>
      </motion.div>

      {/* Anoikis Resistance - Using Reusable PathwayCascade */}
      <PathwayCascade
        pathway={anoikisResistance.cancerEvasion}
        title={anoikisResistance.title}
      />

      {/* CTC Survival Challenges - Using Reusable SurvivalChallenges */}
      <SurvivalChallenges
        challenges={ctcCharacteristics.survivalChallenges}
        title="CTC Survival Challenges"
      />

      {/* CTC Clinical Significance */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <div className="flex items-center mb-6">
          <Microscope className="w-6 h-6 text-blue-600 mr-3" />
          <h3 className="text-xl font-semibold text-slate-900">{ctcCharacteristics.clinicalSignificance.title}</h3>
        </div>
        <p className="text-slate-700 mb-6">{ctcCharacteristics.clinicalSignificance.description}</p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">Better Prognosis</h4>
            <p className="text-green-700">{ctcCharacteristics.clinicalSignificance.breastCancerData.lowCTC}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">Worse Prognosis</h4>
            <p className="text-red-700">{ctcCharacteristics.clinicalSignificance.breastCancerData.highCTC}</p>
          </div>
        </div>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-blue-800">
            <strong>Detection Challenge:</strong> {ctcCharacteristics.clinicalSignificance.detectionChallenge}
          </p>
        </div>
      </motion.div>

      {/* Homing Theories - Using Reusable TheoryComparison */}
      <TheoryComparison
        theories={homingExtravasation.homingTheories}
        title="Theories of Metastatic Homing"
      />

      {/* Extravasation Process - Using ProcessSteps pattern */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">{homingExtravasation.extravasationProcess.title}</h3>
        <p className="text-slate-600 mb-6">{homingExtravasation.extravasationProcess.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {homingExtravasation.extravasationProcess.steps.slice(0, 4).map((step: any, index: number) => (
            <motion.div
              key={step.step}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 h-full">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                    {step.step}
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">{step.name}</h4>
                </div>
                <p className="text-xs text-slate-700 mb-2">{step.description}</p>
                <p className="text-xs text-slate-500 italic">{step.mechanism}</p>
              </div>
              
              {index < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                  <ArrowRight className="w-4 h-4 text-purple-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Remaining steps */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {homingExtravasation.extravasationProcess.steps.slice(4).map((step: any, index: number) => (
            <motion.div
              key={step.step}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index + 4) * 0.2 }}
            >
              <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4 h-full">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                    {step.step}
                  </div>
                  <h4 className="font-semibold text-slate-900 text-sm">{step.name}</h4>
                </div>
                <p className="text-xs text-slate-700 mb-2">{step.description}</p>
                <p className="text-xs text-slate-500 italic">{step.mechanism || step.outcome}</p>
              </div>
              
              {index < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                  <ArrowRight className="w-4 h-4 text-orange-400" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <motion.div
        className="bg-gradient-to-r from-purple-50 to-blue-50 p-8 rounded-lg border border-purple-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <div className="flex items-center mb-4">
          <Navigation className="w-6 h-6 text-purple-600 mr-3" />
          <h3 className="text-xl font-semibold text-purple-800">Clinical Implications</h3>
        </div>
        <div className="space-y-4 text-slate-700">
          <p>
            Understanding circulation survival and extravasation reveals the remarkable journey cancer 
            cells must complete to establish distant metastases. Each step represents both a vulnerability 
            and a potential therapeutic target.
          </p>
          <div className="bg-white/70 border-l-4 border-purple-500 p-4 rounded">
            <p className="text-purple-800 font-medium">
              <strong>Therapeutic Insight:</strong> The complexity of metastatic circulation offers 
              multiple intervention points, from CTC detection for early diagnosis to targeting 
              survival mechanisms, cellular partnerships, and homing pathways.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CirculationExtravasationSection; 