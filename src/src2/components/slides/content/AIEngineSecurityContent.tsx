import React from 'react';
import { Bot, Lock, Eye, AlertTriangle, CheckCircle, FileCheck, Shield } from 'lucide-react';

interface AIEngineSecurityData {
  title?: string;
  protection: {
    title: string;
    items: Array<{
      title: string;
      text: string;
      icon?: string;
    }>;
  };
  verification: {
    title: string;
    items: Array<{
      label: string;
      status: string;
      statusColor?: 'green' | 'yellow' | 'red' | 'gray';
      description: string;
      metadata: string;
    }>;
  };
  accountability: {
    title: string;
    text: string;
  };
}

interface AIEngineSecurityContentProps {
  data: AIEngineSecurityData;
  layout: 'full' | 'split' | 'centered' | 'sidebar' | 'grid' | 'timeline';
}

const AIEngineSecurityContent: React.FC<AIEngineSecurityContentProps> = ({ data, layout }) => {
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

  const getStatusColor = (statusColor?: string) => {
    switch (statusColor) {
      case 'green':
        return 'text-green-400';
      case 'yellow':
        return 'text-yellow-400';
      case 'red':
        return 'text-red-400';
      case 'gray':
        return 'text-gray-400';
      default:
        return 'text-slate-400';
    }
  };

  const getProtectionIcon = (title: string) => {
    if (title.toLowerCase().includes('isolated') || title.toLowerCase().includes('execution')) {
      return <Lock className="w-6 h-6 text-orange-400" />;
    }
    if (title.toLowerCase().includes('tracking') || title.toLowerCase().includes('real-time')) {
      return <Eye className="w-6 h-6 text-orange-400" />;
    }
    if (title.toLowerCase().includes('access') || title.toLowerCase().includes('control')) {
      return <AlertTriangle className="w-6 h-6 text-orange-400" />;
    }
    return <Shield className="w-6 h-6 text-orange-400" />;
  };

  return (
    <div className={getContainerClass()}>
      {data.title && (
        <h3 className="text-2xl font-bold text-slate-200 mb-8 text-center">{data.title}</h3>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* AI Engine Protection */}
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-orange-500/30">
          <div className="flex items-center space-x-4 mb-6">
            <Bot className="w-8 h-8 text-orange-400" />
            <h4 className="text-2xl font-bold text-orange-400">{data.protection.title}</h4>
          </div>
          
          <div className="space-y-6">
            {data.protection.items.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getProtectionIcon(item.title)}
                </div>
                <div>
                  <h5 className="font-semibold text-slate-200 mb-2">{item.title}</h5>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verifiable AI Operations */}
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-orange-500/30">
          <div className="flex items-center space-x-4 mb-6">
            <FileCheck className="w-8 h-8 text-orange-400" />
            <h4 className="text-2xl font-bold text-orange-400">{data.verification.title}</h4>
          </div>
          
          <div className="space-y-4">
            {data.verification.items.map((item, index) => (
              <div key={index} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300 font-medium">{item.label}</span>
                  <span className={`${getStatusColor(item.statusColor)} font-semibold`}>
                    {item.status}
                  </span>
                </div>
                <p className="text-slate-200 text-sm mb-2">{item.description}</p>
                <p className="text-slate-400 text-xs font-mono">{item.metadata}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Accountability */}
      <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-8 rounded-2xl border border-orange-500/50">
        <div className="flex items-center space-x-4 mb-4">
          <CheckCircle className="w-8 h-8 text-orange-400" />
          <h4 className="text-2xl font-bold text-orange-400">{data.accountability.title}</h4>
        </div>
        <p className="text-slate-300 leading-relaxed">{data.accountability.text}</p>
      </div>
    </div>
  );
};

export default AIEngineSecurityContent;
