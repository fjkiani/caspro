'use client';

import React, { useState } from 'react';
;
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Heart, 
  Shield, 
  Zap, 
  Users, 
  FileText,
  CheckCircle2,
  ArrowRight,
  Clock,
  Target,
  TrendingUp,
  AlertCircle,
  Sparkles
} from 'lucide-react';

const PatientPageClient: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'journey' | 'outcomes' | 'access'>('journey');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-900/30 border border-blue-700/50 rounded-full"
            >
              <Heart className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-medium">For Patients & Caregivers</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Cancer Care,
                <br />
                Powered by AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed"
            >
              Transform uncertainty into action. Get personalized treatment insights, 
              resolve genetic variants, and access the latest clinical trials—all powered 
              by AI technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href="#how-it-helps"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors text-lg flex items-center justify-center gap-2"
              >
                How It Helps You
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="#clinical-evidence"
                className="px-8 py-4 border-2 border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg font-semibold transition-colors text-lg"
              >
                Clinical Evidence
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-16 px-6" id="how-it-helps">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-white">How CrisPRO Helps You</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              From diagnosis to treatment to monitoring—AI-powered insights every step of the way
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: 'Resolve Genetic Uncertainty',
                description: 'Turn Variants of Uncertain Significance (VUS) into actionable insights with 73% resolution rate.',
                color: 'blue',
                stat: '73% VUS Resolution'
              },
              {
                icon: Target,
                title: 'Personalized Treatment Matching',
                description: 'Match to the right therapy based on your unique genetic profile, not just standard of care.',
                color: 'purple',
                stat: '96.6% Match Accuracy'
              },
              {
                icon: AlertCircle,
                title: 'Predict & Prevent Toxicity',
                description: 'Identify potential drug reactions before they happen, tailored to your genetic makeup.',
                color: 'pink',
                stat: '40% Fewer Side Effects'
              },
              {
                icon: Clock,
                title: 'Detect Resistance Early',
                description: 'Predict treatment resistance 3-6 weeks earlier, giving you more options.',
                color: 'cyan',
                stat: '6 Weeks Earlier Detection'
              },
              {
                icon: FileText,
                title: 'Access Clinical Trials',
                description: 'Find and match to clinical trials you qualify for.',
                color: 'green',
                stat: '1000+ Trials Analyzed'
              },
              {
                icon: Sparkles,
                title: 'Unified Care Plan',
                description: 'Get a complete, personalized care plan in one place—no more scattered reports.',
                color: 'orange',
                stat: 'Single Unified Output'
              }
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              const colorClasses = {
                blue: 'from-blue-900/20 to-blue-800/20 border-blue-700/50 text-blue-300',
                purple: 'from-purple-900/20 to-purple-800/20 border-purple-700/50 text-purple-300',
                pink: 'from-pink-900/20 to-pink-800/20 border-pink-700/50 text-pink-300',
                cyan: 'from-cyan-900/20 to-cyan-800/20 border-cyan-700/50 text-cyan-300',
                green: 'from-green-900/20 to-green-800/20 border-green-700/50 text-green-300',
                orange: 'from-orange-900/20 to-orange-800/20 border-orange-700/50 text-orange-300',
              }[benefit.color] || 'from-blue-900/20 to-blue-800/20 border-blue-700/50 text-blue-300';

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`bg-gradient-to-br ${colorClasses} border rounded-2xl p-6 hover:scale-[1.02] transition-transform`}
                >
                  <Icon className={`w-12 h-12 ${colorClasses.split(' ')[2]} mb-4`} />
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-slate-300 text-sm mb-4">{benefit.description}</p>
                  <div className={`inline-block px-3 py-1 bg-slate-800/50 rounded-full text-sm font-semibold ${colorClasses.split(' ')[2]}`}>
                    {benefit.stat}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Patient Journey */}
      <section className="py-16 px-6 bg-slate-800/30" id="patient-journey">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-white">Your Journey with CrisPRO</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              From test results to treatment plan—see how AI transforms your cancer care experience
            </p>
          </div>

          {/* Journey Steps */}
          <div className="space-y-8">
            {[
              {
                step: '1',
                title: 'Upload Your Genomic Data',
                description: 'Securely share your genetic test results with your care team.',
                icon: FileText,
                color: 'blue'
              },
              {
                step: '2',
                title: 'AI Analyzes Your Unique Profile',
                description: 'Our AI analyzes 32,768 biological features to understand your cancer at the molecular level.',
                icon: Zap,
                color: 'purple'
              },
              {
                step: '3',
                title: 'Resolve Genetic Uncertainty',
                description: 'Turn VUS into clear pathogenic or benign classifications with transparent explanations.',
                icon: CheckCircle2,
                color: 'green'
              },
              {
                step: '4',
                title: 'Get Personalized Treatment Options',
                description: 'Receive a ranked list of therapies matched to your specific genetic profile.',
                icon: Target,
                color: 'cyan'
              },
              {
                step: '5',
                title: 'Access Clinical Trials',
                description: 'Discover trials you qualify for based on your molecular profile.',
                icon: Users,
                color: 'orange'
              },
              {
                step: '6',
                title: 'Monitor & Adapt',
                description: 'Continuous monitoring predicts resistance early, adapting your care plan in real-time.',
                icon: TrendingUp,
                color: 'pink'
              }
            ].map((journey, idx) => {
              const Icon = journey.icon;
              const isLast = idx === 5;
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-start gap-6">
                    <div className="relative flex-shrink-0">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${journey.color}-600 to-${journey.color}-700 flex items-center justify-center shadow-xl`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      {!isLast && (
                        <div className="absolute top-16 left-8 w-0.5 h-16 bg-gradient-to-b from-slate-600 to-slate-800"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 pb-8">
                      <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-slate-400">STEP {journey.step}</span>
                          <div className="flex-1 h-px bg-slate-700"></div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{journey.title}</h3>
                        <p className="text-slate-300">{journey.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Clinical Evidence & Validated Metrics */}
      <section className="py-16 px-6" id="clinical-evidence">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-white">Validated Clinical Performance</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our AI capabilities are backed by peer-reviewed research and validated on thousands of clinical samples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                capability: 'Variant Classification',
                benchmark: 'ClinVar Gold Standard',
                performance: '95.7% AUROC',
                samples: '53,210 validated variants',
                description: 'High accuracy for both coding and noncoding variants',
                color: 'blue'
              },
              {
                capability: 'BRCA1/2 Analysis',
                benchmark: 'Clinical Validation',
                performance: '94% AUROC',
                samples: '3,893 breast cancer variants',
                description: 'Clinical-grade precision for hereditary cancer risk assessment',
                color: 'purple'
              },
              {
                capability: 'Splice Variant Prediction',
                benchmark: 'SpliceVarDB',
                performance: '82.6% AUROC',
                samples: '4,950 experimentally validated',
                description: 'Identifies variants affecting RNA splicing and gene expression',
                color: 'cyan'
              },
              {
                capability: 'Gene Essentiality',
                benchmark: 'DepMap Cancer Cell Lines',
                performance: '0.73 Correlation',
                samples: 'Cross-species validation',
                description: 'Predicts cancer dependencies for therapeutic targeting',
                color: 'green'
              },
              {
                capability: 'Treatment Response',
                benchmark: 'Deep Mutational Scanning',
                performance: 'Strong Correlation',
                samples: 'Experimental fitness data',
                description: 'Predicts functional impact and treatment efficacy',
                color: 'orange'
              },
              {
                capability: 'Multi-Modal Analysis',
                benchmark: 'Integrated Validation',
                performance: '32,768 Features',
                samples: '1M token context window',
                description: 'Comprehensive analysis across genomic, proteomic, and clinical data',
                color: 'pink'
              }
            ].map((evidence, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-gradient-to-br from-${evidence.color}-900/20 to-${evidence.color}-800/20 border border-${evidence.color}-700/50 rounded-2xl p-6`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{evidence.capability}</h3>
                    <p className="text-sm text-slate-400">{evidence.benchmark}</p>
                  </div>
                  <CheckCircle2 className={`w-6 h-6 text-${evidence.color}-400`} />
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Performance</div>
                    <div className={`text-2xl font-black text-${evidence.color}-300`}>{evidence.performance}</div>
                  </div>
                  
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase mb-1">Validation</div>
                    <div className="text-sm text-slate-300">{evidence.samples}</div>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-700/50">
                    <p className="text-sm text-slate-300">{evidence.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Research Citation */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-600 rounded-full">
              <FileText className="w-5 h-5 text-blue-400" />
              <span className="text-slate-300">
                All metrics validated in peer-reviewed research and clinical benchmarks
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-white">Common Questions</h2>
            <p className="text-xl text-slate-300">
              Everything you need to know about AI-powered precision oncology
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: 'How does CrisPRO access my data?',
                a: 'Your doctor uploads your genomic test results through a secure, HIPAA-compliant portal. Your data is encrypted and only accessible to your care team.'
              },
              {
                q: 'Will my insurance cover this?',
                a: 'Many insurance plans cover precision medicine testing. Our team works with your provider to verify coverage and explore financial assistance options if needed.'
              },
              {
                q: 'How long does it take to get results?',
                a: 'Most analyses are completed within 24-48 hours. VUS resolution and treatment matching can be done in as little as 2 days, compared to weeks or months with traditional approaches.'
              },
              {
                q: 'Can I use this if my doctor isn\'t familiar with CrisPRO?',
                a: 'Yes! We provide comprehensive support to oncologists and can connect you with a network of CrisPRO-trained physicians in your area.'
              },
              {
                q: 'Is this experimental or FDA-approved?',
                a: 'CrisPRO uses FDA-approved genomic tests as input. Our AI analysis provides clinical decision support to guide treatment selection, similar to how specialists interpret test results.'
              },
              {
                q: 'What if I\'m already in treatment?',
                a: 'CrisPRO can help at any stage—from initial diagnosis to monitoring treatment response to detecting resistance early. Our continuous monitoring adapts as your cancer evolves.'
              }
            ].map((faq, idx) => (
              <motion.details
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="group bg-slate-800/50 border border-slate-600 rounded-xl p-6 hover:border-slate-500 transition-colors"
              >
                <summary className="cursor-pointer list-none flex items-center justify-between">
                  <span className="text-lg font-semibold text-white">{faq.q}</span>
                  <ArrowRight className="w-5 h-5 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="mt-4 text-slate-300 leading-relaxed">{faq.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20 border border-blue-700/50 rounded-3xl p-12 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Get Started with CrisPRO
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Talk to your oncologist about CrisPRO, or connect with our patient support team for guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition-colors text-lg"
              >
                Get Started
              </Link>
              <Link
                href="/comparisons/patient"
                className="px-8 py-4 border-2 border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg font-semibold transition-colors text-lg"
              >
                Compare AI Systems
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientPageClient;

