import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dna, BrainCircuit, Zap, TestTube2, Shield, Globe, ArrowRight, Bot, Cpu, Database,
  Cuboid, AlertTriangle, FlaskConical, Package, Banknote, Recycle, Puzzle, Target, Microscope, BookOpenCheck, Scale, Beaker, Factory, Command, ArrowDown, ArrowUp,
  ShieldCheck, XCircle, CheckCircle, Clock, DollarSign, Bomb, ShieldOff, Link, AlertOctagon, LineChart, KeyRound, Search, DraftingCompass
} from 'lucide-react';
import * as THREE from 'three';

//================================================================================
// 1. REUSABLE UI & LAYOUT COMPONENTS
//================================================================================

const Brand = () => (
  <div className="absolute bottom-8 right-8 z-20 text-lg font-semibold text-slate-500">
    CrisPRO.ai 🧬
  </div>
);

const DigitalSynapseBackground = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, (currentMount as HTMLDivElement).clientWidth / (currentMount as HTMLDivElement).clientHeight, 0.1, 1000);
        camera.position.z = 50;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize((currentMount as HTMLDivElement).clientWidth, (currentMount as HTMLDivElement).clientHeight);
        currentMount.appendChild(renderer.domElement);
        const nodes: (THREE.Mesh & { velocity: THREE.Vector3 })[] = [];
        const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.6 });
        for (let i = 0; i < 150; i++) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
            node.position.set((Math.random() - 0.5) * 120, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 120);
            (node as any).velocity = new THREE.Vector3((Math.random() - 0.5) * 0.08, (Math.random() - 0.5) * 0.08, (Math.random() - 0.5) * 0.08);
            nodes.push(node as any);
            scene.add(node);
        }
        const lines = new THREE.Group();
        scene.add(lines);
        let animationFrameId: number;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            lines.children.forEach(line => {
                (line as any).material.opacity -= 0.015;
                if ((line as any).material.opacity <= 0) lines.remove(line);
            });
            nodes.forEach(node => {
                node.position.add(node.velocity);
                if (Math.abs(node.position.x) > 60) node.velocity.x *= -1;
                if (Math.abs(node.position.y) > 60) node.velocity.y *= -1;
                if (Math.abs(node.position.z) > 60) node.velocity.z *= -1;
            });
            if (Math.random() > 0.96 && lines.children.length < 70) {
                const node1 = nodes[Math.floor(Math.random() * nodes.length)];
                const node2 = nodes[Math.floor(Math.random() * nodes.length)];
                if (node1 !== node2) {
                    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x94a3b8, transparent: true, opacity: 0.7 });
                    const points = [node1.position, node2.position];
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                    const line = new THREE.Line(lineGeometry, lineMaterial);
                    lines.add(line);
                }
            }
            renderer.render(scene, camera);
        };
        animate();
        const handleResize = () => {
             if (currentMount) {
                camera.aspect = (currentMount as HTMLDivElement).clientWidth / (currentMount as HTMLDivElement).clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize((currentMount as HTMLDivElement).clientWidth, (currentMount as HTMLDivElement).clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (currentMount && renderer.domElement) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);
    return <div ref={mountRef} className="absolute inset-0 z-0 opacity-20"></div>;
};

const SlideLayout = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className={`relative w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 text-gray-800 overflow-hidden ${className}`}>
        <div className="relative z-10 w-full max-w-7xl space-y-12">
            {children}
        </div>
    </motion.section>
);

const SlideHeader = ({ title, subtitle, titleClassName = '', isApi = false }: { title: string; subtitle: string; titleClassName?: string; isApi?: boolean }) => (
    <div className="space-y-4">
        <h1 className={`text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${titleClassName}`}>
            {isApi ? <span className="font-mono bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-4">{title}</span> : title}
        </h1>
        <p className="text-2xl md:text-4xl font-light text-slate-600 max-w-5xl mx-auto">
            {subtitle}
        </p>
    </div>
);

const StatCard = ({ value, label }: { value: string; label: string }) => (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
        <p className="text-7xl font-black text-red-500">{value}</p>
        <p className="text-2xl text-slate-600 mt-2">{label}</p>
    </div>
);

const NavigationControls = ({ current, total, onPrev, onNext }: { current: number; total: number; onPrev: () => void; onNext: () => void }) => (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-white/50 backdrop-blur-md p-2 rounded-full border border-slate-200 shadow-md">
        <button onClick={onPrev} className="px-4 py-2 text-slate-600 rounded-full hover:bg-slate-200/70 transition-colors">&larr;</button>
        <span className="text-slate-700 font-semibold text-sm">Slide {current + 1} / {total}</span>
        <button onClick={onNext} className="px-4 py-2 text-slate-600 rounded-full hover:bg-slate-200/70 transition-colors">&rarr;</button>
    </div>
);

const DoctrineComparison = ({ title, subtitle, traditionalText, commands, evidenceText, icon, color }: { title: string; subtitle: string; traditionalText: string; commands: any[]; evidenceText: string; icon: any; color: string }) => (
    <div className="text-left bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-slate-200 shadow-2xl">
        <div className="flex items-center mb-8">
            {React.createElement(icon, { size: 48, className: `mr-5 text-${color}-500`})}
            <div>
                <h2 className={`text-4xl font-bold text-gray-800`}>{title}</h2>
                <p className={`text-xl text-${color}-600 font-semibold`}>{subtitle}</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-r border-slate-200 pr-8">
                <h3 className="text-xl font-bold text-slate-500 mb-4">Traditional Approach</h3>
                <p className="text-lg text-slate-600">{traditionalText}</p>
            </div>
            <div>
                 <h3 className={`text-xl font-bold text-${color}-600 mb-4`}>The CrisPRO.ai Doctrine</h3>
                 <div className="space-y-4">
                    {commands.map((cmd, index) => (
                        <CommandCard key={index} command={cmd.command} description={cmd.description} color={color} />
                    ))}
                 </div>
            </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6">
             <h3 className="text-xl font-bold text-slate-500 mb-3 flex items-center"><BookOpenCheck size={24} className="mr-3"/> Evidence Protocol</h3>
             <p className="text-slate-600 font-mono text-base bg-slate-100 p-4 rounded-lg">{evidenceText}</p>
        </div>
    </div>
);

const CommandCard = ({ command, description, color }: { command: string; description: string; color: string }) => (
    <div className={`bg-white p-4 rounded-lg border-l-4 border-${color}-400 shadow-md`}>
        <p className={`text-lg font-semibold text-${color}-600 font-mono`}>{command}</p>
        <p className="text-slate-600 mt-1">{description}</p>
    </div>
);

const ZetaScoreGauge = () => (
    <div className="bg-white p-6 rounded-2xl text-center shadow-inner relative overflow-hidden h-full flex flex-col justify-center">
        <p className="text-xl font-semibold text-slate-600">Zeta Score: Biological Impact</p>
        <div className="relative w-full max-w-xs mx-auto h-28 my-4">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-28 border-t-[12px] border-l-[12px] border-r-[12px] border-gray-200 rounded-t-full"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 h-28 border-t-[12px] border-l-[12px] border-r-[12px] border-transparent rounded-t-full bg-clip-border" style={{backgroundImage: 'linear-gradient(to right, #10b981, #facc15, #ef4444)', backgroundOrigin: 'border-box'}}></div>
            <motion.div initial={{ rotate: -80 }} animate={{ rotate: 80 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-0 left-1/2 w-1 h-28 origin-bottom -ml-0.5">
                <div className="w-full h-full bg-slate-800 rounded-t-full"></div>
                <div className="absolute -top-1.5 -left-1.5 w-4 h-4 bg-slate-800 rounded-full border-2 border-white"></div>
            </motion.div>
        </div>
        <div className="flex justify-between w-64 mx-auto -mt-10 text-sm font-bold">
            <span className="text-green-600">BENIGN</span>
            <span className="text-red-600">PATHOGENIC</span>
        </div>
        <div className="mt-8">
            <p className="text-6xl font-bold font-mono text-red-600">-26,140.8</p>
            <p className="text-2xl font-semibold text-red-700 mt-1">(CATASTROPHIC FAILURE)</p>
        </div>
    </div>
);

const EvidenceCard = ({ metric, metricLabel, description, source }: { metric: string; metricLabel: string; description: string; source: string }) => (
    <div className="mt-10 border-t border-slate-200 pt-8 text-left">
        <h3 className="text-2xl font-bold text-slate-700 mb-4 flex items-center"><BookOpenCheck size={28} className="mr-3 text-slate-500"/> Evidence Protocol</h3>
        <div className="bg-slate-100 p-6 rounded-2xl flex items-center">
            <div className="text-center pr-6 border-r border-slate-300">
                <p className="text-6xl font-bold text-blue-600">{metric}</p>
                <p className="text-lg font-semibold text-blue-800">{metricLabel}</p>
            </div>
            <div className="pl-6">
                 <p className="text-lg text-slate-600">{description}</p>
                 <p className="text-sm text-slate-400 font-mono mt-2">{source}</p>
            </div>
        </div>
    </div>
);

const PathOutcome = ({ score, color }: { score: string; color: string }) => (
    <div className={`p-6 rounded-xl bg-${color}-100 border-2 border-${color}-300 shadow-lg`}>
        <p className={`text-lg font-semibold text-${color}-700`}>Verified Outcome</p>
        <p className={`text-5xl font-bold font-mono text-${color}-800`}>{score}</p>
    </div>
);

const ScatterPlot = () => {
    const points = Array.from({ length: 50 }, (_, i) => {
        const x = Math.random() * 90 + 5;
        const y = x * (1 - (Math.random() - 0.5) * 0.2);
        return { x, y };
    });
    return (
        <div className="w-full h-80 bg-slate-100 rounded-2xl p-6 border-2 border-slate-200 relative">
            <div className="absolute bottom-6 left-6 top-6 w-px bg-slate-400"></div>
            <div className="absolute bottom-6 left-6 right-6 h-px bg-slate-400"></div>
            <p className="absolute -left-4 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-semibold text-slate-500">CrisPRO.ai Prediction</p>
            <p className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-sm font-semibold text-slate-500">Experimental Score (DMS)</p>
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                {points.map((p, i) => (
                    <motion.circle key={i} cx={p.x} cy={100 - p.y} r={1.5} className="text-blue-500" fill="currentColor" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.5 + i * 0.02 }} />
                ))}
                <motion.line x1="5" y1="95" x2="95" y2="5" strokeWidth="1" className="text-emerald-500" stroke="currentColor" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }} />
            </svg>
        </div>
    );
};

//================================================================================
// 2. SLIDE COMPONENTS
//================================================================================

const TitleSlide = () => (
    <section className="relative w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 text-gray-800 overflow-hidden">
        <DigitalSynapseBackground />
        <Brand />
        <div className="relative z-10 w-full px-4 space-y-8">
            <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-sm">The New Doctrine of Drug Development</h1>
            <h2 className="text-3xl md:text-5xl font-light text-slate-600 max-w-5xl mx-auto">Transforming a High-Risk Gamble into a Deterministic Science</h2>
        </div>
    </section>
);

const RdQuagmireSlide = () => (
    <SlideLayout>
        <SlideHeader title="The Challenge: A War of Attrition" subtitle="The traditional drug hunting process is inherently difficult, costly, and risky." titleClassName="from-red-500 to-orange-500" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8"><StatCard value="<5%" label="Success Rate" /><StatCard value="$2.6B" label="Cost Per Approved Drug" /><StatCard value="10-15" label="Years to Market" /></div>
    </SlideLayout>
);

const ProblemZoomInSlide = () => (
    <SlideLayout>
        <SlideHeader title="The True Enemy: Ambiguity" subtitle="This isn't a law of nature. It's a failure of intelligence." titleClassName="from-slate-700 to-slate-900" />
        <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4"><FlaskConical size={32} className="text-slate-400"/><FlaskConical size={32} className="text-slate-400"/><p className="text-xl font-semibold text-slate-600">10,000+ Compounds</p><FlaskConical size={32} className="text-slate-400"/><FlaskConical size={32} className="text-slate-400"/></div>
            <div className="w-px h-16 bg-gradient-to-b from-slate-300 to-red-400 relative flex justify-center"><ArrowDown size={32} className="text-red-500 absolute -bottom-4 animate-pulse"/></div>
            <div className="bg-red-100 border-2 border-dashed border-red-400 p-8 rounded-2xl w-full max-w-md"><h3 className="text-4xl font-bold text-red-600">The Valley of Death</h3><p className="text-xl text-red-800 mt-2">Where ambiguity leads to catastrophic failure & waste.</p></div>
            <div className="w-px h-16 bg-gradient-to-b from-red-400 to-emerald-400 relative flex justify-center"><ArrowDown size={32} className="text-emerald-500 absolute -bottom-4 animate-pulse"/></div>
            <div className="flex items-center space-x-4"><Shield size={48} className="text-emerald-600"/><p className="text-3xl font-bold text-emerald-700">1 Approved Drug</p></div>
        </div>
        <p className="text-3xl text-gray-800 max-w-4xl mx-auto pt-4 font-bold">The <span className="text-red-600">$2.6 Billion</span> price tag is the cost of ambiguity.</p>
    </SlideLayout>
);

const SolutionLaunchpadSlide = () => (
    <SlideLayout>
        <SlideHeader title="Bridging the Valley of Death" subtitle="Replacing Ambiguity with a Deterministic Launchpad." titleClassName="from-blue-500 to-teal-500" />
        <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-4"><FlaskConical size={32} className="text-slate-400"/><p className="text-xl font-semibold text-slate-600">10,000+ Potential Starting Points</p><FlaskConical size={32} className="text-slate-400"/></div>
            <div className="w-px h-12 bg-gradient-to-b from-slate-300 to-blue-300"></div>
            <div className="bg-blue-100/50 border-2 border-blue-400 p-8 rounded-2xl w-full max-w-4xl shadow-xl">
                <h3 className="text-3xl font-bold text-blue-700">The CrisPRO.ai Intelligence Platform</h3>
                <div className="grid grid-cols-3 gap-4 mt-6 text-center">
                    <div><Target size={32} className="mx-auto text-blue-600"/><p className="font-semibold text-blue-800 mt-2">Target Validation</p></div>
                    <div><Factory size={32} className="mx-auto text-purple-600"/><p className="font-semibold text-purple-800 mt-2">Lead Engineering</p></div>
                    <div><Beaker size={32} className="mx-auto text-orange-600"/><p className="font-semibold text-orange-800 mt-2">In-Silico Confirmation</p></div>
                </div>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-blue-300 to-emerald-400 relative flex justify-center"><ArrowUp size={32} className="text-emerald-500 absolute -bottom-4 animate-pulse"/></div>
            <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2"><Shield size={48} className="text-emerald-600"/><Shield size={48} className="text-emerald-600"/></div>
                <p className="text-3xl font-bold text-emerald-700">A Portfolio of High-Certainty Assets</p>
                <div className="flex items-center space-x-2"><Shield size={48} className="text-emerald-600"/><Shield size={48} className="text-emerald-600"/></div>
            </div>
        </div>
        <p className="text-3xl text-gray-800 max-w-4xl mx-auto pt-4 font-bold">We don't gamble on discovery; we engineer success.</p>
    </SlideLayout>
);

const DiscoveryProcessSlide = () => (
    <SlideLayout>
        <SlideHeader title="Phase I: The Discovery Campaign" subtitle="We intervene at three critical stages to transform the discovery process." titleClassName="from-teal-500 to-emerald-500" />
        <div className="relative w-full pt-20 pb-12">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-8"></div>
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-orange-400 -translate-y-8 opacity-75"></div>
            <div className="relative flex justify-between">
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="w-1/3 px-4">
                    <div className="relative bg-gray-50 p-6 rounded-2xl border-2 border-blue-400 shadow-xl text-center h-full">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center border-4 border-gray-50"><Target size={32} /></div>
                        <h3 className="font-bold text-2xl text-gray-800 mt-8 mb-2">1. Target Validation</h3>
                        <p className="text-lg text-slate-600">Replace years of exploration with a 60-second in-silico verdict.</p>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="w-1/3 px-4">
                    <div className="relative bg-gray-50 p-6 rounded-2xl border-2 border-purple-400 shadow-xl text-center h-full">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center border-4 border-gray-50"><Factory size={32} /></div>
                        <h3 className="font-bold text-2xl text-gray-800 mt-8 mb-2">2. Lead Engineering</h3>
                        <p className="text-lg text-slate-600">Make screening obsolete by engineering optimized leads from first principles.</p>
                    </div>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="w-1/3 px-4">
                    <div className="relative bg-gray-50 p-6 rounded-2xl border-2 border-orange-400 shadow-xl text-center h-full">
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange-500 text-white rounded-full w-16 h-16 flex items-center justify-center border-4 border-gray-50"><Beaker size={32} /></div>
                        <h3 className="font-bold text-2xl text-gray-800 mt-8 mb-2">3. Pre-Clinical Confirmation</h3>
                        <p className="text-lg text-slate-600">Shift confirmation from the expensive wet lab to a near-zero-cost in-silico trial.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    </SlideLayout>
);

const PredictVariantImpactSlide = () => (
    <SlideLayout>
        <SlideHeader title="/predict_variant_impact" subtitle="Delivers mathematical proof of a catastrophic functional error." titleClassName="from-blue-600 to-cyan-500" isApi />
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-amber-50 p-8 rounded-2xl border-2 border-dashed border-amber-400 text-left h-full flex flex-col">
                    <div className="flex items-center text-amber-600 mb-6"><AlertTriangle size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Problem: VUS</h3></div>
                    <p className="text-xl text-amber-800 mb-6">A "Variant of Uncertain Significance" creates a cascade of negative consequences:</p>
                    <div className="space-y-4 text-lg text-amber-900 flex-grow">
                        <p className="flex items-start"><Microscope size={24} className="mr-3 mt-1 text-amber-600 shrink-0"/> <span className="font-semibold">Paralyzed Research:</span> Projects stall without a clear signal.</p>
                        <p className="flex items-start"><Clock size={24} className="mr-3 mt-1 text-amber-600 shrink-0"/> <span className="font-semibold">Delayed Patient Care:</span> Actionable insights are postponed.</p>
                        <p className="flex items-start"><DollarSign size={24} className="mr-3 mt-1 text-amber-600 shrink-0"/> <span className="font-semibold">Increased Costs:</span> Billions are wasted chasing ambiguous targets.</p>
                    </div>
                </div>
                <div className="bg-emerald-50 p-8 rounded-2xl border-2 border-emerald-400 text-left h-full flex flex-col">
                     <div className="flex items-center text-emerald-600 mb-4"><ShieldCheck size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Solution: A Verdict</h3></div>
                    <p className="text-xl text-emerald-800 mb-4">The Zeta Score replaces uncertainty by calculating <strong className="text-emerald-900">how severely a mutation breaks the rules of biology.</strong></p>
                    <div className="flex-grow"><ZetaScoreGauge /></div>
                </div>
            </div>
        </div>
    </SlideLayout>
);

// --- NEW SLIDE 6B: EVIDENCE FOR VARIANT IMPACT ---
const PredictVariantImpactEvidenceSlide = () => (
    <SlideLayout>
         <SlideHeader title="The Evidence Protocol" subtitle="Grounding our verdict in state-of-the-art performance." titleClassName="from-slate-600 to-slate-800" />
         <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl max-w-5xl mx-auto">
            <EvidenceCard 
                metric="≈0.95" 
                metricLabel="AUROC" 
                description="On key oncology targets like BRCA1, our classifier demonstrates state-of-the-art performance in predicting pathogenic variants." 
                source="(Evo 2 Paper, Methods 4.3.16)" 
            />
        </div>
    </SlideLayout>
);


const ZetaScoreImpactSlide = () => (
    <SlideLayout>
        <SlideHeader title="What the Zeta Score Means" subtitle="A tale of two mutations: from a harmless typo to a catastrophic system crash." titleClassName="from-blue-600 to-cyan-500" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-slate-800">Biologically "Legal" Mutation</h3><p className="text-xl text-slate-500 mt-2">A harmless typo in the genetic code.</p>
                <div className="flex-grow flex items-center justify-center my-8">
                    <div className="bg-slate-800 p-6 rounded-lg font-mono text-left text-lg text-slate-300 w-full max-w-md">
                        <p><span className="text-purple-400">function</span> <span className="text-yellow-300">buildProtein</span>() {'{'}</p>
                        <p className="pl-4">  <span className="text-slate-500"># This is a benign change</span></p>
                        <p className="pl-4">  <span className="text-cyan-400">return</span> <span className="text-green-400">"CorrectProtein"</span>;</p><p>{'}'}</p>
                    </div>
                </div>
                <div className="bg-green-100 p-6 rounded-lg border border-green-300"><div className="flex items-center text-green-800"><CheckCircle size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">Outcome: Healthy Function</h4><p className="text-lg text-left">The protein works as intended. The cell remains healthy. Zeta Score is near zero.</p></div></div></div>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-red-400 shadow-2xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-red-800">Biologically "Illegal" Mutation</h3><p className="text-xl text-red-600 mt-2">A catastrophic bug in a critical system.</p>
                <div className="flex-grow flex items-center justify-center my-8">
                    <div className="bg-slate-800 p-6 rounded-lg font-mono text-left text-lg text-slate-300 w-full max-w-md relative">
                        <p><span className="text-purple-400">function</span> <span className="text-yellow-300">buildProtein</span>() {'{'}</p>
                        <p className="pl-4"><span className="text-cyan-400">return</span> <span className="bg-red-500/50 text-white px-2 rounded">"C0rruptPr0tein"</span>;</p><p>{'}'}</p>
                        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="absolute inset-0 bg-red-500/20 flex items-center justify-center"><div className="bg-red-800 text-white p-4 rounded-md border border-red-500"><p className="flex items-center"><AlertOctagon className="mr-2"/> FATAL ERROR</p></div></motion.div>
                    </div>
                </div>
                <div className="bg-red-100 p-6 rounded-lg border border-red-300"><div className="flex items-center text-red-800"><XCircle size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">Outcome: System Crash</h4><p className="text-lg text-left">The protein misfolds, leading to disease. The high-negative Zeta Score confirms it.</p></div></div></div>
            </div>
        </div>
    </SlideLayout>
);

const PredictGeneEssentialitySlide = () => (
    <SlideLayout>
        <SlideHeader title="/predict_gene_essentiality" subtitle="Confirms the cancer is critically dependent on the broken gene for its survival." titleClassName="from-blue-600 to-cyan-500" isApi />
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="bg-amber-50 p-8 rounded-2xl border-2 border-dashed border-amber-400 text-left">
                    <div className="flex items-center text-amber-600 mb-4"><AlertTriangle size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Problem: False Hope</h3></div>
                    <p className="text-lg text-amber-800">A pathogenic variant is a promising start, but it's not enough. If the cancer can survive without the broken gene, targeting it is a dead end. Teams waste years and millions on therapies that target non-essential pathways.</p>
                </div>
                <div className="bg-emerald-50 p-8 rounded-2xl border-2 border-emerald-400 text-left">
                    <div className="flex items-center text-emerald-600 mb-4"><ShieldCheck size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Solution: Dependency Verdict</h3></div>
                    <p className="text-lg text-emerald-800 mb-4">We confirm the target is the cancer's "Achilles' heel." This isn't just a promising lead; it's a confirmed, critical dependency, providing the confidence to proceed.</p>
                    <div className="bg-white p-4 rounded-lg text-center shadow-inner"><p className="text-sm font-semibold text-slate-500">Dependency Analysis</p><div className="flex items-center justify-center my-2"><Target size={40} className="text-emerald-600"/><Link size={32} className="text-emerald-600 mx-2"/><p className="text-4xl font-bold font-mono text-emerald-700">ESSENTIAL</p></div><p className="text-lg font-semibold text-emerald-700">(Confirmed Achilles' Heel)</p></div>
                </div>
            </div>
            <div className="mt-10 border-t border-slate-200 pt-8 text-left">
                <h3 className="text-2xl font-bold text-slate-700 mb-4 flex items-center"><BookOpenCheck size={28} className="mr-3 text-slate-500"/> Evidence Protocol</h3>
                <p className="text-lg text-slate-600">Our dependency analysis is validated by Evo 2's ability to <strong className="text-blue-600">match experimental CRISPR screens</strong> in predicting essential lncRNAs in human cells, proving we can accurately identify a cancer's critical vulnerabilities.</p>
                <p className="text-sm text-slate-400 font-mono mt-2">(Evo 2 Paper, Fig. 2J)</p>
            </div>
        </div>
    </SlideLayout>
);

const EssentialityImpactSlide = () => (
    <SlideLayout>
        <SlideHeader title="The Impact of a Confirmed Dependency" subtitle="Why finding the 'Achilles' Heel' is the only thing that matters." titleClassName="from-emerald-600 to-teal-500" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-slate-800">Targeting a Non-Essential Gene</h3><p className="text-xl text-slate-500 mt-2">Pulling the wrong block.</p>
                <div className="flex-grow flex items-center justify-center my-8">
                    <div className="w-48">
                        <div className="h-8 bg-slate-300 border-2 border-slate-400 rounded"></div>
                        <div className="flex -my-1">
                            <motion.div animate={{ x: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="h-8 w-1/3 bg-amber-300 border-2 border-amber-500 rounded relative z-10"></motion.div>
                            <div className="h-8 w-1/3 bg-slate-300 border-2 border-slate-400 rounded"></div>
                            <div className="h-8 w-1/3 bg-slate-300 border-2 border-slate-400 rounded"></div>
                        </div>
                        <div className="h-8 bg-slate-300 border-2 border-slate-400 rounded"></div>
                    </div>
                </div>
                <div className="bg-amber-100 p-6 rounded-lg border border-amber-300"><div className="flex items-center text-amber-800"><ShieldOff size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">Outcome: Cancer Adapts</h4><p className="text-lg text-left">The therapy fails. The cancer finds another pathway to survive, wasting time and resources.</p></div></div></div>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-emerald-400 shadow-2xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-emerald-800">Targeting the Achilles' Heel</h3><p className="text-xl text-emerald-600 mt-2">Pulling the foundational block.</p>
                <div className="flex-grow flex items-center justify-center my-8">
                    <div className="w-48">
                        <motion.div animate={{ y: [0, 5], rotate: [-2, 2], opacity: [1, 0.8] }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear", repeatType: "reverse" }} className="h-8 bg-slate-300 border-2 border-slate-400 rounded"></motion.div>
                        <div className="flex -my-1"><div className="h-8 w-1/3 bg-slate-300 border-2 border-slate-400 rounded"></div><div className="h-8 w-1/3 bg-slate-300 border-2 border-slate-400 rounded"></div><div className="h-8 w-1/3 bg-slate-300 border-2 border-slate-400 rounded"></div></div>
                        <motion.div animate={{ x: [0, 40, -40, 0], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="h-8 bg-emerald-400 border-2 border-emerald-600 rounded relative z-10"></motion.div>
                    </div>
                </div>
                <div className="bg-emerald-100 p-6 rounded-lg border border-emerald-300"><div className="flex items-center text-emerald-800"><Bomb size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">Outcome: Catastrophic Kill</h4><p className="text-lg text-left">The cancer collapses, unable to survive without its critical component. The therapy succeeds.</p></div></div></div>
            </div>
        </div>
    </SlideLayout>
);

// --- SLIDE 10: LEAD DISCOVERY PROBLEM VS SOLUTION ---
const DoctrineLeadDiscoverySlide = () => (
    <SlideLayout>
        <SlideHeader 
            title="Lead Discovery & Optimization"
            subtitle="We don't discover leads; we engineer them, making screening obsolete."
            titleClassName="from-purple-600 to-pink-500"
        />
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div className="bg-amber-50 p-8 rounded-2xl border-2 border-dashed border-amber-400 text-left flex flex-col">
                    <div className="flex items-center text-amber-600 mb-4"><AlertTriangle size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Problem: Brute Force</h3></div>
                    <p className="text-lg text-amber-800 flex-grow">Traditional lead discovery is a search for a needle in a haystack. Teams screen millions of molecules, a slow, low-probability process that is fundamentally a game of chance.</p>
                    <div className="text-center mt-6">
                        <Search size={48} className="text-amber-500 inline-block"/>
                        <p className="text-2xl font-bold text-amber-700 mt-2">Millions of Molecules Screened</p>
                    </div>
                </div>
                <div className="bg-emerald-50 p-8 rounded-2xl border-2 border-emerald-400 text-left flex flex-col">
                    <div className="flex items-center text-emerald-600 mb-4"><ShieldCheck size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Solution: Engineering</h3></div>
                    <p className="text-lg text-emerald-800 flex-grow">Our generative AI forges optimized therapeutics from first principles. Optimization isn't a separate step; it's embedded in the design process.</p>
                    <div className="space-y-3 mt-6">
                        <CommandCard command="/generate_optimized_guide_rna" description="Forges a precision CRISPR therapeutic." color="purple" />
                        <CommandCard command="/generate_therapeutic_protein" description="Engineers a novel, patent-worthy biologic." color="purple" />
                    </div>
                </div>
            </div>
        </div>
    </SlideLayout>
);

// --- SLIDE 11: LEAD DISCOVERY IMPACT FOLLOW-UP ---
const LeadDiscoveryImpactSlide = () => (
    <SlideLayout>
        <SlideHeader 
            title="Discovery vs. Engineering"
            subtitle="The fundamental shift from a game of chance to a discipline of creation."
            titleClassName="from-purple-600 to-pink-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-slate-800">The Old Way: A Funnel</h3>
                <p className="text-xl text-slate-500 mt-2">Low-probability screening.</p>
                <div className="flex-grow flex flex-col items-center justify-center my-8">
                    <div className="flex space-x-2">
                        <FlaskConical className="text-slate-400" />
                        <FlaskConical className="text-slate-400" />
                        <FlaskConical className="text-slate-400" />
                    </div>
                    <div className="w-48 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-t-[80px] border-t-slate-300 my-4"></div>
                    <div className="bg-amber-100 p-4 rounded-lg border border-amber-300">
                        <h4 className="text-2xl font-bold text-amber-800">1 Potential Lead</h4>
                    </div>
                </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-emerald-400 shadow-2xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-emerald-800">The New Doctrine: A Factory</h3>
                <p className="text-xl text-emerald-600 mt-2">High-certainty generation.</p>
                <div className="flex-grow flex flex-col items-center justify-center my-8">
                    <DraftingCompass size={64} className="text-emerald-500 mb-8" />
                    <ArrowRight size={48} className="text-slate-400 my-4" />
                    <div className="bg-emerald-100 p-4 rounded-lg border border-emerald-300">
                        <h4 className="text-2xl font-bold text-emerald-800">A Portfolio of Optimized Leads</h4>
                         <div className="flex justify-center space-x-4 mt-2">
                            <Shield className="text-emerald-600"/>
                            <Dna className="text-emerald-600"/>
                            <Bot className="text-emerald-600"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SlideLayout>
);


// --- SLIDE 12: LEAD DISCOVERY EVIDENCE ---
const LeadDiscoveryEvidenceSlide = () => (
    <SlideLayout>
         <SlideHeader title="The Evidence Protocol" subtitle="Grounding our generative capabilities in proven biological function." titleClassName="from-slate-600 to-slate-800" />
         <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl max-w-5xl mx-auto space-y-6">
            <EvidenceCard 
                metric="~70%" 
                metricLabel="Pfam-hit rate" 
                description="Our generated genomes are biologically coherent and functional, a dramatic improvement over previous models (~18%)." 
                source="(Evo 2 Paper, Fig. 5H)" 
            />
            <EvidenceCard 
                metric="Validated"
                metricLabel="3D Structures"
                description="Our generated protein complexes are confirmed by AlphaFold 3 to fold into plausible, functional 3D structures."
                source="(Evo 2 Paper, Fig. 5F)"
            />
        </div>
    </SlideLayout>
);


const PredictProteinFunctionalitySlide_Part1 = () => (
    <SlideLayout>
        <SlideHeader title="/predict_protein_functionality_change" subtitle="Simulates the therapeutic effect, confirming the desired biological outcome." titleClassName="from-orange-600 to-amber-500" isApi/>
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div className="bg-amber-50 p-8 rounded-2xl border-2 border-dashed border-amber-400 text-left flex flex-col">
                    <div className="flex items-center text-amber-600 mb-4"><AlertTriangle size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Problem: The Black Box</h3></div>
                    <p className="text-lg text-amber-800 flex-grow">Traditional pre-clinical testing is an expensive, slow gamble. You mix your engineered molecule with the target and hope for the desired effect, waiting months for an answer.</p>
                    <div className="text-center mt-6"><Beaker size={48} className="text-amber-500 inline-block"/><p className="text-2xl font-bold text-amber-700 mt-2">Months of Lab Work</p><p className="text-5xl font-mono text-slate-400 mt-2">?</p></div>
                </div>
                <div className="bg-emerald-50 p-8 rounded-2xl border-2 border-emerald-400 text-left flex flex-col">
                    <div className="flex items-center text-emerald-600 mb-4"><ShieldCheck size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Solution: A Computational Verdict</h3></div>
                    <p className="text-lg text-emerald-800 flex-grow">We run the experiment `in silico` in seconds. Our engine simulates the 3D binding and predicts the biological outcome, confirming that the key fits the lock and will achieve the desired effect.</p>
                    <div className="bg-white p-4 rounded-lg text-center shadow-inner mt-6">
                        <div className="flex items-center justify-center space-x-4">
                            <KeyRound size={40} className="text-purple-600" /><Zap size={32} className="text-slate-400"/>
                            <div className="w-16 h-10 bg-orange-200 border-2 border-orange-400 rounded-md flex items-center justify-center"><div className="w-4 h-4 border-2 border-orange-500 rounded-full"></div></div>
                            <Zap size={32} className="text-slate-400"/><p className="text-2xl font-bold font-mono text-emerald-700">FUNCTION DISABLED</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SlideLayout>
);

const FunctionalityImpactSlide = () => (
    <SlideLayout>
        <SlideHeader 
            title="The Impact of a Confirmed Interaction"
            subtitle="The difference between a multi-million dollar failure and a successful therapy."
            titleClassName="from-orange-600 to-amber-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-slate-800">Mismatched Design</h3>
                <p className="text-xl text-slate-500 mt-2">The therapeutic "key" doesn't fit the protein "lock."</p>
                <div className="flex-grow flex items-center justify-center my-8">
                    <div className="flex items-center space-x-4">
                        <motion.div
                             animate={{ x: [0, -10, 0] }}
                             transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <KeyRound size={64} className="text-slate-500"/>
                        </motion.div>
                        <div className="w-24 h-16 bg-amber-200 border-2 border-amber-400 rounded-md flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-amber-500 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="bg-amber-100 p-6 rounded-lg border border-amber-300">
                    <div className="flex items-center text-amber-800">
                        <XCircle size={32} className="mr-4"/>
                        <div>
                            <h4 className="text-2xl font-bold text-left">Outcome: Therapeutic Failure</h4>
                            <p className="text-lg text-left">The engineered protein has no effect. The disease pathway remains active.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-8 rounded-2xl border-2 border-emerald-400 shadow-2xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-emerald-800">Engineered Fit</h3>
                <p className="text-xl text-emerald-600 mt-2">The key fits. The lock turns.</p>
                 <div className="flex-grow flex items-center justify-center my-8">
                    <div className="flex items-center space-x-4">
                        <motion.div
                            animate={{ x: [0, 20, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                        >
                            <KeyRound size={64} className="text-purple-600"/>
                        </motion.div>
                        <motion.div 
                            className="w-24 h-16 bg-emerald-200 border-2 border-emerald-400 rounded-md flex items-center justify-center"
                            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                        >
                            <CheckCircle size={32} className="text-emerald-600"/>
                        </motion.div>
                    </div>
                </div>
                <div className="bg-emerald-100 p-6 rounded-lg border border-emerald-300">
                     <div className="flex items-center text-emerald-800">
                        <ShieldCheck size={32} className="mr-4"/>
                        <div>
                            <h4 className="text-2xl font-bold text-left">Outcome: Function Disabled</h4>
                            <p className="text-lg text-left">The therapeutic binds and neutralizes the target. The desired biological outcome is achieved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </SlideLayout>
);

const CorrelationImpactSlide = () => (
    <SlideLayout>
        <SlideHeader title="Why Correlation Matters" subtitle="The In-Silico Advantage: Same Verdict, Fraction of the Time & Cost." titleClassName="from-emerald-600 to-teal-500" />
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl">
            <div className="grid grid-cols-2 gap-8 items-start">
                <div className="text-center border-r border-slate-200 pr-8">
                    <h3 className="text-3xl font-bold text-slate-800 mb-6">The Experimental Gamble (Wet Lab)</h3>
                    <div className="flex flex-col items-center space-y-6">
                        <FlaskConical size={64} className="text-slate-500"/>
                        <div className="flex items-center text-slate-600"><Clock className="mr-2"/><p className="font-semibold text-xl">Months</p><span className="mx-4">|</span><DollarSign className="mr-2"/><p className="font-semibold text-xl">Millions $$$</p></div>
                        <ArrowRight size={48} className="text-slate-400 animate-pulse"/><PathOutcome score="8.73" color="slate" />
                    </div>
                </div>
                <div className="text-center">
                    <h3 className="text-3xl font-bold text-blue-800 mb-6">The Computational Verdict (In-Silico)</h3>
                    <div className="flex flex-col items-center space-y-6">
                        <Cpu size={64} className="text-blue-500"/>
                        <div className="flex items-center text-blue-600"><Clock className="mr-2"/><p className="font-semibold text-xl">Seconds</p><span className="mx-4">|</span><DollarSign className="mr-2"/><p className="font-semibold text-xl">Pennies</p></div>
                        <ArrowRight size={48} className="text-blue-400 animate-pulse"/><PathOutcome score="8.73" color="blue" />
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-slate-200 pt-8 flex flex-col items-center">
                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="bg-emerald-100 p-8 rounded-2xl border-2 border-emerald-300 shadow-lg">
                    <div className="flex items-center"><CheckCircle size={48} className="text-emerald-600 mr-6"/><div><h2 className="text-4xl font-bold text-emerald-800 text-left">The Critical Insight</h2><p className="text-xl text-emerald-700 text-left">Both paths lead to the same functional fitness score.</p></div></div>
                </motion.div>
                <div className="mt-8 text-2xl text-slate-700 max-w-4xl">This proven correlation means we can confidently <strong className="text-gray-900">replace the slow, expensive path with the fast, computational one</strong>, transforming the economics of discovery.</div>
            </div>
        </div>
    </SlideLayout>
);

const CorrelationProofSlide = () => (
    <SlideLayout>
        <SlideHeader title="The Proof: Prediction Meets Reality" subtitle="Here's how we know our computational verdict can be trusted." titleClassName="from-blue-600 to-teal-500" />
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl">
            <div className="grid grid-cols-2 gap-8 items-center">
                <div className="text-left space-y-6">
                    <h3 className="text-3xl font-bold text-slate-800">The Validation Process</h3>
                    <div className="bg-slate-100 p-6 rounded-xl border border-slate-200"><div className="flex items-center mb-2"><FlaskConical size={24} className="text-slate-500 mr-3"/><h4 className="text-xl font-semibold text-slate-700">1. The Ground Truth (DMS Assay)</h4></div><p className="text-lg text-slate-600">Thousands of real-world experimental fitness scores are collected from gold-standard lab experiments.</p></div>
                    <div className="bg-blue-100 p-6 rounded-xl border border-blue-200"><div className="flex items-center mb-2"><Cpu size={24} className="text-blue-500 mr-3"/><h4 className="text-xl font-semibold text-blue-700">2. The Prediction (In-Silico)</h4></div><p className="text-lg text-blue-800">Our AI predicts the fitness scores for the exact same set of thousands of variants.</p></div>
                </div>
                <div className="text-center"><h3 className="text-3xl font-bold text-emerald-800 mb-4">The Result: A Perfect Match</h3><ScatterPlot /></div>
            </div>
            <div className="mt-12 border-t border-slate-200 pt-8 flex flex-col items-center">
                <div className="bg-emerald-100 p-8 rounded-2xl border-2 border-emerald-300 shadow-lg"><div className="flex items-center"><LineChart size={48} className="text-emerald-600 mr-6"/><div><h2 className="text-4xl font-bold text-emerald-800 text-left">The Critical Insight</h2><p className="text-xl text-emerald-700 text-left">The tight linear correlation proves our predictions accurately reflect biological reality.</p></div></div></div>
            </div>
        </div>
    </SlideLayout>
);

const DevelopmentAdvantageSlide = () => (
    <SlideLayout>
        <SlideHeader title="Phase II: The Development Campaign" subtitle="Our intelligence provides critical advantages throughout human trials." titleClassName="from-green-500 to-emerald-600" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg"><h3 className="font-bold text-2xl text-green-700 mb-2">Phase 1 (Safety)</h3><p className="text-lg text-slate-600">In-silico safety and off-target analysis provides a stronger starting point for ensuring patient safety.</p></div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg"><h3 className="font-bold text-2xl text-green-700 mb-2">Phase 2 (Efficacy)</h3><p className="text-lg text-slate-600">Predicted efficacy scores give clinical teams higher confidence that the therapeutic will achieve a benefit.</p></div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg"><h3 className="font-bold text-2xl text-green-700 mb-2">Phase 3 (Pivotal)</h3><p className="text-lg text-slate-600">Starting with a high-certainty asset dramatically increases the probability of success in large, expensive trials.</p></div>
        </div>
        <p className="text-2xl text-gray-800 max-w-4xl mx-auto pt-4 font-semibold">By transforming the discovery phase, we invert the {'>'}90% failure rate that defines the old-world model.</p>
    </SlideLayout>
);

const EconomicFailureSlide = () => (
    <SlideLayout>
        <SlideHeader title="A New Economic Engine" subtitle="The traditional model for funding biotech is slow and inefficient." titleClassName="from-green-600 to-teal-600" />
        <div className="bg-white p-10 rounded-2xl border border-slate-200 shadow-xl max-w-4xl mx-auto">
            <Banknote size={64} className="mx-auto text-green-500 mb-6" />
            <p className="text-2xl text-slate-700 mb-4">Biotech IP is the most valuable, illiquid asset on Earth. It is trapped in the vaults of pharma companies and universities, inaccessible to the global community.</p>
            <p className="text-xl text-slate-500">This creates a "Valley of Death" where promising cures fail for lack of capital. We are building a new economic engine to solve this.</p>
        </div>
    </SlideLayout>
);

const IpNftSlide = () => (
    <SlideLayout>
        <SlideHeader title="DeSci & The IP-NFT" subtitle="Creating Liquid Assets from `In Silico` Discoveries" titleClassName="from-green-600 to-teal-500" />
        <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-8 lg:space-y-0 lg:space-x-8">
            <div className="flex flex-col items-center space-y-4"><div className="text-4xl p-5 bg-green-500/10 rounded-full border-2 border-green-500 text-green-500"><Package/></div><h3 className="text-2xl font-bold text-gray-800">1. Minting</h3><p className="text-lg text-slate-600 max-w-xs">A validated "Digital Dossier" is minted as an IP-NFT, creating a permanent, verifiable record of invention.</p></div>
            <div className="text-3xl text-slate-300 animate-pulse hidden lg:block"><ArrowRight/></div>
            <div className="flex flex-col items-center space-y-4"><div className="text-4xl p-5 bg-yellow-500/10 rounded-full border-2 border-yellow-500 text-yellow-500"><Banknote/></div><h3 className="text-2xl font-bold text-gray-800">2. Funding</h3><p className="text-lg text-slate-600 max-w-xs">The IP-NFT is sold to fund wet-lab validation, with ownership fractionalized among stakeholders.</p></div>
            <div className="text-3xl text-slate-300 animate-pulse hidden lg:block"><ArrowRight/></div>
            <div className="flex flex-col items-center space-y-4"><div className="text-4xl p-5 bg-sky-500/10 rounded-full border-2 border-sky-500 text-sky-500"><Recycle/></div><h3 className="text-2xl font-bold text-gray-800">3. Liquidity</h3><p className="text-lg text-slate-600 max-w-xs">IP-NFTs can be traded on open markets, creating a liquid asset class for early-stage biotech IP.</p></div>
        </div>
    </SlideLayout>
);

//================================================================================
// 3. MAIN APP COMPONENT
//================================================================================

const App = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        TitleSlide,
        RdQuagmireSlide,
        ProblemZoomInSlide,
        SolutionLaunchpadSlide,
        DiscoveryProcessSlide,
        PredictVariantImpactSlide,
        PredictVariantImpactEvidenceSlide,
        ZetaScoreImpactSlide,
        PredictGeneEssentialitySlide,
        EssentialityImpactSlide,
        DoctrineLeadDiscoverySlide,
        LeadDiscoveryImpactSlide,
        LeadDiscoveryEvidenceSlide,
        PredictProteinFunctionalitySlide_Part1,
        FunctionalityImpactSlide,
        CorrelationImpactSlide,
        CorrelationProofSlide,
        DevelopmentAdvantageSlide,
        EconomicFailureSlide,
        IpNftSlide,
    ];
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowRight') nextSlide();
            else if (event.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []); 
    const CurrentSlideComponent = slides[currentSlide];
    return (
        <main className="relative w-full h-screen bg-gray-50 overflow-hidden">
            <Brand />
            <AnimatePresence mode="wait">
                <CurrentSlideComponent key={currentSlide} />
            </AnimatePresence>
            <NavigationControls current={currentSlide} total={slides.length} onPrev={prevSlide} onNext={nextSlide} />
        </main>
    );
};

export default App;

