'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw, Scissors, Users, Target, Zap } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import ConceptCard from '../shared/ConceptCard';
import { emtInvasionData } from '@/data/learn/oncology-101/metastasis-data';

// Reusable Process Steps Component - can be used for any step-by-step process
const ProcessSteps = ({ process, title, subtitle }: {
  process: any;
  title: string;
  subtitle?: string;
}) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-slate-900 mb-4">{title}</h3>
    {subtitle && <p className="text-slate-600 mb-6">{subtitle}</p>}
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {process.steps.map((step: any, index: number) => (
        <motion.div
          key={step.step}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
        >
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 h-full">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-3">
                {step.step}
              </div>
              <h4 className="font-semibold text-slate-900">{step.name}</h4>
            </div>
            <p className="text-sm text-slate-700 mb-2">{step.description}</p>
            <p className="text-xs text-slate-500 italic">{step.mechanism}</p>
          </div>
          
          {index < process.steps.length - 1 && (
            <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2">
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  </div>
);

// Reusable Comparison Component - enhanced version
const CellTypeComparison = ({ epithelial, mesenchymal }: {
  epithelial: any;
  mesenchymal: any;
}) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
      Epithelial vs Mesenchymal Characteristics
    </h3>
    
    <div className="grid md:grid-cols-2 gap-8">
      {/* Epithelial */}
      <motion.div
        className="border-2 border-blue-200 bg-blue-50 rounded-lg p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
          <h4 className="text-lg font-semibold text-slate-900">{epithelial.name}</h4>
        </div>
        
        <div className="space-y-4 text-sm">
          <div>
            <strong className="text-slate-800">Morphology:</strong>
            <p className="text-slate-600">{epithelial.morphology}</p>
          </div>
          <div>
            <strong className="text-slate-800">Function:</strong>
            <p className="text-slate-600">{epithelial.function}</p>
          </div>
          <div>
            <strong className="text-slate-800">Location:</strong>
            <p className="text-slate-600">{epithelial.location}</p>
          </div>
          <div>
            <strong className="text-slate-800">Key Markers:</strong>
            <div className="flex flex-wrap gap-1 mt-1">
              {epithelial.markers.map((marker: string) => (
                <span key={marker} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {marker}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mesenchymal */}
      <motion.div
        className="border-2 border-orange-200 bg-orange-50 rounded-lg p-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center mb-4">
          <div className="w-4 h-4 rounded-full bg-orange-500 mr-3"></div>
          <h4 className="text-lg font-semibold text-slate-900">{mesenchymal.name}</h4>
        </div>
        
        <div className="space-y-4 text-sm">
          <div>
            <strong className="text-slate-800">Morphology:</strong>
            <p className="text-slate-600">{mesenchymal.morphology}</p>
          </div>
          <div>
            <strong className="text-slate-800">Function:</strong>
            <p className="text-slate-600">{mesenchymal.function}</p>
          </div>
          <div>
            <strong className="text-slate-800">Capabilities:</strong>
            <ul className="text-slate-600 list-disc list-inside">
              {mesenchymal.capabilities.map((capability: string, index: number) => (
                <li key={index} className="text-xs">{capability}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong className="text-slate-800">Key Markers:</strong>
            <div className="flex flex-wrap gap-1 mt-1">
              {mesenchymal.markers.map((marker: string) => (
                <span key={marker} className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                  {marker}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>

    {/* EMT Arrow */}
    <div className="flex justify-center my-6">
      <motion.div
        className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-orange-100 px-4 py-2 rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
      >
        <RefreshCw className="w-5 h-5 text-slate-600" />
        <span className="text-sm font-medium text-slate-700">EMT ⇄ MET</span>
      </motion.div>
    </div>
  </div>
);

// Reusable Factor Grid - can be used for any list of factors/triggers
const FactorGrid = ({ factors, title, subtitle }: {
  factors: any[];
  title: string;
  subtitle?: string;
}) => (
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h3 className="text-xl font-semibold text-slate-900 mb-4">{title}</h3>
    {subtitle && <p className="text-slate-600 mb-6">{subtitle}</p>}
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {factors.map((factor: any, index: number) => (
        <motion.div
          key={factor.factor}
          className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h4 className="font-semibold text-slate-900 mb-2">{factor.factor}</h4>
          <div className="space-y-2 text-sm">
            <p><strong className="text-slate-700">Source:</strong> <span className="text-slate-600">{factor.source}</span></p>
            <p><strong className="text-slate-700">Mechanism:</strong> <span className="text-slate-600">{factor.mechanism}</span></p>
            <p><strong className="text-slate-700">Effect:</strong> <span className="text-slate-600">{factor.effect}</span></p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const EmtInvasionSection: React.FC = () => {
  const { 
    introduction, 
    goVsGrowConcept, 
    emtProcess, 
    invasionMechanisms 
  } = emtInvasionData;

  return (
    <div className="space-y-12">
      <SectionHeader
        title="EMT, Local Invasion & Intravasation"
        subtitle="Understanding how cancer cells gain motility, invade surrounding tissues, and enter the circulation"
        color="green"
      />

      {/* Introduction with Key Points */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center mb-6">
          <Target className="w-8 h-8 text-green-600 mr-3" />
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
              <Zap className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
              <p className="text-slate-700">{point}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Go vs Grow Concept - Using Reusable ConceptCard Grid */}
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-slate-800 mb-2">{goVsGrowConcept.title}</h3>
          <p className="text-slate-600">{goVsGrowConcept.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {goVsGrowConcept.normalCellStates.map((state, index) => (
            <ConceptCard
              key={state.state}
              title={state.state}
              description={`
                <strong>${state.description}</strong><br/><br/>
                <strong>Characteristics:</strong><br/>
                ${state.characteristics.map((char: string) => `• ${char}`).join('<br/>')}
              `}
              color={index === 0 ? 'green' : index === 1 ? 'blue' : 'purple'}
              index={index}
            />
          ))}
        </div>

        {/* Cancer Modification */}
        <motion.div
          className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h4 className="text-lg font-semibold text-red-800 mb-4">{goVsGrowConcept.cancerModification.title}</h4>
          <p className="text-slate-700 mb-4">{goVsGrowConcept.cancerModification.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goVsGrowConcept.cancerModification.keyInsights.map((insight, index) => (
              <div key={index} className="flex items-center text-slate-700">
                <ArrowRight className="w-4 h-4 text-red-500 mr-2 flex-shrink-0" />
                <span className="text-sm">{insight}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* EMT Process - Using Reusable CellTypeComparison */}
      <CellTypeComparison 
        epithelial={emtProcess.epithelialCharacteristics}
        mesenchymal={emtProcess.mesenchymalCharacteristics}
      />

      {/* EMT Inducers - Using Reusable FactorGrid */}
      <FactorGrid
        factors={emtProcess.emtInducers.factors}
        title={emtProcess.emtInducers.title}
        subtitle={emtProcess.emtInducers.description}
      />

      {/* MET Reversibility */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <div className="flex items-center mb-4">
          <RefreshCw className="w-6 h-6 text-green-600 mr-3" />
          <h3 className="text-xl font-semibold text-slate-900">{emtProcess.metReversibility.title}</h3>
        </div>
        <p className="text-slate-700 mb-4">{emtProcess.metReversibility.description}</p>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-green-800">
            <strong>Clinical Insight:</strong> {emtProcess.metReversibility.clinicalRelevance}
          </p>
        </div>
      </motion.div>

      {/* Migration Process - Using Reusable ProcessSteps */}
      <ProcessSteps
        process={invasionMechanisms.migrationProcess}
        title={invasionMechanisms.migrationProcess.title}
        subtitle={invasionMechanisms.migrationProcess.description}
      />

      {/* Intravasation Process - Using Reusable ProcessSteps */}
      <ProcessSteps
        process={invasionMechanisms.intravasation}
        title={invasionMechanisms.intravasation.title}
        subtitle={invasionMechanisms.intravasation.description}
      />

      {/* Active vs Passive Intravasation - Using Reusable Comparison */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          {invasionMechanisms.intravasation.intravasationModes.title}
        </h3>
        <p className="text-slate-600 mb-6">
          {invasionMechanisms.intravasation.intravasationModes.description}
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Active Intravasation */}
          <motion.div
            className="border-2 border-red-200 bg-red-50 rounded-lg p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-3"></div>
              <h4 className="text-lg font-semibold text-slate-900">
                {invasionMechanisms.intravasation.intravasationModes.activeMode.name}
              </h4>
            </div>
            <p className="text-slate-700 text-sm mb-4">
              {invasionMechanisms.intravasation.intravasationModes.activeMode.description}
            </p>
            <div className="space-y-2">
              {invasionMechanisms.intravasation.intravasationModes.activeMode.characteristics.map((char: string, index: number) => (
                <div key={index} className="flex items-center text-slate-700 text-sm">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></span>
                  {char}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Passive Intravasation */}
          <motion.div
            className="border-2 border-blue-200 bg-blue-50 rounded-lg p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 rounded-full bg-blue-500 mr-3"></div>
              <h4 className="text-lg font-semibold text-slate-900">
                {invasionMechanisms.intravasation.intravasationModes.passiveMode.name}
              </h4>
            </div>
            <p className="text-slate-700 text-sm mb-4">
              {invasionMechanisms.intravasation.intravasationModes.passiveMode.description}
            </p>
            <div className="space-y-2">
              {invasionMechanisms.intravasation.intravasationModes.passiveMode.characteristics.map((char: string, index: number) => (
                <div key={index} className="flex items-center text-slate-700 text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                  {char}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Vessel Targets - Using Reusable Comparison Pattern */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          {invasionMechanisms.intravasation.vesselTargets.title}
        </h3>
        <p className="text-slate-600 mb-6">
          {invasionMechanisms.intravasation.vesselTargets.description}
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Blood Vessels */}
          <motion.div
            className="border-2 border-purple-200 bg-purple-50 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 rounded-full bg-purple-500 mr-3"></div>
              <h4 className="text-lg font-semibold text-slate-900">
                {invasionMechanisms.intravasation.vesselTargets.bloodVessels.type}
              </h4>
            </div>
            <p className="text-slate-700 text-sm mb-4">
              {invasionMechanisms.intravasation.vesselTargets.bloodVessels.description}
            </p>
            <div className="space-y-3">
              <div>
                <strong className="text-slate-800 text-sm">Characteristics:</strong>
                <div className="mt-1 space-y-1">
                  {invasionMechanisms.intravasation.vesselTargets.bloodVessels.characteristics.map((char: string, index: number) => (
                    <div key={index} className="flex items-center text-slate-600 text-xs">
                      <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2 flex-shrink-0"></span>
                      {char}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <strong className="text-slate-800 text-sm">Challenges:</strong>
                <div className="mt-1 space-y-1">
                  {invasionMechanisms.intravasation.vesselTargets.bloodVessels.challenges.map((challenge: string, index: number) => (
                    <div key={index} className="flex items-center text-slate-600 text-xs">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2 flex-shrink-0"></span>
                      {challenge}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lymphatic Vessels */}
          <motion.div
            className="border-2 border-teal-200 bg-teal-50 rounded-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 rounded-full bg-teal-500 mr-3"></div>
              <h4 className="text-lg font-semibold text-slate-900">
                {invasionMechanisms.intravasation.vesselTargets.lymphaticVessels.type}
              </h4>
            </div>
            <p className="text-slate-700 text-sm mb-4">
              {invasionMechanisms.intravasation.vesselTargets.lymphaticVessels.description}
            </p>
            <div className="space-y-3">
              <div>
                <strong className="text-slate-800 text-sm">Characteristics:</strong>
                <div className="mt-1 space-y-1">
                  {invasionMechanisms.intravasation.vesselTargets.lymphaticVessels.characteristics.map((char: string, index: number) => (
                    <div key={index} className="flex items-center text-slate-600 text-xs">
                      <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-2 flex-shrink-0"></span>
                      {char}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <strong className="text-slate-800 text-sm">Challenges:</strong>
                <div className="mt-1 space-y-1">
                  {invasionMechanisms.intravasation.vesselTargets.lymphaticVessels.challenges.map((challenge: string, index: number) => (
                    <div key={index} className="flex items-center text-slate-600 text-xs">
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2 flex-shrink-0"></span>
                      {challenge}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ECM Paradox */}
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center mb-6">
          <Scissors className="w-6 h-6 text-orange-600 mr-3" />
          <h3 className="text-xl font-semibold text-slate-900">{invasionMechanisms.ecmParadox.title}</h3>
        </div>
        <p className="text-slate-600 mb-6">{invasionMechanisms.ecmParadox.description}</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          {invasionMechanisms.ecmParadox.dualRole.map((role: any, index: number) => (
            <motion.div
              key={role.aspect}
              className="p-4 border border-slate-200 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 + index * 0.1 }}
            >
              <h4 className="font-semibold text-slate-900 mb-2">{role.aspect}</h4>
              <p className="text-slate-700 text-sm mb-2">{role.description}</p>
              <p className="text-slate-600 text-xs italic">{role.mechanism}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div
        className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-lg border border-green-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        <div className="flex items-center mb-4">
          <Users className="w-6 h-6 text-green-600 mr-3" />
          <h3 className="text-xl font-semibold text-green-800">Clinical Implications</h3>
        </div>
        <div className="space-y-4 text-slate-700">
          <p>
            EMT, local invasion, and intravasation represent the critical early steps in cancer 
            metastasis that transform a localized tumor into a systemic disease. Understanding these 
            interconnected processes has revolutionized our approach to cancer prevention and treatment.
          </p>
          <div className="bg-white/70 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-800 font-medium">
              <strong>Therapeutic Insight:</strong> Targeting the EMT-invasion-intravasation cascade 
              offers multiple intervention points, from TGF-β inhibitors and MMP blockers to 
              anti-angiogenic agents that normalize tumor vasculature and reduce passive intravasation.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmtInvasionSection; 