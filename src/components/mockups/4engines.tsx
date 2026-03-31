import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  Tooltip
} from 'recharts';
import { Target, Activity, Database, Cpu, ShieldCheck, Zap, X, Search, Fingerprint, ChevronRight, TrendingUp } from 'lucide-react';

// --- Technical DNA Background Component ---
const DnaBackground = ({ speed = 1, isScanning = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => {
      const THREE = window.THREE;
      if (!mountRef.current) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);

      camera.position.z = 60;

      const dnaGroup = new THREE.Group();
      scene.add(dnaGroup);

      const strandPoints = 120;
      const radius = 10;
      const heightStep = 0.5;
      const twist = 0.35;

      const createDataStrand = (offset = 0) => {
        const positions = [];
        for (let i = 0; i < strandPoints; i++) {
          const angle = i * twist + offset;
          const y = (i - strandPoints / 2) * heightStep;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          for (let j = 0; j < 8; j++) {
            positions.push(
              x + (Math.random() - 0.5) * 2,
              y + (Math.random() - 0.5) * 1.5,
              z + (Math.random() - 0.5) * 2
            );
          }
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({
          color: isScanning ? 0xf43f5e : 0x4fd1c5,
          size: 0.08,
          transparent: true,
          opacity: isScanning ? 0.2 : 0.1,
          blending: THREE.AdditiveBlending
        });
        return new THREE.Points(geo, mat);
      };

      let s1 = createDataStrand(0);
      let s2 = createDataStrand(Math.PI);
      dnaGroup.add(s1, s2);
      dnaGroup.rotation.z = Math.PI / 6;

      const animate = () => {
        frameRef.current = requestAnimationFrame(animate);
        dnaGroup.rotation.y += 0.001 * speed;
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
    };
    document.head.appendChild(script);
    return () => {
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
    };
  }, [speed, isScanning]);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none transition-all duration-1000" />;
};

// --- Sub-components ---

const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any[] }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-black/95 border border-cyan-500/50 p-4 font-mono backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <p className="text-[10px] text-white uppercase font-black">Subject: {data.id}</p>
        </div>
        <div className="space-y-1.5 border-t border-zinc-800 pt-2">
          <div className="flex justify-between gap-8">
            <span className="text-[10px] text-zinc-500">P(RESP)</span>
            <span className="text-[11px] text-cyan-400 font-bold">{data.y.toFixed(4)}</span>
          </div>
          <div className="flex justify-between gap-8">
            <span className="text-[10px] text-zinc-500">RISK(TOX)</span>
            <span className="text-[11px] text-rose-400 font-bold">{data.x.toFixed(4)}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const generatePoints = (count: number, baseId: string, xRange: number[], yRange: number[]) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${baseId}-${(1000 + i)}`,
    x: xRange[0] + Math.random() * (xRange[1] - xRange[0]),
    y: yRange[0] + Math.random() * (yRange[1] - yRange[0]),
    z: 100
  }));
};

const ENGINES = [
  {
    id: '01',
    title: 'TARGET-LOCK',
    question: 'Is the target a real metastasis driver?',
    stats: 'AUROC 0.976 · 11/11 FDA prospective · Precision@3 = 1.000',
    color: 'text-cyan-500',
    border: 'border-cyan-500/30'
  },
  {
    id: '02',
    title: 'MECHANISM ALIGNMENT',
    question: 'Are the right patients enrolled?',
    stats: 'LATIFY delta +0.3658 identified before trial failure',
    color: 'text-cyan-500',
    border: 'border-cyan-500/30'
  },
  {
    id: '03',
    title: 'KILL CHAIN',
    question: 'When does resistance begin?',
    stats: 'RESISTANCE DETECTED',
    color: 'text-rose-500',
    border: 'border-rose-500/30',
    hasAlert: true
  },
  {
    id: '04',
    title: 'IO RISK-BENEFIT GATE',
    question: 'Will checkpoint immunotherapy help or harm?',
    stats: 'AUC 0.822 · RULE_OUT for non-responders',
    color: 'text-cyan-400',
    border: 'border-cyan-400/30'
  }
];

import { useTheme } from '@/context/ThemeContext';

export default function App() {
  const { isDarkMode } = useTheme();
  const [activeEngine, setActiveEngine] = useState('04');
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanPos, setScanPos] = useState(0);
  const [speed, setSpeed] = useState(1);

  const grayData = useMemo(() => generatePoints(65, 'SB', [0, 0.62], [0.38, 0.92]), []);
  const redData = useMemo(() => generatePoints(45, 'FT', [0.68, 0.88], [0.12, 0.42]), []);

  const stepLine = [
    { x: 0.0, y: 0.5 }, { x: 0.3, y: 0.5 }, { x: 0.3, y: 0.35 },
    { x: 0.55, y: 0.35 }, { x: 0.55, y: 0.45 }, { x: 0.6, y: 0.45 },
    { x: 0.6, y: 0.55 }, { x: 0.65, y: 0.55 }, { x: 0.65, y: 0.65 },
    { x: 0.75, y: 0.65 }, { x: 0.75, y: 0.7 }, { x: 0.85, y: 0.7 },
  ];

  const handleScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setSpeed(12);
    let start: number | null = null;
    const duration = 2500;
    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = timestamp - start;
      const val = Math.min(progress / duration, 1);
      setScanPos(val);
      if (progress < duration) requestAnimationFrame(step);
      else {
        setTimeout(() => {
          setIsScanning(false);
          setSpeed(1);
          setScanPos(0);
        }, 500);
      }
    };
    requestAnimationFrame(step);
  };

  return (
    <div className={`min-h-screen font-mono selection:bg-cyan-500/30 overflow-hidden flex flex-col p-12 relative transition-colors duration-500 ${isDarkMode ? 'bg-[#05070a] text-zinc-400' : 'bg-slate-50 text-slate-600'}`}>
      <DnaBackground speed={speed} isScanning={isScanning} />

      {/* Header Info */}
      <div className="z-10 mb-12">
        <h2 className={`text-sm font-light tracking-widest uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
          Four engines. One question: <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Will this work for this patient?</span>
        </h2>
      </div>

      <div className="z-10 flex gap-12 h-full max-w-[1700px] mx-auto w-full">
        
        {/* Left Side: The Interactive Engine Stack */}
        <div className="w-[450px] space-y-2">
          {ENGINES.map((engine) => (
            <div 
              key={engine.id}
              onClick={() => setActiveEngine(engine.id)}
              className={`group cursor-pointer border backdrop-blur-md transition-all duration-500 overflow-hidden flex ${
                isDarkMode ? 'border-zinc-800/50 bg-black/40 hover:bg-zinc-900/30' : 'border-slate-200 bg-white/60 hover:bg-slate-100/50'
              } ${
                activeEngine === engine.id ? 'ring-1 ring-cyan-500/50 scale-[1.02] shadow-[0_0_40px_rgba(6,182,212,0.1)]' : ''
              }`}
            >
              {/* Number ID */}
              <div className={`w-24 flex items-center justify-center border-r border-zinc-800/50 transition-colors ${
                activeEngine === engine.id ? 'bg-cyan-500/5' : ''
              }`}>
                <span className={`text-5xl font-bold tracking-tighter transition-all duration-500 ${
                  activeEngine === engine.id ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'text-zinc-800 group-hover:text-zinc-700'
                }`}>
                  {engine.id}
                </span>
              </div>

              {/* Engine Content */}
              <div className="flex-1 p-6 relative">
                {activeEngine === engine.id && (
                  <motion.div layoutId="active-marker" className="absolute left-0 top-0 bottom-0 w-[3px] bg-cyan-500" />
                )}
                
                <div className="flex flex-col h-full justify-center gap-1">
                  <h3 className={`text-[12px] font-black tracking-[0.2em] transition-colors ${
                    activeEngine === engine.id ? 'text-white' : 'text-zinc-500'
                  }`}>
                    {engine.title}: <span className="font-light">{engine.question}</span>
                  </h3>
                  
                  {engine.hasAlert ? (
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[11px] font-black text-rose-500 tracking-widest uppercase">RESISTANCE DETECTED</span>
                      <div className="w-16 h-6 flex items-end gap-[2px]">
                         {[0.2, 0.4, 0.3, 0.6, 0.5, 0.8, 0.7, 0.9].map((h, i) => (
                           <div key={i} className="flex-1 bg-rose-500/50" style={{ height: `${h * 100}%` }} />
                         ))}
                      </div>
                    </div>
                  ) : (
                    <p className={`text-[10px] font-bold tracking-wider mt-1 transition-colors ${
                      activeEngine === engine.id ? 'text-cyan-700' : 'text-zinc-700'
                    }`}>
                      {engine.stats}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Dynamic Context Area */}
        <div className={`flex-1 min-w-0 border rounded shadow-2xl relative backdrop-blur-sm overflow-hidden flex flex-col ${isDarkMode ? 'bg-black/20 border-zinc-900' : 'bg-white/80 border-slate-200'}`}>
          <AnimatePresence mode="wait">
            {activeEngine === '04' ? (
              <motion.div 
                key="engine-04-context"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 flex flex-col p-10"
              >
                {/* Visual Header within context */}
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-2">
                    <p className="text-[11px] font-light text-cyan-400 tracking-[0.2em]">
                       Net Clinical Benefit = (p<sub>resp</sub> × Benefit) - (Risk<sub>tox</sub> × Toxicity<sub>cost</sub>)
                    </p>
                    <div className={`h-px w-96 transition-all duration-1000 bg-gradient-to-r from-cyan-500/50 to-transparent`} />
                  </div>
                  <button 
                    onClick={handleScan}
                    disabled={isScanning}
                    className={`px-8 py-3 rounded border text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 active:scale-95 ${
                      isScanning ? 'bg-rose-600 border-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]' : 
                      isDarkMode ? 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600' : 'bg-white border-slate-300 text-slate-600 hover:text-slate-900 hover:border-slate-400 pointer-events-auto'
                    }`}
                  >
                    {isScanning ? <Activity className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    {isScanning ? 'RUNNING_DIAGNOSTIC' : 'INITIATE GATE SCAN'}
                  </button>
                </div>

                <div className="flex-1 flex gap-10 min-h-0">
                  {/* The Interactive Gate Chart */}
                  <div className="flex-1 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart margin={{ top: 10, right: 10, bottom: 50, left: 50 }}>
                        <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" opacity={0.15} />
                        <ReferenceLine x={0.5} stroke="#ffffff05" strokeWidth={1} />
                        <ReferenceLine y={0.5} stroke="#ffffff05" strokeWidth={1} />
                        <XAxis type="number" dataKey="x" domain={[0, 1.0]} ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]} stroke="#334155" fontSize={10} label={{ value: 'Toxicity Risk', position: 'bottom', fill: '#475569', fontSize: 11, offset: 30, letterSpacing: '0.1em' }} />
                        <YAxis type="number" dataKey="y" domain={[0, 1.0]} ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]} stroke="#334155" fontSize={10} label={{ value: 'Response Prob', angle: -90, position: 'insideLeft', fill: '#475569', fontSize: 11, offset: 0 }} />
                        <ZAxis type="number" range={[100, 100]} />
                        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: isScanning ? '#f43f5e' : '#22d3ee', strokeWidth: 1 }} />
                        <Scatter data={stepLine} line={{ stroke: isScanning ? '#f43f5e' : '#22d3ee', strokeWidth: 2 }} shape={<g />} isAnimationActive={false} />
                        
                        <Scatter data={grayData} onClick={(p) => setSelectedPoint(p)}>
                          {grayData.map((entry, index) => <Cell key={`cell-gray-${index}`} fill="#475569" opacity={0.4} className="cursor-pointer transition-all hover:fill-cyan-400 hover:opacity-100" />)}
                        </Scatter>
                        <Scatter data={redData} onClick={(p) => setSelectedPoint(p)}>
                          {redData.map((entry, index) => {
                            const isBeingScanned = isScanning && (entry.x <= scanPos);
                            return <Cell key={`cell-red-${index}`} fill={isBeingScanned ? "#fff" : "#f43f5e"} className={`cursor-pointer transition-all duration-300 hover:scale-[1.8] ${isBeingScanned ? 'drop-shadow-[0_0_10px_#fff]' : ''}`} />;
                          })}
                        </Scatter>
                        {isScanning && <ReferenceLine x={scanPos} stroke="#f43f5e" strokeWidth={2} />}
                      </ScatterChart>
                    </ResponsiveContainer>
                    <div className={`absolute right-10 bottom-24 pointer-events-none flex items-center gap-4 transition-all duration-700 ${isScanning ? 'opacity-100 scale-105' : 'opacity-30'}`}>
                       <div className={`w-16 h-px ${isScanning ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-zinc-800'}`} />
                       <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isScanning ? 'text-rose-500' : 'text-zinc-600'}`}>Rule-Out Zone</span>
                    </div>
                  </div>

                  {/* Context Panel for Selection */}
                  <div className="w-80 border-l border-zinc-900 pl-10 flex flex-col justify-between">
                    <AnimatePresence mode="wait">
                      {selectedPoint ? (
                        <motion.div key={selectedPoint.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
                          <div className="flex justify-between items-start">
                             <div>
                                <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Selected Profile</span>
                                <h3 className="text-2xl font-black text-white tracking-tighter">{selectedPoint.id}</h3>
                             </div>
                             <button onClick={() => setSelectedPoint(null)} className="p-1 hover:bg-zinc-800 rounded"><X className="w-4 h-4 text-zinc-600"/></button>
                          </div>
                          <div className="space-y-4">
                             <div className="p-4 bg-zinc-950 border border-zinc-900">
                                <span className="text-[9px] text-zinc-500 uppercase block mb-1">Efficacy: {(selectedPoint.y * 100).toFixed(1)}%</span>
                                <div className="h-[2px] w-full bg-zinc-800"><div className="h-full bg-cyan-500" style={{ width: `${selectedPoint.y * 100}%` }} /></div>
                             </div>
                             <div className="p-4 bg-zinc-950 border border-zinc-900">
                                <span className="text-[9px] text-zinc-500 uppercase block mb-1">Risk: {(selectedPoint.x * 100).toFixed(1)}%</span>
                                <div className="h-[2px] w-full bg-zinc-800"><div className="h-full bg-rose-500" style={{ width: `${selectedPoint.x * 100}%` }} /></div>
                             </div>
                          </div>
                          <div className={`p-4 border text-[10px] font-black uppercase tracking-widest ${selectedPoint.x > 0.65 ? 'border-rose-900/50 text-rose-500' : 'border-cyan-900/50 text-cyan-400'}`}>
                             {selectedPoint.x > 0.65 ? 'GATE_RESTRICTED: FUTILE' : 'COHORT_READY'}
                          </div>
                        </motion.div>
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30">
                           <Fingerprint className="w-10 h-10 mb-4" />
                           <p className="text-[10px] uppercase font-black tracking-widest">Select Patient from Matrix to View Benefits Gate</p>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="other-engine-context"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                  <Database className="w-8 h-8 text-zinc-700" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                    {ENGINES.find(e => e.id === activeEngine).title}
                  </h3>
                  <p className="text-zinc-500 text-sm max-w-md uppercase font-bold leading-relaxed tracking-widest">
                    Initializing mission-critical diagnostic simulation for engine {activeEngine}... Accessing global cohort database for {ENGINES.find(e => e.id === activeEngine).question}
                  </p>
                </div>
                <div className="px-6 py-2 border border-cyan-900/50 text-cyan-900 text-[10px] font-black uppercase tracking-widest animate-pulse">
                  System Sync Active
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Target Background Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
         <div className="w-[70rem] h-[70rem] border border-cyan-400 rounded-full flex items-center justify-center">
            <div className="w-[50rem] h-[50rem] border border-cyan-400 rounded-full" />
            <div className="absolute w-full h-px bg-cyan-400" />
            <div className="absolute h-full w-px bg-cyan-400" />
         </div>
      </div>

      {/* Footer Meta */}
      <footer className="z-10 mt-12 pt-8 border-t border-white/5 flex justify-between items-end pointer-events-none">
        <div className="flex items-center gap-10">
          <div className="space-y-1">
             <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em]">Platform Intelligence v6.2</span>
             <div className="flex items-center gap-8">
                <span className="text-3xl font-light text-cyan-500 tracking-tighter leading-none">AUC 0.822</span>
                <div className="h-8 w-px bg-zinc-800" />
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.3em]">n=29 NeoPembrOV Cohort Analysis</span>
             </div>
          </div>
        </div>
        <div className="flex gap-8 opacity-20">
           <Activity className="w-5 h-5 text-cyan-500" />
           <Database className="w-5 h-5 text-cyan-500" />
           <Cpu className="w-5 h-5 text-cyan-500" />
           <ShieldCheck className="w-5 h-5 text-cyan-500" />
        </div>
      </footer>
    </div>
  );
}