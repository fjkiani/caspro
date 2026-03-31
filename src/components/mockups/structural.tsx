import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Target, 
  Search, 
  Layers, 
  Terminal, 
  Activity, 
  Database, 
  Cpu, 
  Maximize, 
  Minimize,
  ChevronRight,
  Info,
  Box,
  Zap,
  RotateCw
} from 'lucide-react';

// --- 3D Molecular Simulation (Three.js) ---

const MolecularViewer = () => {
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

      camera.position.z = 50;

      // --- CAS9 Protein Complex (Lobed Structure) ---
      const cas9Group = new THREE.Group();
      scene.add(cas9Group);

      const proteinMaterial = new THREE.MeshPhongMaterial({
        color: 0x22d3ee,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
        flatShading: true
      });

      // Create multiple "lobes" to break the sphere look
      const lobes = [
        { pos: [0, 0, 0], scale: [1.2, 1, 0.8], radius: 10 },
        { pos: [6, 2, -2], scale: [0.8, 0.9, 0.7], radius: 8 },
        { pos: [-6, -2, 2], scale: [0.7, 1.1, 0.9], radius: 9 },
        { pos: [0, 5, 0], scale: [1, 0.6, 1], radius: 7 },
      ];

      lobes.forEach(config => {
        const geo = new THREE.IcosahedronGeometry(config.radius, 3);
        const positions = geo.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const v = new THREE.Vector3().fromBufferAttribute(positions, i);
          v.multiplyScalar(1 + Math.random() * 0.15); // Jitter for organic look
          positions.setXYZ(i, v.x, v.y, v.z);
        }
        const lobe = new THREE.Mesh(geo, proteinMaterial);
        lobe.position.set(...config.pos);
        lobe.scale.set(...config.scale);
        cas9Group.add(lobe);

        // Add "Data Nodes" at vertices
        const nodes = new THREE.Points(geo, new THREE.PointsMaterial({
          color: 0x22d3ee,
          size: 0.08,
          transparent: true,
          opacity: 0.3
        }));
        lobe.add(nodes);
      });

      // --- DNA Double Helix ---
      const helixGroup = new THREE.Group();
      scene.add(helixGroup);

      const createHelix = (offset = 0, color = 0x475569) => {
        const points = [];
        const segments = 100;
        const radius = 3;
        const height = 60;
        const speed = 0.4;

        for (let i = 0; i < segments; i++) {
          const t = (i / segments) - 0.5;
          const angle = t * height * speed + offset;
          points.push(new THREE.Vector3(
            Math.cos(angle) * radius,
            t * height,
            Math.sin(angle) * radius
          ));
        }

        const curve = new THREE.CatmullRomCurve3(points);
        const tubeGeo = new THREE.TubeGeometry(curve, 100, 0.15, 6, false);
        const tubeMat = new THREE.MeshBasicMaterial({ 
          color: color, 
          wireframe: true, 
          transparent: true, 
          opacity: 0.4 
        });
        return new THREE.Mesh(tubeGeo, tubeMat);
      };

      const dna1 = createHelix(0, 0x475569);
      const dna2 = createHelix(Math.PI, 0x475569);
      const gRNA = createHelix(Math.PI / 2, 0x22d3ee); // Cyan gRNA strand
      gRNA.scale.set(1.2, 0.4, 1.2); // Compressed guide RNA loop
      
      helixGroup.add(dna1, dna2, gRNA);
      helixGroup.rotation.z = Math.PI / 3;

      // Add Rungs
      const rungMat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.1 });
      for (let i = 0; i < 40; i++) {
         const t = (i / 40) - 0.5;
         const angle = t * 60 * 0.4;
         const p1 = new THREE.Vector3(Math.cos(angle) * 3, t * 60, Math.sin(angle) * 3);
         const p2 = new THREE.Vector3(Math.cos(angle + Math.PI) * 3, t * 60, Math.sin(angle + Math.PI) * 3);
         const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
         helixGroup.add(new THREE.Line(lineGeo, rungMat));
      }

      // Lighting
      const light1 = new THREE.PointLight(0x22d3ee, 1, 100);
      light1.position.set(20, 20, 20);
      scene.add(light1);
      scene.add(new THREE.AmbientLight(0x404040));

      const animate = () => {
        requestAnimationFrame(animate);
        cas9Group.rotation.y += 0.002;
        cas9Group.rotation.z += 0.001;
        helixGroup.rotation.y -= 0.001;
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
  }, []);

  return (
    <div className="relative w-full h-full group">
      <div ref={mountRef} className={`absolute inset-0 z-0 rounded overflow-hidden transition-colors ${isDarkMode ? 'bg-black/40' : 'bg-slate-100/50'}`} />
      
      {/* 3D HUD Interface */}
      <div className="absolute inset-0 pointer-events-none p-8 flex flex-col justify-between z-10 font-mono">
        <div className="flex justify-between items-start">
           <div className="bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 backdrop-blur-md">
              <span className="text-[10px] font-black text-cyan-400 tracking-[0.3em] uppercase flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                 Target_Lock: Active
              </span>
           </div>
           <div className="text-right text-[9px] text-zinc-600 uppercase leading-relaxed tracking-widest">
              Structure_ID: 7KIP<br/>Resolution: 2.8Å<br/>Model: DeepFold v4.2.0
           </div>
        </div>

        {/* Technical HUD Overlay Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] flex items-center justify-center">
            <div className="w-[30rem] h-[30rem] border border-cyan-400 rounded-full" />
            <div className="absolute w-[20rem] h-[20rem] border border-cyan-400/50 rounded-full" />
            <div className="absolute w-full h-px bg-cyan-400" />
            <div className="absolute h-full w-px bg-cyan-400" />
        </div>

        <div className="flex justify-between items-end">
           <div className="space-y-2">
              <div className="flex items-center gap-3 text-white">
                 <RotateCw className="w-4 h-4 text-cyan-500 animate-spin-slow" />
                 <span className="text-[11px] font-black uppercase tracking-[0.4em]">3D Dynamics active</span>
              </div>
              <p className="text-[9px] text-zinc-600 uppercase tracking-widest">Real-time complex interaction monitoring</p>
           </div>
           <div className="flex gap-4 pointer-events-auto">
              <button className={`w-10 h-10 border rounded flex items-center justify-center transition-all ${isDarkMode ? 'bg-black/60 border-zinc-800 hover:bg-cyan-500/10 hover:border-cyan-500/50' : 'bg-white border-slate-300 hover:bg-cyan-50 hover:border-cyan-400'}`}>
                <Target className={`w-5 h-5 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`} />
              </button>
              <button className={`w-10 h-10 border rounded flex items-center justify-center transition-all ${isDarkMode ? 'bg-black/60 border-zinc-800 hover:bg-cyan-500/10 hover:border-cyan-500/50' : 'bg-white border-slate-300 hover:bg-cyan-50 hover:border-cyan-400'}`}>
                <Search className={`w-5 h-5 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Dashboard ---

export default function CrisproViewer() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen font-mono selection:bg-cyan-500/30 p-8 flex flex-col gap-8 transition-colors duration-500 ${isDarkMode ? 'bg-[#05070a] text-zinc-400' : 'bg-slate-50 text-slate-600'}`}>
      
      {/* Session Header */}
      <header className={`flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 px-6 py-5 border rounded-sm shadow-xl ${isDarkMode ? 'bg-black/40 border-cyan-900/20' : 'bg-white/80 border-slate-200'}`}>
        <div className="flex items-center gap-5">
          <div className="w-12 h-12 rounded bg-cyan-900/10 flex items-center justify-center border border-cyan-500/30">
             <ShieldCheck className="w-7 h-7 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-[0.5em] uppercase text-white leading-none mb-1">CrisPRO <span className="text-zinc-700">Oncology AI</span></h1>
            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em]">Session_Auth: CP-A84-ALPHA-CORE-v6</p>
          </div>
        </div>
        <div className="flex items-center gap-6 md:gap-12 text-[10px] font-black uppercase tracking-[0.3em] flex-wrap">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
              SYSTEM_LIVE
           </div>
           <div className="hidden md:block h-5 w-px bg-zinc-800" />
           <div className="text-zinc-600 hover:text-white cursor-pointer transition-colors flex items-center gap-2">
              <Database className="w-4 h-4" /> BATCH_ARCHIVE
           </div>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="flex-1 flex flex-col xl:grid xl:grid-cols-12 gap-8 min-h-0">
        
        {/* Left: 3D Mol Viewer */}
        <section className="xl:col-span-8 flex flex-col bg-zinc-950/40 border border-zinc-900 rounded-sm p-6 lg:p-10 relative overflow-hidden shadow-2xl min-h-[400px]">
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-zinc-900 pb-6">
              <div className="flex items-center gap-4">
                 <Box className="w-5 h-5 text-cyan-500" />
                 <h2 className="text-[12px] font-black tracking-[0.4em] uppercase text-zinc-200">3D Structure Viewer: CAS9/gRNA/DNA Complex</h2>
              </div>
              <Activity className="w-4 h-4 text-cyan-900" />
           </div>
           <div className="flex-1 min-h-0">
              <MolecularViewer />
           </div>
           <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-cyan-500/10 pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-cyan-500/10 pointer-events-none" />
        </section>

        {/* Right: Analysis Panels */}
        <aside className="xl:col-span-4 flex flex-col gap-8">
          
          {/* Metrics Card */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-8 space-y-10 shadow-2xl">
             <div className="flex items-center justify-between border-b border-zinc-900 pb-5">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">CRISPR Target Analysis</span>
                <Info className="w-4 h-4 text-zinc-800" />
             </div>
             
             <div className="space-y-8">
                <div>
                   <div className="flex justify-between items-end mb-3">
                      <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Target Vulnerability</span>
                      <span className="text-3xl font-extralight text-white tracking-tighter">98.4%</span>
                   </div>
                   <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: '98.4%' }} transition={{ duration: 2 }}
                        className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.4)]" 
                      />
                   </div>
                </div>

                <div className="flex justify-between items-center py-6 border-y border-zinc-900/50">
                   <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Off-Target Risk</span>
                   <div className="text-right">
                      <span className="text-2xl font-light text-rose-500 tracking-tighter">0.02%</span>
                      <p className="text-[8px] text-zinc-800 font-black mt-1">v6.2 CALIBRATED</p>
                   </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                   <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Structural Pass Rate</span>
                   <span className="text-2xl font-light text-emerald-500">100%</span>
                </div>
             </div>
          </div>

          {/* Sequence Panel */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-8 shadow-2xl">
             <div className="flex items-center justify-between mb-5">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Genomic Sequence & PAM</span>
                <div className="px-3 py-1 bg-cyan-900/20 border border-cyan-500/20 text-[9px] font-black text-cyan-400 rounded-sm">PAM_ID: NGG</div>
             </div>
             <div className={`font-mono text-[12px] leading-[2] break-all tracking-[0.2em] p-6 rounded border shadow-inner transition-colors ${isDarkMode ? 'bg-black/60 border-zinc-900 text-zinc-300' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                TTC<span className="text-cyan-400 bg-cyan-500/10 px-0.5 border-b border-cyan-500/30">GAGATGTTCCTGGGGAGGCCGACAC</span>ATTCGGT<br/>
                GATAGTAGGGGGA<span className="text-rose-500 bg-rose-500/10 px-0.5 font-bold border border-rose-500/30">CCGCAC</span>GGCACCAGTGAGTG
             </div>
             <div className="mt-6 flex items-center gap-6 text-[9px] text-zinc-600 font-black uppercase tracking-widest">
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-500"/> Target Guide</span>
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500"/> PAM Motif</span>
             </div>
          </div>

          {/* Log List */}
          <div className="bg-zinc-950 border border-zinc-900 rounded-sm p-8 flex-1 flex flex-col shadow-2xl overflow-hidden">
             <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Off-Target Prediction Log</span>
                <ChevronRight className="w-4 h-4 text-zinc-800" />
             </div>
             <div className="flex-1 overflow-y-auto space-y-2 pr-3 scrollbar-hide">
                <div className="grid grid-cols-4 text-[9px] font-black text-zinc-700 uppercase tracking-widest pb-3 border-b border-zinc-900">
                   <span>Sequence</span><span>Chr</span><span>Mis</span><span className="text-right">Risk</span>
                </div>
                {[
                  { s: 'GCTTGGTGACC', c: '26', m: '1', r: '0.8%', alert: false },
                  { s: 'GCCTGGTGACC', c: 'C1', m: '2', r: '0.02%', alert: false },
                  { s: 'GCGTGGTCACG', c: '15', m: '2', r: '0.9%', alert: false },
                  { s: 'GCATCTCCCGT', c: '61', m: '2', r: 'NONE', alert: true },
                  { s: 'GCATTGTCAGT', c: '68', m: '1', r: 'NONE', alert: true },
                ].map((log, i) => (
                  <div key={i} className="grid grid-cols-4 text-[11px] py-2.5 border-b border-zinc-900/30 hover:bg-zinc-900/50 transition-all cursor-crosshair group">
                     <span className="truncate text-zinc-500 font-mono group-hover:text-zinc-300">{log.s}</span>
                     <span className="text-zinc-700 font-bold">{log.c}</span>
                     <span className="text-zinc-700 font-bold">{log.m}</span>
                     <span className={`text-right font-black ${log.alert ? 'text-zinc-800' : 'text-cyan-800'}`}>{log.r}</span>
                  </div>
                ))}
             </div>
          </div>

        </aside>
      </div>

      {/* Global Status Footer */}
      <footer className="h-auto py-6 lg:h-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 px-6 lg:px-10 border-t border-zinc-900 pointer-events-none">
        <div className="flex flex-col md:flex-row md:items-center gap-4 lg:gap-12">
           <div className="space-y-1">
              <span className="text-[11px] font-black text-zinc-800 uppercase tracking-[0.3em] block">Core Intelligence engine active</span>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
                 <span className="text-2xl font-light text-cyan-500 tracking-tighter leading-none">Nominal_v6.2.1</span>
                 <div className="hidden md:block h-5 w-px bg-zinc-900" />
                 <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Calibration: Sync_Active // Lat: 0.042ms</span>
              </div>
           </div>
        </div>
        <div className="flex gap-6 lg:gap-10 opacity-30">
           <Activity className="w-5 h-5 text-cyan-500" />
           <Database className="w-5 h-5 text-cyan-500" />
           <Cpu className="w-5 h-5 text-cyan-500" />
           <Zap className="w-5 h-5 text-cyan-500" />
        </div>
      </footer>
    </div>
  );
}