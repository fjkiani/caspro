"use client";
import React, { useEffect, useRef, useMemo, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Target, Activity, Database, Cpu, ShieldCheck } from 'lucide-react';
import { IO_SCATTER_STABLE, IO_SCATTER_FUTILE, IO_SCATTER_BOUNDARY } from '@/data/safety-engine-data';

// --- Technical DNA Background Component ---
const DnaBackground = () => {
  const mountRef = useRef(null);

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

          // Vertical data block slices
          for (let j = 0; j < 12; j++) {
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
          color: 0x4fd1c5,
          size: 0.08,
          transparent: true,
          opacity: 0.2,
          blending: THREE.AdditiveBlending
        });
        return new THREE.Points(geo, mat);
      };

      const scaffoldMat = new THREE.MeshBasicMaterial({ 
        color: 0x4fd1c5, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.05 
      });

      const createScaffold = (offset = 0) => {
        const pts = [];
        for (let i = 0; i < strandPoints; i++) {
          const angle = i * twist + offset;
          const y = (i - strandPoints / 2) * heightStep;
          pts.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
        }
        const curve = new THREE.CatmullRomCurve3(pts);
        const tubeGeo = new THREE.TubeGeometry(curve, 80, 0.8, 4, false);
        return new THREE.Mesh(tubeGeo, scaffoldMat);
      };

      dnaGroup.add(createDataStrand(0), createDataStrand(Math.PI));
      dnaGroup.add(createScaffold(0), createScaffold(Math.PI));
      dnaGroup.rotation.z = Math.PI / 6;

      const animate = () => {
        requestAnimationFrame(animate);
        dnaGroup.rotation.y += 0.001;
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
      return () => window.removeEventListener('resize', handleResize);
    };
    document.head.appendChild(script);
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

// --- Data & Components ---

const SCATTER_DATA_GRAY = IO_SCATTER_STABLE.map((p) => ({ x: p.x, y: p.y, type: 'stable' as const }));
const SCATTER_DATA_RED = IO_SCATTER_FUTILE.map((p) => ({ x: p.x, y: p.y, type: 'futile' as const }));

const STEP_LINE = [...IO_SCATTER_BOUNDARY];

export default function App() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen font-mono selection:bg-cyan-500/30 overflow-hidden flex flex-col items-center justify-center p-8 relative transition-colors duration-500 ${isDarkMode ? 'bg-[#05070a] text-zinc-400' : 'bg-slate-50 text-slate-600'}`}>
      
      {/* 3D Visual Context */}
      <DnaBackground />

      {/* Header Info */}
      <div className="absolute top-12 left-12 z-10 space-y-1">
        <h2 className={`text-[11px] font-black uppercase tracking-[0.4em] ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>Engine 04 // IO Risk-Benefit Gate</h2>
      </div>

      {/* Formulas & HUD Text */}
      <div className="z-10 w-full max-w-4xl mb-12 text-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block"
        >
          <p className="text-sm md:text-lg font-light text-cyan-400/90 tracking-widest mb-2">
            Net Clinical Benefit = (p<sub className="text-[10px]">resp</sub> × Benefit) - (Risk<sub className="text-[10px]">tox</sub> × Toxicity<sub className="text-[10px]">cost</sub>)
          </p>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        </motion.div>
      </div>

      {/* Main Analysis Chart Area */}
      <div className="z-10 relative w-full max-w-4xl h-[550px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 40, bottom: 60, left: 60 }}>
            <CartesianGrid stroke="#1e293b" strokeDasharray="0" opacity={0.5} />
            
            <XAxis 
              type="number" 
              dataKey="x" 
              domain={[0, 1.0]} 
              ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]} 
              stroke="#475569" 
              fontSize={10}
              label={{ value: 'Toxicity Risk', position: 'bottom', fill: '#64748b', fontSize: 11, offset: 35, letterSpacing: '0.2em' }}
            />
            
            <YAxis 
              type="number" 
              dataKey="y" 
              domain={[0, 1.0]} 
              ticks={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]} 
              stroke="#475569" 
              fontSize={10}
              label={{ value: 'Response Probability', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 11, offset: -10, letterSpacing: '0.2em' }}
            />
            
            <ZAxis type="number" range={[20, 20]} />

            {/* Boundary Stair Line */}
            <Scatter 
              data={STEP_LINE} 
              line={{ stroke: '#22d3ee', strokeWidth: 1.5 }} 
              shape={() => null} 
              isAnimationActive={false}
            />

            {/* Stable Data Points */}
            <Scatter data={SCATTER_DATA_GRAY} isAnimationActive={false}>
              {SCATTER_DATA_GRAY.map((entry, index) => (
                <Cell key={`cell-gray-${index}`} fill="#475569" opacity={0.6} />
              ))}
            </Scatter>

            <Scatter data={SCATTER_DATA_RED} isAnimationActive={false}>
              {SCATTER_DATA_RED.map((entry, index) => (
                <Cell key={`cell-red-${index}`} fill="#f43f5e" shadow="0 0 10px #f43f5e" />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>

        {/* HUD Rule Out Label */}
        <div className="absolute right-[12%] bottom-[22%] pointer-events-none flex items-center gap-4">
           <div className="w-16 h-px bg-zinc-800" />
           <div className="space-y-1">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] block">Rule Out:</span>
              <span className="text-[11px] font-black text-rose-500 uppercase tracking-[0.3em] drop-shadow-sm">Futile Toxicity</span>
           </div>
        </div>

        {/* Center Target Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
           <div className="w-[40rem] h-[40rem] border border-cyan-400 rounded-full flex items-center justify-center">
              <div className="w-[30rem] h-[30rem] border border-cyan-400 rounded-full" />
              <div className="absolute w-full h-px bg-cyan-400" />
              <div className="absolute h-full w-px bg-cyan-400" />
           </div>
        </div>
      </div>

      {/* System Stats Footer */}
      <footer className="absolute bottom-10 left-12 right-12 flex justify-between items-end border-t border-white/5 pt-6 pointer-events-none">
        <div className="flex items-center gap-8">
          <div className="space-y-1">
             <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Diagnostic Meta</span>
             <div className="flex items-center gap-4">
                <span className="text-xl font-light text-cyan-500 tracking-tighter">AUC 0.822</span>
                <div className="h-4 w-px bg-zinc-800" />
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">n=29 NeoPembrOV</span>
             </div>
          </div>
        </div>

        <div className="flex gap-6 opacity-30">
           <Activity className="w-4 h-4" />
           <Database className="w-4 h-4" />
           <Cpu className="w-4 h-4" />
           <ShieldCheck className="w-4 h-4 text-cyan-500" />
        </div>
      </footer>

      {/* Decorative Corners */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t border-l border-white/5" />
      <div className="absolute top-8 right-8 w-24 h-24 border-t border-r border-white/5" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-b border-l border-white/5" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b border-r border-white/5" />
    </div>
  );
}