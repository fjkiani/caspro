import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

interface ModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

function Model({ modelPath, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0] }: ModelProps) {
  const { scene } = useGLTF(modelPath);
  
  return (
    <primitive 
      object={scene} 
      scale={scale} 
      position={position}
      rotation={rotation}
    />
  );
}

interface ModelViewerProps extends ModelProps {
  className?: string;
}

export default function ModelViewer({ modelPath, scale, position, rotation, className }: ModelViewerProps) {
  return (
    <div className={`w-full h-[400px] ${className || ''}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model 
            modelPath={modelPath}
            scale={scale}
            position={position}
            rotation={rotation}
          />
        </Suspense>
        <OrbitControls enableZoom={true} autoRotate={true} autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
} 