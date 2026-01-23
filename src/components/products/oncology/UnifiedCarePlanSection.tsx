'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, ArrowRight, Zap, Target, Shield, Activity, Heart } from 'lucide-react';
import Link from 'next/link';

interface CapabilityCard {
  title: string;
  description: string;
  metrics: string[];
  highlights: string[];
  link: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface UnifiedCarePlanSectionProps {
  planData?: any; // Made optional since we're replacing the content
  className?: string;
}

const capabilityCards: CapabilityCard[] = [
  {
    title: "Resolve Genetic Uncertainty",
    description: "Zero-shot variant interpretation with Evo2 foundation model. Instantly resolves variants of unknown significance with biological reasoning.",
    metrics: ["95.7% AUROC", "73% VUS Resolution Rate", "Same-Day Decisions"],
    highlights: ["Evidence-based", "Transparent reasoning", "Clinical-grade accuracy"],
    link: "/platform/therapy-fit",
    icon: Zap,
    color: "blue"
  },
  {
    title: "Match Patients to Therapies",
    description: "Mechanism-based matching using S/P/E fusion (Sequence/Pathway/Evidence). Matches patients to therapies with precision targeting.",
    metrics: ["96.6% Trial Match Accuracy", "Precision Matching", "Same-Day Action"],
    highlights: ["S/P/E fusion", "Mechanism-based", "Action-ready dossiers"],
    link: "/platform/therapy-fit",
    icon: Target,
    color: "green"
  },
  {
    title: "Prevent Toxicity Before It Happens",
    description: "100% toxicity prevention coverage for DPYD/TPMT/UGT1A1/CYP2D6. HLA-based autoimmune toxicity forecasting prevents adverse events.",
    metrics: ["100% Coverage", "Life-Threatening Prevention", "Prevent Adverse Events"],
    highlights: ["PGx-powered", "Proactive safety", "Comprehensive coverage"],
    link: "/platform/toxicity-risk",
    icon: Shield,
    color: "red"
  },
  {
    title: "Predict Resistance Before It Happens",
    description: "Proactive resistance detection 3-6 weeks faster than imaging. CA-125 intelligence with kinetics forecasting enables early intervention.",
    metrics: ["3-6 Weeks Earlier", "Early Detection", "Prevent Treatment Failures"],
    highlights: ["Early warning", "Kinetics forecasting", "Proactive planning"],
    link: "/platform/pathway",
    icon: Activity,
    color: "orange"
  },
  {
    title: "Complete Unified Care Plans",
    description: "Single API endpoint integrating all clinical intelligence layers: drug recommendations, trial matching, safety monitoring, and nutrition.",
    metrics: ["/api/complete_care/universal", "Holistic Care Context", "Same-Day Tumor Board Ready"],
    highlights: ["Unified orchestration", "Complete care context", "Regulatory-ready"],
    link: "/platform/chemo",
    icon: Heart,
    color: "teal"
  }
];

export default function UnifiedCarePlanSection({
  planData,
  className = ''
}: UnifiedCarePlanSectionProps) {
  return (
    <section className={`py-16 md:py-24 bg-gradient-to-br from-blue-50 via-white to-teal-50 ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Network className="w-4 h-4" />
            FLAGSHIP CAPABILITY
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Unified Care Plan - The FLAGSHIP Capability
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            5 AI-powered capabilities for clinical workflows
          </p>
        </motion.div>

        {/* Capabilities Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {capabilityCards.map((card, index) => (
            <motion.div
              key={card.title}
              className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 bg-${card.color}-100 rounded-xl flex items-center justify-center group-hover:bg-${card.color}-200 transition-colors`}>
                  <card.icon className={`w-6 h-6 text-${card.color}-600`} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {card.highlights.slice(0, 2).map((highlight, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 bg-${card.color}-50 text-${card.color}-700 text-xs rounded-full font-medium`}
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Content */}
              <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                {card.title}
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                {card.description}
              </p>

              {/* Metrics */}
              <div className="space-y-2 mb-6">
                {card.metrics.map((metric, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className={`w-2 h-2 bg-${card.color}-500 rounded-full`}></div>
                    <span className="text-sm font-semibold text-slate-800">{metric}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link href={card.link}>
                <motion.button
                  className={`w-full flex items-center justify-center gap-2 px-4 py-3 bg-${card.color}-600 hover:bg-${card.color}-700 text-white rounded-xl font-semibold transition-all duration-300 group-hover:shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
