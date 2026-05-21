'use client';

import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import type { CascadeViewPreset } from '@/data/metastatic-cascade-data';

interface ThreeSceneProps {
  className?: string;
  modelUrl: string;
  isDarkMode?: boolean;
  viewPreset?: CascadeViewPreset;
}

function applyViewPreset(model: THREE.Object3D, preset: CascadeViewPreset) {
  const box = new THREE.Box3().setFromObject(model);
  const center = box.getCenter(new THREE.Vector3());
  model.position.sub(center);

  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = (200 / maxDim) * (preset.scaleMul ?? 1);
  model.scale.multiplyScalar(scale);

  model.rotation.x = preset.rotationX;
  model.rotation.y = preset.rotationY;

  if (preset.tint) {
    const tint = new THREE.Color(preset.tint);
    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.material) return;
      const tintMat = (m: THREE.Material) => {
        const cloned = m.clone();
        if ('color' in cloned && cloned.color instanceof THREE.Color) {
          cloned.color.lerp(tint, 0.35);
        }
        return cloned;
      };
      child.material = Array.isArray(child.material)
        ? child.material.map(tintMat)
        : tintMat(child.material);
    });
  }
}

export default function ThreeScene({ className, modelUrl, isDarkMode = false, viewPreset }: ThreeSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const presetKey = viewPreset
    ? `${viewPreset.modelUrl}-${viewPreset.rotationX}-${viewPreset.rotationY}-${viewPreset.scaleMul ?? 1}-${viewPreset.tint ?? ''}`
    : modelUrl;

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;
    let mounted = true;
    let animationFrameId: number;
    let controls: OrbitControls;
    let loadedRoot: THREE.Object3D | null = null;

    setIsLoading(true);
    setError(null);

    const scene = new THREE.Scene();
    if (!isDarkMode) {
      scene.background = new THREE.Color('#f8fafc');
    }

    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 30);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      logarithmicDepthBuffer: true,
    });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, isDarkMode ? 0.85 : 1);
    const directionalLight = new THREE.DirectionalLight(0xffffff, isDarkMode ? 1.2 : 1.5);
    directionalLight.position.set(10, 10, 10);
    const backLight = new THREE.DirectionalLight(0xffffff, 0.7);
    backLight.position.set(-10, -10, -10);
    scene.add(ambientLight);
    scene.add(directionalLight);
    scene.add(backLight);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 10;
    controls.maxDistance = 100;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        if (!mounted) return;

        if (loadedRoot) {
          scene.remove(loadedRoot);
          loadedRoot.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry?.dispose();
              const mats = Array.isArray(child.material) ? child.material : [child.material];
              mats.forEach((m) => m.dispose());
            }
          });
        }

        loadedRoot = gltf.scene.clone(true);
        if (viewPreset) {
          applyViewPreset(loadedRoot, viewPreset);
        } else {
          const box = new THREE.Box3().setFromObject(loadedRoot);
          const center = box.getCenter(new THREE.Vector3());
          loadedRoot.position.sub(center);
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          loadedRoot.scale.multiplyScalar(200 / maxDim);
          loadedRoot.rotation.x = Math.PI * 0.15;
          loadedRoot.rotation.y = Math.PI * 0.25;
        }

        scene.add(loadedRoot);
        setIsLoading(false);

        const box = new THREE.Box3().setFromObject(loadedRoot);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.z = maxDim * 3;
        controls.target.set(0, 0, 0);
        controls.update();
      },
      undefined,
      (loadError) => {
        if (!mounted) return;
        console.error('Error loading model:', loadError);
        setError('Failed to load 3D model');
        setIsLoading(false);
      }
    );

    const animate = () => {
      if (!mounted) return;
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
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
      mounted = false;
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      if (loadedRoot) {
        scene.remove(loadedRoot);
        loadedRoot.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry?.dispose();
            const mats = Array.isArray(child.material) ? child.material : [child.material];
            mats.forEach((m) => m.dispose());
          }
        });
      }
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelUrl, isDarkMode, presetKey]);

  if (error) {
    return (
      <div className={className || 'w-full h-full min-h-[300px] md:min-h-[400px] bg-slate-200 rounded-lg overflow-hidden shadow-lg'}>
        <div className="w-full h-full flex items-center justify-center">
          <div className={isDarkMode ? 'text-rose-400' : 'text-red-600'}>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className || 'w-full h-full min-h-[300px] md:min-h-[400px] bg-slate-200 rounded-lg overflow-hidden shadow-lg'}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className={`animate-pulse ${isDarkMode ? 'text-zinc-400' : 'text-gray-600'}`}>Loading model...</div>
        </div>
      )}
    </div>
  );
}
