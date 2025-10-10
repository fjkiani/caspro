import React, { useState, useEffect, useRef, createElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { 
    Users, FlaskConical, TestTube, Target, ArrowRight, Dna, Bot, Cpu, CheckCircle, XCircle,
    FileSearch, LineChart, ShieldOff, UserCheck, Stethoscope, Database, ListChecks, FileText,
    RefreshCw, BarChart, Zap, Search, FilterX, TrendingDown, Coins, BrainCircuit, User, Terminal, Plus, UploadCloud, HelpCircle,
    Award, BookOpen, Dice5, DraftingCompass, Percent, FileCode, SlidersHorizontal, Box, Gavel, Map, GanttChartSquare, ClipboardList,
    Shield, AlertTriangle, MessageSquare, ShieldCheck
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
const Brand = () => <div className="absolute top-8 left-8 z-20 text-xl font-bold text-white">ZETA<span className="text-cyan-400">TRIALS</span></div>;

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
// 2. NEW SLIDE COMPONENTS FOR CLINICAL TRIALS
//================================================================================

const TrialTitleSlide = () => (
    <div className="space-y-8">
         <h1 className="text-4xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 drop-shadow-sm">
            The End of the Blind Trial
        </h1>
        <h2 className="text-xl md:text-3xl lg:text-5xl font-light text-cyan-500">
            Find matching trials in minutes. Clear eligibility and a shareable one‑pager.
        </h2>
        <motion.div 
            className="flex justify-center items-center space-x-4 md:space-x-8 h-32 md:h-64"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.5, duration: 1}}
        >
            <Users className="w-24 h-24 md:w-48 md:h-48 text-red-500 opacity-50"/>
            <ArrowRight className="w-12 h-12 md:w-24 md:h-24 text-slate-600"/>
            <UserCheck className="w-24 h-24 md:w-48 md:h-48 text-green-500"/>
        </motion.div>
         <motion.div
            className="bg-slate-900/50 backdrop-blur-md p-4 md:p-8 rounded-2xl border border-slate-700 shadow-xl max-w-4xl mx-auto"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 1, duration: 0.5}}
        >
            <p className="text-lg md:text-2xl text-slate-300">Turn a patient profile into a short, trustworthy trial shortlist. See who likely fits, why, and what to do next.</p>
        </motion.div>
    </div>
);

const FailureStage = ({ icon: Icon, title, stat, description, delay }: {icon: React.ComponentType<any>, title: string, stat: string, description: string, delay: number}) => (
    <motion.div
        className="bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700 shadow-lg text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
    >
        <Icon className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <p className="text-5xl font-black text-red-300">{stat}</p>
        <h3 className="text-2xl font-bold text-white mt-2">{title}</h3>
        <p className="text-slate-400 mt-2">{description}</p>
    </motion.div>
);

const TrialProblemSlideV2 = () => (
     <div className="space-y-12">
        <Header 
            kicker="The $2 Billion Gamble"
            title="Patient recruitment isn't a process. It's a blind lottery, and the house is winning."
            kickerClass="from-red-600 to-orange-500"
        />
        <div className="grid md:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
             <FailureStage 
                icon={Users}
                title="Recruitment Failure"
                stat="86%"
                description="Of trials fail to meet recruitment targets, costing millions per day."
                delay={0.2}
            />
            <FailureStage 
                icon={FilterX}
                title="Screen Failure"
                stat="~50%"
                description="Of interested patients are rejected due to crude, keyword-based criteria."
                delay={0.4}
            />
            <FailureStage 
                icon={TrendingDown}
                title="Efficacy Collapse"
                stat="30%"
                description="Of Phase III trials fail due to lack of efficacy in an unselected population."
                delay={0.6}
            />
        </div>
        <motion.div
            className="bg-red-900/50 text-white p-6 rounded-2xl shadow-2xl max-w-md mx-auto ring-2 ring-red-600"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
        >
            <Coins className="w-12 h-12 mx-auto mb-2 text-red-300" />
            <p className="text-4xl font-black">$2B+ and 10+ Years</p>
            <p className="text-xl font-bold">The average cost per approved drug.</p>
        </motion.div>
    </div>
);

const RootCauseSlide = () => (
    <div className="space-y-12">
        <Header 
            kicker="The Root Cause"
            title="The Signal is Drowned in Noise"
            kickerClass="from-amber-500 to-yellow-400"
        />
        <div className="bg-slate-800/50 p-4 md:p-8 rounded-2xl border-2 border-slate-700 max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white">A Traditional Trial Cohort</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2 md:gap-4 w-full max-w-2xl mx-auto my-4 md:my-8">
                {Array.from({length: 50}).map((_, i) => {
                    const isResponder = i % 11 === 0;
                    return (
                        <motion.div
                            key={i}
                            initial={{opacity:0, scale: 0.5}}
                            animate={{opacity:1, scale: 1}}
                            transition={{delay: 0.5 + i * 0.03}}
                        >
                            <User className={`w-4 h-4 md:w-8 md:h-8 ${isResponder ? 'text-green-400' : 'text-red-500'}`} />
                        </motion.div>
                    );
                })}
            </div>
            <div className="relative h-32 md:h-48 bg-slate-900/50 rounded-lg p-2 md:p-4 border border-slate-600">
                 <h4 className="text-lg md:text-2xl font-bold text-left text-amber-300">Result: A Noisy, Inconclusive Signal</h4>
                <svg viewBox="0 0 200 100" className="w-full h-full">
                    <path d="M 10 80 Q 50 10, 90 70 T 190 20" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="5 5" />
                    <path d="M 10 50 Q 50 60, 90 40 T 190 55" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.5" />
                </svg>
            </div>
        </div>
        <h2 className="text-2xl md:text-4xl font-bold text-white max-w-4xl mx-auto px-4">The Right Drug in the Wrong Patient is Still a Failure.</h2>
    </div>
);

const HowItWorksSlide = () => (
    <div className="space-y-12">
        <Header 
            kicker="Our Engine: A Biological Simulation"
            title="We build a digital twin and run the trial in-silico."
            kickerClass="from-blue-400 to-cyan-500"
        />
        <div className="flex flex-col md:flex-row items-stretch justify-center space-y-4 md:space-y-0 md:space-x-4 lg:space-x-8">
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}} className="text-center p-4 md:p-6 bg-slate-800/50 rounded-2xl shadow-lg border-2 border-slate-700 flex-1">
                <div className="flex items-center justify-center">
                    <Dna className="w-8 h-8 md:w-12 md:h-12 text-cyan-400" />
                    <ArrowRight className="w-4 h-4 md:w-8 md:h-8 text-slate-600 mx-2"/>
                    <UserCheck className="w-8 h-8 md:w-12 md:h-12 text-cyan-400" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold mt-4 text-white">1. Construct Digital Twin</h3>
                <p className="text-sm md:text-base text-slate-400 mt-2">We build an in-silico patient from their genomic data, powered by our Evo 2 foundation model's understanding of first-principles biology.</p>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} className="flex items-center justify-center md:block"><ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-slate-600" /></motion.div>
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.6}} className="text-center p-4 md:p-6 bg-slate-800/50 rounded-2xl shadow-lg border-2 border-slate-700 flex-1">
                <div className="flex items-center justify-center">
                    <FlaskConical className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />
                    <ArrowRight className="w-4 h-4 md:w-8 md:h-8 text-slate-600 mx-2"/>
                    <Cpu className="w-8 h-8 md:w-12 md:h-12 text-purple-400" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold mt-4 text-white">2. Run In-Silico Trial</h3>
                <p className="text-sm md:text-base text-slate-400 mt-2">We simulate the therapeutic's mechanism of action against the digital twin's unique biological pathways and vulnerabilities.</p>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}} className="flex items-center justify-center md:block"><ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-slate-600" /></motion.div>
            <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:1.0}} className="text-center p-4 md:p-6 bg-slate-800/50 rounded-2xl shadow-lg border-2 border-slate-700 flex-1">
                <div className="flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 md:w-12 md:h-12 text-green-400" />
                    <XCircle className="w-8 h-8 md:w-12 md:h-12 text-red-400 ml-4" />
                </div>
                <h3 className="text-lg md:text-2xl font-bold mt-4 text-white">3. Deliver the Verdict</h3>
                <p className="text-sm md:text-base text-slate-400 mt-2">We deliver a ranked shortlist with a clear 'why,' predicting efficacy and potential adverse events before the first patient is enrolled.</p>
            </motion.div>
        </div>
         <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4}} className="text-xl text-amber-300 font-semibold max-w-3xl mx-auto pt-4">
            Our competitors match text. We simulate biology.
        </motion.p>
    </div>
);

const EfficacyGraph = ({ noisy = false }) => {
    const path = noisy 
        ? "M0,50 C20,80 40,20 60,50 S80,90 100,50" 
        : "M0,80 C20,70 40,30 100,20";
    const color = noisy ? "#f87171" : "#34d399"; // red-400, green-400
    
    return (
        <svg viewBox="0 0 100 100" className="w-full h-32">
            <motion.path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth="5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 1.5, ease: "easeInOut" }}
            />
        </svg>
    );
};

const InSilicoAdvantageSlide = () => (
    <div className="space-y-12">
         <Header 
            kicker="The In-Silico Advantage"
            title="We run the trial on a thousand digital twins to guarantee success in the real world."
            kickerClass="from-blue-400 to-cyan-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
            <motion.div 
                className="bg-slate-800/50 p-4 md:p-8 rounded-2xl border-2 border-slate-700 text-center flex flex-col"
                initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: 0.2}}
            >
                <h3 className="text-xl md:text-3xl font-bold text-white">The Real-World Trial (Blind)</h3>
                <div className="flex-grow flex flex-col items-center justify-center my-4 md:my-6">
                    <p className="text-sm md:text-base font-semibold text-slate-300 mb-4">A large, unselected patient pool...</p>
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-1 md:gap-2 w-full max-w-xs md:w-80">
                        {Array.from({ length: 40 }).map((_, i) => (<User key={i} className={`w-4 h-4 md:w-6 md:h-6 ${i % 9 === 0 ? 'text-green-400' : 'text-red-500'}`} />))}
                    </div>
                </div>
                 <div className="bg-amber-900/50 p-4 md:p-6 rounded-lg border border-amber-700">
                    <h4 className="text-lg md:text-2xl font-bold text-left text-amber-300">...Leads to a Noisy Signal</h4>
                    <EfficacyGraph noisy={true} />
                </div>
            </motion.div>
             <motion.div 
                className="bg-slate-800/50 p-4 md:p-8 rounded-2xl border-2 border-green-500 text-center flex flex-col"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay: 0.4}}
            >
                <h3 className="text-xl md:text-3xl font-bold text-green-400">The Enhanced Trial (In-Silico First)</h3>
                <div className="flex-grow flex flex-col items-center justify-center my-4 md:my-6">
                    <p className="text-sm md:text-base font-semibold text-slate-300 mb-4">...is filtered by our engine to create a cohort of ideal responders.</p>
                     <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                        <div className="grid grid-cols-4 md:grid-cols-8 gap-1 md:gap-2 w-full max-w-xs md:w-80">
                            {Array.from({ length: 40 }).map((_, i) => (<User key={i} className={`w-4 h-4 md:w-6 md:h-6 ${i % 9 === 0 ? 'text-green-400' : 'text-red-500'}`} />))}
                        </div>
                        <ArrowRight size={24} className="text-slate-400 shrink-0 md:w-8 md:h-8"/>
                        <div className="grid grid-cols-2 gap-1 md:gap-2">
                             {Array.from({ length: 4 }).map((_, i) => (<User key={i} className="w-6 h-6 md:w-10 md:h-10 text-green-400" />))}
                        </div>
                    </div>
                </div>
                <div className="bg-green-900/50 p-4 md:p-6 rounded-lg border border-green-700">
                    <h4 className="text-lg md:text-2xl font-bold text-left text-green-300">...Which Guarantees a Clear Signal</h4>
                     <EfficacyGraph noisy={false} />
                </div>
            </motion.div>
        </div>
    </div>
);

const RocCurve = () => (
    <svg width="100" height="100" viewBox="0 0 100 100" className="mx-auto">
        <path d="M 10 90 L 10 10 L 90 10" fill="none" stroke="#475569" strokeWidth="2" />
        <path d="M 10 90 C 15 40, 40 15, 90 10" fill="none" stroke="#22d3ee" strokeWidth="4" />
        <text x="50" y="98" textAnchor="middle" fill="#94a3b8" fontSize="10">False Positive Rate</text>
        <text x="5" y="50" textAnchor="middle" transform="rotate(-90, 5, 50)" fill="#94a3b8" fontSize="10">True Positive Rate</text>
    </svg>
);

const FoundationSlideV2 = () => (
    <div className="space-y-12">
        <Header 
            kicker="Our Indefensible Moat"
            title="We Simulate Biology. They Search Text."
            kickerClass="from-green-400 to-emerald-500"
        />
        <div className="grid md:grid-cols-2 gap-8 text-left max-w-7xl mx-auto">
            <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay:0.2}} className="bg-slate-800/50 p-8 rounded-2xl border-2 border-slate-700 space-y-6">
                <div className="flex items-center">
                    <Dna className="w-16 h-16 text-green-400 mr-4"/>
                    <div>
                        <h3 className="text-3xl font-bold text-white">Trained on Life's Source Code</h3>
                        <p className="text-xl text-slate-400">Our engine understands biology, not just words.</p>
                    </div>
                </div>
                <div className="h-48 flex items-center justify-center bg-slate-900/50 rounded-lg p-4">
                    <p className="text-2xl text-slate-300">"Our Evo2 engine was trained on <span className="text-cyan-400 font-bold">trillions of DNA base pairs</span>—the operating system of life."</p>
                </div>
            </motion.div>

            <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay:0.4}} className="bg-slate-800/50 p-8 rounded-2xl border-2 border-slate-700 space-y-6">
                <div className="flex items-center">
                    <BrainCircuit className="w-16 h-16 text-green-400 mr-4"/>
                     <div>
                        <h3 className="text-3xl font-bold text-white">Mirrors Clinical Reality</h3>
                        <p className="text-xl text-slate-400">Our predictions aren't theoretical.</p>
                    </div>
                </div>
                 <div className="h-48 flex items-center justify-around bg-slate-900/50 rounded-lg p-4">
                    <RocCurve />
                    <div className="text-center">
                        <p className="text-6xl font-black text-cyan-400">0.957</p>
                        <p className="text-xl text-slate-300">ClinVar AUROC</p>
                         <p className="text-sm text-slate-500">(n=53,210 variants)</p>
                    </div>
                </div>
            </motion.div>
        </div>
        <motion.div 
            className="flex items-center justify-center space-x-8"
            initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}}
        >
            <div className="text-center">
                <h4 className="text-2xl text-slate-400 font-bold mb-2">Ambiguous VUS</h4>
                <div className="w-48 h-48 bg-slate-800 rounded-full flex items-center justify-center border-4 border-amber-500">
                    <User className="w-24 h-24 text-amber-400"/>
                    <div className="absolute text-7xl font-black text-amber-400">?</div>
                </div>
            </div>
            <ArrowRight className="w-24 h-24 text-slate-600"/>
             <div className="text-center">
                <h4 className="text-2xl text-green-400 font-bold mb-2">Actionable Verdict</h4>
                <div className="w-48 h-48 bg-slate-800 rounded-full flex items-center justify-center border-4 border-green-500">
                    <User className="w-24 h-24 text-green-400"/>
                    <CheckCircle className="absolute w-16 h-16 text-green-400 bg-slate-800 rounded-full bottom-0 right-0"/>
                </div>
            </div>
        </motion.div>
    </div>
);

const KillChainVisualSlide = () => (
    <div className="space-y-12">
        <Header 
            kicker="The Zeta Kill Chain"
            title="How We Engineer a Perfect Patient Cohort"
            kickerClass="from-purple-400 to-pink-500"
        />
        <div className="grid md:grid-cols-2 gap-8 text-left max-w-7xl mx-auto">
            <motion.div 
                className="bg-slate-800/50 p-8 rounded-2xl border-2 border-slate-700 flex flex-col"
                initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: 0.2}}
            >
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center"><Target className="mr-3 text-purple-400"/> Find the Achilles' Heel</h3>
                <p className="text-xl text-slate-300 mb-4 flex-grow">We use <span className="font-mono text-purple-300">/GeneEssentiality</span> to find patients whose tumors have a unique vulnerability to your specific drug.</p>
                <div className="bg-purple-900/50 p-6 rounded-lg border-2 border-purple-600 mt-auto">
                    <p className="text-2xl font-bold text-purple-200">The Fix:</p>
                    <p className="text-xl text-purple-300">Eliminate patients whose cancer lacks the required synthetic lethal dependency, preventing signal dilution.</p>
                </div>
            </motion.div>
            <motion.div 
                className="bg-slate-800/50 p-8 rounded-2xl border-2 border-slate-700 flex flex-col"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay: 0.4}}
            >
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center"><Zap className="mr-3 text-purple-400"/> Verify the Driver Mutation</h3>
                <p className="text-xl text-slate-300 mb-4 flex-grow">We use <span className="font-mono text-purple-300">/PredictVariantImpact</span> to confirm a patient's biomarker is a true, high-impact driver of their disease.</p>
                 <div className="bg-purple-900/50 p-6 rounded-lg border-2 border-purple-600 mt-auto">
                    <p className="text-2xl font-bold text-purple-200">The Fix:</p>
                    <p className="text-xl text-purple-300">Refine criteria from "KRAS mutation" to "KRAS mutation with Zeta Impact {'>'} 8," ensuring every patient is a probable responder.</p>
                </div>
            </motion.div>
        </div>
    </div>
);


const EconomicsExplainedSlide = () => (
    <div className="space-y-12">
        <Header 
            kicker="The $2.1 Million Question"
            title="How Foundational Biology De-Risks Your Pipeline"
            kickerClass="from-green-400 to-emerald-500"
        />
        <div className="grid md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto text-left">
            <motion.div
                className="md:col-span-2 bg-slate-800/50 p-8 rounded-2xl border-2 border-slate-700 space-y-4"
                initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{delay: 0.2}}
            >
                <h3 className="text-3xl font-bold text-white">The Anatomy of a Failure</h3>
                <p className="text-xl text-slate-300">A single pre-clinical candidate, pursued based on ambiguous genetic evidence, represents a massive financial drain.</p>
                <div className="flex items-center space-x-4 pt-4">
                    <div className="text-center p-4 bg-slate-900 rounded-lg border border-slate-600">
                        <p className="text-4xl font-black text-cyan-400">$3M</p>
                        <p className="text-lg text-slate-400">Avg. Cost to Validate a Target</p>
                    </div>
                    <div className="text-5xl font-thin text-slate-500">&times;</div>
                     <div className="text-center p-4 bg-slate-900 rounded-lg border border-slate-600">
                        <p className="text-4xl font-black text-cyan-400">70%</p>
                        <p className="text-lg text-slate-400">Failures due to Bad Biology</p>
                    </div>
                </div>
            </motion.div>
            <motion.div
                className="md:col-span-1 bg-green-900/50 p-8 rounded-2xl border-2 border-green-500 text-center"
                initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} transition={{delay: 0.4}}
            >
                <h3 className="text-3xl font-bold text-white">Wasted Capital</h3>
                 <p className="text-7xl font-black text-green-300 my-6">$2.1M</p>
                 <p className="text-xl text-green-200">Per failed shot on goal, eliminated by our platform.</p>
            </motion.div>
        </div>
    </div>
);


const PatientIcon = ({ isResponder, delay }: {isResponder: boolean, delay: number}) => (
    <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay, type: 'spring', stiffness: 200, damping: 10 }}
    >
        <User className={`w-4 h-4 md:w-8 md:h-8 ${isResponder ? 'text-green-400' : 'text-red-400'}`} />
    </motion.div>
);

const DevelopmentAdvantageSlide = () => (
    <div className="space-y-12">
        <Header 
            kicker="Phase II: Engineering a Win"
            title="The right drug in the wrong patient is a failure. We prevent it."
            kickerClass="from-green-400 to-teal-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
            <motion.div 
                className="bg-slate-800/50 p-4 md:p-8 rounded-2xl border-2 border-slate-700 shadow-xl text-center flex flex-col"
                initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: 0.2}}
            >
                <h3 className="text-xl md:text-3xl font-bold text-white">The Traditional Trial</h3><p className="text-sm md:text-xl text-slate-400 mt-2">Hope is the Strategy</p>
                <div className="flex-grow flex flex-col items-center justify-center my-4 md:my-8">
                    <p className="text-sm md:text-base font-semibold text-slate-300 mb-4">Enroll a broad patient population...</p>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 w-full max-w-xs md:w-64">
                        {Array.from({ length: 15 }).map((_, i) => (<PatientIcon key={i} isResponder={i % 7 === 0} delay={0.5 + i * 0.05} />))}
                    </div>
                </div>
                <div className="bg-amber-900/50 p-4 md:p-6 rounded-lg border border-amber-700"><div className="flex flex-col md:flex-row items-center text-amber-300"><XCircle size={24} className="mr-2 md:mr-4 mb-2 md:mb-0"/><div><h4 className="text-lg md:text-2xl font-bold text-left">...and hope for a signal.</h4><p className="text-sm md:text-lg text-left text-amber-400">The signal from a few responders is drowned out by the noise from non-responders.</p></div></div></div>
            </motion.div>
            <motion.div
                className="bg-slate-800/50 p-4 md:p-8 rounded-2xl border-2 border-emerald-500 shadow-2xl text-center flex flex-col"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay: 0.4}}
            >
                <h3 className="text-xl md:text-3xl font-bold text-emerald-400">The Zeta Trial</h3><p className="text-sm md:text-xl text-emerald-500 mt-2">Certainty is the Strategy</p>
                 <div className="flex-grow flex flex-col items-center justify-center my-4 md:my-8">
                    <p className="text-sm md:text-base font-semibold text-slate-300 mb-4">Computationally filter for ideal candidates...</p>
                    <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                        <div className="grid grid-cols-3 gap-1 md:gap-2">{Array.from({ length: 6 }).map((_, i) => (<PatientIcon key={i} isResponder={i % 3 === 0} delay={0.5 + i * 0.1} />))}</div>
                        <ArrowRight size={24} className="text-slate-400"/>
                        <div className="bg-slate-900 p-2 md:p-4 rounded-lg border border-cyan-700"><Terminal className="text-cyan-400 mx-auto mb-1 md:mb-2" /><p className="font-mono text-xs md:text-sm text-cyan-300 whitespace-nowrap">/predict_response</p></div>
                        <ArrowRight size={24} className="text-slate-400"/>
                        <div className="grid grid-cols-2 gap-1 md:gap-2">{Array.from({ length: 2 }).map((_, i) => (<PatientIcon key={i} isResponder={true} delay={1.5 + i * 0.1} />))}</div>
                    </div>
                </div>
                <div className="bg-emerald-900/50 p-4 md:p-6 rounded-lg border border-emerald-700"><div className="flex flex-col md:flex-row items-center text-emerald-300"><CheckCircle size={24} className="mr-2 md:mr-4 mb-2 md:mb-0"/><div><h4 className="text-lg md:text-2xl font-bold text-left">...and guarantee a spectacular result.</h4><p className="text-sm md:text-lg text-left text-emerald-400">By pre-selecting patients with a verified biological advantage, we engineer the trial for undeniable success.</p></div></div></div>
            </motion.div>
        </div>
    </div>
);

const ValuePropSlideV2 = () => (
    <div className="space-y-12">
        <Header 
            kicker="A Co-Pilot for Every Team"
            title="Delivering Tailored Value Across the Clinical Workflow"
            kickerClass="from-purple-400 to-pink-500"
        />
        <div className="grid md:grid-cols-2 gap-8 text-left max-w-6xl mx-auto">
            <motion.div 
                className="bg-slate-800/50 p-8 rounded-2xl border-2 border-slate-700 space-y-8"
                initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: 0.2}}
            >
                <h3 className="text-3xl font-bold text-white flex items-center"><Stethoscope className="mr-3 text-cyan-400"/> For Clinicians & Trial Offices</h3>
                <ValuePoint 
                    icon={Zap}
                    title="From Days to Minutes"
                    visual={() => (<div className="flex items-center space-x-2 mt-2"><FileSearch size={48} className="text-slate-500" /><ArrowRight size={24} className="text-slate-400" /><FileText size={48} className="text-cyan-400" /></div>)}
                />
                <ValuePoint 
                    icon={ListChecks}
                    title="Crystal-Clear Eligibility"
                     visual={() => (<div className="space-y-2 mt-2"><div className="flex items-center space-x-2 p-2 bg-green-900/50 rounded-md border border-green-700"><CheckCircle className="text-green-400" size={20} /><p className="text-green-300 font-semibold">Likely: NCT012345</p></div><div className="flex items-center space-x-2 p-2 bg-amber-900/50 rounded-md border border-amber-700"><HelpCircle className="text-amber-400" size={20} /><p className="text-amber-300 font-semibold">Potential: NCT067890</p></div><div className="flex items-center space-x-2 p-2 bg-red-900/50 rounded-md border border-red-700"><XCircle className="text-red-400" size={20} /><p className="text-red-300 font-semibold">Unlikely: NCT011223</p></div></div>)}
                />
            </motion.div>
            <motion.div 
                className="bg-slate-800/50 p-8 rounded-2xl border-2 border-slate-700 space-y-8"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay: 0.4}}
            >
                <h3 className="text-3xl font-bold text-white flex items-center"><Database className="mr-3 text-cyan-400"/> For Research Teams</h3>
                 <ValuePoint 
                    icon={RefreshCw}
                    title="Always-Current Intelligence"
                     visual={() => (<div className="flex items-center space-x-2 mt-2 justify-center"><p className="font-bold text-cyan-400">LIVE</p><div className="w-12 h-6 bg-cyan-400 rounded-full p-1 flex items-center"><div className="w-4 h-4 bg-slate-900 rounded-full ml-auto"></div></div><p className="font-bold text-slate-500">SNAPSHOT</p></div>)}
                />
                 <ValuePoint 
                    icon={BrainCircuit}
                    title="Semantic Understanding"
                     visual={() => (<div className="text-center mt-2 p-4 bg-slate-900/50 rounded-lg"><p className="text-slate-300">Search for <span className="text-cyan-400 font-mono">"KRAS inhibitor"</span></p><p className="text-slate-500 text-sm">also finds trials mentioning <span className="font-mono">"G12C"</span>, <span className="font-mono">"NRAS"</span>, etc.</p></div>)}
                />
            </motion.div>
        </div>
    </div>
);

const ValuePoint = ({ icon: Icon, title, visual }: {icon: React.ComponentType<any>, title: string, visual: () => React.ReactNode}) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-slate-700/50 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
            <h4 className="font-bold text-lg text-white">{title}</h4>
            {visual && <div className="mt-2">{visual()}</div>}
        </div>
    </div>
);


const ZetaCohortSlide = () => {
    const patients = Array.from({length: 25});
    return (
        <div className="space-y-8">
            <Header 
                kicker="The Payoff"
                title="From Noise to Signal: The Zeta Cohort"
                kickerClass="from-green-400 to-emerald-500"
            />
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                 <motion.div className="text-center" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay:0.2}}>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Initial Population</h3>
                    <div className="grid grid-cols-5 gap-2 md:gap-4 w-48 md:w-64 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        {patients.map((_, i) => (
                             <User key={i} className={`w-6 h-6 md:w-8 md:h-8 ${i % 7 === 0 ? 'text-green-400' : 'text-red-500'}`} />
                        ))}
                    </div>
                </motion.div>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}}>
                    <ArrowRight className="w-12 h-12 md:w-16 md:h-16 text-slate-600"/>
                </motion.div>
                <motion.div className="text-center" initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} transition={{delay:0.7}}>
                    <div className="p-4 md:p-6 bg-slate-800 rounded-full border-2 border-purple-500">
                        <Cpu className="w-16 h-16 md:w-20 md:h-20 text-purple-400"/>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mt-2 text-white">Zeta Engine</h3>
                </motion.div>
                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}}>
                    <ArrowRight className="w-12 h-12 md:w-16 md:h-16 text-slate-600"/>
                </motion.div>
                <motion.div className="text-center" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay:1.1}}>
                     <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-2">The Zeta Cohort</h3>
                     <div className="grid grid-cols-2 gap-2 md:gap-4 w-20 md:w-24 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        {patients.filter((_,i) => i % 7 === 0).slice(0, 4).map((_, i) => (
                             <User key={i} className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
                        ))}
                    </div>
                </motion.div>
            </div>

            <div className="relative h-32 md:h-48 bg-slate-900/50 rounded-lg p-4 border border-slate-600 max-w-4xl mx-auto">
                 <h4 className="text-xl md:text-2xl font-bold text-left text-green-300">Result: Undeniable Efficacy</h4>
                 <div className="absolute inset-0">
                    <svg viewBox="0 0 200 100" className="w-full h-full opacity-20">
                         <path d="M 10 50 Q 50 80, 100 20 T 190 60" fill="none" stroke="#f87171" strokeWidth="5" strokeDasharray="5 5" />
                    </svg>
                 </div>
                 <svg viewBox="0 0 200 100" className="w-full h-full">
                    <motion.path
                        d="M 10 80 Q 50 70, 100 30 T 190 20"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="5"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
                    />
                 </svg>
            </div>
             <motion.h2 
                className="text-2xl md:text-4xl font-bold text-white max-w-4xl mx-auto px-4"
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:2.5}}
             >
                We Don't Find Responders. We <span className="text-cyan-400">Engineer a Cohort of Them.</span>
            </motion.h2>
        </div>
    );
};

const TrialAskSlide = () => (
     <div className="space-y-8">
        <Header kicker="The Opportunity" title="Partner with us to engineer your next successful trial." kickerClass="from-cyan-400 to-blue-500" />
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}} className="text-2xl text-slate-300 max-w-3xl mx-auto">
            Bring us your struggling trial or your next protocol. We will run an in-silico simulation as a fixed-fee pilot to demonstrate how we can de-risk your multi-billion dollar asset.
        </motion.p>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}>
            <button className="mt-8 text-2xl font-bold text-black bg-gradient-to-r from-cyan-300 to-purple-400 px-12 py-4 rounded-lg shadow-lg hover:scale-105 transition-transform">
                Stop Guessing. Start Engineering.
            </button>
        </motion.div>
    </div>
);

//================================================================================
// 3. MAIN APP
//================================================================================

export default function TrialsDeck() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        TrialTitleSlide,
        TrialProblemSlideV2,
        RootCauseSlide,
        HowItWorksSlide,
        InSilicoAdvantageSlide,
        FoundationSlideV2,
        KillChainVisualSlide,
        DevelopmentAdvantageSlide,
        ZetaCohortSlide,
        EconomicsExplainedSlide,
        ValuePropSlideV2,
        TrialAskSlide,
    ];

    const nextSlide = () => setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

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

