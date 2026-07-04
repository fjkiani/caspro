'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, Loader2, ChevronRight, ChevronLeft, Sparkles, Trophy, ArrowRight, Brain } from 'lucide-react';
import { ComparisonScenario, ScenarioQuestion } from '@/data/comparisons/patient-scenarios';
import { queryGPTForScenario } from '@/lib/api/gpt-comparison';
import ThinkingProcessComparison from './ThinkingProcessComparison';

// Simple markdown parser for bold text
function parseMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const lines = text.split('\n');
  
  lines.forEach((line, lineIdx) => {
    // Parse bold text **text**
    const boldRegex = /\*\*(.+?)\*\*/g;
    let lastIndex = 0;
    const lineParts: React.ReactNode[] = [];
    let match;
    
    while ((match = boldRegex.exec(line)) !== null) {
      // Add text before bold
      if (match.index > lastIndex) {
        lineParts.push(line.substring(lastIndex, match.index));
      }
      // Add bold text
      lineParts.push(
        <strong key={`bold-${match.index}`} className="font-bold text-slate-900">
          {match[1]}
        </strong>
      );
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < line.length) {
      lineParts.push(line.substring(lastIndex));
    }
    
    if (lineParts.length > 0) {
      parts.push(
        <React.Fragment key={`line-${lineIdx}`}>
          {lineParts}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    } else if (line.trim()) {
      parts.push(
        <React.Fragment key={`line-${lineIdx}`}>
          {line}
          {lineIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    } else {
      parts.push(<br key={`line-${lineIdx}`} />);
    }
  });
  
  return <>{parts}</>;
}

interface ComparisonShowcaseProps {
  scenario: ComparisonScenario;
  selectedCompetitors?: string[];
}

interface QuestionState {
  gptLoading: boolean;
  gptResponse?: string;
  gptError?: string;
}

const capabilityIcons = {
  full: CheckCircle,
  partial: AlertTriangle,
  none: XCircle,
};

const capabilityColors = {
  full: 'text-green-600',
  partial: 'text-yellow-600',
  none: 'text-red-600',
};

const capabilityBgColors = {
  full: 'bg-green-50 border-green-200',
  partial: 'bg-yellow-50 border-yellow-200',
  none: 'bg-red-50 border-red-200',
};

export default function ComparisonShowcase({ 
  scenario, 
  selectedCompetitors = ['gpt'] 
}: ComparisonShowcaseProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionStates, setQuestionStates] = useState<Record<string, QuestionState>>({});
  const [expandedMoat, setExpandedMoat] = useState<string | null>(null);
  const [showThinkingProcess, setShowThinkingProcess] = useState(false);

  const currentQuestion = scenario.questions[currentQuestionIndex];

  // Fetch GPT response when question changes
  useEffect(() => {
    if (!currentQuestion || questionStates[currentQuestion.id]?.gptResponse) {
      return; // Already fetched or no question
    }

    // Mark as loading
    setQuestionStates(prev => ({
      ...prev,
      [currentQuestion.id]: { gptLoading: true }
    }));

    // Fetch GPT response
    queryGPTForScenario(
      currentQuestion.question,
      currentQuestion.context,
      scenario.patientProfile
    ).then(response => {
      setQuestionStates(prev => ({
        ...prev,
        [currentQuestion.id]: {
          gptLoading: false,
          gptResponse: response.content,
          gptError: response.error
        }
      }));
    }).catch(error => {
      setQuestionStates(prev => ({
        ...prev,
        [currentQuestion.id]: {
          gptLoading: false,
          gptError: error.message
        }
      }));
    });
  }, [currentQuestion?.id, scenario.patientProfile]);

  const currentState = questionStates[currentQuestion.id] || { gptLoading: false };
  const gptResponse = currentState.gptResponse || currentQuestion.responses.gpt.text;
  const crisproResponse = currentQuestion.responses.crispro.text || 
    '[CrisPRO response will be added from other agent]';

  const nextQuestion = () => {
    if (currentQuestionIndex < scenario.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setExpandedMoat(null);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setExpandedMoat(null);
    }
  };

  return (
    <div className="w-full">
      {/* Patient Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-8 border border-purple-200"
      >
        <div className="flex items-start gap-4">
          <div className="text-4xl">👤</div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {scenario.patientProfile.name || 'Patient Profile'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-slate-600">Condition:</span>
                <div className="font-semibold text-slate-900">{scenario.patientProfile.condition}</div>
              </div>
              {scenario.patientProfile.genotype && (
                <div>
                  <span className="text-slate-600">Genotype:</span>
                  <div className="font-semibold text-slate-900">{scenario.patientProfile.genotype}</div>
                </div>
              )}
              {scenario.patientProfile.stage && (
                <div>
                  <span className="text-slate-600">Stage:</span>
                  <div className="font-semibold text-slate-900">{scenario.patientProfile.stage}</div>
                </div>
              )}
              {scenario.patientProfile.age && (
                <div>
                  <span className="text-slate-600">Age:</span>
                  <div className="font-semibold text-slate-900">{scenario.patientProfile.age}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Question Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        
        <div className="text-center">
          <div className="text-sm text-slate-600">Question {currentQuestionIndex + 1} of {scenario.questions.length}</div>
          <div className="text-lg font-semibold text-slate-900 mt-1">
            {currentQuestion.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </div>
        </div>

        <button
          onClick={nextQuestion}
          disabled={currentQuestionIndex === scenario.questions.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="mb-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {currentQuestion.question}
            </h3>
            {currentQuestion.context && (
              <p className="text-slate-600 mb-6 italic">{currentQuestion.context}</p>
            )}
          </div>
          <button
            onClick={() => setShowThinkingProcess(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
          >
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">See How They Think</span>
            <span className="sm:hidden">Think</span>
          </button>
        </div>
      </motion.div>

      {/* Comparison Cards with Winner Indicator */}
      <div className="relative mb-8">
        {/* Winner Arrow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:block">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full p-3 shadow-lg"
          >
            <Trophy className="w-6 h-6" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* GPT Response */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`rounded-xl border-2 p-6 relative ${capabilityBgColors[currentQuestion.responses.gpt.capability]}`}
          >
            {/* "Generic" Badge */}
            <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">
                <AlertTriangle className="w-3 h-3" />
                Generic
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 pr-16">
              <h4 className="text-xl font-bold text-slate-900">GPT/ChatGPT</h4>
              {React.createElement(capabilityIcons[currentQuestion.responses.gpt.capability], {
                className: `${capabilityColors[currentQuestion.responses.gpt.capability]} w-6 h-6`
              })}
            </div>
            
            {currentState.gptLoading ? (
              <div className="flex items-center gap-2 text-slate-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Fetching real GPT response...</span>
              </div>
            ) : currentState.gptError ? (
              <div className="text-red-600 text-sm">
                Error: {currentState.gptError}
              </div>
            ) : (
              <div className="text-slate-700 leading-relaxed">
                {parseMarkdown(gptResponse || 'Loading...')}
              </div>
            )}

            {currentQuestion.responses.gpt.limitations && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="text-xs font-semibold text-slate-600 mb-2">Limitations:</div>
                <ul className="text-xs text-slate-600 space-y-1">
                  {currentQuestion.responses.gpt.limitations.map((limitation, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <XCircle className="w-3 h-3 text-red-500 mt-0.5 flex-shrink-0" />
                      {limitation}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          {/* CrisPRO Response - Winner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-3 border-blue-500 p-6 relative overflow-hidden shadow-lg ring-2 ring-blue-200"
          >
            {/* Winner Badge */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
              <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full text-xs font-bold shadow-md">
                <Trophy className="w-3 h-3" />
                Winner
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                <Sparkles className="w-3 h-3" />
                MOAT
              </div>
            </div>

            <div className="flex items-center justify-between mb-4 pr-28">
              <h4 className="text-xl font-bold text-slate-900">CrisPRO.ai</h4>
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>

            <div className="text-slate-700 mb-4 leading-relaxed font-medium">
              {parseMarkdown(crisproResponse || '[CrisPRO response will be added from other agent]')}
            </div>
            
            {/* MOAT Advantage Score */}
            {currentQuestion.moatPoint && (
              <div className="mt-4 pt-4 border-t border-blue-200 bg-blue-50/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span className="font-semibold text-blue-700">MOAT Advantage:</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-bold">
                    {currentQuestion.id === 'carboplatin-brca1-toxicity' ? '0.90' :
                     currentQuestion.id === 'mbd4-dna-repair' ? '0.88' :
                     currentQuestion.id === 'doxorubicin-cardioprotection' ? '0.85' :
                     currentQuestion.id === 'dpyd-5fu-safety' ? '0.88' :
                     currentQuestion.id === 'nac-mechanism' ? '0.80' :
                     currentQuestion.id === 'treatment-line-intelligence' ? '0.82' : '0.86'}
                  </span>
                  <span className="text-slate-600">out of 1.0</span>
                </div>
              </div>
            )}

            {/* MOAT Capability - Always Visible */}
            {currentQuestion.moatPoint && (
              <div className="mt-4 pt-4 border-t-2 border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💎</div>
                  <div className="flex-1">
                    <div className="font-bold text-blue-900 mb-1">
                      {currentQuestion.moatPoint.title}
                    </div>
                    <div className="text-sm text-slate-700 leading-relaxed">
                      {currentQuestion.moatPoint.explanation}
                      {currentQuestion.moatPoint.evidence && (
                        <a 
                          href={currentQuestion.moatPoint.evidence} 
                          className="text-blue-600 hover:text-blue-800 hover:underline ml-2 font-semibold inline-flex items-center gap-1"
                        >
                          See the evidence
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Question Progress Dots */}
      <div className="flex justify-center gap-2">
        {scenario.questions.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setCurrentQuestionIndex(idx);
              setExpandedMoat(null);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === currentQuestionIndex
                ? 'bg-blue-600 w-8'
                : 'bg-slate-300 hover:bg-slate-400'
            }`}
            aria-label={`Go to question ${idx + 1}`}
          />
        ))}
      </div>

      {/* Thinking Process Modal */}
      {showThinkingProcess && (
        <ThinkingProcessComparison
          question={currentQuestion}
          onClose={() => setShowThinkingProcess(false)}
        />
      )}
    </div>
  );
}
