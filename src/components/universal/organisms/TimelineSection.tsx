'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, User, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';
import { TimelineData, TimelineEvent } from '@/types/universal-content';

interface TimelineSectionProps {
  data: TimelineData;
  className?: string;
}

const TimelineEventCard: React.FC<{ 
  event: TimelineEvent; 
  index: number; 
  isActive?: boolean;
  onClick?: () => void;
}> = ({ event, index, isActive = false, onClick }) => {
  return (
    <motion.div
      className={`relative cursor-pointer ${onClick ? 'hover:scale-105' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : {}}
    >
      {/* Timeline Line */}
      <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-slate-200"></div>
      
      {/* Timeline Dot */}
      <motion.div
        className={`absolute left-3 top-8 w-6 h-6 rounded-full border-4 ${
          isActive ? 'bg-red-500 border-red-200' : 'bg-white border-slate-300'
        } shadow-lg z-10`}
        animate={{
          scale: isActive ? 1.2 : 1,
          boxShadow: isActive ? '0 0 20px rgba(239, 68, 68, 0.3)' : '0 2px 4px rgba(0,0,0,0.1)'
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Content */}
      <div className="ml-12 pb-8">
        <motion.div
          className={`bg-white rounded-lg shadow-lg border-2 p-6 transition-all duration-200 ${
            isActive ? 'border-red-200 shadow-xl' : 'border-slate-200'
          }`}
          animate={{
            borderColor: isActive ? '#fecaca' : '#e2e8f0',
            boxShadow: isActive 
              ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Year Badge */}
          <div className="flex items-center justify-between mb-4">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
              isActive ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
            }`}>
              {event.date}
            </span>
            {event.scientist && (
              <div className="flex items-center space-x-2 text-sm text-slate-600">
                <User className="w-4 h-4" />
                <span>{event.scientist}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className={`text-lg font-semibold mb-2 ${
            isActive ? 'text-red-700' : 'text-slate-900'
          }`}>
            {event.title}
          </h3>

          {/* Contribution */}
          {event.contribution && (
            <div className="mb-3">
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm font-medium">
                {event.contribution}
              </span>
            </div>
          )}

          {/* Description */}
          <p className="text-slate-700 text-sm leading-relaxed mb-4">
            {event.description}
          </p>

          {/* Significance */}
          {event.significance && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <Lightbulb className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-yellow-800 text-sm">Significance</h4>
                  <p className="text-yellow-700 text-xs mt-1">{event.significance}</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

const InteractiveTimeline: React.FC<{ data: TimelineData }> = ({ data }) => {
  const [activeEvent, setActiveEvent] = useState<number>(0);

  const nextEvent = () => {
    setActiveEvent((prev) => (prev + 1) % data.events.length);
  };

  const previousEvent = () => {
    setActiveEvent((prev) => (prev - 1 + data.events.length) % data.events.length);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={previousEvent}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <div className="text-center">
          <div className="text-sm text-slate-600">
            Event {activeEvent + 1} of {data.events.length}
          </div>
          <div className="font-medium text-slate-900">
            {data.events[activeEvent].date}
          </div>
        </div>
        
        <button
          onClick={nextEvent}
          className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Event Selector */}
      <div className="flex justify-center">
        <div className="flex space-x-2">
          {data.events.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveEvent(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                activeEvent === index ? 'bg-red-500' : 'bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Active Event */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeEvent}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <TimelineEventCard
            event={data.events[activeEvent]}
            index={0}
            isActive={true}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const StaticTimeline: React.FC<{ data: TimelineData }> = ({ data }) => {
  return (
    <div className="relative">
      {data.events.map((event, index) => (
        <TimelineEventCard
          key={event.id}
          event={event}
          index={index}
        />
      ))}
    </div>
  );
};

const TimelineSection: React.FC<TimelineSectionProps> = ({ data, className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      {(data.title || data.subtitle) && (
        <div className="text-center">
          {data.title && (
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">
              {data.title}
            </h3>
          )}
          {data.subtitle && (
            <p className="text-slate-600">{data.subtitle}</p>
          )}
        </div>
      )}

      {/* Timeline */}
      <div className="max-w-4xl mx-auto">
        {data.interactive ? (
          <InteractiveTimeline data={data} />
        ) : (
          <StaticTimeline data={data} />
        )}
      </div>
    </div>
  );
};

export default TimelineSection; 