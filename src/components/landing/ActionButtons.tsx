'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActionButtonsProps {
  actions: Array<{ label: string; href: string }>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ actions }) => {
  const getIcon = (label: string) => {
    if (label.includes('Analyze')) return Search;
    if (label.includes('Run')) return Play;
    return ArrowRight;
  };

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Try It Now</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Experience our capabilities with live demos and interactive tools
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
          {actions.map((action, index) => {
            const IconComponent = getIcon(action.label);
            
            return (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  to={action.href}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  {action.label}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ActionButtons;
