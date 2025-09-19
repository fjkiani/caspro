import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dna, BrainCircuit, Zap, TestTube2, Shield, Globe, ArrowRight, Bot, Cpu, Database,
  Cuboid, AlertTriangle, FlaskConical, Package, Banknote, Recycle, Puzzle, Target, Microscope, BookOpenCheck, Scale, Beaker, Factory, Command, ArrowDown, ArrowUp,
  ShieldCheck, XCircle, CheckCircle, Clock, DollarSign, Bomb, ShieldOff, Link, AlertOctagon, LineChart, KeyRound, Search, DraftingCompass, Gavel, Wrench, Pill, Award, BarChart3,
  Users, HelpCircle, FileText, FileX
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
    const mountRef = useRef(null);
    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 50;
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);
        const nodes = [];
        const nodeGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.6 });
        for (let i = 0; i < 150; i++) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
            node.position.set((Math.random() - 0.5) * 120, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 120);
            node.velocity = new THREE.Vector3((Math.random() - 0.5) * 0.08, (Math.random() - 0.5) * 0.08, (Math.random() - 0.5) * 0.08);
            nodes.push(node);
            scene.add(node);
        }
        const lines = new THREE.Group();
        scene.add(lines);
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            lines.children.forEach(line => {
                line.material.opacity -= 0.015;
                if (line.material.opacity <= 0) lines.remove(line);
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
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
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

const SlideLayout = ({ children, className = '' }) => (
    <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className={`relative w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 text-gray-800 overflow-hidden ${className}`}>
        <div className="relative z-10 w-full max-w-7xl space-y-12">
            {children}
        </div>
    </motion.section>
);

const SlideHeader = ({ title, subtitle, titleClassName = '', isApi = false }) => (
    <div className="space-y-4">
        <h1 className={`text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${titleClassName}`}>
            {isApi ? <span className="font-mono bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-4">{title}</span> : title}
        </h1>
        <p className="text-2xl md:text-4xl font-light text-slate-600 max-w-5xl mx-auto">
            {subtitle}
        </p>
    </div>
);

const StatCard = ({ value, label }) => (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
        <p className="text-7xl font-black text-red-500">{value}</p>
        <p className="text-2xl text-slate-600 mt-2">{label}</p>
    </div>
);

const NavigationControls = ({ current, total, onPrev, onNext }) => (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-white/50 backdrop-blur-md p-2 rounded-full border border-slate-200 shadow-md">
        <button onClick={onPrev} className="px-4 py-2 text-slate-600 rounded-full hover:bg-slate-200/70 transition-colors">&larr;</button>
        <span className="text-slate-700 font-semibold text-sm">Slide {current + 1} / {total}</span>
        <button onClick={onNext} className="px-4 py-2 text-slate-600 rounded-full hover:bg-slate-200/70 transition-colors">&rarr;</button>
    </div>
);

const CommandCard = ({ command, description, color }) => (
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

const EvidenceCard = ({ metric, metricLabel, description, source, color = 'blue' }) => (
    <div className="mt-10 border-t border-slate-200 pt-8 text-left">
        <h3 className="text-2xl font-bold text-slate-700 mb-4 flex items-center"><BookOpenCheck size={28} className="mr-3 text-slate-500"/> Evidence Protocol</h3>
        <div className="bg-slate-100 p-6 rounded-2xl flex items-center">
            <div className={`text-center pr-6 border-r border-slate-300`}>
                <p className={`text-6xl font-bold text-${color}-600`}>{metric}</p>
                <p className={`text-lg font-semibold text-${color}-800`}>{metricLabel}</p>
            </div>
            <div className="pl-6">
                 <p className="text-lg text-slate-600">{description}</p>
                 <p className="text-sm text-slate-400 font-mono mt-2">{source}</p>
            </div>
        </div>
    </div>
);

const PathOutcome = ({ score, color }) => (
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

const FailureGate = ({ question, answer, delay }) => (
    <motion.div
        className="w-full max-w-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
    >
        <div className="bg-white p-4 rounded-2xl border-2 border-dashed border-red-300 shadow-lg">
            <div className="flex items-center">
                <AlertTriangle className="text-red-500 mr-4 shrink-0" size={28} />
                <div>
                    <h3 className="text-xl font-bold text-red-800 text-left">{question}</h3>
                    <p className="text-md text-slate-600 text-left">Traditional Answer: <span className="font-semibold">{answer}</span></p>
                </div>
            </div>
        </div>
    </motion.div>
);

const Connector = ({ delay }) => (
     <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay }}
     >
        <ArrowDown size={32} className="text-slate-400 my-2" />
    </motion.div>
);

const EngineSegment = ({ icon: Icon, color, title, description, delay }) => (
    <motion.div
        className="text-left"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
    >
        <div className={`flex items-center text-${color}-600 mb-2`}>
            <Icon size={28} className="mr-3" />
            <h3 className="text-2xl font-bold">{title}</h3>
        </div>
        <p className="text-lg text-slate-600 ml-10">{description}</p>
    </motion.div>
);

const FunnelPoint = ({ number, label, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="absolute z-10"
    >
        <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-slate-200 text-center">
            <p className="text-2xl font-bold text-blue-800">{number}</p>
            <p className="text-sm text-slate-600 whitespace-nowrap">{label}</p>
        </div>
        <div className="mx-auto mt-2 w-px h-8 bg-slate-300"></div>
        <div className="mx-auto w-4 h-4 bg-white rounded-full border-2 border-slate-400 shadow-md"></div>
    </motion.div>
);

const InterventionPoint = ({ icon: Icon, color, title, subtitle, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="absolute z-20"
    >
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200">
            <div className="flex items-center">
                <div className={`bg-${color}-500 text-white rounded-full p-3 mr-4`}>
                    <Icon size={32} />
                </div>
                <div>
                    <h3 className={`text-2xl font-bold text-${color}-700 text-left`}>{title}</h3>
                    <p className="text-lg text-slate-600 text-left">{subtitle}</p>
                </div>
            </div>
        </div>
    </motion.div>
);

const ProcessStage = ({ text, color, delay, isFirst, isLast }) => {
    const baseClasses = `h-20 flex items-center justify-center font-semibold text-white text-lg relative px-8`;
    const shapeClasses = `
        before:content-[''] before:absolute before:top-0 before:right-[-2.5rem] before:w-0 before:h-0 
        before:border-t-[2.5rem] before:border-t-transparent
        before:border-b-[2.5rem] before:border-b-transparent
        before:border-l-[2.5rem]
        after:content-[''] after:absolute after:top-0 after:left-0 after:w-0 after:h-0
        after:border-t-[2.5rem] after:border-t-transparent
        after:border-b-[2.5rem] after:border-b-transparent
        after:border-l-[2.5rem] after:border-l-white
    `;
    
    return (
        <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay }}
        >
            <div className={`${baseClasses} ${color} ${isFirst ? 'rounded-l-lg' : ''} ${isLast ? 'rounded-r-lg' : ''} ${!isLast ? `before:border-l-${color.split('-')[1]}-${color.split('-')[2]}`: ''} ${!isFirst ? shapeClasses : ''}`}>
               {text}
            </div>
        </motion.div>
    );
};

const DossierItem = ({ icon: Icon, text, color, delay }) => (
    <motion.div
        className="flex items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
    >
        <Icon className={`w-7 h-7 mr-3 text-${color}-500 shrink-0`} />
        <p className="text-base text-slate-700 text-left">{text}</p>
    </motion.div>
);

const PatientIcon = ({ isResponder, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
    >
        <Users className={isResponder ? 'text-emerald-500' : 'text-slate-400'} />
    </motion.div>
);


//================================================================================
// 2. SLIDE COMPONENTS
//================================================================================

const TitleSlide = () => (
    <section className="relative w-full h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 text-gray-800 overflow-hidden">
        <DigitalSynapseBackground />
        <Brand />
        <div className="relative z-10 w-full px-4 space-y-8">
            <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-sm">The Certainty Engine</h1>
            <h2 className="text-3xl md:text-5xl font-light text-slate-600 max-w-5xl mx-auto">Transforming a $2.6 Billion Gamble into a Deterministic Science</h2>
        </div>
    </section>
);

const TheBattlefieldSlide = () => {
    const discoveryStages = [
        { text: "Exploratory", color: "bg-slate-400" },
        { text: "Discovery", color: "bg-blue-400" },
        { text: "Optimization", color: "bg-blue-500" },
        { text: "Preclinical", color: "bg-slate-500" },
        { text: "Clinical (Ph I / Ph IIa)", color: "bg-blue-600" },
    ];
    const developmentStages = [
        { text: "Clinical (Ph IIb)", color: "bg-slate-400" },
        { text: "Clinical (Ph III)", color: "bg-blue-500" },
        { text: "Registration", color: "bg-slate-500" },
        { text: "Post Launch (Ph IV)", color: "bg-blue-700" },
    ];
    return (
    <SlideLayout>
        <SlideHeader 
            title="The Traditional Battlefield"
            subtitle="The old doctrine of drug development: a long, catastrophically inefficient, and high-risk journey."
            titleClassName="from-slate-700 to-slate-900"
        />
        <div className="w-full max-w-6xl mx-auto space-y-10">
            <div>
                 <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="text-2xl font-bold text-slate-700 mb-4 text-left">Discovery & Early Clinical Development</motion.h2>
                <div className="flex">
                    {discoveryStages.map((stage, index) => (
                        <ProcessStage key={stage.text} text={stage.text} color={stage.color} delay={0.4 + index * 0.15} isFirst={index === 0} isLast={index === discoveryStages.length - 1} />
                    ))}
                </div>
            </div>
            <div className="ml-auto w-3/4">
                 <motion.h2 initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}} className="text-2xl font-bold text-slate-700 mb-4 text-left">Full Clinical Development</motion.h2>
                <div className="flex">
                    {developmentStages.map((stage, index) => (
                        <ProcessStage key={stage.text} text={stage.text} color={stage.color} delay={1.4 + index * 0.15} isFirst={index === 0} isLast={index === developmentStages.length - 1} />
                    ))}
                </div>
            </div>
        </div>
    </SlideLayout>
);
}

const DrugFunnelSlide = () => {
    return (
    <SlideLayout>
        <SlideHeader 
            title="The War of Attrition"
            subtitle="The numbers reveal a process defined by catastrophic, systemic failure. This is not a pipeline; it's a graveyard."
            titleClassName="from-slate-700 to-slate-900"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
            <StatCard value="<5%" label="Success Rate" />
            <StatCard value="10-15" label="Years to Market" />
            <StatCard value="$2.6B" label="Cost of Failure" />
        </div>
        <motion.div 
            className="w-full max-w-5xl mx-auto mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <p className="text-2xl text-slate-700">They start with 10,000 compounds to get <strong className="text-red-600">one</strong> approved drug. It's a system built on hope, prayer, and a tremendous amount of wasted money.</p>
        </motion.div>
    </SlideLayout>
);
}

const SolutionFunnelSlide = () => {
    return (
    <SlideLayout>
        <SlideHeader 
            title="Inverting the Funnel of Attrition"
            subtitle="The CrisPRO.ai doctrine transforms their graveyard pipeline into an assembly line for success."
            titleClassName="from-emerald-600 to-teal-500"
        />
        <div className="w-full max-w-6xl mx-auto mt-32">
            <div className="relative h-64">
                <motion.div 
                    className="absolute top-0 left-0 h-full bg-blue-600"
                    initial={{ width: "100%" }}
                    animate={{ width: "80%"}}
                    transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.5 }}
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}
                >
                     <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-400 opacity-80"></div>
                </motion.div>
                <div className="absolute -top-16 left-[20%]">
                    <InterventionPoint icon={Target} color="blue" title="Prediction" subtitle="We Deliver a Verdict" delay={1.0} />
                </div>
                 <div className="absolute top-1/2 -translate-y-1/2 left-[45%]">
                    <InterventionPoint icon={Factory} color="purple" title="Generation" subtitle="We Engineer the Solution" delay={1.5} />
                </div>
                 <div className="absolute bottom-[-4rem] left-[70%]">
                    <InterventionPoint icon={Beaker} color="orange" title="Confirmation" subtitle="We Validate the Outcome" delay={2.0} />
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.5 }}
                    className="absolute top-1/2 -translate-y-1/2 right-0 transform translate-x-1/4 z-10"
                >
                    <div className="bg-emerald-100 p-8 rounded-2xl border-2 border-emerald-300 shadow-xl text-center">
                        <Shield size={48} className="mx-auto text-emerald-600 mb-2"/>
                        <h3 className="text-3xl font-bold text-emerald-800">A Portfolio of</h3>
                        <p className="text-2xl font-semibold text-emerald-700">De-Risked Assets</p>
                    </div>
                </motion.div>
            </div>
             <div className="relative mt-2 flex items-center">
                 <div className="flex h-16 w-full rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 shadow-inner items-center justify-center">
                     <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 2.8 }} className="text-2xl font-bold text-white">Discovery Phase: Weeks, Not Years</motion.p>
                </div>
            </div>
        </div>
    </SlideLayout>
);
}

const TwoDoctrinesSlide = () => (
    <SlideLayout>
        <SlideHeader 
            title="A Two-Pronged Attack on Ambiguity"
            subtitle="Our platform is built on two core doctrines: Prediction and Generation."
            titleClassName="from-slate-700 to-slate-900"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white p-8 rounded-2xl border-2 border-blue-200 shadow-xl text-center flex flex-col">
                <div className="flex items-center justify-center text-blue-600 mb-4"><Target size={32} className="mr-3"/><h3 className="text-4xl font-bold">The Prediction Doctrine</h3></div>
                <p className="text-2xl text-slate-600 mt-2 flex-grow">We don't guess at targets; we deliver a definitive, data-driven verdict.</p>
                <div className="mt-8"><Gavel size={64} className="text-blue-500 mx-auto"/></div>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-purple-200 shadow-xl text-center flex flex-col">
                 <div className="flex items-center justify-center text-purple-600 mb-4"><Factory size={32} className="mr-3"/><h3 className="text-4xl font-bold">The Generation Doctrine</h3></div>
                <p className="text-2xl text-slate-600 mt-2 flex-grow">We don't discover leads by chance; we engineer them with cold, hard intention.</p>
                 <div className="mt-8"><DraftingCompass size={64} className="text-purple-500 mx-auto"/></div>
            </div>
        </div>
    </SlideLayout>
);

const PredictVariantImpactSlide = () => (
    <SlideLayout>
        <SlideHeader title="/predict_variant_impact" subtitle="Delivers mathematical proof of a catastrophic functional error, turning 'maybe' into a definitive verdict." titleClassName="from-blue-600 to-cyan-500" isApi />
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-amber-50 p-8 rounded-2xl border-2 border-dashed border-amber-400 text-left h-full flex flex-col">
                    <div className="flex items-center text-amber-600 mb-6"><AlertTriangle size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Problem: VUS Paralysis</h3></div>
                    <p className="text-xl text-amber-800 mb-6">A "Variant of Uncertain Significance" is a hard stop for R&D, creating a cascade of negative consequences:</p>
                    <div className="space-y-4 text-lg text-amber-900 flex-grow">
                        <p className="flex items-start"><Microscope size={24} className="mr-3 mt-1 text-amber-600 shrink-0"/> <span className="font-semibold">Paralyzed Research:</span> Promising projects stall and die without a clear signal.</p>
                        <p className="flex items-start"><Clock size={24} className="mr-3 mt-1 text-amber-600 shrink-0"/> <span className="font-semibold">Delayed Patient Care:</span> Actionable insights are postponed for years.</p>
                        <p className="flex items-start"><DollarSign size={24} className="mr-3 mt-1 text-amber-600 shrink-0"/> <span className="font-semibold">Wasted Billions:</span> Capital is incinerated chasing ambiguous, dead-end targets.</p>
                    </div>
                </div>
                <div className="bg-emerald-50 p-8 rounded-2xl border-2 border-emerald-400 text-left h-full flex flex-col">
                     <div className="flex items-center text-emerald-600 mb-4"><ShieldCheck size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Solution: A Verdict</h3></div>
                    <p className="text-xl text-emerald-800 mb-4">The Zeta Score replaces uncertainty by calculating <strong className="text-emerald-900">how severely a mutation breaks the fundamental rules of biology.</strong></p>
                    <div className="flex-grow"><ZetaScoreGauge /></div>
                </div>
            </div>
        </div>
    </SlideLayout>
);

const PredictVariantImpactEvidenceSlide = () => (
    <SlideLayout>
         <SlideHeader title="The Evidence Protocol" subtitle="Grounding our verdict in state-of-the-art, undeniable performance." titleClassName="from-slate-600 to-slate-800" />
         <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl max-w-5xl mx-auto">
            <EvidenceCard metric="≈0.95" metricLabel="AUROC" description="On key oncology targets like BRCA1, our classifier achieves SOTA performance, outperforming other models for predicting pathogenic variants." source="(Evo 2 Paper, Methods 4.3.16)" />
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
                <div className="bg-amber-100 p-6 rounded-lg border border-amber-300"><div className="flex items-center text-amber-800"><ShieldOff size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">Outcome: Cancer Adapts & Wins</h4><p className="text-lg text-left">The therapy fails. The cancer finds another pathway to survive, wasting time, money, and lives.</p></div></div></div>
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
                <div className="bg-emerald-100 p-6 rounded-lg border border-emerald-300"><div className="flex items-center text-emerald-800"><Bomb size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">Outcome: Catastrophic Kill</h4><p className="text-lg text-left">The cancer collapses, unable to survive without its critical component. The therapy succeeds. End of story.</p></div></div></div>
            </div>
        </div>
    </SlideLayout>
);

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
                    <div className="flex space-x-2"><FlaskConical className="text-slate-400" /><FlaskConical className="text-slate-400" /><FlaskConical className="text-slate-400" /></div>
                    <div className="w-48 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-t-[80px] border-t-slate-300 my-4"></div>
                    <div className="bg-amber-100 p-4 rounded-lg border border-amber-300"><h4 className="text-2xl font-bold text-amber-800">1 Potential Lead</h4></div>
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
                         <div className="flex justify-center space-x-4 mt-2"><Shield className="text-emerald-600"/><Dna className="text-emerald-600"/><Bot className="text-emerald-600"/></div>
                    </div>
                </div>
            </div>
        </div>
    </SlideLayout>
);

const GenerateGuideRnaSlide = () => (
    <SlideLayout>
        <SlideHeader title="/generate_optimized_guide_rna" subtitle="Forging a precision CRISPR therapeutic, not just finding one." isApi titleClassName="from-purple-600 to-pink-500" />
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div className="bg-amber-50 p-8 rounded-2xl border-2 border-dashed border-amber-400 text-left flex flex-col">
                    <div className="flex items-center text-amber-600 mb-4"><AlertTriangle size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Problem: Off-the-Shelf Tools</h3></div>
                    <p className="text-lg text-amber-800 flex-grow">Standard guide RNAs are generic tools. They often have low on-target efficacy and high risks of dangerous off-target effects, making them unsuitable for precision therapeutics.</p>
                    <div className="text-center mt-6"><Wrench size={48} className="text-amber-500 inline-block"/><p className="text-2xl font-bold text-amber-700 mt-2">Blunt Instrument</p></div>
                </div>
                <div className="bg-emerald-50 p-8 rounded-2xl border-2 border-emerald-400 text-left flex flex-col">
                    <div className="flex items-center text-emerald-600 mb-4"><ShieldCheck size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Solution: Bespoke Weaponry</h3></div>
                    <p className="text-lg text-emerald-800 flex-grow">Our generative engine designs a guide RNA specifically for the target, optimized from first principles for maximum efficacy and minimal off-target risk.</p>
                    <div className="text-center mt-6"><Microscope size={48} className="text-emerald-500 inline-block"/><p className="text-2xl font-bold text-emerald-700 mt-2">Surgical Tool</p></div>
                </div>
            </div>
        </div>
    </SlideLayout>
);

const GuideRnaImpactSlide = () => (
    <SlideLayout>
        <SlideHeader title="The Impact of Precision Engineering" subtitle="The difference between a blunt instrument and a surgical tool." titleClassName="from-purple-600 to-pink-500" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-slate-800">Generic Guide RNA (The "Blunt Instrument")</h3><p className="text-xl text-slate-500 mt-2">High risk of collateral damage.</p>
                <div className="flex-grow flex items-center justify-center my-8">
                    <div className="relative w-64 h-64">
                        <div className="absolute inset-0 border-4 border-dashed border-slate-300 rounded-full"></div>
                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center"><Dna className="text-white"/></motion.div>
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5}} className="absolute top-10 left-12 w-4 h-4 bg-red-500 rounded-full"></motion.div>
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7}} className="absolute bottom-16 right-8 w-4 h-4 bg-red-500 rounded-full"></motion.div>
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}} className="absolute top-24 right-16 w-4 h-4 bg-red-500 rounded-full"></motion.div>
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.1}} className="absolute bottom-8 left-20 w-4 h-4 bg-red-500 rounded-full"></motion.div>
                    </div>
                </div>
                <div className="bg-amber-100 p-6 rounded-lg border border-amber-300"><div className="flex items-center text-amber-800"><XCircle size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">Outcome: Unpredictable Off-Target Effects</h4><p className="text-lg text-left">The therapy can cause unintended, dangerous mutations, leading to safety failures.</p></div></div></div>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-emerald-400 shadow-2xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-emerald-800">Engineered Guide RNA (The "Surgical Tool")</h3><p className="text-xl text-emerald-600 mt-2">Maximum on-target efficacy.</p>
                <div className="flex-grow flex items-center justify-center my-8">
                    <div className="relative w-64 h-64">
                        <div className="absolute inset-0 border-4 border-emerald-300 rounded-full"></div>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 1 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center"><Dna className="text-white"/></motion.div>
                        <motion.div initial={{ width: 0 }} animate={{ width: '50%' }} transition={{ duration: 1, ease: 'easeOut' }} className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-emerald-400 to-blue-500"></motion.div>
                    </div>
                </div>
                <div className="bg-emerald-100 p-6 rounded-lg border border-emerald-300"><div className="flex items-center text-emerald-800"><CheckCircle size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">Outcome: Precision Strike</h4><p className="text-lg text-left">The guide RNA hits its intended target with minimal collateral damage, ensuring safety and efficacy.</p></div></div></div>
            </div>
        </div>
    </SlideLayout>
);

const GenerateProteinSlide = () => (
     <SlideLayout>
        <SlideHeader title="/generate_therapeutic_protein" subtitle="Engineering novel, patent-worthy biologics from a blank slate." isApi titleClassName="from-purple-600 to-pink-500" />
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                <div className="bg-amber-50 p-8 rounded-2xl border-2 border-dashed border-amber-400 text-left flex flex-col">
                    <div className="flex items-center text-amber-600 mb-4"><AlertTriangle size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Problem: Serendipity & Luck</h3></div>
                    <p className="text-lg text-amber-800 flex-grow">Discovering novel biologics is often a matter of dumb luck. It's a slow, unpredictable process that relies on finding the right molecule by chance rather than by intelligent design.</p>
                </div>
                <div className="bg-emerald-50 p-8 rounded-2xl border-2 border-emerald-400 text-left flex flex-col">
                    <div className="flex items-center text-emerald-600 mb-4"><ShieldCheck size={32} className="mr-3" /><h3 className="text-3xl font-bold">The Solution: Intentional Creation</h3></div>
                    <p className="text-lg text-emerald-800 flex-grow">We bypass discovery entirely. Our generative AI designs novel proteins with superior binding affinity and de-risked safety profiles, creating patent-worthy assets on demand.</p>
                </div>
            </div>
        </div>
    </SlideLayout>
);

const ProteinEngineeringImpactSlide = () => (
    <SlideLayout>
        <SlideHeader title="The Advantage of an Engineered Biologic" subtitle="The difference between finding a key and forging one from a blueprint." titleClassName="from-purple-600 to-pink-500" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-slate-800">Discovered Molecule (Low Affinity)</h3><p className="text-xl text-slate-500 mt-2">An imperfect, unpredictable fit.</p>
                <div className="flex-grow flex items-center justify-center my-8">
                    <div className="flex items-center space-x-4">
                         <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}><Puzzle size={80} className="text-slate-500" strokeWidth={1}/></motion.div>
                         <div className="w-24 h-24 bg-amber-200 border-2 border-amber-400 rounded-2xl flex items-center justify-center"><Target size={48} className="text-amber-500"/></div>
                    </div>
                </div>
                <div className="bg-amber-100 p-6 rounded-lg border border-amber-300"><div className="flex items-center text-amber-800"><XCircle size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">Outcome: Low Potency & Side Effects</h4><p className="text-lg text-left">The molecule binds weakly and may interact with other proteins, leading to low efficacy and safety concerns.</p></div></div></div>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-emerald-400 shadow-2xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-emerald-800">Engineered Biologic (High Affinity)</h3><p className="text-xl text-emerald-600 mt-2">A perfect, intentional fit.</p>
                 <div className="flex-grow flex items-center justify-center my-8">
                     <div className="flex items-center space-x-4">
                        <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}><Bot size={80} className="text-purple-600" strokeWidth={1.5}/></motion.div>
                         <div className="w-24 h-24 bg-emerald-200 border-2 border-emerald-400 rounded-2xl flex items-center justify-center"><Target size={48} className="text-emerald-600"/></div>
                    </div>
                </div>
                <div className="bg-emerald-100 p-6 rounded-lg border border-emerald-300"><div className="flex items-center text-emerald-800"><CheckCircle size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">Outcome: High Potency & Safety</h4><p className="text-lg text-left">The protein binds to its target with high specificity, maximizing therapeutic effect and minimizing safety risks.</p></div></div></div>
            </div>
        </div>
    </SlideLayout>
);


const LeadDiscoveryEvidenceSlide = () => (
    <SlideLayout>
         <SlideHeader title="The Evidence Protocol" subtitle="Grounding our generative capabilities in proven biological function." titleClassName="from-slate-600 to-slate-800" />
         <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl max-w-5xl mx-auto space-y-6">
            <EvidenceCard metric="~70%" metricLabel="Pfam-hit rate" description="Our generated genomes are biologically coherent and functional, a dramatic improvement over previous models (~18%)." source="(Evo 2 Paper, Fig. 5H)" color="purple" />
            <EvidenceCard metric="Validated" metricLabel="3D Structures" description="Our generated protein complexes are confirmed by AlphaFold 3 to fold into plausible, functional 3D structures." source="(Evo 2 Paper, Fig. 5F)" color="purple" />
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
                        <motion.div animate={{ x: [0, -10, 0] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}>
                            <KeyRound size={64} className="text-slate-500"/>
                        </motion.div>
                        <div className="w-24 h-16 bg-amber-200 border-2 border-amber-400 rounded-md flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-amber-500 rounded-full"></div>
                        </div>
                    </div>
                </div>
                <div className="bg-amber-100 p-6 rounded-lg border border-amber-300"><div className="flex items-center text-amber-800"><XCircle size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">Outcome: Therapeutic Failure</h4><p className="text-lg text-left">The engineered protein has no effect. The disease pathway remains active.</p></div></div></div>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-emerald-400 shadow-2xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-emerald-800">Engineered Fit</h3>
                <p className="text-xl text-emerald-600 mt-2">The key fits. The lock turns.</p>
                 <div className="flex-grow flex items-center justify-center my-8">
                    <div className="flex items-center space-x-4">
                        <motion.div animate={{ x: [0, 20, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                            <KeyRound size={64} className="text-purple-600"/>
                        </motion.div>
                        <motion.div className="w-24 h-16 bg-emerald-200 border-2 border-emerald-400 rounded-md flex items-center justify-center" animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>
                            <CheckCircle size={32} className="text-emerald-600"/>
                        </motion.div>
                    </div>
                </div>
                <div className="bg-emerald-100 p-6 rounded-lg border border-emerald-300">
                     <div className="flex items-center text-emerald-800"><ShieldCheck size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">Outcome: Function Disabled</h4><p className="text-lg text-left">The therapeutic binds and neutralizes the target. The desired biological outcome is achieved.</p></div></div></div>
            </div>
        </div>
    </SlideLayout>
);

const GroundTruthSlide = () => (
    <SlideLayout>
        <SlideHeader 
            title="Step 1: The Ground Truth"
            subtitle="Establishing the benchmark with the experimental gold standard: Deep Mutational Scanning (DMS)."
            titleClassName="from-slate-600 to-slate-800"
        />
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl max-w-5xl mx-auto">
            <div className="flex flex-col items-center"><div className="flex items-center text-slate-700"><FlaskConical size={40} className="mr-4"/><h2 className="text-4xl font-bold">The Wet-Lab Experiment</h2></div><p className="text-xl text-slate-500 mt-2">Measuring biological reality, one variant at a time.</p></div>
            <div className="grid grid-cols-3 gap-8 text-center my-10">
                <div className="bg-slate-100 p-6 rounded-xl"><Microscope size={48} className="mx-auto text-slate-500"/><h3 className="text-xl font-semibold mt-4">Thousands of Variants</h3><p className="text-slate-600">Each protein variant is physically created and tested.</p></div>
                <div className="bg-slate-100 p-6 rounded-xl"><Clock size={48} className="mx-auto text-slate-500"/><h3 className="text-xl font-semibold mt-4">Months of Work</h3><p className="text-slate-600">A slow, painstaking, and resource-intensive process.</p></div>
                <div className="bg-slate-100 p-6 rounded-xl"><DollarSign size={48} className="mx-auto text-slate-500"/><h3 className="text-xl font-semibold mt-4">High Cost</h3><p className="text-slate-600">Extremely expensive to run at scale.</p></div>
            </div>
            <div className="border-t border-slate-200 pt-8"><div className="flex items-center justify-center text-emerald-700"><BarChart3 size={40} className="mr-4"/><h2 className="text-4xl font-bold">The Outcome: A Gold-Standard Dataset</h2></div><p className="text-xl text-slate-500 mt-2 max-w-3xl mx-auto">The DMS assay produces a set of highly accurate experimental fitness scores—the undisputed "ground truth" of a variant's biological function.</p></div>
        </div>
    </SlideLayout>
);

const PredictionSlide = () => (
    <SlideLayout>
        <SlideHeader 
            title="Step 2: The Prediction"
            subtitle="Our in-silico engine generates a parallel dataset in seconds, not months."
            titleClassName="from-blue-600 to-cyan-500"
        />
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl border border-slate-200 shadow-2xl max-w-5xl mx-auto">
            <div className="flex flex-col items-center"><div className="flex items-center text-blue-700"><Cpu size={40} className="mr-4"/><h2 className="text-4xl font-bold">The Computational Verdict</h2></div><p className="text-xl text-slate-500 mt-2">Predicting biological reality from first principles.</p></div>
            <div className="grid grid-cols-3 gap-8 text-center my-10">
                <div className="bg-blue-100 p-6 rounded-xl"><Zap size={48} className="mx-auto text-blue-500"/><h3 className="text-xl font-semibold mt-4">Thousands of Variants</h3><p className="text-slate-600">The same set of variants is analyzed computationally.</p></div>
                <div className="bg-blue-100 p-6 rounded-xl"><Clock size={48} className="mx-auto text-blue-500"/><h3 className="text-xl font-semibold mt-4">Seconds of Work</h3><p className="text-slate-600">A rapid, scalable, and fully automated process.</p></div>
                <div className="bg-blue-100 p-6 rounded-xl"><DollarSign size={48} className="mx-auto text-blue-500"/><h3 className="text-xl font-semibold mt-4">Fraction of the Cost</h3><p className="text-slate-600">Near-zero marginal cost to run at scale.</p></div>
            </div>
            <div className="border-t border-slate-200 pt-8"><div className="flex items-center justify-center text-emerald-700"><BarChart3 size={40} className="mr-4"/><h2 className="text-4xl font-bold">The Outcome: A High-Certainty Prediction</h2></div><p className="text-xl text-slate-500 mt-2 max-w-3xl mx-auto">The AI model outputs a predicted fitness score for every variant, creating a dataset that mirrors the experimental one.</p></div>
        </div>
    </SlideLayout>
);

const CorrelationProofSlide = () => (
    <SlideLayout>
        <SlideHeader title="Step 3: The Proof of Correlation" subtitle="Here's how we know our computational verdict can be trusted." titleClassName="from-blue-600 to-teal-500" />
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

const AnatomyOfFailureSlide = () => (
    <SlideLayout>
        <SlideHeader title="The Anatomy of Failure" subtitle="Traditional R&D is a cascade of unanswered questions, where each uncertainty adds to the final cost." titleClassName="from-red-600 to-orange-500" />
        <div className="flex flex-col items-center">
            <FailureGate question="Is the Target Correct?" answer="Maybe. (The VUS Problem)" delay={0.2} />
            <Connector delay={0.4} />
            <FailureGate question="Is it the Cancer's Achilles' Heel?" answer="Maybe. (The Dependency Problem)" delay={0.6} />
            <Connector delay={0.8} />
            <FailureGate question="Can We Find an Effective Drug?" answer="Maybe. (The Discovery Problem)" delay={1.0} />
            <Connector delay={1.2} />
            <FailureGate question="Will It Actually Work In Vitro?" answer="Maybe. (The 'Black Box' Problem)" delay={1.4} />
            <Connector delay={1.6} />
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 1.8 }} className="bg-red-100 p-8 rounded-2xl border-2 border-red-400 w-full max-w-3xl">
                <div className="flex items-center justify-center"><DollarSign size={48} className="text-red-600 mr-4"/><div><h2 className="text-4xl font-bold text-red-800">The Cumulative Cost of "Maybe"</h2><p className="text-6xl font-black text-red-600 mt-2">$2.6 Billion</p></div></div>
            </motion.div>
        </div>
    </SlideLayout>
);

const TheCertaintyEngineSlide = () => (
    <SlideLayout>
        <SlideHeader title="The Certainty Engine" subtitle="Our integrated platform transforms unanswered questions into de-risked assets." titleClassName="from-blue-600 to-emerald-500" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="space-y-6">
                 <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.2}} className="text-2xl font-semibold text-slate-500 text-left p-4 border-l-4 border-slate-300">Is the Target Correct?</motion.div>
                 <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} className="text-2xl font-semibold text-slate-500 text-left p-4 border-l-4 border-slate-300">Can We Build an Effective Drug?</motion.div>
                 <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}} className="text-2xl font-semibold text-slate-500 text-left p-4 border-l-4 border-slate-300">Will It Actually Work?</motion.div>
            </div>
            <motion.div className="relative flex flex-col items-center" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
                <div className="bg-white p-8 rounded-full border-4 border-slate-200 shadow-2xl z-10"><h2 className="text-3xl font-bold text-gray-800">CrisPRO.ai</h2><p className="text-slate-500 font-semibold">ENGINE</p></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="w-80 h-80 border-4 border-dashed border-blue-300 rounded-full"></motion.div></div>
            </motion.div>
            <div className="space-y-4">
                <EngineSegment icon={Gavel} color="blue" title="A Verdict" description="We deliver a definitive 'Yes/Go' on any target." delay={1.0} />
                <EngineSegment icon={DraftingCompass} color="purple" title="An Engineered Asset" description="We forge optimized therapeutics from first principles." delay={1.2} />
                <EngineSegment icon={CheckCircle} color="orange" title="A Confirmed Outcome" description="We validate the therapeutic effect in-silico." delay={1.4} />
            </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.6 }} className="flex items-center justify-center">
            <ArrowRight size={48} className="text-slate-400 mx-8"/>
             <div className="bg-emerald-100 p-6 rounded-2xl border-2 border-emerald-300 shadow-lg relative">
                <div className="absolute top-3 right-3 bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded-full">RUO</div>
                <div className="flex items-center"><Shield size={48} className="text-emerald-600 mr-4"/><div><h2 className="text-3xl font-bold text-emerald-800 text-left">The Deliverable</h2><p className="text-xl text-emerald-700 text-left">An IND-Ready Asset</p></div></div>
            </div>
        </motion.div>
    </SlideLayout>
);

const DevelopmentAdvantageSlide_Phase2 = () => (
    <SlideLayout>
        <SlideHeader 
            title="Phase II: Engineering a Win"
            subtitle="The right drug in the wrong patient is still a failure. We make sure that never happens."
            titleClassName="from-green-600 to-teal-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white p-8 rounded-2xl border-2 border-slate-200 shadow-xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-slate-800">The Traditional Trial</h3><p className="text-xl text-slate-500 mt-2">Hope is the Strategy</p>
                <div className="flex-grow flex flex-col items-center justify-center my-8">
                    <p className="font-semibold text-slate-600 mb-4">Enroll a broad patient population...</p>
                    <div className="grid grid-cols-5 gap-4 w-64">
                        {Array.from({ length: 15 }).map((_, i) => (<PatientIcon key={i} isResponder={i % 7 === 0} delay={0.5 + i * 0.05} />))}
                    </div>
                </div>
                <div className="bg-amber-100 p-6 rounded-lg border border-amber-300"><div className="flex items-center text-amber-800"><XCircle size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">...and hope for a signal.</h4><p className="text-lg text-left">The signal from a few responders is drowned out by the noise from non-responders.</p></div></div></div>
            </div>
            <div className="bg-white p-8 rounded-2xl border-2 border-emerald-400 shadow-2xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-emerald-800">The CrisPRO.ai Trial</h3><p className="text-xl text-emerald-600 mt-2">Certainty is the Strategy</p>
                 <div className="flex-grow flex flex-col items-center justify-center my-8">
                    <p className="font-semibold text-slate-600 mb-4">Computationally filter for ideal candidates...</p>
                    <div className="flex items-center space-x-4">
                        <div className="grid grid-cols-3 gap-2">{Array.from({ length: 6 }).map((_, i) => (<PatientIcon key={i} isResponder={i % 3 === 0} delay={0.5 + i * 0.1} />))}</div>
                        <ArrowRight size={32} className="text-slate-400"/>
                        <div className="bg-blue-100 p-4 rounded-lg border border-blue-300"><Command className="text-blue-600 mx-auto mb-2" /><p className="font-mono text-sm text-blue-800 whitespace-nowrap">/predict_gene_essentiality</p></div>
                        <ArrowRight size={32} className="text-slate-400"/>
                        <div className="grid grid-cols-2 gap-2">{Array.from({ length: 2 }).map((_, i) => (<PatientIcon key={i} isResponder={true} delay={1.5 + i * 0.1} />))}</div>
                    </div>
                </div>
                <div className="bg-emerald-100 p-6 rounded-lg border border-emerald-300"><div className="flex items-center text-emerald-800"><CheckCircle size={32} className="mr-4"/><div><h4 className="text-2xl font-bold text-left">...and guarantee a spectacular result.</h4><p className="text-lg text-left">By pre-selecting patients with a verified Achilles' heel, we engineer the trial for undeniable success.</p></div></div></div>
            </div>
        </div>
    </SlideLayout>
);

const DevelopmentAdvantageSlide_Phase3 = () => (
    <SlideLayout>
        <SlideHeader 
            title="Phase III: The Glass Box IND"
            subtitle="Turning a multi-billion dollar gamble into a calculated, de-risked investment."
            titleClassName="from-green-600 to-teal-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white p-6 rounded-2xl border-2 border-slate-200 shadow-xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-slate-800">The Traditional IND Application</h3><p className="text-xl text-slate-500 mt-2">The "Black Box"</p>
                <div className="flex-grow flex items-center justify-center my-6">
                    <motion.div className="w-72 h-72 bg-slate-800 rounded-2xl flex items-center justify-center shadow-2xl" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
                        <HelpCircle size={80} className="text-slate-500"/>
                    </motion.div>
                </div>
                <div className="bg-amber-100 p-4 rounded-lg border border-amber-300"><div className="flex items-center text-amber-800"><FileX size={28} className="mr-3"/><div><h4 className="text-xl font-bold text-left">The Ask: A Leap of Faith</h4><p className="text-base text-left">"It worked in mice, please let us put it in humans." Regulators and investors are asked to trust a black box.</p></div></div></div>
            </div>
            <div className="bg-white p-6 rounded-2xl border-2 border-emerald-400 shadow-2xl text-center flex flex-col">
                <h3 className="text-3xl font-bold text-emerald-800">The CrisPRO.ai IND Dossier</h3><p className="text-xl text-emerald-600 mt-2">The "Glass Box"</p>
                 <div className="flex-grow flex items-center justify-center my-6">
                    <div className="w-80 h-72 bg-blue-50/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-200 shadow-2xl space-y-3">
                        <DossierItem icon={Dna} text="The precise variant it targets." color="blue" delay={0.5} />
                        <DossierItem icon={ShieldCheck} text="Computational proof of on-target efficacy." color="emerald" delay={0.7} />
                        <DossierItem icon={ShieldOff} text="Comprehensive minimal off-target risk profile." color="amber" delay={0.9} />
                        <DossierItem icon={BrainCircuit} text="The exact biological mechanism of action." color="purple" delay={1.1} />
                        <DossierItem icon={BarChart3} text="Patient stratification strategy to maximize efficacy." color="teal" delay={1.3} />
                    </div>
                </div>
                <div className="bg-emerald-100 p-4 rounded-lg border border-emerald-300">
                     <div className="flex items-center text-emerald-800"><FileText size={28} className="mr-3"/><div><h4 className="text-xl font-bold text-left">The Ask: A Calculated Investment</h4><p className="text-base text-left">We don't just show regulators *that* it works; we show them *why* it works with unprecedented transparency.</p></div></div></div>
            </div>
        </div>
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
        TheBattlefieldSlide,
        DrugFunnelSlide,
        SolutionFunnelSlide,
        TwoDoctrinesSlide,
        PredictVariantImpactSlide,
        PredictVariantImpactEvidenceSlide,
        ZetaScoreImpactSlide,
        PredictGeneEssentialitySlide,
        EssentialityImpactSlide,
        LeadDiscoveryImpactSlide,
        GenerateGuideRnaSlide,
        GuideRnaImpactSlide,
        GenerateProteinSlide,
        ProteinEngineeringImpactSlide,
        LeadDiscoveryEvidenceSlide,
        PredictProteinFunctionalitySlide_Part1,
        FunctionalityImpactSlide,
        GroundTruthSlide,
        PredictionSlide,
        CorrelationProofSlide,
        AnatomyOfFailureSlide,
        TheCertaintyEngineSlide,
        DevelopmentAdvantageSlide_Phase2,
        DevelopmentAdvantageSlide_Phase3,
        EconomicFailureSlide,
        IpNftSlide,
    ];
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') nextSlide();
            else if (event.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []); 
    const CurrentSlideComponent = slides[currentSlide];
    return (
        <main className="relative w-full h-full bg-gray-50 overflow-hidden">
            <Brand />
            <AnimatePresence mode="wait">
                <CurrentSlideComponent key={currentSlide} />
            </AnimatePresence>
            <NavigationControls current={currentSlide} total={slides.length} onPrev={prevSlide} onNext={nextSlide} />
        </main>
    );
};

export default App;

