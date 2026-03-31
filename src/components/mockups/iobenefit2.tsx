"use client";
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
import { Target, Activity, Database, Cpu, ShieldCheck, Zap, X, Search, Fingerprint, ChevronRight } from 'lucide-react';

// --- Technical DNA Background Component ---
const DnaBackground = ({ speed = 1, isScanning = false }) => {
  const mountRef = useRef(null);
  const frameRef = useRef();

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
          opacity: isScanning ? 0.3 : 0.15,
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
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', () => {});
    };
  }, [speed, isScanning]);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none transition-all duration-1000" />;
};

// --- Custom Tooltip ---
const CustomTooltip = ({ active, payload }) => {
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

// --- Main Application ---

const generatePoints = (count, baseId, xRange, yRange) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${baseId}-${(1000 + i)}`,
    x: xRange[0] + Math.random() * (xRange[1] - xRange[0]),
    y: yRange[0] + Math.random() * (yRange[1] - yRange[0]),
    z: 100
  }));
};

export default function App() {
  const [selectedPoint, setSelectedPoint] = useState(null);
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
    setScanPos(0);
    
    // Animation of the scanner line
    let start = null;
    const duration = 2500;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const val = Math.min(progress / duration, 1);
      setScanPos(val);
      if (progress < duration) {
        requestAnimationFrame(step);
      } else {
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
    <div className="min-h-screen bg-[#05070a] text-zinc-400 font-mono selection:bg-cyan-500/30 overflow-hidden flex flex-col items-center justify-center p-8 relative">
      <DnaBackground speed={speed} isScanning={isScanning} />

      {/* Header Info */}
      <div className="absolute top-12 left-12 z-10 space-y-4">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded border flex items-center justify-center transition-all duration-500 ${isScanning ? 'border-rose-500 bg-rose-500/10' : 'border-zinc-800 bg-zinc-900'}`}>
            <Target className={`w-5 h-5 ${isScanning ? 'text-white' : 'text-cyan-500'}`} />
          </div>
          <div>
            <h2 className="text-[12px] font-black text-white uppercase tracking-[0.4em]">Engine 04 // IO Gate</h2>
            <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Status: {isScanning ? 'RUNNING_DIAGNOSTIC' : 'READY'}</p>
          </div>
        </div>
        <button 
           onClick={handleScan}
           disabled={isScanning}
           className={`px-8 py-3 rounded border text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center gap-3 active:scale-95 ${
             isScanning ? 'bg-rose-600 border-rose-400 text-white cursor-wait' : 'bg-white text-black hover:bg-cyan-500 hover:text-white border-transparent shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
           }`}
         >
           {isScanning ? <Activity className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
           {isScanning ? 'Processing Cluster...' : 'Run Diagnostic Scan'}
         </button>
      </div>

      {/* Formula Overlay */}
      <div className="z-10 w-full max-w-4xl mb-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block relative cursor-help"
        >
          <p className="text-sm md:text-xl font-light text-cyan-400/90 tracking-[0.1em] mb-3">
            Net Clinical Benefit = (p<sub className="text-[10px]">resp</sub> × Benefit) - (Risk<sub className="text-[10px]">tox</sub> × Toxicity<sub className="text-[10px]">cost</sub>)
          </p>
          <div className={`h-px w-full transition-all duration-1000 bg-gradient-to-r from-transparent ${isScanning ? 'via-rose-500 opacity-100' : 'via-cyan-500/30 opacity-60'} to-transparent`} />
        </motion.div>
      </div>

      {/* Main Analysis Chart Area */}
      <div className="z-10 relative w-full max-w-5xl h-[600px] flex gap-10">
        <div className="flex-1 relative bg-black/20 rounded-xl backdrop-blur-[2px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 60, left: 60 }}>
              <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" opacity={0.2} />
              
              <ReferenceLine x={0.5} stroke="#ffffff08" strokeWidth={1} />
              <ReferenceLine y={0.5} stroke="#ffffff08" strokeWidth={1} />

              <XAxis 
                type="number" dataKey="x" domain={[0, 1.0]} 
                ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]} 
                stroke="#475569" fontSize={10}
                label={{ value: 'Toxicity Risk', position: 'bottom', fill: '#64748b', fontSize: 11, offset: 35, letterSpacing: '0.2em' }}
              />
              
              <YAxis 
                type="number" dataKey="y" domain={[0, 1.0]} 
                ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]} 
                stroke="#475569" fontSize={10}
                label={{ value: 'Response Probability', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11, offset: -10, letterSpacing: '0.2em' }}
              />
              
              {/* Increased Z range for larger interactive dots */}
              <ZAxis type="number" range={[100, 100]} />
              
              <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ strokeDasharray: '3 3', stroke: isScanning ? '#f43f5e' : '#22d3ee', strokeWidth: 1 }} 
              />

              {/* Boundary Stair Line */}
              <Scatter data={stepLine} line={{ stroke: isScanning ? '#f43f5e' : '#22d3ee', strokeWidth: 2 }} shape={() => null} isAnimationActive={false} />

              {/* Data Layers */}
              <Scatter data={grayData} onClick={(p) => setSelectedPoint(p)}>
                {grayData.map((entry, index) => (
                  <Cell 
                    key={`cell-gray-${index}`} 
                    fill="#475569" 
                    opacity={0.5} 
                    className="cursor-pointer transition-all duration-300 hover:fill-cyan-400 hover:opacity-100" 
                  />
                ))}
              </Scatter>

              <Scatter data={redData} onClick={(p) => setSelectedPoint(p)}>
                {redData.map((entry, index) => {
                  const isBeingScanned = isScanning && (entry.x <= scanPos);
                  return (
                    <Cell 
                      key={`cell-red-${index}`} 
                      fill={isBeingScanned ? "#fff" : "#f43f5e"}
                      className={`cursor-pointer transition-all duration-300 hover:scale-[2] ${isBeingScanned ? 'drop-shadow-[0_0_10px_#fff]' : ''}`}
                    />
                  );
                })}
              </Scatter>

              {/* Real Scanning Line Animation */}
              {isScanning && (
                <ReferenceLine 
                  x={scanPos} 
                  stroke="#f43f5e" 
                  strokeWidth={3} 
                  label={{ value: 'SCANNING_CLUSTER', position: 'top', fill: '#f43f5e', fontSize: 10, fontWeight: 'bold' }}
                />
              )}
            </ScatterChart>
          </ResponsiveContainer>

          {/* Tactical Rule Out Label */}
          <div className={`absolute right-[10%] bottom-[25%] pointer-events-none flex items-center gap-6 transition-all duration-700 ${isScanning ? 'opacity-100 scale-110' : 'opacity-40'}`}>
             <div className={`w-24 h-px transition-all duration-1000 ${isScanning ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : 'bg-zinc-800'}`} />
             <div className="space-y-1">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em] block">PROTOCOL:</span>
                <span className={`text-[12px] font-black uppercase tracking-[0.4em] transition-colors duration-500 ${isScanning ? 'text-rose-500' : 'text-zinc-600'}`}>FUTILE TOXICITY RULE-OUT</span>
             </div>
          </div>
        </div>

        {/* Interaction Side Panel */}
        <div className="w-80 relative">
          <AnimatePresence mode="wait">
            {selectedPoint ? (
              <motion.div 
                key={selectedPoint.id}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 30, opacity: 0 }}
                className="h-full bg-zinc-950/90 border border-zinc-800 p-8 backdrop-blur-2xl flex flex-col justify-between shadow-2xl relative"
              >
                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                     <div className="space-y-1">
                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">Patient Diagnostic</span>
                        <h3 className="text-2xl font-black text-white tracking-tighter">{selectedPoint.id}</h3>
                     </div>
                     <button onClick={() => setSelectedPoint(null)} className="p-2 hover:bg-zinc-900 rounded-full transition-colors">
                        <X className="w-5 h-5 text-zinc-600" />
                     </button>
                  </div>

                  <div className="space-y-6">
                     <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-sm">
                        <div className="flex justify-between items-end mb-2">
                           <span className="text-[9px] text-zinc-500 uppercase font-black">Response Prob</span>
                           <span className="text-2xl font-light text-cyan-400">{(selectedPoint.y * 100).toFixed(1)}%</span>
                        </div>
                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${selectedPoint.y * 100}%` }} className="h-full bg-cyan-500" />
                        </div>
                     </div>
                     <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-sm">
                        <div className="flex justify-between items-end mb-2">
                           <span className="text-[9px] text-zinc-500 uppercase font-black">Toxicity Risk</span>
                           <span className="text-2xl font-light text-rose-500">{(selectedPoint.x * 100).toFixed(1)}%</span>
                        </div>
                        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                           <motion.div initial={{ width: 0 }} animate={{ width: `${selectedPoint.x * 100}%` }} className="h-full bg-rose-500" />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-3 pt-4">
                     <div className="flex items-center gap-2 mb-2">
                        <Fingerprint className="w-4 h-4 text-cyan-600" />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Onco-Markers</span>
                     </div>
                     <div className="flex flex-wrap gap-2">
                        {['EGFR_v3', 'KRAS_G12D', 'TP53_KO', 'MET_AMP'].map(m => (
                          <span key={m} className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-[9px] font-bold text-zinc-500 rounded uppercase tracking-wider">{m}</span>
                        ))}
                     </div>
                  </div>
                </div>

                <div className={`p-6 border rounded-sm transition-all duration-700 ${selectedPoint.x > 0.65 && selectedPoint.y < 0.5 ? 'border-rose-900/50 bg-rose-900/10' : 'border-cyan-900/50 bg-cyan-900/10'}`}>
                   <p className="text-[10px] font-black uppercase text-zinc-500 mb-2 tracking-[0.2em]">Gate Verdict:</p>
                   <p className={`text-sm font-black uppercase tracking-widest ${selectedPoint.x > 0.65 && selectedPoint.y < 0.5 ? 'text-rose-500' : 'text-cyan-400'}`}>
                     {selectedPoint.x > 0.65 && selectedPoint.y < 0.5 ? 'FUTILE_TOX_RULE_OUT' : 'COHORT_VAL_PASS'}
                   </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-full border border-dashed border-zinc-800 rounded-lg flex flex-col items-center justify-center p-12 text-center opacity-40">
                 <Search className="w-8 h-8 text-zinc-700 mb-4" />
                 <p className="text-[10px] text-zinc-600 uppercase font-black leading-relaxed tracking-widest">Select a data point to analyze subject-specific benefit gating</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Target Marker Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
         <div className="w-[60rem] h-[60rem] border border-cyan-400 rounded-full flex items-center justify-center">
            <div className="w-[45rem] h-[45rem] border border-cyan-400 rounded-full" />
            <div className="absolute w-full h-px bg-cyan-400" />
            <div className="absolute h-full w-px bg-cyan-400" />
         </div>
      </div>

      {/* Clinical Meta Footer */}
      <footer className="absolute bottom-10 left-16 right-16 flex justify-between items-end border-t border-white/5 pt-8 pointer-events-none z-10">
        <div className="flex items-center gap-10">
          <div className="space-y-1">
             <span className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.5em]">System Diagnostics v6.2</span>
             <div className="flex items-center gap-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-light text-cyan-500 tracking-tighter leading-none">AUC 0.822</span>
                  <span className="text-[8px] text-zinc-700 font-black uppercase mt-1">Calibration Floor</span>
                </div>
                <div className="h-8 w-px bg-zinc-800" />
                <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.3em]">n=29 NeoPembrOV Cohort</span>
             </div>
          </div>
        </div>

        <div className="flex gap-8 opacity-20">
           <Activity className="w-5 h-5 text-cyan-500" />
           <Database className="w-5 h-5" />
           <Cpu className="w-5 h-5" />
           <ShieldCheck className="w-5 h-5 text-cyan-500" />
        </div>
      </footer>

      {/* Decorative Corners */}
      <div className="absolute top-8 left-8 w-32 h-32 border-t border-l border-white/5" />
      <div className="absolute top-8 right-8 w-32 h-32 border-t border-r border-white/5" />
      <div className="absolute bottom-8 left-8 w-32 h-32 border-b border-l border-white/5" />
      <div className="absolute bottom-8 right-8 w-32 h-32 border-b border-r border-white/5" />
    </div>
  );
}