'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';

/**
 * Simple CSI Explanation - Beautiful, Clear, Human-Centered
 * Answers: "What does this even mean?" in plain language
 * Focus: Reduce unnecessary chemo by answering critical questions
 */
export default function SimpleCSIExplanation() {
  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-white via-blue-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* The Core Question - Big, Bold, Clear */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Will This Chemo Work?<br />
            <span className="text-blue-600">For How Long?</span><br />
            <span className="text-slate-600">When Should We Stop?</span>
          </h2>
          <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our mission: <strong className="text-slate-900">Reduce unnecessary chemo</strong> by answering these critical questions before treatment starts.
          </p>
        </motion.div>

        {/* The Simple Answer - Visual Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-blue-200 p-8 sm:p-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                One Simple Score Answers Everything
              </h3>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                CSI (ChemoSensitivity Index) is a score from 0-100 that predicts how well chemo will work for this specific patient, right now.
              </p>
            </div>

            {/* Visual Score Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* High Score */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-green-600 mb-2">72</div>
                  <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">High Score</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Chemo will likely work</div>
                      <div className="text-sm text-slate-600">Continue treatment</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">6+ months benefit</div>
                      <div className="text-sm text-slate-600">Expected response duration</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Medium Score */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-yellow-200">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-yellow-600 mb-2">50</div>
                  <div className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">Medium Score</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Moderate chance</div>
                      <div className="text-sm text-slate-600">Consider alternatives</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">3-6 months</div>
                      <div className="text-sm text-slate-600">Shorter benefit window</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Low Score */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl p-6 border-2 border-red-200">
                <div className="text-center mb-4">
                  <div className="text-5xl font-bold text-red-600 mb-2">28</div>
                  <div className="text-sm font-semibold text-red-700 uppercase tracking-wide">Low Score</div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Chemo unlikely to work</div>
                      <div className="text-sm text-slate-600">Avoid unnecessary treatment</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900">Save patient from side effects</div>
                      <div className="text-sm text-slate-600">Try different approach</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Real Example */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Real Example</span>
              </div>
              <div className="space-y-3">
                <p className="text-lg font-semibold text-slate-900">
                  Sarah, 58, ovarian cancer. Finished first round of chemo 14 months ago. Now considering second round.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-white rounded-lg p-4 border border-blue-200">
                    <div className="text-sm text-slate-500 mb-1">CSI Score</div>
                    <div className="text-3xl font-bold text-blue-600">72/100</div>
                  </div>
                  <ArrowRight className="w-6 h-6 text-blue-600" />
                  <div className="flex-1 bg-white rounded-lg p-4 border border-green-200">
                    <div className="text-sm text-slate-500 mb-1">Recommendation</div>
                    <div className="text-lg font-bold text-green-600">Continue Treatment</div>
                    <div className="text-sm text-slate-600">High probability of 6+ month benefit</div>
                  </div>
                </div>
                <p className="text-sm text-slate-600 italic">
                  ✅ Validated on 2,200+ patients. This specific scenario validated in TOPACIO trial (AUROC 0.714, p=0.023).
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* The Journey - What Unlocks After the Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              One Score. Complete Care Journey.
            </h3>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              CSI is just the beginning. As you add more data, we unlock more capabilities to guide the entire treatment journey.
            </p>
          </div>

          {/* Journey Steps */}
          <div className="space-y-6">
            {[
              {
                level: 1,
                title: "The Score",
                data: "Basic patient info (stage, cancer type)",
                unlocks: [
                  "CSI Score (0-100)",
                  "Will chemo work? Yes/No answer",
                  "Expected benefit duration"
                ],
                color: "blue",
                icon: "📊"
              },
              {
                level: 2,
                title: "Therapies & Trials",
                data: "+ Genomic test results",
                unlocks: [
                  "Top 5 drug recommendations ranked by match",
                  "Clinical trials you qualify for",
                  "Why each therapy fits your specific tumor"
                ],
                color: "purple",
                icon: "💊"
              },
              {
                level: 3,
                title: "Resistance Prediction",
                data: "+ Treatment history",
                unlocks: [
                  "When chemo might stop working",
                  "Early warning signs to watch for",
                  "When to retest and recalculate CSI"
                ],
                color: "orange",
                icon: "⚠️"
              },
              {
                level: 4,
                title: "Safety & Dosing",
                data: "+ Genetic safety screening",
                unlocks: [
                  "Prevent dangerous side effects before they happen",
                  "Personalized dosing recommendations",
                  "Drug interactions to avoid"
                ],
                color: "green",
                icon: "🛡️"
              },
              {
                level: 5,
                title: "Complete Care Plan",
                data: "+ Continuous monitoring",
                unlocks: [
                  "CSI updates automatically as tumor changes",
                  "Complete treatment timeline",
                  "Exportable care plan for your medical team"
                ],
                color: "indigo",
                icon: "📋"
              }
            ].map((step, index) => {
              const colorClasses = {
                blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', badge: 'bg-blue-100' },
                purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-600', badge: 'bg-purple-100' },
                orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-600', badge: 'bg-orange-100' },
                green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', badge: 'bg-green-100' },
                indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-600', badge: 'bg-indigo-100' }
              };
              const colors = colorClasses[step.color as keyof typeof colorClasses] || colorClasses.blue;
              
              return (
                <motion.div
                  key={step.level}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  className={`${colors.bg} rounded-2xl p-6 border-2 ${colors.border} shadow-lg`}
                >
                  <div className="flex items-start gap-4">
                    {/* Level Badge */}
                    <div className={`w-16 h-16 rounded-xl ${colors.badge} flex items-center justify-center text-2xl flex-shrink-0`}>
                      {step.icon}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full ${colors.badge} ${colors.text} text-sm font-bold`}>
                          Level {step.level}
                        </span>
                        <h4 className="text-xl font-bold text-slate-900">{step.title}</h4>
                      </div>
                      <p className="text-sm text-slate-600 mb-4">
                        <strong>With:</strong> {step.data}
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-slate-200">
                        <p className="text-sm font-semibold text-slate-700 mb-2">Unlocks:</p>
                        <ul className="space-y-2">
                          {step.unlocks.map((unlock, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle2 className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`} />
                              <span>{unlock}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* The Three Questions We Answer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-8">
            Three Questions. One Score. Clear Answers.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                question: "Will this chemo work?",
                answer: "CSI ≥70 = Yes, likely to work. CSI <40 = No, probably won't work.",
                icon: CheckCircle2,
                color: "blue"
              },
              {
                question: "For how long?",
                answer: "CSI predicts 6-month benefit probability. Higher score = longer expected benefit.",
                icon: Clock,
                color: "purple"
              },
              {
                question: "When should we stop?",
                answer: "If CSI drops below 40, chemo is unlikely to help. Save patient from unnecessary side effects.",
                icon: TrendingUp,
                color: "green"
              }
            ].map((item, index) => {
              const Icon = item.icon;
              const colorClasses = {
                blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
                purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
                green: { bg: 'bg-green-100', text: 'text-green-600' }
              };
              const colors = colorClasses[item.color as keyof typeof colorClasses] || colorClasses.blue;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="bg-white rounded-xl p-6 border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{item.question}</h4>
                  <p className="text-slate-600 leading-relaxed">{item.answer}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center"
        >
          <Link href="/products/oncology">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
            >
              <span>Get CSI Score for Your Patient</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
