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
    Shield, AlertTriangle, MessageSquare, ShieldCheck, ArrowDown
};

const ArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>;
const Brand = ({brandName, brandAccent}: {brandName: string, brandAccent: string}) => <div className="absolute top-8 left-8 z-20 text-xl font-bold text-white">{brandName}<span className="text-cyan-400">{brandAccent}</span></div>;

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
// 2. TEMPLATE SLIDE COMPONENTS
//================================================================================

const TitleSlideTemplate = ({ data }: {data: any}) => (
    <div className="space-y-8">
         <h1 className="text-4xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 drop-shadow-sm">
            {data.title}
        </h1>
        <h2 className="text-xl md:text-3xl lg:text-5xl font-light text-cyan-500">
            {data.subtitle}
        </h2>
        <motion.div 
            className="flex justify-center items-center h-32 md:h-64"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.5, duration: 1}}
        >
            <div className="flex items-center space-x-4 md:space-x-8">
                {data.icons.map((iconName: string, i: number) => {
                    const Icon = iconMap[iconName as keyof typeof iconMap];
                    const color = i === 0 ? 'text-red-500 opacity-50' : 'text-green-500';
                    return <Icon key={i} className={`w-24 h-24 md:w-48 md:h-48 ${color}`} />
                })}
            </div>
        </motion.div>
         <motion.div
            className="bg-slate-900/50 backdrop-blur-md p-4 md:p-8 rounded-2xl border border-slate-700 shadow-xl max-w-4xl mx-auto"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 1, duration: 0.5}}
        >
            <p className="text-lg md:text-2xl text-slate-300">{data.footer}</p>
        </motion.div>
    </div>
);

const ProblemSlideTemplate = ({ data }: {data: any}) => (
     <div className="space-y-12">
        <Header 
            kicker={data.kicker}
            title={data.title}
            kickerClass="from-red-600 to-orange-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-start max-w-7xl mx-auto">
             {data.points.map((point: any, i: number) => {
                const Icon = iconMap[point.icon as keyof typeof iconMap];
                return (
                    <motion.div
                        key={i}
                        className="bg-slate-800/50 p-4 md:p-6 rounded-2xl border-2 border-slate-700 shadow-lg text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                    >
                        <Icon className="w-12 h-12 md:w-16 md:h-16 text-red-400 mx-auto mb-4" />
                        <h3 className="text-lg md:text-2xl font-bold text-white mt-2">{point.title}</h3>
                        <p className="text-sm md:text-lg text-slate-400 mt-2">{point.description}</p>
                    </motion.div>
                )
             })}
        </div>
    </div>
);

const HowItWorksTemplate = ({ data }: {data: any}) => (
    <div className="space-y-12">
        <Header 
            kicker={data.kicker}
            title={data.title}
            kickerClass="from-blue-400 to-cyan-500"
        />
        <div className="flex flex-col md:flex-row items-stretch justify-center space-y-4 md:space-y-0 md:space-x-4 lg:space-x-8">
            {data.steps.map((step: any, i: number) => (
                <React.Fragment key={i}>
                    <motion.div 
                        initial={{opacity:0, y:20}} 
                        animate={{opacity:1, y:0}} 
                        transition={{delay:0.2 + i * 0.4}} 
                        className="text-center p-4 md:p-6 bg-slate-800/50 rounded-2xl shadow-lg border-2 border-slate-700 flex-1"
                    >
                        <div className="flex items-center justify-center">
                           {step.icons.map((iconName: string, j: number) => {
                                const Icon = iconMap[iconName as keyof typeof iconMap];
                                return (
                                   <React.Fragment key={j}>
                                        <Icon className={`w-12 h-12 md:w-16 md:h-16 ${step.iconColor}`} />
                                        {j < step.icons.length - 1 && <ArrowRight className="w-4 h-4 md:w-8 md:h-8 text-slate-600 mx-2"/>}
                                   </React.Fragment>
                                )
                           })}
                        </div>
                        <h3 className="text-lg md:text-2xl font-bold mt-4 text-white">{step.title}</h3>
                        <p className="text-sm md:text-base text-slate-400 mt-2">{step.description}</p>
                    </motion.div>
                    {i < data.steps.length - 1 && 
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4 + i * 0.4}} className="flex items-center justify-center md:block">
                            <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-slate-600" />
                        </motion.div>
                    }
                </React.Fragment>
            ))}
        </div>
         <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4}} className="text-xl text-amber-300 font-semibold max-w-3xl mx-auto pt-4">
            {data.footer}
        </motion.p>
    </div>
);

const ValuePropTemplate = ({ data }: {data: any}) => (
    <div className="space-y-12">
        <Header 
            kicker={data.kicker}
            title={data.title}
            kickerClass="from-purple-400 to-pink-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-left max-w-6xl mx-auto">
            {data.audiences.map((audience: any, i: number) => {
                const Icon = iconMap[audience.icon as keyof typeof iconMap];
                return (
                     <motion.div 
                        key={i}
                        className="bg-slate-800/50 p-4 md:p-8 rounded-2xl border-2 border-slate-700 space-y-4 md:space-y-8"
                        initial={{opacity:0, x: i === 0 ? -20 : 20}} animate={{opacity:1, x:0}} transition={{delay: 0.2 + i * 0.2}}
                    >
                        <h3 className="text-xl md:text-3xl font-bold text-white flex items-center"><Icon className="mr-3 text-cyan-400"/> {audience.audience}</h3>
                        {audience.points.map((point: any, j: number) => {
                            const PointIcon = iconMap[point.icon as keyof typeof iconMap];
                            return (
                                <div key={j} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 md:w-12 md:h-12 bg-slate-700/50 rounded-lg flex items-center justify-center">
                                        <PointIcon className="w-4 h-4 md:w-6 md:h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm md:text-lg text-white">{point.title}</h4>
                                        <p className="text-xs md:text-base text-slate-400">{point.description}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </motion.div>
                )
            })}
        </div>
    </div>
);

const AskSlideTemplate = ({ data }: {data: any}) => (
     <div className="space-y-8">
        <Header kicker={data.kicker} title={data.title} kickerClass="from-cyan-400 to-blue-500" />
        <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}} className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto px-4">
           {data.askText}
        </motion.p>
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}>
            <button className="mt-8 text-lg md:text-2xl font-bold text-black bg-gradient-to-r from-cyan-300 to-purple-400 px-8 md:px-12 py-3 md:py-4 rounded-lg shadow-lg hover:scale-105 transition-transform">
                {data.buttonText}
            </button>
        </motion.div>
    </div>
);

//================================================================================
// 3. SPECIALIZED SLIDE COMPONENTS (Existing Detailed Slides)
//================================================================================

const SituationReportSlide = ({ data }: {data: any}) => {
    const chaosIcons = [
        { icon: 'FileText', pos: { top: '10%', left: '20%' }, delay: 0.3 },
        { icon: 'Dna', pos: { top: '25%', left: '70%' }, delay: 0.5 },
        { icon: 'FlaskConical', pos: { top: '60%', left: '10%' }, delay: 0.7 },
        { icon: 'BookOpen', pos: { top: '75%', left: '80%' }, delay: 0.9 },
        { icon: 'Search', pos: { top: '40%', left: '85%' }, delay: 1.1 },
    ];

    return (
        <div className="space-y-12">
            <Header 
                kicker={data.kicker}
                title={data.title}
                kickerClass="from-red-600 to-orange-500"
            />
            <div className="relative h-96 max-w-4xl mx-auto flex items-center justify-center">
                <motion.div initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} transition={{delay: 0.1, duration: 0.5}}>
                    <Stethoscope className="w-48 h-48 text-slate-600" />
                </motion.div>
                {chaosIcons.map(({icon, pos, delay}) => {
                    const Icon = iconMap[icon as keyof typeof iconMap];
                    return (
                        <motion.div
                            key={icon}
                            className="absolute"
                            style={pos}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay, duration: 0.5 }}
                        >
                            <Icon className="w-20 h-20 text-slate-500" />
                        </motion.div>
                    );
                })}
                <motion.div 
                    className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 1.5, duration: 0.7}}
                >
                    <HelpCircle className="w-32 h-32 text-amber-400" />
                    <h3 className="text-4xl font-bold text-amber-300 mt-4">Unclear Baseline Risk</h3>
                    <p className="text-xl text-slate-400">Decision Paralysis</p>
                </motion.div>
            </div>
        </div>
    );
};

const HowItWorksVisualTemplate = ({ data }: {data: any}) => (
    <div className="space-y-12">
        <Header 
            kicker={data.kicker}
            title={data.title}
            kickerClass="from-blue-400 to-cyan-500"
        />
        <div className="flex items-center justify-center space-x-8">
            <motion.div 
                initial={{opacity:0, y:20}} 
                animate={{opacity:1, y:0}} 
                transition={{delay:0.2}} 
                className="text-center"
            >
                <div className="p-6 bg-slate-800/50 rounded-2xl shadow-lg border-2 border-slate-700">
                    <Dna className="w-16 h-16 text-cyan-400 mx-auto" />
                </div>
                <h3 className="text-xl font-bold mt-4 text-white">Patient's Germline DNA</h3>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}><ArrowRight className="w-16 h-16 text-slate-600" /></motion.div>
            <motion.div 
                initial={{opacity:0, y:20}} 
                animate={{opacity:1, y:0}} 
                transition={{delay:0.6}} 
                className="text-center p-6 bg-slate-800/50 rounded-2xl shadow-lg border-2 border-slate-700"
            >
                <BrainCircuit className="w-16 h-16 text-purple-400 mx-auto" />
                <h3 className="text-xl font-bold mt-4 text-white">Zeta Simulation Engine</h3>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}><ArrowRight className="w-16 h-16 text-slate-600" /></motion.div>
            <motion.div 
                initial={{opacity:0, y:20}} 
                animate={{opacity:1, y:0}} 
                transition={{delay:1.0}} 
                className="text-center"
            >
                <div className="p-6 bg-slate-800/50 rounded-2xl shadow-lg border-2 border-amber-500">
                    <AlertTriangle className="w-16 h-16 text-amber-400 mx-auto" />
                </div>
                <h3 className="text-xl font-bold mt-4 text-white">Actionable Caution Signal</h3>
            </motion.div>
        </div>
    </div>
);

const QuantifyDamageSlide = ({ data }: {data: any}) => (
     <div className="space-y-12">
        <Header kicker={data.kicker} title={data.title} kickerClass="from-green-400 to-emerald-500" />
        <div className="flex justify-center items-center space-x-8">
            <motion.div className="text-center" initial={{opacity:0, x: -50}} animate={{opacity:1, x:0}} transition={{delay:0.2}}>
                 <FileText className="w-32 h-32 text-slate-500 mx-auto"/>
                 <h3 className="text-xl font-bold mt-4 text-white">Patient Germline Variant</h3>
                 <p className="font-mono text-cyan-400">DPYD c.1905+1G{'>'}A</p>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}}><ArrowRight className="w-24 h-24 text-slate-600" /></motion.div>
            <motion.div className="text-center" initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} transition={{delay:0.8, duration: 0.5}}>
                <Zap className="w-32 h-32 text-purple-400 mx-auto"/>
                <h3 className="text-xl font-bold mt-4 text-white">/PredictVariantImpact</h3>
            </motion.div>
            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.2}}><ArrowRight className="w-24 h-24 text-slate-600" /></motion.div>
            <motion.div className="text-center" initial={{opacity:0, x: 50}} animate={{opacity:1, x:0}} transition={{delay:1.4}}>
                <div className="w-48 h-48 bg-red-900/50 rounded-full flex flex-col items-center justify-center border-4 border-red-500">
                    <p className="text-5xl font-black text-red-300">-18.7k</p>
                    <p className="text-lg text-red-400">Damage Score</p>
                </div>
            </motion.div>
        </div>
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:1.8}} className="max-w-4xl mx-auto">
            <p className="text-2xl text-slate-300">Grounded in Clinical Reality: <span className="font-bold text-cyan-400">0.957 AUROC</span> on 53,210 ClinVar variants.</p>
        </motion.div>
    </div>
);

const ExposeWhySlide = ({ data }: {data: any}) => (
     <div className="space-y-12">
         <Header kicker={data.kicker} title={data.title} kickerClass="from-green-400 to-emerald-500" />
        <div className="flex justify-center items-center space-x-8">
             <motion.div className="text-center" initial={{opacity:0, x: -50}} animate={{opacity:1, x:0}} transition={{delay:0.2}}>
                <Box className="w-48 h-48 text-slate-500 mx-auto"/>
                <h3 className="text-xl font-bold mt-4 text-white">"Black Box" AI Prediction</h3>
            </motion.div>
             <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.6}}><ArrowRight className="w-24 h-24 text-slate-600" /></motion.div>
             <motion.div className="text-left bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700" initial={{opacity:0, x: 50}} animate={{opacity:1, x:0}} transition={{delay:1.0}}>
                <h3 className="text-xl font-bold text-white mb-2">SAE Deconstruction:</h3>
                <div className="font-mono text-sm text-green-400 space-y-1">
                    <p className="flex items-center"><CheckCircle size={16} className="mr-2 text-red-400"/>FEATURE_ACTIVATED: 'SpliceSite_Disruption'</p>
                    <p className="flex items-center"><XCircle size={16} className="mr-2 text-slate-500"/>FEATURE_ACTIVATED: 'Promoter_Region'</p>
                    <p className="flex items-center"><XCircle size={16} className="mr-2 text-slate-500"/>FEATURE_ACTIVATED: 'DNA_Repair_Pathway'</p>
                </div>
            </motion.div>
        </div>
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:1.4}} className="max-w-4xl mx-auto">
            <p className="text-2xl text-slate-300">We don't just predict; we explain. Proven by <span className="font-bold text-cyan-400">0.826 AUROC</span> on SpliceVarDB.</p>
        </motion.div>
    </div>
);

const PredictBattlefieldSlide = ({ data }: {data: any}) => (
     <div className="space-y-12">
        <Header kicker={data.kicker} title={data.title} kickerClass="from-green-400 to-emerald-500" />
        <div className="flex justify-center items-center">
            <motion.div 
                className="relative w-96 h-96"
                initial={{opacity: 0, scale:0.8}}
                animate={{opacity: 1, scale:1}}
                transition={{delay: 0.2}}
            >
                <User className="w-full h-full text-slate-700"/>
                <motion.div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-24 h-24 bg-red-500/50 rounded-full" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.0}}><Zap className="w-full h-full text-red-400 p-4"/></motion.div>
                 <motion.div className="absolute top-1/2 left-1/4 -translate-x-1/2 w-16 h-16 bg-red-500/50 rounded-full" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3}}><Zap className="w-full h-full text-red-400 p-3"/></motion.div>
            </motion.div>
        </div>
        <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:1.6}} className="max-w-4xl mx-auto">
            <p className="text-2xl text-slate-300">Powered by Evo2's proven <span className="font-bold text-cyan-400">Generative Epigenomics</span> capability. We will predict not just *if* a drug is toxic, but *where*.</p>
        </motion.div>
    </div>
);

const EngineOfCertaintySlide = ({ data }: {data: any}) => (
    <div className="space-y-12">
        <Header 
            kicker={data.kicker}
            title={data.title}
            kickerClass="from-green-400 to-emerald-500"
        />
        <div className="grid md:grid-cols-3 gap-8 text-left max-w-7xl mx-auto">
            {data.points.map((point: any, i: number) => {
                 const Icon = iconMap[point.icon as keyof typeof iconMap];
                 return (
                    <motion.div
                        key={i}
                        className="bg-slate-800/50 p-8 rounded-2xl border-2 border-slate-700 flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                    >
                        <div className="flex items-center mb-4">
                             <Icon className="w-12 h-12 text-green-400 mr-4"/>
                             <h3 className="text-2xl font-bold text-white">{point.title}</h3>
                        </div>
                        <p className="text-lg text-slate-400 flex-grow">{point.description}</p>
                        <div className="mt-6 bg-slate-900/50 p-4 rounded-lg border border-slate-600">
                            <p className="font-bold text-green-300">The Proof:</p>
                            <p className="text-slate-300">{point.proof}</p>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    </div>
);

const ValuePropComparisonTemplate = ({ data }: {data: any}) => (
    <div className="space-y-12">
        <Header 
            kicker={data.kicker}
            title={data.title}
            kickerClass="from-purple-400 to-pink-500"
        />
        <div className="grid md:grid-cols-2 gap-8 text-left max-w-6xl mx-auto">
            <motion.div 
                className="bg-slate-800/50 p-8 rounded-2xl border-2 border-slate-700 space-y-4"
                initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay: 0.2}}
            >
                <h3 className="text-3xl font-bold text-white flex items-center"><Stethoscope className="mr-3 text-red-400"/> The Old Way: Reactive Care</h3>
                <p className="text-xl text-slate-400">{data.before.summary}</p>
                <div className="flex justify-center items-center h-48 space-x-4">
                    <FileSearch size={48} className="text-slate-500" />
                    <HelpCircle size={64} className="text-slate-500" />
                    <FileText size={48} className="text-slate-500" />
                </div>
            </motion.div>
            <motion.div 
                className="bg-slate-800/50 p-8 rounded-2xl border-2 border-green-500 space-y-4"
                initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay: 0.4}}
            >
                <h3 className="text-3xl font-bold text-white flex items-center"><ShieldCheck className="mr-3 text-green-400"/> The Zeta Way: Proactive Planning</h3>
                <p className="text-xl text-slate-400">{data.after.summary}</p>
                <div className="flex justify-center items-center h-48 bg-slate-900/50 rounded-lg border border-slate-700">
                    <div className="flex items-center space-x-4 bg-amber-900/50 p-4 rounded-lg border-2 border-amber-600">
                        <AlertTriangle className="text-amber-400" size={32} />
                        <div className="text-left">
                            <p className="font-bold text-xl text-amber-300">Elevated Risk Detected</p>
                            <p className="text-amber-400">Germline variant in DNA repair pathway.</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    </div>
);

const TheVerdictSlide = ({ data }: {data: any}) => (
    <div className="space-y-12">
        <Header kicker={data.kicker} title={data.title} kickerClass="from-amber-400 to-yellow-500" />
        <motion.div 
            className="max-w-2xl mx-auto bg-slate-800/50 p-8 rounded-2xl border-2 border-amber-500 shadow-2xl"
            initial={{opacity:0, scale:0.8}}
            animate={{opacity:1, scale:1}}
            transition={{delay:0.4, duration: 0.7, type:'spring'}}
        >
            <div className="text-center border-b-2 border-amber-700 pb-4">
                <AlertTriangle className="w-24 h-24 text-amber-400 mx-auto"/>
                <h3 className="text-6xl font-black text-amber-300 mt-4">ELEVATED RISK</h3>
            </div>
            <div className="text-left mt-6 space-y-4">
                <div>
                    <h4 className="font-bold text-white text-lg">REASON:</h4>
                    <p className="text-amber-300 text-xl">{data.reason}</p>
                </div>
                 <div>
                    <h4 className="font-bold text-white text-lg">CONFIDENCE:</h4>
                    <div className="w-full bg-slate-700 rounded-full h-8 mt-1">
                        <motion.div 
                            className="bg-amber-400 h-8 rounded-full text-right pr-2 font-bold text-black flex items-center justify-end"
                            initial={{width: '0%'}}
                            animate={{width: `${data.confidence}%`}}
                            transition={{delay:1, duration: 1}}
                        >
                            {data.confidence}%
                        </motion.div>
                    </div>
                </div>
                 <div>
                    <h4 className="font-bold text-white text-lg">EVIDENCE:</h4>
                    <div className="flex space-x-2 mt-1">
                        {data.evidence.map((e: string) => (
                            <div key={e} className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-sm font-semibold">{e}</div>
                        ))}
                    </div>
                </div>
            </div>
             <div className="text-center border-t-2 border-slate-700 pt-4 mt-6">
                <p className="font-mono text-xs text-slate-500">PROVENANCE (run_id): {data.provenance}</p>
            </div>
        </motion.div>
    </div>
);


//================================================================================
// 4. SLIDE DATA & CONFIGURATION
//================================================================================

const deckConfig = {
    brandName: "ZETA",
    brandAccent: "SAFETY"
};

const slideData = [
    // 1. TITLE SLIDE - Hook and Introduction
    {
        component: TitleSlideTemplate,
        data: {
            title: "Beyond a Shadow of a Doubt",
            subtitle: "In‑Silico Side‑Effect Hints to Plan Safer, Before Treatment.",
            icons: ["ShieldOff", "ShieldCheck"],
            footer: "Turn germline context into a plain, shareable caution signal so care teams can plan safer."
        }
    },
    
    // 2. PROBLEM DEFINITION - Clear Problem Statement
    {
        component: ProblemSlideTemplate,
        data: {
            kicker: "The Unseen Threat",
            title: "Toxicities are hard to foresee, and the signals are scattered.",
            points: [
                { icon: "HelpCircle", title: "Unclear Baseline Risk", description: "Risk is ambiguous at the start of treatment planning, forcing a reactive approach." },
                { icon: "Search", title: "Scattered Signals", description: "Critical genetic and evidential signals are scattered across countless sources." },
                { icon: "FileText", title: "Hard to Share", description: "It's difficult to share a concise, trusted summary with the team and patient." }
            ],
            summary: {
                stat: "Patient Safety at Risk",
                text: "Without a clear, early signal, care teams are flying blind."
            }
        }
    },
    
    // 3. SOLUTION OVERVIEW - High-Level Approach
    {
        component: HowItWorksTemplate,
        data: {
            kicker: "Our Solution",
            title: "A Simple, Genetics-Aware Caution Signal",
            steps: [
                { title: "Caution Chip", description: "A simple, unmissable visual hint when germline genetics suggest higher risk.", icons: ["AlertTriangle"], iconColor: "text-red-400" },
                { title: "Helper Text", description: "A short, plain-language 'why' that explains the signal.", icons: ["MessageSquare"], iconColor: "text-green-400" },
                { title: "Confidence & Sources", description: "Every hint is backed by confidence scores and auditable sources.", icons: ["ShieldCheck"], iconColor: "text-purple-400" }
            ],
            footer: "Simple to read, easy to share, and backed by evidence."
        }
    },
    
    // 4. TECHNICAL DEEP DIVE - Evo2 Advantage
    {
        component: EngineOfCertaintySlide,
        data: {
            kicker: "The Engine of Certainty",
            title: "Deconstructing the Evo2 Advantage",
            points: [
                {
                    icon: "Zap",
                    title: "We Quantify Biological Damage",
                    description: "Our engine calculates a precise damage score for any germline variant by measuring its deviation from a healthy genome.",
                    proof: "0.957 AUROC on 53,210 real-world ClinVar variants proves our scores mirror clinical reality."
                },
                {
                    icon: "BrainCircuit",
                    title: "We Expose the 'Why'",
                    description: "Our SAEs crack open the AI 'black box' to reveal the exact biological mechanism (e.g., splice site disruption) behind the risk.",
                    proof: "State-of-the-art on SpliceVarDB (0.826 AUROC) validates our mechanistic explanations."
                },
                {
                    icon: "Map",
                    title: "We Predict the Battlefield (Phase 2)",
                    description: "We will simulate tissue-specific gene expression to pinpoint risk to critical organs like the heart or brain.",
                    proof: "Based on the proven generative epigenomics capability from the Evo2 paper (Fig. 6)."
                }
            ]
        }
    },
    
    // 5. KILL CHAIN DEMONSTRATION - Step-by-Step Process
    {
        component: QuantifyDamageSlide,
        data: {
            kicker: "Kill Chain Step 1",
            title: "Quantify the Damage"
        }
    },
    {
        component: ExposeWhySlide,
        data: {
            kicker: "Kill Chain Step 2",
            title: "Expose the 'Why'"
        }
    },
    {
        component: PredictBattlefieldSlide,
        data: {
            kicker: "Kill Chain Step 3 (Phase 2)",
            title: "Predict the Battlefield"
        }
    },
    
    // 6. VALUE PROPOSITION - Business Impact
    {
        component: ValuePropComparisonTemplate,
        data: {
            kicker: "A New Standard of Care",
            title: "From Reactive Guesswork to Proactive Genetic Insight",
            before: {
                summary: "Clinicians are forced to rely on scattered data and population-level statistics, reacting to toxicities after they emerge."
            },
            after: {
                summary: "Our platform provides a simple, unified, genetics-aware signal, enabling care teams to plan safer from day one."
            }
        }
    },
    
    // 7. AUDIENCE-SPECIFIC VALUE - Who Benefits
    {
        component: ValuePropTemplate,
        data: {
            kicker: "A Co-Pilot for Safer Care",
            title: "Delivering Confidence to the Front Lines",
            audiences: [
               {
                    audience: "For Rad/Med Oncology",
                    icon: "Stethoscope",
                    points: [
                        { icon: "AlertTriangle", title: "Simple Caution Hint", description: "A quick, genetics-aware caution to guide planning." },
                        { icon: "FileText", title: "Shareable One-Pager", description: "A short, shareable summary with confidence and sources to align the team." }
                    ]
                },
                {
                    audience: "For Institutions",
                    icon: "Database",
                    points: [
                        { icon: "Terminal", title: "Consistent & Auditable", description: "Standardized, auditable outputs with run IDs for every patient." },
                        { icon: "RefreshCw", title: "Future-Proofed", description: "A safe, scalable path to deeper, regimen-specific models." }
                    ]
                }
            ]
        }
    },
    
    // 8. REAL RESULTS - Verdict and Evidence
    {
        component: TheVerdictSlide,
        data: {
            kicker: "The Verdict",
            title: "Your Actionable Caution Signal",
            reason: "Germline variant in DPYD gene associated with impaired drug metabolism.",
            confidence: 92,
            evidence: ["ClinVar", "PharmGKB", "Evo2 Prediction"],
            provenance: "e7b2cde2-8a9d-4c3e-9b0a-7f6a7d1b3e5f"
        }
    },
    
    // 9. CALL TO ACTION - Next Steps
    {
        component: AskSlideTemplate,
        data: {
            kicker: "The Opportunity",
            title: "Integrate a Higher Standard of Safety",
            askText: "Let's run a pilot to show how our Toxicity Risk hints can provide your care teams with a simple, genetics-aware caution signal to help them plan safer, more effective treatments.",
            buttonText: "Plan Safer. Start Now."
        }
    }
];


//================================================================================
// 5. MAIN APP
//================================================================================

const SafetyDeck: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => setCurrentSlide(prev => (prev === slideData.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? slideData.length - 1 : prev - 1));

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [slideData]);

    return (
        <main className="relative w-full h-screen bg-slate-900 text-white font-sans overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/40 z-0"></div>
            <Background />
            <Brand brandName={deckConfig.brandName} brandAccent={deckConfig.brandAccent} />
            {slideData.map((slide, i) => {
                const SlideComponent = slide.component;
                return (
                    <Slide key={i} isVisible={i === currentSlide}>
                        <SlideComponent data={slide.data} />
                    </Slide>
                );
            })}
            <Navigation current={currentSlide} total={slideData.length} onPrev={prevSlide} onNext={nextSlide} />
        </main>
    );
};

export default SafetyDeck;

