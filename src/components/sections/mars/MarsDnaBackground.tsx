"use client";

import React, { useEffect, useRef } from 'react';

interface MarsDnaBackgroundProps {
  speed?: number;
  isScanning?: boolean;
}

export const MarsDnaBackground: React.FC<MarsDnaBackgroundProps> = ({ speed = 1, isScanning = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    // Only load Three.js if it's not already on the window
    if (!window.THREE) {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.onload = () => initScene();
      document.head.appendChild(script);
    } else {
      initScene();
    }

    function initScene() {
      const THREE = (window as any).THREE;
      if (!mountRef.current || !THREE) return;

      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      
      // Clear any previous children (HMR support)
      while (mountRef.current.firstChild) {
        mountRef.current.removeChild(mountRef.current.firstChild);
      }
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

      const s1 = createDataStrand(0);
      const s2 = createDataStrand(Math.PI);
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
      
      // Cleanup for this specific instance
      (mountRef.current as any)._cleanup = () => {
        window.removeEventListener('resize', handleResize);
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
        renderer.dispose();
      };
    }

    return () => {
      if (mountRef.current && (mountRef.current as any)._cleanup) {
        (mountRef.current as any)._cleanup();
      }
    };
  }, [speed, isScanning]);

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none transition-all duration-1000" />;
};
