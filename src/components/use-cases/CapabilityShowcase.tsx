import React from 'react';
import { motion } from 'framer-motion';
import { 
  Dna, 
  Target, 
  Users, 
  FileText, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

interface CapabilityShowcaseProps {
  capabilities: Record<string, {
    title: string;
    description: string;
    features: string[];
    whyItMatters: string[];
    whatWeDelivered: string[];
  }>;
}

const getCapabilityIcon = (key: string) => {
  switch (key) {
    case 'variantInsight': return <Dna className="w-6 h-6" />;
    case 'therapyFit': return <Target className="w-6 h-6" />;
    case 'pathwayView': return <Users className="w-6 h-6" />;
    case 'toxicityRisk': return <Shield className="w-6 h-6" />;
    case 'crisprReadiness': return <Zap className="w-6 h-6" />;
    case 'clinicalTrials': return <FileText className="w-6 h-6" />;
    default: return <Star className="w-6 h-6" />;
  }
};

const getCapabilityColor = (key: string) => {
  switch (key) {
    case 'variantInsight': return 'from-blue-500 to-blue-600';
    case 'therapyFit': return 'from-green-500 to-green-600';
    case 'pathwayView': return 'from-purple-500 to-purple-600';
    case 'toxicityRisk': return 'from-red-500 to-red-600';
    case 'crisprReadiness': return 'from-yellow-500 to-yellow-600';
    case 'clinicalTrials': return 'from-indigo-500 to-indigo-600';
    default: return 'from-gray-500 to-gray-600';
  }
};

export const CapabilityShowcase: React.FC<CapabilityShowcaseProps> = ({ capabilities }) => {
  return (
    <div className="space-y-8">
      {Object.entries(capabilities).map(([key, capability], index) => (
        <motion.div
          key={key}
          className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500"
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div className={`p-4 rounded-xl bg-gradient-to-r ${getCapabilityColor(key)} text-white shadow-lg`}>
              {getCapabilityIcon(key)}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold text-gray-800">{capability.title}</h3>
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Live
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">{capability.description}</p>

              {/* Three-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {capability.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why It Matters */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-500" />
                    Why It Matters
                  </h4>
                  <ul className="space-y-2">
                    {capability.whyItMatters.map((reason, reasonIndex) => (
                      <li key={reasonIndex} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What We Delivered */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    What We Delivered
                  </h4>
                  <ul className="space-y-2">
                    {capability.whatWeDelivered.map((delivery, deliveryIndex) => (
                      <li key={deliveryIndex} className="flex items-start gap-2 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0"></div>
                        <span>{delivery}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <motion.div
                className="mt-6 flex justify-end"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Explore in Platform
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
