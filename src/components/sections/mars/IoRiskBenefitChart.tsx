import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, 
  Activity, 
  Play,
  TrendingUp,
  X
} from 'lucide-react';

const GENES = [
  "BRCA1", "BRCA2", "TP53", "PTEN", "MYC", "CCNE1", "AKT1", "RAD51C", "PALB2", "ATM"
];

const generatePatientData = (count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const id = `OV-P-${(8128 + i).toString().padStart(4, '0')}`;
    const scores = GENES.reduce((acc: any, gene: string) => {
      let val;
      if (gene === 'TP53') val = (0.95 + Math.random() * 0.05).toFixed(3);
      else if (gene === 'BRCA1') val = (Math.random() > 0.5 ? 0.892 : 0.145).toFixed(3);
      else val = (Math.random() * 2 - 1).toFixed(3);
      acc[gene] = parseFloat(val);
      return acc;
    }, {});

    const isResponder = scores.BRCA1 > 0.7 || scores.BRCA2 > 0.6 || scores.RAD51C > 0.5;

    return { 
      id, 
      ...scores, 
      isResponder,
      status: isResponder ? 'Responder' : 'Non-Responder',
      hrdScore: (Math.random() * 100).toFixed(1)
    };
  });
};

const INITIAL_DATA = generatePatientData(32);

interface IoRiskBenefitChartProps {
  isScanning: boolean;
  scanPos: number;
  onInitiateScan: () => void;
}

export const IoRiskBenefitChart: React.FC<IoRiskBenefitChartProps> = ({ isScanning, scanPos, onInitiateScan }) => {
  const [data] = useState(INITIAL_DATA);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [simResults, setSimResults] = useState<any>(null);

  const prevScanning = useRef(isScanning);

  useEffect(() => {
    if (prevScanning.current && !isScanning) {
      // Finished scanning
      const responders = data.filter(p => p.isResponder).length;
      const ratio = responders / data.length;
      setSimResults({ 
        successRate: (ratio * 1.2).toFixed(2), 
        responderCount: responders,
        total: data.length,
        confidence: 0.984
      });
    } else if (!prevScanning.current && isScanning) {
      // Just started scanning
      setSimResults(null);
    }
    prevScanning.current = isScanning;
  }, [isScanning, data]);

  const filteredData = useMemo(() => {
    if (activeFilter === 'RESPONDERS') return data.filter(p => p.isResponder);
    if (activeFilter === 'NON_RESPONDERS') return data.filter(p => !p.isResponder);
    return data;
  }, [data, activeFilter]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 w-full h-full flex flex-col p-8 overflow-hidden relative"
    >
      {/* Top Header / Actions */}
      <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4 shrink-0">
          <div className="flex gap-8 text-[10px] font-black text-zinc-500 uppercase tracking-widest">
            <button onClick={() => setActiveFilter('ALL')} className={`${activeFilter === 'ALL' ? 'text-white border-b border-cyan-500' : 'hover:text-zinc-300'} pb-1 transition-all`}>Cohort_Grid</button>
            <button onClick={() => setActiveFilter('RESPONDERS')} className={`${activeFilter === 'RESPONDERS' ? 'text-emerald-500 border-b border-emerald-500' : 'hover:text-zinc-300'} pb-1 transition-all`}>Responders</button>
            <button onClick={() => setActiveFilter('NON_RESPONDERS')} className={`${activeFilter === 'NON_RESPONDERS' ? 'text-rose-500 border-b border-rose-500' : 'hover:text-zinc-300'} pb-1 transition-all`}>Non_Responders</button>
          </div>
          <button 
            onClick={onInitiateScan}
            disabled={isScanning}
            className={`flex items-center gap-3 px-6 py-2.5 rounded border text-[10px] font-black uppercase tracking-widest transition-all ${
              isScanning 
              ? 'bg-zinc-900 border-zinc-800 text-cyan-500 animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
              : 'bg-white text-black hover:bg-cyan-500 hover:text-white border-transparent shadow-xl'
            }`}
          >
            {isScanning ? <Activity className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {isScanning ? 'Processing...' : 'Run Response Simulation'}
          </button>
      </div>

      {/* Simulated Results Banner */}
      <AnimatePresence>
        {simResults && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-8 p-10 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 rounded flex items-center justify-between shadow-2xl relative overflow-hidden shrink-0"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
            <div className="flex items-center gap-16">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Projected Response Efficacy</span>
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-light text-white">{(simResults.successRate * 100).toFixed(1)}%</span>
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
              <div className="flex flex-col border-l border-zinc-800 pl-16">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Cohort Breakdown</span>
                <span className="text-3xl font-light text-zinc-400">{simResults.responderCount} / {simResults.total} <span className="text-xs uppercase font-bold text-zinc-600 ml-2">HRD+ Positive</span></span>
              </div>
              <div className="flex flex-col border-l border-zinc-800 pl-16">
                <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Calibration Reliability</span>
                <span className="text-3xl font-light text-cyan-700">{simResults.confidence}</span>
              </div>
            </div>
            <button onClick={() => setSimResults(null)} className="p-3 hover:bg-zinc-900 rounded transition-colors"><X className="w-5 h-5 text-zinc-700"/></button>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scrollable Grid Container */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative">
        <div className="relative z-10 bg-zinc-950/60 backdrop-blur-md border border-zinc-900 rounded-sm p-10 shadow-2xl min-h-full">
          <div className="flex justify-between items-center mb-10 border-b border-zinc-900 pb-6">
              <div className="flex items-center gap-4">
                  <Terminal className="w-5 h-5 text-zinc-700" />
                  <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-zinc-400">Live Ovarian Genomic Stream // <span className="text-cyan-600">Cohort Sigma</span></h2>
              </div>
              <div className="flex gap-10 text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" /> Responders Identified</div>
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-500" /> Genomic Resistance</div>
              </div>
          </div>

          {/* Table Header */}
          <div className="grid grid-cols-[140px_repeat(10,1fr)_80px] gap-6 mb-8 text-[10px] font-black text-zinc-700 uppercase tracking-widest border-b border-zinc-900 pb-4 sticky top-0 bg-zinc-950/90 z-20">
            <div className="pl-4">Cohort_UID</div>
            {GENES.map(gene => <div key={gene} className="text-center">{gene}</div>)}
            <div className="text-right pr-4">STATUS</div>
          </div>

          {/* Grid Data */}
          <div className="space-y-[2px]">
            {filteredData.map((row, idx) => (
              <motion.div
                key={row.id}
                onMouseEnter={() => setHoveredRow(row.id)}
                onMouseLeave={() => setHoveredRow(null)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.005 }}
                className={`grid grid-cols-[140px_repeat(10,1fr)_80px] gap-6 py-4 items-center border-l-2 transition-all cursor-crosshair rounded ${
                  hoveredRow === row.id 
                  ? 'bg-white/5 border-cyan-500 text-zinc-100 shadow-[0_0_20px_rgba(34,211,238,0.05)]' 
                  : (isScanning ? 'border-transparent text-zinc-400 bg-zinc-900/40 glow-pulse' : 'border-transparent text-zinc-500 hover:bg-zinc-900/50')
                }`}
              >
                <div className="text-[11px] font-mono pl-4 flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full ${row.isResponder ? 'bg-emerald-500' : 'bg-zinc-800'} ${isScanning && row.isResponder ? 'animate-ping' : ''}`} />
                    {row.id}
                </div>
                {GENES.map(gene => (
                  <div key={gene} className={`text-[11px] text-center font-mono ${row[gene] > 0.8 ? 'text-emerald-400 font-bold' : row[gene] < 0 ? 'text-rose-500' : ''}`}>
                    {row[gene].toFixed(3)}
                  </div>
                ))}
                <div className={`text-right pr-4 text-[9px] font-black uppercase tracking-widest ${row.isResponder ? 'text-emerald-600' : 'text-zinc-800'}`}>
                    {row.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Scan Line Overlay from EngineStack */}
      {isScanning && (
        <div 
          className="absolute left-0 w-full h-[2px] bg-cyan-400 shadow-[0_0_20px_#22d3ee] z-50 pointer-events-none"
          style={{ top: `${scanPos * 100}%` }}
        />
      )}
    </motion.div>
  );
};
