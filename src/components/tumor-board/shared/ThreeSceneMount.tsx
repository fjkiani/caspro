'use client';

// ============================================================================
// <ThreeSceneMount/> — SSR-safe, viewport-gated react-three-fiber Canvas wrapper.
//
// Mount policy (w6h, 2026-07-07):
//   - Canvas mounts LAZILY. It stays inert until the wrapping div is at least
//     20% intersecting the viewport. This defers WebGL context creation +
//     shader compilation for engines further down /tumor-board-scroll/.
//   - Once mounted, the Canvas STAYS mounted, even if the wrapper scrolls
//     back out of view. This preserves shader compilation and avoids the
//     visible re-init flash when the user scrolls up and back down.
//   - The scene can be pause-on-exit via `frameloop="demand"` on individual
//     engines if needed. Default is `frameloop="always"` (r3f default).
//
// Threshold and behavior are locked; do not add unmount logic here.
// ============================================================================

import { Canvas, type CanvasProps } from '@react-three/fiber';
import { Suspense, type ReactNode } from 'react';
import { useInViewportOnce } from './useInViewportOnce';

interface ThreeSceneMountProps extends Omit<CanvasProps, 'children'> {
  children: ReactNode;
  className?: string;
  /**
   * Rare cases (very cheap scenes) can disable dpr scaling for maximum FPS.
   * Default: 1..2 based on device pixel ratio, capped at 2.
   */
  dprCap?: number;
  /**
   * Escape hatch: skip viewport gating and mount eagerly. Only for the hero
   * scene above the fold, where we WANT the canvas up before scroll begins.
   */
  eager?: boolean;
  /**
   * Optional placeholder rendered before the Canvas mounts. Defaults to a
   * transparent div matching the wrapper size so layout does not shift.
   */
  placeholder?: ReactNode;
}

export default function ThreeSceneMount({
  children,
  className,
  dprCap = 2,
  camera,
  eager = false,
  placeholder,
  ...canvasProps
}: ThreeSceneMountProps) {
  const { ref, hasEntered } = useInViewportOnce<HTMLDivElement>({ threshold: 0.2 });
  const shouldMount = eager || hasEntered;

  return (
    <div ref={ref} className={className ?? 'absolute inset-0'}>
      {shouldMount ? (
        <Canvas
          dpr={[1, dprCap]}
          camera={camera ?? { position: [0, 0, 60], fov: 40, near: 0.1, far: 1000 }}
          gl={{ antialias: true, alpha: true }}
          {...canvasProps}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      ) : (
        placeholder ?? <div aria-hidden className="w-full h-full" />
      )}
    </div>
  );
}
