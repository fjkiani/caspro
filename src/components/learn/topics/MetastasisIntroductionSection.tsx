'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingDown, Target, Brain, Heart, Bone } from 'lucide-react';
import SectionHeader from '../shared/SectionHeader';
import { SurvivalChart } from '../shared/SurvivalChart';
import { 
  metastasisSurvivalData, 
  metastasisIntroduction,
  metastasisStatistics 
} from '@/data/learn/oncology-101/metastasis-data';

const StatCard = ({ icon: Icon, title, value, description, delay = 0 }: {
  icon: any;
  title: string;
  value: string;
  description: string;
  delay?: number;
}) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg border border-slate-200"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <div className="flex items-center mb-4">
      <Icon className="w-8 h-8 text-red-500 mr-3" />
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    </div>
    <div className="text-3xl font-bold text-red-600 mb-2">{value}</div>
    <p className="text-slate-600 text-sm">{description}</p>
  </motion.div>
);

const KeyConcept = ({ title, description, icon: Icon, delay = 0 }: {
  title: string;
  description: string;
  icon: any;
  delay?: number;
}) => (
  <motion.div
    className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
  >
    <div className="flex items-start space-x-4">
      <Icon className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
      <div>
        <h4 className="font-semibold text-slate-900 mb-2">{title}</h4>
        <p className="text-slate-700 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

const MetastasisIntroductionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'statistics' | 'concepts'>('overview');

  const keyConcepts = [
    {
      title: "Multi-Step Process",
      description: "Metastasis requires cancer cells to successfully complete multiple sequential steps, each presenting opportunities for therapeutic intervention.",
      icon: Target
    },
    {
      title: "Inefficient Process",
      description: "Less than 0.01% of circulating tumor cells successfully establish metastatic colonies, highlighting the body's natural defenses.",
      icon: TrendingDown
    },
    {
      title: "Organ Specificity",
      description: "Different cancer types show preferences for specific metastatic sites based on molecular compatibility and anatomical factors.",
      icon: Brain
    },
    {
      title: "Clinical Significance",
      description: "Understanding metastasis is crucial for developing prevention strategies and improving patient outcomes in oncology.",
      icon: Heart
    }
  ];

  return (
    <div className="space-y-12">
      <SectionHeader
        title={metastasisIntroduction.title}
        subtitle="The process that transforms cancer from a local to a systemic disease"
        color="red"
      />

      {/* Navigation Tabs */}
      <div className="flex justify-center">
        <div className="bg-slate-100 p-1 rounded-lg">
          {[
            { key: 'overview', label: 'Overview' },
            { key: 'statistics', label: 'Key Statistics' },
            { key: 'concepts', label: 'Core Concepts' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-6 py-2 rounded-md transition-colors duration-200 ${
                activeTab === tab.key
                  ? 'bg-white text-slate-900 shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <motion.div
          key="overview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Introduction */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              {metastasisIntroduction.description}
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                <p className="text-red-800 font-medium">
                  Critical Insight: Metastasis, not the primary tumor, is responsible for the vast majority of cancer deaths.
                </p>
              </div>
            </div>
          </div>

          {/* Survival Impact Chart */}
          <SurvivalChart
            data={metastasisSurvivalData}
            title="The Devastating Impact of Metastasis on Survival"
          />
        </motion.div>
      )}

      {activeTab === 'statistics' && (
        <motion.div
          key="statistics"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard
              icon={AlertTriangle}
              title="Mortality Rate"
              value="90%"
              description="of cancer deaths are caused by metastasis, not primary tumors"
              delay={0.1}
            />
            <StatCard
              icon={TrendingDown}
              title="Success Rate"
              value="<0.01%"
              description="of circulating tumor cells successfully metastasize"
              delay={0.2}
            />
            <StatCard
              icon={Bone}
              title="Economic Impact"
              value="$200B"
              description="annual cost of metastatic cancer care in the US"
              delay={0.3}
            />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-6">Why These Numbers Matter</h3>
            <div className="space-y-4">
              <p className="text-slate-700">
                The stark contrast between metastatic and non-metastatic survival rates demonstrates why 
                understanding and preventing metastasis is the most critical challenge in oncology.
              </p>
              <p className="text-slate-700">
                The extremely low success rate of metastasis (&lt;0.01%) reveals that this is an inherently 
                inefficient process, suggesting that with the right interventions, we can tip the balance 
                in favor of the patient.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'concepts' && (
        <motion.div
          key="concepts"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {keyConcepts.map((concept, index) => (
            <KeyConcept
              key={concept.title}
              {...concept}
              delay={index * 0.1}
            />
          ))}
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Learning Path Ahead</h3>
            <p className="text-slate-700 mb-4">
              In this module, we will explore each of these concepts in detail, providing you with:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                A step-by-step breakdown of the metastatic cascade
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Molecular mechanisms underlying each step
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Clinical case studies demonstrating real-world applications
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Current and emerging therapeutic strategies
              </li>
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MetastasisIntroductionSection; 