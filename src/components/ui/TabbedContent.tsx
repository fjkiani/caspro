'use client';

import React, { useState, ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, Layers, Zap, BookOpen, HelpCircle } from 'lucide-react';

export interface Tab {
  id: string;
  label: string;
  iconName?: string;
  content: React.ReactNode;
}

interface TabbedContentProps {
  tabs: Tab[];
  initialTab?: string;
}

const iconComponents: { [key: string]: ElementType } = {
  Layers,
  Zap,
  BookOpen,
};

const TabbedContent: React.FC<TabbedContentProps> = ({ tabs, initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab || tabs[0]?.id);

  if (!tabs || tabs.length === 0) {
    return null;
  }

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="bg-slate-100/50 p-2 rounded-xl border border-slate-200">
      <div className="flex items-center space-x-2">
        {tabs.map(tab => {
          const IconComponent = tab.iconName ? iconComponents[tab.iconName] || HelpCircle : null;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${
                isActive
                  ? 'bg-white text-primary shadow-md'
                  : 'text-slate-500 hover:bg-white/60 hover:text-slate-800'
              } group flex-1 inline-flex items-center justify-center py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200`}
              aria-current={isActive ? 'page' : undefined}
            >
              {IconComponent && <IconComponent className={`mr-2 h-5 w-5 ${isActive ? 'text-primary' : 'text-slate-400'}`} aria-hidden="true" />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
      <div className="py-8 bg-white mt-2 rounded-lg shadow-inner">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-6"
          >
            {activeTabData?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TabbedContent;
