import React from 'react';
import { DemoFactory } from '../components/site';
import AccessibilityToggle from '../components/AccessibilityToggle';

const DemoFactoryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      <AccessibilityToggle />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <DemoFactory />
      </div>
    </div>
  );
};

export default DemoFactoryPage; 