'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ProteinFoldingVisualizerProps {
  className?: string;
  aminoAcidSequence?: string;
  foldingStages?: number;
  autoAnimate?: boolean;
  animationDuration?: number;
  colorScheme?: 'hydrophobicity' | 'charge' | 'structure' | 'rainbow';
}

// Amino acid properties mapping
const aminoAcidProperties = {
  'A': { name: 'Alanine', hydrophobicity: 0.7, charge: 0, color: '#77dd77', structurePreference: 'helix' },
  'R': { name: 'Arginine', hydrophobicity: -0.8, charge: 1, color: '#ff6961', structurePreference: 'helix' },
  'N': { name: 'Asparagine', hydrophobicity: -0.5, charge: 0, color: '#fdfd96', structurePreference: 'coil' },
  'D': { name: 'Aspartic Acid', hydrophobicity: -0.7, charge: -1, color: '#ff6961', structurePreference: 'coil' },
  'C': { name: 'Cysteine', hydrophobicity: 0.5, charge: 0, color: '#fdfd96', structurePreference: 'sheet' },
  'E': { name: 'Glutamic Acid', hydrophobicity: -0.7, charge: -1, color: '#ff6961', structurePreference: 'helix' },
  'Q': { name: 'Glutamine', hydrophobicity: -0.5, charge: 0, color: '#fdfd96', structurePreference: 'helix' },
  'G': { name: 'Glycine', hydrophobicity: 0.2, charge: 0, color: '#fdfd96', structurePreference: 'coil' },
  'H': { name: 'Histidine', hydrophobicity: -0.1, charge: 0.5, color: '#fdfd96', structurePreference: 'helix' },
  'I': { name: 'Isoleucine', hydrophobicity: 0.9, charge: 0, color: '#77dd77', structurePreference: 'sheet' },
  'L': { name: 'Leucine', hydrophobicity: 0.9, charge: 0, color: '#77dd77', structurePreference: 'helix' },
  'K': { name: 'Lysine', hydrophobicity: -0.6, charge: 1, color: '#ff6961', structurePreference: 'helix' },
  'M': { name: 'Methionine', hydrophobicity: 0.7, charge: 0, color: '#77dd77', structurePreference: 'helix' },
  'F': { name: 'Phenylalanine', hydrophobicity: 0.8, charge: 0, color: '#77dd77', structurePreference: 'sheet' },
  'P': { name: 'Proline', hydrophobicity: 0.3, charge: 0, color: '#fdfd96', structurePreference: 'coil' },
  'S': { name: 'Serine', hydrophobicity: -0.1, charge: 0, color: '#fdfd96', structurePreference: 'coil' },
  'T': { name: 'Threonine', hydrophobicity: -0.2, charge: 0, color: '#fdfd96', structurePreference: 'sheet' },
  'W': { name: 'Tryptophan', hydrophobicity: 0.3, charge: 0, color: '#77dd77', structurePreference: 'sheet' },
  'Y': { name: 'Tyrosine', hydrophobicity: 0.4, charge: 0, color: '#fdfd96', structurePreference: 'sheet' },
  'V': { name: 'Valine', hydrophobicity: 0.8, charge: 0, color: '#77dd77', structurePreference: 'sheet' },
};

// Define a type for the amino acid codes based on the keys of aminoAcidProperties
type AminoAcidCode = keyof typeof aminoAcidProperties;

// Structure colors
const structureColors = {
  helix: '#ff6961', // Red
  sheet: '#5d8aa8', // Blue
  coil: '#fdfd96', // Yellow
};

// Define a type for structure preference based on the keys of structureColors
type StructurePreferenceType = keyof typeof structureColors;

// Default sample protein sequence (partial sequence from Cas9)
const DEFAULT_SEQUENCE = 'MSKGEELFTGVVPILVELDGDVNGHKFSVSGEGEGDATYGKLTLKFICTTGKLPVPWPTLVTTLTYGVQCFSRYPDHMKQHDFFKSAMPEGYVQERTIFFKDDGNYKTRAEVKFEGDTLVNRIELKGIDFKEDGNILGHKLEYNYNSHNVYIMADKQKNGIKVNFKIRHNIEDGSVQLADHYQQNTPIGDGPVLLPDNHYLSTQSALSKDPNEKRDHMVLLEFVTAAGITLGMDELYK';

export default function ProteinFoldingVisualizer({
  className = '',
  aminoAcidSequence = DEFAULT_SEQUENCE,
  foldingStages = 4,
  autoAnimate = true,
  animationDuration = 15000,
  colorScheme = 'hydrophobicity'
}: ProteinFoldingVisualizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [hoveredAminoAcid, setHoveredAminoAcid] = useState<AminoAcidCode | null>(null);
  
  // Color functions based on selected scheme
  const getAminoAcidColor = (aa: AminoAcidCode) => {
    if (!aminoAcidProperties[aa]) return '#ffffff';
    
    switch (colorScheme) {
      case 'hydrophobicity':
        // Red for hydrophobic, blue for hydrophilic
        const h = aminoAcidProperties[aa].hydrophobicity;
        return h > 0.5 ? '#ff6961' : h > 0 ? '#fdfd96' : '#60a5fa';
      
      case 'charge':
        // Red for positive, blue for negative, yellow for neutral
        const c = aminoAcidProperties[aa].charge;
        return c > 0 ? '#ff6961' : c < 0 ? '#60a5fa' : '#fdfd96';
        
      case 'structure':
        // Color based on secondary structure preference
        const preference = aminoAcidProperties[aa].structurePreference as StructurePreferenceType;
        return structureColors[preference];
        
      case 'rainbow':
        // Generate rainbow colors based on position in sequence
        const index = aminoAcidSequence.indexOf(aa);
        const hue = (index / aminoAcidSequence.length) * 360;
        return `hsl(${hue}, 80%, 70%)`;
        
      default:
        return aminoAcidProperties[aa].color;
    }
  };
  
  // Auto rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 0.2,
        y: prev.y + 0.5,
        z: 0
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  // Folding animation
  useEffect(() => {
    if (!autoAnimate) return;
    
    const interval = setInterval(() => {
      setCurrentStage(prev => (prev + 1) % (foldingStages + 1));
    }, animationDuration / foldingStages);
    
    return () => clearInterval(interval);
  }, [autoAnimate, foldingStages, animationDuration]);
  
  // Generate amino acid points in 3D space based on folding stage
  const generateAminoAcidPositions = () => {
    const sequence = aminoAcidSequence.slice(0, 100); // Limit to first 100 amino acids for performance
    const totalAminoAcids = sequence.length;
    
    // Different folding patterns for each stage
    return sequence.split('').map((aaChar, index) => {
      const aa = aaChar as AminoAcidCode; // Assert aaChar to be of type AminoAcidCode
      const progress = currentStage / foldingStages;
      const angle = (index / totalAminoAcids) * Math.PI * 2;
      
      // Stage 0: Linear chain
      if (currentStage === 0) {
        return {
          aa,
          x: (index - totalAminoAcids / 2) * 15,
          y: 0,
          z: 0,
          opacity: 1
        };
      }
      
      // Stage 1-2: Alpha helix formation
      else if (currentStage <= 2) {
        const helixRadius = 40;
        const helixPitch = 10;
        const helixTurns = totalAminoAcids / 3.6;
        
        const angleAroundHelix = (index / 3.6) * Math.PI * 2 * progress;
        const heightAlongHelix = (index / totalAminoAcids - 0.5) * helixPitch * totalAminoAcids;
        
        return {
          aa,
          x: helixRadius * Math.cos(angleAroundHelix),
          y: heightAlongHelix,
          z: helixRadius * Math.sin(angleAroundHelix),
          opacity: 1
        };
      }
      
      // Stage 3-4: Folding into globular structure
      else {
        const isHydrophobic = aminoAcidProperties[aa]?.hydrophobicity > 0.3;
        const structureFactor = progress - 0.5;
        
        // Hydrophobic amino acids move inward, hydrophilic move outward
        const radius = isHydrophobic 
          ? 50 - (progress * 25) 
          : 40 + (progress * 30);
          
        // Generate a pseudo-random but consistent position based on the amino acid
        const aaCode = aa.charCodeAt(0);
        const pseudoRandom = Math.sin(aaCode * index) * 0.5 + 0.5;
        
        const phi = angle;
        const theta = pseudoRandom * Math.PI;
        
        return {
          aa,
          x: radius * Math.sin(theta) * Math.cos(phi),
          y: radius * Math.sin(theta) * Math.sin(phi),
          z: radius * Math.cos(theta),
          opacity: 1
        };
      }
    });
  };
  
  const aminoAcidPositions = generateAminoAcidPositions();
  
  // Group amino acids by secondary structure for rendering
  const groupedByStructure = {
    helix: aminoAcidPositions.filter((_, i) => i % 4 === 0),
    sheet: aminoAcidPositions.filter((_, i) => i % 4 === 1 || i % 4 === 2),
    coil: aminoAcidPositions.filter((_, i) => i % 4 === 3),
  };
  
  // Function to calculate bonds between amino acids
  const calculateBonds = () => {
    const bonds = [];
    
    // Peptide bonds (connecting adjacent amino acids)
    for (let i = 0; i < aminoAcidPositions.length - 1; i++) {
      bonds.push({
        from: aminoAcidPositions[i],
        to: aminoAcidPositions[i + 1],
        color: '#ffffff',
        type: 'peptide'
      });
    }
    
    // Add hydrogen bonds for alpha helices (every 4 residues)
    if (currentStage >= 2) {
      for (let i = 0; i < aminoAcidPositions.length - 4; i++) {
        if (
          aminoAcidProperties[aminoAcidPositions[i].aa as AminoAcidCode]?.structurePreference === 'helix' &&
          aminoAcidProperties[aminoAcidPositions[i + 4].aa as AminoAcidCode]?.structurePreference === 'helix'
        ) {
          bonds.push({
            from: aminoAcidPositions[i],
            to: aminoAcidPositions[i + 4],
            color: '#6ee7b7', // Teal for hydrogen bonds
            type: 'hydrogen',
            opacity: 0.3
          });
        }
      }
    }
    
    // Add disulfide bonds between cysteines if close in 3D space but not in sequence
    if (currentStage >= 3) {
      const cysteines = aminoAcidPositions.filter(pos => pos.aa === 'C');
      
      for (let i = 0; i < cysteines.length; i++) {
        for (let j = i + 1; j < cysteines.length; j++) {
          const cys1 = cysteines[i];
          const cys2 = cysteines[j];
          
          // Only form bonds between cysteines that are far apart in sequence
          if (Math.abs(aminoAcidPositions.indexOf(cys1) - aminoAcidPositions.indexOf(cys2)) > 8) {
            // Calculate 3D distance
            const dx = cys1.x - cys2.x;
            const dy = cys1.y - cys2.y;
            const dz = cys1.z - cys2.z;
            const distance = Math.sqrt(dx*dx + dy*dy + dz*dz);
            
            // If cysteines are close in 3D space, add a disulfide bond
            if (distance < 50) {
              bonds.push({
                from: cys1,
                to: cys2,
                color: '#fbbf24', // Yellow for disulfide bonds
                type: 'disulfide',
                opacity: 0.7
              });
            }
          }
        }
      }
    }
    
    return bonds;
  };
  
  const bonds = calculateBonds();
  
  // Function to calculate z-index for proper rendering order
  const calculateZIndex = (z: number) => {
    return Math.round(1000 - z);
  };
  
  // Stage descriptions for the overlay
  const stageDescriptions = [
    "Primary Structure: Linear Amino Acid Chain",
    "Secondary Structure: Alpha Helix Formation",
    "Secondary Structure: Beta Sheets and Turns",
    "Tertiary Structure: Hydrophobic Collapse",
    "Complete 3D Protein Structure"
  ];
  
  return (
    <div 
      className={`relative w-full h-full overflow-hidden ${className}`}
      ref={containerRef}
    >
      {/* 3D Visualization Container */}
      <div 
        className="absolute inset-0 perspective-1000"
        style={{ 
          perspective: '1200px',
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div 
          className="absolute w-full h-full"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`
          }}
        >
          {/* Render bonds first (below amino acids) */}
          {bonds.map((bond, index) => (
            <div 
              key={`bond-${index}`}
              className="absolute left-1/2 top-1/2 w-1 bg-white/50"
              style={{
                opacity: bond.opacity || 0.5,
                backgroundColor: bond.color,
                height: `${Math.hypot(
                  bond.to.x - bond.from.x,
                  bond.to.y - bond.from.y,
                  bond.to.z - bond.from.z
                )}px`,
                transform: `translate(-50%, -50%) translate3d(
                  ${(bond.from.x + bond.to.x) / 2}px, 
                  ${(bond.from.y + bond.to.y) / 2}px, 
                  ${(bond.from.z + bond.to.z) / 2}px
                ) rotateZ(${Math.atan2(
                  bond.to.y - bond.from.y, 
                  bond.to.x - bond.from.x
                ) * (180 / Math.PI)}deg) rotateX(${Math.atan2(
                  bond.to.z - bond.from.z,
                  Math.hypot(bond.to.x - bond.from.x, bond.to.y - bond.from.y)
                ) * (180 / Math.PI)}deg)`,
                transformOrigin: 'center',
                zIndex: calculateZIndex((bond.from.z + bond.to.z) / 2)
              }}
            />
          ))}
          
          {/* Render amino acids */}
          {aminoAcidPositions.map((position, index) => (
            <motion.div
              key={`aa-${index}`}
              className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full cursor-pointer"
              style={{
                width: 24,
                height: 24,
                backgroundColor: getAminoAcidColor(position.aa),
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold',
                opacity: position.opacity,
                transform: `translate(-50%, -50%) translate3d(${position.x}px, ${position.y}px, ${position.z}px)`,
                boxShadow: `0 0 10px ${getAminoAcidColor(position.aa)}`,
                zIndex: calculateZIndex(position.z)
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.01 }}
              onMouseEnter={() => setHoveredAminoAcid(position.aa)}
              onMouseLeave={() => setHoveredAminoAcid(null)}
            >
              {position.aa}
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Information Overlay */}
      <div className="absolute bottom-2 left-2 right-2 text-white text-sm">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2">
          <div className="font-semibold">{stageDescriptions[currentStage]}</div>
          <div className="flex justify-between text-xs mt-1">
            <div>Amino acids: {aminoAcidSequence.length}</div>
            <div>Stage: {currentStage + 1}/{foldingStages + 1}</div>
          </div>
        </div>
      </div>
      
      {/* Amino acid info popup */}
      {hoveredAminoAcid && aminoAcidProperties[hoveredAminoAcid] && (
        <div className="absolute bottom-20 left-2 bg-black/60 backdrop-blur-sm text-white p-2 rounded-lg text-xs">
          <div className="font-semibold">{aminoAcidProperties[hoveredAminoAcid].name} ({hoveredAminoAcid})</div>
          <div>Hydrophobicity: {aminoAcidProperties[hoveredAminoAcid].hydrophobicity.toFixed(1)}</div>
          <div>Charge: {aminoAcidProperties[hoveredAminoAcid].charge}</div>
          <div>Structure: {aminoAcidProperties[hoveredAminoAcid].structurePreference}</div>
        </div>
      )}
      
      {/* Color scheme legend */}
      <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-sm rounded-lg p-2 text-white text-xs">
        <div className="font-semibold mb-1">Color: {colorScheme}</div>
        {colorScheme === 'hydrophobicity' && (
          <div className="flex gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
              <span>Hydrophobic</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
              <span>Hydrophilic</span>
            </div>
          </div>
        )}
        {colorScheme === 'structure' && (
          <div className="flex gap-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
              <span>α-Helix</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-800 mr-1"></div>
              <span>β-Sheet</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
              <span>Loop</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 