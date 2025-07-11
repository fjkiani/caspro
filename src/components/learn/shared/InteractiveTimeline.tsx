'use client';

import { motion } from 'framer-motion';
import { TimelineEvent } from '@/data/learn/oncology-101/metastasis-data';

interface InteractiveTimelineProps {
  events: TimelineEvent[];
  title: string;
}

export const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({ events, title }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-2xl font-semibold text-center text-slate-800 mb-6">
        {title}
      </h3>
      
      <div className="relative pl-8">
        {/* Timeline Line */}
        <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-slate-300"></div>
        
        {/* Timeline Items */}
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            className="relative mb-8 last:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            {/* Timeline Dot */}
            <motion.div
              className="absolute left-12 top-2 -ml-2 w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-md"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: (index * 0.2) + 0.1 }}
              whileHover={{ scale: 1.2 }}
            />
            
            {/* Event Content */}
            <motion.div
              className="ml-10 pl-8 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              whileHover={{ x: 5 }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-red-600 text-lg">
                  {event.year} - {event.scientist}
                </h4>
              </div>
              <h5 className="font-semibold text-slate-800 mb-1">
                {event.contribution}
              </h5>
              <p className="text-slate-600 text-sm">
                {event.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}; 