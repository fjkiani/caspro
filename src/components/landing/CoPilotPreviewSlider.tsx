'use client';

import React, { useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Microscope, Shield, Activity, Cpu, Target, ListChecks, Beaker, Users, BarChart3, MessageSquare, Lightbulb, FileText } from 'lucide-react';
import { coPilotDetailsData } from '@/data/coPilotDetails';
import MetricCard from '@/components/metrics/MetricCard';
import { discriminativeMetrics } from '@/data/metrics/core-metrics';

const CoPilotPreviewSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const coPilots = useMemo(() => Object.values(coPilotDetailsData), []);

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.8);
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent mb-6"
          >
            Co-Pilot Previews
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-slate-700 max-w-3xl mx-auto"
          >
            Re-using the exact components from our in-silico pages. Slide through live previews.
          </motion.p>
        </div>

        {/* Slider Controls */}
        <div className="relative">
          <button
            aria-label="Previous"
            onClick={() => scrollByAmount('left')}
            className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white border border-slate-200 shadow z-10 hover:bg-slate-50"
          >
            <ChevronLeft className="w-5 h-5 text-slate-700" />
          </button>
          <button
            aria-label="Next"
            onClick={() => scrollByAmount('right')}
            className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white border border-slate-200 shadow z-10 hover:bg-slate-50"
          >
            <ChevronRight className="w-5 h-5 text-slate-700" />
          </button>

          {/* Carousel */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 no-scrollbar"
          >
            {coPilots.map((pilot) => (
              <div
                key={pilot.slug}
                className="snap-start shrink-0 w-[92%] md:w-[72%] lg:w-[58%]"
              >
                <div className="bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
                        {pilot.pageTitle}
                      </h3>
                      {pilot.heroSubtitle && (
                        <p className="text-slate-700 mt-2 text-base md:text-lg max-w-2xl">
                          {pilot.heroSubtitle}
                        </p>
                      )}
                    </div>
                    <a
                      to={`/platform/${pilot.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-700 hover:to-indigo-700"
                    >
                      Open
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Strategic Doctrine Preview: Core Scientific Foundation + Why In-Silico Matters */}
                  <StrategicPreview content={pilot as any} />

              
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoPilotPreviewSlider;

// Strategic Doctrine Preview (Core Scientific Foundation + Why In-Silico Matters)
const StrategicPreview: React.FC<{ content: any }> = ({ content }) => {
  // Icon map shared with Strategic Doctrine
  const iconMap: Record<string, any> = {
    Microscope,
    Shield,
    Activity,
    Cpu,
    Target,
    ListChecks,
    Beaker,
    Users,
    BarChart3,
    MessageSquare,
    Lightbulb,
    FileText
  };

  // Compute core concepts (mirror logic from Strategic Doctrine component)
  const getCoreConcepts = () => {
    const baseConcepts = [
      {
        icon: Microscope,
        title: 'Research-Grade AI',
        description:
          'Built on ClinVar foundations with 95.7% AUROC across 53,210 variants, ensuring scientific rigor and peer-reviewed validation.',
        color: 'blue'
      },
      {
        icon: Shield,
        title: 'Auditable Provenance',
        description:
          'Complete audit trail with run IDs, source citations, and transparent methodology for research compliance and reproducibility.',
        color: 'purple'
      }
    ];

    if (content?.inSilicoOverview?.coreConcepts) {
      return content.inSilicoOverview.coreConcepts.map((c: any) => ({
        ...c,
        icon: iconMap[c.icon] || Activity
      }));
    }

    if (content?.genomicUseCasesGrid && content.genomicUseCasesGrid.length > 0) {
      const primary = content.genomicUseCasesGrid[0];
      const gicon = iconMap[primary.iconName] || Activity;
      baseConcepts.splice(1, 0, {
        icon: gicon,
        title: primary.label,
        description: `Advanced ${primary.label.toLowerCase()} with research-grade validation and transparent methodology.`,
        color: 'teal'
      });
    }

    return baseConcepts;
  };

  const getValuePropositions = () => {
    const baseProps = [
      {
        icon: Activity,
        title: 'Minutes, Not Days',
        description: 'Transform weeks of manual analysis into actionable insights in minutes',
        metric: '60-70% faster',
        color: 'blue'
      },
      {
        icon: BarChart3,
        title: 'Confidence & Clarity',
        description: 'Clear confidence scores and evidence tiers reduce decision uncertainty',
        metric: '80% less confusion',
        color: 'teal'
      }
    ];

    if (content?.inSilicoOverview?.valuePropositions) {
      return content.inSilicoOverview.valuePropositions.map((p: any) => ({
        ...p,
        icon: iconMap[p.icon] || Activity
      }));
    }

    return baseProps;
  };

  const coreConcepts = getCoreConcepts().slice(0, 3);
  const valueProps = getValuePropositions().slice(0, 2);

  return (
    <div>
      {/* Core Scientific Foundation */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
            Core Scientific Foundation
          </h4>
          <p className="text-slate-600 text-sm">Built on research-grade AI and transparent methodology</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coreConcepts.map((concept: any, idx: number) => {
            const Icon = concept.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white rounded-xl p-5 border border-slate-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-${concept.color}-50 to-${concept.color}-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl mb-4 bg-${concept.color}-100`}>
                    <Icon className={`w-6 h-6 text-${concept.color}-600`} />
                  </div>
                  <h5 className="text-lg font-bold text-slate-800 mb-2">{concept.title}</h5>
                  <p className="text-slate-600 text-sm leading-relaxed">{concept.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Why In-Silico Matters */}
      <div>
        <div className="text-center mb-6">
          <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-indigo-600 bg-clip-text text-transparent">
            Why In-Silico Matters
          </h4>
          <p className="text-slate-600 text-sm">Measurable improvements in speed, accuracy, and collaboration</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {valueProps.map((vp: any, idx: number) => {
            const Icon = vp.icon;
            return (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-white via-slate-50 to-white rounded-xl p-5 border border-slate-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative z-10 flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-${vp.color}-100 flex-shrink-0`}>
                    <Icon className={`w-6 h-6 text-${vp.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-xl font-bold text-slate-800">{vp.title}</h5>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${vp.color}-100 text-${vp.color}-700`}>
                        {vp.metric}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{vp.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};


