import React, { useState, useEffect, useRef, createElement, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { 
    Users, FlaskConical, TestTube, Target, ArrowRight, Dna, Bot, Cpu, CheckCircle, XCircle,
    FileSearch, LineChart, ShieldOff, UserCheck, Stethoscope, Database, ListChecks, FileText,
    RefreshCw, BarChart, Zap, Search, FilterX, TrendingDown, Coins, BrainCircuit, User, Terminal, Plus, UploadCloud, HelpCircle,
    Award, BookOpen, Dice5, DraftingCompass, Percent, FileCode, SlidersHorizontal, Box, Gavel, Map, GanttChartSquare, ClipboardList,
    Shield, ShieldCheck
} from 'lucide-react';

//================================================================================
// 1. ICON MAPPING & CORE UI
//================================================================================

const iconMap = {
    Users, FlaskConical, TestTube, Target, ArrowRight, Dna, Bot, Cpu, CheckCircle, XCircle,
    FileSearch, LineChart, ShieldOff, UserCheck, Stethoscope, Database, ListChecks, FileText,
    RefreshCw, BarChart, Zap, Search, FilterX, TrendingDown, Coins, BrainCircuit, User, Terminal, Plus, UploadCloud, HelpCircle,
    Award, BookOpen, Dice5, DraftingCompass, Percent, FileCode, SlidersHorizontal, Box, Gavel, Map, GanttChartSquare, ClipboardList,
    Shield, ShieldCheck
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
        <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text ${kickerClass}`}>{kicker}</h2>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-slate-100 mt-2 max-w-5xl mx-auto px-4">
            {title}
        </h1>
    </motion.div>
);

//================================================================================
// 2. TEMPLATE SLIDE COMPONENTS
//================================================================================

const TitleSlideTemplate = ({ data }: {data: any}) => (
    <div className="space-y-8">
         <h1 className="text-4xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 drop-shadow-sm px-4">
            {data.title}
        </h1>
        <h2 className="text-xl md:text-3xl lg:text-5xl font-light text-cyan-500 px-4">
            {data.subtitle}
        </h2>
        <motion.div 
            className="flex justify-center items-center space-x-4 md:space-x-8 h-32 md:h-64"
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
     <div className="space-y-8 md:space-y-12">
        <Header 
            kicker={data.kicker}
            title={data.title}
            kickerClass="from-red-600 to-orange-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-start max-w-7xl mx-auto px-4">
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
                        <p className="text-3xl md:text-5xl font-black text-red-300">{point.stat}</p>
                        <h3 className="text-lg md:text-2xl font-bold text-white mt-2">{point.title}</h3>
                        <p className="text-sm md:text-base text-slate-400 mt-2">{point.description}</p>
                    </motion.div>
                )
             })}
        </div>
        <motion.div
            className="bg-red-900/50 text-white p-4 md:p-6 rounded-2xl shadow-2xl max-w-md mx-auto ring-2 ring-red-600"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
        >
            <Coins className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-2 text-red-300" />
            <p className="text-2xl md:text-4xl font-black">{data.summary.stat}</p>
            <p className="text-lg md:text-xl font-bold">{data.summary.text}</p>
        </motion.div>
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
                                        <Icon className={`w-8 h-8 md:w-12 md:h-12 ${step.iconColor}`} />
                                        {j < step.icons.length - 1 && <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-slate-600 mx-2"/>}
                                   </React.Fragment>
                                )
                           })}
                        </div>
                        <h3 className="text-lg md:text-2xl font-bold mt-4 text-white">{step.title}</h3>
                        <p className="text-sm md:text-base text-slate-400 mt-2">{step.description}</p>
                    </motion.div>
                    {i < data.steps.length - 1 && 
                        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4 + i * 0.4}} className="flex items-center">
                            <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-slate-600" />
                        </motion.div>
                    }
                </React.Fragment>
            ))}
        </div>
         <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.4}} className="text-lg md:text-xl text-amber-300 font-semibold max-w-3xl mx-auto pt-4 px-4">
            {data.footer}
        </motion.p>
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

const FoundationSlideTemplate = ({ data }: {data: any}) => (
    <div className="space-y-12">
        <Header 
            kicker={data.kicker}
            title={data.title}
            kickerClass="from-green-400 to-emerald-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-left max-w-7xl mx-auto px-4">
            {data.points.map((point: any, i: number) => {
                const Icon = iconMap[point.icon as keyof typeof iconMap];
                return (
                    <motion.div 
                        key={i} 
                        initial={{opacity:0, x: i === 0 ? -20 : 20}} 
                        animate={{opacity:1, x:0}} 
                        transition={{delay:0.2 + i * 0.2}} 
                        className="bg-slate-800/50 p-4 md:p-8 rounded-2xl border-2 border-slate-700 space-y-6"
                    >
                        <div className="flex items-center">
                            <Icon className="w-12 h-12 md:w-16 md:h-16 text-green-400 mr-4"/>
                            <div>
                                <h3 className="text-xl md:text-3xl font-bold text-white">{point.title}</h3>
                                <p className="text-lg md:text-xl text-slate-400">{point.subtitle}</p>
                            </div>
                        </div>
                        <div className="h-32 md:h-48 flex items-center justify-around bg-slate-900/50 rounded-lg p-4">
                            {point.visual === 'text' && <p className="text-lg md:text-2xl text-slate-300" dangerouslySetInnerHTML={{ __html: point.visualContent }} />}
                            {point.visual === 'graph' && <><RocCurve /><div className="text-center"><p className="text-4xl md:text-6xl font-black text-cyan-400">{point.stat}</p><p className="text-lg md:text-xl text-slate-300">{point.statLabel}</p><p className="text-xs md:text-sm text-slate-500">{point.statContext}</p></div></>}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    </div>
);

const FeatureSlideTemplate = ({ data }: {data: any}) => (
    <div className="space-y-8">
        <Header 
            kicker={data.kicker}
            title={data.title}
            kickerClass={data.kickerClass}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center max-w-6xl mx-auto px-4">
            <motion.div 
                className="text-center flex flex-col items-center justify-center space-y-4"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.2}}
            >
                <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                    {data.flow.map((item: any, index: number) => {
                        const Icon = item.icon ? iconMap[item.icon as keyof typeof iconMap] : null;
                        if (item.type === 'start') {
                            return ( <div key={index} className="text-center"> {Icon && <Icon className="w-16 h-16 md:w-24 md:h-24 text-slate-500 mx-auto"/>} <h3 className="text-sm md:text-lg font-bold mt-2 text-white">{item.label}</h3> </div> );
                        }
                        if (item.type === 'process') {
                             return ( <div key={index} className="text-center"> <div className="p-3 md:p-4 bg-slate-800 rounded-lg border border-slate-600"> {Icon && <Icon className="w-12 h-12 md:w-20 md:h-20 text-purple-400 mx-auto" />} </div> <p className="font-mono text-xs md:text-sm text-purple-300 mt-2">{item.label}</p> </div> );
                        }
                        if (item.type === 'end') {
                            return ( <div key={index} className="text-center"> <div className="w-24 h-24 md:w-32 md:h-32 bg-red-900/50 rounded-full flex flex-col items-center justify-center border-4 border-red-500"> <p className="text-2xl md:text-4xl font-black text-red-300">{item.value}</p> </div> <h3 className="text-sm md:text-lg font-bold mt-2 text-white">{item.label}</h3> </div> );
                        }
                         if (item.type === 'arrow') {
                            return <ArrowRight key={index} className="w-8 h-8 md:w-16 md:h-16 text-slate-600" />
                        }
                        return null;
                    })}
                </div>
            </motion.div>
            <motion.div 
                className="bg-slate-800/50 p-4 md:p-8 rounded-2xl border-2 border-slate-700 text-left"
                initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay:0.6}}
            >
                <h3 className="text-xl md:text-3xl font-bold text-white" dangerouslySetInnerHTML={{ __html: data.explanation.title }} />
                <p className="text-lg md:text-xl text-slate-300 mt-4" dangerouslySetInnerHTML={{ __html: data.explanation.text }} />
                <div className="mt-4 text-center">
                    <p className="text-3xl md:text-5xl font-black text-green-400">{data.explanation.stat.value}</p>
                    <p className="text-lg md:text-xl text-slate-300">{data.explanation.stat.label}</p>
                </div>
            </motion.div>
        </div>
    </div>
);

const ThreeColumnFeatureTemplate = ({ data }: {data: any}) => (
    <div className="space-y-12">
        <Header 
            kicker={data.kicker}
            title={data.title}
            kickerClass={data.kickerClass}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-left max-w-7xl mx-auto px-4">
            {data.columns.map((col: any, i: number) => {
                const Icon = iconMap[col.icon as keyof typeof iconMap];
                return (
                    <motion.div 
                        key={i}
                        className={`bg-slate-800/50 p-4 md:p-8 rounded-2xl border-2 ${col.borderColor} flex flex-col`} 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.5, delay: 0.2 + i * 0.2 }}
                    >
                        <div className="flex items-center mb-4">
                            <Icon className={`w-8 h-8 md:w-12 md:h-12 ${col.iconColor} mr-4`}/>
                            <h3 className="text-lg md:text-2xl font-bold text-white">{col.title}</h3>
                        </div>
                        <p className="text-sm md:text-lg text-slate-400 flex-grow">{col.description}</p>
                        <div className="mt-6 bg-slate-900/50 p-3 md:p-4 rounded-lg border border-slate-600 text-center">
                            <p className={`font-bold ${col.proof.textColor} text-sm md:text-lg`}>{col.proof.label}</p>
                            <p className={`text-2xl md:text-4xl font-black ${col.proof.textColor}`}>{col.proof.value}</p>
                            <p className="text-slate-300 text-xs md:text-sm">{col.proof.subtext}</p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    </div>
);

// Helper component for the FourQuadrantTemplate
const EngineQuadrant = ({ icon, title, stat, statLabel, visual, explanation, delay }: {icon: string, title: string, stat: string, statLabel: string, visual: React.ReactNode, explanation: string, delay: number}) => {
    const [what, why] = explanation.split("WHY IT MATTERS:");
    const whatText = what.replace("WHAT IT MEANS:", "");

    return (
        <motion.div 
            className="bg-slate-800/60 p-4 md:p-6 rounded-2xl border-2 border-slate-700 flex flex-col space-y-4 shadow-2xl backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay }}
        >
            <div className="flex items-center space-x-3">
                {createElement(iconMap[icon as keyof typeof iconMap], { className: "w-6 h-6 md:w-8 md:h-8 text-cyan-400" })}
                <h3 className="text-lg md:text-2xl font-bold text-white">{title}</h3>
            </div>
            <div className="flex-grow flex items-center justify-center h-32 md:h-40">
                {visual}
            </div>
            <div className="text-center bg-slate-900/50 p-3 rounded-lg">
                <p className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-green-400">{stat}</p>
                <p className="text-slate-400 font-semibold text-sm md:text-base">{statLabel}</p>
            </div>
            <div className="text-left text-xs md:text-base space-y-2 pt-2">
                <p><strong className="text-cyan-400 font-semibold">WHAT IT MEANS:</strong> <span className="text-slate-300">{whatText}</span></p>
                <p><strong className="text-green-400 font-semibold">WHY IT MATTERS:</strong> <span className="text-slate-300">{why}</span></p>
            </div>
        </motion.div>
    );
};

// Main template for the four-quadrant slide
const FourQuadrantTemplate = ({ data }: {data: any}) => {
    const getVisual = (type: string) => {
        switch (type) {
            case 'accuracy':
                return <div className="text-center"><Zap size={64} className="text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)] md:size-24"/></div>;
            case 'vusResolution':
                return (
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                        <motion.div initial={{opacity:1}} animate={{opacity:0, scale:2}} transition={{delay:1.5, duration:0.5}}>
                            <HelpCircle className="w-full h-full text-red-500"/>
                        </motion.div>
                        <motion.div className="absolute inset-0" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:2, duration:0.5}}>
                            <CheckCircle className="w-full h-full text-green-400"/>
                        </motion.div>
                    </div>
                );
            case 'onDemandAssets':
                return (
                     <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                        <FileCode size={32} className="text-slate-500 md:size-12" />
                        <ArrowRight size={24} className="text-slate-600 md:size-8"/>
                        <Bot size={48} className="text-green-400 md:size-16" />
                    </div>
                );
            case 'context':
                return (
                     <div className="text-center w-full px-4">
                        <div className="font-mono text-cyan-400 text-xs md:text-sm">...[1000s of bases]...GATTACA...[1000s of bases]...</div>
                        <div className="w-full h-1 bg-cyan-400 rounded-full my-2"></div>
                        <p className="text-slate-400 text-xs md:text-sm">Full Chromosome View</p>
                     </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-12">
            <Header 
                kicker={data.kicker}
                title={data.title}
                kickerClass={data.kickerClass}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-7xl mx-auto px-4">
                {data.quadrants.map((quad: any, i: number) => (
                    <EngineQuadrant 
                        key={i}
                        icon={quad.icon}
                        title={quad.title}
                        stat={quad.stat}
                        statLabel={quad.statLabel}
                        visual={getVisual(quad.visualType)}
                        explanation={quad.explanation}
                        delay={0.2 + i * 0.2}
                    />
                ))}
            </div>
        </div>
    );
};


const GenerativeAdvantageSlide = () => (
    <div className="space-y-8 md:space-y-12">
        <Header 
            kicker="The Engine of Certainty: Our Unfair Advantage"
            title="We Don't Discover. We Forge."
            kickerClass="from-purple-400 to-pink-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch px-4">
            {/* The Old Way */}
            <motion.div className="bg-slate-800/50 p-4 md:p-8 rounded-2xl border-2 border-slate-700 text-center" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay:0.2}}>
                 <h3 className="text-xl md:text-3xl font-bold text-white">The Old Way: A Lottery of Noise</h3>
                 <div className="relative h-32 md:h-64 my-4 flex items-center justify-center">
                    <Cpu size={32} className="text-slate-500 absolute left-0 top-1/2 -translate-y-1/2 md:size-12" />
                    {Array.from({length:10}).map((_,i) => (
                        <motion.div
                            key={i}
                            className="absolute"
                            initial={{x:0, opacity:1}}
                            animate={{x: 200 + Math.random()*100, y: (Math.random()-0.5)*200, opacity: 0}}
                            transition={{delay: 1 + i*0.1, duration: 1}}
                        >
                            {i < 2 ? <Bot className="w-6 h-6 md:w-8 md:h-8 text-green-500" /> : <Dna className="w-6 h-6 md:w-8 md:h-8 text-red-500 opacity-50" />}
                        </motion.div>
                    ))}
                 </div>
                 <div className="bg-red-900/50 p-3 md:p-4 rounded-lg border border-red-700">
                    <p className="text-3xl md:text-5xl font-black text-red-300">~18%</p>
                    <p className="text-sm md:text-lg font-semibold text-red-400">Functional Hit Rate</p>
                 </div>
                 <p className="text-sm md:text-base text-slate-400 mt-4">Previous models produce a storm of non-functional biological noise, hoping for a lucky hit.</p>
            </motion.div>
            {/* The Zeta Way */}
            <motion.div className="bg-slate-800/50 p-4 md:p-8 rounded-2xl border-2 border-purple-500 text-center" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay:0.4}}>
                 <h3 className="text-xl md:text-3xl font-bold text-purple-300">The Zeta Way: The Biological Forge</h3>
                  <div className="flex flex-col md:flex-row items-center justify-center h-32 md:h-64 my-4 space-y-2 md:space-y-0 md:space-x-4">
                    <FileCode size={32} className="text-slate-400 md:size-12" />
                    <ArrowRight size={24} className="text-slate-600 md:size-8"/>
                    <div className="relative"><Cpu size={48} className="text-purple-400 md:size-16" /><BrainCircuit className="absolute inset-0 w-full h-full text-purple-400 animate-pulse" /></div>
                    <ArrowRight size={24} className="text-slate-600 md:size-8"/>
                    <div className="grid grid-cols-2 gap-1 md:gap-2">
                        {Array.from({length:10}).map((_, i) => (
                             <Bot key={i} className={`w-6 h-6 md:w-8 md:h-8 ${i < 7 ? 'text-green-400' : 'text-red-500 opacity-50'}`} />
                        ))}
                    </div>
                 </div>
                 <div className="bg-green-900/50 p-3 md:p-4 rounded-lg border border-green-700">
                    <p className="text-3xl md:text-5xl font-black text-green-300">~70%</p>
                    <p className="text-sm md:text-lg font-semibold text-green-400">Functional Hit Rate</p>
                 </div>
                 <p className="text-sm md:text-base text-slate-400 mt-4">We use a biological blueprint to engineer functional, de-risked assets on demand.</p>
            </motion.div>
        </div>
         <motion.div 
            className="bg-purple-900/50 p-4 md:p-6 rounded-lg border-2 border-purple-600 max-w-5xl mx-auto"
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay: 1.0}}
        >
            <p className="text-lg md:text-3xl font-bold text-purple-200 px-4">THE UNFAIR ADVANTAGE: Our nearly 4x improvement proves we have transformed therapeutic design from a game of chance into a discipline of engineering.</p>
        </motion.div>
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
// 3. SLIDE DATA & CONFIGURATION
//================================================================================

const deckConfig = {
    brandName: "ZETA",
    brandAccent: "BIOWORKS"
};

const slideData = [
    {
        component: TitleSlideTemplate,
        data: {
            title: "The End of Biological Gambling",
            subtitle: "An Agentic Platform for Engineering Therapeutic Certainty",
            icons: ["Users", "UserCheck"],
            footer: "We replace the billion-dollar gamble of R&D with the certainty of engineering."
        }
    },
    {
        component: ProblemSlideTemplate,
        data: {
            kicker: "The $2B Gamble",
            title: "The R&D pipeline is a cascade of uncertainty.",
            points: [
                { icon: "Users", stat: "86%", title: "Recruitment Failure", description: "Of trials fail to meet recruitment targets." },
                { icon: "FilterX", stat: "~50%", title: "Screen Failure", description: "Of patients are rejected due to crude criteria." },
                { icon: "TrendingDown", stat: "30%", title: "Efficacy Collapse", description: "Of Phase III trials fail for lack of efficacy." }
            ],
            summary: {
                stat: "$2B+ & 10+ Years",
                text: "The average cost per approved drug."
            }
        }
    },
     {
        component: HowItWorksTemplate,
        data: {
            kicker: "Our Engine: A Biological Simulation",
            title: "We build, simulate, and validate. In-silico.",
            steps: [
                { title: "1. Construct Digital Twin", description: "We build an in-silico patient from their genomic data.", icons: ["Dna", "UserCheck"], iconColor: "text-cyan-400" },
                { title: "2. Run In-Silico Trial", description: "We simulate the drug's mechanism of action against the twin.", icons: ["FlaskConical", "Cpu"], iconColor: "text-purple-400" },
                { title: "3. Deliver the Verdict", description: "We predict efficacy and adverse events to create a perfect cohort.", icons: ["CheckCircle", "XCircle"], iconColor: "text-green-400" }
            ],
            footer: "Our competitors match text. We simulate biology."
        }
    },
    {
        component: FoundationSlideTemplate,
        data: {
            kicker: "Our Indefensible Moat",
            title: "We Simulate Biology. They Search Text.",
            points: [
                { 
                    icon: "Dna", 
                    title: "Trained on Life's Source Code", 
                    subtitle: "Our engine understands biology, not just words.", 
                    visual: "text", 
                    visualContent: `Our Evo2 engine was trained on <span class="text-cyan-400 font-bold">trillions of DNA base pairs</span>—the operating system of life.` 
                },
                { 
                    icon: "BrainCircuit", 
                    title: "Mirrors Clinical Reality", 
                    subtitle: "Our predictions aren't theoretical.", 
                    visual: "graph", 
                    stat: "0.957", 
                    statLabel: "ClinVar AUROC", 
                    statContext: "(n=53,210 variants)" 
                }
            ]
        }
    },
    {
        component: FeatureSlideTemplate,
        data: {
            kicker: "The Engine Room: Weapon 1",
            title: "We Quantify Biological Damage",
            kickerClass: "from-green-400 to-emerald-500",
            flow: [
                { type: 'start', icon: 'Dna', label: 'Patient Variant' },
                { type: 'arrow' },
                { type: 'process', icon: 'Zap', label: '/PredictVariantImpact' },
                { type: 'arrow' },
                { type: 'end', value: '-18.7k', label: 'Damage Score' }
            ],
            explanation: {
                title: `Why It Matters: <span class="text-cyan-400">A De-Risking Engine</span>`,
                text: `This isn't a theoretical model. It's proven on over <strong>53,000 real-world variants</strong>. Our 'go/no-go' decisions are based on truth, not guesswork. This saves millions in wasted capital <em>before</em> the first experiment is even run.`,
                stat: {
                    value: "0.957",
                    label: "ClinVar AUROC"
                }
            }
        }
    },
    {
        component: ThreeColumnFeatureTemplate,
        data: {
            kicker: "The Engine Room",
            title: "Our Predictions Are Not Magic. They Are A New Science.",
            kickerClass: "from-green-400 to-emerald-500",
            columns: [
                { icon: "Zap", iconColor: "text-green-400", title: "Undeniable Accuracy", description: "Our predictions mirror clinical reality, providing a de-risking engine that saves millions before experiments even begin.", borderColor: "border-slate-700", proof: { label: "THE PROOF:", value: "0.957", subtext: "ClinVar AUROC (n=53,210)", textColor: "text-green-300" } },
                { icon: "BrainCircuit", iconColor: "text-green-400", title: "The Transparent 'Why'", description: "We crack open the 'black box' to reveal the exact biological mechanism for every prediction, providing a defensible moat of trust.", borderColor: "border-slate-700", proof: { label: "THE PROOF:", value: "0.826", subtext: "SpliceVarDB AUROC", textColor: "text-green-300" } },
                { icon: "Bot", iconColor: "text-purple-400", title: "The Unfair Advantage", description: "We don't just analyze biology; we write it. Our generative engine forges novel, functional assets on demand.", borderColor: "border-purple-500", proof: { label: "THE PROOF:", value: "~70%", subtext: "Functional Hit Rate", textColor: "text-purple-300" } }
            ]
        }
    },
    {
        component: FourQuadrantTemplate,
        data: {
            kicker: "The Engine of Certainty",
            title: "Our Predictions Are Not Magic. They Are A New Science.",
            kickerClass: "from-green-400 to-emerald-500",
            quadrants: [
                { icon: "Zap", title: "Undeniable Accuracy", stat: "95.7%", statLabel: "ClinVar AUROC", visualType: "accuracy", explanation: "WHAT IT MEANS: Our predictions mirror clinical reality. WHY IT MATTERS: This is our de-risking engine, saving millions before experiments even begin." },
                { icon: "BrainCircuit", title: "Transparent 'Why'", stat: "73%", statLabel: "VUS Resolution", visualType: "vusResolution", explanation: "WHAT IT MEANS: We turn paralyzing 'maybes' into actionable 'yes' or 'no' verdicts. WHY IT MATTERS: This is our defensible moat of trust and regulatory safety." },
                { icon: "Bot", title: "On-Demand Assets", stat: "~70%", statLabel: "Functional Hit Rate", visualType: "onDemandAssets", explanation: "WHAT IT MEANS: We design novel, functional proteins from scratch. WHY IT MATTERS: We don't search for solutions; we create them." },
                { icon: "FileCode", title: "The God's-Eye View", stat: "1M", statLabel: "Token Context", visualType: "context", explanation: "WHAT IT MEANS: We see the entire chromosome at single-letter resolution. WHY IT MATTERS: We understand the long-range interactions that are the true drivers of disease." }
            ]
        }
    },
    {
        component: GenerativeAdvantageSlide
    },
    {
        component: AskSlideTemplate,
        data: {
            kicker: "The Opportunity",
            title: "Partner with us to engineer the future of medicine.",
            askText: "Bring us your toughest VUS or a stalled program. We will run an in-silico pilot to demonstrate how we can de-risk your multi-billion dollar asset.",
            buttonText: "Stop Gambling. Start Engineering."
        }
    }
];

//================================================================================
// 4. MAIN APP
//================================================================================

export default function App() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => setCurrentSlide(prev => (prev === slideData.length - 1 ? 0 : prev + 1)), []);
    const prevSlide = useCallback(() => setCurrentSlide(prev => (prev === 0 ? slideData.length - 1 : prev - 1)), []);

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
}