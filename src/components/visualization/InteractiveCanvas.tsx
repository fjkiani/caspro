'use client';

import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface CameraPosition {
  x: number;
  y: number;
  z: number;
}

export interface InteractiveCanvasProps {
  /** Child elements to render within the canvas */
  children: ReactNode;
  /** Whether to enable rotation */
  enableRotation?: boolean;
  /** Whether to enable zooming */
  enableZoom?: boolean;
  /** Whether to enable panning */
  enablePan?: boolean;
  /** Alias for enableRotation */
  rotationEnabled?: boolean;
  /** Alias for enableZoom */
  zoomEnabled?: boolean;
  /** Alias for enablePan */
  panEnabled?: boolean;
  /** Initial camera position */
  initialCameraPosition?: CameraPosition;
  /** Callback when camera position changes */
  onCameraChange?: (position: CameraPosition) => void;
  /** Whether to auto-rotate the camera */
  autoRotate?: boolean;
  /** Speed of auto-rotation (degrees per second) */
  autoRotateSpeed?: number;
  /** Custom controls to overlay on the canvas */
  controls?: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Background gradient colors */
  backgroundGradient?: {
    from: string;
    to: string;
  };
}

/**
 * InteractiveCanvas provides a foundation for 3D visualizations with camera controls.
 * It handles user interactions like rotation, zoom, and pan, while providing a
 * consistent container for visualization content.
 */
export function InteractiveCanvas({
  children,
  enableRotation = true,
  enableZoom = true,
  enablePan = false,
  rotationEnabled,
  zoomEnabled,
  panEnabled,
  initialCameraPosition = { x: 0, y: 0, z: 0 },
  onCameraChange,
  autoRotate = false,
  autoRotateSpeed = 1,
  controls,
  className = '',
  backgroundGradient = {
    from: 'from-slate-900',
    to: 'to-blue-950',
  },
}: InteractiveCanvasProps) {
  // Use the enabled aliases if provided, otherwise fall back to the enable properties
  const canRotate = rotationEnabled !== undefined ? rotationEnabled : enableRotation;
  const canZoom = zoomEnabled !== undefined ? zoomEnabled : enableZoom;
  const canPan = panEnabled !== undefined ? panEnabled : enablePan;

  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>(initialCameraPosition);
  const [zoom, setZoom] = useState(1);

  // Handle auto-rotation
  useEffect(() => {
    if (!autoRotate || isDragging) return;

    const rotationInterval = setInterval(() => {
      setCameraPosition(prev => {
        const newPosition = {
          ...prev,
          y: prev.y + autoRotateSpeed * 0.1
        };
        
        if (onCameraChange) {
          onCameraChange(newPosition);
        }
        
        return newPosition;
      });
    }, 16); // ~60fps

    return () => clearInterval(rotationInterval);
  }, [autoRotate, autoRotateSpeed, isDragging, onCameraChange]);

  // Mouse/touch event handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!canRotate) return;
    
    setIsDragging(true);
    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    });
    
    // Capture pointer to receive events outside the element
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !canRotate) return;
    
    const deltaX = e.clientX - startPosition.x;
    const deltaY = e.clientY - startPosition.y;
    
    setCameraPosition(prev => {
      const newPosition = {
        ...prev,
        x: prev.x + deltaY * 0.5,
        y: prev.y + deltaX * 0.5,
      };
      
      if (onCameraChange) {
        onCameraChange(newPosition);
      }
      
      return newPosition;
    });
    
    setStartPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!canZoom) return;
    
    e.preventDefault();
    const delta = e.deltaY * -0.01;
    const newZoom = Math.max(0.5, Math.min(5, zoom + delta));
    
    setZoom(newZoom);
  };

  // Transform style based on camera position and zoom
  const transformStyle = {
    transform: `perspective(1000px) rotateX(${cameraPosition.x}deg) rotateY(${cameraPosition.y}deg) rotateZ(${cameraPosition.z}deg) scale(${zoom})`,
    transformStyle: 'preserve-3d' as 'preserve-3d',
  };

  return (
    <div 
      ref={containerRef}
      className={`interactive-canvas relative overflow-hidden rounded-xl ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
      style={{ touchAction: 'none' }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${backgroundGradient.from} ${backgroundGradient.to}`}></div>
      
      {/* 3D transformation container */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-full h-full"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={transformStyle}
        >
          {children}
        </motion.div>
      </div>
      
      {/* Controls overlay */}
      {controls && (
        <div className="absolute top-2 right-2 z-10">
          {controls}
        </div>
      )}
      
      {/* Interaction hints */}
      <div className="absolute bottom-2 left-2 text-xs text-white/50">
        {canRotate && <span className="mr-3">Drag to rotate</span>}
        {canZoom && <span>Scroll to zoom</span>}
      </div>
    </div>
  );
}

export default InteractiveCanvas; 