'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CoPilotDetailContent } from '@/data/coPilotDetails';
import { motion, AnimatePresence } from 'framer-motion';
import TacticalCapabilityMatrix from './sections/TacticalCapabilityMatrix';
import AdvancedFeaturesSection from './sections/AdvancedFeaturesSection';
import InSilicoWorkflowSection from './sections/InSilicoWorkflowSection';
import ValuePropositionFlywheel from './sections/ValuePropositionFlywheel';
import { TechnologyFoundationSection, CoreCapabilitiesSection } from './sections';
import DemoRequestForm from './DemoRequestForm';

interface CollapsibleTechnicalDetailsProps {
  content: CoPilotDetailContent;
}

export default function CollapsibleTechnicalDetails({ content }: CollapsibleTechnicalDetailsProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Filter capabilities by priority
  const primaryCapabilities = content.keyCapabilities.filter(
    cap => !cap.priority || cap.priority === 'primary'
  );
  const advancedCapabilities = content.keyCapabilities.filter(
    cap => cap.priority === 'advanced'
  );
  
  return (
    <section id="technical" className="mb-16">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-6 bg-slate-50 rounded-lg border-2 border-slate-200 hover:bg-slate-100 hover:border-blue-300 transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">
              Technical Details & Advanced Features
            </h3>
            <p className="text-sm text-slate-600">
              Deep dive into capabilities, technical approach, and advanced features
            </p>
          </div>
          <ChevronDown 
            className={`w-6 h-6 text-slate-600 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} 
          />
        </div>
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 space-y-8 overflow-hidden"
          >
            {/* Combined: Technology Foundation + Core Capabilities in one section */}
            <div className="bg-white rounded-xl p-6 border border-slate-200" id="core-capabilities-section">
              {/* Genomic Use Cases Grid (from Technology Foundation) */}
              {content.genomicUseCasesGrid && content.genomicUseCasesGrid.length > 0 && content.buildsOnStackPoints && content.buildsOnStackPoints.length > 0 && (
                <div className="mb-8">
                  <TechnologyFoundationSection 
                    genomicUseCasesGrid={content.genomicUseCasesGrid}
                    buildsOnStackPoints={content.buildsOnStackPoints}
                    buildsOnStackIntro={content.buildsOnStackIntro}
                  />
                </div>
              )}
              
              {/* Core Capabilities (from CoreCapabilitiesSection) */}
              {content.keyCapabilities.length > 0 && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                  <CoreCapabilitiesSection 
                    keyCapabilities={content.keyCapabilities}
                    totalCapabilities={content.keyCapabilities.length}
                  />
                </div>
              )}
            </div>
            
            {/* Advanced Features */}
            {advancedCapabilities.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <AdvancedFeaturesSection capabilities={advancedCapabilities} />
              </div>
            )}
            
            {/* In-Silico Workflow */}
            {content.inSilicoWorkflow && (
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <InSilicoWorkflowSection workflow={content.inSilicoWorkflow} />
              </div>
            )}
            
            {/* Value Proposition */}
            {content.valuePropositionSections && content.valuePropositionSections.length > 0 && (
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <ValuePropositionFlywheel valuePropositionSections={content.valuePropositionSections} />
              </div>
            )}
            
            {/* Demo Request Form (from Battle Plan tab) */}
            <div className="bg-white rounded-xl p-6 border border-slate-200">
              <DemoRequestForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

