'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, XCircle, FileText } from 'lucide-react';

interface SafetyCheck {
  id: string;
  type: 'low-complexity' | 'viral' | 'sensitive' | 'junk';
  severity: 'high' | 'medium' | 'low';
  message: string;
  suggestion: string;
}

const mockSafetyChecks: SafetyCheck[] = [
  {
    id: 'check_1',
    type: 'low-complexity',
    severity: 'high',
    message: 'Detected low-complexity repeat: AAAAAAAAAAAAAAAAAAAA',
    suggestion: 'Consider using more diverse sequence patterns'
  },
  {
    id: 'check_2',
    type: 'junk',
    severity: 'medium',
    message: 'Potential junk sequence detected in region 43044290-43044300',
    suggestion: 'Review sequence quality and alignment'
  }
];

const severityColors = {
  high: 'text-red-600 bg-red-50 border-red-200',
  medium: 'text-orange-600 bg-orange-50 border-orange-200',
  low: 'text-yellow-600 bg-yellow-50 border-yellow-200'
};

const severityIcons = {
  high: XCircle,
  medium: AlertTriangle,
  low: CheckCircle
};

const typeLabels = {
  'low-complexity': 'Low Complexity',
  'viral': 'Viral Content',
  'sensitive': 'Sensitive Content',
  'junk': 'Junk Sequence'
};

export const SAESafetyChecker: React.FC = () => {
  const [inputSequence, setInputSequence] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkResults, setCheckResults] = useState<SafetyCheck[]>([]);
  const [showExamples, setShowExamples] = useState(false);

  const exampleSequences = [
    {
      label: 'Low Complexity',
      sequence: 'AAAAAAAAAAAAAAAAAAAA',
      description: 'Homopolymer repeat'
    },
    {
      label: 'Normal Sequence',
      sequence: 'ATCGATCGATCGATCGATCG',
      description: 'Diverse nucleotide sequence'
    },
    {
      label: 'Potential Junk',
      sequence: 'NNNNNNNNNNNNNNNNNNNN',
      description: 'Ambiguous bases'
    }
  ];

  const runSafetyCheck = async () => {
    if (!inputSequence.trim()) return;
    
    setIsChecking(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock safety check logic
    const results: SafetyCheck[] = [];
    
    if (inputSequence.includes('AAAA') || inputSequence.includes('TTTT') || 
        inputSequence.includes('CCCC') || inputSequence.includes('GGGG')) {
      results.push({
        id: 'low_complexity',
        type: 'low-complexity',
        severity: 'high',
        message: 'Detected low-complexity repeat in sequence',
        suggestion: 'Consider using more diverse sequence patterns to avoid pathological attractors'
      });
    }
    
    if (inputSequence.includes('N') || inputSequence.includes('X')) {
      results.push({
        id: 'junk',
        type: 'junk',
        severity: 'medium',
        message: 'Ambiguous bases detected in sequence',
        suggestion: 'Replace ambiguous bases with specific nucleotides for better results'
      });
    }
    
    if (inputSequence.length < 10) {
      results.push({
        id: 'short',
        type: 'junk',
        severity: 'low',
        message: 'Sequence is very short',
        suggestion: 'Consider using longer sequences for more reliable results'
      });
    }
    
    if (results.length === 0) {
      results.push({
        id: 'clean',
        type: 'junk',
        severity: 'low',
        message: 'No safety issues detected',
        suggestion: 'Sequence appears safe for processing'
      });
    }
    
    setCheckResults(results);
    setIsChecking(false);
  };

  const loadExample = (sequence: string) => {
    setInputSequence(sequence);
    setCheckResults([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 shadow-lg border border-slate-200"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900">
            Prompt Safety Checker
          </h3>
        </div>
        <button
          onClick={() => setShowExamples(!showExamples)}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {showExamples ? 'Hide Examples' : 'Show Examples'}
        </button>
      </div>

      {/* Input Area */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Sequence Input:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={inputSequence}
            onChange={(e) => setInputSequence(e.target.value)}
            placeholder="Enter DNA sequence to check..."
            className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={runSafetyCheck}
            disabled={isChecking || !inputSequence.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isChecking ? 'Checking...' : 'Check'}
          </button>
        </div>
      </div>

      {/* Example Sequences */}
      {showExamples && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 p-4 bg-slate-50 rounded-lg"
        >
          <h4 className="text-sm font-medium text-slate-700 mb-3">Example Sequences:</h4>
          <div className="space-y-2">
            {exampleSequences.map((example, index) => (
              <button
                key={index}
                onClick={() => loadExample(example.sequence)}
                className="w-full text-left p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900">{example.label}</div>
                    <div className="text-sm text-slate-600">{example.description}</div>
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    {example.sequence}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Check Results */}
      {checkResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <h4 className="text-sm font-medium text-slate-700">Safety Check Results:</h4>
          {checkResults.map((check, index) => {
            const SeverityIcon = severityIcons[check.severity];
            return (
              <motion.div
                key={check.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`p-4 rounded-lg border ${severityColors[check.severity]}`}
              >
                <div className="flex items-start gap-3">
                  <SeverityIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{typeLabels[check.type]}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        check.severity === 'high' ? 'bg-red-100 text-red-700' :
                        check.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {check.severity.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{check.message}</p>
                    <p className="text-sm font-medium">Suggestion: {check.suggestion}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Safety Statistics */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-slate-900">
            {mockSafetyChecks.length}
          </div>
          <div className="text-xs text-slate-600">Check Types</div>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-green-600">
            {mockSafetyChecks.filter(c => c.severity === 'low').length}
          </div>
          <div className="text-xs text-slate-600">Safe Patterns</div>
        </div>
        <div className="text-center p-3 bg-slate-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">
            {mockSafetyChecks.filter(c => c.severity === 'high').length}
          </div>
          <div className="text-xs text-slate-600">High Risk</div>
        </div>
      </div>

      {/* Key Benefits */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">Key Benefits:</h4>
        <ul className="text-blue-800 text-sm space-y-1">
          <li>• Prevents pathological inputs that could generate junk outputs</li>
          <li>• Flags low-complexity repeats and ambiguous sequences</li>
          <li>• Improves reliability of generative AI demonstrations</li>
          <li>• Provides clear suggestions for sequence improvement</li>
        </ul>
      </div>
    </motion.div>
  );
};
