'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, Factory, Target, Zap, Shield, Command } from 'lucide-react';

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
// 3. THE NEW DOCTRINE: A FACTORY (Left Side)
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
        <p className="text-lg text-slate-600">Two AI engines working in perfect harmony</p>
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
// 4. MAIN COMPARISON COMPONENT
//================================================================================

const DrugDevelopmentComparison = () => {
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
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-20">
            {/* Left Side: The New Doctrine - A Factory */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <DrugFactoryVisualization />
              
              {/* Key Metrics */}
              
            </motion.div>

            {/* Right Side: The Old Way - A Funnel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              
            </motion.div>
          </div>
        </SlideLayout>
      </AnimatePresence>
    </main>
  );
};

export default DrugDevelopmentComparison;
