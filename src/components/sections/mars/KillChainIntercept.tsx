'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ReferenceLine,
  ComposedChart,
} from 'recharts';
import { 
  Target, 
  Activity, 
  Database, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  ShieldAlert,
  Crosshair,
  Timer,
  RefreshCw,
  Terminal
} from 'lucide-react';

// --- Technical Background (Canvas Points) ---
const TemporalBackground = ({ isIntercepting = false }: { isIntercepting?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const points = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = isIntercepting ? 'rgba(16, 185, 129, 0.12)' : 'rgba(6, 182, 212, 0.12)';
      points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
      });
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current!);
      window.removeEventListener('resize', resize);
    };
  }, [isIntercepting]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none w-full h-full" />;
};

// --- Dynamic Data from Kill Chain Data Layer ---
const TRAJECTORY_DATA = [
  { day: 0, ctdna: 0.02, ca125: 85 },
  { day: 30, ctdna: 0.012, ca125: 42 },
  { day: 60, ctdna: 0.008, ca125: 18 },
  { day: 90, ctdna: 0.015, ca125: 12 },
  { day: 120, ctdna: 0.065, ca125: 14 },
  { day: 150, ctdna: 0.22, ca125: 19 },
  { day: 180, ctdna: 0.48, ca125: 45 },
  { day: 210, ctdna: 0.72, ca125: 110 },
  { day: 240, ctdna: 0.94, ca125: 280 },
];

const INTERCEPTED_CURVE = [
  { day: 120, val: 0.065 },
  { day: 150, val: 0.045 },
  { day: 180, val: 0.025 },
  { day: 210, val: 0.012 },
  { day: 240, val: 0.005 },
];

const SIGNATURES = [
  { axis: 'CCNE1', value: 92, status: 'Active' },
  { axis: 'RAD51', value: 85, status: 'Rising' },
  { axis: 'AKT1', value: 40, status: 'Stable' },
  { axis: 'BRCA-R', value: 78, status: 'Critical' },
  { axis: 'P-gp', value: 65, status: 'Moderate' },
  { axis: 'EMT', value: 30, status: 'Low' },
];

export default function KillChainIntercept() {
  const [intercepted, setIntercepted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState(["MONITORING_ACTIVE", "CHANNELS: ctDNA + KILEM_CA125"]);

  const runIntercept = () => {
    setIsProcessing(true);
    setLogs(prev => ["[SYSTEM] EXECUTING THERAPEUTIC INTERCEPT...", ...prev]);
    setTimeout(() => {
      setIntercepted(true);
      setIsProcessing(false);
      setLogs(prev => ["[VERDICT] INTERCEPTION SUCCESSFUL: DRIVER_SUPPRESSION_NOMINAL", ...prev]);
    }, 2000);
  };

  const resetSim = () => {
    setIntercepted(false);
    setLogs(["SYSTEM_RESET", "READY_FOR_NEW_SIMULATION"]);
  };

  return (
    <div className="flex-1 text-[var(--foreground-muted,#a1a1aa)] font-mono flex flex-col relative selection:bg-cyan-500/30 overflow-hidden">
      <TemporalBackground isIntercepting={intercepted} />

      {/* Top Header / Status */}
      <header className="z-10 mb-6 flex justify-between items-center border-b border-[var(--border)] pb-6">
        <div className="flex items-center gap-5">
           <div className={`w-12 h-12 rounded border flex items-center justify-center transition-all duration-1000 ${intercepted ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_#10b981]' : 'bg-rose-500/10 border-rose-500 shadow-[0_0_20px_#f43f5e]'}`}>
              {intercepted ? <ShieldCheck className="w-6 h-6 text-emerald-500" /> : <ShieldAlert className="w-6 h-6 text-rose-500" />}
           </div>
           <div>
              <h2 className="text-[13px] font-black text-[var(--foreground)] uppercase tracking-[0.5em]">Engine 03 // The Intercept</h2>
              <div className="flex gap-4 mt-1 items-center">
                 <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Protocol: NeoPembrOV_Phase3</span>
                 <div className="h-3 w-px bg-zinc-800" />
                 <span className={`text-[10px] font-black uppercase ${intercepted ? 'text-emerald-500' : 'text-rose-500'}`}>
                    Status: {intercepted ? 'LOCKED_BY_INTERCEPT' : 'ESCALATION_WINDOW_OPEN'}
                 </span>
              </div>
           </div>
        </div>

        <div className="flex gap-3">
           {intercepted && (
             <button onClick={resetSim} className="p-2.5 border border-[var(--border)] rounded bg-[var(--muted)] hover:bg-zinc-800 text-zinc-600 transition-all">
                <RefreshCw className="w-4 h-4" />
             </button>
           )}
           <button 
             onClick={runIntercept}
             disabled={isProcessing || intercepted}
             className={`px-8 py-3 rounded border text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center gap-3 ${
               isProcessing ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 animate-pulse' :
               intercepted ? 'bg-[var(--muted)] border-[var(--border)] text-zinc-600' :
               'bg-white text-black hover:bg-rose-500 hover:text-white border-transparent shadow-[0_0_30px_rgba(255,255,255,0.05)]'
             }`}
           >
             {isProcessing ? <Activity className="w-4 h-4 animate-spin" /> : <Crosshair className="w-4 h-4" />}
             {isProcessing ? 'Simulating...' : intercepted ? 'Intercept Confirmed' : 'Execute Interception'}
           </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="z-10 flex-1 grid grid-cols-12 gap-6 min-h-0">
        
        {/* Left: Dual-Modality Trajectory Chart */}
        <div className="col-span-8 flex flex-col bg-black/30 border border-[var(--border)] rounded-sm p-6 shadow-2xl relative">
           <div className="flex justify-between items-center mb-6 pb-4 border-b border-[var(--border)]">
              <div className="flex flex-col">
                 <span className="text-[11px] font-black text-[var(--foreground)] uppercase tracking-[0.4em]">Integrated Trajectory Manifold</span>
                 <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Mapping Molecular Lead Time vs Biochemical Decay</span>
              </div>
              <div className="flex gap-5 items-center">
                 <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-cyan-500" /> <span className="text-[9px] font-black text-zinc-600 uppercase">ctDNA</span></div>
                 <div className="flex items-center gap-2"><div className="w-2 h-2 border border-indigo-400 rounded-full" /> <span className="text-[9px] font-black text-zinc-600 uppercase">KILEM_CA125</span></div>
                 {intercepted && <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> <span className="text-[9px] font-black text-emerald-600 uppercase">POST_INTERCEPT</span></div>}
              </div>
           </div>

           <div className="flex-1 relative cursor-crosshair min-h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                 <ComposedChart data={TRAJECTORY_DATA}>
                    <defs>
                       <linearGradient id="ctdnaGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                       </linearGradient>
                       <linearGradient id="interceptGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.15} vertical={false} />
                    <XAxis dataKey="day" stroke="#334155" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="L" stroke="#06b6d4" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis yAxisId="R" orientation="right" stroke="#818cf8" fontSize={10} axisLine={false} tickLine={false} />
                    
                    <RechartsTooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #1e293b', fontSize: 10 }} />
                    
                    <Area yAxisId="L" type="monotone" dataKey="ctdna" stroke="#06b6d4" strokeWidth={3} fill="url(#ctdnaGrad)" opacity={intercepted ? 0.2 : 1} />
                    <Area yAxisId="R" type="monotone" dataKey="ca125" stroke="#818cf8" strokeWidth={2} strokeDasharray="5 5" fill="none" opacity={intercepted ? 0.1 : 1} />

                    {intercepted && (
                       <Area yAxisId="L" data={INTERCEPTED_CURVE} type="monotone" dataKey="val" stroke="#10b981" strokeWidth={4} fill="url(#interceptGrad)" animationDuration={2000} />
                    )}

                    <ReferenceLine 
                        yAxisId="L"
                        x={120} 
                        stroke="#f43f5e" 
                        strokeDasharray="8 8" 
                        label={{ value: 'INTERCEPT_PT', position: 'top', fill: '#f43f5e', fontSize: 9, fontWeight: 'bold' }} 
                    />
                 </ComposedChart>
              </ResponsiveContainer>

              {/* Annotations */}
              <div className="absolute top-[10%] right-[5%] text-right pointer-events-none space-y-3">
                 <div className="flex items-center justify-end gap-4">
                    <div className="w-16 h-px bg-zinc-800" />
                    <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">112d Lead Time</span>
                 </div>
                 {intercepted && (
                   <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-end gap-4">
                      <div className="w-16 h-px bg-emerald-800" />
                      <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">+240d PFS Gain</span>
                   </motion.div>
                 )}
              </div>
           </div>
        </div>

        {/* Right Column */}
        <div className="col-span-4 flex flex-col gap-6">
           
           {/* Radar */}
           <div className="flex-1 bg-black/30 border border-[var(--border)] rounded-sm p-6 flex flex-col relative overflow-hidden min-h-[200px]">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-[var(--border)]">
                 <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Resistance Escape Signature</span>
                 <Target className="w-4 h-4 text-zinc-700" />
              </div>
              <div className="flex-1">
                 <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="65%" data={SIGNATURES}>
                       <PolarGrid stroke="#1e293b" />
                       <PolarAngleAxis dataKey="axis" tick={{ fill: '#475569', fontSize: 8, fontWeight: 'bold' }} />
                       <Radar name="Sig" dataKey="value" stroke={intercepted ? "#10b981" : "#f43f5e"} fill={intercepted ? "#10b981" : "#f43f5e"} fillOpacity={0.15} />
                    </RadarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           {/* Intercept Control Hub */}
           <div className="bg-black/30 border border-[var(--border)] rounded-sm p-6 shadow-2xl flex flex-col justify-between gap-4">
              <div className="space-y-4">
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <span className="text-[10px] text-zinc-600 font-black uppercase tracking-widest">Therapeutic Pivot</span>
                       <h3 className="text-lg font-black text-[var(--foreground)] tracking-tighter uppercase">Intercept Mechanism</h3>
                    </div>
                    <Timer className="w-5 h-5 text-cyan-700 animate-pulse" />
                 </div>
                 
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                       <span className="text-zinc-600">Primary Escape</span>
                       <span className="text-rose-500">CCNE1 (92%)</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                       <span className="text-zinc-600">Proposed Target</span>
                       <span className="text-cyan-400">CDK2 Inhibitor + PI3Ki</span>
                    </div>
                 </div>
              </div>

              <div className={`p-3 rounded-sm border transition-all duration-700 flex items-center gap-3 ${intercepted ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-rose-950/10 border-rose-500/20'}`}>
                 <div className={`w-7 h-7 rounded-full flex items-center justify-center ${intercepted ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                    <Zap className="w-3.5 h-3.5 text-black" />
                 </div>
                 <div className="flex-1">
                    <span className="text-[9px] font-black text-zinc-500 uppercase block">Verdict:</span>
                    <span className={`text-[10px] font-black uppercase tracking-widest ${intercepted ? 'text-emerald-400' : 'text-rose-500'}`}>
                       {intercepted ? 'PROGRESSION_BENT' : 'CRITICAL_WINDOW_ACTIVE'}
                    </span>
                 </div>
              </div>
           </div>
        </div>
      </main>

      {/* Footer Diagnostic */}
      <footer className="z-10 border-t border-[var(--border)] mt-6 pt-4 flex items-center gap-6">
        <div className="flex items-center gap-4 opacity-60">
           <span className="text-2xl font-light text-cyan-500 tracking-tighter">0.992</span>
           <div className="h-6 w-px bg-zinc-800" />
           <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">Lead Time Confidence</span>
        </div>
        <div className="flex-1 flex items-center gap-4 px-6 overflow-hidden">
           <Terminal className="w-4 h-4 text-cyan-900 flex-shrink-0" />
           {logs.slice(0, 2).map((log, i) => (
             <span key={i} className={`text-[9px] font-black uppercase tracking-[0.15em] whitespace-nowrap ${i === 0 ? 'text-cyan-500' : 'text-zinc-800'}`}>
               {log}
             </span>
           ))}
        </div>
        <div className="flex gap-4 opacity-20">
           <Activity className="w-4 h-4 text-cyan-600" />
           <Database className="w-4 h-4 text-cyan-600" />
           <Cpu className="w-4 h-4 text-cyan-600" />
        </div>
      </footer>
    </div>
  );
}
