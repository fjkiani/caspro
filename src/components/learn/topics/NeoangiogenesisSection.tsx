'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Zap, AlertTriangle, Target, ArrowRight, Microscope, Pill } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';

const ProcessStep = ({ step, isActive, onClick, delay = 0 }: {
  step: any;
  isActive: boolean;
  onClick: () => void;
  delay?: number;
}) => (
  <motion.div
    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
      isActive
        ? 'border-red-500 bg-red-50 shadow-lg'
        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
    }`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    onClick={onClick}
  >
    <div className="flex items-center space-x-3">
      <step.icon className={`w-6 h-6 ${isActive ? 'text-red-600' : 'text-gray-500'}`} />
      <div>
        <h4 className="font-semibold text-slate-900">{step.title}</h4>
        <p className="text-sm text-slate-600">{step.description}</p>
      </div>
    </div>
  </motion.div>
);

const HypoxiaVisualization = () => {
  const [selectedPanel, setSelectedPanel] = useState<number>(0);

  const panels = [
    {
      title: "Initial Hypoxic Conditions",
      description: "Tumor cells distant from blood vessels experience oxygen deprivation",
      cells: [
        { type: 'normoxic', count: 3, color: 'bg-red-500', label: 'High O₂' },
        { type: 'moderate', count: 2, color: 'bg-purple-500', label: 'Medium O₂' },
        { type: 'hypoxic', count: 3, color: 'bg-blue-500', label: 'Low O₂' }
      ]
    },
    {
      title: "Vessel Sprouting",
      description: "New blood vessel begins to sprout toward hypoxic cells",
      cells: [
        { type: 'normoxic', count: 4, color: 'bg-red-500', label: 'High O₂' },
        { type: 'moderate', count: 2, color: 'bg-purple-500', label: 'Medium O₂' },
        { type: 'hypoxic', count: 2, color: 'bg-blue-500', label: 'Low O₂' }
      ]
    },
    {
      title: "Restored Oxygenation",
      description: "New vessel delivers oxygen to previously hypoxic tumor cells",
      cells: [
        { type: 'normoxic', count: 7, color: 'bg-red-500', label: 'High O₂' },
        { type: 'moderate', count: 1, color: 'bg-purple-500', label: 'Medium O₂' },
        { type: 'hypoxic', count: 0, color: 'bg-blue-500', label: 'Low O₂' }
      ]
    }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">
        Hypoxia-Driven Neoangiogenesis Process
      </h3>
      
      {/* Panel Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {panels.map((panel, index) => (
          <button
            key={index}
            onClick={() => setSelectedPanel(index)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              selectedPanel === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h4 className="font-semibold text-slate-900 mb-2">Panel {index + 1}</h4>
            <p className="text-sm text-slate-600">{panel.title}</p>
          </button>
        ))}
      </div>

      {/* Visualization */}
      <motion.div
        key={selectedPanel}
        className="bg-slate-50 p-6 rounded-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h4 className="font-semibold text-slate-900 mb-4">
          {panels[selectedPanel].title}
        </h4>
        <p className="text-slate-700 mb-6">{panels[selectedPanel].description}</p>
        
        {/* Cell Visualization */}
        <div className="flex items-center justify-center space-x-8 mb-6">
          {/* Blood Vessel */}
          <div className="flex flex-col items-center">
            <div className="w-4 h-16 bg-red-600 rounded-full mb-2"></div>
            <span className="text-xs text-slate-600">Blood Vessel</span>
          </div>
          
          {/* Cells */}
          <div className="grid grid-cols-4 gap-2">
            {panels[selectedPanel].cells.map((cellType, cellIndex) => (
              Array.from({ length: cellType.count }).map((_, i) => (
                <div
                  key={`${cellType.type}-${i}`}
                  className={`w-6 h-6 rounded-full ${cellType.color}`}
                  title={cellType.label}
                />
              ))
            ))}
          </div>
          
          {selectedPanel === 1 && (
            <div className="flex items-center">
              <ArrowRight className="w-6 h-6 text-red-500" />
              <div className="w-2 h-8 bg-red-400 rounded-full ml-2"></div>
            </div>
          )}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center space-x-6">
          {panels[selectedPanel].cells.map((cellType, index) => (
            cellType.count > 0 && (
              <div key={cellType.type} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-full ${cellType.color}`}></div>
                <span className="text-sm text-slate-600">{cellType.label}</span>
              </div>
            )
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const VasculatureComparison = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">
        Normal vs. Cancer Vasculature
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Normal Vasculature */}
        <div className="text-center">
          <h4 className="font-semibold text-green-700 mb-4">Normal Vasculature</h4>
          <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-4">
            {/* Simplified representation of organized vessels */}
            <svg viewBox="0 0 200 150" className="w-full h-32">
              <path d="M20 75 L180 75" stroke="#16a34a" strokeWidth="4" fill="none" />
              <path d="M50 75 L50 50" stroke="#16a34a" strokeWidth="3" fill="none" />
              <path d="M100 75 L100 50" stroke="#16a34a" strokeWidth="3" fill="none" />
              <path d="M150 75 L150 50" stroke="#16a34a" strokeWidth="3" fill="none" />
              <path d="M50 75 L50 100" stroke="#16a34a" strokeWidth="3" fill="none" />
              <path d="M100 75 L100 100" stroke="#16a34a" strokeWidth="3" fill="none" />
              <path d="M150 75 L150 100" stroke="#16a34a" strokeWidth="3" fill="none" />
            </svg>
          </div>
          <ul className="text-sm text-slate-700 space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Highly organized structure
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Proper cellular organization
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Minimal leakage
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Regulated blood flow
            </li>
          </ul>
        </div>

        {/* Cancer Vasculature */}
        <div className="text-center">
          <h4 className="font-semibold text-red-700 mb-4">Cancer Vasculature</h4>
          <div className="bg-red-50 p-6 rounded-lg border border-red-200 mb-4">
            {/* Simplified representation of disorganized vessels */}
            <svg viewBox="0 0 200 150" className="w-full h-32">
              <path d="M20 75 L180 75" stroke="#dc2626" strokeWidth="4" fill="none" />
              <path d="M40 75 Q60 40 80 70" stroke="#dc2626" strokeWidth="3" fill="none" />
              <path d="M90 75 Q110 110 130 60" stroke="#dc2626" strokeWidth="3" fill="none" />
              <path d="M140 75 Q160 45 180 80" stroke="#dc2626" strokeWidth="3" fill="none" />
              <path d="M70 70 Q90 90 110 50" stroke="#dc2626" strokeWidth="2" fill="none" />
              <circle cx="60" cy="65" r="3" fill="#dc2626" />
              <circle cx="120" cy="85" r="3" fill="#dc2626" />
              <circle cx="160" cy="70" r="3" fill="#dc2626" />
            </svg>
          </div>
          <ul className="text-sm text-slate-700 space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Poorly organized structure
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Abnormal cellular organization
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Leaky vessels
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
              Irregular blood flow
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 p-4 bg-orange-50 border-l-4 border-orange-500 rounded">
        <p className="text-orange-800">
          <strong>Clinical Significance:</strong> The leaky and disorganized nature of tumor vessels 
          provides more routes for cancer cells to enter the bloodstream and metastasize.
        </p>
      </div>
    </div>
  );
};

const TherapeuticApproaches = () => {
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);

  const drugs = [
    {
      id: 'bevacizumab',
      name: 'Bevacizumab (Avastin)',
      target: 'VEGF-A',
      mechanism: 'Monoclonal antibody that binds to and neutralizes VEGF-A',
      cancers: ['Colorectal', 'Lung', 'Kidney', 'Glioblastoma'],
      effectiveness: 'Moderate - extends progression-free survival when combined with chemotherapy',
      limitations: ['Limited overall survival benefit', 'Resistance development', 'Side effects include bleeding and hypertension']
    },
    {
      id: 'sorafenib',
      name: 'Sorafenib (Nexavar)',
      target: 'Multiple kinases including VEGFR',
      mechanism: 'Multi-kinase inhibitor that blocks VEGF receptor signaling',
      cancers: ['Hepatocellular', 'Renal cell', 'Thyroid'],
      effectiveness: 'Moderate - approved for several cancer types',
      limitations: ['Hand-foot syndrome', 'Diarrhea', 'Fatigue', 'Limited efficacy in some patients']
    },
    {
      id: 'sunitinib',
      name: 'Sunitinib (Sutent)',
      target: 'VEGFR, PDGFR, KIT',
      mechanism: 'Multi-targeted receptor tyrosine kinase inhibitor',
      cancers: ['Renal cell', 'GIST', 'Pancreatic neuroendocrine'],
      effectiveness: 'Good - standard of care for several indications',
      limitations: ['Fatigue', 'Diarrhea', 'Hand-foot syndrome', 'Cardiac toxicity']
    }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">
        Anti-Angiogenic Therapies
      </h3>
      
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-900 mb-2">Therapeutic Challenge</h4>
        <p className="text-blue-800 text-sm">
          While stopping neoangiogenesis seems logical, by the time tumors are detected, they already 
          have an established blood supply. Anti-angiogenic drugs are most effective when combined 
          with other therapies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {drugs.map((drug) => (
          <button
            key={drug.id}
            onClick={() => setSelectedDrug(selectedDrug === drug.id ? null : drug.id)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
              selectedDrug === drug.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h4 className="font-semibold text-slate-900 mb-2">{drug.name}</h4>
            <p className="text-sm text-slate-600">Target: {drug.target}</p>
          </button>
        ))}
      </div>

      {selectedDrug && (
        <motion.div
          className="p-6 bg-slate-50 rounded-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {(() => {
            const drug = drugs.find(d => d.id === selectedDrug);
            return drug ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Mechanism of Action</h4>
                  <p className="text-slate-700">{drug.mechanism}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Approved Cancer Types</h4>
                  <div className="flex flex-wrap gap-2">
                    {drug.cancers.map((cancer, index) => (
                      <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {cancer}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Effectiveness</h4>
                  <p className="text-slate-700">{drug.effectiveness}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Limitations</h4>
                  <ul className="list-disc list-inside text-slate-700 space-y-1">
                    {drug.limitations.map((limitation, index) => (
                      <li key={index}>{limitation}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null;
          })()}
        </motion.div>
      )}
    </div>
  );
};

const KeyConcepts = () => {
  const concepts = [
    {
      title: "Vasculogenesis vs. Angiogenesis",
      description: "Vasculogenesis creates new vessels from stem cells (embryonic), while angiogenesis builds from existing vessels (growth, healing, cancer).",
      icon: Heart
    },
    {
      title: "Hypoxia as the Driver",
      description: "Low oxygen conditions in rapidly growing tumors trigger the release of factors that stimulate new blood vessel formation.",
      icon: Zap
    },
    {
      title: "Abnormal Vessel Architecture",
      description: "Tumor-induced vessels are poorly organized, leaky, and provide increased routes for metastatic spread.",
      icon: AlertTriangle
    },
    {
      title: "Therapeutic Targeting",
      description: "Anti-angiogenic drugs like bevacizumab inhibit VEGF signaling but are most effective in combination with other treatments.",
      icon: Target
    }
  ];

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">Key Concepts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {concepts.map((concept, index) => (
          <motion.div
            key={concept.title}
            className="p-4 border border-slate-200 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start space-x-3">
              <concept.icon className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-900 mb-2">{concept.title}</h4>
                <p className="text-slate-700 text-sm">{concept.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const NeoangiogenesisSection: React.FC = () => {
  return (
    <div className="space-y-12">
      <SectionHeader
        title="Neoangiogenesis: Fueling Tumor Growth and Metastasis"
        subtitle="Understanding how tumors hijack blood vessel formation to support their growth and spread"
        color="red"
      />

      {/* Introduction */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">
          Why Tumors Need New Blood Vessels
        </h3>
        <div className="space-y-4 text-slate-700">
          <p>
            Cancer represents uncontrolled cell division. Unlike normal cells that divide infrequently, 
            cancer cells divide constantly, causing tumors to grow rapidly—more quickly than the existing 
            blood supply can support.
          </p>
          <p>
            As tumors outgrow their oxygen and nutrient supply, cancer cells secrete molecules that 
            trigger <strong>neoangiogenesis</strong>—the formation of new blood vessels from existing ones. 
            This process is one of the hallmarks of cancer and is essential for tumor progression.
          </p>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-800 font-medium">
              Critical Point: Neoangiogenesis not only supports tumor growth but also provides 
              more routes for cancer cells to enter the bloodstream and metastasize.
            </p>
          </div>
        </div>
      </div>

      {/* Hypoxia Visualization */}
      <HypoxiaVisualization />

      {/* Vasculature Comparison */}
      <VasculatureComparison />

      {/* Therapeutic Approaches */}
      <TherapeuticApproaches />

      {/* Key Concepts */}
      <KeyConcepts />

      {/* Clinical Implications */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Clinical Implications</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
              <Microscope className="w-5 h-5 mr-2 text-blue-600" />
              Diagnostic Applications
            </h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Imaging angiogenesis to assess tumor aggressiveness
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                VEGF levels as biomarkers for treatment selection
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Monitoring vessel density in tumor biopsies
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
              <Pill className="w-5 h-5 mr-2 text-green-600" />
              Therapeutic Strategies
            </h4>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Combination with chemotherapy for enhanced efficacy
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Timing of anti-angiogenic therapy is crucial
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Resistance mechanisms require ongoing research
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg">
          <p className="text-slate-700 text-center">
            <span className="font-semibold text-red-800">Future Direction:</span> Understanding 
            neoangiogenesis mechanisms is leading to more sophisticated combination therapies 
            that target both tumor cells and their supporting vasculature simultaneously.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NeoangiogenesisSection; 