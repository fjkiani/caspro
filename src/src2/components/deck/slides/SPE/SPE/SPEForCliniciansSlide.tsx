import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Gem, Zap, ArrowRight, Clock, Target, TrendingUp, Users, Brain, Shield, CheckCircle } from 'lucide-react';
import DigitalSynapseBackground from '../../../../site/blocks/DigitalSynapseBackground.tsx';
import { 
  SPE_FOR_CLINICIANS,
  SLIDE_ANIMATIONS, 
  COLORS, 
  GRADIENTS, 
  SIZES, 
  LAYOUT,
  COMPONENT_STYLES 
} from './constants';

const SPEForCliniciansSlide = () => (
    <motion.section
        key="slide3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200"
    >
        <DigitalSynapseBackground />
        <div className="relative z-10 w-full max-w-6xl space-y-12">
            <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500"> 
      {SPE_FOR_CLINICIANS.title}
    </h1> 
    <p className="text-2xl md:text-3xl font-light text-slate-300"> 
      {SPE_FOR_CLINICIANS.subtitle}
    </p> 
  </div> 

  <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto"> 
    <div className="flex flex-col lg:flex-row items-center justify-around w-full mt-12"> 

      {/* Step 1 */} 
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }} 
        className="flex flex-col items-center space-y-3 text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/3 mb-8 lg:mb-0" 
      > 
        <div className="p-4 rounded-full text-red-500"> 
          <FlaskConical size={48} /> 
        </div> 
        <h3 className="text-2xl font-bold text-slate-200">{SPE_FOR_CLINICIANS.steps[0].title}</h3> 
        <p className="text-lg text-slate-300">{SPE_FOR_CLINICIANS.steps[0].description}</p> 
      </motion.div> 

      <ArrowRight size={48} className="text-slate-400 rotate-90 lg:rotate-0" /> 

      {/* Step 2 */} 
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5, delay: 0.7 }} 
        className="flex flex-col items-center space-y-3 text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/3 mb-8 lg:mb-0" 
      > 
        <div className="p-4 rounded-full text-purple-500"> 
          <Gem size={48} /> 
        </div> 
        <h3 className="text-2xl font-bold text-slate-200">{SPE_FOR_CLINICIANS.steps[1].title}</h3> 
        <p className="text-lg text-slate-300">{SPE_FOR_CLINICIANS.steps[1].description}</p> 
      </motion.div> 

      <ArrowRight size={48} className="text-slate-400 rotate-90 lg:rotate-0" /> 

      {/* Step 3 */} 
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5, delay: 1.2 }} 
        className="flex flex-col items-center space-y-3 text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 shadow-lg w-full lg:w-1/3" 
      > 
        <div className="p-4 rounded-full text-orange-500"> 
          <Zap size={48} /> 
        </div> 
        <h3 className="text-2xl font-bold text-slate-200">{SPE_FOR_CLINICIANS.steps[2].title}</h3> 
        <p className="text-lg text-slate-300">{SPE_FOR_CLINICIANS.steps[2].description}</p> 
      </motion.div> 
    </div> 
  </div> 

  <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 shadow-lg"> 
    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 mb-8 text-center">
      {SPE_FOR_CLINICIANS.benefits.title}
    </h2> 
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> 
      {SPE_FOR_CLINICIANS.benefits.items.map((benefit, index) => {
        const icons = [<Zap size={48} className="text-yellow-400" />, <Shield size={48} className="text-blue-400" />, <Users size={48} className="text-green-400" />];
        const colors = ["from-yellow-500/20 to-orange-500/20", "from-blue-500/20 to-cyan-500/20", "from-green-500/20 to-emerald-500/20"];
        const borderColors = ["border-yellow-500/30", "border-blue-500/30", "border-green-500/30"];
        
        return (
          <motion.div 
            key={index} 
            className={`bg-gradient-to-br ${colors[index]} p-6 rounded-2xl border ${borderColors[index]} shadow-lg hover:shadow-xl transition-all duration-300`}
            whileHover={{ scale: 1.05, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          > 
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-3 bg-slate-800/50 rounded-full">
                {icons[index]}
              </div>
              <p className="text-lg font-semibold text-slate-200 leading-relaxed">{benefit}</p> 
            </div>
          </motion.div> 
        );
      })}
    </div> 
  </div> 

 

  <p className="text-xl text-slate-300 max-w-4xl mx-auto border-l-4 border-red-500 pl-6 text-left mt-12"> 
    {SPE_FOR_CLINICIANS.summary}
  </p> 
</div> 
    </motion.section>
);

export default SPEForCliniciansSlide;
