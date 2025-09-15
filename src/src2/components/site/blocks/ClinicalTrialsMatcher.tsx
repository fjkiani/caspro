import React from 'react';
import { Search, CheckCircle, AlertCircle, XCircle, FileText } from 'lucide-react';

interface TrialMatch {
  title: string;
  rationale: string;
}

interface ClinicalTrialsMatcherProps {
  title?: string;
  subtitle?: string;
  workflow?: string[];
  output?: {
    likely: TrialMatch[];
    potential: TrialMatch[];
    unlikely: TrialMatch[];
  };
}

const getLikelihoodIcon = (likelihood: string) => {
  switch (likelihood) {
    case 'likely': return CheckCircle;
    case 'potential': return AlertCircle;
    case 'unlikely': return XCircle;
    default: return Search;
  }
};

const getLikelihoodColor = (likelihood: string) => {
  switch (likelihood) {
    case 'likely': return 'text-green-400 border-green-400 bg-green-900/20';
    case 'potential': return 'text-yellow-400 border-yellow-400 bg-yellow-900/20';
    case 'unlikely': return 'text-red-400 border-red-400 bg-red-900/20';
    default: return 'text-gray-400 border-gray-400 bg-gray-900/20';
  }
};

const ClinicalTrialsMatcher: React.FC<ClinicalTrialsMatcherProps> = ({
  title = "Clinical Trials Co-Pilot",
  subtitle = "From pathway insights to trial matches in minutes",
  workflow = [
    "Parse variant profile",
    "Match pathway signatures", 
    "Rank trial relevance",
    "Generate one-pager summary"
  ],
  output = {
    likely: [],
    potential: [],
    unlikely: []
  }
}) => {
  return (
    <div className="w-full bg-slate-800/50 rounded-2xl border border-slate-700 p-8">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-slate-200 mb-2">{title}</h3>
        <p className="text-lg text-slate-400">{subtitle}</p>
      </div>
      
      {/* Workflow Steps */}
      <div className="mb-8">
        <h4 className="text-xl font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Search size={20} />
          Workflow Steps
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {workflow.map((step, index) => (
            <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
              <div className="text-2xl font-bold text-cyan-400 mb-2">
                {index + 1}
              </div>
              <p className="text-sm text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Trial Matches */}
      <div className="space-y-6">
        {Object.entries(output).map(([likelihood, trials]) => {
          const Icon = getLikelihoodIcon(likelihood);
          const colors = getLikelihoodColor(likelihood);
          
          if (trials.length === 0) return null;
          
          return (
            <div key={likelihood} className={`border rounded-xl p-6 ${colors}`}>
              <div className="flex items-center gap-3 mb-4">
                <Icon size={24} className={colors.split(' ')[0]} />
                <h4 className="text-xl font-semibold text-slate-200 capitalize">
                  {likelihood} Matches
                </h4>
              </div>
              
              <div className="space-y-3">
                {trials.map((trial, index) => (
                  <div key={index} className="bg-slate-900/30 rounded-lg p-4">
                    <h5 className="font-medium text-slate-200 mb-2">{trial.title}</h5>
                    <p className="text-sm text-slate-300">{trial.rationale}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Export Action */}
      <div className="mt-8 flex items-center justify-between p-4 bg-slate-900/50 rounded-lg border border-slate-600">
        <div>
          <p className="text-slate-200 font-medium">Ready to Share</p>
          <p className="text-sm text-slate-400">Generate one-pager with rationale and citations</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-white font-medium transition-colors">
          <FileText size={16} />
          Export Dossier
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-600">
        <p className="text-xs text-slate-400 text-center">
          <span className="font-medium">Research Use Only:</span> Trial matches based on pathway analysis. 
          Always consult with clinical teams and verify eligibility criteria.
        </p>
      </div>
    </div>
  );
};

export default ClinicalTrialsMatcher;
