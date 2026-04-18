'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Zap, ChevronRight } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

import * as THREE from 'three';
import { TypewriterText } from '@/components/ui/TypewriterText';
import { HERO_CAPABILITIES } from '@/components/sections/mars/CapabilityShowcase';

// --- Capability cycling text for the typewriter ---
const CAPABILITY_LINES = HERO_CAPABILITIES.map(
  (c) => `${c.id} // ${c.label}: ${c.question}`
);

// --- Gene Ticker Background (horizontal scrolling gene names) ---
const GeneTicker = () => {
  const genes = [
    'SLC25A32:3.1Å', 'MBD4:LOF', 'LATIFY:NCT05450692', 'CEACAM5:ADC', 'CAPRI:PARP_STATUS',
    'BERZOSERTIB:RSS', 'ADAVOSERTIB:WEE1', 'STK11:KEAP1', 'BRCA1:BDP1',
    'TP53:MUT', 'KRAS:G12C', 'EGFR:L858R', 'ALK:FUSION', 'BRAF:V600E',
  ];
  const doubled = [...genes, ...genes, ...genes];

  return (
    <div className="absolute top-0 left-0 right-0 overflow-hidden z-[1] pointer-events-none opacity-[0.07]">
      <div className="flex whitespace-nowrap animate-[ticker_60s_linear_infinite]">
        {doubled.map((g, i) => (
          <span key={i} className="text-[11px] font-mono text-cyan-400 tracking-[0.3em] mx-8">
            {g}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
};

// --- 3D Technical DNA Visualization & Hero Component ---
export function DnaHero({ embedded = false }: { embedded?: boolean }) {
  const { isDarkMode } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCapability, setActiveCapability] = useState(0);
  const [hudPositions, setHudPositions] = useState({
    brca1: { x: 0, y: 0, visible: false },
    at: { x: 0, y: 0, visible: false },
    match: { x: 0, y: 0, visible: false },
    rad51: { x: 0, y: 0, visible: false },
    dnoi: { x: 0, y: 0, visible: false },
    tp53: { x: 0, y: 0, visible: false },
    hras: { x: 0, y: 0, visible: false },
    cgX: { x: 0, y: 0, visible: false }
  });

  // Auto-cycle capabilities (synced with typewriter pause)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCapability((prev) => (prev + 1) % HERO_CAPABILITIES.length);
    }, 5000); // matches typing + pause + deleting cycle
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded || !mountRef.current) return;

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

    // --- DNA Parameters (Point Cloud) ---
    const numNodes = 400;
    const radius = 5.5;
    const heightSpacing = 0.12;
    const turns = 3;
    const twist = Math.PI * 2 * turns / numNodes;
    
    const posArray: number[] = [];
    const colorArray: number[] = [];
    
    const cyan = new THREE.Color(isDarkMode ? '#00E5FF' : '#0284c7'); // sky-600 for light
    const gray = new THREE.Color(isDarkMode ? '#3A4B5C' : '#64748b'); // slate-500
    const white = new THREE.Color(isDarkMode ? '#E8E8F0' : '#1e293b'); // slate-800

    for (let i = 0; i < numNodes; i++) {
        const angle1 = i * twist;
        const angle2 = angle1 + Math.PI;
        const y = (i - numNodes / 2) * heightSpacing;
        const x1 = Math.cos(angle1) * radius;
        const z1 = Math.sin(angle1) * radius;
        const x2 = Math.cos(angle2) * radius;
        const z2 = Math.sin(angle2) * radius;
        
        for (let p = 0; p < 20; p++) {
             const offset1 = new THREE.Vector3((Math.random()-0.5)*1.5, (Math.random()-0.5)*1.5, (Math.random()-0.5)*1.5);
             posArray.push(x1+offset1.x, y+offset1.y, z1+offset1.z);
             const c1 = cyan.clone().lerp(white, Math.random()*0.3);
             colorArray.push(c1.r, c1.g, c1.b);

             const offset2 = new THREE.Vector3((Math.random()-0.5)*1.5, (Math.random()-0.5)*1.5, (Math.random()-0.5)*1.5);
             posArray.push(x2+offset2.x, y+offset2.y, z2+offset2.z);
             const c2 = gray.clone().lerp(white, Math.random()*0.5);
             if (Math.random() > 0.85) c2.copy(cyan);
             colorArray.push(c2.r, c2.g, c2.b);
        }
        
        if (i % 8 === 0) {
             const rungsCount = 20;
             for (let j = 0; j <= rungsCount; j++) {
                 const step = j / rungsCount;
                 const rx = x1 + (x2 - x1) * step;
                 const ry = y;
                 const rz = z1 + (z2 - z1) * step;
                 for(let k = 0; k < 3; k++) {
                    posArray.push(rx+(Math.random()-0.5)*0.5, ry+(Math.random()-0.5)*0.5, rz+(Math.random()-0.5)*0.5);
                    colorArray.push(cyan.r, cyan.g, cyan.b);
                 }
             }
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(posArray, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorArray, 3));

    const material = new THREE.PointsMaterial({
        size: 0.1, vertexColors: true, transparent: true, opacity: 0.8,
        sizeAttenuation: true, blending: isDarkMode ? THREE.AdditiveBlending : THREE.NormalBlending, depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    dnaGroup.add(particles);
    dnaGroup.rotation.z = Math.PI / 8;
    dnaGroup.rotation.x = 0.2;

    let frameId: number;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      dnaGroup.rotation.y += 0.0015;

      const vector = new THREE.Vector3();
      const newPos: any = {};

      const updatePosition = (index: number, offset: number, key: string) => {
        const angle = index * twist + offset;
        const localY = (index - numNodes / 2) * heightSpacing;
        vector.set(Math.cos(angle)*radius, localY, Math.sin(angle)*radius);
        dnaGroup.localToWorld(vector);
        vector.project(camera);
        newPos[key] = {
          x: (vector.x*0.5+0.5)*width,
          y: (-(vector.y*0.5)+0.5)*height,
          visible: vector.z<1 && vector.x>-1 && vector.x<1 && vector.y>-1 && vector.y<1
        };
      };

      updatePosition(380, 0, 'brca1');
      updatePosition(20, Math.PI, 'at');
      updatePosition(260, Math.PI/2, 'match');
      updatePosition(320, Math.PI*1.5, 'rad51');
      updatePosition(150, Math.PI/4, 'dnoi');
      updatePosition(80, Math.PI/3, 'tp53');
      updatePosition(210, Math.PI*1.2, 'hras');
      updatePosition(310, Math.PI*0.8, 'cgX');

      setHudPositions(newPos);
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
  }, [isLoaded, isDarkMode]);

  // Embedded: fill the HeroSlider slide frame. Using only `relative flex-1` collapses height when
  // all children are `absolute` (no in-flow content), so `justify-end` pins copy to the top — looks "inverted".
  const shell =
    embedded
      ? 'absolute inset-0 w-full h-full min-h-0 overflow-hidden'
      : 'relative w-full min-h-screen h-screen overflow-hidden';

  return (
    <div className={`${shell} font-mono select-none transition-colors duration-500 ${
      isDarkMode ? 'bg-[#020408]' : 'bg-slate-50'
    }`}>
      <div ref={mountRef} className="absolute inset-0 z-0 opacity-60" />
      
      {/* Grid Pattern Overlay */}
      <div className={`absolute inset-0 bg-[size:40px_40px] pointer-events-none z-0 ${
        isDarkMode 
          ? 'bg-[linear-gradient(to_right,#0ef3ff02_1px,transparent_1px),linear-gradient(to_bottom,#0ef3ff02_1px,transparent_1px)]'
          : 'bg-[linear-gradient(to_right,#0891b208_1px,transparent_1px),linear-gradient(to_bottom,#0891b208_1px,transparent_1px)]'
      }`} />

      {/* === MAIN HERO CONTENT === */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end p-4 sm:p-8 lg:p-12 pointer-events-none">

        {/* Bottom Section: Headline + CTA */}
        <div className="flex flex-col sm:flex-row sm:justify-start sm:items-end pb-24 sm:pb-28 gap-6 sm:gap-12 pointer-events-auto">
          
          {/* Left: Primary Copy */}
          <div className="max-w-2xl space-y-4 sm:space-y-6 min-w-0">
            {/* Main Headline — per landing page spec */}
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-[1.15] uppercase ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              PREDICTION IS <span className={isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}>CERTAINTY</span>.
            </h1>

            {/* Typewriter Capability Cycling */}
            <div className={`backdrop-blur-sm border rounded px-6 py-4 ${
              isDarkMode ? 'bg-zinc-950/80 border-zinc-800/60' : 'bg-white/90 border-slate-200'
            }`}>
              <div className={`text-[9px] font-black uppercase tracking-[0.4em] mb-2 ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}>
                ACTIVE GATE
              </div>
              <div className={`text-[13px] font-mono leading-relaxed min-h-[1.5em] ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
                <TypewriterText
                  texts={CAPABILITY_LINES}
                  typingSpeed={35}
                  deletingSpeed={20}
                  pauseDuration={2800}
                />
              </div>
            </div>

            {/* Subline */}
            <p className={`text-[11px] uppercase tracking-[0.3em] font-bold flex items-center gap-4 ${isDarkMode ? 'text-zinc-500' : 'text-slate-600'}`}>
              <Zap className={`w-3 h-3 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`} />
              FIVE PHASE III FAILURES. FIVE RECEIPTS. ZERO EXCUSES.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <Link
                href="/engine/safety/"
                prefetch={false}
                className={`group px-6 sm:px-8 py-3 border text-[10px] font-black transition-all uppercase tracking-[0.3em] flex items-center justify-center gap-2 ${
                  isDarkMode
                    ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)]'
                    : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-600 hover:bg-indigo-500/20 shadow-[0_0_30px_rgba(79,70,229,0.1)]'
                }`}
              >
                SEE THE RECEIPTS <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/contact/"
                prefetch={false}
                className={`inline-flex items-center justify-center px-6 sm:px-8 py-3 bg-transparent border text-[10px] font-black transition-all uppercase tracking-[0.3em] ${
                  isDarkMode
                    ? 'border-zinc-800 text-zinc-500 hover:text-white hover:border-zinc-600'
                    : 'border-slate-300 text-slate-500 hover:text-slate-900 hover:border-slate-500'
                }`}
              >
                TALK TO US
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DnaHero;