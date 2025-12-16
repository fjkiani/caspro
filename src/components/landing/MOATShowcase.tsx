'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Zap, 
  Shield, 
  Globe, 
  TrendingUp, 
  FlaskConical,
  Award,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import CardSlider from '@/components/shared/CardSlider';

interface MOATCapability {
  id: string;
  title: string;
  subtitle: string;
  validated: boolean;
  metric: string;
  description: string;
  icon: React.ElementType;
  color: string;
  badge?: string;
  link?: string;
  details: string[];
}

const MOAT_CAPABILITIES: MOATCapability[] = [
  {
    id: 'spe-framework',
    title: 'S/P/E Framework',
    subtitle: '100% Top-5 Drug Ranking Accuracy',
    validated: true,
    metric: '17/17 patients',
    description: 'Pathway-based drug ranking validated on 17 patients - correct drug in top 5 recommendations every time.',
    icon: Target,
    color: 'from-blue-500 to-cyan-600',
    badge: 'VALIDATED',
    link: '/evidence/spe-fusion',
    details: [
      'Sequence (S) + Pathway (P) + Evidence (E) scoring',
      'Mechanism alignment assessment',
      'DDR pathway computation: 1.0 for MBD4+TP53',
      'TP53 pathway computation: 0.8 validated'
    ]
  },
  {
    id: 'universalization',
    title: 'Universal Platform',
    subtitle: 'Works for ANY Cancer Type',
    validated: true,
    metric: '50+ diseases',
    description: 'One API call → complete care plan. Multi-disease Standard of Care for ovarian, breast, colorectal, melanoma, multiple myeloma.',
    icon: Globe,
    color: 'from-green-500 to-emerald-600',
    badge: 'COMPLETE',
    link: '/platform',
    details: [
      'Universal Complete Care Orchestrator',
      'Multi-disease Standard of Care',
      'Universal biomarker intelligence (CA-125, PSA, CEA, AFP, hCG)',
      'Profile adapter (simple or full profiles)'
    ]
  },
  {
    id: 'toxicity-nutrition',
    title: 'Toxicity-Aware Nutrition',
    subtitle: 'First-in-Class Patient MOAT',
    validated: true,
    metric: '3 pathway categories',
    description: 'Connects toxicity pathways to protective foods. Drug-specific recommendations with personalized timing.',
    icon: FlaskConical,
    color: 'from-purple-500 to-violet-600',
    badge: 'COMPLETE',
    link: '/platform/toxicity-risk',
    details: [
      'Drug→Pathway→Food connections',
      'Personalized timing: "Take post-chemo, not during"',
      'DNA Repair, Inflammation, Cardiometabolic pathways',
      'Mechanistic validation integrated'
    ]
  },
  {
    id: 'resistance-prediction',
    title: 'Resistance Prediction',
    subtitle: 'Predict Before It Happens',
    validated: true,
    metric: '2x risk detection',
    description: 'Validated on 469 TCGA patients. MAPK/NF1 mutations = 2x platinum resistance risk. Early intervention recommendations.',
    icon: TrendingUp,
    color: 'from-red-500 to-pink-600',
    badge: 'VALIDATED',
    link: '/solutions/clinical-decision-support',
    details: [
      'MAPK pathway mutations: RR = 1.97 (validated)',
      'NF1 mutations: RR = 2.10 (validated)',
      '469 TCGA ovarian cancer patients validated',
      'Early PARP switch recommendations'
    ]
  },
  {
    id: 'clinical-dossier',
    title: 'Clinical Dossier',
    subtitle: 'Exportable for Tumor Boards',
    validated: true,
    metric: 'Complete dossiers',
    description: 'Exportable clinical dossiers with variant impact cards, therapeutic recommendations, and complete audit trails.',
    icon: Shield,
    color: 'from-indigo-500 to-blue-600',
    badge: 'SPRINT 2',
    link: '/solutions/clinical-decision-support',
    details: [
      'Variant impact cards with gene, HGVS, classification',
      'Top 5 therapeutic recommendations with alignment scores',
      'Drug detail modals with mechanism rationale',
      'Honest framing: "Mechanism alignment ≠ outcome prediction"'
    ]
  },
  {
    id: 'trial-matching',
    title: 'Mechanism-Based Trial Matching',
    subtitle: 'Pathway Burden → Trial Alignment',
    validated: true,
    metric: '7D pathway vector',
    description: 'Connects patient pathway vulnerabilities to trial drug mechanisms. Not keyword search - actual mechanism alignment.',
    icon: Zap,
    color: 'from-orange-500 to-amber-600',
    badge: 'COMPLETE',
    link: '/platform/clinical-trials',
    details: [
      '7D pathway vector: [DDR, MAPK, PI3K, VEGF, HER2, IO, Efflux]',
      'Combined scoring: 0.7×eligibility + 0.3×mechanism_fit',
      'Universal dossier generation for any patient',
      'Pathway-based ranking, not keyword matching'
    ]
  }
];

const MOATShowcase: React.FC = () => {
  const [selectedMOAT, setSelectedMOAT] = useState<string | null>(null);
  const [cardsToShow, setCardsToShow] = useState(1);
  const detailSectionRef = useRef<HTMLDivElement>(null);

  const selectedCapability = selectedMOAT 
    ? MOAT_CAPABILITIES.find(m => m.id === selectedMOAT)
    : null;

  // Responsive cards to show
  useEffect(() => {
    const updateCardsToShow = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsToShow(1); // Mobile: 1 card
      } else if (width < 1024) {
        setCardsToShow(2); // Tablet: 2 cards
      } else {
        setCardsToShow(3); // Desktop: 3 cards
      }
    };

    updateCardsToShow();
    window.addEventListener('resize', updateCardsToShow);
    return () => window.removeEventListener('resize', updateCardsToShow);
  }, []);

  // Scroll to detail section when a MOAT is selected
  useEffect(() => {
    if (selectedMOAT && detailSectionRef.current) {
      // Wait for animation to start, then scroll smoothly
      setTimeout(() => {
        detailSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }, 400); // Wait for the expand animation to start
    }
  }, [selectedMOAT]);

  const handleMOATClick = (moatId: string) => {
    const isSelected = selectedMOAT === moatId;
    setSelectedMOAT(isSelected ? null : moatId);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8 md:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-2 sm:mb-3 md:mb-4">
            Competitive Advantages <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Nobody Else Has</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto">
            Six validated MOAT capabilities that transform drug development from gambling to engineering. 
            <span className="block mt-1 sm:mt-2 text-blue-600 font-semibold text-xs sm:text-sm md:text-base">👇 Click any capability to see what makes us unique</span>
          </p>
        </motion.div>

        {/* MOAT Slider */}
        <CardSlider
          items={MOAT_CAPABILITIES}
          renderCard={(moat: MOATCapability, index: number) => {
            const Icon = moat.icon;
            const isSelected = selectedMOAT === moat.id;
            
            return (
              <motion.button
                onClick={() => handleMOATClick(moat.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative p-4 sm:p-6 rounded-2xl border-2 transition-all text-left h-full ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Validated Badge */}
                {moat.validated && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      moat.badge === 'VALIDATED'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                    }`}>
                      {moat.badge}
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${moat.color} flex-shrink-0`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-1">{moat.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600">{moat.subtitle}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span className="text-base sm:text-lg font-bold text-blue-600">{moat.metric}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">{moat.description}</p>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-2xl border-2 border-blue-500 pointer-events-none"
                  >
                    <div className="absolute top-2 right-2">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
                    </div>
                  </motion.div>
                )}
              </motion.button>
            );
          }}
          cardsToShow={cardsToShow}
          showArrows={true}
          showDots={true}
          autoPlay={false}
          className="mb-6 sm:mb-8 md:mb-12"
        />

        {/* Detailed View - Scroll Target */}
        <AnimatePresence>
          {selectedCapability && (
            <motion.div
              ref={detailSectionRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 sm:mt-6 md:mt-8 overflow-hidden"
            >
              <div className="bg-slate-50 rounded-xl md:rounded-2xl border-2 border-blue-200 p-4 sm:p-6 md:p-8 shadow-xl">
                <div className="flex items-start justify-between mb-4 sm:mb-5 md:mb-6">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-1 sm:mb-2">{selectedCapability.title}</h3>
                    <p className="text-base sm:text-lg md:text-xl text-blue-600">{selectedCapability.subtitle}</p>
                  </div>
                  <button
                    onClick={() => setSelectedMOAT(null)}
                    className="text-slate-400 hover:text-slate-900 transition-colors ml-2 flex-shrink-0 text-xl sm:text-2xl"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-5 md:mb-6">
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Key Features</h4>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {selectedCapability.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm sm:text-base text-slate-600">
                          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">Why It's Unique</h4>
                    <p className="text-sm sm:text-base text-slate-600 mb-3 sm:mb-4">{selectedCapability.description}</p>
                    <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs sm:text-sm text-blue-600 font-semibold mb-1">Validated Performance:</p>
                      <p className="text-base sm:text-lg font-bold text-slate-900">{selectedCapability.metric}</p>
                    </div>
                  </div>
                </div>

                {selectedCapability.link && (
                  <Link
                    href={selectedCapability.link}
                    className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                  >
                    Explore {selectedCapability.title}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MOATShowcase;

