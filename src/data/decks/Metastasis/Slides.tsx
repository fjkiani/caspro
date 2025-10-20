// components/Slides.js

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Chart from 'chart.js/auto';
import { iconMap, Header } from './UI';
import { CheckCircle, Shield, Gavel } from 'lucide-react';

// You might need to adjust imports if any components here need other specific icons

// --- TYPE DEFINITIONS ---
interface SlideProps {
  title?: string;
  subtitle?: string;
  kicker?: string;
  stat?: string;
  statDescription?: string;
  stages?: (string | { name: string; icon: string })[];
  quote?: string;
  conclusion?: string;
  paragraph1?: string;
  chartTitle?: string;
  chartData?: any;
  heatmapTitle?: string;
  heatmapDescription?: string;
  heatmapData?: any;
  candidate?: any;
  talkingPoints?: any[];
  impacts?: any[];
  askAmount?: string;
  askType?: string;
  points?: string[];
  modules?: any[];
  roadmap?: any[];
  [key: string]: any;
}

// --- SLIDE COMPONENTS ---

export const MetastasisTitleSlide: React.FC<SlideProps> = ({ title, subtitle }) => (
    <div className="space-y-12">
        <motion.h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400" initial={{opacity:0, y: -20}} whileInView={{opacity:1, y: 0}} viewport={{once: true}} transition={{delay: 0.2}}>
            {title}
        </motion.h1>
        <motion.h2 className="text-3xl md:text-5xl font-light text-cyan-500" initial={{opacity:0, y: 20}} whileInView={{opacity:1, y: 0}} viewport={{once: true}} transition={{delay: 0.5}}>
            {subtitle}
        </motion.h2>
    </div>
);

export const ProblemSlide: React.FC<SlideProps> = ({ kicker, title, stat, statDescription, stages, quote }) => (
    <div className="space-y-8">
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} transition={{duration:0.7}}>
            <h2 className="text-3xl md:text-4xl font-bold text-orange-400">{kicker}</h2>
            <h1 className="text-4xl md:text-6xl font-black text-slate-100 mt-2 max-w-5xl mx-auto">{title}</h1>
        </motion.div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <motion.div className="text-center" initial={{opacity:0, scale: 0.5}} whileInView={{opacity:1, scale: 1}} viewport={{once: true}} transition={{delay: 0.5, duration: 0.8, type: 'spring', stiffness: 100}}>
                <p className="text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 leading-none">{stat}</p>
                <p className="text-2xl font-bold text-slate-300 -mt-4">{statDescription}</p>
            </motion.div>
            <motion.div className="space-y-2" initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once: true}} transition={{delay: 1.0, duration: 0.7}}>
                <h3 className="text-xl font-bold text-slate-200 mb-3">A complex, multi-stage problem:</h3>
                {stages?.map((stage, i) => (
                     <motion.div key={i} className="flex items-center space-x-3" initial={{opacity: 0, x:20}} whileInView={{opacity:1, x:0}} viewport={{once: true}} transition={{delay: 1.2 + i * 0.15}}>
                         <div className="bg-slate-800 text-red-400 font-bold rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 border border-slate-700">{i+1}</div>
                        <p className="text-md font-semibold text-slate-400">{typeof stage === 'string' ? stage : stage.name}</p>
                     </motion.div>
                ))}
                <p className="text-center text-slate-500 font-bold text-2xl">...</p>
            </motion.div>
        </div>
        <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 1.8, duration: 0.7}}>
            <p className="text-xl text-white font-semibold bg-slate-800/50 p-4 border-l-4 border-orange-500 rounded-r-lg max-w-3xl mx-auto">{quote}</p>
        </motion.div>
    </div>
);

export const MetastasisBattlefieldSlide: React.FC<SlideProps> = ({ kicker, title, conclusion }) => {
    const dominoContainerVariants = { animate: { transition: { staggerChildren: 0.15 } } };
    const dominoVariants = {
        initial: { rotate: 0 },
        animate: { rotate: 90, transition: { duration: 0.4, ease: 'easeIn' } }
    };
    return (
        <div className="space-y-12">
            <Header kicker={kicker || ''} title={title || ''} kickerClass="from-red-600 to-orange-500" />
            <div className="relative h-96 flex items-center justify-center">
                <motion.div className="absolute z-10" initial={{y:-150, x: -200, rotate: 45}} animate={{y:20, x: -200, rotate: -25}} transition={{delay: 1, duration: 0.2, ease: 'easeIn'}}>
                    <Gavel className="w-48 h-48 text-slate-400" />
                </motion.div>
                <motion.div className="flex space-x-4" variants={dominoContainerVariants} initial="initial" animate="animate">
                    {Array.from({length: 8}).map((_, i) => (
                        <motion.div key={i} className="w-8 h-40 bg-slate-700 rounded-md origin-bottom flex items-center justify-center text-white font-bold text-xl" custom={i} variants={{initial: { rotate: 0 }, animate: i => ({ rotate: i === 0 ? 90 : 0, transition: { delay: 1.2, duration: 0.4, ease: 'easeIn' } })}}>
                             <motion.div className="w-full h-full bg-slate-700 rounded-md origin-bottom flex items-center justify-center text-white font-bold text-xl" variants={dominoVariants} transition={{delay: 1.3 + (i*0.15)}}>
                                {i + 1}
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            <motion.h2 className="text-4xl font-bold text-white max-w-4xl mx-auto" initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 2.5}}>
                {conclusion?.split(" ").map((word, i) => (
                    <span key={i} className={/8-Stage|Single/.test(word) ? 'text-cyan-400' : /Failure/.test(word) ? 'text-red-500' : ''}>
                        {word}{' '}
                    </span>
                ))}
            </motion.h2>
        </div>
    );
};

export const IntelligenceVictorySlide: React.FC<SlideProps> = ({ kicker, title, stages, conclusion }) => {
    const ArrowRight = iconMap['ArrowRight'];
    return (
        <div className="space-y-12">
            <Header kicker={kicker || ''} title={title || ''} kickerClass="from-green-400 to-emerald-500" />
            <div className="flex items-center justify-center space-x-2">
                {stages?.map((stage, i) => {
                    if (typeof stage === 'string') return null;
                    const Icon = iconMap[stage.icon as keyof typeof iconMap];
                    return (
                        <React.Fragment key={stage.name}>
                            <motion.div className="bg-slate-800/50 p-4 rounded-xl border-2 border-slate-700 w-40 h-40 flex flex-col items-center justify-center" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: 0.2 + i * 0.2}}>
                                <Icon className="w-16 h-16 text-cyan-400" />
                                <p className="text-sm font-bold text-white mt-2">{i+1}. {stage.name}</p>
                            </motion.div>
                            {i < stages.length - 1 && 
                                <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3 + i * 0.2}}>
                                    <ArrowRight className="w-8 h-8 text-slate-600" />
                                </motion.div>
                            }
                        </React.Fragment>
                    );
                })}
            </div>
             <motion.h2 className="text-4xl font-bold text-white max-w-4xl mx-auto" initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 2.0}}>
                {conclusion?.split(" ").map((word, i) => <span key={i} className={word === "spreading." ? "text-red-500" : ""}>{word} </span>)}
            </motion.h2>
        </div>
    );
};

export const SolutionSlide: React.FC<SlideProps> = ({ kicker, title, stages, conclusion }) => {
    const ArrowRight = iconMap['ArrowRight'];
    return (
        <div className="space-y-12">
            <Header kicker={kicker || ''} title={title || ''} kickerClass="from-cyan-400 to-blue-500" />
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
                {stages?.map((stage, i) => {
                    if (typeof stage === 'string') return null;
                    const Icon = iconMap[stage.icon as keyof typeof iconMap];
                    return (
                        <React.Fragment key={stage.name}>
                            <motion.div className="flex flex-col items-center space-y-3" initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.5 + i * 0.2}}>
                                <div className="p-4 bg-slate-800/70 border-2 border-slate-700 rounded-full">
                                    <Icon className="w-12 h-12 text-cyan-400" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-200">{i+1}. {stage.name}</h3>
                            </motion.div>
                            {i < stages.length - 1 && (
                                <motion.div initial={{opacity: 0}} whileInView={{opacity:1}} viewport={{once: true}} transition={{delay: 0.6 + i * 0.2}}>
                                    <ArrowRight className="w-12 h-12 text-slate-600 mt-[-2rem]" />
                                </motion.div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
             <motion.p className="text-2xl text-slate-300 max-w-3xl mx-auto" initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}} transition={{delay: 1.5}}>
                {conclusion}
             </motion.p>
        </div>
    );
};

export const AhaMomentSlide: React.FC<SlideProps> = ({ kicker, title, paragraph1, quote, chartTitle, chartData }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        let chartInstance = null;
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData.labels,
                    datasets: [{
                        label: 'Chromatin Score', data: chartData.values,
                        backgroundColor: ['#64748b', '#67e8f9'], borderColor: ['#94a3b8', '#0891b2'],
                        borderWidth: 2, borderRadius: 5,
                    }]
                },
                options: {
                    maintainAspectRatio: false, indexAxis: 'y',
                    scales: {
                        x: { beginAtZero: true, max: 0.7, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8', font: { size: 14, weight: 'bold' } } },
                        y: { grid: { display: false }, ticks: { color: '#e2e8f0', font: { size: 16, weight: 'bold' } } }
                    },
                    plugins: { legend: { display: false }, tooltip: { enabled: false } }
                }
                });
            }
        }
        return () => { if (chartInstance) chartInstance.destroy(); };
    }, [chartData]);

    return (
        <div className="space-y-8">
            <Header kicker={kicker || ''} title={title || ''} kickerClass="from-purple-400 to-pink-500" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
                <motion.div className="text-left" initial={{opacity:0, x:-30}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{delay:0.3, duration:0.7}}>
                    <p className="text-xl text-slate-300 mb-4">{paragraph1}</p>
                    <p className="text-2xl text-white font-bold bg-slate-800/50 p-4 border-l-4 border-cyan-400 rounded-r-lg">
                        {quote?.split(/(-93.8%)/).map((part, index) => 
                            part === '-93.8%' ? <span key={index} className="text-red-400 font-black text-3xl">{part}</span> : part
                        )}
                    </p>
                </motion.div>
                <motion.div className="w-full h-80 bg-slate-800/50 p-6 rounded-xl border-2 border-slate-700" initial={{opacity:0, x:30}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{delay:0.6, duration:0.7}}>
                    <h3 className="text-lg font-bold text-white mb-2">{chartTitle}</h3>
                    <canvas ref={chartRef}></canvas>
                </motion.div>
            </div>
        </div>
    );
};

const HeatmapChart: React.FC<{ data: any }> = ({ data }) => {
    const getColorForValue = (value: number) => {
        if (value > 0.47) return 'bg-red-600'; if (value > 0.45) return 'bg-orange-500'; if (value > 0.4) return 'bg-amber-500';
        if (value > 0.35) return 'bg-yellow-500'; return 'bg-yellow-600';
    };
    return (
        <div className="bg-slate-800/50 p-4 rounded-xl border-2 border-slate-700 text-xs">
            <div className="grid grid-cols-9 gap-1">
                <div />
                {data.steps.map((step: string) => <div key={step} className="font-bold text-slate-400 -rotate-45 h-24 flex items-start justify-center">{step.replace(/_/g, ' ')}</div>)}
            </div>
            {data.genes.map((gene: string, geneIndex: number) => (
                <div key={gene} className="grid grid-cols-9 gap-1 items-center mt-1">
                    <div className="font-bold text-slate-300 text-right pr-2">{gene}</div>
                    {data.scores[geneIndex].map((score: number, stepIndex: number) => (
                        <div key={`${gene}-${stepIndex}`} className={`w-full h-10 rounded-md flex items-center justify-center font-bold text-white/80 transition-transform duration-200 hover:scale-110 hover:border-2 border-white ${getColorForValue(score)}`}>
                            {score.toFixed(3)}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export const ValidationSlide: React.FC<SlideProps> = ({ kicker, title, chartTitle, chartData, heatmapTitle, heatmapDescription, heatmapData }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        let chartInstance = null;
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                chartInstance = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData.labels,
                    datasets: chartData.datasets.map((ds: any) => ({...ds, borderRadius: 4})),
                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        x: { grid: { display: false }, ticks: { color: '#94a3b8', font: { weight: 'bold' } } },
                        y: { beginAtZero: true, max: 1.0, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: '#94a3b8' } }
                    },
                    plugins: {
                        legend: { position: 'top', labels: { color: '#cbd5e1', font: { size: 14 } } },
                        tooltip: { titleFont: { size: 16 }, bodyFont: { size: 14 } }
                    }
                }
                });
            }
        }
        return () => { if (chartInstance) chartInstance.destroy(); };
    }, [chartData]);

    return (
        <div className="space-y-8">
            <Header kicker={kicker || ''} title={title || ''} kickerClass="from-green-400 to-emerald-500" />
            <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto items-center">
                 <motion.div className="w-full h-96 bg-slate-800/50 p-6 rounded-xl border-2 border-slate-700" initial={{opacity:0, x:-30}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{delay:0.3, duration:0.7}}>
                    <h3 className="text-xl font-bold text-white mb-4">{chartTitle}</h3>
                    <canvas ref={chartRef}></canvas>
                </motion.div>
                <motion.div className="text-left space-y-6" initial={{opacity:0, x:30}} whileInView={{opacity:1, x:0}} viewport={{once:true}} transition={{delay:0.6, duration:0.7}}>
                    <h3 className="text-3xl font-bold">{heatmapTitle}</h3>
                    <p className="text-lg text-slate-300">
                        {heatmapDescription?.split(/(14 FDA-approved drug targets)/).map((part, index) => 
                            part === '14 FDA-approved drug targets' ? <span key={index} className="font-bold text-green-400">{part}</span> : part
                        )}
                    </p>
                    <div className="scale-75 -mx-16">
                        <HeatmapChart data={heatmapData} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export const OutputSlide: React.FC<SlideProps> = ({ kicker, title, candidate, talkingPoints, conclusion }) => {
    const { efficacy, safety, missionFit } = candidate.scores;
    const totalScore = (efficacy * 0.4 + safety * 0.3 + missionFit * 0.3).toFixed(3);

    const colorClasses = {
        purple: { text: 'text-purple-400', bg: 'bg-purple-500', border: 'border-purple-400' },
        green: { text: 'text-green-400', bg: 'bg-green-500', border: 'border-green-400' },
        cyan: { text: 'text-cyan-400', bg: 'bg-cyan-500', border: 'border-cyan-400' },
    }

    return (
        <div className="space-y-8">
            <Header kicker={kicker || ''} title={title || ''} kickerClass="from-amber-400 to-yellow-500" />
            <div className="grid md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
                <motion.div className="bg-slate-800/50 rounded-2xl border-2 border-slate-700 shadow-2xl p-8 text-left" initial={{opacity: 0, scale: 0.8}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true}} transition={{delay: 0.4, duration: 0.7, type: 'spring'}}>
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="font-bold text-amber-300">TOP CANDIDATE</p>
                            <h3 className="text-3xl font-bold text-white">Target: {candidate.name}</h3>
                            <p className="text-lg text-slate-400">Mission: {candidate.mission}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-slate-300">Assassin Score</p>
                            <p className="text-7xl font-black text-amber-400">{totalScore}</p>
                        </div>
                    </div>
                    <div className="mt-8 space-y-4">
                        <div>
                            <div className="flex justify-between text-sm font-bold text-slate-300"><span>Efficacy (40%)</span><span>{(efficacy * 100).toFixed(1)}%</span></div>
                            <div className="w-full bg-slate-700 rounded-full h-4 mt-1"><motion.div className="bg-purple-500 h-4 rounded-full" initial={{width: "0%"}} whileInView={{width: `${efficacy * 100}%`}} viewport={{once: true}} transition={{delay: 0.8, duration: 1}} /></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm font-bold text-slate-300"><span>Safety (30%)</span><span>{(safety * 100).toFixed(1)}%</span></div>
                            <div className="w-full bg-slate-700 rounded-full h-4 mt-1"><motion.div className="bg-green-500 h-4 rounded-full" initial={{width: "0%"}} whileInView={{width: `${safety * 100}%`}} viewport={{once: true}} transition={{delay: 1.0, duration: 1}} /></div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm font-bold text-slate-300"><span>Mission Fit (30%)</span><span>{(missionFit * 100).toFixed(1)}%</span></div>
                            <div className="w-full bg-slate-700 rounded-full h-4 mt-1"><motion.div className="bg-cyan-500 h-4 rounded-full" initial={{width: "0%"}} whileInView={{width: `${missionFit * 100}%`}} viewport={{once: true}} transition={{delay: 1.2, duration: 1}} /></div>
                        </div>
                    </div>
                </motion.div>
                <motion.div className="text-left space-y-4" initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ staggerChildren: 0.2, delayChildren: 0.8 }}>
                    <motion.h3 className="text-3xl font-bold text-white" variants={{hidden:{opacity:0, x:20}, visible:{opacity:1, x:0}}}>What does this score mean?</motion.h3>
                    {talkingPoints?.map((point: any) => {
                        const Icon = iconMap[point.icon as keyof typeof iconMap];
                        const colors = colorClasses[point.color as keyof typeof colorClasses] || {};
                        return (
                            <motion.p key={point.text} className="text-lg text-slate-300 flex items-start" variants={{hidden:{opacity:0, x:20}, visible:{opacity:1, x:0}}}>
                                <Icon className={`w-8 h-8 ${colors.text} mr-3 flex-shrink-0`}/> {point.text}
                            </motion.p>
                        )
                    })}
                    <motion.p className="text-xl text-white font-bold bg-slate-800/50 p-4 border-l-4 border-amber-400 rounded-r-lg" variants={{hidden:{opacity:0, x:20}, visible:{opacity:1, x:0}}}>{conclusion}</motion.p>
                </motion.div>
            </div>
        </div>
    );
};

export const ImpactSlide: React.FC<SlideProps> = ({ kicker, title, impacts }) => (
    <div className="space-y-12">
        <Header kicker={kicker || ''} title={title || ''} kickerClass="from-green-400 to-emerald-500" />
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {impacts?.map((impact: any, i: number) => (
                <motion.div key={i} className="bg-slate-800/50 p-8 rounded-2xl border-2 border-slate-700" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.2 }}>
                    <p className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-400">{impact.value}</p>
                    <h3 className="text-3xl font-bold text-white mt-2">{impact.title}</h3>
                    <p className="text-lg text-slate-400 mt-4">{impact.description}</p>
                </motion.div>
            ))}
        </div>
    </div>
);

export const VictorySlide: React.FC<SlideProps> = ({ kicker, title, stages, conclusion }) => (
    <div className="space-y-12">
        <Header kicker={kicker || ''} title={title || ''} kickerClass="from-green-400 to-emerald-500" />
        <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Before */}
            <motion.div className="bg-slate-800/50 p-6 rounded-2xl border-2 border-slate-700" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay:0.2}}>
                <h3 className="text-3xl font-bold text-white mb-4">Before: The Unchecked Invasion</h3>
                <div className="flex flex-col space-y-2">
                    {stages?.map((stage, i: number) => (
                         <motion.div key={i} className="flex items-center space-x-4" initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.4 + i * 0.2}}>
                            <div className="w-10 h-10 bg-red-900/50 rounded-full flex items-center justify-center font-bold text-red-300 border-2 border-red-700">{i+1}</div>
                            <p className="text-lg text-slate-300">{typeof stage === 'string' ? stage : stage.name}</p>
                            {i < (stages?.length || 0) - 1 && <div className="flex-grow h-px bg-red-700/50"></div>}
                        </motion.div>
                    ))}
                </div>
                 <div className="mt-6 p-4 bg-red-900/50 rounded-lg border border-red-700 text-center">
                    <p className="text-2xl font-bold text-red-300">OUTCOME: SYSTEMIC FAILURE</p>
                </div>
            </motion.div>
            {/* After */}
            <motion.div className="bg-slate-800/50 p-6 rounded-2xl border-2 border-green-500" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay:0.4}}>
                <h3 className="text-3xl font-bold text-green-400 mb-4">After: The Zeta Interception</h3>
                <div className="flex flex-col space-y-2">
                    {stages?.map((stage, i: number) => (
                         <motion.div key={i} className={`flex items-center space-x-4 ${i >= 2 ? 'opacity-40' : ''}`} initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 0.4 + i * 0.2}}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${i < 2 ? 'bg-green-900/50 text-green-300 border-green-700' : 'bg-slate-700 text-slate-400 border-slate-600'}`}>{i+1}</div>
                            <p className={`text-lg ${i < 2 ? 'text-slate-300' : 'text-slate-500'}`}>{typeof stage === 'string' ? stage : stage.name}</p>
                            {i === 1 && (
                                 <motion.div className="flex-grow flex items-center" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.0}}>
                                    <div className="h-4 w-4 bg-purple-500 rounded-full animate-pulse"></div>
                                    <div className="flex-grow h-px bg-purple-500"></div>
                                    <Shield className="w-16 h-16 text-purple-400" />
                                 </motion.div>
                            )}
                            {i < 1 && <div className="flex-grow h-px bg-green-700/50"></div>}
                            {i > 1 && i < stages.length -1 && <div className="flex-grow h-px bg-slate-600"></div>}
                        </motion.div>
                    ))}
                </div>
                <div className="mt-6 p-4 bg-green-900/50 rounded-lg border border-green-700 text-center">
                    <p className="text-2xl font-bold text-green-300">OUTCOME: CASCADE NEUTRALIZED</p>
                </div>
            </motion.div>
        </div>
        <motion.h2 className="text-4xl font-bold text-white max-w-4xl mx-auto" initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 2.5}}>
            {conclusion?.split(" ").map((word, i) => <span key={i} className={word === "Break." ? "text-cyan-400" : ""}>{word} </span>)}
        </motion.h2>
    </div>
);

export const UnfairAdvantageSlide: React.FC<SlideProps> = ({ kicker, title, stages, conclusion }) => {
    const Cpu = iconMap['Cpu'];
    const Target = iconMap['Target'];
    return (
        <div className="space-y-12">
            <Header kicker={kicker || ''} title={title || ''} kickerClass="from-purple-400 to-pink-500" />
            <div className="relative h-[28rem] flex items-center justify-center">
                 <motion.div className="text-center" initial={{opacity:0, scale:0.5}} animate={{opacity:1, scale:1}} transition={{delay:0.4, duration: 0.5}}>
                    <div className="p-6 bg-slate-800 rounded-full border-2 border-purple-500">
                        <Cpu className="w-24 h-24 text-purple-400 mx-auto" />
                    </div>
                    <h3 className="text-2xl font-bold mt-4 text-white">Zeta Engine</h3>
                    <p className="font-mono text-purple-300">/scan_vulnerabilities</p>
                </motion.div>
                {stages?.map((stage: any, i: number) => {
                    const angle = (i / (stages?.length || 1)) * 2 * Math.PI; const radius = 300;
                    const x = Math.cos(angle) * radius; const y = Math.sin(angle) * radius;
                    const Icon = iconMap[stage.icon as keyof typeof iconMap];
                    return (
                        <motion.div key={stage.name} className="absolute top-1/2 left-1/2 p-3 bg-slate-800/50 rounded-xl border border-slate-700" initial={{x: '-50%', y: '-50%', opacity:0}} animate={{x: `calc(-50% + ${x}px)`, y: `calc(-50% + ${y}px)`, opacity:1}} transition={{delay: 0.8 + i*0.15, type:'spring', stiffness:100}}>
                            <div className="relative">
                                <Icon className="w-12 h-12 text-cyan-400"/>
                                <motion.div className="absolute inset-0 flex items-center justify-center" initial={{opacity:0, scale: 0}} animate={{opacity:1, scale: 1}} transition={{delay: 1.8 + i * 0.15}}>
                                    <Target className="w-16 h-16 text-red-500 animate-pulse" />
                                </motion.div>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
             <motion.h2 className="text-4xl font-bold text-white max-w-4xl mx-auto relative -top-12" initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 3.0}}>
                {conclusion?.split(" ").map((word, i) => <span key={i} className={/Unique|Genetic|Vulnerability/.test(word) ? "text-purple-400" : ""}>{word} </span>)}
            </motion.h2>
        </div>
    );
};

export const UnfairAdvantageSlide2: React.FC<SlideProps> = ({ kicker, title, modules, chartData, conclusion }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        let chartInstance = null;
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                chartInstance = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: chartData.labels,
                        datasets: [{
                            label: 'Vulnerability Score',
                            data: chartData.values,
                            backgroundColor: (c) => {
                                const value = c.dataset?.data?.[c.dataIndex];
                                const numValue = Array.isArray(value) ? value[0] : value;
                                return (numValue || 0) > 0.6 ? '#ec4899' : '#475569';
                            },
                            borderColor: '#1e293b',
                            borderWidth: 2,
                            borderRadius: 4,
                        }]
                    },
                    options: {
                        maintainAspectRatio: false,
                        indexAxis: 'y',
                        scales: {
                            x: {
                                beginAtZero: true,
                                max: 1,
                                grid: { color: 'rgba(255,255,255,0.1)' },
                                ticks: { color: '#94a3b8' }
                            },
                            y: {
                                grid: { color: 'rgba(255,255,255,0.1)' },
                                ticks: { color: '#94a3b8' }
                            }
                        },
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                callbacks: {
                                    label: function(c) {
                                        let rationale = '';
                                        if(c.label === 'Growth') rationale = 'MAPK hyperactivation';
                                        if(c.label === 'Invasion') rationale = 'EMT activation';
                                        if(c.label === 'Angiogenesis') rationale = 'VEGF upregulation';
                                        return `Score: ${c.raw} (${rationale})`;
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
        return () => { if(chartInstance) chartInstance.destroy(); };
    }, [chartData]);
    const Dna = iconMap['Dna'], Cpu = iconMap['Cpu'], BrainCircuit = iconMap['BrainCircuit'];
    return (
        <div className="space-y-8">
            <Header kicker={kicker || ''} title={title || ''} kickerClass="from-purple-400 to-pink-500" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-7xl mx-auto">
                <motion.div className="flex flex-col items-center" initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{delay:0.2}}>
                    <Dna className="w-24 h-24 text-cyan-400" /> <p className="font-bold text-lg mt-2">INPUT: Patient Mutations</p> <p className="font-mono text-cyan-400">BRAF V600E</p>
                </motion.div>
                <motion.div className="relative flex flex-col items-center" initial={{opacity:0, scale:0.8}} animate={{opacity:1, scale:1}} transition={{delay:0.6}}>
                    <Cpu className="w-32 h-32 text-purple-400"/> <BrainCircuit className="w-48 h-48 absolute text-purple-400/50 animate-spin-slow"/> <p className="font-bold text-lg mt-2">Zeta Interrogation Engine</p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {modules?.map((mod: any, i: number) => { const Icon = iconMap[mod.icon as keyof typeof iconMap]; return (
                            <div key={i} className="bg-slate-800/70 p-2 rounded-lg text-center border border-slate-700">
                                <Icon className="w-8 h-8 text-purple-300 mx-auto"/> <p className="text-xs font-semibold mt-1">{mod.label}</p>
                            </div>
                        );})}
                    </div>
                </motion.div>
                <motion.div className="flex flex-col items-center" initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{delay:1.0}}>
                    <h3 className="text-2xl font-bold text-white mb-2">The Vulnerability Map</h3>
                    <div className="w-full h-80 bg-slate-800/50 p-4 rounded-xl border-2 border-slate-700"><canvas ref={chartRef}></canvas></div>
                </motion.div>
            </div>
            <motion.h2 className="text-4xl font-bold text-white max-w-5xl mx-auto" initial={{opacity:0}} animate={{opacity:1}} transition={{delay: 1.5}}>{conclusion}</motion.h2>
        </div>
    );
};

export const VisionSlide: React.FC<SlideProps> = ({ kicker, title, roadmap }) => (
    <div className="space-y-12">
        <Header kicker={kicker || ''} title={title || ''} kickerClass="from-purple-400 to-fuchsia-500" />
        <div className="flex justify-center items-center space-x-8">
            {roadmap?.map((item: any, i: number) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                return (
                    <motion.div key={item.title} className="bg-slate-800/60 p-6 rounded-xl border border-slate-700 w-80 text-center" initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{delay: 0.4 + i * 0.2}}>
                        <Icon className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                        <p className="text-slate-400 mt-2">{item.text}</p>
                    </motion.div>
                );
            })}
        </div>
    </div>
);

export const AskSlide: React.FC<SlideProps> = ({ kicker, title, askAmount, askType, points }) => (
    <div className="space-y-8">
        <Header kicker={kicker || ''} title={title || ''} kickerClass="from-cyan-400 to-emerald-500" />
        <motion.div className="bg-slate-800/70 max-w-3xl mx-auto p-12 rounded-2xl border-2 border-slate-700" initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:0.4}}>
            <h2 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-cyan-300">{askAmount}</h2>
            <p className="text-3xl font-bold text-slate-200 mt-2">{askType}</p>
            <div className="text-left text-xl text-slate-300 mt-8 space-y-4">
                {points?.map((point: string, i: number) => (
                    <p key={i} className="flex items-center"><CheckCircle className="w-6 h-6 text-green-400 mr-3"/> {point}</p>
                ))}
            </div>
        </motion.div>
    </div>
);