import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import './App.css';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const DeckViewerPage = React.lazy(() => import('./pages/DeckViewerPage'));
const SiteHomePage = React.lazy(() => import('./pages/SiteHomePage'));
const ProductOracle = React.lazy(() => import('./pages/ProductOracle'));
const ProductForge = React.lazy(() => import('./pages/ProductForge'));
const ProductCommandCenter = React.lazy(() => import('./pages/ProductCommandCenter'));
const ProductBoltz = React.lazy(() => import('./pages/ProductBoltz'));
const BiotechTransformation = React.lazy(() => import('./pages/BiotechTransformation'));
const ClinicalTransformation = React.lazy(() => import('./pages/ClinicalTransformation'));
const GeneticTestingTransformation = React.lazy(() => import('./pages/GeneticTestingTransformation'));
const DemoFactoryPage = React.lazy(() => import('./pages/DemoFactoryPage'));
const UseCaseDemoPage = React.lazy(() => import('./pages/UseCaseDemoPage'));
const UseCasesIndex = React.lazy(() => import('./pages/UseCasesIndex'));
const SlideComposer = React.lazy(() => import('./components/SlideComposer'));
const MixAndMatchPage = React.lazy(() => import('./pages/MixAndMatchPage'));
const MixAndMatchDemo = React.lazy(() => import('./pages/MixAndMatchDemo'));

function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <div className="min-h-screen bg-slate-900">
          <Suspense fallback={<div className="w-full h-screen flex items-center justify-center text-white">Loading…</div>}>
            <Routes>
              <Route path="/deck/:deckId" element={<DeckViewerPage />} />
              <Route path="/site" element={<SiteHomePage />} />
              <Route path="/site/oracle" element={<ProductOracle />} />
              <Route path="/site/forge" element={<ProductForge />} />
              <Route path="/site/command-center" element={<ProductCommandCenter />} />
              <Route path="/site/boltz" element={<ProductBoltz />} />
              <Route path="/site/biotech-transformation" element={<BiotechTransformation />} />
              <Route path="/site/clinical-transformation" element={<ClinicalTransformation />} />
              <Route path="/site/genetic-testing-transformation" element={<GeneticTestingTransformation />} />
              <Route path="/site/demo-factory" element={<DemoFactoryPage />} />
              <Route path="/site/use-cases" element={<UseCasesIndex />} />
              <Route path="/site/demo/usecase/:id" element={<UseCaseDemoPage />} />
              <Route path="/composer" element={<SlideComposer />} />
              <Route path="/mix-and-match" element={<MixAndMatchPage />} />
              <Route path="/mix-and-match-demo" element={<MixAndMatchDemo />} />
              {/* Legacy aliases */}
              <Route path="/ProductOracle" element={<Navigate to="/site/oracle" replace />} />
              <Route path="/ProductForge" element={<Navigate to="/site/forge" replace />} />
              <Route path="/ProductCommandCenter" element={<Navigate to="/site/command-center" replace />} />
              <Route path="/ProductBoltz" element={<Navigate to="/site/boltz" replace />} />
              
              {/* Convenient shortcuts */}
              <Route path="/oracle" element={<Navigate to="/site/oracle" replace />} />
              <Route path="/forge" element={<Navigate to="/site/forge" replace />} />
              <Route path="/command-center" element={<Navigate to="/site/command-center" replace />} />
              <Route path="/boltz" element={<Navigate to="/site/boltz" replace />} />
              <Route path="/biotech-transformation" element={<Navigate to="/site/biotech-transformation" replace />} />
              <Route path="/clinical-transformation" element={<Navigate to="/site/clinical-transformation" replace />} />
              <Route path="/genetic-testing-transformation" element={<Navigate to="/site/genetic-testing-transformation" replace />} />
              <Route path="/BiotechTransformation" element={<Navigate to="/site/biotech-transformation" replace />} />
              <Route path="/" element={
                <>
                  <Header />
                  <HomePage />
                </>
              } />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </AccessibilityProvider>
  );
}

export default App;
