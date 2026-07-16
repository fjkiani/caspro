'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Activity, 
  X,
  Play
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { TRIAL_CASE_FILES, HAND_AUTHORED_TRIAL_IDS, VECTOR_AXIS_META, type TrialCaseFile } from '@/data/trial-case-files';

// --- Dynamic Gene Columns (from user's spec) ---
const GENES = [
  "KRAS", "BRCA1", "TP53", "EGFR", "CDK4", "PIK3CA", "MET", "RET", "ALK", "NTRK1"
];

// --- Generate cohort data seeded from a real trial's vector axes ---
const generateCohortFromTrial = (trial: TrialCaseFile, count: number) => {
  const responder = trial.responderVector;
  const nonResponder = trial.nonResponderVector;
  
  return Array.from({ length: count }, (_, i) => {
    const isResponder = Math.random() > 0.45;
    const base = isResponder ? responder : nonResponder;
    const id = `${trial.id.toUpperCase().slice(0, 3)}-${(1001 + i).toString()}`;
    
    const scores: Record<string, number> = {};
    GENES.forEach((gene, gi) => {
      const axisKeys = Object.keys(base) as (keyof typeof base)[];
      const axisVal = base[axisKeys[gi % axisKeys.length]] || 0;
      // Add realistic jitter around the vector value
      const jitter = (Math.random() - 0.5) * 0.3;
      scores[gene] = Math.max(-1, Math.min(1, +(axisVal + jitter).toFixed(3)));
    });
    
    return { id, isResponder, ...scores };
  });
};

// --- 3D Wireframe DNA Background ---
const DnaBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).THREE) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.onload = () => setIsLoaded(true);
      document.head.appendChild(script);
      return () => { if (document.head.contains(script)) document.head.removeChild(script); };
    } else {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !mountRef.current) return;

    const THREE = (window as any).THREE;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 50;

    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    const strandPoints = 80;
    const radius = 7;
    const heightStep = 0.5;
    const twist = 0.35;

    const createScaffold = (offset = 0) => {
      const pts: any[] = [];
      for (let i = 0; i < strandPoints; i++) {
        const angle = i * twist + offset;
        const y = (i - strandPoints / 2) * heightStep;
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
      }
      const curve = new THREE.CatmullRomCurve3(pts);
      const tubeGeo = new THREE.TubeGeometry(curve, 80, 0.8, 6, false);
      return new THREE.Mesh(tubeGeo, new THREE.MeshBasicMaterial({ 
        color: 0x4fd1c5, wireframe: true, transparent: true, opacity: 0.1 
      }));
    };

    dnaGroup.add(createScaffold(0));
    dnaGroup.add(createScaffold(Math.PI));
    dnaGroup.rotation.z = Math.PI / 8;

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      dnaGroup.rotation.y += 0.002;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
    };
  }, [isLoaded]);

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-50 pointer-events-none" />;
};

// --- Main Platform ---

export default function GenomicHero({ embedded = false }: { embedded?: boolean }) {
  const { isDarkMode } = useTheme();
  
  // Pick first available trial for cohort data
  const activeTrial = useMemo(() => {
    const firstId = HAND_AUTHORED_TRIAL_IDS[0];
    return TRIAL_CASE_FILES[firstId];
  }, []);

  const data = useMemo(() => generateCohortFromTrial(activeTrial, 29), [activeTrial]);
  const visibleRows = useMemo(() => data.slice(0, 8), [data]);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [simulating, setSimulating] = useState(false);
  const [simResults, setSimResults] = useState<{ successRate: string; confidence: number } | null>(null);

  const runSimulation = () => {
    setSimulating(true);
    setSimResults(null);
    setTimeout(() => {
      setSimResults({ 
        successRate: (activeTrial.cosineResponder * 100).toFixed(1), 
        confidence: activeTrial.engineRun.delta 
      });
      setSimulating(false);
    }, 1800);
  };

  const shell =
    embedded
      ? 'relative w-full h-full min-h-0 flex-1 flex flex-col overflow-hidden font-mono select-none'
      : 'relative w-full min-h-screen h-screen overflow-hidden font-mono select-none';

  return (
    <div className={`${shell} transition-colors duration-500 ${
      isDarkMode ? 'bg-[#05070a]' : 'bg-slate-50'
    }`}>
      
      <DnaBackground />

      <main className="relative z-10 p-4 sm:p-6 lg:p-8 lg:px-16 max-w-[1600px] mx-auto flex flex-col flex-1 min-h-0 h-full pt-16 sm:pt-20 lg:pt-24">
        
        {/* Trial Identity Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 shrink-0">
          <div className="min-w-0">
            <div className={`text-[10px] font-black uppercase tracking-[0.5em] mb-1 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-500'}`}>
              {activeTrial.trialId} // {activeTrial.sponsor}
            </div>
            <h2 className={`text-base sm:text-lg font-black uppercase tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {activeTrial.drug}
            </h2>
            <div className={`text-[10px] uppercase tracking-widest mt-1 font-bold ${isDarkMode ? 'text-zinc-500' : 'text-slate-800'}`}>
              {activeTrial.phase} · {activeTrial.cancer} · n={activeTrial.enrolled}
            </div>
          </div>
          <div className="flex gap-3 items-center shrink-0">
            <button 
              onClick={runSimulation}
              disabled={simulating}
              className={`px-6 py-2.5 rounded border text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-2 ${
                simulating 
                  ? (isDarkMode ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 animate-pulse' : 'bg-indigo-500/20 border-indigo-500 text-indigo-500 animate-pulse')
                  : (isDarkMode ? 'bg-white text-black hover:bg-cyan-500 border-transparent' : 'bg-slate-900 text-white hover:bg-indigo-600 border-transparent')
              }`}
            >
              {simulating ? <Activity className="w-3 h-3 animate-spin" /> : <Play className="w-3 h-3" />}
              {simulating ? 'Running...' : 'Run Simulation'}
            </button>
          </div>
        </div>

        {/* Simulation Results */}
        <AnimatePresence>
          {simResults && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`mb-4 p-4 rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                isDarkMode ? 'bg-cyan-500/5 border border-cyan-500/20' : 'bg-indigo-50 border border-indigo-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
                <div className="flex flex-col">
                  <span className="zeta-evidence-label">Responder Match</span>
                  <span className={`text-2xl font-light ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>{simResults.successRate}%</span>
                </div>
                <div className={`flex flex-col border-l pl-8 ${isDarkMode ? 'border-zinc-800' : 'border-slate-200'}`}>
                  <span className="zeta-evidence-label">Mechanism alignment Δ</span>
                  <span className={`text-2xl font-light ${isDarkMode ? 'text-zinc-400' : 'text-slate-950'}`}>+{simResults.confidence.toFixed(4)}</span>
                </div>
              </div>
              <button onClick={() => setSimResults(null)} className="p-2 hover:bg-zinc-900 rounded transition-colors">
                <X className={`w-4 h-4 ${isDarkMode ? 'text-zinc-700' : 'text-slate-400'}`} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Genomic Matrix Table */}
        <div className={`relative flex-1 min-h-0 rounded-sm border overflow-hidden flex flex-col ${
          isDarkMode ? 'bg-black/40 border-zinc-900' : 'bg-white/80 border-slate-200'
        }`}>
          <div className="overflow-x-auto overflow-y-hidden min-h-0 flex-1 touch-pan-x">
            <div className="p-4 sm:p-6 min-w-[720px]">
              {/* Table Header */}
              <div className={`grid grid-cols-[100px_repeat(10,1fr)] gap-4 mb-4 border-b pb-4 text-[9px] font-black uppercase tracking-widest ${
                isDarkMode ? 'text-zinc-700 border-zinc-900' : 'text-slate-900 border-slate-200'
              }`}>
                <div className="pl-3">Cohort_ID</div>
                {GENES.map(gene => <div key={gene} className="text-center">{gene}</div>)}
              </div>

              {/* Grid Data */}
              <div className="space-y-0.5">
                {visibleRows.map((row: any, idx: number) => (
                  <motion.div
                    key={row.id}
                    onMouseEnter={() => setHoveredRow(row.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.02 }}
                    className={`grid grid-cols-[100px_repeat(10,1fr)] gap-4 py-2.5 items-center border-l-2 transition-all cursor-crosshair rounded text-[11px] ${
                      hoveredRow === row.id 
                      ? (isDarkMode ? 'bg-cyan-500/5 border-cyan-500 text-zinc-100' : 'bg-indigo-50 border-indigo-500 text-slate-900')
                      : (isDarkMode ? 'border-transparent text-zinc-500 hover:bg-zinc-950/50' : 'border-transparent text-slate-950 hover:bg-slate-50')
                    }`}
                  >
                    <div className="font-mono pl-3 text-[11px]">{row.id}</div>
                    {GENES.map((gene: string) => (
                      <div key={gene} className={`text-center font-mono text-[11px] ${
                        row[gene] > 0.7 
                          ? (isDarkMode ? 'text-cyan-400 font-bold' : 'text-indigo-600 font-bold') 
                          : row[gene] < -0.3 
                            ? 'text-rose-500' 
                            : ''
                      }`}>
                        {row[gene].toFixed(3)}
                      </div>
                    ))}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <div className={`mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8 px-2 pb-6 sm:pb-8 lg:pb-10 shrink-0 font-bold ${isDarkMode ? 'text-zinc-700' : 'text-slate-900'}`}>
          <span className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-cyan-500' : 'bg-indigo-500'}`} />
            {activeTrial.id.toUpperCase()} Cohort · n={visibleRows.length}
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest">
            Δ {activeTrial.deltaImpact} | Gates: {activeTrial.gatesSummary}
          </span>
        </div>
      </main>
    </div>
  );
}