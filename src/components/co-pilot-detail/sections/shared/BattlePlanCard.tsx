'use client';

import React, { ElementType } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, LucideIcon } from 'lucide-react';

interface BattlePlanCardProps {
  icon: ElementType;
  label: string;
  description: string;
  color: string;
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

const BattlePlanCard: React.FC<BattlePlanCardProps> = ({
  icon: Icon,
  label,
  description,
  color,
  index,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200/80 transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10">
          <Icon className={`w-6 h-6 ${color || 'text-primary'}`} />
        </div>
        <div>
          <h3 className="text-md font-bold text-slate-800">{label}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default BattlePlanCard;

