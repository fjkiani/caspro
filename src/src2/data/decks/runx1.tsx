import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
import { runx1Content } from '../runx1Content';

// Branding Component (No change)
const Brand = () => (
    <div className="absolute bottom-8 right-8 z-20 text-lg font-semibold text-slate-400/70">
        CrisPRO.ai 🧬
    </div>
);

// Digital Synapse Background (No change, as it's already a reusable component)
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
        const nodeGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });

        for (let i = 0; i < 100; i++) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
            node.position.x = (Math.random() - 0.5) * 100;
            node.position.y = (Math.random() - 0.5) * 100;
            node.position.z = (Math.random() - 0.5) * 100;
            node.velocity = new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1);
            nodes.push(node);
            scene.add(node);
        }

        const lines = new THREE.Group();
        scene.add(lines);

        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            lines.children.forEach(line => {
                line.material.opacity -= 0.01;
                if (line.material.opacity <= 0) {
                    lines.remove(line);
                }
            });

            nodes.forEach(node => {
                node.position.add(node.velocity);
                if (node.position.x < -50 || node.position.x > 50) node.velocity.x *= -1;
                if (node.position.y < -50 || node.position.y > 50) node.velocity.y *= -1;
                if (node.position.z < -50 || node.position.z > 50) node.velocity.z *= -1;
            });

            if (Math.random() > 0.95 && lines.children.length < 50) {
                const node1 = nodes[Math.floor(Math.random() * nodes.length)];
                const node2 = nodes[Math.floor(Math.random() * nodes.length)];
                if (node1 !== node2) {
                    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8 });
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

// --- REUSABLE SUB-COMPONENTS ---

// A generic Card for displaying content like Inputs, AI Core, Outputs, etc.
const FeatureCard = ({ icon, title, description, accentColor, iconBg, borderColor, isAI }) => (
    <div className="flex flex-col items-center space-y-4">
        <div className={`relative ${isAI ? 'text-8xl' : 'text-6xl p-4 rounded-full border-2'} ${iconBg || ''} ${borderColor || 'border-slate-700'}`}>
            {icon}
            {isAI && <div className={`absolute inset-0 -m-4 border-2 ${borderColor || 'border-sky-400/50'} rounded-full animate-ping`}></div>}
        </div>
        <h3 className={`text-3xl font-bold ${accentColor || 'text-slate-300'}`}>{title}</h3>
        {description && <p className="text-slate-400 text-lg max-w-xs">{description}</p>}
    </div>
);

// Component for a step in a multi-step process
const ProcessStep = ({ icon, title, description, accentColor, borderColor, subtext }) => (
    <div className="flex flex-col items-center space-y-4">
        <div className={`text-6xl p-4 rounded-full border-2 ${borderColor} ${accentColor} text-white`}>
            {icon}
        </div>
        <h3 className={`text-3xl font-bold ${borderColor.replace('border-', 'text-')}`}>{title}</h3>
        {description && <p className="text-slate-400 text-lg max-w-xs">{description}</p>}
        {subtext && <p className={`text-lg font-semibold ${accentColor.replace('bg-', 'text-').replace('/20', '')}`}>{subtext}</p>}
    </div>
);

// Component for the "Two-Hit Hypothesis" diagram
const TwoHitDiagramCell = ({ title, subtext, colorClass, mutationIcon, animationClass }) => (
    <div className="flex flex-col items-center group">
        <div className={`relative w-32 h-32 ${colorClass} rounded-full flex items-center justify-center text-white shadow-2xl transform transition-transform group-hover:scale-110 ${animationClass || ''}`}>
            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm"></div>
            {mutationIcon && (
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-lg">{mutationIcon}</span>
                </div>
            )}
            <span className="text-sm font-bold z-10 text-center px-2" dangerouslySetInnerHTML={{__html: title}}></span>
        </div>
        <div className="mt-4 bg-slate-800/60 rounded-lg px-4 py-2 border border-slate-600/50 backdrop-blur-sm">
            <p className="text-slate-200 text-sm font-semibold text-center" dangerouslySetInnerHTML={{__html: subtext}}></p>
        </div>
    </div>
);

// Component for a competitive advantage pillar
const CompetitivePillar = ({ icon, title, text, borderColor, textColor }) => (
    <div className={`bg-slate-800/50 p-8 rounded-2xl border ${borderColor} text-center space-y-4`}>
        <div className="text-6xl">{icon}</div>
        <h3 className={`text-3xl font-bold ${textColor}`}>{title}</h3>
        <p className="text-slate-300 text-xl">{text}</p>
    </div>
);

// The new, reusable Slide component
const Slide = ({ slideData }) => {
    const { title, subtitle, background, content, headerAnimation, extraText } = slideData;
    const [activeSimStep, setActiveSimStep] = useState(-1);

    return (
        <section className={`relative w-full min-h-screen flex flex-col items-center justify-center text-center p-8 ${background} overflow-hidden`}>
            <Brand />
            <DigitalSynapseBackground />
            <div className="relative z-10 w-full max-w-7xl px-4 space-y-12">
                <div className="space-y-4">
                    <h1 className={`font-black drop-shadow-2xl leading-tight ${headerAnimation || 'text-slate-200 text-6xl md:text-7xl'}`}>
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-3xl md:text-4xl font-light text-slate-300 leading-relaxed max-w-5xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </div>
                
                {/* Dynamically render content based on the content prop */}
                {content.type === 'title-slide' && (
                    <div className="space-y-8">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl max-w-5xl mx-auto">
                            <p className="text-2xl md:text-3xl text-emerald-400 font-medium mb-4">{content.tagline}</p>
                        </div>
                        <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30 max-w-3xl mx-auto">
                            <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Presented by: <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{content.presenter}</span>
                            </p>
                            <p className="text-xl text-slate-300">{content.presenterTitle}</p>
                        </div>
                    </div>
                )}

                {content.type === 'two-hit-hypothesis' && (
                    <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-600/50">
                        <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-4">
                            {content.steps.map((step, index) => (
                                <React.Fragment key={index}>
                                    <TwoHitDiagramCell {...step} />
                                    {index < content.steps.length - 1 && (
                                        <div className="flex items-center justify-center mx-4">
                                            <div className="hidden lg:flex items-center">
                                                <div className="w-12 h-0.5 bg-gradient-to-r from-slate-400 to-slate-600"></div>
                                                <div className="w-0 h-0 border-l-6 border-r-0 border-t-3 border-b-3 border-l-slate-500 border-t-transparent border-b-transparent ml-1"></div>
                                            </div>
                                            <div className="lg:hidden">
                                                <div className="h-12 w-0.5 bg-gradient-to-b from-slate-400 to-slate-600"></div>
                                                <div className="w-0 h-0 border-t-6 border-b-0 border-l-3 border-r-3 border-t-slate-500 border-l-transparent border-r-transparent mt-1"></div>
                                            </div>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
                
                {content.type === 'process-steps' && (
                    <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-slate-600/50">
                        {content.simulate && (
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={() => {
                                        setActiveSimStep(-1);
                                        let s = -1;
                                        const id = setInterval(() => {
                                            s += 1;
                                            setActiveSimStep(s);
                                            if (s >= content.steps.length - 1) clearInterval(id);
                                        }, 400);
                                    }}
                                    className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-500"
                                >
                                    Simulate
                                </button>
                            </div>
                        )}
                        <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-8">
                            {content.steps.map((step, index) => (
                                <React.Fragment key={index}>
                                    <div className={`${index <= activeSimStep ? 'ring-2 ring-green-400 rounded-2xl' : ''}`}>
                                        {step.type === 'feature-card' ? <FeatureCard {...step} /> : <ProcessStep {...step} />}
                                    </div>
                                    {index < content.steps.length - 1 && (
                                        <div className="text-6xl text-slate-500 animate-pulse">➡️</div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                )}
                
                {content.type === 'risk-prediction-map' && (
                    <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-slate-600/50">
                        <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-8">
                            <FeatureCard {...content.knownThreat} />
                            <div className="text-6xl text-slate-500 animate-pulse">➡️</div>
                            <FeatureCard {...content.aiCore} isAI={true} />
                            <div className="text-6xl text-slate-500 animate-pulse">➡️</div>
                            <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-700 space-y-4">
                                <h3 className="text-3xl font-bold text-yellow-400">Probabilistic Map of Future Mutations</h3>
                                <div className="text-left space-y-2">
                                    {content.predictions.map((p, i) => (
                                        <p key={i} className="text-lg text-slate-300 font-mono bg-slate-800 p-2 rounded">{p.name} <span className={p.colorClass}>{p.risk}</span></p>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {content.type === 'therapeutic-arsenal' && (
                    <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-slate-600/50">
                        <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-8">
                            <FeatureCard {...content.input} />
                            <div className="text-6xl text-slate-500 animate-pulse">➡️</div>
                            <FeatureCard {...content.process} isAI={true} />
                            <div className="text-6xl text-slate-500 animate-pulse">➡️</div>
                            <div className="bg-slate-900/70 p-6 rounded-2xl border border-slate-700 space-y-4">
                                <h3 className="text-3xl font-bold text-green-400">Output: Therapeutic Arsenal</h3>
                                <div className="flex space-x-4 justify-center">
                                    {content.outputs.map((o, i) => (
                                        <div key={i} className="text-center">
                                            <div className="text-4xl">{o.icon}</div>
                                            <p className="text-lg text-green-400 mt-1">{o.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {content.type === 'competitive-advantage' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {content.pillars.map((pillar, index) => (
                            <CompetitivePillar key={index} {...pillar} />
                        ))}
                    </div>
                )}

                {content.type === 'approval-process' && (
                    <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-slate-600/30 w-full mx-auto">
                        <div className="flex flex-col lg:flex-row items-center justify-around space-y-12 lg:space-y-0 lg:space-x-8">
                            <div className="flex flex-col items-center space-y-6">
                                <h3 className="text-3xl font-bold text-slate-300 mb-4">The Digital Dossier</h3>
                                {content.dossier.map((d, i) => (
                                     <div key={i} className={`${d.bgClass} p-6 rounded-xl shadow-lg text-white font-bold text-center transform hover:scale-105 transition-transform ${d.borderClass}`}>
                                        {d.title}
                                        <p className="font-light text-sm">{d.subtitle}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="text-6xl text-teal-400 animate-pulse self-center my-4 lg:my-0">
                                    <span className="inline-block transform lg:rotate-0 rotate-90">➡️</span>
                                </div>
                                <div className="text-4xl">🔬</div>
                                <h3 className="text-2xl font-bold text-slate-300 mt-2">Wet Labs & Biotech Partners</h3>
                            </div>
                             
                             <div className="flex flex-col items-center space-y-4">
                                <div className="relative w-64 h-64 flex flex-col justify-center items-center">
                                    {content.fdaTiers.map((tier, i) => (
                                        <React.Fragment key={i}>
                                            <div className={`${tier.bgClass} ${tier.textColor} px-4 py-2 rounded-lg`}>{tier.title}</div>
                                            {i < content.fdaTiers.length - 1 && <div className="h-12 w-1 bg-slate-600"></div>}
                                        </React.Fragment>
                                    ))}
                                    <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 text-5xl text-teal-400 animate-pulse">🚀</div>
                                </div>
                                <p className="text-teal-300 font-semibold text-lg max-w-xs">{content.fdaText}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {content.type === 'gene-correction' && (
                    <>
                        <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-slate-600/50">
                            <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-8">
                                <ProcessStep {...content.problem} />
                                <div className="flex flex-col items-center space-y-4">
                                     <div className="text-6xl text-slate-500 animate-pulse">➡️</div>
                                    <h3 className="text-3xl font-bold text-purple-400">CrisPRO Delivery System</h3>
                                </div>
                                <ProcessStep {...content.outcome} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                            {content.infoBoxes.map((box, i) => (
                                <div key={i} className={`${box.bgClass} p-6 rounded-xl border ${box.borderColor} text-left`}>
                                    <h4 className={`text-2xl font-bold ${box.textColor} mb-3`}>{box.title}</h4>
                                    <p className="text-slate-300 text-lg">{box.text}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                
                {content.type === 'command-center-grid' && (
                    <>
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                            <div className="flex flex-col space-y-4">
                                <h3 className="text-3xl font-bold text-yellow-400">Inputs</h3>
                                {content.inputs.map((input, index) => (
                                    <div key={index} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 w-full">
                                        <div className="text-4xl">{input.icon}</div>
                                        <p className="text-xl font-semibold text-slate-300 mt-2">{input.text}</p>
                                        {input.subtext && <p className="text-yellow-400 font-bold text-lg">{input.subtext}</p>}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col items-center space-y-4">
                                <div className="text-8xl relative">
                                    🧠
                                    <div className="absolute inset-0 -m-4 border-2 border-sky-400/50 rounded-full animate-ping"></div>
                                </div>
                                <h3 className="text-4xl font-bold text-sky-400">AI Core</h3>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <h3 className="text-3xl font-bold text-green-400">Outputs</h3>
                                {content.outputs.map((output, index) => (
                                    <div key={index} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 w-full">
                                        <div className="text-4xl">{output.icon}</div>
                                        <p className="text-xl font-semibold text-slate-300 mt-2">{output.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-8">
                            {content.infoBoxes.map((box, index) => (
                                <div key={index} className="bg-slate-800/50 p-6 rounded-xl border border-cyan-500/30 text-center">
                                    <h4 className="text-2xl font-bold text-cyan-400 mb-3">{box.title}</h4>
                                    <p className="text-slate-300 text-lg">{box.text}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
                
                {extraText && (
                    <p className="text-slate-300 text-xl max-w-4xl mx-auto mt-8">{extraText}</p>
                )}
            </div>
        </section>
    );
};

// --- SLIDE DATA DEFINITION ---
const slidesData = [
    {
        title: <>{runx1Content.hero.title.split(' ')[0]}<br/><span className="text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{runx1Content.hero.title.replace(runx1Content.hero.title.split(' ')[0] + ' ', '')}</span></>,
        subtitle: <>{runx1Content.hero.subtitle}</>,
        background: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
        headerAnimation: 'text-7xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-8 tracking-tight leading-none',
        content: {
            type: 'title-slide',
            tagline: '🎯 A Demonstration of AI-Powered Therapeutic Design & Validation',
            presenter: 'Fahad Kiani',
            presenterTitle: 'Commander and Founder, CrisPRO.ai 🧬'
        }
    },
    {
        title: 'The Genetic Pathway to Disease',
        subtitle: <>The Two-Hit Hypothesis: <span className="text-red-400 font-bold"> A Model for Disease Progression</span></>,
        background: 'bg-gradient-to-br from-slate-800 via-red-900/20 to-slate-800',
        headerAnimation: 'text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 mb-6 leading-tight',
        content: {
            type: 'two-hit-hypothesis',
            steps: runx1Content.twoHit.steps.map(s => ({ title: s.titleHTML, subtext: s.subtextHTML, colorClass: s.color === 'green' ? 'bg-gradient-to-br from-green-400 to-emerald-600' : s.color === 'yellow' ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : s.color === 'orange' ? 'bg-gradient-to-br from-orange-500 to-red-600' : 'bg-gradient-to-br from-red-600 to-red-900', mutationIcon: s.icon, animationClass: s.animated === 'pulse' ? 'animate-pulse' : s.animated === 'spin' ? 'animate-spin' : '' }))
        },
        extraText: runx1Content.twoHit.caption
    },
    {
        title: 'Phase I: From Ambiguity to Actionable Insight',
        subtitle: 'Solving the "Variant of Uncertain Significance" (VUS) Crisis',
        background: 'bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900',
        headerAnimation: 'text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 mb-6 leading-tight',
        content: {
            type: 'process-steps',
            steps: [
                { icon: '🧬', title: 'The VUS Problem', description: 'A genetic variant is identified, but its impact is unknown, creating a clinical dead end.', borderColor: 'border-yellow-400', accentColor: 'text-yellow-400' },
                { icon: '🧠', title: 'CrisPRO', description: 'Our AI analyzes the variant from first principles, understanding its biological grammar.', borderColor: 'border-cyan-400', accentColor: 'text-cyan-400' },
                { type: 'custom', icon: '✅', title: 'Pathogenic Verdict', description: 'The Oracle delivers a definitive, quantitative score, providing the certainty to act.', borderColor: 'border-red-400', accentColor: 'text-red-400' }
            ]
        }
    },
    {
        title: 'Phase II: Predictive Modeling of Disease Evolution',
        subtitle: 'Mapping Future Mutations to Design Proactive Therapies',
        background: 'bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900',
        headerAnimation: 'text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-6 leading-tight',
        content: {
            type: 'risk-prediction-map',
            knownThreat: { icon: '🧬', title: runx1Content.riskMap.knownThreat.title, subtext: runx1Content.riskMap.knownThreat.subtext, iconBg: 'bg-red-500/20', borderColor: 'border-red-500', accentColor: 'text-red-400' },
            aiCore: { icon: '🧠', title: runx1Content.riskMap.aiCore.title, borderColor: 'border-cyan-400/50' },
            predictions: runx1Content.riskMap.predictions.map(p => ({ name: p.name, risk: p.risk, colorClass: p.level === 'high' ? 'text-red-400' : p.level === 'medium' ? 'text-orange-400' : 'text-yellow-400' }))
        },
        extraText: runx1Content.riskMap.caption
    },
    {
        title: 'Phase II: Engineering the Therapeutic Solution',
        subtitle: 'From Predictive Insight to In Silico Drug Design',
        background: 'bg-gradient-to-br from-slate-900 via-indigo-900/30 to-slate-900',
        headerAnimation: 'text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-6 leading-tight',
        content: {
            type: 'therapeutic-arsenal',
            input: { icon: '🗺️', title: runx1Content.arsenal.input, iconBg: 'bg-yellow-500/20', borderColor: 'border-yellow-500', accentColor: 'text-yellow-400' },
            process: { icon: '🔨', title: runx1Content.arsenal.processTitle, borderColor: 'border-purple-400/50' },
            outputs: runx1Content.arsenal.outputs.map(t => ({ icon: '🧬', text: t }))
        },
        extraText: runx1Content.arsenal.caption
    },
    {
        title: 'How Forge works',
        subtitle: 'From objective to decision in five steps',
        background: 'bg-gradient-to-br from-slate-900 via-sky-900/20 to-slate-900',
        headerAnimation: 'text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-emerald-400 mb-6 leading-tight',
        content: {
            type: 'process-steps',
            simulate: true,
            steps: [
                { icon: '🎯', title: 'Objectives', description: 'Define peaks/motifs and desired behavior at the locus.', borderColor: 'border-emerald-400', accentColor: 'bg-emerald-500/20' },
                { icon: '🧰', title: 'Constraints', description: 'GC range, avoid homopolymers, length, restriction sites.', borderColor: 'border-yellow-400', accentColor: 'bg-yellow-500/20' },
                { icon: '⚙️', title: 'Compute', description: 'Beam width + tokens/bp → predictable quality scaling.', borderColor: 'border-sky-400', accentColor: 'bg-sky-500/20' },
                { icon: '📈', title: 'Evidence', description: 'AUROC, ensemble agreement, synteny, dinuc KL, structure.', borderColor: 'border-violet-400', accentColor: 'bg-violet-500/20' },
                { icon: '✅', title: 'Decision', description: 'Meet thresholds → handoff to Command Center with provenance.', borderColor: 'border-green-400', accentColor: 'bg-green-500/20' },
            ]
        },
        extraText: 'More compute → higher match; constraints keep designs practical; evidence builds trust.'
    },
    {
        title: 'Therapeutic Strategy 1: Precision Gene Correction',
        subtitle: 'Correcting the Root Cause with Unprecedented Accuracy',
        background: 'bg-gradient-to-br from-slate-900 via-teal-900/30 to-slate-900',
        headerAnimation: 'text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 mb-6 leading-tight',
        content: {
            type: 'gene-correction',
            problem: { icon: '🧬', title: runx1Content.geneCorrection.problem.title, subtext: runx1Content.geneCorrection.problem.subtext, borderColor: 'border-red-500', accentColor: 'bg-red-500/20', textColor: 'text-red-400' },
            outcome: { icon: '🧬', title: runx1Content.geneCorrection.outcome.title, subtext: runx1Content.geneCorrection.outcome.subtext, borderColor: 'border-green-500', accentColor: 'bg-green-500/20', textColor: 'text-green-400' },
            infoBoxes: runx1Content.geneCorrection.advantages.map((a, i) => ({ title: a.title, text: a.text, bgClass: 'bg-slate-800/50', borderColor: i === 0 ? 'border-purple-500/30' : 'border-red-500/30', textColor: i === 0 ? 'text-purple-400' : 'text-red-400' }))
        }
    },
    {
        title: 'Therapeutic Strategy 2: Targeted Clone Elimination',
        subtitle: 'Exploiting Genetic Dependencies with Synthetic Lethality',
        background: 'bg-gradient-to-br from-slate-900 via-pink-900/20 to-slate-900',
        headerAnimation: 'text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-red-400 to-orange-400 mb-6 leading-tight',
        content: {
            type: 'process-steps',
            steps: [
                { icon: '🎯', title: 'The Vulnerability', description: 'The ASXL1 mutation creates a hidden weakness.', borderColor: 'border-red-400', accentColor: 'bg-red-500/20', textColor: 'text-red-400' },
                { icon: '🧠', title: 'The Discovery', borderColor: 'border-cyan-400', accentColor: 'bg-none', textColor: 'text-cyan-400', isAI: true },
                { icon: '✂️', title: 'The Solution', description: 'The Zeta Forge designs a gRNA to inhibit the "Synthetic Lethal Partner" (Gene X), causing the cancer cell to self-destruct.', borderColor: 'border-green-400', accentColor: 'bg-green-500/20', textColor: 'text-green-400' }
            ]
        },
        extraText: "This is the holy grail of oncology: a highly specific, targeted approach that kills cancer cells while leaving healthy cells unharmed. Our platform identifies these unique vulnerabilities and designs the precise weapon to exploit them."
    },
    {
        title: 'Accelerating the Path to Approval',
        subtitle: 'Empowering Biotech Innovators with a New Standard of Evidence',
        background: 'bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900',
        headerAnimation: 'text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-400 mb-6 leading-tight',
        content: {
            type: 'approval-process',
            dossier: runx1Content.approval.dossier.map((d, idx) => idx === 0 ? { title: d.title, subtitle: d.subtitle, bgClass: 'bg-gradient-to-br from-purple-600 to-indigo-700', borderClass: 'border-2 border-purple-400/50' } : idx === 1 ? { title: d.title, subtitle: d.subtitle, bgClass: 'bg-gradient-to-br from-blue-600 to-cyan-700', borderClass: 'border-2 border-blue-400/50' } : { title: d.title, subtitle: d.subtitle, bgClass: 'bg-gradient-to-br from-green-600 to-teal-700', borderClass: 'border-2 border-green-400/50' }),
            fdaTiers: runx1Content.approval.tiers.map((t, idx) => idx === 0 ? { title: t.title, bgClass: 'bg-red-500/20', textColor: 'text-red-300' } : idx === 1 ? { title: t.title, bgClass: 'bg-yellow-500/20', textColor: 'text-yellow-300' } : { title: t.title, bgClass: 'bg-green-500/20', textColor: 'text-green-300' }),
            fdaText: runx1Content.approval.text
        }
    },
    {
        title: 'Our Competitive Advantage',
        subtitle: 'A New Paradigm in Therapeutic R&D',
        background: 'bg-gradient-to-br from-slate-900 via-yellow-900/20 to-slate-900',
        headerAnimation: 'text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 mb-6 leading-tight',
        content: {
            type: 'competitive-advantage',
            pillars: [
                { icon: '🧠', title: 'Predictive Precision', text: <> <span className="font-bold text-white">95.7% AUROC</span> on ClinVar coding SNVs, 93.9% on non-SNVs.</>, borderColor: 'border-cyan-500/30', textColor: 'text-cyan-400' },
                { icon: '🔨', title: 'Generative Creation', text: <>We transform R&D from a process of <span className="line-through">discovery</span> to a process of <span className="font-bold text-white">engineering</span>.</>, borderColor: 'border-purple-500/30', textColor: 'text-purple-400' },
                { icon: '🚀', title: 'Unprecedented Acceleration', text: <>We collapse traditional R&D timelines from <span className="line-through">years</span> to <span className="font-bold text-white">weeks</span>.</>, borderColor: 'border-red-500/30', textColor: 'text-red-400' }
            ]
        }
    },
    {
        title: 'CrisPRO.ai: The R&D Command Center',
        subtitle: 'Transforming Therapeutic Development from a Game of Chance into a Deterministic Science',
        background: 'bg-gradient-to-br from-slate-900 via-indigo-900/30 to-slate-900',
        content: {
            type: 'command-center-grid',
            inputs: runx1Content.commandCenter.inputs.map(t => ({ icon: '🧬', text: t })),
            outputs: runx1Content.commandCenter.outputs.map(t => ({ icon: '✅', text: t })),
            infoBoxes: runx1Content.commandCenter.info.map(i => ({ title: i.title, text: i.text }))
        }
    },
];

// Main App component to manage slides (updated to use slidesData)
const App = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') {
                nextSlide();
            } else if (event.key === 'ArrowLeft') {
                prevSlide();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className="fixed inset-0 w-screen h-screen bg-slate-900">
            <style>{`
                @keyframes blob {
                  0% { transform: translate(0px, 0px) scale(1); }
                  33% { transform: translate(30px, -50px) scale(1.1); }
                  66% { transform: translate(-20px, 20px) scale(0.9); }
                  100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-3000 { animation-delay: 3s; }
                .animation-delay-4000 { animation-delay: 4s; }
            `}</style>
            
            <div className="w-full h-full">
                <Slide slideData={slidesData[currentSlide]} />
            </div>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/30 backdrop-blur-sm p-3 rounded-2xl">
                <button onClick={prevSlide} className="px-4 py-2 bg-slate-700/50 text-white rounded-xl hover:bg-slate-600/70 transition-colors duration-200">
                    &larr;
                </button>
                <span className="text-white font-semibold">
                    Slide {currentSlide + 1} / {slidesData.length}
                </span>
                <button onClick={nextSlide} className="px-4 py-2 bg-slate-700/50 text-white rounded-xl hover:bg-slate-600/70 transition-colors duration-200">
                    &rarr;
                </button>
            </div>
        </div>
    );
};

export default App;