'use client';

import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import { SurvivalChart } from '../shared/SurvivalChart';
import { InteractiveTimeline } from '../shared/InteractiveTimeline';
import { MetastasisCascade } from '../shared/MetastasisCascade';
import { 
  metastasisSurvivalData, 
  metastasisTimeline, 
  metastasisCascade,
  metastasisIntroduction 
} from '@/data/learn/oncology-101/metastasis-data';

const MetastasisSection: React.FC = () => {
  return (
    <div className="space-y-12">
      <SectionHeader
        title={metastasisIntroduction.title}
        subtitle="The process that makes cancer truly dangerous"
        color="red"
      />

      {/* Introduction */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-lg text-slate-700 leading-relaxed">
          {metastasisIntroduction.description}
        </p>
      </motion.div>

      {/* Survival Chart */}
      <SurvivalChart
        data={metastasisSurvivalData}
        title="The Lethal Impact of Metastasis: 5-Year Survival Rates (%)"
      />

      {/* Timeline */}
      <InteractiveTimeline
        events={metastasisTimeline}
        title="A History of Metastasis Theory"
      />

      {/* Metastatic Cascade */}
      <MetastasisCascade
        steps={metastasisCascade}
        title="The 8 Steps of the Metastatic Cascade"
      />

      {/* Key Insights */}
      <motion.div
        className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg border border-red-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-bold text-red-800 mb-3">
              Why Metastasis is So Deadly
            </h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• <strong>Survival rates plummet:</strong> As shown in the chart, metastatic cancer has dramatically lower survival rates</li>
              <li>• <strong>Treatment complexity:</strong> Metastatic disease is much harder to treat than localized cancer</li>
              <li>• <strong>Multiple organ involvement:</strong> Cancer can spread to vital organs like liver, lungs, and brain</li>
              <li>• <strong>Therapeutic resistance:</strong> Metastatic cells often develop resistance to treatments</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-red-800 mb-3">
              Modern Understanding
            </h3>
            <ul className="space-y-2 text-slate-700 text-sm">
              <li>• <strong>Multi-step process:</strong> Metastasis requires multiple molecular changes</li>
              <li>• <strong>Seed and soil:</strong> Both cancer cell properties and organ environment matter</li>
              <li>• <strong>Dormancy:</strong> Cancer cells can remain dormant for years before growing</li>
              <li>• <strong>Therapeutic targets:</strong> Each step offers potential intervention points</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MetastasisSection; 