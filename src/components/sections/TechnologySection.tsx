'use client';

import { motion } from 'framer-motion';
import { Tab as HeadlessUiTab } from '@headlessui/react';
import React from 'react';
import { Shield, Key, Database, Server, Lock } from 'lucide-react';
import { TECHNOLOGY_CONFIG } from '@/data/technology-section-config';
import ModelViewer from '../ui/ProteinModelViewer';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const CapabilityCard = ({ name, details, index }: { name: string, details: string, index: number }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0, transition: { delay: index * 0.1 } }
    }}
    className="bg-slate-800/50 p-4 rounded-lg border border-slate-700"
  >
    <p className="font-semibold text-primary text-sm">{name}</p>
    <p className="text-slate-400 text-xs">{details}</p>
  </motion.div>
);

const SecurityDiagram = () => (
    <div className="w-full h-full flex items-center justify-center p-4">
        <div className="relative w-64 h-64">
            <Shield className="w-full h-full text-blue-500/10" strokeWidth={0.5} />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-slate-900 border-2 border-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                    CrisPRO
                </div>
            </div>
            {[
                { Icon: Key, label: 'Encryption', pos: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2' },
                { Icon: Lock, label: 'Access Control', pos: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2' },
                { Icon: Database, label: 'Data Storage', pos: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2' },
                { Icon: Server, label: 'Infrastructure', pos: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2' },
            ].map(({ Icon, label, pos }) => (
                <div key={label} className={`absolute ${pos} flex flex-col items-center text-center`}>
                    <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                        <Icon className="text-teal-400" />
                    </div>
                    <span className="text-xs text-slate-400 mt-1">{label}</span>
                </div>
            ))}
        </div>
    </div>
);

const TechnologySection = () => {
  return (
    <section id={TECHNOLOGY_CONFIG.sectionId} className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">{TECHNOLOGY_CONFIG.title}</h2>
          <p className="text-lg text-muted-foreground">{TECHNOLOGY_CONFIG.subtitle}</p>
        </motion.div>

        <HeadlessUiTab.Group>
          <HeadlessUiTab.List className="flex flex-col sm:flex-row gap-2 rounded-xl bg-slate-800/60 p-2 max-w-4xl mx-auto mb-12 shadow-md border border-slate-700">
            {TECHNOLOGY_CONFIG.tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <HeadlessUiTab
                  key={tab.name}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-3 px-2 text-sm font-medium leading-5 transition-colors duration-200',
                      'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-slate-900 ring-primary/60',
                      selected
                        ? 'bg-primary text-white shadow-lg'
                        : 'text-slate-300 hover:bg-white/10'
                    )
                  }
                >
                  <div className="flex items-center justify-center sm:justify-start gap-3 px-2">
                    <Icon className="w-5 h-5" />
                    <div>
                      <span className="font-semibold">{tab.name}</span>
                      <span className="text-xs text-slate-400 ml-2 hidden md:inline">{tab.description}</span>
                    </div>
                  </div>
                </HeadlessUiTab>
              )
            })}
          </HeadlessUiTab.List>
          <HeadlessUiTab.Panels>
            {TECHNOLOGY_CONFIG.tabs.map((tab, idx) => (
              <HeadlessUiTab.Panel
                key={idx}
                className="focus:outline-none"
              >
                <motion.div
                  initial={{ opacity: 0.8, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start"
                >
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold mb-4 text-slate-100">{tab.content.heading}</h3>
                    <p className="text-slate-400 mb-6">{tab.content.description}</p>
                    <motion.div 
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: { transition: { staggerChildren: 0.05 } }
                      }}
                      className="grid grid-cols-2 gap-3"
                    >
                      {tab.content.capabilities.map((item, itemIdx) => (
                        <CapabilityCard key={itemIdx} name={item.name} details={item.details} index={itemIdx} />
                      ))}
                    </motion.div>
                  </div>
                  <div className="lg:col-span-3 relative h-80 lg:h-96 bg-slate-900/50 rounded-xl flex items-center justify-center p-4 shadow-inner border border-slate-800">
                    {tab.modelPath ? (
                          <ModelViewer 
                            modelUrl={tab.modelPath}
                          />
                    ) : (
                      <SecurityDiagram />
                    )}
                  </div>
                </motion.div>
              </HeadlessUiTab.Panel>
            ))}
          </HeadlessUiTab.Panels>
        </HeadlessUiTab.Group>
      </div>
    </section>
  );
};

export default TechnologySection; 