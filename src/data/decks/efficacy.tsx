import React, { useState, useEffect, useRef, createElement, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { 
    Users, FlaskConical, TestTube, Target, ArrowRight, Dna, Bot, Cpu, CheckCircle, XCircle,
    FileSearch, LineChart, ShieldOff, UserCheck, Stethoscope, Database, ListChecks, FileText,
    RefreshCw, BarChart, Zap, Search, FilterX, TrendingDown, Coins, BrainCircuit, User, Terminal, Plus, UploadCloud, HelpCircle,
    Award, BookOpen, Dice5, DraftingCompass, Percent, FileCode, SlidersHorizontal, Box, Gavel, Map, GanttChartSquare, ClipboardList,
    Shield, AlertTriangle, MessageSquare, ShieldCheck, ArrowDown
} from 'lucide-react';

//================================================================================
// 1. ICON MAPPING & CORE UI
//================================================================================

const iconMap = {
    Users, FlaskConical, TestTube, Target, ArrowRight, Dna, Bot, Cpu, CheckCircle, XCircle,
    FileSearch, LineChart, ShieldOff, UserCheck, Stethoscope, Database, ListChecks, FileText,
    RefreshCw, BarChart, Zap, Search, FilterX, TrendingDown, Coins, BrainCircuit, User, Terminal, Plus, UploadCloud, HelpCircle,
    Award, BookOpen, Dice5, DraftingCompass, Percent, FileCode, SlidersHorizontal, Box, Gavel, Map, GanttChartSquare, ClipboardList,
    Shield, AlertTriangle, MessageSquare, ShieldCheck
};

const ArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const Brand = () => <div className="absolute top-8 left-8 z-20 text-xl font-bold text-white">ZETA<span className="text-cyan-400">EFFICACY</span></div>;

const Background = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 25;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);
        
        interface ParticleWithVelocity extends THREE.Mesh {
            velocity: THREE.Vector3;
        }
        
        const particles: ParticleWithVelocity[] = [];
        const particleGeometry = new THREE.SphereGeometry(0.08, 16, 16);
        const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x67e8f9 });
        for (let i = 0; i < 400; i++) {
            const particle = new THREE.Mesh(particleGeometry, particleMaterial) as unknown as ParticleWithVelocity;
            particle.position.set((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50);
            particle.velocity = new THREE.Vector3((Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.015, (Math.random() - 0.5) * 0.015);
            particles.push(particle);
            scene.add(particle);
        }
        let animationFrameId: number;
        const animate = (time: number) => {
            animationFrameId = requestAnimationFrame(animate);
            particles.forEach(p => {
                p.position.add(p.velocity);
                if (Math.abs(p.position.x) > 25) p.velocity.x *= -1;
                if (Math.abs(p.position.y) > 25) p.velocity.y *= -1;
                if (Math.abs(p.position.z) > 25) p.velocity.z *= -1;
            });
            camera.position.x = Math.sin(time * 0.0001) * 2;
            camera.position.y = Math.cos(time * 0.0001) * 2;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        };
        animate(0);
        const handleResize = () => {
            if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (currentMount && renderer.domElement) currentMount.removeChild(renderer.domElement);
        };
    }, []);
    return <div ref={mountRef} className="absolute inset-0 z-0 opacity-30"></div>;
};

const Navigation = ({ current, total, onPrev, onNext }: {current: number, total: number, onPrev: () => void, onNext: () => void}) => (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/30 backdrop-blur-md p-2 rounded-full border border-slate-700 shadow-lg">
        <button onClick={onPrev} className="p-3 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors"><ArrowLeft /></button>
        <span className="text-slate-300 font-semibold text-sm w-20 text-center">Slide {current + 1} / {total}</span>
        <button onClick={onNext} className="p-3 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors"><ArrowRight /></button>
    </div>
);

const Slide = ({ children, isVisible }: {children: React.ReactNode, isVisible: boolean}) => (
    <AnimatePresence>
        {isVisible && (
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center p-4 md:p-8 overflow-hidden"
            >
                <div className="relative z-10 w-full max-w-7xl space-y-8">
                    {children}
                </div>
            </motion.section>
        )}
    </AnimatePresence>
);

const Header = ({ kicker, title, kickerClass = 'from-cyan-400 to-blue-500' }: {kicker: string, title: string, kickerClass?: string}) => (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <h2 className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text ${kickerClass}`}>{kicker}</h2>
        <h1 className="text-5xl md:text-7xl font-black text-slate-100 mt-2 max-w-5xl mx-auto">
            {title}
        </h1>
    </motion.div>
);

//================================================================================
// 2. EFFICACY DECK SLIDES
//================================================================================


// --- SLIDE 1: Title ---
const TitleSlide = () => (
    <div className="space-y-8 md:space-y-12">
        <h1 className="text-4xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 drop-shadow-sm">The End of the Blind Choice</h1>
        <h2 className="text-xl md:text-3xl lg:text-5xl font-light text-cyan-500">From a universe of options to a single, ranked, actionable verdict.</h2>
        <div className="relative h-32 md:h-64 flex items-center justify-center">
            <AnimatePresence>
                <motion.div key="chaos" className="absolute flex space-x-4 md:space-x-8" initial={{opacity:1}} animate={{opacity:0, scale: 0.5}} transition={{delay: 1, duration: 0.5}}>
                    <HelpCircle className="w-12 h-12 md:w-24 md:h-24 text-red-500" />
                    <HelpCircle className="w-12 h-12 md:w-24 md:h-24 text-red-500 opacity-70 mt-6 md:mt-12" />
                    <HelpCircle className="w-12 h-12 md:w-24 md:h-24 text-red-500" />
                </motion.div>
                <motion.div key="order" className="absolute" initial={{opacity:0, scale: 0.5}} animate={{opacity:1, scale:1}} transition={{delay: 1.5, duration: 0.5}}>
                    <ListChecks className="w-24 h-24 md:w-48 md:h-48 text-green-400" />
                </motion.div>
            </AnimatePresence>
        </div>
    </div>
);


// --- SLIDE 2: Battlefield (REFORGED) ---
const EfficacyGraveyardSlide = () => {
    const candidates = Array.from({ length: 50 });
    return (
        <div className="space-y-8">
            <Header 
                kicker="THE BATTLEFIELD"
                title="Welcome to the Efficacy Graveyard"
                kickerClass="from-red-600 to-orange-500"
            />
            <div className="relative h-[20rem] md:h-[28rem] w-full max-w-4xl mx-auto">
                {/* Funnel */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[20rem] md:w-[32rem] h-8 md:h-12 bg-slate-800/50 border-x-2 border-t-2 border-slate-700 rounded-t-lg"></div>
                <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10rem] md:border-l-[16rem] border-l-transparent border-r-[10rem] md:border-r-[16rem] border-r-transparent border-t-[8rem] md:border-t-[12rem] border-t-slate-800/50"></div>
                <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 w-[20rem] md:w-[32rem] h-[8rem] md:h-[12rem] clip-funnel-sides border-x-2 border-slate-700"></div>
                <div className="absolute top-[12rem] md:top-[16rem] left-1/2 -translate-x-1/2 w-12 md:w-16 h-16 md:h-24 bg-slate-800/50 border-x-2 border-b-2 border-slate-700 rounded-b-lg"></div>

                {/* Candidates */}
                {candidates.map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        initial={{ top: '10%', left: `${Math.random() * 80 + 10}%`, opacity: 0}}
                        animate={{ top: '100%', opacity: [1, 1, 0] }}
                        transition={{ duration: 3 + Math.random() * 2, delay: i * 0.1, ease: 'linear' }}
                    >
                        <FlaskConical className={`w-6 h-6 ${i % 2 === 0 ? 'text-red-500' : 'text-cyan-400'}`} />
                    </motion.div>
                ))}
                
                {/* Filter */}
                <motion.div className="absolute top-1/2 left-1/2 w-80 h-16 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.5}}>
                     <div className="w-full h-1 bg-red-500 animate-pulse"></div>
                     <h3 className="text-2xl font-bold text-red-400 mt-2">THE GREAT FILTER</h3>
                </motion.div>

                <motion.div className="absolute top-1/2 left-1/2 w-96 h-32 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2.5}}>
                    <p className="text-7xl font-black text-red-300">~50% FAILURE</p>
                    <p className="text-2xl font-bold text-white mt-1">#1 CAUSE: LACK OF EFFICACY</p>
                </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-start max-w-5xl mx-auto relative -top-8 md:-top-16">
                 <motion.div className="bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 shadow-lg text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 3.0 }}>
                    <Coins className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <p className="text-5xl font-black text-red-300">$1B+ PER FAILURE</p>
                    <h3 className="text-2xl font-bold text-white mt-2">A Bonfire of Capital</h3>
                </motion.div>
                 <motion.div className="bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 shadow-lg text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 3.2 }}>
                    <div className="relative w-16 h-16 mx-auto mb-4">
                        <User className="w-full h-full text-red-400"/>
                        <XCircle className="absolute -bottom-2 -right-2 w-8 h-8 text-red-300 bg-slate-800 rounded-full"/>
                    </div>
                    <p className="text-5xl font-black text-red-300">YEARS OF HOPE</p>
                    <h3 className="text-2xl font-bold text-white mt-2">A Betrayal of Patients</h3>
                </motion.div>
            </div>
        </div>
    );
};


// --- SLIDE 2: Battlefield (REFORGED) ---
const BattlefieldSlideV2 = () => (
     <div className="space-y-12">
        <Header 
            kicker="The Battlefield: The Fog of War"
            title="Picking a therapy is slow when the biology is unclear."
            kickerClass="from-red-600 to-orange-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-stretch max-w-7xl mx-auto">
             <motion.div className="bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 shadow-lg text-center flex flex-col" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <h3 className="text-2xl font-bold text-white">A Universe of Options</h3>
                <div className="flex-grow flex items-center justify-center my-4 relative h-48">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><User className="w-16 h-16 text-cyan-400" /></div>
                    {['PARPi', 'Chemo', 'IO', 'TKI', 'HDACi'].map((label, i) => (
                        <div key={label} className="absolute" style={{transform: `rotate(${i * 72}deg) translate(80px)`}}>
                            <div className="bg-slate-700 text-white font-semibold text-sm px-3 py-1 rounded-full">{label}</div>
                        </div>
                    ))}
                </div>
                <p className="text-slate-400 mt-2 text-lg">Too many potential therapies with no clear biological rationale to prioritize them.</p>
            </motion.div>
            <motion.div className="bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 shadow-lg text-center flex flex-col" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
                <h3 className="text-2xl font-bold text-white">An Opaque Biology</h3>
                 <div className="flex-grow flex items-center justify-center my-4">
                    <div className="flex items-center space-x-4">
                        <p className="font-mono text-cyan-400">BRAF V600E</p>
                        <ArrowRight className="w-8 h-8 text-slate-500" />
                        <div className="w-24 h-24 bg-black flex items-center justify-center rounded-lg"><HelpCircle className="w-12 h-12 text-slate-500"/></div>
                    </div>
                 </div>
                <p className="text-slate-400 mt-2 text-lg">Key genetic markers are present, but their true functional impact remains a black box.</p>
            </motion.div>
            <motion.div className="bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 shadow-lg text-center flex flex-col" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                 <h3 className="text-2xl font-bold text-white">A Chorus of Confusion</h3>
                <div className="flex-grow flex items-center justify-center my-4 relative h-48">
                     <Stethoscope className="w-20 h-20 text-cyan-400" />
                     <BookOpen className="w-12 h-12 text-slate-500 absolute top-0 left-8 animate-pulse" style={{animationDelay: '0.2s'}} />
                     <Database className="w-12 h-12 text-slate-500 absolute bottom-4 right-0 animate-pulse" style={{animationDelay: '0.5s'}} />
                     <FileText className="w-12 h-12 text-slate-500 absolute top-8 right-8 animate-pulse" style={{animationDelay: '0.8s'}} />
                </div>
                <p className="text-slate-400 mt-2 text-lg">Clinicians are bombarded with scattered, conflicting data from papers, databases, and notes.</p>
            </motion.div>
        </div>
    </div>
);


// --- SLIDE 3: S/P/E Moat (REFORGED) ---
const SPEMoatSlideV2 = () => (
    <div className="space-y-12">
        <Header 
            kicker="Our Indefensible Moat"
            title="The S/P/E Fusion Engine"
            kickerClass="from-cyan-400 to-blue-500"
        />
        <div className="flex items-center justify-center space-x-2">
           {/* Inputs */}
           <div className="flex flex-col space-y-4">
                <motion.div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: 0.4}}>
                   <div className="flex items-center"><Dna className="w-8 h-8 text-cyan-400 mr-2" /><h4 className="text-lg font-bold text-white">Sequence</h4></div>
                   <p className="text-sm text-slate-400">Evo2 Damage Score</p>
                </motion.div>
                <motion.div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: 0.6}}>
                   <div className="flex items-center"><BrainCircuit className="w-8 h-8 text-cyan-400 mr-2" /><h4 className="text-lg font-bold text-white">Pathway</h4></div>
                   <p className="text-sm text-slate-400">MoA Burden</p>
                </motion.div>
                <motion.div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: 0.8}}>
                   <div className="flex items-center"><BookOpen className="w-8 h-8 text-cyan-400 mr-2" /><h4 className="text-lg font-bold text-white">Evidence</h4></div>
                   <p className="text-sm text-slate-400">Literature & Priors</p>
                </motion.div>
           </div>

            {/* Arrows */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1.0}}><ArrowRight className="w-16 h-16 text-slate-600" /></motion.div>
            
            {/* Core Engine */}
            <motion.div className="text-center p-8 bg-slate-800/50 rounded-full shadow-lg border-2 border-purple-500 w-64 h-64 flex flex-col justify-center items-center" initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} transition={{delay: 1.2}}>
                <Cpu className="w-24 h-24 text-purple-400"/>
                <h3 className="text-2xl font-bold mt-4 text-white">Zeta Fusion Core</h3>
            </motion.div>

            {/* Arrow */}
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1.4}}><ArrowRight className="w-16 h-16 text-slate-600" /></motion.div>
            
            {/* Output */}
            <motion.div className="bg-slate-800/50 p-6 rounded-2xl border-2 border-green-500 w-96" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay: 1.6}}>
                <h3 className="text-2xl font-bold text-white mb-2">Ranked Verdict</h3>
                <div className="space-y-2 text-left font-mono text-sm">
                     <div className="flex items-center p-2 bg-green-900/50 rounded-md"><CheckCircle size={16} className="text-green-400 mr-2 flex-shrink-0" /><span className="text-white">1. PARP Inhibitor</span><span className="ml-auto font-bold text-green-400">0.89</span></div>
                     <div className="flex items-center p-2 bg-amber-900/50 rounded-md"><HelpCircle size={16} className="text-amber-400 mr-2 flex-shrink-0" /><span className="text-white">2. Chemotherapy</span><span className="ml-auto font-bold text-amber-400">0.45</span></div>
                     <div className="flex items-center p-2 bg-red-900/50 rounded-md"><XCircle size={16} className="text-red-400 mr-2 flex-shrink-0" /><span className="text-white">3. Immuno-oncology</span><span className="ml-auto font-bold text-red-400">0.12</span></div>
                </div>
            </motion.div>
        </div>
    </div>
);

// --- SLIDE 4: Sequence Kill Chain ---
const SequenceKillChainSlideV2 = () => {
    const initialPatients = [
        {responder: true}, {responder: false}, {responder: false}, {responder: true}, {responder: false},
        {responder: false}, {responder: false}, {responder: true}, {responder: false}, {responder: false},
        {responder: false}, {responder: false}, {responder: true}, {responder: false}, {responder: false},
    ];
    return (
        <div className="space-y-6">
            <Header 
                kicker="Deep Dive: The 'Sequence' Score"
                title="Our 'S' Score Isn't a Number. It's a Biological Simulation."
                kickerClass="from-purple-400 to-pink-500"
            />
            <div className="flex justify-between items-center bg-slate-900/50 p-6 rounded-2xl border border-slate-700">
                {/* Initial Cohort */}
                <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-2">Unselected Cohort</h3>
                    <div className="grid grid-cols-5 gap-2 w-48">
                        {initialPatients.map((p, i) => <User key={i} className={`w-8 h-8 ${p.responder ? 'text-green-500' : 'text-red-500'}`} />)}
                    </div>
                </div>

                <ArrowRight className="w-16 h-16 text-slate-600 shrink-0" />

                {/* Step 1 */}
                <div className="text-center">
                    <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
                        <Target className="w-12 h-12 text-purple-400 mx-auto" />
                        <p className="font-mono text-sm text-purple-300 mt-1">/GeneEssentiality</p>
                    </div>
                    <p className="text-slate-400 text-sm mt-2">Find the Achilles' Heel</p>
                </div>

                <ArrowRight className="w-16 h-16 text-slate-600 shrink-0" />

                {/* Step 2 */}
                <div className="text-center">
                    <div className="p-4 bg-slate-800 rounded-lg border border-slate-600">
                        <Zap className="w-12 h-12 text-purple-400 mx-auto" />
                         <p className="font-mono text-sm text-purple-300 mt-1">/PredictVariantImpact</p>
                    </div>
                    <p className="text-slate-400 text-sm mt-2">Verify the Driver</p>
                </div>
                
                <ArrowRight className="w-16 h-16 text-slate-600 shrink-0" />
                
                {/* Final Cohort */}
                <div className="text-center">
                    <h3 className="text-xl font-bold text-green-400 mb-2">The Zeta Cohort</h3>
                    <div className="grid grid-cols-2 gap-2 w-20">
                        {initialPatients.filter(p=>p.responder).map((p, i) => <User key={i} className="w-8 h-8 text-green-500" />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SLIDE 4: Gene Essentiality ---
const JengaBlock = ({ cracked, highlight, removed }: {cracked: boolean, highlight: boolean, removed: boolean}) => (
    <motion.div 
        className={`w-full h-4 border border-slate-600 ${highlight ? 'bg-purple-500' : 'bg-slate-700'}`}
        initial={{opacity: 1}}
        animate={{opacity: removed ? 0 : 1}}
        transition={{duration: 0.3}}
    >
        {cracked && <div className="w-1/2 h-px bg-slate-400 transform rotate-12 -translate-y-1"></div>}
    </motion.div>
);

const JengaTower = ({ isCollapsed, hasCrack }: {isCollapsed: boolean, hasCrack: boolean}) => (
    <div className="w-16 md:w-24 h-32 md:h-48 flex flex-col-reverse">
        {Array.from({ length: 12 }).map((_, i) => (
            <motion.div 
                key={i}
                initial={{y:0, rotate: 0}}
                animate={isCollapsed ? { y: 200 - i*10, rotate: (Math.random() - 0.5) * 90, opacity: 0 } : {}}
                transition={{delay: 0.5 + i * 0.02, duration: 0.5}}
            >
                <JengaBlock cracked={hasCrack && i === 1} highlight={i === 8} removed={isCollapsed && i === 8} />
            </motion.div>
        ))}
    </div>
);


const GeneEssentialitySlide = () => (
    <div className="space-y-8">
        <Header 
            kicker="The Kill Chain: Weapon 1"
            title="Find the Achilles' Heel"
            kickerClass="from-purple-400 to-pink-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-end max-w-7xl mx-auto">
            <motion.div className="text-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}>
                <h3 className="text-2xl font-bold text-white mb-4">The Unseen Vulnerability</h3>
                <div className="flex justify-around items-end h-56">
                    <div className="text-center"><JengaTower hasCrack={true} isCollapsed={false} /><p className="mt-2 font-semibold">Patient A</p></div>
                    <div className="text-center"><JengaTower hasCrack={false} isCollapsed={false} /><p className="mt-2 font-semibold">Patient B</p></div>
                </div>
                <p className="text-slate-400 mt-4">Both tumors have the same target (PARP1), but Patient A has a hidden addiction (BRCA1 loss).</p>
            </motion.div>
            <motion.div className="text-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.6}}>
                 <h3 className="text-2xl font-bold text-white mb-4">The Zeta Simulation</h3>
                 <div className="flex justify-center items-center h-56">
                    <div className="p-6 bg-slate-800 rounded-lg border border-slate-600">
                        <Cpu className="w-20 h-20 text-purple-400 mx-auto" />
                        <p className="font-mono text-purple-300 mt-2">/GeneEssentiality</p>
                    </div>
                 </div>
                 <p className="text-slate-400 mt-4 font-bold text-cyan-400">Powered by Evo2's Zero-Shot Disruption Prediction</p>
            </motion.div>
            <motion.div className="text-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:1.0}}>
                 <h3 className="text-2xl font-bold text-white mb-4">The Inevitable Verdict</h3>
                 <div className="flex justify-around items-end h-56">
                    <div className="relative text-center"><JengaTower hasCrack={true} isCollapsed={true} /><div className="absolute inset-0 flex items-center justify-center"><p className="text-4xl font-black text-green-400 -rotate-12">ESSENTIAL</p></div></div>
                    <div className="relative text-center"><JengaTower hasCrack={false} isCollapsed={false} /><div className="absolute inset-0 flex items-center justify-center"><p className="text-4xl font-black text-red-400 rotate-12">NON-ESSENTIAL</p></div></div>
                 </div>
                 <p className="text-slate-400 mt-4">We predict which tumor will collapse when the target is removed.</p>
            </motion.div>
        </div>
        <motion.div 
            className="bg-purple-900/50 p-6 rounded-lg border-2 border-purple-600 max-w-5xl mx-auto"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay: 1.8}}
        >
            <p className="text-3xl font-bold text-purple-200">THE FIX: We eliminate patients whose cancer lacks the required synthetic lethal dependency, preventing signal dilution.</p>
        </motion.div>
    </div>
);

const PredictVariantImpactSlide = () => (
    <div className="space-y-8">
        <Header 
            kicker="The Kill Chain: Weapon 2"
            title="Verify the Driver Mutation"
            kickerClass="from-purple-400 to-pink-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-end max-w-7xl mx-auto">
            <motion.div className="text-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}>
                <h3 className="text-2xl font-bold text-white mb-4">The Ambiguous Biomarker</h3>
                <div className="flex justify-around items-center h-56">
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        <User className="w-16 h-16 mx-auto text-white" />
                        <p className="mt-2 font-semibold text-lg">Patient C</p>
                        <p className="font-mono text-cyan-400 text-sm flex items-center justify-center"><CheckCircle size={14} className="text-green-500 mr-1"/>KRAS Mutation</p>
                    </div>
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        <User className="w-16 h-16 mx-auto text-white" />
                        <p className="mt-2 font-semibold text-lg">Patient D</p>
                        <p className="font-mono text-cyan-400 text-sm flex items-center justify-center"><CheckCircle size={14} className="text-green-500 mr-1"/>KRAS Mutation</p>
                    </div>
                </div>
                <p className="text-slate-400 mt-4">Both patients have the same biomarker. But only one has a true, high-impact driver.</p>
            </motion.div>
            <motion.div className="text-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.6}}>
                 <h3 className="text-2xl font-bold text-white mb-4">The Zeta Simulation</h3>
                 <div className="flex justify-center items-center h-56">
                    <div className="p-6 bg-slate-800 rounded-lg border border-slate-600">
                        <Zap className="w-20 h-20 text-purple-400 mx-auto" />
                        <p className="font-mono text-purple-300 mt-2">/PredictVariantImpact</p>
                    </div>
                 </div>
                 <p className="text-slate-400 mt-4 font-bold text-cyan-400">Powered by Evo2's Zero-Shot Variant Effect Prediction</p>
            </motion.div>
            <motion.div className="text-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:1.0}}>
                 <h3 className="text-2xl font-bold text-white mb-4">Driver vs. Passenger</h3>
                 <div className="flex justify-around items-end h-56">
                    <div className="relative text-center p-4">
                        <Zap className="w-24 h-24 text-green-400" />
                        <p className="font-bold text-2xl text-white">Score: 9.2</p>
                        <p className="absolute -top-4 -right-4 text-3xl font-black text-green-400 rotate-12">DRIVER</p>
                    </div>
                    <div className="relative text-center p-4">
                         <Zap className="w-24 h-24 text-red-500 opacity-30" />
                         <p className="font-bold text-2xl text-white">Score: 1.4</p>
                         <p className="absolute -top-4 -right-4 text-3xl font-black text-red-500 -rotate-12">PASSENGER</p>
                    </div>
                 </div>
                 <p className="text-slate-400 mt-4">We don't just see the mutation; we quantify its power.</p>
            </motion.div>
        </div>
        <motion.div 
            className="bg-purple-900/50 p-6 rounded-lg border-2 border-purple-600 max-w-5xl mx-auto"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay: 1.8}}
        >
            <p className="text-3xl font-bold text-purple-200">THE FIX: We refine criteria from "has the mutation" to "has a mutation with a high-impact Zeta Score."</p>
        </motion.div>
    </div>
);

// --- SLIDE 5: The Deliverable ---
const EfficacyDossierSlide = () => (
    <div className="space-y-12">
        <Header 
            kicker="The Deliverable"
            title="The Efficacy Dossier"
            kickerClass="from-green-400 to-emerald-500"
        />
        <motion.div 
            className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-slate-700 max-w-5xl mx-auto text-left font-mono text-sm text-slate-300 shadow-2xl"
            initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} transition={{delay:0.4}}
        >
            <div className="grid grid-cols-6 gap-4 items-center font-sans text-xs uppercase text-slate-400 border-b border-slate-600 pb-2 mb-2">
                <div className="col-span-2">Therapy Class</div>
                <div>Score</div>
                <div>Confidence</div>
                <div>Tier</div>
                <div className="text-center">Badges</div>
            </div>
            {[{class: "PARP Inhibitor", score: 0.89, conf: 0.92, tier: "Supported", badges: ["Pathway-Aligned", "ClinVar-Strong"]}, {class: "Chemotherapy", score: 0.45, conf: 0.65, tier: "Consider", badges: ["Guideline"]}, {class: "Immuno-oncology", score: 0.12, conf: 0.30, tier: "Not Recommended", badges: []}].map((drug, i) => (
                <motion.div key={i} className="grid grid-cols-6 gap-4 items-center p-2 rounded-md hover:bg-slate-700/50" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{delay: 0.6 + i * 0.2}}>
                    <div className="col-span-2 font-sans font-bold text-white text-base">{drug.class}</div>
                    <div className="font-mono text-lg text-green-400">{drug.score.toFixed(2)}</div>
                    <div className="font-mono text-lg text-cyan-400">{drug.conf.toFixed(2)}</div>
                    <div className={`font-sans font-bold text-base ${drug.tier === 'Supported' ? 'text-green-400' : drug.tier === 'Consider' ? 'text-amber-400' : 'text-red-400'}`}>{drug.tier}</div>
                    <div className="flex space-x-1 justify-center">{drug.badges.map(b => <span key={b} className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{b}</span>)}</div>
                </motion.div>
            ))}
            <p className="font-sans text-xs text-slate-500 mt-4">Provenance (run_id): e7b2cde2-8a9d-4c3e-9b0a-7f6a7d1b3e5f</p>
        </motion.div>
    </div>
);

// --- SLIDE 6: The Proof ---
const KpiSlide = () => (
    <div className="space-y-12">
        <Header 
            kicker="The Proof"
            title="The Numbers That Matter"
            kickerClass="from-green-400 to-emerald-500"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-7xl mx-auto">
            {[{label: 'VUS Reduction', value: '40% → 15%'}, {label: '$ Saved / Program', value: '$2.1M'}, {label: 'Shortlist Compression', value: '50+ → ~8'}, {label: 'Foundation AUROC', value: '0.957'}].map((kpi, i) => (
                <motion.div key={i} className="bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 flex flex-col items-center justify-center" initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}} transition={{delay: 0.2 + i * 0.1}}>
                    <p className="text-6xl font-black text-green-400">{kpi.value}</p>
                    <p className="text-xl text-slate-300 mt-2 text-center">{kpi.label}</p>
                </motion.div>
            ))}
        </div>
    </div>
);


// --- SLIDE 7: The Ask ---
const AskSlide = () => (
     <div className="space-y-8">
        <Header kicker="The Ask" title="Run an In-Silico Tumor Board" kickerClass="from-cyan-400 to-blue-500" />
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}} className="text-2xl text-slate-300 max-w-3xl mx-auto">
            Picking a therapy is slow when the biology is unclear. For a fixed-fee pilot, we will run your next 10 cases through our S/P/E engine and deliver a ranked, actionable Efficacy Dossier for each one.
        </motion.p>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}>
            <button className="mt-8 text-2xl font-bold text-black bg-gradient-to-r from-cyan-300 to-purple-400 px-12 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform">
                Stop Debating. Start Deciding.
            </button>
        </motion.div>
    </div>
);


const PathwayAdvantageSlide = () => (
    <div className="space-y-8">
        <Header 
            kicker="The S/P/E Stack: The 'P' Pillar"
            title="Connect the Dots: The Pathway Advantage"
            kickerClass="from-purple-400 to-pink-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center max-w-7xl mx-auto">
            {/* Panel 1 */}
            <motion.div className="text-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}>
                <h3 className="text-2xl font-bold text-white mb-4">Two Signals, No Connection</h3>
                <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        <BrainCircuit className="w-16 h-16 text-red-500 mx-auto" />
                        <p className="font-bold text-lg mt-2">Patient's Biology</p>
                        <p className="font-mono text-red-400 text-sm">Mutated MAPK Pathway</p>
                    </div>
                    <HelpCircle className="w-12 h-12 text-amber-400 mx-auto" />
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        <FlaskConical className="w-16 h-16 text-cyan-400 mx-auto" />
                        <p className="font-bold text-lg mt-2">Drug's MoA</p>
                        <p className="font-mono text-cyan-400 text-sm">BRAF Inhibitor</p>
                    </div>
                </div>
            </motion.div>
            {/* Panel 2 */}
            <motion.div className="text-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.6}}>
                 <h3 className="text-2xl font-bold text-white mb-4">The `/MapPathwayBurden` Engine</h3>
                 <div className="flex justify-center items-center h-full">
                    <div className="p-6 bg-slate-800 rounded-lg border border-slate-600">
                        <Cpu className="w-24 h-24 text-purple-400 mx-auto" />
                        <p className="font-mono text-purple-300 mt-2">EXECUTING...</p>
                    </div>
                 </div>
            </motion.div>
            {/* Panel 3 */}
            <motion.div className="text-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:1.0}}>
                 <h3 className="text-2xl font-bold text-white mb-4">A Confirmed Kill Chain</h3>
                 <div className="h-full flex items-center justify-center">
                    <div className="relative p-4 bg-slate-800/50 rounded-lg border-2 border-green-500">
                        <BrainCircuit className="w-48 h-48 text-green-400 animate-pulse" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <FlaskConical className="w-12 h-12 text-cyan-400"/>
                        </div>
                        <p className="absolute -top-4 -right-4 text-3xl font-black text-green-400 rotate-12">DIRECT HIT</p>
                    </div>
                 </div>
            </motion.div>
        </div>
        <motion.div 
            className="bg-purple-900/50 p-6 rounded-lg border-2 border-purple-600 max-w-5xl mx-auto"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay: 1.8}}
        >
            <p className="text-3xl font-bold text-purple-200">THE FIX: We prioritize therapies that directly target the patient's compromised biological pathways, transforming a hopeful guess into a calculated strike.</p>
        </motion.div>
    </div>
);

const EvidenceEngineSlide = () => (
     <div className="space-y-12">
        <Header 
            kicker="The S/P/E Stack: The 'E' Pillar"
            title="From a Library of Noise to a Signal of Trust"
            kickerClass="from-purple-400 to-pink-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center max-w-7xl mx-auto">
            {/* Panel 1 */}
            <motion.div className="text-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}>
                <h3 className="text-2xl font-bold text-white mb-4">The Storm of Evidence</h3>
                <div className="relative h-64 flex items-center justify-center">
                    <Stethoscope className="w-24 h-24 text-cyan-400" />
                    <BookOpen className="w-16 h-16 text-slate-500 absolute top-0 left-8 animate-pulse" style={{animationDelay: '0.2s'}} />
                    <Database className="w-16 h-16 text-slate-500 absolute bottom-0 right-0 animate-pulse" style={{animationDelay: '0.5s'}} />
                    <FileText className="w-16 h-16 text-slate-500 absolute top-8 right-8 animate-pulse" style={{animationDelay: '0.8s'}} />
                </div>
                <p className="text-slate-400 mt-4">A clinician is bombarded with a chaotic storm of papers, trials, and databases.</p>
            </motion.div>
            {/* Panel 2 */}
            <motion.div className="text-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.6}}>
                 <h3 className="text-2xl font-bold text-white mb-4">The Zeta Synthesis</h3>
                 <div className="flex justify-center items-center h-64">
                    <div className="p-6 bg-slate-800 rounded-lg border border-slate-600">
                        <Cpu className="w-24 h-24 text-purple-400 mx-auto" />
                        <p className="font-mono text-purple-300 mt-2">/SynthesizeEvidence</p>
                    </div>
                 </div>
            </motion.div>
            {/* Panel 3 */}
            <motion.div className="text-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:1.0}}>
                 <h3 className="text-2xl font-bold text-white mb-4">The Badges of Trust</h3>
                 <div className="h-64 flex flex-col items-center justify-center space-y-4">
                    <div className="flex items-center p-3 bg-green-900/50 rounded-lg border border-green-700">
                        <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                        <p className="text-xl font-bold text-green-300">Guideline-Supported</p>
                    </div>
                    <div className="flex items-center p-3 bg-green-900/50 rounded-lg border border-green-700">
                        <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                        <p className="text-xl font-bold text-green-300">RCT-Backed</p>
                    </div>
                    <div className="flex items-center p-3 bg-green-900/50 rounded-lg border border-green-700">
                        <CheckCircle className="w-8 h-8 text-green-400 mr-3" />
                        <p className="text-xl font-bold text-green-300">ClinVar Strong</p>
                    </div>
                 </div>
            </motion.div>
        </div>
        <motion.div 
            className="bg-purple-900/50 p-6 rounded-lg border-2 border-purple-600 max-w-5xl mx-auto"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay: 1.8}}
        >
            <p className="text-3xl font-bold text-purple-200">THE FIX: We automate the systematic literature review, transforming months of manual research into an instant, undeniable signal of confidence.</p>
        </motion.div>
    </div>
);

//================================================================================
// 3. DECK CONFIGURATION
//================================================================================

const deckConfig = {
    brandName: "ZETA",
    brandAccent: "EFFICACY"
};

const slides = [
    TitleSlide,
    EfficacyGraveyardSlide,
    BattlefieldSlideV2,
    SPEMoatSlideV2,
    SequenceKillChainSlideV2,
    GeneEssentialitySlide,
    PredictVariantImpactSlide,
    EfficacyDossierSlide,
    KpiSlide,
    AskSlide,
    PathwayAdvantageSlide,
    EvidenceEngineSlide,
    
];

//================================================================================
// 4. MAIN APP
//================================================================================

export default function EfficacyDeck() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1)), []);
    const prevSlide = useCallback(() => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1)), []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [nextSlide, prevSlide]);

    return (
        <main className="relative w-full h-screen bg-slate-900 text-white font-sans overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/40 z-0"></div>
            <Background />
            <Brand />
            {slides.map((SlideComponent, i) => (
                <Slide key={i} isVisible={i === currentSlide}>
                    <SlideComponent />
                </Slide>
            ))}
            <Navigation current={currentSlide} total={slides.length} onPrev={prevSlide} onNext={nextSlide} />
        </main>
    );
}

