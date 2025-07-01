'use client';
import React from 'react';
import { FileText, Zap, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-lg text-gray-400 max-w-4xl mx-auto">{subtitle}</p>
    </div>
);

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: React.ElementType, title: string, description: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center"
    >
        <Icon className="w-10 h-10 mx-auto mb-4 text-blue-400" />
        <h4 className="text-lg font-semibold text-white mb-2">{title}</h4>
        <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
);

const MetastaticPotentialReportSection = () => {
    return (
        <section className="py-16">
            <SectionHeader
                title="Introducing: The Metastatic Potential Report"
                subtitle="A first-in-class prognostic tool that quantifies the likelihood of a primary tumor to metastasize, based on its unique genomic signature."
            />
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <FeatureCard
                    icon={FileText}
                    title="Comprehensive Analysis"
                    description="Integrates whole-genome sequencing data with key clinical markers to generate a single, actionable metastasis score."
                    delay={0.2}
                />
                <FeatureCard
                    icon={BarChart3}
                    title="Predictive Accuracy"
                    description="Our model, trained on thousands of patient profiles, predicts metastatic events with over 90% accuracy."
                    delay={0.4}
                />
                <FeatureCard
                    icon={Zap}
                    title="Actionable Insights"
                    description="Provides clinicians with a clear, evidence-based rationale for adjuvant therapy decisions, moving beyond the one-size-fits-all standard of care."
                    delay={0.6}
                />
            </div>
        </section>
    );
};

export default MetastaticPotentialReportSection; 