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
  Beaker
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
  const getValuePropositions = () => {
    const baseProps = [
      {
        icon: Clock,
        title: "Minutes, Not Days",
        description: "Transform weeks of manual analysis into actionable insights in minutes",
        metric: "60-70% faster",
        color: "blue"
      },
      {
        icon: CheckCircle,
        title: "Confidence & Clarity",
        description: "Clear confidence scores and evidence tiers reduce decision uncertainty",
        metric: "80% less confusion",
        color: "teal"
      }
    ];

    // Use configured value props if available, otherwise fall back to data-driven approach
    if (content.inSilicoOverview?.valuePropositions) {
      const iconMap: Record<string, any> = {
        'Clock': Clock,
        'CheckCircle': CheckCircle,
        'Activity': Activity,
        'BarChart3': BarChart3,
        'Shield': Shield,
        'Target': Target,
        'Users': Users,
        'FileText': FileText,
        'ListChecks': ListChecks,
        'Beaker': Beaker,
        'DollarSign': DollarSign
      };

      return content.inSilicoOverview.valuePropositions.map(prop => ({
        ...prop,
        icon: iconMap[prop.icon] || Activity
      }));
    }

    // Fallback: Extract co-pilot specific value prop from observedOutcomes
    if (content.observedOutcomes && content.observedOutcomes.length > 0) {
      const primaryOutcome = content.observedOutcomes[0];
      const iconMap: Record<string, any> = {
        'BarChart3': BarChart3,
        'Clock': Clock,
        'TrendingUp': Activity,
        'Award': CheckCircle,
        'FileText': FileText,
        'Shield': Shield,
        'Target': Target,
        'Activity': Activity,
        'Users': Users
      };

      const IconComponent = iconMap[primaryOutcome.icon] || Activity;
      
      baseProps.push({
        icon: IconComponent,
        title: primaryOutcome.title,
        description: primaryOutcome.description,
        metric: primaryOutcome.keyMetric,
        color: "indigo"
      });
    }

    // Always add team alignment as the last prop
    baseProps.push({
      icon: Users,
      title: "Team Alignment",
      description: "Shareable one-pagers with transparent rationale improve collaboration",
      metric: "50% faster decisions",
      color: "purple"
    });

    return baseProps;
  };

  const valuePropositions = getValuePropositions();

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
      {/* Header Section */}
      <motion.div variants={itemVariants} className="text-center mb-20">
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-teal-50 to-indigo-50 rounded-3xl transform rotate-1 scale-105 opacity-50"></div>
          <div className="relative bg-white rounded-3xl p-12 shadow-xl border border-gray-100">
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl shadow-lg">
                <Microscope className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                {content.pageTitle}
              </h2>
            </div>
            <div className="max-w-5xl mx-auto">
              <p className="text-2xl text-gray-700 leading-relaxed mb-6">
                <strong className="text-blue-600">In-silico</strong> means "in silicon" - referring to computer-based analysis that simulates and predicts biological processes.
              </p>
              {content.heroSubtitle && (
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
                  <p className="text-xl font-medium text-gray-800 leading-relaxed">
                    {content.heroSubtitle}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Core Concepts Grid */}
      <motion.div variants={itemVariants} className="mb-24">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Core Scientific Foundation</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Built on research-grade AI with transparent methodology and auditable provenance</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreConcepts.map((concept, index) => {
            const IconComponent = concept.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${concept.color}-50 to-${concept.color}-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl mb-6 bg-${concept.color}-100 group-hover:bg-${concept.color}-200 transition-colors duration-300`}>
                    <IconComponent className={`w-8 h-8 text-${concept.color}-600`} />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">{concept.title}</h4>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{concept.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Value Propositions */}
      <motion.div variants={itemVariants} className="mb-24">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Why In-Silico Matters</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Transform your research workflow with measurable improvements in speed, accuracy, and collaboration</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {valuePropositions.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={index}
                className="group relative bg-gradient-to-br from-white via-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden"
                whileHover={{ scale: 1.03, y: -5 }}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${value.color}-50 via-${value.color}-100 to-${value.color}-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl bg-${value.color}-100 group-hover:bg-${value.color}-200 transition-colors duration-300 flex-shrink-0 shadow-lg`}>
                      <IconComponent className={`w-8 h-8 text-${value.color}-600`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">{value.title}</h4>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold bg-${value.color}-100 text-${value.color}-700 group-hover:bg-${value.color}-200 transition-colors duration-300 shadow-md`}>
                          {value.metric}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">{value.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* What You Get Section */}
      <motion.div variants={itemVariants} className="mb-24">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">What You Get</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Deliverables that transform complex genomic data into actionable insights</p>
        </div>
        <div className="relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-teal-100 to-indigo-100 rounded-3xl transform rotate-1 scale-105 opacity-30"></div>
          <div className="relative bg-gradient-to-r from-blue-50 via-teal-50 to-indigo-50 rounded-3xl p-12 shadow-xl border border-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {whatYouGet.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="group text-center"
                    whileHover={{ scale: 1.08, y: -10 }}
                  >
                    <div className="relative mb-8">
                      {/* Icon background with animation */}
                      <div className="inline-flex p-6 bg-white rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 border-2 border-blue-100 group-hover:border-blue-200">
                        <IconComponent className="w-12 h-12 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                      </div>
                      {/* Floating particles effect */}
                      <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                      <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-gray-900 transition-colors duration-300">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-lg group-hover:text-gray-700 transition-colors duration-300">{item.description}</p>
                  </motion.div>
                );
              })}
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
