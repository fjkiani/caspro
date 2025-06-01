'use client';

import React from 'react';

// Type definitions for various color schemes
export interface NucleotideColors {
  A: string;
  T: string;
  G: string;
  C: string;
  U?: string; // For RNA
  N?: string; // For unknown bases
}

export interface AminoAcidColors {
  [key: string]: string; // One-letter amino acid codes as keys
}

export interface StructureColors {
  helix: string;
  sheet: string;
  coil: string;
  turn?: string;
}

export interface HydrophobicityColors {
  hydrophobic: string;
  neutral: string;
  hydrophilic: string;
}

export interface ChargeColors {
  positive: string;
  negative: string;
  neutral: string;
}

export interface RiskColors {
  high: string;
  medium: string;
  low: string;
  none: string;
}

export interface ConfidenceColors {
  high: string;
  medium: string;
  low: string;
}

export interface ScoreColors {
  excellent: string;
  good: string;
  fair: string;
  poor: string;
}

// Default color schemes
export const DefaultNucleotideColors: NucleotideColors = {
  A: '#f87171', // Red
  T: '#60a5fa', // Blue
  G: '#fbbf24', // Yellow
  C: '#34d399', // Green
  U: '#c084fc', // Purple (for RNA)
  N: '#94a3b8', // Gray (for unknown)
};

export const DefaultAminoAcidColors: AminoAcidColors = {
  // Hydrophobic
  'A': '#ff6961', // Alanine - Red
  'V': '#ff6961', // Valine - Red
  'L': '#ff6961', // Leucine - Red
  'I': '#ff6961', // Isoleucine - Red
  'M': '#ff6961', // Methionine - Red
  'F': '#ff6961', // Phenylalanine - Red
  'W': '#ff6961', // Tryptophan - Red
  'P': '#ff6961', // Proline - Red
  
  // Neutral
  'G': '#fdfd96', // Glycine - Yellow
  'S': '#fdfd96', // Serine - Yellow
  'T': '#fdfd96', // Threonine - Yellow
  'C': '#fdfd96', // Cysteine - Yellow
  'Y': '#fdfd96', // Tyrosine - Yellow
  'N': '#fdfd96', // Asparagine - Yellow
  'Q': '#fdfd96', // Glutamine - Yellow
  
  // Hydrophilic
  'D': '#60a5fa', // Aspartic acid - Blue
  'E': '#60a5fa', // Glutamic acid - Blue
  'K': '#60a5fa', // Lysine - Blue
  'R': '#60a5fa', // Arginine - Blue
  'H': '#60a5fa', // Histidine - Blue
};

export const DefaultStructureColors: StructureColors = {
  helix: '#ff6961', // Red
  sheet: '#5d8aa8', // Blue
  coil: '#fdfd96', // Yellow
  turn: '#c084fc', // Purple
};

export const DefaultHydrophobicityColors: HydrophobicityColors = {
  hydrophobic: '#ff6961', // Red
  neutral: '#fdfd96', // Yellow
  hydrophilic: '#60a5fa', // Blue
};

export const DefaultChargeColors: ChargeColors = {
  positive: '#ff6961', // Red
  negative: '#60a5fa', // Blue
  neutral: '#fdfd96', // Yellow
};

export const DefaultRiskColors: RiskColors = {
  high: '#ef4444', // Red
  medium: '#f97316', // Orange
  low: '#facc15', // Yellow
  none: '#22c55e', // Green
};

export const DefaultConfidenceColors: ConfidenceColors = {
  high: '#22c55e', // Green
  medium: '#facc15', // Yellow
  low: '#ef4444', // Red
};

export const DefaultScoreColors: ScoreColors = {
  excellent: '#22c55e', // Green
  good: '#a3e635', // Light green
  fair: '#facc15', // Yellow
  poor: '#ef4444', // Red
};

// Color utility functions
export function getColorForNucleotide(
  nucleotide: string, 
  colors: NucleotideColors = DefaultNucleotideColors
): string {
  const base = nucleotide.toUpperCase();
  return colors[base as keyof NucleotideColors] || colors.N || '#94a3b8';
}

export function getColorForAminoAcid(
  aminoAcid: string,
  colors: AminoAcidColors = DefaultAminoAcidColors
): string {
  const aa = aminoAcid.toUpperCase();
  return colors[aa] || '#94a3b8';
}

export function getColorForStructure(
  structure: string,
  colors: StructureColors = DefaultStructureColors
): string {
  const struct = structure.toLowerCase();
  return colors[struct as keyof StructureColors] || colors.coil;
}

export function getColorForHydrophobicity(
  value: number,
  colors: HydrophobicityColors = DefaultHydrophobicityColors
): string {
  if (value > 0.4) return colors.hydrophobic;
  if (value > -0.4) return colors.neutral;
  return colors.hydrophilic;
}

export function getColorForCharge(
  value: number,
  colors: ChargeColors = DefaultChargeColors
): string {
  if (value > 0) return colors.positive;
  if (value < 0) return colors.negative;
  return colors.neutral;
}

export function getColorForRisk(
  value: number,
  colors: RiskColors = DefaultRiskColors
): string {
  if (value >= 0.7) return colors.high;
  if (value >= 0.4) return colors.medium;
  if (value > 0) return colors.low;
  return colors.none;
}

export function getColorForConfidence(
  value: number,
  colors: ConfidenceColors = DefaultConfidenceColors
): string {
  if (value >= 0.7) return colors.high;
  if (value >= 0.4) return colors.medium;
  return colors.low;
}

export function getColorForScore(
  value: number,
  colors: ScoreColors = DefaultScoreColors
): string {
  if (value >= 0.9) return colors.excellent;
  if (value >= 0.7) return colors.good;
  if (value >= 0.5) return colors.fair;
  return colors.poor;
}

// Generate a continuous color scale between two colors
export function getColorInRange(value: number, min: number, max: number, startColor: string, endColor: string): string {
  // Ensure value is within range
  const clampedValue = Math.max(min, Math.min(max, value));
  // Calculate percentage
  const percentage = (clampedValue - min) / (max - min);
  
  // Convert hex to RGB
  const startRGB = hexToRgb(startColor);
  const endRGB = hexToRgb(endColor);
  
  if (!startRGB || !endRGB) return startColor;
  
  // Interpolate between colors
  const r = Math.round(startRGB.r + percentage * (endRGB.r - startRGB.r));
  const g = Math.round(startRGB.g + percentage * (endRGB.g - startRGB.g));
  const b = Math.round(startRGB.b + percentage * (endRGB.b - startRGB.b));
  
  return `rgb(${r}, ${g}, ${b})`;
}

// Generate a color from a gradient based on value (0-1)
export function getColorFromGradient(value: number, colorStops: [number, string][] = [[0, '#22c55e'], [0.5, '#facc15'], [1, '#ef4444']]): string {
  // Clamp value between 0 and 1
  const clampedValue = Math.max(0, Math.min(1, value));
  
  // Find the two color stops that the value falls between
  let lowerStop: [number, string] = [0, colorStops[0][1]];
  let upperStop: [number, string] = [1, colorStops[colorStops.length - 1][1]];
  
  for (let i = 0; i < colorStops.length - 1; i++) {
    if (clampedValue >= colorStops[i][0] && clampedValue <= colorStops[i + 1][0]) {
      lowerStop = colorStops[i];
      upperStop = colorStops[i + 1];
      break;
    }
  }
  
  // Calculate the percentage between the two stops
  const range = upperStop[0] - lowerStop[0];
  const normalizedValue = range === 0 ? 0 : (clampedValue - lowerStop[0]) / range;
  
  // Return the interpolated color
  return getColorInRange(normalizedValue, 0, 1, lowerStop[1], upperStop[1]);
}

// Get a relationship color based on node/edge type and weight
export function getRelationshipColor(type: string, weight: number = 0.5): string {
  const baseColor = type === 'gene' ? '#60a5fa' : 
                    type === 'variant' ? '#f87171' : 
                    type === 'outcome' ? '#34d399' : 
                    type === 'therapy' ? '#a78bfa' : 
                    type === 'publication' ? '#fbbf24' :
                    type === 'causes' ? '#f87171' :
                    type === 'treats' ? '#34d399' :
                    type === 'associates' ? '#60a5fa' :
                    type === 'reports' ? '#fbbf24' :
                    type === 'includes' ? '#a78bfa' :
                    '#94a3b8';
  
  // Adjust saturation and brightness based on weight
  const rgb = hexToRgb(baseColor);
  if (!rgb) return baseColor;
  
  const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
  
  // Higher weight = more saturated and brighter
  hsv.s = Math.min(1, hsv.s * (0.5 + weight * 0.5));
  hsv.v = Math.min(1, hsv.v * (0.7 + weight * 0.3));
  
  const newRgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
  return `rgb(${newRgb.r}, ${newRgb.g}, ${newRgb.b})`;
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): { r: number, g: number, b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Helper function to convert RGB to HSV
function rgbToHsv(r: number, g: number, b: number): { h: number, s: number, v: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;
  
  if (max === min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  return { h, s, v };
}

// Helper function to convert HSV to RGB
function hsvToRgb(h: number, s: number, v: number): { r: number, g: number, b: number } {
  let r = 0, g = 0, b = 0;
  
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Component for displaying a color legend
interface ColorLegendProps {
  title?: string;
  items: Array<{
    color: string;
    label: string;
  }>;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function ColorLegend({
  title,
  items,
  orientation = 'horizontal',
  className = '',
}: ColorLegendProps) {
  return (
    <div className={`color-legend ${className}`}>
      {title && <div className="text-xs font-semibold mb-1">{title}</div>}
      <div className={`flex ${orientation === 'vertical' ? 'flex-col gap-1' : 'flex-row gap-2'}`}>
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default {
  nucleotide: DefaultNucleotideColors,
  aminoAcid: DefaultAminoAcidColors,
  structure: DefaultStructureColors,
  hydrophobicity: DefaultHydrophobicityColors,
  charge: DefaultChargeColors,
  risk: DefaultRiskColors,
  confidence: DefaultConfidenceColors,
  score: DefaultScoreColors,
  getColorForNucleotide,
  getColorForAminoAcid,
  getColorForStructure,
  getColorForHydrophobicity,
  getColorForCharge,
  getColorForRisk,
  getColorForConfidence,
  getColorForScore,
  getColorInRange,
  getColorFromGradient,
  getRelationshipColor,
}; 