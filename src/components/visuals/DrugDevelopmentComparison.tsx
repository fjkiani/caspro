'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Factory, Target, Zap, Shield, Command, ArrowRight } from 'lucide-react';

//================================================================================
// 1. REUSABLE UI & LAYOUT COMPONENTS
//================================================================================

const Brand = () => (
  <div className="absolute bottom-8 right-8 z-20 text-lg font-semibold text-slate-500">
    CrisPRO.ai 🧬
  </div>
);

const SlideLayout = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    className={`relative w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 text-gray-800 overflow-hidden ${className}`}
  >
    <div className="relative z-10 w-full max-w-7xl space-y-12">
      {children}
    </div>
  </motion.section>
);

const SlideHeader = ({ title, subtitle, titleClassName = '' }: { title: string; subtitle: string; titleClassName?: string }) => (
  <div className="space-y-4">
    <h1 className={`text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${titleClassName}`}>
      {title}
    </h1>
    <p className="text-2xl md:text-4xl font-light text-slate-600 max-w-5xl mx-auto">
      {subtitle}
    </p>
  </div>
);

const FunnelPoint = ({ number, label, delay, position, color = 'blue' }: { number: string; label: string; delay: number; position: any; color?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="absolute z-10"
    style={position}
  >
    <div className={`bg-white px-4 py-2 rounded-lg shadow-lg border border-slate-200 text-center ${
      color === 'green' ? 'border-green-200' : 'border-blue-200'
    }`}>
      <p className={`text-2xl font-bold ${color === 'green' ? 'text-green-800' : 'text-blue-800'}`}>
        {number}
      </p>
      <p className="text-sm text-slate-600 whitespace-nowrap">{label}</p>
    </div>
    <div className={`mx-auto mt-2 w-px h-8 ${color === 'green' ? 'bg-green-300' : 'bg-slate-300'}`}></div>
    <div className={`mx-auto w-4 h-4 bg-white rounded-full border-2 ${
      color === 'green' ? 'border-green-400' : 'border-slate-400'
    } shadow-md`}></div>
  </motion.div>
);

const EngineIcon = ({ icon: Icon, label, delay, color = 'green' }: { icon: React.ComponentType<any>; label: string; delay: number; color?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center space-y-2"
  >
    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
      color === 'green' ? 'bg-green-100 border-2 border-green-300' : 'bg-blue-100 border-2 border-blue-300'
    }`}>
      <Icon className={`w-8 h-8 ${color === 'green' ? 'text-green-600' : 'text-blue-600'}`} />
    </div>
    <p className={`text-sm font-semibold ${color === 'green' ? 'text-green-700' : 'text-blue-700'}`}>
      {label}
    </p>
  </motion.div>
);

//================================================================================
// 2. TAB COMPONENT
//================================================================================

const TabButton = ({ 
  isActive, 
  onClick, 
  children, 
  color = 'blue' 
}: { 
  isActive: boolean; 
  onClick: () => void; 
  children: React.ReactNode; 
  color?: string;
}) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
      isActive
        ? color === 'green' 
          ? 'bg-green-600 text-white shadow-lg' 
          : 'bg-blue-600 text-white shadow-lg'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
    }`}
  >
    {children}
  </button>
);

//================================================================================
// 3. THE OLD WAY: A FUNNEL
//================================================================================

const DrugFunnelVisualization = () => {
  const funnelStages = [
    { name: "Drug Discovery & Design", width: 'w-2/5', color: 'bg-blue-700' },
    { name: "Clinical Trials Phase I", width: 'w-1/5', color: 'bg-blue-600' },
    { name: "Clinical Trials Phase II", width: 'w-1/5', color: 'bg-blue-500' },
    { name: "Clinical Trials Phase III", width: 'w-1/5', color: 'bg-blue-400' },
    { name: "Registration", width: 'w-1/12', color: 'bg-blue-300' },
  ];
  
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-700 mb-2">The Old Way: A Funnel</h2>
        <p className="text-lg text-slate-600">Low-probability screening</p>
      </div>
      
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex w-full">
          {/* Target Discovery Block */}
          <motion.div 
            className="w-1/6 bg-blue-800 text-white text-sm font-semibold p-2 text-center rounded-l-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            Target Discovery
          </motion.div>

          {/* Funnel and Timeline Container */}
          <div className="w-5/6">
            {/* The Funnel Shape */}
            <div className="relative h-64">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-blue-600"
                initial={{ width: "100%", height: "100%" }}
                animate={{ width: "25%", height: "100%"}}
                transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 65%, 25% 100%, 0 100%)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-400 opacity-70"></div>
              </motion.div>
              
              {/* Data Points */}
              <div className="absolute -top-16 left-[5%]">
                <FunnelPoint 
                  number="10,000" 
                  label="compounds in the beginning" 
                  delay={0.5}
                  position={{ left: 0 }}
                />
              </div>
              <div className="absolute -top-16 left-[50%]">
                <FunnelPoint 
                  number="10" 
                  label="compounds in clinic" 
                  delay={1.0}
                  position={{ left: 0 }}
                />
              </div>
              <div className="absolute -top-16 right-[10%]">
                <FunnelPoint 
                  number="1" 
                  label="new medicine" 
                  delay={1.5}
                  position={{ right: 0 }}
                />
              </div>
            </div>
            
            {/* The Timeline Axis */}
            <div className="relative -mt-16 flex items-center">
              <div className="flex h-16 w-full shadow-inner">
                {funnelStages.map((stage, index) => (
                  <motion.div
                    key={stage.name}
                    className={`${stage.width} ${stage.color} flex items-center justify-center text-white text-sm font-semibold p-2 text-center border-r border-blue-900/20`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.9 + index * 0.1 }}
                  >
                    {stage.name}
                  </motion.div>
                ))}
              </div>
              <div className="absolute -right-5 top-0 w-0 h-0 
                border-t-[32px] border-t-transparent
                border-b-[32px] border-b-transparent
                border-l-[32px] border-l-blue-300">
              </div>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        >
          <p className="mt-4 text-xl font-bold text-slate-700">10-15 Years</p>
        </motion.div>
      </div>
    </div>
  );
};

//================================================================================
// 4. THE NEW DOCTRINE: A FACTORY
//================================================================================

const DrugFactoryVisualization = () => {
  const factoryStages = [
    { name: "Oracle Analysis", width: 'w-1/4', color: 'bg-green-700', icon: BrainCircuit },
    { name: "Forge Design", width: 'w-1/4', color: 'bg-green-600', icon: Factory },
    { name: "Boltz Validation", width: 'w-1/4', color: 'bg-green-500', icon: Shield },
    { name: "Command Center", width: 'w-1/4', color: 'bg-green-400', icon: Command },
  ];
  
  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-700 mb-2">The New Doctrine: A Factory</h2>
        <p className="text-lg text-slate-600">High-certainty generation</p>
      </div>
      
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex w-full">
          {/* Input Block */}
          <motion.div 
            className="w-1/6 bg-green-800 text-white text-sm font-semibold p-2 text-center rounded-l-lg flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.8 }}
          >
            Target Input
          </motion.div>

          {/* Factory and Timeline Container */}
          <div className="w-5/6">
            {/* The Factory Shape - HIGH CURVE! */}
            <div className="relative h-64">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-green-600"
                initial={{ width: "100%", height: "100%" }}
                animate={{ width: "100%", height: "100%"}}
                transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-400 opacity-70"></div>
              </motion.div>
              
              {/* High Success Data Points */}
              <div className="absolute -top-16 left-[5%]">
                <FunnelPoint 
                  number="1,000" 
                  label="targets analyzed" 
                  delay={0.5}
                  position={{ left: 0 }}
                  color="green"
                />
              </div>
              <div className="absolute -top-16 left-[50%]">
                <FunnelPoint 
                  number="900" 
                  label="validated targets" 
                  delay={1.0}
                  position={{ left: 0 }}
                  color="green"
                />
              </div>
              <div className="absolute -top-16 right-[10%]">
                <FunnelPoint 
                  number="810" 
                  label="therapeutic assets" 
                  delay={1.5}
                  position={{ right: 0 }}
                  color="green"
                />
              </div>
            </div>
            
            {/* The Factory Timeline Axis */}
            <div className="relative -mt-16 flex items-center">
              <div className="flex h-16 w-full shadow-inner">
                {factoryStages.map((stage, index) => (
                  <motion.div
                    key={stage.name}
                    className={`${stage.width} ${stage.color} flex items-center justify-center text-white text-sm font-semibold p-2 text-center border-r border-green-900/20`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.9 + index * 0.1 }}
                  >
                    {stage.name}
                  </motion.div>
                ))}
              </div>
              <div className="absolute -right-5 top-0 w-0 h-0 
                border-t-[32px] border-t-transparent
                border-b-[32px] border-b-transparent
                border-l-[32px] border-l-green-300">
              </div>
            </div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        >
          <p className="mt-4 text-xl font-bold text-green-700">1 Week</p>
        </motion.div>
      </div>
    </div>
  );
};

//================================================================================
// 5. KEY METRICS COMPONENTS
//================================================================================

const OldWayMetrics = () => (
  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
    <h3 className="text-xl font-bold text-blue-800 mb-4">Key Metrics</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <p className="text-3xl font-bold text-blue-600">0.01%</p>
        <p className="text-sm text-blue-700">Success Rate</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-blue-600">1x</p>
        <p className="text-sm text-blue-700">Speed</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-blue-600">$2.6B</p>
        <p className="text-sm text-blue-700">Cost per Drug</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-blue-600">15 Years</p>
        <p className="text-sm text-blue-700">Timeline</p>
      </div>
    </div>
  </div>
);

const NewWayMetrics = () => (
  <div className="bg-green-50 p-6 rounded-xl border border-green-200">
    <h3 className="text-xl font-bold text-green-800 mb-4">Key Metrics</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="text-center">
        <p className="text-3xl font-bold text-green-600">90%</p>
        <p className="text-sm text-green-700">Success Rate</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-green-600">36x</p>
        <p className="text-sm text-green-700">Faster</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-green-600">$500K</p>
        <p className="text-sm text-green-700">Cost per Target</p>
      </div>
      <div className="text-center">
        <p className="text-3xl font-bold text-green-600">1 Week</p>
        <p className="text-sm text-green-700">Timeline</p>
      </div>
    </div>
  </div>
);

//================================================================================
// 6. MAIN COMPARISON COMPONENT WITH TABS
//================================================================================

const DrugDevelopmentComparison = () => {
  const [activeTab, setActiveTab] = useState<'old' | 'new'>('old');

  return (
    <main className="relative w-full h-screen bg-gray-50 overflow-hidden">
      <Brand />
      <AnimatePresence mode="wait">
        <SlideLayout>
          <SlideHeader 
            title="The Transformation"
            subtitle="From a funnel of failure to a factory of success"
            titleClassName="from-slate-700 to-slate-900"
          />
          
          {/* Tab Navigation */}
          <div className="flex justify-center space-x-4 mb-8">
            <TabButton
              isActive={activeTab === 'old'}
              onClick={() => setActiveTab('old')}
              color="blue"
            >
              The Old Way: A Funnel
            </TabButton>
            <TabButton
              isActive={activeTab === 'new'}
              onClick={() => setActiveTab('new')}
              color="green"
            >
              The New Doctrine: A Factory
            </TabButton>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'old' ? (
              <motion.div
                key="old"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <DrugFunnelVisualization />
                <OldWayMetrics />
              </motion.div>
            ) : (
              <motion.div
                key="new"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <DrugFactoryVisualization />
                <NewWayMetrics />
              </motion.div>
            )}
          </AnimatePresence>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-2xl border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Ready to Transform Your Drug Development?</h3>
              <p className="text-lg text-slate-600 mb-6">
                Join the biotech leaders who've eliminated the $2.6B gamble with mathematical certainty.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Schedule Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        </SlideLayout>
      </AnimatePresence>
    </main>
  );
};

export default DrugDevelopmentComparison;