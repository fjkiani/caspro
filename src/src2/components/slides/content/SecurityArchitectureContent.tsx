import React from 'react';
import { Shield, UserCheck, Fingerprint, Lock, Database, Network, FileCheck } from 'lucide-react';

interface SecurityArchitectureData {
  title?: string;
  layers: Array<{
    title: string;
    technology: string;
    features: string[];
    performance?: string;
    compliance?: string;
    color?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'cyan';
  }>;
  integration?: {
    title: string;
    description: string;
  };
}

interface SecurityArchitectureContentProps {
  data: SecurityArchitectureData;
  layout: 'full' | 'split' | 'centered' | 'sidebar' | 'grid' | 'timeline';
}

const SecurityArchitectureContent: React.FC<SecurityArchitectureContentProps> = ({ data, layout }) => {
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

  const getLayerColor = (color?: string) => {
    switch (color) {
      case 'blue':
        return {
          card: 'bg-gradient-to-br from-blue-500/20 to-blue-600/20',
          border: 'border-blue-500/50',
          text: 'text-blue-400',
          dot: 'bg-blue-400'
        };
      case 'purple':
        return {
          card: 'bg-gradient-to-br from-purple-500/20 to-purple-600/20',
          border: 'border-purple-500/50',
          text: 'text-purple-400',
          dot: 'bg-purple-400'
        };
      case 'green':
        return {
          card: 'bg-gradient-to-br from-green-500/20 to-green-600/20',
          border: 'border-green-500/50',
          text: 'text-green-400',
          dot: 'bg-green-400'
        };
      case 'orange':
        return {
          card: 'bg-gradient-to-br from-orange-500/20 to-orange-600/20',
          border: 'border-orange-500/50',
          text: 'text-orange-400',
          dot: 'bg-orange-400'
        };
      case 'red':
        return {
          card: 'bg-gradient-to-br from-red-500/20 to-red-600/20',
          border: 'border-red-500/50',
          text: 'text-red-400',
          dot: 'bg-red-400'
        };
      case 'cyan':
        return {
          card: 'bg-gradient-to-br from-cyan-500/20 to-cyan-600/20',
          border: 'border-cyan-500/50',
          text: 'text-cyan-400',
          dot: 'bg-cyan-400'
        };
      default:
        return {
          card: 'bg-gradient-to-br from-slate-500/20 to-slate-600/20',
          border: 'border-slate-500/50',
          text: 'text-slate-400',
          dot: 'bg-slate-400'
        };
    }
  };

  const getLayerIcon = (title: string) => {
    if (title.toLowerCase().includes('identity') || title.toLowerCase().includes('auth')) {
      return <UserCheck className="w-8 h-8" />;
    }
    if (title.toLowerCase().includes('asset') || title.toLowerCase().includes('blockchain')) {
      return <Fingerprint className="w-8 h-8" />;
    }
    if (title.toLowerCase().includes('data') || title.toLowerCase().includes('integrity')) {
      return <Database className="w-8 h-8" />;
    }
    if (title.toLowerCase().includes('network') || title.toLowerCase().includes('isolation')) {
      return <Network className="w-8 h-8" />;
    }
    if (title.toLowerCase().includes('compliance') || title.toLowerCase().includes('audit')) {
      return <FileCheck className="w-8 h-8" />;
    }
    return <Shield className="w-8 h-8" />;
  };

  return (
    <div className={getContainerClass()}>
      {data.title && (
        <h3 className="text-2xl font-bold text-slate-200 mb-8 text-center">{data.title}</h3>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {data.layers.map((layer, index) => {
          const colors = getLayerColor(layer.color);
          return (
            <div
              key={index}
              className={`${colors.card} p-6 rounded-2xl border ${colors.border} shadow-lg`}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className={`${colors.text}`}>
                  {getLayerIcon(layer.title)}
                </div>
                <h4 className={`text-xl font-bold ${colors.text}`}>{layer.title}</h4>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-slate-300 font-medium mb-2">Technology:</p>
                <p className="text-slate-200 font-semibold">{layer.technology}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-slate-300 font-medium mb-2">Features:</p>
                <ul className="space-y-2">
                  {layer.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                      <div className={`w-2 h-2 ${colors.dot} rounded-full mt-2 flex-shrink-0`}></div>
                      <span className="text-slate-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {layer.performance && (
                <div className="mb-4 p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                  <p className="text-sm text-slate-300 font-medium mb-1">Performance:</p>
                  <p className="text-slate-200 text-sm">{layer.performance}</p>
                </div>
              )}

              {layer.compliance && (
                <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-600">
                  <p className="text-sm text-slate-300 font-medium mb-1">Compliance:</p>
                  <p className="text-slate-200 text-sm">{layer.compliance}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {data.integration && (
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
          <h4 className="text-xl font-bold text-slate-200 mb-3">{data.integration.title}</h4>
          <p className="text-slate-300">{data.integration.description}</p>
        </div>
      )}
    </div>
  );
};

export default SecurityArchitectureContent;
