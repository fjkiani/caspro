import React from 'react';
import { motion } from 'framer-motion';
import { 
  Microscope, 
  Cpu, 
  Target, 
  Zap, 
  Shield, 
  CheckCircle, 
  Clock, 
  DollarSign,
  Users,
  FileText,
  BarChart3,
  Lightbulb,
  Activity,
  ListChecks,
  MessageSquare,
  Beaker,
  Layers,
  AlertTriangle
} from 'lucide-react';
import { CoPilotDetailContent } from '@/types/copilot-types';

interface InSilicoOverviewSectionProps {
  content: CoPilotDetailContent;
  className?: string;
}

const InSilicoOverviewSection: React.FC<InSilicoOverviewSectionProps> = ({ content, className = '' }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Dynamic core concepts based on co-pilot content
  const getCoreConcepts = () => {
    const baseConcepts = [
      {
        icon: Microscope,
        title: "Research-Grade AI",
        description: "Built on ClinVar foundations with 95.7% AUROC across 53,210 variants, ensuring scientific rigor and peer-reviewed validation.",
        color: "blue"
      },
      {
        icon: Shield,
        title: "Auditable Provenance",
        description: "Complete audit trail with run IDs, source citations, and transparent methodology for research compliance and reproducibility.",
        color: "purple"
      }
    ];

    // Use configured concepts if available, otherwise fall back to data-driven approach
    if (content.inSilicoOverview?.coreConcepts) {
      const iconMap: Record<string, any> = {
        'Microscope': Microscope,
        'Shield': Shield,
        'Activity': Activity,
        'Cpu': Cpu,
        'Target': Target,
        'ListChecks': ListChecks,
        'Beaker': Beaker,
        'Users': Users,
        'BarChart3': BarChart3,
        'MessageSquare': MessageSquare,
        'Lightbulb': Lightbulb
      };

      return content.inSilicoOverview.coreConcepts.map(concept => ({
        ...concept,
        icon: iconMap[concept.icon] || Activity
      }));
    }

    // Fallback: Extract co-pilot specific concept from genomicUseCasesGrid
    if (content.genomicUseCasesGrid && content.genomicUseCasesGrid.length > 0) {
      const primaryUseCase = content.genomicUseCasesGrid[0];
      const iconMap: Record<string, any> = {
        'BarChart2': BarChart3,
        'MessageSquare': MessageSquare,
        'Beaker': Beaker,
        'Users': Users,
        'ListChecks': ListChecks,
        'ShieldCheck': Shield,
        'Lightbulb': Lightbulb,
        'Activity': Activity,
        'Target': Target,
        'Cpu': Cpu
      };

      const IconComponent = iconMap[primaryUseCase.iconName] || Activity;
      
      baseConcepts.splice(1, 0, {
        icon: IconComponent,
        title: primaryUseCase.label,
        description: `Advanced ${primaryUseCase.label.toLowerCase()} capabilities with research-grade validation and transparent methodology.`,
        color: "teal"
      });
    }

    return baseConcepts;
  };

  const coreConcepts = getCoreConcepts();

  // Dynamic value propositions based on co-pilot content
  const valuePropositions = (content.observedOutcomes || []).map(outcome => {
    const iconMap: Record<string, any> = {
      'ShieldCheck': Shield,
      'TrendingUp': Activity,
      'Target': Target,
      'Activity': Activity,
      'Layers': Layers,
      'Users': Users,
      'FileText': FileText,
      'AlertTriangle': AlertTriangle,
      'Clock': Clock,
      'CheckCircle': CheckCircle,
      'DollarSign': DollarSign,
      'Beaker': Beaker,
      'Lightbulb': Lightbulb,
      'BarChart3': BarChart3,
      'MessageSquare': MessageSquare,
      'ListChecks': ListChecks,
      'Cpu': Cpu,
    };

    return {
      icon: iconMap[outcome.icon] || Activity,
      title: outcome.title,
      description: outcome.description,
      metric: outcome.keyMetric,
      color: outcome.color || 'blue'
    };
  });

  // Dynamic "What You Get" based on co-pilot content
  const getWhatYouGet = () => {
    const baseItems = [
      {
        icon: FileText,
        title: "Explainable Rationale",
        description: "Transparent 'why' explanations with source citations and evidence tiers"
      },
      {
        icon: Lightbulb,
        title: "Actionable Insights",
        description: "Ready-to-use summaries for tumor boards, research planning, and clinical decisions"
      }
    ];

    // Use configured deliverables if available, otherwise fall back to data-driven approach
    if (content.inSilicoOverview?.deliverables) {
      const iconMap: Record<string, any> = {
        'Activity': Activity,
        'ListChecks': ListChecks,
        'Beaker': Beaker,
        'Target': Target,
        'BarChart3': BarChart3,
        'Cpu': Cpu,
        'Shield': Shield,
        'Users': Users,
        'FileText': FileText,
        'Lightbulb': Lightbulb
      };

      return content.inSilicoOverview.deliverables.map(deliverable => ({
        ...deliverable,
        icon: iconMap[deliverable.icon] || BarChart3
      }));
    }

    // Fallback: Extract co-pilot specific deliverable from keyCapabilities
    if (content.keyCapabilities && content.keyCapabilities.length > 0) {
      const primaryCapability = content.keyCapabilities[0];
      const iconMap: Record<string, any> = {
        'Activity': Activity,
        'ListChecks': ListChecks,
        'Beaker': Beaker,
        'Target': Target,
        'BarChart3': BarChart3,
        'Cpu': Cpu,
        'Shield': Shield,
        'Users': Users,
        'FileText': FileText,
        'Lightbulb': Lightbulb
      };

      // Try to extract icon from capability title or use default
      let IconComponent = BarChart3; // default
      const titleLower = primaryCapability.title.toLowerCase();
      
      if (titleLower.includes('pathway')) IconComponent = Activity;
      else if (titleLower.includes('drug') || titleLower.includes('ranking')) IconComponent = ListChecks;
      else if (titleLower.includes('chemo') || titleLower.includes('therapy')) IconComponent = Beaker;
      else if (titleLower.includes('trial')) IconComponent = Target;
      else if (titleLower.includes('fusion') || titleLower.includes('analysis')) IconComponent = Cpu;
      
      baseItems.unshift({
        icon: IconComponent,
        title: primaryCapability.title,
        description: `Advanced ${primaryCapability.title.toLowerCase()} with research-grade validation and transparent methodology.`
      });
    }

    return baseItems;
  };

  const whatYouGet = getWhatYouGet();

  return (
    <motion.div 
      className={`w-full ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header Section - Compact Product Overview */}
      <motion.div variants={itemVariants} className="mb-8 md:mb-12">
        <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-slate-200">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="p-3 md:p-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl md:rounded-2xl shadow-lg flex-shrink-0">
              <Microscope className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent mb-2 md:mb-3">
                {content.pageTitle}
              </h2>
              {content.heroSubtitle && (
                <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                  {content.heroSubtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      



      {/* Research Use Only Notice */}
      <motion.div variants={itemVariants} className="text-center">
        <div className="relative inline-block">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl transform rotate-1 scale-105 opacity-50"></div>
          <div className="relative inline-flex items-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl px-8 py-6 shadow-lg">
            <div className="p-3 bg-amber-100 rounded-xl">
              <Shield className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-amber-800 font-semibold text-lg">
              <strong>Research Use Only (RUO)</strong> - All outputs are for research purposes and not for diagnostic use
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InSilicoOverviewSection;
