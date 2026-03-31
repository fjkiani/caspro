'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Microscope, 
  Activity, 
  Shield, 
  Target, 
  Dna, 
  FileText, 
  Users, 
  Zap, 
  ArrowRight,
  Play,
  ExternalLink
} from 'lucide-react';

interface InSilicoCapability {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  status: 'live' | 'roadmap';
  metrics: Array<{
    label: string;
    value: string;
    category: 'validation' | 'technical' | 'estimated';
  }>;
  features: string[];
  color: string;
  bgColor: string;
}

const inSilicoCapabilities: InSilicoCapability[] = [
  {
    title: "Oracle Intelligence",
    description: "AI-powered variant impact prediction with confidence scoring and biological context interpretation.",
    icon: <Target className="w-6 h-6 text-blue-600" />,
    href: "/platform/oracle-intelligence",
    status: "live",
    metrics: [
      { label: "Accuracy", value: "94%", category: "validation" },
      { label: "Variants", value: "10M+", category: "technical" },
      { label: "Confidence", value: "High", category: "validation" }
    ],
    features: ["Variant Scoring", "Confidence Metrics", "Biological Context", "Real-time Analysis"],
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Forge Intelligence",
    description: "Generative AI for therapeutic design with safety checks and biological validation.",
    icon: <Zap className="w-6 h-6 text-purple-600" />,
    href: "/platform/forge-intelligence",
    status: "live",
    metrics: [
      { label: "Designs", value: "1000+", category: "validation" },
      { label: "Safety Score", value: "98%", category: "validation" },
      { label: "Generation Time", value: "<30s", category: "technical" }
    ],
    features: ["Therapeutic Design", "Safety Validation", "Biological Constraints", "Rapid Prototyping"],
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "CRISPR Intelligence",
    description: "Precision gene editing with off-target prediction and efficiency optimization.",
    icon: <Dna className="w-6 h-6 text-green-600" />,
    href: "/platform/crispr-intelligence",
    status: "live",
    metrics: [
      { label: "Efficiency", value: "89%", category: "validation" },
      { label: "Off-targets", value: "<5", category: "validation" },
      { label: "Designs", value: "500+", category: "technical" }
    ],
    features: ["Guide Design", "Off-target Analysis", "Efficiency Prediction", "Safety Scoring"],
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Scribe Intelligence",
    description: "Automated research documentation and literature synthesis with AI-powered insights.",
    icon: <FileText className="w-6 h-6 text-orange-600" />,
    href: "/platform/scribe-intelligence",
    status: "roadmap",
    metrics: [
      { label: "Papers", value: "10K+", category: "technical" },
      { label: "Synthesis", value: "95%", category: "estimated" },
      { label: "Time Saved", value: "80%", category: "estimated" }
    ],
    features: ["Literature Review", "Auto-synthesis", "Citation Management", "Insight Extraction"],
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
];

export const InSilicoTeaser: React.FC = () => {
  const [selectedCapability, setSelectedCapability] = useState<number | null>(null);

  const getMetricIcon = (category: string) => {
    switch (category) {
      case 'validation': return '✓';
      case 'technical': return '⚡';
      case 'estimated': return '📊';
      default: return '•';
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            In-Silico Intelligence Platform
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-300 max-w-3xl mx-auto mb-8"
          >
            AI-powered co-pilots that accelerate every stage of therapeutic development. 
            From variant analysis to therapeutic design, our in-silico platform supports research workflows.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              to="/insilico"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Explore Platform
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              to="/platform/oracle-intelligence"
              className="px-8 py-3 border-2 border-slate-300 text-slate-300 rounded-lg font-semibold hover:border-white hover:text-white transition-colors flex items-center gap-2"
            >
              Try Oracle
              <Play className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {inSilicoCapabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${capability.bgColor}`} />
              
              {/* Header */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${capability.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    {capability.icon}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    capability.status === 'live' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-orange-100 text-orange-700'
                  }`}>
                    {capability.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-300 transition-colors">
                  {capability.title}
                </h3>
                <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                  {capability.description}
                </p>
              </div>

              {/* Metrics */}
              <div className="relative z-10 mb-4">
                <div className="grid grid-cols-3 gap-2">
                  {capability.metrics.slice(0, 3).map((metric, metricIndex) => (
                    <div key={metricIndex} className="text-center p-2 bg-white/10 rounded-lg">
                      <div className="text-xs text-slate-400 mb-1">{getMetricIcon(metric.category)}</div>
                      <div className="text-sm font-medium text-white">{metric.value}</div>
                      <div className="text-xs text-slate-400">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="relative z-10 mb-4">
                <div className="flex flex-wrap gap-1">
                  {capability.features.slice(0, 2).map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="px-2 py-1 bg-white/20 text-slate-200 text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {capability.features.length > 2 && (
                    <span className="px-2 py-1 bg-white/20 text-slate-200 text-xs rounded-full">
                      +{capability.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* CTA */}
              <div className="relative z-10 flex items-center justify-between">
                <a
                  to={capability.href}
                  className={`flex items-center gap-2 text-sm font-medium ${capability.color} hover:opacity-80 transition-opacity`}
                >
                  Explore {capability.title}
                  <ArrowRight className="w-4 h-4" />
                </a>
                {capability.status === 'live' && (
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Play className="w-3 h-3" />
                    Live
                  </span>
                )}
              </div>

              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Platform Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Research Platform
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="font-semibold mb-2">Research Acceleration</h4>
              <p className="text-sm text-slate-300">
                AI co-pilots that understand your research context and accelerate every workflow
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="font-semibold mb-2">Safety & Validation</h4>
              <p className="text-sm text-slate-300">
                Built-in safety checks and validation ensure reliable, trustworthy results
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="font-semibold mb-2">Integrated Workflows</h4>
              <p className="text-sm text-slate-300">
                Integration between co-pilots supports research workflows
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-300 mb-6">
            Ready to accelerate your research with AI co-pilots?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              to="/insilico"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
            >
              <Microscope className="w-4 h-4" />
              Explore Platform
            </a>
            <a
              to="/platform/oracle-intelligence"
              className="px-8 py-3 border-2 border-slate-300 text-slate-300 rounded-lg font-semibold hover:border-white hover:text-white transition-colors flex items-center gap-2"
            >
              Try Oracle Intelligence
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
