import React, { useState } from 'react';
import { CheckCircle, AlertCircle, XCircle, RotateCcw } from 'lucide-react';

// A type definition for a generated biological asset.
export interface GeneratedSequence {
  id: string;
  name: string;
  type: 'guide_rna' | 'hdr_template' | 'protein' | 'promoter';
  sequence: string;
  description: string;
}

// A type definition for a validation test performed on an asset.
export interface ValidationTest {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'running' | 'pass' | 'warning' | 'fail';
  threshold: number;
  duration: number;
  score?: number;
  details?: string;
}

// Default assets for demonstration of the Zeta Forge's power.
const defaultSequences: GeneratedSequence[] = [
  {
    id: 'guide_001',
    name: 'BRCA1-Annihilator-g001',
    type: 'guide_rna',
    sequence: 'GTTCCAGAACCTGAAAGCTG',
    description: 'Genetic Warhead designed for precision annihilation of BRCA1 exon 11.'
  },
  {
    id: 'hdr_001',
    name: 'CFTR-Correction-Tmpl-v1',
    type: 'hdr_template',
    sequence: 'ATCGATCGATCG...4000bp...GCTAGCTAGCTA',
    description: 'Flawless correction template for the CFTR ΔF508 defect with 4kb flanking arms.'
  },
  {
    id: 'protein_001',
    name: 'PD-L1-Neutralizer-Nb001',
    type: 'protein',
    sequence: 'MDSKGSSQKGSRLLLLLVVSNLLLCQGVVSTPVCPNG...',
    description: 'Engineered nanobody weapon for neutralizing the PD-L1 immune checkpoint.'
  },
  {
    id: 'promoter_001',
    name: 'HepatoGuard-Promoter-v1',
    type: 'promoter',
    sequence: 'TATAAAAGGCGCGCCGATCGATCGATC...',
    description: 'Stealth promoter for activating therapeutics exclusively in liver cells.'
  }
];

// This function returns the appropriate validation gauntlet for a given asset type.
const getValidationTests = (sequence: GeneratedSequence): ValidationTest[] => {
  switch (sequence.type) {
    case 'guide_rna':
      return [
        {
          id: 'target_destruction_probability',
          name: 'Target Destruction Probability',
          description: 'Predicted probability of successful gene annihilation at the target site.',
          status: 'pending',
          threshold: 0.8,
          duration: 1500
        },
        {
          id: 'collateral_damage_assessment',
          name: 'Collateral Damage Assessment',
          description: 'Genome-wide scan for unacceptable collateral damage.',
          status: 'pending',
          threshold: 2, // Maximum acceptable off-targets
          duration: 2500
        },
        {
          id: 'target_lock_on',
          name: 'Target Lock-On',
          description: 'Confirmation of successful lock-on to the target sequence.',
          status: 'pending',
          threshold: 0.9,
          duration: 1000
        },
        {
          id: 'warhead_stability',
          name: 'Warhead Stability',
          description: 'Analysis of the warhead’s structural integrity.',
          status: 'pending',
          threshold: 0.6, // Optimal GC content range
          duration: 800
        }
      ];
    case 'hdr_template':
      return [
        {
          id: 'correction_arm_integrity',
          name: 'Correction Arm Integrity',
          description: 'Quality and length of flanking arms to ensure perfect integration.',
          status: 'pending',
          threshold: 0.85,
          duration: 2000
        },
        {
          id: 'correction_success_rate',
          name: 'Correction Success Rate',
          description: 'Predicted probability of a successful, flawless genetic correction.',
          status: 'pending',
          threshold: 0.7,
          duration: 2200
        },
        {
          id: 'genomic_stability_scan',
          name: 'Genomic Stability Scan',
          description: 'Scan for dangerous repeat elements that could cause instability.',
          status: 'pending',
          threshold: 0.1, // Max allowed repeat content
          duration: 1800
        },
        {
          id: 'template_fold_integrity',
          name: 'Template Fold Integrity',
          description: 'Analysis to prevent the template from folding incorrectly and failing.',
          status: 'pending',
          threshold: 0.2, // Max predicted secondary structure
          duration: 1600
        }
      ];
    case 'protein':
      return [
        {
          id: 'target_neutralization_strength',
          name: 'Target Neutralization Strength',
          description: 'Predicted strength of the bond to the enemy target protein.',
          status: 'pending',
          threshold: 0.8,
          duration: 2500
        },
        {
          id: 'weapon_durability',
          name: 'Weapon Durability',
          description: 'Analysis of the protein weapon’s structural integrity and lifespan.',
          status: 'pending',
          threshold: 0.75,
          duration: 2000
        },
        {
          id: 'stealth_profile_assessment',
          name: 'Stealth Profile Assessment',
          description: 'Scan for signatures that could alert the host immune system.',
          status: 'pending',
          threshold: 0.3, // Max immunogenicity score
          duration: 1800
        },
        {
          id: 'production_yield',
          name: 'Production Yield',
          description: 'Predicted production yield in a cellular factory.',
          status: 'pending',
          threshold: 0.7,
          duration: 1500
        }
      ];
    case 'promoter':
      return [
        {
          id: 'targeting_system_specificity',
          name: 'Targeting System Specificity',
          description: 'Predicted activation exclusively in the designated target tissue.',
          status: 'pending',
          threshold: 0.85,
          duration: 2200
        },
        {
          id: 'activation_potency',
          name: 'Activation Potency',
          description: 'Predicted strength of therapeutic gene activation.',
          status: 'pending',
          threshold: 0.8,
          duration: 2000
        },
        {
          id: 'friendly_fire_risk',
          name: 'Friendly Fire Risk',
          description: 'Analysis of unacceptable activation in non-target tissues.',
          status: 'pending',
          threshold: 0.05, // Max leakage
          duration: 1800
        },
        {
          id: 'command_control_integrity',
          name: 'Command & Control Integrity',
          description: 'Validation of all required genetic switches for proper function.',
          status: 'pending',
          threshold: 0.9,
          duration: 1600
        }
      ];
    default:
      return [];
  }
};

const InSilicoValidation = ({ sequences = [], onValidationComplete }: { sequences?: GeneratedSequence[], onValidationComplete?: (tests: ValidationTest[]) => void }) => {
  const [selectedSequence, setSelectedSequence] = useState<GeneratedSequence | null>(null);
  const [validationTests, setValidationTests] = useState<ValidationTest[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTest, setCurrentTest] = useState(0);

  const displaySequences = sequences.length > 0 ? sequences : defaultSequences;

  const generateTestDetails = (test: ValidationTest, score: number): string => {
    switch (test.id) {
      case 'target_destruction_probability':
        return `Predicted gene annihilation probability: ${(score * 100).toFixed(1)}%. High lethality expected.`;
      case 'collateral_damage_assessment':
        const off_targets = Math.floor((1 - score) * 5);
        return `${off_targets} potential collateral strikes identified. ${off_targets <= test.threshold ? 'Acceptable risk.' : 'Review required.'}`;
      case 'target_neutralization_strength':
        return `Predicted Kd: ${(1 / (score + 0.1)).toFixed(2)} nM. Superior target affinity predicted.`;
      case 'stealth_profile_assessment':
        return `Immunogenicity risk score: ${score.toFixed(2)}. ${score < test.threshold ? 'Low' : 'Moderate'} risk profile detected.`;
      case 'targeting_system_specificity':
        return `${(score * 100).toFixed(1)}% tissue specificity. Minimal friendly fire expected.`;
      default:
        return `Score: ${(score * 100).toFixed(1)}%. ${score >= test.threshold ? 'Passes' : 'Below'} threshold.`;
    }
  };

  const runValidation = async (sequence: GeneratedSequence) => {
    if (isRunning) return;
    const initialTests = getValidationTests(sequence);
    setSelectedSequence(sequence);
    setValidationTests(initialTests);
    setIsRunning(true);
    setCurrentTest(0);

    setTimeout(() => {
      const validationElement = document.getElementById('validation-results');
      if (validationElement) {
        validationElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 300);

    let currentResults = [...initialTests];

    for (let i = 0; i < initialTests.length; i++) {
      setCurrentTest(i);
      
      currentResults = currentResults.map((test, idx) => 
        idx === i ? { ...test, status: 'running' } : test
      );
      setValidationTests(currentResults);

      await new Promise(resolve => setTimeout(resolve, initialTests[i].duration));

      const score = 0.5 + Math.random() * 0.5; // Random score between 0.5-1.0
      const threshold = initialTests[i].threshold;
      const status: ValidationTest['status'] = score >= threshold ? 'pass' :
                     score >= threshold * 0.8 ? 'warning' : 'fail';
      const details = generateTestDetails(initialTests[i], score);
      
      const result: ValidationTest = { ...initialTests[i], status, score, details };
      
      currentResults = currentResults.map((test, idx) =>
        idx === i ? result : test
      );
      setValidationTests(currentResults);
    }

    setIsRunning(false);
    if (onValidationComplete) {
      onValidationComplete(currentResults);
    }
  };

  const resetValidation = () => {
    setSelectedSequence(null);
    setValidationTests([]);
    setIsRunning(false);
    setCurrentTest(0);
  };

  const getStatusIcon = (status: ValidationTest['status']) => {
    switch (status) {
      case 'pass': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'fail': return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running': return <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      default: return <div className="w-5 h-5 border-2 border-slate-400 rounded-full" />;
    }
  };

  const getSequenceTypeIcon = (type: GeneratedSequence['type']) => {
    switch (type) {
      case 'guide_rna': return '🎯';
      case 'hdr_template': return '🔧';
      case 'protein': return '🧬';
      case 'promoter': return '⚡';
      default: return '🧪';
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-8 bg-slate-900 text-white">
      <div className="text-center space-y-4">
        <h2 className="font-bold text-3xl md:text-4xl">
          🛡️ Zeta Forge: Asset Validation
        </h2>
        <p className="text-slate-300 max-w-3xl mx-auto text-lg">
          Comprehensive in-silico validation of generated biological assets. Each asset undergoes a rigorous gauntlet of tests for functionality, safety, and performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displaySequences.map((sequence) => (
          <div
            key={sequence.id}
            className={`group cursor-pointer bg-slate-800 border-2 rounded-xl p-4 transition-all duration-300 hover:shadow-lg flex flex-col justify-between ${
              selectedSequence?.id === sequence.id 
                ? 'border-blue-500 shadow-blue-500/20' 
                : 'border-slate-700 hover:border-blue-600'
            }`}
            onClick={() => runValidation(sequence)}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">{getSequenceTypeIcon(sequence.type)}</div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    {sequence.name}
                  </h3>
                  <p className="text-slate-400 capitalize text-xs">
                    {sequence.type.replace('_', ' ')}
                  </p>
                </div>
              </div>
              <p className="text-slate-300 mb-3 text-sm">
                {sequence.description}
              </p>
              <div className="bg-slate-900 rounded p-2 mb-4">
                <code className="text-green-400 font-mono text-xs break-all">
                  {sequence.sequence.length > 40 
                    ? `${sequence.sequence.substring(0, 40)}...`
                    : sequence.sequence
                  }
                </code>
              </div>
            </div>
            <div className="text-center mt-auto">
              {selectedSequence?.id === sequence.id && isRunning ? (
                <div className="flex items-center justify-center gap-2 text-blue-400 h-10">
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-medium text-sm">Validating...</span>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-200 h-10 flex items-center justify-center">
                  <span className="text-sm">🔬 Validate Asset</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {validationTests.length > 0 && (
        <div id="validation-results" className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="font-bold text-white text-2xl">
                Validation Gauntlet: {selectedSequence?.name}
              </h3>
              <p className="text-slate-400 text-base">
                {selectedSequence?.description}
              </p>
            </div>
            <button
              onClick={resetValidation}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          <div className="space-y-4">
            {validationTests.map((test, i) => (
              <div
                key={test.id}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-300 ${
                  test.status === 'running' ? 'bg-blue-900/20 border-blue-500/50' 
                  : test.status === 'pass' ? 'bg-green-900/20 border-green-500/50'
                  : test.status === 'warning' ? 'bg-yellow-900/20 border-yellow-500/50'
                  : test.status === 'fail' ? 'bg-red-900/20 border-red-500/50'
                  : 'bg-slate-700/30 border-slate-600/50'
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(test.status)}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1">
                    <h4 className="font-semibold text-white text-base">
                      {test.name}
                    </h4>
                    {test.score !== undefined && (
                      <div className="flex items-center gap-2 mt-1 sm:mt-0">
                        <span className={`font-mono text-sm ${
                          test.status === 'pass' ? 'text-green-400' :
                          test.status === 'warning' ? 'text-yellow-400' :
                          test.status === 'fail' ? 'text-red-400' : 'text-slate-400'
                        }`}>
                          {(test.score * 100).toFixed(1)}%
                        </span>
                        <span className="text-slate-500 text-xs">
                          (Threshold: ≥{(test.threshold * 100).toFixed(0)}%)
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-slate-400 mb-2 text-sm">
                    {test.description}
                  </p>
                  {test.details && (
                    <p className="text-slate-300 text-sm bg-slate-900/30 p-2 rounded">
                      {test.details}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {!isRunning && validationTests.every(t => t.status !== 'pending' && t.status !== 'running') && (
            <div className="mt-6 p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
              <h4 className="font-semibold text-white mb-2 text-base">
                Validation Summary
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {validationTests.filter(t => t.status === 'pass').length}
                  </div>
                  <div className="text-green-300 text-sm">Passed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {validationTests.filter(t => t.status === 'warning').length}
                  </div>
                  <div className="text-yellow-300 text-sm">Warnings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-400">
                    {validationTests.filter(t => t.status === 'fail').length}
                  </div>
                  <div className="text-red-300 text-sm">Failed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-400">
                    {validationTests.length}
                  </div>
                  <div className="text-slate-300 text-sm">Total Tests</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Main App component to render the validation tool
export default function App() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <InSilicoValidation />
      </div>
    </div>
  );
}
