"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Activity, 
  AlertTriangle, 
  Dna, 
  Shield, 
  Settings, 
  Bell, 
  User,
  ChevronRight,
  Zap,
  Microscope,
  Database
} from 'lucide-react';

// --- Mock Data ---

const RADAR_DATA = [
  { subject: 'EFFLUX AXIS', A: 45, B: 80, fullMark: 100 },
  { subject: 'METABOLIC SHIFT', A: 65, B: 75, fullMark: 100 },
  { subject: 'APOPTOSIS EVASION', A: 55, B: 65, fullMark: 100 },
  { subject: 'GENOMIC INSTABILITY', A: 85, B: 90, fullMark: 100 },
  { subject: 'STEMNESS', A: 40, B: 70, fullMark: 100 },
  { subject: 'DRUG INACTIVATION', A: 50, B: 85, fullMark: 100 },
  { subject: 'REPLICATION STRESS', A: 95, B: 95, fullMark: 100 },
  { subject: 'CELL CYCLE CHECKPOINT', A: 35, B: 60, fullMark: 100 },
];

const RESISTANCE_PROBABILITY = [
  { label: 'ALKYLATING AGENT', value: '78.4%', status: 'high' },
  { label: 'TYROSINE KINASE INHIBITOR', value: '52.1%', status: 'medium' },
  { label: 'IMMUNOTHERAPY', value: '21.6%', status: 'low' },
  { label: 'PHAPRSYMETRER', value: '23.3%', status: 'low' },
  { label: 'CHRONOPHETICS', value: '22.2%', status: 'low' },
  { label: 'THRUNGBLATGER', value: '19.5%', status: 'low' },
  { label: 'THREPORXERY', value: '18.8%', status: 'low' },
  { label: 'IMMUNOTHERAPY (ALT)', value: '25.8%', status: 'low' },
];

const PATHWAY_SCORES = [
  { label: 'PI3K/AKT/MTOR', score: 9.1, color: 'text-red-400' },
  { label: 'WNT/BETA-CATENIN', score: 4.8, color: 'text-zinc-400' },
  { label: 'P53/DNA-REPAIR', score: 2.3, color: 'text-zinc-400' },
  { label: 'P54/DNA-REPAIR', score: 2.7, color: 'text-zinc-400' },
  { label: 'P53/DNA-REPAIR (ALT)', score: 2.3, color: 'text-zinc-400' },
  { label: 'P4S/DNA REPAIR', score: 0.8, color: 'text-zinc-400' },
  { label: 'P5E', score: 0.5, color: 'text-zinc-400' },
];

const RECOMMENDATIONS = [
  { label: 'ADJUVANT THERAPY', value: 'PARP INHIBITOR' },
  { label: 'ADJUVANT THERAPY', value: 'COMBO A/B' },
  { label: 'COMBINATION STRATEGY', value: 'COMBO A/B' },
  { label: 'COMBINATION STRATEGY RECOMENATOR', value: 'PARP REPAIR INHIBITOR' },
];

// --- Sub-components (now theme-aware) ---

const Panel = ({ title, children, className = "", isDarkMode }: { title?: string; children: React.ReactNode; className?: string; isDarkMode: boolean }) => (
  <div className={`border rounded-sm overflow-hidden flex flex-col transition-colors ${
    isDarkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
  } ${className}`}>
    {title && (
      <div className={`px-3 py-2 border-b ${isDarkMode ? 'border-zinc-800 bg-zinc-900/60' : 'border-slate-100 bg-slate-50'}`}>
        <h3 className={`text-[10px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{title}</h3>
      </div>
    )}
    <div className="flex-1 p-3">
      {children}
    </div>
  </div>
);

const TechnicalTable = ({ data, columns, isDarkMode }: { data: any[]; columns: any[]; isDarkMode: boolean }) => (
  <table className={`w-full text-[10px] tracking-wider ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
    <tbody>
      {data.map((item, idx) => (
        <tr key={idx} className={`border-b last:border-0 ${isDarkMode ? 'border-zinc-800/50' : 'border-slate-100'}`}>
          {columns.map((col, cIdx) => (
            <td key={cIdx} className={`py-1.5 ${col.className || ""}`}>
              {typeof col.render === 'function' ? col.render(item) : item[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default function App() {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('DASHBOARD');

  return (
    <div className={`min-h-screen font-mono selection:bg-cyan-500/30 transition-colors duration-500 ${
      isDarkMode ? 'bg-[#0a0e12] text-zinc-300' : 'bg-white text-slate-700'
    }`}>
      {/* Top Navbar */}
      <nav className={`flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0 px-4 md:px-6 py-3 border-b backdrop-blur-md sticky top-0 z-50 transition-colors ${
        isDarkMode ? 'border-zinc-800 bg-zinc-900/20' : 'border-slate-200 bg-white/80'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 w-full md:w-auto">
          <div className={`flex items-center gap-2 ${isDarkMode ? 'text-cyan-400' : 'text-indigo-600'}`}>
            <Shield className="w-5 h-5 flex-shrink-0" />
            <span className="text-xs font-black tracking-widest uppercase truncate">Clinical AI Platform</span>
          </div>
          <div className="flex flex-wrap gap-4 md:gap-6 overflow-x-auto pb-2 md:pb-0">
            {['PATIENT DATA', 'DASHBOARD', 'DATA ANALYSIS', 'SETTINGS', 'CONTACT'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-[10px] font-bold tracking-[0.2em] transition-all relative py-1 ${
                  activeTab === tab 
                    ? (isDarkMode ? 'text-white' : 'text-slate-900') 
                    : (isDarkMode ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-600')
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-underline" className={`absolute bottom-0 left-0 right-0 h-[2px] ${isDarkMode ? 'bg-cyan-500' : 'bg-indigo-500'}`} />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className={`hidden flex-shrink-0 md:flex flex-row items-center gap-4 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
          <Settings className={`w-4 h-4 cursor-pointer ${isDarkMode ? 'hover:text-zinc-300' : 'hover:text-slate-600'}`} />
          <div className="relative">
            <Bell className={`w-4 h-4 cursor-pointer ${isDarkMode ? 'hover:text-zinc-300' : 'hover:text-slate-600'}`} />
            <span className={`absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border ${isDarkMode ? 'border-zinc-900' : 'border-white'}`} />
          </div>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
            <User className="w-3.5 h-3.5" />
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="p-4 md:p-6 flex flex-col xl:grid xl:grid-cols-12 gap-6 max-w-[1600px] mx-auto pb-16">
        
        {/* Sidebar Nav (Second Level) */}
        <div className="xl:col-span-2 space-y-4">
          <div className={`border rounded-sm ${isDarkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            <button className={`w-full px-4 py-3 text-left text-[11px] font-bold border-b uppercase tracking-widest ${
              isDarkMode ? 'bg-zinc-800/40 border-zinc-800 text-zinc-200' : 'bg-slate-50 border-slate-100 text-slate-700'
            }`}>
              Patient Data
            </button>
            <div className="p-1">
              {[
                { label: 'Model Overview', active: true },
                { label: 'Treatment History', active: false },
                { label: 'System Alerts', active: false }
              ].map(item => (
                <button
                  key={item.label}
                  className={`w-full px-3 py-2 text-left text-[10px] uppercase tracking-widest transition-colors rounded-sm ${
                    item.active 
                      ? (isDarkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-indigo-50 text-indigo-600') 
                      : (isDarkMode ? 'text-zinc-500 hover:bg-zinc-800/50 hover:text-zinc-300' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600')
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <Panel title="System Status" className={isDarkMode ? 'bg-cyan-950/5' : ''} isDarkMode={isDarkMode}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[9px] uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Analysis Uptime</span>
                <span className={`text-[9px] ${isDarkMode ? 'text-cyan-500' : 'text-indigo-600'}`}>99.9%</span>
              </div>
              <div className={`h-1 rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                <div className={`w-[99.9%] h-full ${isDarkMode ? 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'bg-indigo-500'}`} />
              </div>
            </div>
          </Panel>
        </div>

        {/* Central Visualization Section */}
        <div className="xl:col-span-7 space-y-6">
          <div className={`relative border rounded-sm p-4 md:p-8 min-h-[600px] flex flex-col items-center justify-center overflow-hidden transition-colors ${
            isDarkMode ? 'bg-zinc-900/20 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            {/* Background HUD elements */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border rounded-full ${isDarkMode ? 'border-cyan-500' : 'border-indigo-400'}`} />
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border rounded-full ${isDarkMode ? 'border-cyan-500' : 'border-indigo-400'}`} />
              <div className={`absolute top-0 bottom-0 left-1/2 w-[1px] ${isDarkMode ? 'bg-cyan-500' : 'bg-indigo-400'}`} />
              <div className={`absolute left-0 right-0 top-1/2 h-[1px] ${isDarkMode ? 'bg-cyan-500' : 'bg-indigo-400'}`} />
            </div>

            <h2 className={`text-sm font-black text-center uppercase tracking-[0.4em] mb-12 relative ${isDarkMode ? 'text-zinc-100' : 'text-slate-800'}`}>
              Cancer &apos;Kill Chain&apos; Resistance Matrix
            </h2>

            <div className="w-full h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                  <PolarGrid stroke={isDarkMode ? '#1e293b' : '#e2e8f0'} />
                  <PolarAngleAxis 
                    dataKey="subject" 
                    tick={{ fill: isDarkMode ? '#64748b' : '#475569', fontSize: 9, fontWeight: 'bold' }} 
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={false} 
                    axisLine={false} 
                  />
                  {/* Inner Shape */}
                  <Radar
                    name="Baseline"
                    dataKey="A"
                    stroke={isDarkMode ? '#0891b2' : '#4f46e5'}
                    fill={isDarkMode ? '#0891b2' : '#4f46e5'}
                    fillOpacity={0.2}
                  />
                  {/* Outer Pulsing Shape */}
                  <Radar
                    name="Patient"
                    dataKey="B"
                    stroke={isDarkMode ? '#22d3ee' : '#6366f1'}
                    fill={isDarkMode ? '#22d3ee' : '#6366f1'}
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Alert on Matrix */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
              className="absolute left-[34%] top-[48.5%] z-10"
            >
              <div className="w-6 h-6 bg-red-500/20 border border-red-500 rounded-sm flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                <AlertTriangle className="w-3 h-3 text-red-500" />
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
            <Panel title="Pathway Activation Score" isDarkMode={isDarkMode}>
              <TechnicalTable 
                data={PATHWAY_SCORES}
                isDarkMode={isDarkMode}
                columns={[
                  { key: 'label', className: `text-[9px] font-bold uppercase ${isDarkMode ? '' : 'text-slate-600'}` },
                  { 
                    key: 'score', 
                    className: 'text-right font-black',
                    render: (item) => <span className={isDarkMode ? item.color : (item.score > 5 ? 'text-red-600' : 'text-slate-500')}>{item.score}</span>
                  }
                ]}
              />
            </Panel>

            <Panel title="Treatment Optimization Recommendations" isDarkMode={isDarkMode}>
              <TechnicalTable 
                data={RECOMMENDATIONS}
                isDarkMode={isDarkMode}
                columns={[
                  { key: 'label', className: `text-[9px] uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}` },
                  { key: 'value', className: `text-right font-bold uppercase ${isDarkMode ? 'text-red-400' : 'text-red-600'}` }
                ]}
              />
            </Panel>
          </div>
        </div>

        {/* Right Sidebar Section */}
        <div className="xl:col-span-3 space-y-6">
          <Panel title="Resistance Probability" isDarkMode={isDarkMode}>
            <TechnicalTable 
              data={RESISTANCE_PROBABILITY}
              isDarkMode={isDarkMode}
              columns={[
                { key: 'label', className: `text-[9px] font-bold uppercase ${isDarkMode ? '' : 'text-slate-600'}` },
                { 
                  key: 'value', 
                  className: 'text-right font-black',
                  render: (item) => (
                    <span className={item.status === 'high' ? (isDarkMode ? 'text-red-400' : 'text-red-600') : (isDarkMode ? 'text-zinc-300' : 'text-slate-600')}>
                      {item.value}
                    </span>
                  )
                }
              ]}
            />
          </Panel>

          <Panel title="Acquired Evolutionary Escape" isDarkMode={isDarkMode}>
            <div className="space-y-4">
              <div>
                <span className={`text-[9px] uppercase block mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Emergent Subclones</span>
                <div className="flex gap-2">
                  {['A3', 'C1', 'E4'].map(id => (
                    <span key={id} className={`px-2 py-0.5 border text-[10px] font-bold rounded-sm ${
                      isDarkMode ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-red-50 border-red-200 text-red-600'
                    }`}>
                      {id}
                    </span>
                  ))}
                </div>
              </div>
              <div className={`flex justify-between items-center border-t pt-3 ${isDarkMode ? 'border-zinc-800' : 'border-slate-100'}`}>
                <span className={`text-[9px] uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Predicted Relapse</span>
                <span className={`text-[10px] font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>4-6 MONTHS</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-[9px] uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Trajectory</span>
                <span className={`text-[10px] font-bold text-right uppercase leading-none ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                  Binding Site<br/>Mutation
                </span>
              </div>
            </div>
          </Panel>

          <Panel title="Patient Analysis" isDarkMode={isDarkMode}>
            <div className="space-y-4">
              <div>
                <span className={`text-[9px] uppercase block mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Energlities</span>
                <div className={`h-1 w-full rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                  <div className={`w-3/4 h-full ${isDarkMode ? 'bg-cyan-500' : 'bg-indigo-500'}`} />
                </div>
              </div>
              <div>
                <span className={`text-[9px] uppercase block mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Emergent Subclones</span>
                <div className={`text-[10px] space-y-1 font-bold ${isDarkMode ? 'text-red-400' : 'text-red-600'}`}>
                  <p>A3</p>
                  <p>C1</p>
                  <p>E4</p>
                  <p className={isDarkMode ? 'text-zinc-600' : 'text-slate-300'}>..</p>
                </div>
              </div>
            </div>
          </Panel>
        </div>

      </div>

      {/* Footer / Status Bar */}
      <footer className={`fixed bottom-0 left-0 right-0 border-t px-6 py-2 flex justify-between items-center z-50 transition-colors ${
        isDarkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white/90 border-slate-200'
      }`}>
        <div className={`flex items-center gap-4 text-[9px] font-bold tracking-widest uppercase ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            System Online
          </div>
          <div className={`w-[1px] h-3 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
          <span>Patient-ID: PX-MARS-8128</span>
          <div className={`w-[1px] h-3 ${isDarkMode ? 'bg-zinc-800' : 'bg-slate-200'}`} />
          <span>Engine: v6.2.0</span>
        </div>
        <div className="flex items-center gap-4">
          <Database className={`w-3 h-3 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`} />
          <Microscope className={`w-3 h-3 ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`} />
          <Zap className={`w-3 h-3 ${isDarkMode ? 'text-cyan-500' : 'text-indigo-500'}`} />
        </div>
      </footer>
    </div>
  );
}