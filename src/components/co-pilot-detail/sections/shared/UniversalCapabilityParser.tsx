import React from 'react';
import { 
  Database, 
  Target, 
  FileText, 
  Settings, 
  Microscope, 
  Briefcase,
  Zap,
  ShieldCheck,
  Activity,
  Users,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Brain,
  Layers,
  BarChart,
  Clock,
  Award,
  Star
} from 'lucide-react';

// Icon mapping for components
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Database,
  Target,
  FileText,
  Settings,
  Microscope,
  Briefcase,
  Zap,
  ShieldCheck,
  Activity,
  Users,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Lightbulb,
  Brain,
  Layers,
  BarChart,
  Clock,
  Award,
  Star
};

/**
 * Extract components from text description
 */
export const extractComponentsFromText = (aspect: any, title: string): any[] => {
  if (typeof aspect === 'string') {
    // Simple parsing - split by sentences and create basic components
    const sentences = aspect.split(/[.!?]+/).filter(s => s.trim().length > 0);
    return sentences.slice(0, 3).map((sentence, index) => ({
      title: `Component ${index + 1}`,
      subtitle: sentence.trim().substring(0, 50) + '...',
      iconName: ['Database', 'Target', 'FileText'][index] || 'Settings',
      color: ['blue', 'teal', 'indigo'][index] || 'blue',
      features: [sentence.trim()]
    }));
  }
  
  if (aspect && typeof aspect === 'object' && aspect.components) {
    return aspect.components;
  }
  
  return [];
};

/**
 * Render universal components
 */
export const renderUniversalComponents = (components: any[], delay: number = 0.2) => {
  if (!components || components.length === 0) {
    return null;
  }

  return components.map((component, index) => {
    const IconComponent = getIconComponent(component.iconName);
    
    return (
      <div
        key={index}
        className="group relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden"
        style={{ animationDelay: `${index * delay}s` }}
      >
        <div className="relative z-10">
          <div className={`inline-flex p-3 rounded-xl mb-4 bg-${component.color}-100 group-hover:bg-${component.color}-200 transition-colors duration-300`}>
            <IconComponent className={`w-6 h-6 text-${component.color}-600`} />
          </div>
          <h4 className="text-lg font-bold text-slate-800 mb-3">{component.title}</h4>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">{component.subtitle}</p>
          {component.features && component.features.length > 0 && (
            <ul className="space-y-1">
              {component.features.map((feature: string, featureIndex: number) => (
                <li key={featureIndex} className="text-xs text-slate-500 flex items-center gap-2">
                  <div className="w-1 h-1 bg-slate-400 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  });
};

/**
 * Get icon component by name
 */
export const getIconComponent = (iconName: string): React.ComponentType<{ className?: string }> => {
  return iconMap[iconName] || Settings;
};
