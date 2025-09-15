import React from 'react';
import { FileCheck, Shield, Globe, Lock, BarChart3, FileClock, Workflow, CheckCircle } from 'lucide-react';

interface ComplianceAuditData {
  title?: string;
  standards: {
    title: string;
    items: Array<{
      title: string;
      subtitle: string;
      icon?: string;
    }>;
  };
  dashboard: {
    title: string;
    items: Array<{
      label: string;
      value: string;
      color?: string;
    }>;
    export: {
      title: string;
      text: string;
      icon?: string;
    };
  };
  advantages: Array<{
    title: string;
    text: string;
    icon?: string;
  }>;
}

interface ComplianceAuditContentProps {
  data: ComplianceAuditData;
  layout: 'full' | 'split' | 'centered' | 'sidebar' | 'grid' | 'timeline';
}

const ComplianceAuditContent: React.FC<ComplianceAuditContentProps> = ({ data, layout }) => {
  const getContainerClass = () => {
    switch (layout) {
      case 'centered':
        return 'max-w-6xl mx-auto';
      case 'sidebar':
        return 'max-w-sm';
      case 'split':
        return 'max-w-lg';
      default:
        return 'w-full';
    }
  };

  const getStandardIcon = (title: string) => {
    if (title.includes('SOC 2')) {
      return <FileCheck className="w-8 h-8 text-emerald-400" />;
    }
    if (title.includes('HIPAA')) {
      return <Shield className="w-8 h-8 text-emerald-400" />;
    }
    if (title.includes('GDPR')) {
      return <Globe className="w-8 h-8 text-emerald-400" />;
    }
    if (title.includes('ISO')) {
      return <Lock className="w-8 h-8 text-emerald-400" />;
    }
    return <FileCheck className="w-8 h-8 text-emerald-400" />;
  };

  const getAdvantageIcon = (title: string) => {
    if (title.toLowerCase().includes('history') || title.toLowerCase().includes('immutable')) {
      return <FileClock className="w-8 h-8 text-emerald-400" />;
    }
    if (title.toLowerCase().includes('reporting') || title.toLowerCase().includes('automated')) {
      return <Workflow className="w-8 h-8 text-emerald-400" />;
    }
    if (title.toLowerCase().includes('monitoring') || title.toLowerCase().includes('continuous')) {
      return <CheckCircle className="w-8 h-8 text-emerald-400" />;
    }
    return <FileCheck className="w-8 h-8 text-emerald-400" />;
  };

  return (
    <div className={getContainerClass()}>
      {data.title && (
        <h3 className="text-2xl font-bold text-slate-200 mb-8 text-center">{data.title}</h3>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Supported Standards */}
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-emerald-500/30">
          <h4 className="text-2xl font-bold text-emerald-400 mb-6">{data.standards.title}</h4>
          <div className="grid grid-cols-2 gap-4">
            {data.standards.items.map((item, index) => (
              <div key={index} className="bg-slate-900/50 p-4 rounded-lg border border-emerald-500/20 text-center">
                <div className="flex justify-center mb-3">
                  {getStandardIcon(item.title)}
                </div>
                <h5 className="font-semibold text-slate-200 mb-1">{item.title}</h5>
                <p className="text-xs text-slate-400">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Real-Time Audit Dashboard */}
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-emerald-500/30">
          <h4 className="text-2xl font-bold text-emerald-400 mb-6">{data.dashboard.title}</h4>
          <div className="space-y-4">
            {data.dashboard.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <span className="text-slate-300">{item.label}</span>
                <span className="text-emerald-400 font-mono font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <span className="font-semibold text-emerald-400">{data.dashboard.export.title}</span>
            </div>
            <p className="text-slate-300 text-sm">{data.dashboard.export.text}</p>
          </div>
        </div>
      </div>

      {/* Compliance Advantages */}
      <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-8 rounded-2xl border border-emerald-500/50">
        <h4 className="text-2xl font-bold text-emerald-400 mb-6 text-center">The Compliance Advantage</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.advantages.map((advantage, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">
                {getAdvantageIcon(advantage.title)}
              </div>
              <h5 className="font-semibold text-slate-200 mb-2">{advantage.title}</h5>
              <p className="text-slate-400 text-sm">{advantage.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComplianceAuditContent;
