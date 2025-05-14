'use client';

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

interface LoadingProps {
  className?: string;
  error?: Error | null;
  isLoading?: boolean;
  pastDelay?: boolean;
  timedOut?: boolean;
}

// Create a loading placeholder that matches the server-side render exactly
const LoadingPlaceholder = ({ className, error }: LoadingProps) => (
  <div className={className || 'w-full h-full min-h-[300px] md:min-h-[400px] bg-slate-200 rounded-lg overflow-hidden shadow-lg'}>
    <div className="w-full h-full flex items-center justify-center">
      {error ? (
        <div className="text-red-600">Error loading viewer</div>
      ) : (
        <div className="animate-pulse text-gray-600">Loading 3D viewer...</div>
      )}
    </div>
  </div>
);

// Dynamically import the Three.js component with no SSR
const ThreeScene = dynamic(
  () => import('./ThreeScene').catch(() => () => <LoadingPlaceholder />),
  {
    ssr: false,
    loading: LoadingPlaceholder,
  }
);

interface ProteinModelViewerProps {
  modelUrl?: string;
  className?: string;
}

const ProteinModelViewer: React.FC<ProteinModelViewerProps> = ({ className, modelUrl }) => {
  return (
    <Suspense fallback={<LoadingPlaceholder className={className} />}>
      <ThreeScene className={className} modelUrl={modelUrl || '/models/3nmm-haemoglobin.glb'} />
    </Suspense>
  );
};

export default ProteinModelViewer; 