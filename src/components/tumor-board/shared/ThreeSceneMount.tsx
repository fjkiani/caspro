'use client';

// ============================================================================
// <ThreeSceneMount/> — SSR-safe react-three-fiber Canvas wrapper.
//
// Replaces the CDN <script> injection pattern used in the attached components.
// react-three-fiber's <Canvas> handles the SSR guard automatically and mounts
// a proper React scene tree that unmounts cleanly. All 3D scenes across the
// tumor-board use this wrapper.
// ============================================================================

import { Canvas, type CanvasProps } from '@react-three/fiber';
import { Suspense, type ReactNode } from 'react';

interface ThreeSceneMountProps extends Omit<CanvasProps, 'children'> {
  children: ReactNode;
  className?: string;
  /**
   * Rare cases (very cheap scenes) can disable dpr scaling for maximum FPS.
   * Default: 1..2 based on device pixel ratio, capped at 2.
   */
  dprCap?: number;
}

export default function ThreeSceneMount({
  children,
  className,
  dprCap = 2,
  camera,
  ...canvasProps
}: ThreeSceneMountProps) {
  return (
    <div className={className ?? 'absolute inset-0'}>
      <Canvas
        dpr={[1, dprCap]}
        camera={camera ?? { position: [0, 0, 60], fov: 40, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: true }}
        {...canvasProps}
      >
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}
