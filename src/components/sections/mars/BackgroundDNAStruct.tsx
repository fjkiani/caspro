'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, Line } from '@react-three/drei';

const DNAObject = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Points>(null);
  
  // Generating a highly structural, point-cloud double helix
  const { positions, colors } = useMemo(() => {
    const numNodes = 400; // Dense spine
    const radius = 3.5;
    const heightSpacing = 0.08;
    const turns = 4;
    
    const posArray: number[] = [];
    const colorArray: number[] = [];
    
    const cyan = new THREE.Color('#00E5FF');
    const gray = new THREE.Color('#3A4B5C');
    const white = new THREE.Color('#E8E8F0');

    // Create the two backbones
    for (let i = 0; i < numNodes; i++) {
        const t = i / numNodes;
        const angle1 = t * Math.PI * 2 * turns;
        const angle2 = angle1 + Math.PI;
        
        const y = (i - numNodes / 2) * heightSpacing;
        
        // Strand 1
        const x1 = Math.cos(angle1) * radius;
        const z1 = Math.sin(angle1) * radius;
        
        // Strand 2
        const x2 = Math.cos(angle2) * radius;
        const z2 = Math.sin(angle2) * radius;
        
        // Add thousands of tiny particles around the backbones for the "point cloud" effect
        for (let p=0; p<20; p++) {
             const offset1 = new THREE.Vector3(
                (Math.random() - 0.5) * 1.5,
                (Math.random() - 0.5) * 1.5,
                (Math.random() - 0.5) * 1.5
             );
             posArray.push(x1 + offset1.x, y + offset1.y, z1 + offset1.z);
             
             // Base cyan color with some variation
             const c1 = cyan.clone().lerp(white, Math.random() * 0.3);
             colorArray.push(c1.r, c1.g, c1.b);

             const offset2 = new THREE.Vector3(
                (Math.random() - 0.5) * 1.5,
                (Math.random() - 0.5) * 1.5,
                (Math.random() - 0.5) * 1.5
             );
             posArray.push(x2 + offset2.x, y + offset2.y, z2 + offset2.z);
             
             const c2 = gray.clone().lerp(white, Math.random() * 0.5);
             if (Math.random() > 0.85) c2.copy(cyan); // Occasional bright spot
             colorArray.push(c2.r, c2.g, c2.b);
        }
        
        // Rungs (connecting base pairs)
        if (i % 8 === 0) {
             const rungsCount = 20;
             for (let j=0; j<=rungsCount; j++) {
                 const step = j / rungsCount;
                 const rx = x1 + (x2 - x1) * step;
                 const ry = y;
                 const rz = z1 + (z2 - z1) * step;
                 
                 // Scatter particles along the rung
                 for(let k=0; k<3; k++) {
                    posArray.push(rx + (Math.random()-0.5)*0.5, ry + (Math.random()-0.5)*0.5, rz + (Math.random()-0.5)*0.5);
                    colorArray.push(cyan.r, cyan.g, cyan.b);
                 }
             }
        }
    }
    
    return {
        positions: new Float32Array(posArray),
        colors: new Float32Array(colorArray)
    };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
        groupRef.current.rotation.y += delta * 0.1;
        groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0.2]}>
       <points ref={particlesRef}>
           <bufferGeometry>
               <bufferAttribute 
                   attach="attributes-position"
                   count={positions.length / 3}
                   array={positions}
                   itemSize={3}
               />
               <bufferAttribute 
                   attach="attributes-color"
                   count={colors.length / 3}
                   array={colors}
                   itemSize={3}
               />
           </bufferGeometry>
           {/* Custom material for glowing points */}
           <pointsMaterial 
               size={0.06} 
               vertexColors 
               transparent 
               opacity={0.8} 
               sizeAttenuation 
               blending={THREE.AdditiveBlending}
               depthWrite={false}
           />
       </points>

       {/* Add the surgical tech labels floating around the helix */}
       <DNALabels />
    </group>
  );
};

const DNALabels = () => {
   // These mimic the precise surgical labels in the mockup
   return (
      <group>
         <Label pos={[-5.5, 6, 0]} text="BRCA1" lineTo={[-3, 4, 0]} />
         <Label pos={[6.5, 7, 0]} text="0.887" lineTo={[3, 5, 0]} />
         <Label pos={[5, 3, 2]} text="A/T" lineTo={[2, 3, 1]} />
         <Label pos={[7, -2, -1]} text="0.507\n0.507" lineTo={[3.5, -1, -1]} />
         <Label pos={[-7, -4, 0]} text="BRCA1" lineTo={[-3, -3, 0]} />
         <Label pos={[2, -9, 2]} text="A/T" lineTo={[1, -6, 1]} />
         
         {/* Small matrix blocks */}
         <Label pos={[-8, 0, 0]} text="DNOI: -0.0543\nbase pairs" lineTo={[-4, 0, 0]} fontSize={10} />
         <Label pos={[8, -8, 0]} text="RAD51: 4.84323A\n8 EXT 8 DEG\nBRCA2 EX: SAT.." lineTo={[3.5, -6, 0]} fontSize={8} />
      </group>
   );
};

const Label = ({ pos, text, lineTo, fontSize = 14 }: { pos: [number,number,number], text: string, lineTo: [number,number,number], fontSize?: number }) => {
   return (
       <group>
           <Line 
               points={[pos, lineTo]} 
               color="#00E5FF" 
               lineWidth={1} 
               transparent 
               opacity={0.4} 
           />
           <Html position={pos} center distanceFactor={15} zIndexRange={[100, 0]}>
               <div 
                   style={{
                       color: '#E8E8F0',
                       fontFamily: '"JetBrains Mono", monospace',
                       fontSize: `${fontSize}px`,
                       whiteSpace: 'pre-wrap',
                       textAlign: 'center',
                       textShadow: '0 0 4px rgba(0,229,255,0.4)',
                       pointerEvents: 'none',
                       userSelect: 'none'
                   }}
               >
                   {text}
               </div>
           </Html>
       </group>
   );
};

export default function BackgroundDNAStruct() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-[#0A0A0F]">
       <Canvas camera={{ position: [0, 0, 20], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <DNAObject />
       </Canvas>
       {/* Vignette to ensure dark edges and enhance focus on the bottom panel */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0A0A0F_95%)] z-10" />
    </div>
  );
};
