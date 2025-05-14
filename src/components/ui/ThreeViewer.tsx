'use client';

import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function SpinningBox(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

interface ThreeViewerProps {
  className?: string;
  onError?: (error: any) => void;
}

export default function ThreeViewer({ className, onError }: ThreeViewerProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false
      }}
      onError={onError}
      dpr={Math.min(2, window.devicePixelRatio)}
      legacy={true}
    >
      <Suspense fallback={null}>
        <color attach="background" args={['#f8fafc']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <SpinningBox position={[0, 0, 0]} />
        <OrbitControls 
          enableZoom={true} 
          enablePan={true}
          minDistance={2}
          maxDistance={10}
          makeDefault
        />
      </Suspense>
    </Canvas>
  );
}