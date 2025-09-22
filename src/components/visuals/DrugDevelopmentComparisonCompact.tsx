import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';    

//================================================================================
// 1. REUSABLE UI & LAYOUT COMPONENTS
//================================================================================

const Brand = () => (
  <div className="absolute bottom-8 right-8 z-20 text-lg font-semibold text-slate-500">
    CrisPRO.ai 🧬
  </div>
);

const SlideLayout = ({ children }: { children: React.ReactNode }) => (
    <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 text-gray-800 overflow-hidden"
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
        <p className="text-2xl md:text-1xl font-light text-slate-600 max-w-5xl mx-auto">
            {subtitle}
        </p>
    </div>
);

const FunnelPoint = ({ number, label, delay }: { number: string; label: string; delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="absolute z-10"
    >
        {/* Black circle with line - EXACT STYLE FROM IMAGE */}
        <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-black rounded-full"></div>
            <div className="w-8 h-px bg-black"></div>
        </div>
        
        {/* Text annotation - EXACT STYLE FROM IMAGE */}
        <div className="mt-1 text-center">
            <p className="text-sm font-bold text-black">{number}</p>
            <p className="text-xs text-black whitespace-nowrap">{label}</p>
        </div>
    </motion.div>
);

//================================================================================
// 2. DRUG FUNNEL SLIDE COMPONENT
//================================================================================

const DrugFunnelSlide = () => {
    const funnelStages = [
        { name: "Drug Discovery and Design", width: 'w-2/5', color: 'bg-blue-600' },
        { name: "Clinical Trials Phase I and Proof-of-Concept", width: 'w-1/5', color: 'bg-blue-500' },
        { name: "Clinical Trials Phase II", width: 'w-1/5', color: 'bg-blue-400' },
        { name: "Clinical Trials Phase III", width: 'w-1/5', color: 'bg-blue-300' },
        { name: "Registration", width: 'w-1/12', color: 'bg-blue-200' },
    ];
    
    return (
    <SlideLayout>
        <SlideHeader 
            title="Numbers behind new drugs"
            subtitle="The Old Way: A Funnel"
            titleClassName="from-slate-700 to-slate-900"
        />
        
        <div className="w-full max-w-6xl mx-auto mt-20">
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
                    {/* The Funnel Shape - SHARP DROP FROM WIDE TO NARROW */}
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
                             <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-400 opacity-90"></div>
                        </motion.div>
                        
                        {/* Data Points - EXACT POSITIONING LIKE THE IMAGE */}
                        <div className="absolute -top-8 left-[5%]">
                            <FunnelPoint number="10,000" label="compounds in the beginning" delay={0.5}/>
                        </div>
                         <div className="absolute -top-8 left-[50%]">
                            <FunnelPoint number="10" label="compounds in clinic" delay={1.0}/>
                        </div>
                         <div className="absolute -top-8 right-[10%]">
                            <FunnelPoint number="1" label="new medicine" delay={5.5}/>
                        </div>
                    </div>
                    
                    {/* The Timeline Axis */}
                    <div className="relative -mt-8 flex items-center">
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
                        <div className="absolute -right-4 top-0 w-0 h-0 
                            border-t-[32px] border-t-transparent
                            border-b-[32px] border-b-transparent
                            border-l-[32px] border-l-blue-200">
                        </div>
                    </div>
                </div>
            </div>
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2.5 }}
             >
                <p className="mt-2 text-lg font-bold text-slate-700">10-15 years</p>
            </motion.div>
        </div>
    </SlideLayout>
);
}


//================================================================================
// 3. MAIN APP SHELL
//================================================================================

const App = () => {
    return (
        <main className="relative w-full h-screen bg-gray-50 overflow-hidden">
             <Brand />
            <AnimatePresence mode="wait">
                <DrugFunnelSlide />
            </AnimatePresence>
        </main>
    );
};

export default App;