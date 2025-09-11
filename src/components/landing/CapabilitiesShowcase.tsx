'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CapabilityPreview } from './CapabilityPreview';
import { 
  BookOpen, 
  Layers, 
  Database, 
  Brain, 
  Target,
  ArrowRight,
  Play,
  ExternalLink
} from 'lucide-react';

interface Capability {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  previewType: 'demo' | 'interactive' | 'static';
  metrics: Array<{
    label: string;
    value: string;
    category: 'validation' | 'technical' | 'estimated';
  }>;
  features: string[];
  status: 'live' | 'roadmap';
  color: string;
  bgColor: string;
}

const capabilities: Capability[] = [
  {
    title: "Evidence Intelligence",
    description: "Transform raw findings into structured, auditable evidence stories with confidence scoring and full provenance tracking.",
    icon: <BookOpen className="w-6 h-6 text-blue-600" />,
    href: "/evidence",
    previewType: "demo",
    metrics: [
      { label: "Evidence Tiers", value: "4", category: "validation" },
      { label: "Confidence Score", value: "95%", category: "technical" },
      { label: "Citations", value: "1000+", category: "validation" }
    ],
    features: ["Automated Tiering", "Confidence Scoring", "Provenance Tracking", "Citation Management"],
    status: "live",
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "S/P/E Fusion",
    description: "Integrate Structure, Phenotype, and Expression data for comprehensive variant impact assessment with unified confidence scoring.",
    icon: <Layers className="w-6 h-6 text-green-600" />,
    href: "/evidence/spe-fusion",
    previewType: "interactive",
    metrics: [
      { label: "Data Sources", value: "3", category: "technical" },
      { label: "Accuracy", value: "89%", category: "validation" },
      { label: "Processing Time", value: "<2min", category: "technical" }
    ],
    features: ["Multi-modal Fusion", "Confidence Scoring", "Real-time Analysis", "Visual Integration"],
    status: "live",
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Data Lab",
    description: "Interactive study browser with real-time data access, therapeutic pipeline visualization, and comprehensive dataset analysis.",
    icon: <Database className="w-6 h-6 text-purple-600" />,
    href: "/evidence/data-lab",
    previewType: "interactive",
    metrics: [
      { label: "Datasets", value: "50+", category: "validation" },
      { label: "Studies", value: "500+", category: "validation" },
      { label: "API Calls", value: "Real-time", category: "technical" }
    ],
    features: ["Study Browser", "Pipeline Visualization", "Real-time Access", "Interactive Analysis"],
    status: "live",
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  },
  {
    title: "SAE Intelligence",
    description: "Interpretable AI features with disruption scoring, biological explanations, and activation steering capabilities.",
    icon: <Brain className="w-6 h-6 text-orange-600" />,
    href: "/evidence/sae-intelligence",
    previewType: "demo",
    metrics: [
      { label: "Features", value: "100+", category: "technical" },
      { label: "ΔLL Accuracy", value: "92%", category: "validation" },
      { label: "Safety Checks", value: "4", category: "technical" }
    ],
    features: ["Feature Attribution", "Disruption Scoring", "Safety Checking", "Activation Steering"],
    status: "live",
    color: "text-orange-600",
    bgColor: "bg-orange-50"
  }
];

export const CapabilitiesShowcase: React.FC = () => {
  const [selectedCapability, setSelectedCapability] = useState<number | null>(null);

  const handlePreview = (index: number) => {
    setSelectedCapability(selectedCapability === index ? null : index);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Evidence Intelligence Ecosystem
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-600 max-w-3xl mx-auto mb-8"
          >
            Four interconnected capabilities that transform research into actionable insights. 
            Experience the power of AI-driven evidence assessment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="/evidence"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              Explore Evidence Intelligence
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/use-cases"
              className="px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition-colors flex items-center gap-2"
            >
              View Use Cases
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <CapabilityPreview
              key={index}
              title={capability.title}
              description={capability.description}
              icon={capability.icon}
              href={capability.href}
              previewType={capability.previewType}
              metrics={capability.metrics}
              features={capability.features}
              status={capability.status}
              color={capability.color}
              bgColor={capability.bgColor}
              onPreview={() => handlePreview(index)}
            />
          ))}
        </div>

        {/* Interconnected Workflow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200"
        >
          <h3 className="text-2xl font-semibold text-slate-900 mb-6 text-center">
            How They Work Together
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Evidence → S/P/E Fusion",
                description: "Evidence Intelligence provides confidence scores that enhance S/P/E Fusion predictions",
                color: "bg-blue-100 text-blue-600"
              },
              {
                title: "S/P/E Fusion → Data Lab",
                description: "Fusion results feed into Data Lab for comprehensive study analysis and validation",
                color: "bg-green-100 text-green-600"
              },
              {
                title: "Data Lab → SAE Intelligence",
                description: "Data Lab findings inform SAE feature attribution and disruption scoring",
                color: "bg-purple-100 text-purple-600"
              },
              {
                title: "SAE Intelligence → Evidence",
                description: "SAE explanations provide biological context that strengthens evidence confidence",
                color: "bg-orange-100 text-orange-600"
              }
            ].map((workflow, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-slate-50">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${workflow.color} mb-3`}>
                  <ArrowRight className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">{workflow.title}</h4>
                <p className="text-sm text-slate-600">{workflow.description}</p>
              </div>
            ))}
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
          <p className="text-slate-600 mb-6">
            Ready to experience the future of evidence-based research?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/evidence/spe-fusion"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Start with S/P/E Fusion
            </a>
            <a
              href="/evidence/data-lab"
              className="px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-slate-400 transition-colors flex items-center gap-2"
            >
              Explore Data Lab
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
