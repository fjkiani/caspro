'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GlitchTypewriter } from '@/components/ui/GlitchTypewriter';
import { HERO_HEADLINES } from '@/data/hero-headlines';
import { DynamicEvidencePanel } from '@/components/ui/DynamicEvidencePanel';

// Standalone point-cloud protein viewer for hero preview
const ProteinCanvas = ({ isDarkMode }: { isDarkMode: boolean }) => {
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
    const el = mountRef.current;
    const width = el.clientWidth;
    const height = el.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    el.appendChild(renderer.domElement);
    camera.position.z = 55;

    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    const numNodes = 400;
    const radius = 5.5;
    const heightSpacing = 0.12;
    const turns = 3;
    const twist = Math.PI * 2 * turns / numNodes;

    const posArray: number[] = [];
    const colorArray: number[] = [];

    const accentColor = new THREE.Color(isDarkMode ? '#00E5FF' : '#4f46e5');
    const gray = new THREE.Color('#3A4B5C');
    const white = new THREE.Color('#E8E8F0');

    for (let i = 0; i < numNodes; i++) {
      const angle1 = i * twist;
      const angle2 = angle1 + Math.PI;
      const y = (i - numNodes / 2) * heightSpacing;
      const x1 = Math.cos(angle1) * radius;
      const z1 = Math.sin(angle1) * radius;
      const x2 = Math.cos(angle2) * radius;
      const z2 = Math.sin(angle2) * radius;

      for (let p = 0; p < 20; p++) {
        const o1x = (Math.random() - 0.5) * 1.5, o1y = (Math.random() - 0.5) * 1.5, o1z = (Math.random() - 0.5) * 1.5;
        posArray.push(x1 + o1x, y + o1y, z1 + o1z);
        const c1 = accentColor.clone().lerp(white, Math.random() * 0.3);
        colorArray.push(c1.r, c1.g, c1.b);

        const o2x = (Math.random() - 0.5) * 1.5, o2y = (Math.random() - 0.5) * 1.5, o2z = (Math.random() - 0.5) * 1.5;
        posArray.push(x2 + o2x, y + o2y, z2 + o2z);
        const c2 = gray.clone().lerp(white, Math.random() * 0.5);
        if (Math.random() > 0.85) c2.copy(accentColor);
        colorArray.push(c2.r, c2.g, c2.b);
      }

      if (i % 8 === 0) {
        const rungsCount = 20;
        for (let j = 0; j <= rungsCount; j++) {
          const step = j / rungsCount;
          const rx = x1 + (x2 - x1) * step;
          const rz = z1 + (z2 - z1) * step;
          for (let k = 0; k < 3; k++) {
            posArray.push(rx + (Math.random() - 0.5) * 0.5, y + (Math.random() - 0.5) * 0.5, rz + (Math.random() - 0.5) * 0.5);
            colorArray.push(accentColor.r, accentColor.g, accentColor.b);
          }
        }
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(posArray, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colorArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.1, vertexColors: true, transparent: true, opacity: 0.7,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    dnaGroup.add(particles);
    dnaGroup.rotation.z = Math.PI / 8;
    dnaGroup.rotation.x = 0.2;

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      dnaGroup.rotation.y += 0.0015;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (el && renderer.domElement && el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isLoaded, isDarkMode]);

  return <div ref={mountRef} className="w-full h-full rounded-sm overflow-hidden" />;
};

// ─── Consolidated Target Lock Preview ─────────────────────────────────────────

const ProteinPreview = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const accent = isDarkMode ? 'text-cyan-400' : 'text-indigo-600';
  const muted = isDarkMode ? 'text-zinc-500' : 'text-slate-400';
  const heading = isDarkMode ? 'text-white' : 'text-slate-900';
  const headlines = HERO_HEADLINES['target-lock'] || [];
  const [activeIdx, setActiveIdx] = useState(0);
  const handleLineChange = useCallback((idx: number) => setActiveIdx(idx), []);

  return (
    <div className="flex-1 flex items-start sm:items-center justify-center w-full min-h-0 px-2 sm:px-4 py-1 sm:py-4">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-3 sm:gap-6 lg:gap-8 items-start sm:items-center min-h-0 lg:min-h-[500px]">

        {/* Left: Typewriter Tagline + Evidence */}
        <div className="flex flex-col justify-start sm:justify-center gap-2 sm:gap-4 lg:gap-8 py-1 sm:py-2 lg:py-8 min-w-0 order-2 lg:order-none">
          <div>
            <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.35em] sm:tracking-[0.5em] ${accent} opacity-60 block mb-2 sm:mb-4`}>
              Target Validation
            </span>
            <GlitchTypewriter
              lines={headlines}
              accentColor={accent}
              isDarkMode={isDarkMode}
              onLineChange={handleLineChange}
            />
          </div>

          {/* Dynamic Evidence Panel — in document flow on mobile to avoid overlap / clipping */}
          <div className="block w-full min-w-0">
            <DynamicEvidencePanel
              headlines={headlines}
              activeIndex={activeIdx}
              isDarkMode={isDarkMode}
              accentColor={accent}
            />
          </div>
        </div>

        {/* Right: 3D Point-Cloud Protein */}
        <div className="relative h-[min(28vh,200px)] sm:h-[min(40vh,320px)] md:h-[400px] lg:h-full lg:min-h-[400px] w-full order-1 lg:order-none min-h-[160px] sm:min-h-[220px]">
          <ProteinCanvas isDarkMode={isDarkMode} />
          {/* Minimal HUD */}
          <div className="absolute inset-0 pointer-events-none p-5 font-mono flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className={`px-3 py-1.5 border backdrop-blur-md rounded-sm ${isDarkMode ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-indigo-50 border-indigo-400/30'}`}>
                <span className={`text-[10px] font-black tracking-[0.2em] uppercase flex items-center gap-2 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isDarkMode ? 'bg-cyan-500' : 'bg-indigo-500'}`} />
                  Structure_Ready
                </span>
              </div>
              <div className={`text-right text-[9px] uppercase font-bold tracking-widest ${muted}`}>
                Target: MMP9<br />
                Vulnerability: 0.942
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProteinPreview;
