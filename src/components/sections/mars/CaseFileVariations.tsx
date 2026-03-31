"use client";

import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface CaseFileProps {
  id: string;
  trialName: string;
  sponsor: string;
  phase: string;
  disease: string;
  endpoint: string;
  bodyTop: string;
  bodyBottom: string;
  scoreLabelA?: string;
  scoreValueA?: number;
  scoreLabelB?: string;
  scoreValueB?: number;
  delta?: string;
  closingLine: string;
  receiptPath: string;
  timestamp: string;
}

// Custom hook for number animation
function useCountUp(target: number, duration: number = 800, startWhen: boolean = true) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!startWhen) return;
    let start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const easing = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setVal(target * easing);

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setVal(target);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, startWhen]);

  return val;
}

/** 
 * VARIANT A: TERMINAL / CONSOLE LOG
 * Pure, raw data feed. Focus on monospace typography and command-line aesthetics.
 */
export function CaseFileTerminal({ data }: { data: CaseFileProps }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const valA = useCountUp(data.scoreValueA || 0, 800, inView);
  const valB = useCountUp(data.scoreValueB || 0, 800, inView);

  return (
    <div ref={ref} className="w-full bg-[#0A0A0F] border border-[#111118] p-8 font-mono text-[13px] text-[#A0A0A5] leading-relaxed relative overflow-hidden group">
      {/* Background grid line subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none" />

      {/* Top Bar */}
      <div className="text-[#00E5FF] mb-6 flex items-center gap-3">
        <span className="block w-2 h-2 bg-[#00E5FF] animate-pulse" />
        <p>$ cat /receipts/{data.id}.log</p>
      </div>

      {/* Header Info */}
      <div className="mb-6 grid grid-cols-2 lg:grid-cols-4 gap-4 pb-4 border-b border-[#2A2A35]/30 text-white">
        <div>
          <span className="text-[#606068] block text-[11px] mb-1">TRIAL</span>
          {data.trialName}
        </div>
        <div>
          <span className="text-[#606068] block text-[11px] mb-1">SPONSOR / PHASE</span>
          {data.sponsor} · {data.phase}
        </div>
        <div>
          <span className="text-[#606068] block text-[11px] mb-1">INDICATION</span>
          {data.disease}
        </div>
        <div>
          <span className="text-[#606068] block text-[11px] mb-1">ENDPOINT</span>
          <span className="text-[#FF4040]">[{data.endpoint}]</span>
        </div>
      </div>

      {/* Narrative Body */}
      <div className="mb-8 space-y-4 max-w-3xl text-[#E8E8F0]">
        <p className="whitespace-pre-wrap">{data.bodyTop}</p>
        <p className="whitespace-pre-wrap">{data.bodyBottom}</p>
      </div>

      {/* Score Block (Conditional) */}
      {data.scoreValueA !== undefined && (
        <div className="bg-[#111118] p-6 border-l-2 border-[#00E5FF] mb-8 relative">
          <div className="absolute top-0 right-0 p-2 text-[10px] text-[#00E5FF]/40">COMPUTATION MATRIX A-7</div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-[#E8E8F0]">{data.scoreLabelA}:</span>
            <div className="flex items-center gap-4">
              <span className="text-[#E8E8F0] text-lg w-24 text-right">{valA.toFixed(4)}</span>
              <span className="text-[#00D97E] w-6">✓</span>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#2A2A35]/50">
            <span className="text-[#E8E8F0]">{data.scoreLabelB}:</span>
            <div className="flex items-center gap-4">
              <span className="text-[#E8E8F0] text-lg w-24 text-right">{valB.toFixed(4)}</span>
              <span className="text-[#FF4040] w-6">✗</span>
            </div>
          </div>
          {data.delta && (
            <div className="flex justify-between items-center text-[#00E5FF]">
              <span>Delta / Predictive Separation:</span>
              <span className="font-bold text-lg mr-10">{data.delta}</span>
            </div>
          )}
        </div>
      )}

      {/* Footer / Closing */}
      <div className="space-y-4 text-[12px]">
        <p className="text-[#E8E8F0] whitespace-pre-wrap font-sans opacity-90">{data.closingLine}</p>
        <div className="mt-6 pt-4 border-t border-[#2A2A35]/30 flex justify-between items-center text-[#606068]">
          <span>Receipt: {data.receiptPath}</span>
          <span>Locked: {data.timestamp}</span>
        </div>
      </div>
    </div>
  );
}

/** 
 * VARIANT B: MANIFEST / RECEIPT
 * Manila-folder style but dark mode. Features a large "RECEIPT VERIFIED" animated stamp.
 */
export function CaseFileManifest({ data }: { data: CaseFileProps }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const valA = useCountUp(data.scoreValueA || 0, 1000, inView);
  const valB = useCountUp(data.scoreValueB || 0, 1000, inView);

  return (
    <div ref={ref} className="w-full bg-[#111118] border-t-2 border-[#00E5FF] p-8 lg:p-12 relative">
      {/* Animated Stamp */}
      <div className={`absolute top-8 right-8 border-2 border-[#00D97E] text-[#00D97E] px-4 py-1 text-sm font-bold tracking-widest uppercase transform rotate-12 transition-all duration-700 delay-500 origin-center ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-150'}`}>
        RECEIPT VERIFIED
      </div>

      {/* Top Banner */}
      <div className="font-mono text-[#00E5FF] text-[11px] md:text-[13px] uppercase tracking-wider mb-6 flex items-center gap-4">
        <span>CASE FILE 0{data.id.slice(-1)}</span>
        <span className="w-8 h-px bg-[#00E5FF]/30"></span>
        <span>{data.trialName}</span>
      </div>

      <h3 className="font-sans text-3xl md:text-4xl text-[#E8E8F0] font-light mb-2 tracking-tight">
        {data.sponsor} · {data.disease}
      </h3>
      <div className="font-mono text-[#FF4040] text-[13px] mb-8 uppercase tracking-widest">
        Primary Endpoint: {data.endpoint}
      </div>

      <div className="font-sans text-[#A0A0A5] text-lg leading-relaxed max-w-3xl mb-12">
        <p className="mb-4">{data.bodyTop}</p>
        <p>{data.bodyBottom}</p>
      </div>

      {/* Score Reveal (Conditional) */}
      {data.scoreValueA !== undefined && (
        <div className="bg-[#0A0A0F] border border-[#2A2A35]/40 p-6 md:p-8 font-mono text-[14px]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end mb-4 border-b border-[#2A2A35]/40 pb-4">
            <span className="text-[#E8E8F0]">{data.scoreLabelA}</span>
            <div className="text-right">
              <span className="text-2xl text-[#E8E8F0]">{valA.toFixed(4)}</span>
              <span className="text-[#00D97E] ml-4 text-xl">✅</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end mb-6 border-b border-[#2A2A35]/40 pb-4">
            <span className="text-[#E8E8F0]">{data.scoreLabelB}</span>
            <div className="text-right">
              <span className="text-2xl text-[#E8E8F0]">{valB.toFixed(4)}</span>
              <span className="text-[#FF4040] ml-4 text-xl">❌</span>
            </div>
          </div>
          {data.delta && (
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-end">
              <span className="text-[#00E5FF]">Delta:</span>
              <span className="text-[#00E5FF] text-xl font-bold pr-9">{data.delta}</span>
            </div>
          )}
        </div>
      )}

      {/* Closing */}
      <div className="mt-12 pt-8 border-t border-[#2A2A35]/20 flex flex-col md:flex-row justify-between items-start gap-8">
        <p className="font-sans text-[14px] text-[#E8E8F0] font-medium leading-relaxed max-w-xl">
          {data.closingLine}
        </p>
        <div className="font-mono text-[11px] text-[#606068] text-right">
          <p className="mb-1">Receipt: <span className="text-[#00E5FF]">{data.receiptPath}</span></p>
          <p>Locked: {data.timestamp}</p>
        </div>
      </div>
    </div>
  );
}

/** 
 * VARIANT C: BLUEPRINT / CLINICAL DOSSIER
 * A highly structured, modular layout simulating a clinical dashboard interface.
 */
export function CaseFileBlueprint({ data }: { data: CaseFileProps }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const valA = useCountUp(data.scoreValueA || 0, 1200, inView);
  const valB = useCountUp(data.scoreValueB || 0, 1200, inView);
  
  // Plco override logic for visual difference
  const isVelocity = data.id === '03';

  return (
    <div ref={ref} className="w-full bg-[#0A0A0F] border border-[#2A2A35]/30 flex flex-col lg:flex-row group">
      
      {/* Left Sidebar (Meta) */}
      <div className="w-full lg:w-1/4 bg-[#111118] p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-[#2A2A35]/30 flex flex-col justify-between">
        <div>
          <div className="text-[10px] font-mono text-[#00E5FF] mb-8 border border-[#00E5FF]/20 px-2 py-1 inline-block uppercase bg-[#00E5FF]/5">
            Dossier {data.id}
          </div>
          
          <h4 className="font-sans text-xl text-[#E8E8F0] mb-6">{data.trialName}</h4>
          
          <div className="space-y-4 font-mono text-[11px] text-[#A0A0A5]">
            <div>
              <span className="block text-[#606068] mb-1">Sponsor</span>
              <span className="text-[#E8E8F0]">{data.sponsor}</span>
            </div>
            <div>
              <span className="block text-[#606068] mb-1">Scale</span>
              <span className="text-[#E8E8F0]">{data.phase}</span>
            </div>
            <div>
              <span className="block text-[#606068] mb-1">Target</span>
              <span className="text-[#E8E8F0]">{data.disease}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#2A2A35]/30">
          <div className="font-mono text-[10px] text-[#FF4040]">
            ENDPOINT STATUS: <br/>{data.endpoint}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 p-6 lg:p-10 flex flex-col justify-between relative">
        <div className="mb-12 font-sans text-[15px] leading-relaxed text-[#A0A0A5] max-w-2xl">
          <p className="mb-4 text-[#E8E8F0]">{data.bodyTop}</p>
          <p>{data.bodyBottom}</p>
        </div>

        {/* Data Module (Conditional) */}
        {data.scoreValueA !== undefined && (
          <div className="mb-12 border border-[#2A2A35]/40 p-1 font-mono relative">
            <div className="absolute top-0 right-0 -m-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00E5FF]"></span>
              </span>
            </div>
            <div className="bg-[#111118] p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-8 justify-between">
                
                <div className="flex-1">
                  <div className="text-[#606068] text-[11px] mb-2 uppercase">{data.scoreLabelA}</div>
                  <div className="text-3xl lg:text-5xl text-[#E8E8F0] font-light font-sans tracking-tight">
                    {valA.toFixed(isVelocity ? 2 : 4)}
                    <span className="text-sm text-[#A0A0A5] ml-2 font-mono">{isVelocity ? 'U/mL' : ''}</span>
                  </div>
                </div>
                
                <div className="w-px bg-[#2A2A35]/30 hidden md:block"></div>
                
                <div className="flex-1">
                  <div className="text-[#606068] text-[11px] mb-2 uppercase">{data.scoreLabelB}</div>
                  <div className="text-3xl lg:text-5xl text-[#A0A0A5] font-light font-sans tracking-tight">
                    {valB.toFixed(isVelocity ? 3 : 4)}
                    <span className="text-sm text-[#A0A0A5] ml-2 font-mono">{isVelocity ? 'U/mL' : ''}</span>
                  </div>
                </div>

              </div>

              {data.delta && (
                <div className="mt-8 pt-4 border-t border-[#2A2A35]/30 flex flex-col md:flex-row gap-4 justify-between md:items-center text-[13px]">
                   <span className="text-[#00E5FF] uppercase tracking-wider whitespace-pre-wrap">{data.delta}</span>
                   {isVelocity ? null : (
                     <span className="text-[#00E5FF] text-[10px] border border-[#00E5FF]/30 px-2 py-1 whitespace-nowrap">2.6x THRESHOLD</span>
                   )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 text-[12px]">
          <div className="font-sans text-[#E8E8F0] max-w-xl border-l-2 border-[#606068] pl-4">
            {data.closingLine.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="font-mono text-[#606068] whitespace-nowrap">
            [{data.receiptPath}] — {data.timestamp}
          </div>
        </div>

      </div>
    </div>
  );
}
