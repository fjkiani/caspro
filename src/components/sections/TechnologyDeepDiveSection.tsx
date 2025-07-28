'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, Settings } from 'lucide-react';
import { DEEP_DIVE_CONFIG } from '@/data/technology-deep-dive-config';
import ModelViewer from '../ui/ProteinModelViewer';

const TechnologyCardContent = ({ tech }: { tech: any }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
    <div>
      <div className="flex items-center mb-4">
        <tech.icon className="w-10 h-10 text-primary mr-4" />
        <h3 className="text-2xl font-bold text-slate-100">{tech.title}</h3>
      </div>
      <div className="space-y-6">
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center text-teal-400 mb-2">
            <BookOpen className="w-5 h-5 mr-2" />
            <h4 className="font-semibold">Scientific Basis</h4>
          </div>
          <p className="text-slate-400 text-sm">{tech.scientificBasis}</p>
        </div>
        <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
          <div className="flex items-center text-purple-400 mb-2">
            <Settings className="w-5 h-5 mr-2" />
            <h4 className="font-semibold">How it Works in CrisPRO</h4>
          </div>
          <p className="text-slate-400 text-sm">{tech.howItWorks}</p>
        </div>
      </div>
    </div>
    <div className="h-80 bg-slate-900/50 rounded-xl flex items-center justify-center p-4 shadow-inner border border-slate-800">
      <ModelViewer modelUrl={tech.modelPath} />
    </div>
  </div>
);

const StackedCard = ({ item, index, scrollYProgress, totalCards }: { item: any, index: number, scrollYProgress: any, totalCards: number }) => {
    const yOffset = -50;
    const scaleStep = 0.05;
    const cardScrollPart = 1 / totalCards;

    const start = index * cardScrollPart;
    const end = start + cardScrollPart;

    const initialY = useTransform(scrollYProgress, [start, end], ["50vh", "0vh"]);
    
    const stackYInputRange = [end];
    const stackYOutputRange = [0];
    for (let i = index + 1; i < totalCards; i++) {
        stackYInputRange.push(end + (i - index) * cardScrollPart);
        stackYOutputRange.push(yOffset * (i - index));
    }
    const y = useTransform(scrollYProgress, stackYInputRange, stackYOutputRange);

    const scaleInputRange = [start, end];
    const scaleOutputRange = [0.8, 1];
    for (let i = index + 1; i < totalCards; i++) {
        scaleInputRange.push(end + (i - index) * cardScrollPart);
        scaleOutputRange.push(1 - scaleStep * (i - index));
    }
    const scale = useTransform(scrollYProgress, scaleInputRange, scaleOutputRange);

    return (
  <motion.div
            style={{
                zIndex: index,
                y: useTransform(scrollYProgress, [start, end], ["50vh", "0vh"]),
                transform: y.get() !== 0 ? `translateY(${y.get()}px) scale(${scale.get()})` : `translateY(${initialY.get()}) scale(${scale.get()})`
            }}
            className="absolute top-0 left-0 right-0 h-screen flex items-center justify-center px-4"
        >
            <div className="w-full max-w-6xl mx-auto">
                <div className="bg-slate-800/80 p-8 rounded-2xl border border-slate-700 backdrop-blur-md">
                    <TechnologyCardContent tech={item} />
    </div>
    </div>
  </motion.div>
);
};


const TechnologyDeepDiveSection: React.FC = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 1024);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end']
    });

    const slides = [...DEEP_DIVE_CONFIG.technologies];
    const totalParts = slides.length;

    if (isMobile) {
  return (
        <section id={DEEP_DIVE_CONFIG.sectionId} className="relative bg-background text-foreground py-20">
          <div className="container mx-auto px-4 space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6 text-gradient">{DEEP_DIVE_CONFIG.title}</h2>
                <p className="text-lg text-muted-foreground">{DEEP_DIVE_CONFIG.subtitle}</p>
              </div>
        </motion.div>

            {DEEP_DIVE_CONFIG.technologies.map((tech) => (
              <motion.div key={tech.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}>
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
                  <TechnologyCardContent tech={tech} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      );
    }

    return (
        <section ref={sectionRef} id={DEEP_DIVE_CONFIG.sectionId} className="relative bg-background text-foreground" style={{ height: `${totalParts * 90}vh` }}>
            <div className="sticky top-0 h-screen overflow-hidden">

                <div className="absolute top-24 left-0 right-0 z-20 px-4">
        <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">{DEEP_DIVE_CONFIG.title}</h2>
                        <p className="text-lg text-muted-foreground">{DEEP_DIVE_CONFIG.subtitle}</p>
        </motion.div>
                </div>

                <div className="absolute inset-0">
                    {slides.map((slide, i) => (
                        <StackedCard 
                            key={i}
                            item={slide}
                            index={i}
                            scrollYProgress={scrollYProgress}
                            totalCards={totalParts}
                        />
                    ))}
                </div>

      </div>
    </section>
  );
};

export default TechnologyDeepDiveSection; 