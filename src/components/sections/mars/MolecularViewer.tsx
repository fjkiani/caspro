'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RotateCw, Target, Search } from 'lucide-react';

export const MolecularViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    // --- CAS9 Protein Complex (Lobed organic structure) ---
    const cas9Group = new THREE.Group();
    scene.add(cas9Group);

    const proteinMaterial = new THREE.MeshPhongMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
      flatShading: true
    });

    // Clusters of lobes to create the characteristic "cradle" shape
    const lobes = [
      { pos: [0, 0, 0] as [number, number, number], scale: [1.2, 1, 0.8] as [number, number, number], radius: 10 },
      { pos: [6, 2, -2] as [number, number, number], scale: [0.8, 0.9, 0.7] as [number, number, number], radius: 8 },
      { pos: [-6, -2, 2] as [number, number, number], scale: [0.7, 1.1, 0.9] as [number, number, number], radius: 9 },
      { pos: [0, 5, 0] as [number, number, number], scale: [1, 0.6, 1] as [number, number, number], radius: 7 },
    ];

    lobes.forEach(config => {
      const geo = new THREE.IcosahedronGeometry(config.radius, 3);
      const positions = geo.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const v = new THREE.Vector3().fromBufferAttribute(positions, i);
        v.multiplyScalar(1 + Math.random() * 0.15); // Organic jitter
        positions.setXYZ(i, v.x, v.y, v.z);
      }
      const lobe = new THREE.Mesh(geo, proteinMaterial);
      lobe.position.set(...config.pos);
      lobe.scale.set(...config.scale);
      cas9Group.add(lobe);

      // Point cloud overlay
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
      const points: THREE.Vector3[] = [];
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
    const gRNA = createHelix(Math.PI / 2, 0x22d3ee); // Cyan guide RNA
    gRNA.scale.set(1.2, 0.4, 1.2); 
    
    helixGroup.add(dna1, dna2, gRNA);
    helixGroup.rotation.z = Math.PI / 3;

    // Base Pair Rungs
    const rungMat = new THREE.LineBasicMaterial({ color: 0x475569, transparent: true, opacity: 0.1 });
    for (let i = 0; i < 40; i++) {
       const t = (i / 40) - 0.5;
       const angle = t * 60 * 0.4;
       const p1 = new THREE.Vector3(Math.cos(angle) * 3, t * 60, Math.sin(angle) * 3);
       const p2 = new THREE.Vector3(Math.cos(angle + Math.PI) * 3, t * 60, Math.sin(angle + Math.PI) * 3);
       const lineGeo = new THREE.BufferGeometry().setFromPoints([p1, p2]);
       helixGroup.add(new THREE.Line(lineGeo, rungMat));
    }

    const light1 = new THREE.PointLight(0x22d3ee, 1, 100);
    light1.position.set(20, 20, 20);
    scene.add(light1);
    scene.add(new THREE.AmbientLight(0x404040));

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
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

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="absolute inset-0 z-0 bg-black/40 rounded overflow-hidden" />
      
      {/* 3D HUD Interface Overlay */}
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

        <div className="flex justify-between items-end">
           <div className="space-y-2">
              <div className="flex items-center gap-3 text-white">
                 <RotateCw className="w-4 h-4 text-cyan-500" />
                 <span className="text-[11px] font-black uppercase tracking-[0.4em]">3D Dynamics active</span>
              </div>
              <p className="text-[9px] text-zinc-600 uppercase tracking-widest">Molecular session sync: Nominal</p>
           </div>
           <div className="flex gap-4 pointer-events-auto">
              <button className="w-10 h-10 border border-zinc-800 rounded bg-black/60 flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all">
                <Target className="w-5 h-5 text-zinc-400" />
              </button>
              <button className="w-10 h-10 border border-zinc-800 rounded bg-black/60 flex items-center justify-center hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all">
                <Search className="w-5 h-5 text-zinc-400" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};
