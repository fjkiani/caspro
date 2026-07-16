'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  ResponsiveContainer,
  Cell,
  Tooltip,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis
} from 'recharts';
import { 
  Activity, 
  Database, 
  Cpu, 
  ShieldCheck, 
  X, 
  Search, 
  Fingerprint, 
  Target, 
  Box, 
  Binary, 
  Compass,
  Crosshair
} from 'lucide-react';

// --- Technical Mechanism alignment Space Background ---
const VectorSpaceBackground: React.FC<{ speed?: number; isAligning?: boolean }> = ({ speed = 1, isAligning = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 100;

    const gridGroup = new THREE.Group();
    scene.add(gridGroup);

    // Create a 3D coordinate lattice
    const size = 60;
    const divisions = 10;
    const gridHelper = new THREE.GridHelper(size, divisions, 0x22d3ee, 0x1e293b);
    gridHelper.rotation.x = Math.PI / 2;
    const mat = gridHelper.material as THREE.LineBasicMaterial;
    mat.opacity = 0.1;
    mat.transparent = true;
    gridGroup.add(gridHelper);

    // Add a secondary perpendicular grid
    const gridHelper2 = new THREE.GridHelper(size, divisions, 0x22d3ee, 0x1e293b);
    const mat2 = gridHelper2.material as THREE.LineBasicMaterial;
    mat2.opacity = 0.05;
    mat2.transparent = true;
    gridGroup.add(gridHelper2);

    // Floating data points in 3D space
    const pointsGeo = new THREE.BufferGeometry();
    const pointsCount = 200;
    const posArray = new Float32Array(pointsCount * 3);
    for(let i = 0; i < pointsCount * 3; i++) {
      posArray[i] = (THREE.MathUtils.randFloatSpread(80));
    }
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const pointsMat = new THREE.PointsMaterial({
      size: 0.15,
      color: isAligning ? 0xf43f5e : 0x22d3ee,
      transparent: true,
      opacity: 0.4
    });
    const starField = new THREE.Points(pointsGeo, pointsMat);
    gridGroup.add(starField);

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      gridGroup.rotation.y += 0.0005 * speed;
      gridGroup.rotation.x += 0.0002 * speed;
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
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
    };
  }, [speed, isAligning]);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none opacity-30" />;
};

// --- Vector Profile Radar Component ---
const VectorProfile: React.FC<{ data: any }> = ({ data }) => {
  const radarData = useMemo(() => [
    { axis: 'EFFICACY', value: data.v1 },
    { axis: 'TOXICITY', value: data.v2 },
    { axis: 'INSTABILITY', value: data.v3 },
    { axis: 'INFILTRATION', value: data.v4 },
    { axis: 'METABOLISM', value: data.v5 },
    { axis: 'PROLIFERATION', value: data.v6 },
    { axis: 'STEMNESS', value: data.v7 },
  ], [data]);

  return (
    <div className="w-full h-48 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
          <PolarGrid stroke="#1e293b" />
          <PolarAngleAxis dataKey="axis" tick={{ fill: '#475569', fontSize: 7, fontWeight: 'bold' }} />
          <Radar name="Profile" dataKey="value" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.2} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// --- Configuration & Data ---

const MECHANISMS = [
  { id: 'PARP_i', label: 'PARP Inhibition', color: '#22d3ee', desc: 'Targeting HRD deficient 7D signatures.', center: [0.3, 0.7] },
  { id: 'VEGF_a', label: 'Angio-Blockade', color: '#818cf8', desc: 'VEGF-driven 7D metabolic flux.', center: [0.7, 0.8] },
  { id: 'IO_pd1', label: 'Immune Checkpoint', color: '#2dd4bf', desc: 'PD-L1 high 7D infiltration vectors.', center: [0.4, 0.3] },
  { id: 'MAPK_s', label: 'MAPK Suppression', color: '#f472b6', desc: 'KRAS/NRAS 7D activation pathways.', center: [0.8, 0.2] },
];

const generatePatients = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const mech = MECHANISMS[Math.floor(Math.random() * MECHANISMS.length)];
    const isAligned = Math.random() > 0.35;
    return {
      id: `VEC-${1000 + i}`,
      x: isAligned ? mech.center[0] + (Math.random() - 0.5) * 0.15 : Math.random(),
      y: isAligned ? mech.center[1] + (Math.random() - 0.5) * 0.15 : Math.random(),
      z: 100,
      mechanism: mech.id,
      isAligned,
      v1: Math.random() * 100, v2: Math.random() * 100, v3: Math.random() * 100,
      v4: Math.random() * 100, v5: Math.random() * 100, v6: Math.random() * 100,
      v7: Math.random() * 100
    };
  });
};

export const MechanismAlignment: React.FC = () => {
  const [activeMech, setActiveMech] = useState(MECHANISMS[0]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isAligning, setIsAligning] = useState(false);
  const [patients] = useState(generatePatients(95));

  const filteredPatients = useMemo(() => {
    return patients.filter(p => p.mechanism === activeMech.id);
  }, [patients, activeMech]);

  const precisionDelta = useMemo(() => {
    const aligned = filteredPatients.filter(p => p.isAligned).length;
    return (aligned / filteredPatients.length).toFixed(4);
  }, [filteredPatients]);

  const handleAlign = () => {
    setIsAligning(true);
    setTimeout(() => setIsAligning(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col font-mono p-1 relative overflow-hidden h-full">
      <VectorSpaceBackground speed={isAligning ? 20 : 1} isAligning={isAligning} />

      <header className="z-10 mb-8 flex justify-between items-start">
        <div className="flex items-center gap-6">
           <div className="w-12 h-12 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-lg">
              <Compass className={`w-6 h-6 ${isAligning ? 'text-rose-500 animate-spin' : 'text-cyan-500'}`} />
           </div>
           <div>
              <h2 className="text-[12px] font-black text-white uppercase tracking-[0.4em]">Mechanism alignment Mapping // Mechanism Alignment</h2>
              <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Non-Euclidean Enrollment Optimization v6.2.2</p>
           </div>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={handleAlign}
             disabled={isAligning}
             className={`px-8 py-3 rounded border text-[9px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-4 ${
               isAligning ? 'bg-rose-500/20 border-rose-500 text-rose-500' : 'bg-white text-black hover:bg-cyan-500 hover:text-white border-transparent'
             }`}
           >
             {isAligning ? <Activity className="w-3 h-3 animate-spin" /> : <Binary className="w-3 h-3" />}
             {isAligning ? 'REALIGNING_VECTORS' : 'EXECUTE 7D SYNC'}
           </button>
        </div>
      </header>

      <main className="z-10 flex-1 grid grid-cols-12 gap-8 min-h-0">
        
        {/* Left: Mechanism Control */}
        <div className="col-span-3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
           <div className="space-y-4">
              <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest border-b border-zinc-900 pb-2 block">Latent Mechanisms</span>
              <div className="grid gap-2">
                 {MECHANISMS.map(mech => (
                   <button
                     key={mech.id}
                     onClick={() => setActiveMech(mech)}
                     className={`w-full p-4 rounded border text-left transition-all relative group ${
                       activeMech.id === mech.id 
                       ? 'bg-zinc-900 border-zinc-700' 
                       : 'bg-black/40 border-zinc-900 hover:bg-zinc-900/50'
                     }`}
                   >
                     {activeMech.id === mech.id && (
                        <motion.div layoutId="vec-active" className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500" />
                     )}
                     <div className="flex justify-between items-center mb-1">
                        <span className={`text-[11px] font-black uppercase tracking-widest ${activeMech.id === mech.id ? 'text-white' : 'text-zinc-600'}`}>{mech.label}</span>
                        <Box className="w-3 h-3" style={{ color: mech.color }} />
                     </div>
                     <p className="text-[8px] text-zinc-700 font-bold uppercase leading-relaxed">{mech.desc}</p>
                   </button>
                 ))}
              </div>
           </div>

           <div className="p-6 bg-zinc-950 border border-zinc-900 rounded flex-1 flex flex-col justify-center relative shadow-2xl overflow-hidden min-h-[150px]">
              <div className="space-y-2 relative z-10">
                 <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Enrollment Precision</span>
                 <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-extralight tracking-tighter leading-none transition-colors ${Number(precisionDelta) > 0.6 ? 'text-cyan-400' : 'text-rose-500'}`}>+{precisionDelta}</span>
                    <span className="text-[9px] font-black text-zinc-800 uppercase tracking-widest">LATIFY Δ</span>
                 </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 border-t border-zinc-900 pt-6">
                 <div className="space-y-1">
                    <span className="text-[8px] text-zinc-800 uppercase font-black">Active Nodes</span>
                    <span className="text-xl font-light text-zinc-300">{filteredPatients.length}</span>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[8px] text-zinc-800 uppercase font-black">Confidence</span>
                    <span className="text-xl font-light text-zinc-300">0.998</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Center: Vector Visualization */}
        <div className="col-span-6 flex flex-col bg-zinc-950/50 border border-zinc-900 rounded p-8 relative overflow-hidden h-full min-h-[400px]">
           <div className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-900/50">
              <div className="flex items-center gap-3">
                 <div className="p-1.5 rounded bg-cyan-900/10 border border-cyan-500/20">
                    <Target className="w-4 h-4 text-cyan-500" />
                 </div>
                 <h3 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em]">7D Manifold Projection // Patient Cluster</h3>
              </div>
              <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-zinc-700">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-cyan-500" /> In-Sync</div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-600" /> Outlier</div>
              </div>
           </div>

           <div className="flex-1 relative cursor-crosshair">
              <ResponsiveContainer width="100%" height="100%">
                 <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <XAxis type="number" dataKey="x" domain={[0, 1]} hide />
                    <YAxis type="number" dataKey="y" domain={[0, 1]} hide />
                    <ZAxis type="number" range={[80, 80]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3', stroke: '#1e293b' }} content={() => null} />
                    
                    <Scatter data={patients} onClick={(p) => setSelectedPatient(p.payload)}>
                       {patients.map((entry, index) => {
                          const isMatch = entry.mechanism === activeMech.id;
                          const color = isMatch 
                            ? (entry.isAligned ? activeMech.color : '#f43f5e') 
                            : '#1e293b';
                          return (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={color}
                              opacity={isMatch ? 1 : 0.1}
                              style={{ cursor: isMatch ? 'pointer' : 'default' }}
                            />
                          );
                       })}
                    </Scatter>
                 </ScatterChart>
              </ResponsiveContainer>
              
              {/* Tactical Crosshair */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
                 <div className="w-[80%] h-[80%] border border-cyan-400 rounded-full" />
                 <div className="absolute w-px h-full bg-cyan-400" />
                 <div className="absolute h-px w-full bg-cyan-400" />
              </div>
           </div>
        </div>

        {/* Right: Mechanism alignment Profile Panel */}
        <div className="col-span-3 h-full overflow-hidden">
           <AnimatePresence mode="wait">
              {selectedPatient ? (
                <motion.div 
                  key={selectedPatient.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                  className="bg-zinc-950 border border-zinc-800 p-6 rounded shadow-2xl h-full flex flex-col relative overflow-y-auto custom-scrollbar"
                >
                   <div className="space-y-8 flex-1">
                      <div className="flex justify-between items-start">
                         <div className="space-y-1">
                            <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Vector Subject</span>
                            <h3 className="text-2xl font-black text-white tracking-tighter">{selectedPatient.id}</h3>
                         </div>
                         <button onClick={() => setSelectedPatient(null)} className="p-1.5 hover:bg-zinc-900 rounded-full transition-colors"><X className="w-4 h-4 text-zinc-700 hover:text-white" /></button>
                      </div>

                      <div className="space-y-6">
                         <div className="p-4 bg-black/40 border border-zinc-900 rounded">
                            <div className="flex items-center justify-between mb-2">
                               <span className="text-[9px] text-zinc-500 uppercase font-black">7D Signature Map</span>
                               <Crosshair className="w-3 h-3 text-cyan-900" />
                            </div>
                            <VectorProfile data={selectedPatient} />
                         </div>
                         
                         <div className="space-y-3">
                            <div className="flex items-center gap-3 text-zinc-600 border-b border-zinc-900 pb-2">
                               <Fingerprint className="w-3.5 h-3.5" />
                               <span className="text-[9px] font-black uppercase tracking-widest">Dimension Weights</span>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                               {[
                                 { l: 'Eff', v: selectedPatient.v1 },
                                 { l: 'Tox', v: selectedPatient.v2 },
                                 { l: 'Ins', v: selectedPatient.v3 },
                                 { l: 'Inf', v: selectedPatient.v4 },
                               ].map(d => (
                                 <div key={d.l} className="flex justify-between text-[10px] font-mono">
                                    <span className="text-zinc-700 uppercase">{d.l}</span>
                                    <span className="text-zinc-400">{d.v.toFixed(1)}</span>
                                 </div>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className={`mt-8 p-4 border rounded transition-all duration-1000 ${selectedPatient.isAligned ? 'bg-cyan-900/10 border-cyan-500/20' : 'bg-rose-950/20 border-rose-500/20'}`}>
                      <p className="text-[9px] font-black uppercase text-zinc-500 mb-2 tracking-[0.2em]">Enrolled Verdict:</p>
                      <p className={`text-[11px] font-black uppercase tracking-widest ${selectedPatient.isAligned ? 'text-cyan-400' : 'text-rose-500'}`}>
                         {selectedPatient.isAligned ? '7D_VECTOR_SYNC_PASS' : 'MECHANISM_MISMATCH_ALRT'}
                      </p>
                   </div>
                </motion.div>
              ) : (
                <div className="h-full border border-dashed border-zinc-900 rounded flex flex-col items-center justify-center p-8 text-center opacity-30">
                   <div className="w-12 h-12 rounded-full border border-zinc-800 flex items-center justify-center mb-6">
                      <Search className="w-6 h-6 text-zinc-800" />
                   </div>
                   <p className="text-[9px] text-zinc-600 uppercase font-black leading-relaxed tracking-[0.2em]">
                      Select a manifold point to isolate Mechanism alignment signature and enrollment eligibility metrics.
                   </p>
                </div>
              )}
           </AnimatePresence>
        </div>
      </main>

      <footer className="h-16 border-t border-zinc-900 mt-8 flex items-center justify-between px-6 pointer-events-none opacity-50 z-10">
        <div className="flex items-center gap-10">
           <div className="space-y-1">
              <span className="text-[9px] font-black text-zinc-700 uppercase tracking-widest">Platform Intelligence Engine</span>
              <div className="flex items-center gap-8">
                 <span className="text-xl font-light text-cyan-500 tracking-tighter leading-none">LATIFY v6.2.2</span>
                 <div className="h-5 w-px bg-zinc-800" />
                 <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Resolution: Mechanism alignment Manifold // Sync: Active</span>
              </div>
           </div>
        </div>
        <div className="flex gap-8 text-cyan-700">
           <Activity className="w-4 h-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]" />
           <Database className="w-4 h-4" />
           <Cpu className="w-4 h-4" />
           <ShieldCheck className="w-4 h-4" />
        </div>
      </footer>
    </div>
  );
};
