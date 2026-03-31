'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Terminal, 
  Zap, 
  Fingerprint, 
  ChevronRight,
  Database,
  Cpu,
  ShieldCheck
} from 'lucide-react';

// --- Kill Chain Radar View ---
const KillChainRadar: React.FC<{ onAxisSelect: (axis: any) => void, activeAxis: any, isProbing: boolean }> = ({ onAxisSelect, activeAxis, isProbing }) => {
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);

  const axes = useMemo(() => [
    { label: 'EFFLUX', value: 0.4, desc: 'P-gp mediated drug extrusion capacity.' },
    { label: 'CELL CYCLE', value: 0.85, isAlert: true, desc: 'Unchecked proliferation via CDK4/6 bypass.' },
    { label: 'APOPTOSIS', value: 0.3, desc: 'Inhibition of programmed cell death signals.' },
    { label: 'GENOMIC INSTABILITY', value: 0.45, desc: 'Rate of chromothripsis and SV events.' },
    { label: 'DRUG INACTIVATION', value: 0.55, desc: 'Metabolic neutralization of therapeutic compounds.' },
    { label: 'REPLICATION STRESS', value: 0.7, desc: 'ATR/ATM pathway saturation levels.' },
    { label: 'STEMNESS', value: 0.35, desc: 'Transition to quiescent, resistant states.' },
    { label: 'METABOLIC SHIFT', value: 0.75, desc: 'Warburg effect optimization for survival.' },
  ], []);

  const size = 500;
  const center = size / 2;
  const radius = 180;

  const points = axes.map((axis, i) => {
    const angle = (i * Math.PI * 2) / axes.length - Math.PI / 2;
    const x = center + Math.cos(angle) * radius * axis.value;
    const y = center + Math.sin(angle) * radius * axis.value;
    return { x, y, ...axis };
  });

  const pathData = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} Z`;

  return (
    <div className="relative w-[500px] h-[500px] flex items-center justify-center cursor-default">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
        {/* Background Grids */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((r, i) => (
          <circle key={i} cx={center} cy={center} r={radius * r} fill="none" stroke="var(--border)" strokeWidth="1" opacity={0.3} />
        ))}

        {/* Axis Lines */}
        {axes.map((_, i) => {
          const angle = (i * Math.PI * 2) / axes.length - Math.PI / 2;
          return <line key={i} x1={center} y1={center} x2={center + Math.cos(angle) * radius} y2={center + Math.sin(angle) * radius} stroke="var(--border)" strokeWidth="1" opacity={0.3} />;
        })}

        {/* The Star Shape */}
        <motion.path
          d={pathData}
          fill="url(#targetGradient)"
          stroke={isProbing ? "#fff" : "url(#borderGradient)"}
          strokeWidth={isProbing ? "3" : "2"}
          animate={isProbing ? { scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] } : {}}
          transition={{ duration: 0.5, repeat: isProbing ? Infinity : 0 }}
          className="transition-colors duration-500"
          style={{ filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.4))' }}
        />

        {/* Interactive Nodes */}
        {points.map((p, i) => (
          <g key={i} className="group cursor-pointer" onClick={() => onAxisSelect(p)}>
            <circle
              cx={p.x}
              cy={p.y}
              r={activeAxis?.label === p.label ? "7" : "4"}
              fill={p.isAlert ? "#f43f5e" : "#22d3ee"}
              className="transition-all duration-300 group-hover:scale-150"
              onMouseEnter={() => setHoveredAxis(p.label)}
              onMouseLeave={() => setHoveredAxis(null)}
            />
            {p.isAlert && (
              <motion.circle
                cx={p.x} cy={p.y} r="8" stroke="#f43f5e" fill="none" strokeWidth="1"
                animate={{ scale: [1, 2.5], opacity: [1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            
            {/* Hover Tooltip Label */}
            {hoveredAxis === p.label && (
              <g transform={`translate(${p.x}, ${p.y - 15})`}>
                <rect x="-35" y="-12" width="70" height="15" fill="black" stroke="#22d3ee" strokeWidth="1" rx="2" />
                <text textAnchor="middle" fill="#fff" fontSize="7" fontFamily="monospace" fontWeight="black" y="-2">SELECT</text>
              </g>
            )}
          </g>
        ))}

        {/* Labels */}
        {axes.map((axis, i) => {
          const angle = (i * Math.PI * 2) / axes.length - Math.PI / 2;
          const x = center + Math.cos(angle) * (radius + 40);
          const y = center + Math.sin(angle) * (radius + 40);
          const isSelected = activeAxis?.label === axis.label;
          
          return (
            <text
              key={i} x={x} y={y}
              fill={isSelected ? "#22d3ee" : axis.label === hoveredAxis ? "var(--foreground)" : "#475569"}
              fontSize={isSelected ? "11" : "9"}
              fontFamily="monospace" fontWeight="black"
              textAnchor={x > center ? "start" : "end"}
              dominantBaseline="middle"
              className="uppercase tracking-[0.2em] transition-all duration-300"
            >
              {axis.label}
            </text>
          );
        })}

        <defs>
          <linearGradient id="targetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export const KillChainEngine: React.FC = () => {
  const [activeAxis, setActiveAxis] = useState<any>(null);
  const [logs, setLogs] = useState<string[]>(["SYSTEM_READY", "NODE_SYNC: NOMINAL", "ENGINE_03: STANDBY"]);
  const [isProbing, setIsProbing] = useState(false);

  const addLog = (msg: string) => {
    setLogs(prev => [msg, ...prev].slice(0, 10));
  };

  const initiateProbe = () => {
    if (isProbing) return;
    setIsProbing(true);
    addLog("PROBE_INITIATED: SCANNING_MATRIX");
    
    setTimeout(() => {
      addLog("CTDNA_SENSITIVITY: 0.887");
      addLog("RELAPSE_TIMELINE: 4-6_MONTHS");
      addLog("VERDICT: CRITICAL_RESISTANCE");
      setIsProbing(false);
    }, 2500);
  };

  const handleSelect = (axis: any) => {
    setActiveAxis(axis);
    addLog(`AXIS_SELECTED: ${axis.label}`);
  };

  return (
    <div className="flex-1 flex flex-col font-mono p-8 relative overflow-hidden h-full">
      
      {/* Top Header Controls */}
      <div className="z-20 flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded bg-[var(--muted)] flex items-center justify-center border transition-colors ${isProbing ? 'border-rose-500' : 'border-[var(--border)]'}`}>
            <Cpu className={`w-5 h-5 ${isProbing ? 'text-rose-500 animate-pulse' : 'text-cyan-500'}`} />
          </div>
          <div>
            <h2 className="text-[14px] font-black text-[var(--foreground)] uppercase tracking-[0.4em]">Engine 03 // Kill Chain</h2>
            <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest mt-1">Resistance Detection_v6.2</p>
          </div>
        </div>
        
        <button 
          onClick={initiateProbe}
          disabled={isProbing}
          className={`px-8 py-3 rounded border text-[9px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 ${
            isProbing 
            ? 'bg-rose-500/20 border-rose-500 text-rose-500 cursor-wait' 
            : 'bg-white text-black hover:bg-cyan-500 hover:text-white border-transparent shadow-[0_0_20px_rgba(255,255,255,0.1)]'
          }`}
        >
          {isProbing ? <Activity className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
          {isProbing ? 'Calculating...' : 'Initiate Probe'}
        </button>
      </div>

      {/* Main Radar and Terminal Layout */}
      <div className="z-10 flex flex-1 items-center justify-center gap-12 min-h-0">
        <div className="flex-1 flex items-center justify-center min-w-0">
           <KillChainRadar onAxisSelect={handleSelect} activeAxis={activeAxis} isProbing={isProbing} />
        </div>

        {/* Interaction Side Panel */}
        <div className="w-80 h-full flex flex-col justify-between py-10">
           <AnimatePresence mode="wait">
              {activeAxis ? (
                <motion.div 
                  key={activeAxis.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2 border-l-2 border-cyan-500 pl-6 py-2">
                     <h3 className="text-2xl font-black text-[var(--foreground)] uppercase tracking-tighter">{activeAxis.label}</h3>
                     <p className="text-[11px] text-zinc-500 leading-relaxed uppercase font-bold">{activeAxis.desc}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-[var(--muted)] border border-[var(--border)] rounded shadow-sm">
                        <span className="text-[9px] font-black text-zinc-600 uppercase block mb-1">Impact Score</span>
                        <span className={`text-2xl font-light ${activeAxis.isAlert ? 'text-rose-500' : 'text-cyan-400'}`}>
                          {activeAxis.value.toFixed(3)}
                        </span>
                     </div>
                     <div className="p-4 bg-[var(--muted)] border border-[var(--border)] rounded shadow-sm">
                        <span className="text-[9px] font-black text-zinc-600 uppercase block mb-1">Confidence</span>
                        <span className="text-2xl font-light text-[var(--foreground)]/80">0.992</span>
                     </div>
                  </div>

                  <div className="space-y-4">
                     <div className="flex justify-between items-center text-[10px] font-black text-zinc-500 uppercase">
                        <span>Calibration_Delta</span>
                        <span className="text-cyan-900">0.042 ECE</span>
                     </div>
                     <div className="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }} animate={{ width: `${activeAxis.value * 100}%` }}
                          className={`h-full ${activeAxis.isAlert ? 'bg-rose-500' : 'bg-cyan-500'}`}
                        />
                     </div>
                  </div>
                </motion.div>
              ) : (
                <div className="space-y-4 opacity-30">
                   <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">Select an axis to isolate resistance mechanics.</p>
                   <div className="h-px w-full bg-zinc-900" />
                </div>
              )}
           </AnimatePresence>

           {/* Terminal Scroll */}
           <div className="mt-auto space-y-4 opacity-60">
              <div className="flex items-center gap-2 text-zinc-700">
                 <Terminal className="w-3 h-3" />
                 <span className="text-[9px] uppercase tracking-widest">Diagnostic_Feed</span>
              </div>
              <div className="space-y-2 max-h-32 overflow-hidden mask-fade-top font-mono text-[9px] uppercase tracking-widest">
                {logs.map((log, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-4">
                    <span className="text-zinc-800">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                    <span className={log.includes('CRITICAL') || log.includes('RED') ? 'text-rose-500 font-bold' : 'text-cyan-700'}>{log}</span>
                  </motion.div>
                ))}
              </div>
           </div>
        </div>
      </div>

      {/* Static Info Block (Bottom Right) */}
      <div className="absolute bottom-8 right-8 z-20 text-right space-y-4">
        <div className="space-y-1">
           <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block">ctDNA Markers:</span>
           <span className="text-xs font-black text-rose-500 uppercase tracking-widest flex items-center justify-end gap-2">
             <Fingerprint className="w-4 h-4" />
             Emergent Subclones Detected
           </span>
        </div>
      </div>

      {/* System Footer Overlay */}
      <div className="absolute bottom-6 left-12 right-12 flex justify-between items-end opacity-20 pointer-events-none">
        <div className="flex items-center gap-8">
           <Activity className="w-4 h-4" />
           <Database className="w-4 h-4" />
           <Cpu className="w-4 h-4" />
           <ShieldCheck className="w-4 h-4 text-cyan-500" />
        </div>
        <span className="text-[9px] font-black text-zinc-800 uppercase tracking-widest">Model: Mars_v6.2 // CALIBRATION: 3,720 Patients</span>
      </div>
    </div>
  );
};
