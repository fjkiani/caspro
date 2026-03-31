"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Terminal, Search, Activity, Cpu, Database, Maximize } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

// --- 3D Technical DNA Visualization Component ---

const DnaHero = () => {
  const { isDarkMode } = useTheme();
  const mountRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hudPositions, setHudPositions] = useState({
    brca1: { x: 0, y: 0, visible: false },
    at: { x: 0, y: 0, visible: false }
  });

  useEffect(() => {
    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);
    return () => { if (document.head.contains(script)) document.head.removeChild(script); };
  }, []);

  useEffect(() => {
    if (!isLoaded || !mountRef.current) return;

    const THREE = window.THREE;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.z = 55;

    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // --- DNA Parameters ---
    const strandSteps = 80;
    const radius = 7.5;
    const heightStep = 0.55;
    const twist = 0.38;

    // --- Wireframe Scaffold (The exact lattice look) ---
    const createScaffold = (offset = 0) => {
      const points = [];
      for (let i = 0; i < strandSteps; i++) {
        const angle = i * twist + offset;
        const y = (i - strandSteps / 2) * heightStep;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
      }
      
      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 80, 1.2, 6, false); // 6 radial segments for faceted look
      const color = isDarkMode ? 0x4fd1c5 : 0x0284c7; // Use darker sky-600 for light mode
      const tubeMat = new THREE.MeshBasicMaterial({ 
        color, 
        wireframe: true, 
        transparent: true, 
        opacity: isDarkMode ? 0.15 : 0.45 
      });
      return new THREE.Mesh(tubeGeo, tubeMat);
    };

    // --- Base Pair Connectors ---
    const bridgeColor = isDarkMode ? 0x4fd1c5 : 0x0284c7;
    const bridgeMat = new THREE.LineBasicMaterial({ color: bridgeColor, transparent: true, opacity: isDarkMode ? 0.1 : 0.4 });
    for (let i = 0; i < strandSteps; i += 5) {
      const angle = i * twist;
      const y = (i - strandSteps / 2) * heightStep;
      
      const p1 = new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      const p2 = new THREE.Vector3(Math.cos(angle + Math.PI) * radius, y, Math.sin(angle + Math.PI) * radius);
      
      const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
      dnaGroup.add(new THREE.Line(lineGeo, bridgeMat));
      
      // Junction Nodes
      const nodeGeo = new THREE.SphereGeometry(0.12, 4, 4);
      const nodeColor = isDarkMode ? 0x4fd1c5 : 0x0284c7;
      const node1 = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: nodeColor, opacity: isDarkMode ? 0.4 : 0.8, transparent: true }));
      const node2 = new THREE.Mesh(nodeGeo, new THREE.MeshBasicMaterial({ color: nodeColor, opacity: isDarkMode ? 0.4 : 0.8, transparent: true }));
      node1.position.copy(p1);
      node2.position.copy(p2);
      dnaGroup.add(node1, node2);
    }

    const scaffold1 = createScaffold(0);
    const scaffold2 = createScaffold(Math.PI);
    dnaGroup.add(scaffold1, scaffold2);

    dnaGroup.rotation.z = Math.PI / 8;

    const animate = () => {
      requestAnimationFrame(animate);
      dnaGroup.rotation.y += 0.0015;

      // 3D to 2D HUD Projection Logic
      const vector = new THREE.Vector3();
      const updateHUD = (index, offset, key) => {
        const angle = index * twist + offset + dnaGroup.rotation.y;
        const y = (index - strandSteps / 2) * heightStep;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        vector.set(x, y, z);
        vector.applyAxisAngle(new THREE.Vector3(0, 0, 1), dnaGroup.rotation.z);
        vector.project(camera);

        setHudPositions(prev => ({
          ...prev,
          [key]: { 
            x: (vector.x * 0.5 + 0.5) * width, 
            y: (-(vector.y * 0.5) + 0.5) * height, 
            visible: vector.z < 1 
          }
        }));
      };

      updateHUD(60, 0, 'brca1');
      updateHUD(20, Math.PI, 'at');

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
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
    };
  }, [isLoaded, isDarkMode]);

  return (
    <div className={`relative w-full h-screen overflow-hidden font-mono select-none transition-colors ${isDarkMode ? 'bg-black' : 'bg-slate-50'}`}>
      <div ref={mountRef} className="absolute inset-0 z-0 opacity-80" />
      
      {/* 3D Tracked HUD Labels */}
      <AnimatePresence>
        {hudPositions.brca1.visible && (
          <div className="absolute z-20 pointer-events-none" style={{ left: hudPositions.brca1.x, top: hudPositions.brca1.y }}>
            <div className="flex items-center gap-3 -translate-y-1/2 ml-4">
              <div className={`w-4 h-4 flex items-center justify-center border rounded-full ${isDarkMode ? 'border-cyan-400' : 'border-cyan-600'}`}>
                <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>BRCA1</span>
                <span className={`text-[10px] ${isDarkMode ? 'text-cyan-400/80' : 'text-cyan-700/80'}`}>0.8877</span>
              </div>
            </div>
          </div>
        )}

        {hudPositions.at.visible && (
          <div className="absolute z-20 pointer-events-none" style={{ left: hudPositions.at.x, top: hudPositions.at.y }}>
            <div className="flex items-center gap-3 -translate-y-1/2 ml-4">
              <div className="flex flex-col items-end">
                <span className={`text-sm font-bold tracking-widest ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>A / T</span>
                <span className={`text-[9px] uppercase ${isDarkMode ? 'text-cyan-900' : 'text-cyan-600'}`}>SEQ_INDX 6.887</span>
              </div>
              <div className={`w-4 h-4 flex items-center justify-center border rounded-full ${isDarkMode ? 'border-cyan-400' : 'border-cyan-600'}`}>
                <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Static HUD Elements (Matching screenshot quadrant positions) */}
      <div className="absolute inset-0 pointer-events-none z-10 p-12 flex flex-col justify-between">
        
        {/* Top Section */}
        <div className="flex justify-between items-start">
          <div className="space-y-1 opacity-60">
            <div className={`text-[11px] tracking-widest ${isDarkMode ? 'text-cyan-500' : 'text-cyan-700'}`}>DIST: -0.9542-0.0322</div>
            <div className={`text-[11px] tracking-widest ${isDarkMode ? 'text-cyan-500' : 'text-cyan-700'}`}>INDX: -0.0007-01367-0.0322</div>
            <div className={`text-[10px] uppercase tracking-[0.3em] ${isDarkMode ? 'text-white/30' : 'text-slate-900/40'}`}>Base Pairs Mapping</div>
          </div>
          
          <div className="text-right">
            <div className={`text-6xl font-light leading-none ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>0.887</div>
            <div className={`text-[9px] uppercase tracking-[0.5em] font-black mt-2 ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Confidence Floor</div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex justify-between items-end">
          {/* Main Title & Description (Left) */}
          <div className={`max-w-xl border-l-[3px] pl-8 py-4 pointer-events-auto ${isDarkMode ? 'border-cyan-500/30' : 'border-cyan-600/30'}`}>
            <h1 className={`text-3xl font-black tracking-tight uppercase mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Mars V6.2 Genomic Engine
            </h1>
            <p className={`text-[11px] leading-relaxed uppercase tracking-widest font-medium max-w-lg mb-8 ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
              Multi-modal genomic analysis for drug efficacy prediction. 
              Integrating Sequence, Pathway, and Evidence signals to mitigate trial failure risk.
            </p>
            <div className="flex gap-4">
              <button className={`px-8 py-3 bg-transparent border rounded-sm text-[10px] transition-all uppercase tracking-[0.4em] ${
                isDarkMode ? 'border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700' : 'border-slate-300 text-slate-500 hover:text-slate-900 hover:border-slate-400'
              }`}>
                [See Receipts]
              </button>
              <button className={`px-8 py-3 rounded-sm text-[10px] transition-all font-bold uppercase tracking-[0.4em] ${
                isDarkMode ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20' : 'bg-cyan-600/10 border border-cyan-600/30 text-cyan-700 hover:bg-cyan-600/20'
              }`}>
                [Talk to us]
              </button>
            </div>
          </div>

          {/* Right Metrics Column */}
          <div className="flex flex-col gap-12 text-right">
            <div className="space-y-1">
              <div className={`text-6xl font-light leading-none ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>6.667</div>
              <div className={`text-[9px] uppercase tracking-[0.5em] font-black ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>Pathway Alignment</div>
            </div>
            <div className="space-y-1">
              <div className={`text-6xl font-light leading-none ${isDarkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>0.537</div>
              <div className={`text-[9px] uppercase tracking-[0.5em] font-black ${isDarkMode ? 'text-zinc-600' : 'text-slate-400'}`}>ECE Prediction</div>
            </div>
          </div>
        </div>

        {/* Tactical Center Scope */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className={`relative w-[32rem] h-[32rem] border rounded-full flex items-center justify-center ${isDarkMode ? 'border-cyan-500/10' : 'border-cyan-600/20'}`}>
            <div className={`w-1 h-1 rounded-full ${isDarkMode ? 'bg-cyan-400' : 'bg-cyan-600'}`} />
            <div className={`absolute w-20 h-[1px] ${isDarkMode ? 'bg-cyan-400/30' : 'bg-cyan-600/30'}`} />
            <div className={`absolute h-20 w-[1px] ${isDarkMode ? 'bg-cyan-400/30' : 'bg-cyan-600/30'}`} />
          </div>
        </div>
      </div>

      {/* Corner Frame Accents */}
      <div className="absolute top-10 left-10 w-24 h-24 border-t border-l border-white/5" />
      <div className="absolute top-10 right-10 w-24 h-24 border-t border-r border-white/5" />
      <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l border-white/5" />
      <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r border-white/5" />
    </div>
  );
};

// --- App Entry (Hidden Data Sections) ---

// --- App Entry (Hidden Data Sections) ---

export default function App() {
  const { isDarkMode } = useTheme();
  const [showData, setShowData] = useState(false);

  return (
    <div className={`min-h-screen selection:bg-cyan-500/30 transition-colors ${isDarkMode ? 'bg-black text-zinc-100' : 'bg-white text-slate-900'}`}>
      
      {/* Restored 3D Technical HUD */}
      <DnaHero />

      <div className={`relative z-20 pb-40 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
        <div className="max-w-[1400px] mx-auto px-16 pt-32">
          {/* Below-fold content handled by EngineStack component */}
        </div>
      </div>
      
      <footer className={`py-24 border-t text-center font-mono ${isDarkMode ? 'border-zinc-900 bg-black' : 'border-slate-200 bg-white'}`}>
         <p className={`text-[10px] uppercase tracking-[1.2em] font-black ${isDarkMode ? 'text-zinc-800' : 'text-slate-400'}`}>
            CrisPRO.ai | MISSION CRITICAL GENOMIC SYSTEMS
         </p>
      </footer>
    </div>
  );
}