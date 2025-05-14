'use client';

import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface DnaRnaModelViewerProps {
  className?: string;
}

export default function DnaRnaModelViewer({ className }: DnaRnaModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    let animationFrameId: number;
    let controls: OrbitControls;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Aggressive lighting for more contrast and visibility on a light background
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Lower ambient for darker shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5); // Stronger main light
    directionalLight.position.set(10, 15, 10); // Adjusted position for potentially better angles
    const backLight = new THREE.DirectionalLight(0xffffff, 0.6); // Subtle backlight
    backLight.position.set(-10, -10, -15);
    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(backLight);

    // Add OrbitControls with smooth rotation
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 15;
    controls.maxDistance = 50;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    // Load the DNA/RNA model
    const loader = new GLTFLoader();
    loader.load(
      '/models/dna_rna.glb',
      (gltf) => {
        if (!mounted) return;

        const model = gltf.scene;
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        // Scale the model
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 200 / maxDim;
        model.scale.multiplyScalar(scale);

        // Add some rotation to show the 3D nature better
        model.rotation.x = Math.PI * 0.15;
        model.rotation.y = Math.PI * 0.25;

        scene.add(model);
        setIsLoading(false);

        // Adjust camera to frame the model
        const distance = maxDim * 3;
        camera.position.z = distance;
        controls.target.set(0, 0, 0);
        controls.update();
      },
      undefined,
      (error) => {
        if (!mounted) return;
        console.error('Error loading model:', error);
        setError('Failed to load 3D model');
        setIsLoading(false);
      }
    );

    // Animation loop with smooth rotation
    const animate = () => {
      if (!mounted) return;
      
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mounted = false;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (error) {
    return (
      <div className={className || 'w-full h-full min-h-[300px] md:min-h-[400px] rounded-lg overflow-hidden'}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={className || 'w-full h-full min-h-[300px] md:min-h-[400px] rounded-lg overflow-hidden'}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse text-white">Loading model...</div>
        </div>
      )}
    </div>
  );
} 