'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target, 
  Zap, 
  Shield,
  TrendingUp,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';

interface JourneyStep {
  number: number;
  title: string;
  description: string;
  icon: any;
  isLast?: boolean;
  variant?: 'old' | 'new';
  problems?: string[];
  solutions?: string[];
  metrics?: {
    time?: string;
    success?: string;
    cost?: string;
    patients?: string;
  };
}

interface CapabilityJourneyProps {
  title: string;
  subtitle: string;
  oldWaySteps: JourneyStep[];
  newWaySteps: JourneyStep[];
  comparisonMetrics?: {
    oldWay: {
      timeToTreatment: string;
      successRate: string;
      averageCost: string;
      patientSatisfaction: string;
    };
    newWay: {
      timeToTreatment: string;
      successRate: string;
      averageCost: string;
      patientSatisfaction: string;
    };
  };
}

const JourneyStep = ({ 
  number, 
  title, 
  description, 
  icon: Icon, 
  isLast = false,
  variant = 'old',
  problems = [],
  solutions = [],
  metrics = {}
}: JourneyStep) => (
  <motion.div 
    className={`relative ${!isLast ? 'pb-8' : ''}`}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    {!isLast && (
      <div className={`absolute left-6 top-12 w-0.5 h-full ${
        variant === 'old' ? 'bg-red-500/30' : 'bg-green-500/30'
      }`}></div>
    )}
    
    <div className="flex items-start space-x-4">
      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 ${
        variant === 'old' 
          ? 'bg-red-500/20 border-red-500/50' 
          : 'bg-green-500/20 border-green-500/50'
      }`}>
        <Icon className={`w-6 h-6 ${
          variant === 'old' ? 'text-red-400' : 'text-green-400'
        }`} />
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center space-x-3 mb-2">
          <span className={`text-sm font-bold px-2 py-1 rounded ${
            variant === 'old' 
              ? 'bg-red-500/20 text-red-400' 
              : 'bg-green-500/20 text-green-400'
          }`}>
            Step {number}
          </span>
          <h4 className="text-lg font-bold text-white">{title}</h4>
        </div>
        
        <p className="text-gray-300 mb-3">{description}</p>
        
        {problems.length > 0 && (
          <div className="mb-3">
            <h5 className="text-sm font-semibold text-red-400 mb-1">Key Problems:</h5>
            <ul className="text-sm text-gray-400 space-y-1">
              {problems.map((problem, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <AlertTriangle className="w-3 h-3 text-red-400" />
                  <span>{problem}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {solutions.length > 0 && (
          <div className="mb-3">
            <h5 className="text-sm font-semibold text-green-400 mb-1">Solutions:</h5>
            <ul className="text-sm text-gray-400 space-y-1">
              {solutions.map((solution, idx) => (
                <li key={idx} className="flex items-center space-x-2">
                  <CheckCircle className="w-3 h-3 text-green-400" />
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Metrics will be added when we have real data */}
        {/* {Object.keys(metrics).length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
            {metrics.time && (
              <div className="bg-gray-800/50 p-2 rounded text-center">
                <Clock className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                <div className="text-xs text-gray-400">Time</div>
                <div className="text-sm font-semibold text-white">{metrics.time}</div>
              </div>
            )}
            {metrics.success && (
              <div className="bg-gray-800/50 p-2 rounded text-center">
                <TrendingUp className="w-4 h-4 mx-auto mb-1 text-green-400" />
                <div className="text-xs text-gray-400">Success</div>
                <div className="text-sm font-semibold text-white">{metrics.success}</div>
              </div>
            )}
            {metrics.cost && (
              <div className="bg-gray-800/50 p-2 rounded text-center">
                <DollarSign className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
                <div className="text-xs text-gray-400">Cost</div>
                <div className="text-sm font-semibold text-white">{metrics.cost}</div>
              </div>
            )}
            {metrics.patients && (
              <div className="bg-gray-800/50 p-2 rounded text-center">
                <Users className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                <div className="text-xs text-gray-400">Patients</div>
                <div className="text-sm font-semibold text-white">{metrics.patients}</div>
              </div>
            )}
          </div>
        )} */}
      </div>
    </div>
  </motion.div>
);

// Comparison metrics will be added when we have real data
// const ComparisonMetrics = ({ comparisonMetrics }: { comparisonMetrics: CapabilityJourneyProps['comparisonMetrics'] }) => {
//   if (!comparisonMetrics) return null;
//   // ... metrics display code
// };

export const CapabilityJourney: React.FC<CapabilityJourneyProps> = ({
  title,
  subtitle,
  oldWaySteps,
  newWaySteps,
  comparisonMetrics
}) => {
  const [activeView, setActiveView] = useState<'comparison' | 'old' | 'new'>('comparison');
  const leftScrollRef = useRef<HTMLDivElement>(null);
  const rightScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);

  // Synchronized scrolling
  const handleLeftScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isScrollingRef.current) return;
    isScrollingRef.current = true;
    if (rightScrollRef.current) {
      rightScrollRef.current.scrollTop = e.currentTarget.scrollTop;
    }
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 50);
  };

  const handleRightScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isScrollingRef.current) return;
    isScrollingRef.current = true;
    if (leftScrollRef.current) {
      leftScrollRef.current.scrollTop = e.currentTarget.scrollTop;
    }
    setTimeout(() => {
      isScrollingRef.current = false;
    }, 50);
  };

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        <p className="text-xl text-gray-400 max-w-4xl mx-auto">{subtitle}</p>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="bg-gray-800/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveView('comparison')}
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              activeView === 'comparison' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setActiveView('old')}
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              activeView === 'old' 
                ? 'bg-red-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Traditional Way
          </button>
          <button
            onClick={() => setActiveView('new')}
            className={`px-4 py-2 rounded transition-colors duration-200 ${
              activeView === 'new' 
                ? 'bg-green-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            In-Silico Way
          </button>
        </div>
      </div>

      {/* Comparison metrics will be added when we have real data */}
      {/* {comparisonMetrics && <ComparisonMetrics comparisonMetrics={comparisonMetrics} />} */}
      
      {activeView === 'comparison' && (
        <div className="relative">
          {/* Side-by-Side Comparison Container with Synchronized Scrolling */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Traditional Approach - Left Side */}
            <div className="relative">
              <div className="sticky top-4">
                <div className="text-center mb-8">
                  <h4 className="text-xl font-bold text-red-400 mb-2">Traditional Approach</h4>
                  <p className="text-gray-400">Current limitations and challenges</p>
                </div>
                <div 
                  ref={leftScrollRef}
                  onScroll={handleLeftScroll}
                  className="space-y-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-2"
                >
                  {oldWaySteps.map((step, index) => (
                    <JourneyStep 
                      key={index}
                      {...step}
                      variant="old"
                      isLast={index === oldWaySteps.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            {/* In-Silico Approach - Right Side */}
            <div className="relative">
              <div className="sticky top-4">
                <div className="text-center mb-8">
                  <h4 className="text-xl font-bold text-green-400 mb-2">In-Silico Approach</h4>
                  <p className="text-gray-400">How we transform the process</p>
                </div>
                <div 
                  ref={rightScrollRef}
                  onScroll={handleRightScroll}
                  className="space-y-8 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 pr-2"
                >
                  {newWaySteps.map((step, index) => (
                    <JourneyStep 
                      key={index}
                      {...step}
                      variant="new"
                      isLast={index === newWaySteps.length - 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeView === 'old' && (
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h4 className="text-xl font-bold text-red-400 mb-2">Traditional Approach: Limitations & Gaps</h4>
            <p className="text-gray-400">Why current methods fall short</p>
          </div>
          <div className="space-y-8">
            {oldWaySteps.map((step, index) => (
              <JourneyStep 
                key={index}
                {...step}
                variant="old"
                isLast={index === oldWaySteps.length - 1}
              />
            ))}
          </div>
        </div>
      )}
      
      {activeView === 'new' && (
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h4 className="text-xl font-bold text-green-400 mb-2">In-Silico Approach: The Future</h4>
            <p className="text-gray-400">How we revolutionize the process</p>
          </div>
          <div className="space-y-8">
            {newWaySteps.map((step, index) => (
              <JourneyStep 
                key={index}
                {...step}
                variant="new"
                isLast={index === newWaySteps.length - 1}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default CapabilityJourney;
