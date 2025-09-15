//================================================================================
// 🎯 DOCTRINE-DRIVEN SLIDE CONFIGURATION
//================================================================================

// Import our doctrine-driven slide decks
import researchSlidesData from './101-research';
import businessSlidesData from './101-business';
import technicalSlidesData from './101-technical';

// Import slide templates
import { composePresentation } from '../templates/slideTemplates';

// Define presentation modes using our doctrine
const PRESENTATION_MODES = {
  // Audience-specific presentations
  research: researchSlidesData,
  business: businessSlidesData,
  technical: technicalSlidesData,
  
  // Legacy modes for backward compatibility
  full: 'legacy', // Will use original slidesData
  demo: 'legacy',
  alternative: 'legacy',
  combined: 'legacy',
  killchain: 'legacy',
  process: 'legacy',
  enhanced: 'legacy',
  deepdive: 'legacy'
};

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dna, BrainCircuit, Zap, TestTube2, Shield, Globe, ArrowRight, Bot, Cpu, Database,
  Cuboid, AlertTriangle, FlaskConical, Package, Banknote, Recycle, Puzzle, Target, Microscope,
  Map, HardHat, Bolt, ClipboardList, Target as TargetIcon, Shield as ShieldIcon,
  Package as PackageIcon, Banknote as BanknoteIcon, Recycle as RecycleIcon, Cpu as CpuIcon,
  Bot as BotIcon, ArrowRight as ArrowRightIcon, UserCheck, Lock
} from 'lucide-react';
import * as THREE from 'three';
import { OracleExplainTrack, VEPMetrics, VariantDetailCard, GuidedDesignPanel, DesignResultSummary, QCBadges, SequencePeaksViewer, PipelineGraph, RunLogPanel, ProvenancePanel, KPIStrip } from '@site';
import { crispro101Content } from '../crispro101Content';
import { toOracleBlocks, toForgeBlocks, toBoltzBlocks } from '../adapters/crispro101';
import { ZetaOracleInAction, ZetaForgeTwoColumn, StructuralGauntlet } from '@slides';

//================================================================================
// 1. REUSABLE UI & LAYOUT COMPONENTS
//================================================================================

/**
 * Renders the brand logo.
 */
const Brand = () => (
  <div className="absolute bottom-6 right-6 z-20 text-lg font-semibold text-slate-400/80">
    CrisPRO.ai 🧬
  </div>
);

/**
 * Renders an animated digital synapse network using Three.js for the background.
 */
const DigitalSynapseBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
        currentMount.appendChild(renderer.domElement);

        // Create nodes
        const nodes = [];
        const nodeGeometry = new THREE.SphereGeometry(0.5, 16, 16);
        const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.5 });

        for (let i = 0; i < 100; i++) {
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
            node.position.set(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );
            node.velocity = new THREE.Vector3(
              (Math.random() - 0.5) * 0.1, 
              (Math.random() - 0.5) * 0.1,
              (Math.random() - 0.5) * 0.1
            );
            nodes.push(node);
            scene.add(node);
        }

        const lines = new THREE.Group();
        scene.add(lines);

        // Animation loop
        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            lines.children.forEach(line => {
                line.material.opacity -= 0.01;
                if (line.material.opacity <= 0) lines.remove(line);
            });

            nodes.forEach(node => {
                node.position.add(node.velocity);
                if (Math.abs(node.position.x) > 50) node.velocity.x *= -1;
                if (Math.abs(node.position.y) > 50) node.velocity.y *= -1;
                if (Math.abs(node.position.z) > 50) node.velocity.z *= -1;
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

        // Handle window resize
        const handleResize = () => {
             if (currentMount) {
                camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
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

/**
 * A layout wrapper for a standard slide.
 */
const SlideLayout = ({ children, className = '' }) => (
    <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative w-full h-full flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200 overflow-hidden ${className}`}
    >
        <div className="relative z-10 w-full max-w-5xl space-y-10">
            {children}
        </div>
    </motion.section>
);

// Helper to render new site blocks if present on a slide's content
const renderSiteBlock = (b, key) => {
  switch (b?.kind) {
    case 'oracle-explain':
      return <OracleExplainTrack key={key} {...b.props} />;
    case 'vep-metrics':
      return <VEPMetrics key={key} {...b.props} />;
    case 'variant-detail':
      return <VariantDetailCard key={key} {...b.props} />;
    case 'forge-guided':
      return <GuidedDesignPanel key={key} {...b.props} />;
    case 'design-summary':
      return <DesignResultSummary key={key} {...b.props} />;
    case 'qc-badges':
      return <QCBadges key={key} {...b.props} />;
    case 'sequence-peaks':
      return <SequencePeaksViewer key={key} {...b.props} />;
    case 'pipeline':
      return <PipelineGraph key={key} {...b.props} />;
    case 'run-log':
      return <RunLogPanel key={key} {...b.props} />;
    case 'provenance':
      return <ProvenancePanel key={key} {...b.props} />;
    case 'kpi-strip':
      return <KPIStrip key={key} {...b.props} />;
    default:
      return null;
  }
};

/**
 * A layout wrapper for slides with the 3D synapse background.
 */
const EnhancedSlideLayout = ({ children, className = '' }) => (
     <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className={`relative w-full h-full flex flex-col items-center justify-center text-center p-8 bg-slate-900 text-slate-200 overflow-hidden ${className}`}
    >
        <DigitalSynapseBackground />
        <div className="relative z-10 w-full max-w-6xl space-y-12">
            {children}
        </div>
    </motion.section>
);

/**
 * Renders the main title and subtitle for a slide.
 */
const SlideHeader = ({ title, subtitle, titleClassName = '', subtitleClassName = '' }) => (
    <div className="space-y-3">
        <h1 className={`text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${titleClassName}`}>
            {title}
        </h1>
        {subtitle && (
            <p className={`text-2xl md:text-3xl font-light text-slate-300 max-w-4xl mx-auto ${subtitleClassName}`}>
                {subtitle}
            </p>
        )}
    </div>
);

/**
 * A reusable card for displaying statistics.
 */
const StatCard = ({ value, label, className = '' }) => (
    <div className={`bg-slate-800/50 p-6 rounded-xl border border-slate-700 ${className}`}>
        <p className="text-6xl font-black text-red-400">{value}</p>
        <p className="text-xl text-slate-300 mt-2">{label}</p>
    </div>
);

/**
 * A reusable card for displaying features with an icon.
 */
const InfoCard = ({ icon, title, children, color = 'cyan' }) => (
    <div className={`bg-slate-800/50 p-6 rounded-xl border border-${color}-500/30 text-center`}>
        {icon && React.createElement(icon, { size: 48, className: `mx-auto text-${color}-400 mb-4` })}
        <h4 className={`text-xl font-bold text-${color}-400 mb-2`}>{title}</h4>
        <div className="text-slate-400">{children}</div>
    </div>
);

/**
 * Navigation controls for the slideshow.
 */
const NavigationControls = ({ current, total, onPrev, onNext }) => (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/30 backdrop-blur-sm p-2 rounded-full border border-slate-700">
        <button onClick={onPrev} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&larr;</button>
        <span className="text-slate-300 font-semibold text-sm">Slide {current + 1} / {total}</span>
        <button onClick={onNext} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&rarr;</button>
    </div>
);

// --- Custom Content Components ---

const TwoColumnLayout = ({ children, className = '' }) => (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-start text-left max-w-6xl mx-auto ${className}`}>
        {children}
    </div>
);

const SimpleTextBlock = ({ icon, mainText, subText, iconColor, borderColor }) => (
    <div className={`bg-slate-800/50 p-8 rounded-2xl border ${borderColor} max-w-4xl mx-auto`}>
        {React.createElement(icon, { size: 64, className: `mx-auto ${iconColor} mb-4` })}
        <p className="text-xl text-slate-300 mb-4" dangerouslySetInnerHTML={{ __html: mainText }}></p>
        <p className="text-lg text-slate-400" dangerouslySetInnerHTML={{ __html: subText }}></p>
    </div>
);

const ProcessSteps = ({ steps }) => (
    <div className="flex flex-col lg:flex-row items-center justify-around w-full space-y-8 lg:space-y-0 lg:space-x-8">
        {steps.map((step, index) => (
            <React.Fragment key={index}>
                <div className="flex flex-col items-center space-y-4">
                    <div className={`text-6xl p-4 rounded-full border-2 ${step.borderColor} ${step.bgClass} text-${step.iconColor}-400`}>
                        {typeof step.icon === 'string' ? <span className="text-4xl">{step.icon}</span> : React.createElement(step.icon, {})}
                    </div>
                    <h3 className={`text-3xl font-bold text-${step.iconColor}-400`}>{step.title}</h3>
                    {step.description && <p className="text-slate-400 text-lg max-w-xs">{step.description}</p>}
                </div>
                {index < steps.length - 1 && <div className="text-5xl text-slate-500 animate-pulse">➡️</div>}
            </React.Fragment>
        ))}
    </div>
);

// Additional components from your other presentation
const FeatureCard = ({ icon, title, description, accentColor, iconBg, borderColor, isAI, isGridItem }) => (
    <div className={`flex flex-col items-center space-y-4 ${isGridItem ? 'w-full' : ''}`}>
        <div className={`relative ${isAI ? 'text-8xl' : 'text-6xl p-4 rounded-full border-2'} ${iconBg || ''} ${borderColor || 'border-slate-700'}`}>
            {icon}
            {isAI && <div className={`absolute inset-0 -m-4 border-2 ${borderColor || 'border-sky-400/50'} rounded-full animate-ping`}></div>}
        </div>
        <h3 className={`text-3xl font-bold ${accentColor || 'text-slate-300'}`}>{title}</h3>
        {description && <p className="text-slate-400 text-lg max-w-xs">{description}</p>}
    </div>
);

const ZetaForgeInAction = ({ content }) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start text-left max-w-6xl mx-auto">
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 h-full">
            <p className="text-slate-400 text-lg">Input:</p>
            <p className="text-2xl font-bold text-cyan-400 mb-6">{content.input}</p>
            <p className="text-slate-400 text-lg">Mission:</p>
            <p className="text-2xl font-bold text-slate-200 mb-8">{content.mission}</p>
            <div className="space-y-4">
                {content.assets.map((asset, i) => (
                    <div key={i} className="bg-slate-900/70 p-4 rounded-lg border border-green-500/30 flex items-center">
                        <span className="text-green-400 mr-4 text-2xl">{asset.icon}</span>
                        <p className="font-semibold text-green-400">{asset.label}</p>
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-purple-500/50 h-full">
            <h3 className="text-3xl font-bold text-purple-400 mb-4">{content.advantageTitle}</h3>
            <h4 className="text-5xl font-black text-white mb-4">{content.advantageHighlight}</h4>
            <p className="text-slate-300 text-lg mb-6">{content.advantageDescription}</p>
            <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700">
                <p className="text-slate-400 font-semibold">{content.forgeHeader}</p>
                <p className="text-xl font-bold text-white mt-2">{content.forgeText}</p>
            </div>
        </div>
    </div>
);

//================================================================================
// 2. MAIN SLIDE COMPONENT (Data-Driven)
//================================================================================

const Slide = ({ slideData }) => {
    const { title, subtitle, titleClassName, subtitleClassName, backgroundClass, content, notes, presenter, presenterTitle } = slideData;

    const Layout = content?.useEnhancedLayout ? EnhancedSlideLayout : SlideLayout;

    return (
        <Layout className={backgroundClass}>
            {title && (
                <SlideHeader
                    title={title}
                    subtitle={subtitle}
                    titleClassName={titleClassName}
                    subtitleClassName={subtitleClassName}
                />
            )}
            
            {/* Conditional rendering for different slide layouts */}
            {content?.type === 'title' && (
                <div className="relative z-10 w-full px-4 space-y-8">
                    <div className="mt-16 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-2xl p-8 backdrop-blur-sm border border-purple-500/30 max-w-3xl mx-auto">
                        <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                            In-Silico:  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">{presenter}</span>
                        </p>
                        <p className="text-xl text-slate-300">{presenterTitle}</p>
                    </div>
                </div>
            )}
            
            {content?.type === 'stats' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                    {content.stats.map((stat, i) => <StatCard key={i} {...stat} />)}
                </div>
            )}

            {content?.type === 'simple-block' && (
                <div className={`bg-slate-800/50 p-8 rounded-2xl border ${content.block.borderColor} max-w-4xl mx-auto`}>
                    {React.createElement(content.block.icon, { size: 64, className: `mx-auto ${content.block.iconColor} mb-4` })}
                    <p className="text-xl text-slate-300 mb-4" dangerouslySetInnerHTML={{ __html: content.block.mainText }}></p>
                    <p className="text-lg text-slate-400" dangerouslySetInnerHTML={{ __html: content.block.subText }}></p>
                </div>
            )}
            
            {content?.type === 'info-cards' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                    {content.cards.map((card, i) => (
                        <InfoCard key={i} icon={card.icon} title={card.title} color={card.color}>
                            <div dangerouslySetInnerHTML={{ __html: card.text }} />
                        </InfoCard>
                    ))}
                </div>
            )}

            {content?.type === 'custom' && typeof content.render === 'function' && (
                <div className="pt-4">{content.render()}</div>
            )}

            {content?.type === 'zeta-oracle-in-action' && (
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 max-w-3xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="text-center p-4 md:border-r md:border-slate-700">
                            <p className="text-slate-400 text-lg">{content.left.title}</p>
                            <p className="text-6xl font-extrabold text-yellow-400 my-4">{content.left.value}</p>
                            <p className="text-slate-500">{content.left.subtitle}</p>
                        </div>
                        <div className="text-center p-4">
                            <p className="text-slate-400 text-lg">{content.right.title}</p>
                            <p className="text-6xl font-extrabold text-red-500 my-4">{content.right.value}</p>
                            <p className="text-slate-400">{content.right.subtitle}</p>
                        </div>
                    </div>
                    <div className="mt-8 text-center bg-red-900/30 p-4 rounded-lg border border-red-500/50">
                        <p className="text-slate-300 text-lg">{content.score.title}</p>
                        <p className="text-5xl font-black text-red-400 drop-shadow-lg">{content.score.value}</p>
                    </div>
                </div>
            )}

            {content?.type === 'two-column' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start text-left max-w-6xl mx-auto">
                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 h-full">
                        <p className="text-slate-400 text-lg">Input:</p>
                        <p className="text-2xl font-bold text-cyan-400 mb-6">{content.column1.input}</p>
                        <p className="text-slate-400 text-lg">Mission:</p>
                        <p className="text-2xl font-bold text-slate-200 mb-8">{content.column1.mission}</p>
                        <div className="space-y-4">
                            {content.column1.assets.map((asset, i) => (
                                <div key={i} className="bg-slate-900/70 p-4 rounded-lg border border-green-500/30 flex items-center">
                                    <span className="text-green-400 mr-4 text-2xl">{asset.icon}</span>
                                    <p className="font-semibold text-green-400">{asset.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-purple-500/50 h-full">
                        <h3 className="text-3xl font-bold text-purple-400 mb-4">{content.column2.title}</h3>
                        <h4 className="text-5xl font-black text-white mb-4">{content.column2.highlight}</h4>
                        <p className="text-slate-300 text-lg mb-6">{content.column2.description}</p>
                        <div className="bg-slate-900/70 p-6 rounded-lg border border-slate-700">
                            <p className="text-slate-400 font-semibold">{content.column2.infoHeader}</p>
                            <p className="text-xl font-bold text-white mt-2">{content.column2.infoText}</p>
                        </div>
                    </div>
                </div>
            )}
            
            {content?.type === 'structural-gauntlet' && (
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 max-w-4xl mx-auto text-left">
                    <p className="text-slate-400 text-lg mb-4">{content.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center font-semibold text-slate-300">
                        <div className="bg-slate-900/70 p-4 rounded-lg">
                            <p className="mb-2">{content.output.title}</p>
                            <p className="font-mono text-sm text-purple-400 break-all">{content.output.text}</p>
                        </div>
                        <div className="text-4xl text-slate-600 animate-pulse">{React.createElement(ArrowRightIcon, {})}</div>
                        <div className="bg-slate-900/70 p-4 rounded-lg">
                            <p className="mb-2">{content.simulation.title}</p>
                            {React.createElement(content.simulation.icon, { size: 48, className: "mx-auto text-orange-400" })}
                        </div>
                    </div>
                    <div className="mt-8 text-center bg-green-900/30 p-4 rounded-lg border border-green-500/50">
                        <p className="text-slate-300 text-lg">{content.verdict.title}</p>
                        <p className="text-4xl font-black text-green-400 drop-shadow-lg">{content.verdict.result}</p>
                        <p className="font-mono text-slate-400 mt-2">{content.verdict.confidence}</p>
                    </div>
                </div>
            )}

            {content?.type === 'command-center-summary' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                    {content.cards.map((card, i) => <InfoCard key={i} {...card} />)}
                </div>
            )}


            
            {content?.type === 'process-steps-with-info' && (
                <>
                    <div className="bg-gradient-to-r from-slate-900/80 to-slate-800/80 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-slate-600/50">
                        <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-8">
                            {content.steps.map((step, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col items-center space-y-4">
                                        <div className={`text-6xl p-4 rounded-full border-2 ${step.borderColor} ${step.bgClass} text-${step.iconColor}-400`}>
                                            {typeof step.icon === 'string' ? <span className="text-4xl">{step.icon}</span> : React.createElement(step.icon, {})}
                                        </div>
                                        <h3 className={`text-3xl font-bold text-${step.iconColor}-400`}>{step.title}</h3>
                                        {step.description && <p className="text-slate-400 text-lg max-w-xs">{step.description}</p>}
                                    </div>
                                    {index < content.steps.length - 1 && <div className="text-5xl text-slate-500 animate-pulse">➡️</div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {content.infoBoxes.map((box, i) => (
                            <div key={i} className={`bg-slate-800/50 p-6 rounded-xl border ${box.borderColor} text-left`}>
                                <h4 className="text-2xl font-bold text-purple-400 mb-3">{box.title}</h4>
                                <p className="text-slate-300 text-lg">{box.text}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {content?.type === 'kill-chain' && (
                <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-8 lg:space-y-0 lg:space-x-4">
                    {content.steps.map((step, i) => (
                        <motion.div key={i} variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} className="flex flex-col items-center space-y-3">
                            <div className={`text-4xl p-4 bg-${step.color}-500/20 rounded-full border-2 border-${step.color}-500 text-${step.color}-400`}>
                                {typeof step.icon === 'string' ? <span className="text-2xl">{step.icon}</span> : React.createElement(step.icon, {})}
                            </div>
                            <h3 className={`text-xl font-bold text-${step.color}-400`}>{step.title}</h3>
                            <p className="text-slate-400 text-base max-w-xs">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            )}
            
            {content?.type === 'dossier' && (
                <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm p-12 rounded-3xl shadow-2xl border border-slate-600/30 w-full mx-auto">
                    <div className="flex flex-col lg:flex-row items-center justify-around space-y-12 lg:space-y-0 lg:space-x-8">
                        <div className="flex flex-col items-center space-y-6">
                            <h3 className="text-3xl font-bold text-slate-300 mb-4">The Digital Dossier</h3>
                            {content.dossierItems.map((item, i) => (
                                <div key={i} className={`${item.bgClass} p-6 rounded-xl shadow-lg text-white font-bold text-center`}>{item.text}</div>
                            ))}
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="text-6xl text-teal-400 animate-pulse self-center my-4 lg:my-0">➡️</div>
                            <div className="text-4xl">🔬</div>
                            <h3 className="text-2xl font-bold text-slate-300 mt-2">Wet Labs & Biotech Partners</h3>
                        </div>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative w-64 h-64 flex flex-col justify-center items-center">
                                {content.fdaTiers.map((tier, i) => (
                                    <React.Fragment key={i}>
                                        <div className={`${tier.bgClass} ${tier.textColor} px-4 py-2 rounded-lg`}>{tier.label}</div>
                                        {i < content.fdaTiers.length - 1 && <div className="h-12 w-1 bg-slate-600"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                            <p className="text-teal-300 font-semibold text-lg max-w-xs">{content.fdaText}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* New slide types from your other presentation */}
            {content?.type === 'command-center-grid' && (
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
                        <FeatureCard {...content.core} isAI={true} />
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
                            <InfoCard key={index} {...box} />
                        ))}
                    </div>
                </>
            )}

            {content?.type === 'feature-grid-with-info' && (
                <>
                    <div className="bg-slate-800/50 p-12 rounded-3xl border border-slate-700">
                        <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-8">
                            {content.features.map((feature, index) => (
                                <React.Fragment key={index}>
                                    {feature.isAI ? <FeatureCard {...feature} isAI={true} /> : <FeatureCard {...feature} />}
                                    {index < content.features.length - 1 && <div className="text-5xl text-slate-500 animate-pulse">➡️</div>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {content.infoBoxes.map((box, index) => (
                            <InfoCard key={index} {...box} />
                        ))}
                    </div>
                </>
            )}

            {content?.type === 'text-block-with-icon' && (
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 max-w-4xl mx-auto">
                    <span className="mx-auto text-purple-400 mb-4 text-6xl">🧪</span>
                    <p className="text-xl text-slate-300 mb-4">{content.mainText}</p>
                    <p className="text-lg text-slate-400">{content.subText}</p>
                </div>
            )}

            {content?.type === 'zeta-forge-in-action' && (
                <ZetaForgeInAction content={content} />
            )}

            {content?.type === 'step-process' && (
                <div className="flex flex-col lg:flex-row items-center justify-around w-full space-y-8 lg:space-y-0 lg:space-x-8">
                    {content.steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <FeatureCard {...step} />
                            {index < content.steps.length - 1 && (
                                <div className="text-5xl text-slate-500 animate-pulse">➡️</div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}

            {/* Kill Chain slide types */}
            {content?.type === 'stats-grid' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
                    {content.stats.map((stat, i) => (
                        <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <p className="text-6xl font-black text-red-400">{stat.value}</p>
                            <p className="text-xl text-slate-300 mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            )}

            {content?.type === 'process-flow' && (
                <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-8 lg:space-y-0 lg:space-x-8">
                    {content.steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center space-y-3">
                                <div className={`text-4xl p-4 ${step.bgClass} rounded-full border-2 ${step.borderClass} ${step.textClass}`}>
                                    {typeof step.icon === 'string' ? <span className="text-2xl">{step.icon}</span> : React.createElement(step.icon, {})}
                                </div>
                                <h3 className={`text-xl font-bold ${step.titleClass}`}>{step.title}</h3>
                                <p className="text-slate-400 text-base max-w-xs">{step.description}</p>
                            </div>
                            {index < content.steps.length - 1 && (
                                <div className="text-3xl text-slate-600 animate-pulse hidden lg:block">
                                    {React.createElement(ArrowRightIcon, {})}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}

            {content?.type === 'asset-dossier' && (
                <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 max-w-3xl mx-auto text-left">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-slate-300">{content.assetId}</h3>
                        <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-800 text-green-100">{content.status}</span>
                    </div>
                    <div className="space-y-4 text-lg">
                        {content.checkpoints.map((checkpoint, i) => (
                            <div key={i} className="flex items-center">
                                {typeof checkpoint.icon === 'string' ? <span className={`text-lg ${checkpoint.iconColor} mr-4`}>{checkpoint.icon}</span> : React.createElement(checkpoint.icon, { className: `w-6 h-6 ${checkpoint.iconColor} mr-4` })}
                                <span dangerouslySetInnerHTML={{ __html: checkpoint.text }}></span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 border-t border-slate-700 pt-6">
                        <p className="text-slate-400">{content.description}</p>
                    </div>
                </div>
            )}

            {/* Enhanced content types from runx1 */}
            {content?.type === 'two-hit-hypothesis' && <TwoHitHypothesis content={content} />}
            {content?.type === 'risk-prediction-map' && <RiskPredictionMap content={content} />}
            {content?.type === 'therapeutic-arsenal' && <TherapeuticArsenal content={content} />}
            {content?.type === 'gene-correction' && <GeneCorrection content={content} />}
            {content?.type === 'approval-process' && <ApprovalProcess content={content} />}

            {/* Fusion Engine Advantage slide */}
            {content?.type === 'fusion-engine-advantage' && (
                <div className="w-full max-w-7xl mx-auto">
                    {/* Benchmark Results */}
                    <div className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-slate-600/50 mb-12">
                        <h3 className="text-3xl font-bold text-slate-300 mb-8 text-center">{content.benchmark.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {content.benchmark.metrics.map((metric, i) => (
                                <div key={i} className={`bg-slate-800/50 p-6 rounded-2xl border-2 border-${metric.color}-500/30 text-center`}>
                                    <h4 className="text-lg font-semibold text-slate-300 mb-2">{metric.label}</h4>
                                    <p className={`text-3xl font-black text-${metric.color}-400`}>{metric.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Competitive Advantages Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {content.advantages.map((advantage, i) => (
                            <div key={i} className={`bg-slate-800/50 p-8 rounded-2xl border border-${advantage.color}-500/30`}>
                                <div className="flex items-start space-x-4">
                                    <div className={`flex-shrink-0 w-12 h-12 rounded-full bg-${advantage.color}-500/20 flex items-center justify-center`}>
                                        <span className={`text-2xl text-${advantage.color}-400`}>{advantage.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`text-xl font-bold text-${advantage.color}-400 mb-3`}>{advantage.title}</h4>
                                        <p className="text-slate-300 text-lg" dangerouslySetInnerHTML={{ __html: advantage.text }}></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Business Overview Platform slide */}
            {content?.type === 'business-overview-platform' && (
                <div className="w-full max-w-7xl mx-auto space-y-12">
                    {/* Platform Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-slate-600/50">
                            <h3 className="text-3xl font-bold text-slate-300 mb-6">{content.platform.title}</h3>
                            <p className="text-slate-400 text-lg mb-8">{content.platform.description}</p>
                            <div className="space-y-4">
                                {content.platform.capabilities.map((capability, i) => (
                                    <div key={i} className="flex items-center space-x-4 bg-slate-800/50 p-4 rounded-xl">
                                        <span className="text-2xl">{capability.icon}</span>
                                        <span className="text-slate-300 text-lg">{capability.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-slate-600/50">
                            <h3 className="text-3xl font-bold text-slate-300 mb-6">{content.valueProposition.title}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {content.valueProposition.metrics.map((metric, i) => (
                                    <div key={i} className="text-center bg-slate-800/50 p-4 rounded-xl">
                                        <p className={`text-4xl font-black ${metric.className} mb-2`}>{metric.value}</p>
                                        <p className="text-slate-400 text-sm">{metric.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Business Overview Business slide */}
            {content?.type === 'business-overview-business' && (
                <div className="w-full max-w-7xl mx-auto space-y-12">
                    {/* Business Model Section */}
                    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-slate-600/50">
                        <h3 className="text-3xl font-bold text-slate-300 mb-8 text-center">{content.businessModel.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {content.businessModel.streams.map((stream, i) => (
                                <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
                                    <div className="text-4xl mb-3">{stream.icon}</div>
                                    <h4 className="text-lg font-semibold text-slate-300 mb-2">{stream.name}</h4>
                                    <p className="text-slate-400 text-sm">{stream.revenue}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Market Opportunity Section */}
                    <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-slate-600/50">
                        <h3 className="text-3xl font-bold text-slate-300 mb-8 text-center">{content.marketOpportunity.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {content.marketOpportunity.stats.map((stat, i) => (
                                <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 text-center">
                                    <p className="text-4xl font-black text-orange-400 mb-2">{stat.value}</p>
                                    <p className="text-slate-300 text-sm">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {notes && (
                <p className="text-slate-400 text-lg max-w-4xl mx-auto mt-8" dangerouslySetInnerHTML={{ __html: notes }}></p>
            )}

            {Array.isArray(content?.siteBlocks) && (
              <div className="mt-8 space-y-6">
                {content.siteBlocks.map((b, i) => renderSiteBlock(b, i))}
              </div>
            )}

        </Layout>
    );
};

// Enhanced content type components from runx1
const TwoHitHypothesis = ({ content }) => (
    <div className="relative w-full max-w-6xl mx-auto px-8">
        {/* Background flow line */}
        <div className="absolute top-1/2 left-12 right-12 h-2 bg-gradient-to-r from-yellow-400 via-cyan-400 via-green-400 to-purple-400 opacity-40 transform -translate-y-1/2 hidden lg:block rounded-full shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-cyan-300 via-green-300 to-purple-300 rounded-full animate-pulse opacity-50"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-evenly w-full space-y-12 lg:space-y-0 lg:space-x-4 relative z-10">
            {content.steps.map((step, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col items-center group">
                        {/* Icon circle */}
                        <div className={`relative w-32 h-32 rounded-full flex items-center justify-center mb-6 shadow-2xl transform transition-all duration-500 group-hover:scale-115 group-hover:rotate-3 ${step.colorClass} ${step.animationClass || ''}`}>
                            <div className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30"></div>
                            <div className="absolute inset-2 rounded-full bg-black/10"></div>
                            <div className="text-5xl relative z-10 filter drop-shadow-2xl">{step.mutationIcon}</div>
                            {step.animationClass && (
                                <div className="absolute inset-0 rounded-full border-4 border-white/40 animate-ping"></div>
                            )}
                            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-white/5 to-transparent"></div>
                        </div>
                        
                        {/* Content card */}
                        <div className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-md rounded-2xl p-6 border border-slate-500/30 shadow-2xl w-64 text-center transform transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-3xl group-hover:border-slate-400/50">
                            <div className="mb-3">
                                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200 mb-2 tracking-tight">{step.title}</h3>
                                <div className="h-1 w-12 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed font-medium tracking-wide">{step.subtext}</p>
                        </div>
                        
                        {/* Step number */}
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-800 rounded-full flex items-center justify-center text-white font-black text-lg shadow-xl border-2 border-slate-400/30 group-hover:scale-110 transition-all duration-300">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent"></div>
                            <span className="relative z-10">{index + 1}</span>
                        </div>
                    </div>
                    
                    {/* Arrow connector */}
                    {index < content.steps.length - 1 && (
                        <div className="flex items-center justify-center lg:mx-2">
                            <div className="hidden lg:flex items-center opacity-80 hover:opacity-100 transition-opacity duration-300">
                                <div className="w-12 h-1 bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 rounded-full shadow-lg relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full animate-pulse"></div>
                                </div>
                                <div className="w-0 h-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-slate-400 border-t-transparent border-b-transparent ml-1 filter drop-shadow-lg"></div>
                            </div>
                            <div className="lg:hidden opacity-80">
                                <div className="h-12 w-1 bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 rounded-full shadow-lg relative mx-auto">
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full animate-pulse"></div>
                                </div>
                                <div className="w-0 h-0 border-t-8 border-b-0 border-l-4 border-r-4 border-t-slate-400 border-l-transparent border-r-transparent mt-1 mx-auto filter drop-shadow-lg"></div>
                            </div>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    </div>
);

const RiskPredictionMap = ({ content }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Known Threat */}
        <div className="flex flex-col space-y-4">
            <div className={`flex flex-col items-center space-y-4 p-6 rounded-2xl border-2 ${content.knownThreat.borderColor} ${content.knownThreat.iconBg}`}>
                <div className="text-4xl">{content.knownThreat.icon}</div>
                <h3 className={`text-2xl font-bold ${content.knownThreat.accentColor}`}>{content.knownThreat.title}</h3>
                <p className="text-slate-400 text-center">{content.knownThreat.subtext}</p>
            </div>
        </div>

        {/* AI Core */}
        <div className="flex flex-col items-center space-y-4">
            <div className={`text-8xl p-4 rounded-full border-2 ${content.aiCore.borderColor} relative`}>
                {content.aiCore.icon}
                <div className={`absolute inset-0 -m-4 border-2 ${content.aiCore.borderColor} rounded-full animate-ping`}></div>
            </div>
            <h3 className="text-2xl font-bold text-cyan-400">{content.aiCore.title}</h3>
        </div>

        {/* Predictions */}
        <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-bold text-slate-300 mb-4">Predicted Mutations:</h3>
            {content.predictions.map((prediction, i) => (
                <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                    <p className="text-lg font-semibold text-slate-300">{prediction.name}</p>
                    <p className={`text-sm font-bold ${prediction.colorClass}`}>{prediction.risk}</p>
                </div>
            ))}
        </div>
    </div>
);

const TherapeuticArsenal = ({ content }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Input */}
        <div className={`flex flex-col items-center space-y-4 p-6 rounded-2xl border-2 ${content.input.borderColor} ${content.input.iconBg}`}>
            <div className="text-4xl">{content.input.icon}</div>
            <h3 className={`text-2xl font-bold ${content.input.accentColor}`}>{content.input.title}</h3>
        </div>

        {/* Process */}
        <div className="flex flex-col items-center space-y-4">
            <div className={`text-8xl p-4 rounded-full border-2 ${content.process.borderColor} relative`}>
                {content.process.icon}
                <div className={`absolute inset-0 -m-4 border-2 ${content.process.borderColor} rounded-full animate-ping`}></div>
            </div>
            <h3 className="text-2xl font-bold text-purple-400">{content.process.title}</h3>
        </div>

        {/* Outputs */}
        <div className="flex flex-col space-y-4">
            <h3 className="text-2xl font-bold text-slate-300 mb-4">Therapeutic Arsenal:</h3>
            {content.outputs.map((output, i) => (
                <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-green-500/30">
                    <div className="flex items-center">
                        <span className="text-green-400 mr-4 text-2xl">{output.icon}</span>
                        <p className="font-semibold text-green-400">{output.text}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const GeneCorrection = ({ content }) => (
    <>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full space-y-8 lg:space-y-0 lg:space-x-12 mb-12">
            {/* Problem */}
            <div className={`flex flex-col items-center space-y-4 p-8 rounded-2xl border-2 ${content.problem.borderColor} ${content.problem.accentColor} w-72`}>
                <div className="text-4xl">{content.problem.icon}</div>
                <h3 className={`text-2xl font-bold ${content.problem.textColor}`}>{content.problem.title}</h3>
                <p className="text-slate-400 text-center">{content.problem.subtext}</p>
            </div>

            <div className="text-5xl text-slate-500 animate-pulse">➡️</div>

            {/* Outcome */}
            <div className={`flex flex-col items-center space-y-4 p-8 rounded-2xl border-2 ${content.outcome.borderColor} ${content.outcome.accentColor} w-72`}>
                <div className="text-4xl">{content.outcome.icon}</div>
                <h3 className={`text-2xl font-bold ${content.outcome.textColor}`}>{content.outcome.title}</h3>
                <p className="text-slate-400 text-center">{content.outcome.subtext}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {content.infoBoxes.map((box, i) => (
                <div key={i} className={`${box.bgClass} p-6 rounded-xl border ${box.borderColor} text-center`}>
                    <h4 className={`text-2xl font-bold ${box.textColor} mb-3`}>{box.title}</h4>
                    <p className="text-slate-300 text-lg">{box.text}</p>
                </div>
            ))}
        </div>
    </>
);

const ApprovalProcess = ({ content }) => (
    <>
        <div className="mb-12">
            <h3 className="text-3xl font-bold text-slate-300 mb-8 text-center">Our Digital Dossier</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {content.dossier.map((item, i) => (
                    <div key={i} className={`${item.bgClass} p-6 rounded-2xl ${item.borderClass} text-center text-white`}>
                        <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                        <p className="text-sm opacity-90">{item.subtitle}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-slate-300 mb-6 text-center">FDA Evidence Hierarchy</h3>
            <div className="space-y-4">
                {content.fdaTiers.map((tier, i) => (
                    <div key={i} className={`${tier.bgClass} p-4 rounded-xl border border-slate-700 text-center`}>
                        <p className={`text-lg font-semibold ${tier.textColor}`}>{tier.title}</p>
                    </div>
                ))}
            </div>
            <p className="text-slate-400 text-center mt-6 text-lg">{content.fdaText}</p>
        </div>
    </>
);


//================================================================================
// 3. SLIDE DATA DEFINITION - Now organized by ID for easy management!
//================================================================================

const slidesData = [
  // SLIDE 1: TITLE
  {
    title: "CrisPRO.ai",
    subtitle: "The AI Platform That's Revolutionizing Drug Discovery",
    titleClassName: "from-purple-400 via-pink-400 to-red-400 drop-shadow-2xl leading-none tracking-tight text-6xl md:text-8xl",
    backgroundClass: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    content: {
      type: 'title',
      useEnhancedLayout: true,
      metrics: [
        { value: "Research‑Mode", label: "RUO • No clinical claims", className: "text-green-400" },
        { value: "Provenance", label: "Audit trail in every result", className: "text-cyan-400" },
        { value: "Demo‑Complete", label: "MM flow: WIWFM → VUS → Dossier", className: "text-purple-400" }
      ]
    },
    presenter: 'Therapeutics',
    presenterTitle: 'CrisPRO.ai 🧬',
    notes: "Lead with clear, investor-friendly metrics that show our competitive advantage and market size."
  },
  // SLIDE 2: THE R&D EFFICIENCY CRISIS
  {
    title: "The $2.8 Billion Problem",
    subtitle: "Drug discovery is broken - 95% of clinical trials fail, costing billions",
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'crisis-comparison',
      problem: {
        title: "Traditional Drug Discovery",
        stats: [
          { value: "95%", label: "Failure Rate", className: "text-red-400" },
          { value: "$2.8B", label: "Cost Per Drug", className: "text-red-400" },
          { value: "10-15", label: "Years to Market", className: "text-red-400" },
          { value: "<5%", label: "Success Rate", className: "text-red-400" }
        ]
      },
      solution: {
        title: "CrisPRO.ai Approach (Research‑Mode)",
        stats: [
          { value: "Transparent", label: "Provenance & auditability", className: "text-green-400" },
          { value: "Faster", label: "In‑silico hypothesis testing", className: "text-green-400" },
          { value: "Integrated", label: "S/P/E fusion + Cohort context", className: "text-green-400" },
          { value: "Reusable", label: "Sessions & caching", className: "text-green-400" }
        ]
      }
    },
    notes: "Show the massive cost and time savings that will resonate with investors. Focus on the business impact, not technical details."
  },
  // SLIDE 3: THE $2 BILLION VUS PROBLEM
  {
    title: "The $2 Billion 'Unknown Variant' Problem",
    subtitle: "40% of genetic tests return 'uncertain' results - we turn uncertainty into certainty",
    titleClassName: "from-yellow-500 to-orange-400",
    content: {
      type: 'simple-block',
      block: {
        icon: AlertTriangle,
        mainText: `Up to <span class="font-bold text-yellow-400 text-2xl">40%</span> of genetic tests return "Variant of Uncertain Significance" - costing the industry $2B+ annually.`,
        subText: `This uncertainty paralyzes decisions. Our platform provides transparent, research‑mode insights and ranked therapy hypotheses with audit trails.`,
        iconColor: "text-yellow-400",
        borderColor: "border-slate-700"
      }
    }
  },
  // SLIDE 4: AI THAT SOLVES THE UNKNOWN VARIANT PROBLEM
  {
    title: "AI That Solves the 'Unknown Variant' Problem",
    subtitle: "From uncertainty to actionable intelligence in seconds",
    titleClassName: "from-cyan-400 to-sky-300",
    content: {
      type: 'custom',
      siteBlocks: [],
      render: () => (
        <ZetaOracleInAction
          left={{ title: 'Traditional Result', value: 'UNCERTAIN', subtitle: '(No clear answer)' }}
          right={{ title: "CrisPRO's Output", value: 'ACTIONABLE SIGNALS', subtitle: '(Research‑mode guidance)' }}
          score={{ title: 'Confidence:', value: 'Transparent + Auditable' }}
        />
      )
    }
  },
  // SLIDE 5: WE DON'T JUST FIND PROBLEMS - WE DESIGN SOLUTIONS
  {
    title: "Beyond Analysis – We Propose Therapeutic Concepts",
    subtitle: "Most tools stop at analysis; we go further with generative design (RUO)",
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'simple-block',
      block: {
        icon: FlaskConical,
        mainText: "We move from insight to candidate concepts. From validated targets to generative design proposals (research‑mode).",
        subText: "Advantage: Orchestrated flow (S/P/E + generative) with transparent provenance.",
        iconColor: "text-purple-400",
        borderColor: "border-slate-700"
      }
    }
  },
  // SLIDE 6: AI THAT DESIGNS CUSTOM DRUGS IN MINUTES
  {
    title: "Generative Design (Research‑Mode)",
    subtitle: "From genetic target to candidate blueprints (simulated)",
    titleClassName: "from-purple-400 to-pink-400",
    content: {
      type: 'custom',
      siteBlocks: [],
      render: () => (
        <ZetaForgeTwoColumn
          column1={{
            input: 'Validated High-Risk Target',
            mission: 'Design Complete Therapeutic Solutions',
            assets: [
              { icon: Dna, label: 'Gene Therapy Blueprint' },
              { icon: Shield, label: 'Targeted Drug Design' },
              { icon: TestTube2, label: 'Novel Biologic Design' },
            ]
          }}
          column2={{
            title: 'Our Practical Edge:',
            highlight: 'Large genomic context (Evo2)',
            description: 'Better prompts, more realistic designs.',
            infoHeader: 'Enables (simulated):',
            infoText: 'Exploration of complex architectures with clear audit trails; outputs are proposals, not clinical claims.'
          }}
        />
      )
    }
  },
  // SLIDE 7: STRUCTURAL ASSESSMENT (ROADMAP)
  {
    title: "Structural Assessment (Roadmap)",
    subtitle: "A design is stronger with 3D context; we aim to simulate pre‑lab",
    titleClassName: "from-orange-500 to-yellow-400",
    content: {
      type: 'simple-block',
      block: {
        icon: Puzzle,
        mainText: "Generative outputs are proposals. 3D context improves confidence by checking feasibility (research‑mode).",
        subText: "Goal: simulate likely interactions pre‑lab and capture rationale + provenance.",
        iconColor: "text-orange-400",
        borderColor: "border-slate-700"
      }
    }
  },
  // SLIDE 8: AI THAT PROVES DRUGS WILL WORK BEFORE WE MAKE THEM
  {
    title: "AI That Proves Drugs Will Work Before We Make Them (Research Mode)",
    subtitle: "Complete structural validation in seconds, not months",
    titleClassName: "from-orange-400 to-yellow-300",
    content: {
      type: 'custom',
      siteBlocks: [],
      render: () => (
        <StructuralGauntlet
          description="Our AI doesn't just design drugs - it proves they will work. Complete 3D structural validation before any lab work begins."
          output={{ title: 'Drug Design Output:', text: 'Complete therapeutic blueprint...' }}
          simulation={{ title: 'Structural Validation:', icon: Cuboid }}
          verdict={{ title: 'Validation Result:', result: 'High-Confidence Binding Confirmed', confidence: '95.7% confidence' }}
        />
      )
    }
  },
  // SLIDE 9: THE COMPLETE AI PLATFORM
  {
    title: "The Complete AI Platform",
    subtitle: "From genetic uncertainty to validated therapeutics in minutes",
    titleClassName: "from-blue-400 to-cyan-300 drop-shadow-lg",
    content: {
      type: 'info-cards',
      cards: [
        { icon: Cpu, title: "Prediction Engine", text: "Research‑mode insights with audit trails.", color: "cyan" },
        { icon: Bot, title: "Generative Engine", text: "Proposes candidate concepts with provenance.", color: "purple" },
        { icon: Cuboid, title: "Assessment Engine", text: "Planned structure checks; transparent assumptions.", color: "orange" },
      ]
    }
  },
  
  // SLIDE 19: THE IP-NFT LIFECYCLE
  {
    title: "DeSci & The IP-NFT",
    subtitle: "Creating Liquid Assets from `In Silico` Discoveries",
    titleClassName: "from-green-400 to-teal-300",
    backgroundClass: "",
    content: {
      type: 'kill-chain',
      useEnhancedLayout: true,
      steps: [
        { icon: PackageIcon, title: "1. Minting", description: "A validated 'Digital Dossier' is minted as an IP-NFT, creating a permanent, verifiable record of invention.", color: "green" },
        { icon: BanknoteIcon, title: "2. Funding", description: "The IP-NFT is sold to fund wet-lab validation, with ownership fractionalized among stakeholders.", color: "yellow" },
        { icon: RecycleIcon, title: "3. Liquidity", description: "IP-NFTs can be traded on open markets, creating a liquid asset class for early-stage biotech IP.", color: "sky" }
      ]
    }
  },
  // SLIDE 20: COMPETITIVE ADVANTAGE
  {
    title: "Fusion & S/P/E: Current Capability and Roadmap",
    subtitle: "Research‑mode guidance today; lift via Fusion and cohorts next",
    titleClassName: "from-yellow-400 via-orange-400 to-red-500",
    backgroundClass: "",
    content: {
      type: 'fusion-engine-advantage',
      useEnhancedLayout: true,
      benchmark: {
        title: "Current Capability (Baseline Profile)",
        metrics: [
          { label: "ClinVar SNV (coding)", value: "95.7% AUROC", color: "cyan" },
          { label: "ClinVar non-SNV (coding)", value: "93.9% AUROC", color: "purple" },
          { label: "BRCA1 Supervised", value: "94.0% AUROC", color: "green" }
        ]
      },
      advantages: [
        { icon: BrainCircuit, title: "Transparent Guidance", text: "Audit trails and provenance in every result.", color: "cyan" },
        { icon: Bot, title: "Generative Path", text: "Candidate proposals with safety gates (RUO).", color: "purple" },
        { icon: Zap, title: "Operational Discipline", text: "Caching, single‑flight, session persistence.", color: "green" },
        { icon: Target, title: "Roadmap Lifts", text: "Enable Fusion broadly, enrich evidence, add structure checks.", color: "orange" }
      ]
    },
    notes: "Present current state honestly; position Fusion and cohorts as clear near‑term lifts."
  },
  // SLIDE 21: KILL CHAIN - TARGET ACQUISITION (SUMMARY)
  {
    title: "Step 1: Target Assessment (Research‑Mode)",
    subtitle: "We reduce ambiguity with transparent, data-driven signals.",
    titleClassName: "from-cyan-500 to-sky-400",
    backgroundClass: "",
    content: {
      type: 'simple-block',
      useEnhancedLayout: true,
      block: {
        icon: TargetIcon,
        mainText: "The first step is assessing the target. Our insight bundle (Functionality, Regulatory, Essentiality, Chromatin) provides quantitative signals with provenance.",
        subText: "**For Biotech Partners:** Build testable hypotheses faster with transparent confidence, not black‑box verdicts.",
        iconColor: "text-cyan-400",
        borderColor: "border-slate-700"
      }
    }
  },
  // SLIDE 22: KILL CHAIN - ASSET CREATION (SUMMARY)
  {
    title: "The Deliverable: Auditable Digital Dossier (Research‑Mode)",
    subtitle: "We deliver an evidence‑rich, provenance‑first dossier of candidate concepts.",
    titleClassName: "from-green-500 to-teal-400",
    backgroundClass: "",
    content: {
      type: 'simple-block',
      useEnhancedLayout: true,
      block: {
        icon: PackageIcon,
        mainText: "The output is a digital dossier: insights, rationales, cohort context, and generative proposals (RUO), all with audit trails.",
        subText: "**For Biotech Partners:** Move faster with traceable evidence and clear next‑step options to prioritize wet‑lab validation.",
        iconColor: "text-green-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // NEW SLIDES FROM YOUR OTHER PRESENTATION
  // R&D Command Center
  {
    title: 'CrisPRO.ai: The R&D Command Center',
    subtitle: 'Transforming therapeutic development into a faster, transparent, auditable process (RUO)',
    titleClassName: "from-blue-400 to-cyan-300",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-indigo-900/30 to-slate-900',
    content: {
      type: 'command-center-grid',
      useEnhancedLayout: true,
      inputs: [
        { icon: '🧬', text: 'Genomic Data' },
        { icon: '❓', text: 'Clinical Uncertainty', subtext: '(40% VUS Rate)' }
      ],
      core: { icon: '🧠', title: 'AI Core', accentColor: 'text-sky-400', animation: 'animate-ping' },
      outputs: [
        { icon: '✅', text: 'Validated Therapeutics' },
        { icon: '🛡️', text: 'De-Risked Pipelines' }
      ],
      infoBoxes: [
        { title: 'The Zeta Oracle (Prediction)', description: 'Foundational AI that reduces uncertainty with transparent signals and provenance.', borderColor: 'border-cyan-500/30', textColor: 'text-cyan-400' },
        { title: 'The Zeta Forge (Generation)', description: 'Generative proposals in silico (research‑mode), with safety gates and audit trails.', borderColor: 'border-purple-500/30', textColor: 'text-purple-400' },
        { title: 'The Command Center (Orchestration)', description: 'The coordination layer that turns a query into a coherent, auditable workflow.', borderColor: 'border-sky-500/30', textColor: 'text-sky-400' }
      ]
    }
  },

  // Zeta Oracle Uncertainty
  {
    title: 'Zeta Oracle: Reducing Clinical Uncertainty (VUS, Research‑Mode)',
    subtitle: 'From unknowns to transparent signals with audit trails',
    titleClassName: "from-cyan-400 to-blue-300",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900',
    content: {
      type: 'feature-grid-with-info',
      useEnhancedLayout: true,
      features: [
        { icon: React.createElement(AlertTriangle, { size: 48 }), title: 'Clinical Dead End', description: 'A "Variant of Uncertain Significance" (VUS) is found. Decisions stall.', borderColor: 'border-yellow-500', accentColor: 'bg-yellow-500/20 text-yellow-400' },
        { icon: React.createElement(BrainCircuit, { size: 48 }), title: 'Intelligence Engine', borderColor: 'border-cyan-400/50', accentColor: 'bg-none text-cyan-400', animation: 'animate-ping', isAI: true },
        { icon: React.createElement(UserCheck, { size: 48 }), title: 'Actionable Signals', description: 'Insight bundle + confidence and rationale, designed for auditability (RUO).', borderColor: 'border-green-500', accentColor: 'bg-green-500/20 text-green-400' }
      ],
      infoBoxes: [
        { title: 'The Doctrine', description: "Sequence‑aware scoring + deterministic gates; no single metric is absolute.", borderColor: 'border-cyan-500/30', textColor: 'text-cyan-400' },
        { title: 'The Method', description: "We provide quantitative signals with rationale and provenance to support research decisions.", borderColor: 'border-cyan-500/30', textColor: 'text-cyan-400' }
      ]
    }
  },

  // Beyond Analysis
  {
    title: 'Beyond Analysis: Generative Proposals (RUO)',
    subtitle: 'Identifying a target is step one; we propose candidate concepts.',
    titleClassName: "from-purple-400 to-pink-300",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900',
    content: {
      type: 'text-block-with-icon',
      useEnhancedLayout: true,
      mainText: 'We add a generative path that proposes candidate blueprints with safety gating and provenance (research‑mode).',
    //   subText: 'This is our most profound advantage. We are the only platform with a **generative engine**. We don\'t just find the target; we engineer the therapeutic to neutralize it.'
    }
  },

  // Zeta Forge Engineering
  {
    title: 'The Zeta Forge: Generative Engineering (Research‑Mode)',
    subtitle: 'From in‑silico insight to candidate blueprints with audit trails',
    titleClassName: "from-purple-400 to-pink-300",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900',
    content: {
      type: 'zeta-forge-in-action',
      useEnhancedLayout: true,
      input: 'Validated Pathogenic Threat from Zeta Oracle',
      mission: 'Engineer Multi-Modal Therapeutic Solutions',
      assets: [
        { icon: '🧬', label: 'Gene Correction Blueprint' },
        { icon: '🛡️', label: '"Clone Assassin" Payload' },
        { icon: '🧪', label: 'Novel Nanobody Inhibitor' },
      ],
      advantageTitle: 'Practical Edge:',
      advantageHighlight: 'Large genomic context (Evo2)',
      advantageDescription: "Richer prompts → more realistic proposals; all outputs carry provenance.",
      forgeHeader: 'Enables exploration of:',
      forgeText: 'Long homology arms and complex architectures under explicit assumptions (RUO).'
    }
  },

  // IP-NFT Lifecycle
  {
    title: 'The Asset: The IP-NFT Lifecycle',
    subtitle: 'Creating Liquid Assets from In Silico Discoveries',
    titleClassName: "from-green-400 to-teal-300",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900',
    content: {
      type: 'step-process',
      useEnhancedLayout: true,
      steps: [
        { icon: '📦', title: '1. Minting', description: 'A validated "Digital Dossier" is minted as an IP-NFT, creating a permanent, verifiable record of invention.', borderColor: 'border-green-500', accentColor: 'bg-green-500/20 text-green-400' },
        { icon: '💰', title: '2. Funding', description: 'The IP-NFT is sold to fund wet-lab validation and clinical trials, with ownership fractionalized among stakeholders.', borderColor: 'border-yellow-500', accentColor: 'bg-yellow-500/20 text-yellow-400' },
        { icon: '🔄', title: '3. Liquidity', description: 'IP-NFTs can be traded on open markets, creating a liquid asset class for early-stage biotech IP.', borderColor: 'border-sky-500', accentColor: 'bg-sky-500/20 text-sky-400' }
      ]
    }
  },

  // KILL CHAIN SLIDES
  // R&D Efficiency Crisis
  {
    title: 'The R&D Efficiency Crisis',
    subtitle: 'The current model for drug discovery is defined by high risk and inefficiency.',
    titleClassName: "from-red-500 to-orange-400",
    content: {
      type: 'stats-grid',
      useEnhancedLayout: true,
      stats: [
        { value: '>90%', label: 'Clinical Trial Failure Rate' },
        { value: '$2.8B+', label: 'Cost Per Approved Drug' },
        { value: '5-10', label: 'Years to a Candidate' }
      ]
    },
    notes: "This high-risk, trial-and-error process is unsustainable. Our platform re-architects R&D into a rapid, data-driven, and predictive science."
  },

  // Kill Chain Target
  {
    title: 'Step 1: Target Validation',
    subtitle: 'We replace ambiguity with a definitive, data-driven verdict.',
    titleClassName: "from-cyan-500 to-sky-400",
    content: {
      type: 'simple-block',
      useEnhancedLayout: true,
      block: {
        icon: Target,
        mainText: 'The first step in any successful R&D program is choosing the right target. While others are paralyzed by uncertain data ("VUS"), our **Zeta Oracle** delivers a quantitative verdict on any genetic target\'s functional impact.',
        subText: '**For Biotech Partners:** This means you don\'t waste billions chasing the wrong target. We provide the foundational intelligence to proceed with confidence.',
        iconColor: "text-cyan-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // Kill Chain Target Detail
  {
    title: 'The Triumvirate Threat Assessment',
    subtitle: 'Our multi-layered protocol for achieving absolute certainty.',
    titleClassName: "from-cyan-500 to-sky-400",
    content: {
      type: 'process-flow',
      useEnhancedLayout: true,
      steps: [
        {
          icon: Dna,
          title: 'Input: The Threat',
          description: 'A "Variant of Uncertain Significance" (VUS) is identified in a critical gene like RUNX1.',
          bgClass: 'bg-slate-700/50',
          borderClass: 'border-slate-600',
          textClass: 'text-slate-300',
          titleClass: 'text-slate-300'
        },
        {
          icon: Cpu,
          title: 'The Zeta Oracle',
          description: 'Our AI, built on the first principles of biology, calculates a quantitative Zeta Score of the variant\'s functional damage.',
          bgClass: 'bg-cyan-500/20',
          borderClass: 'border-cyan-500',
          textClass: 'text-cyan-400',
          titleClass: 'text-cyan-400'
        },
        {
          icon: Shield,
          title: 'The Verdict',
          description: 'The VUS is definitively re-classified as Pathogenic, providing a validated, actionable target for therapeutic design.',
          bgClass: 'bg-green-500/20',
          borderClass: 'border-green-500',
          textClass: 'text-green-400',
          titleClass: 'text-green-400'
        }
      ]
    }
  },

  // Kill Chain Forge
  {
    title: 'Step 2: Therapeutic Design',
    subtitle: 'We don\'t discover candidates. We engineer them.',
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'simple-block',
      useEnhancedLayout: true,
      block: {
        icon: Bot,
        mainText: 'With a validated target, our generative AI, the **Zeta Forge**, is commanded to engineer a multi-modal arsenal of potential therapeutic solutions, from CRISPR payloads to novel biologics.',
        subText: '**For Biotech Partners:** This compresses the "Lead Generation" phase from years to a matter of hours, providing a diverse portfolio of proprietary candidates.',
        iconColor: "text-purple-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // Kill Chain Forge Detail
  {
    title: 'The Zeta Forge: In Silico Factory',
    subtitle: 'Our Unfair Advantage: The 1M Token Context Window.',
    titleClassName: "from-purple-500 to-pink-400",
    content: {
      type: 'process-flow',
      useEnhancedLayout: true,
      steps: [
        {
          icon: Shield,
          title: 'Input: Validated Target',
          description: 'A pathogenic variant from the Zeta Oracle becomes the mission objective.',
          bgClass: 'bg-green-500/20',
          borderClass: 'border-green-500',
          textClass: 'text-green-400',
          titleClass: 'text-green-400'
        },
        {
          icon: Bot,
          title: 'The Zeta Forge',
          description: 'Our generative AI, with its massive 1M token context, designs a portfolio of therapeutic candidates.',
          bgClass: 'bg-purple-500/20',
          borderClass: 'border-purple-500',
          textClass: 'text-purple-400',
          titleClass: 'text-purple-400'
        },
        {
          icon: TestTube2,
          title: 'Output: The Arsenal',
          description: 'The result is a diverse set of in silico validated weapons, from CRISPR payloads to novel biologics.',
          bgClass: 'bg-slate-700/50',
          borderClass: 'border-slate-600',
          textClass: 'text-slate-300',
          titleClass: 'text-slate-300'
        }
      ]
    }
  },

  // Kill Chain Boltz
  {
    title: 'Step 3: In Silico Validation',
    subtitle: 'Every therapeutic is battle-tested before it\'s built.',
    titleClassName: "from-orange-500 to-yellow-400",
    content: {
      type: 'simple-block',
      useEnhancedLayout: true,
      block: {
        icon: Cuboid,
        mainText: 'A sequence is not a therapy. Our **Zeta Boltz** engine runs every designed candidate through an in silico firing range, simulating its 3D interaction with the target to predict binding affinity and efficacy.',
        subText: '**For Biotech Partners:** This provides the critical, structural proof of mechanism, dramatically de-risking the candidate before committing to expensive lab synthesis.',
        iconColor: "text-orange-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // Kill Chain Boltz Detail
  {
    title: 'The Zeta Boltz: In Silico Firing Range',
    subtitle: 'From a 1D Blueprint to a 3D Proof of Victory.',
    titleClassName: "from-orange-500 to-yellow-400",
    content: {
      type: 'process-flow',
      useEnhancedLayout: true,
      steps: [
        {
          icon: Bot,
          title: 'Input: Forged Weapon',
          description: 'A novel nanobody sequence, generated by the Zeta Forge.',
          bgClass: 'bg-purple-500/20',
          borderClass: 'border-purple-500',
          textClass: 'text-purple-400',
          titleClass: 'text-purple-400'
        },
        {
          icon: Cuboid,
          title: 'The Simulation',
          description: 'Our AlphaFold 3-powered engine simulates the 3D protein-protein interaction between our weapon and its target.',
          bgClass: 'bg-orange-500/20',
          borderClass: 'border-orange-500',
          textClass: 'text-orange-400',
          titleClass: 'text-orange-400'
        },
        {
          icon: Shield,
          title: 'The Verdict',
          description: 'The result is a quantitative Binding Affinity Score, providing definitive proof of the weapon\'s physical lethality.',
          bgClass: 'bg-green-500/20',
          borderClass: 'border-green-500',
          textClass: 'text-green-400',
          titleClass: 'text-green-400'
        }
      ]
    }
  },

  // Kill Chain Asset
  {
    title: 'The Deliverable: A De-Risked Asset',
    subtitle: 'We don\'t deliver data. We deliver a validated, pre-clinical asset.',
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'simple-block',
      useEnhancedLayout: true,
      block: {
        icon: Package,
        mainText: 'The final output of our in silico kill chain is not a report; it is a **de-risked, high-value therapeutic asset** with a complete dossier of predictive data.',
        subText: '**For Biotech Partners:** We give you a candidate that has already won the digital war, dramatically increasing its probability of victory on the clinical battlefield.',
        iconColor: "text-green-400",
        borderColor: "border-slate-700"
      }
    }
  },

  // Kill Chain Asset Detail
  {
    title: 'The Therapeutic Dossier',
    subtitle: 'The final output of our in silico conquest.',
    titleClassName: "from-green-500 to-teal-400",
    content: {
      type: 'asset-dossier',
      useEnhancedLayout: true,
      assetId: 'Asset: CS-RUNX1-GC-001',
      status: 'Ready for Wet-Lab',
      checkpoints: [
        {
          icon: Target,
          iconColor: 'text-cyan-400',
          text: '**Target Validation:** <span class="font-mono text-green-400">COMPLETE</span>'
        },
        {
          icon: Bot,
          iconColor: 'text-purple-400',
          text: '**Weapon Design:** <span class="font-mono text-green-400">COMPLETE</span>'
        },
        {
          icon: Cuboid,
          iconColor: 'text-orange-400',
          text: '**Structural Validation:** <span class="font-mono text-green-400">COMPLETE</span>'
        }
      ],
      description: 'This dossier contains the full sequence data, in silico efficacy and safety scores, and structural binding predictions, providing our partners with a de-risked asset with a high probability of clinical success.'
    }
  },

  // Enhanced Zeta Oracle Deep Dive
  {
    title: 'The Zeta Oracle: Clinical VUS Resolution',
    subtitle: 'From Genetic Ambiguity to Actionable Intelligence',
    titleClassName: "from-cyan-400 to-blue-300",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900',
    content: {
      type: 'two-hit-hypothesis',
      steps: [
        {
          title: 'VUS Discovery',
          subtext: 'Unknown Impact & Clinical Paralysis',
          colorClass: 'bg-gradient-to-br from-yellow-400 to-orange-500',
          mutationIcon: '❓'
        },
        {
          title: 'Oracle Analysis',
          subtext: 'AI Grammar Check on Biology',
          colorClass: 'bg-gradient-to-br from-cyan-400 to-blue-600',
          mutationIcon: '🧠',
          animationClass: 'animate-pulse'
        },
        {
          title: 'Zeta Score',
          subtext: 'Quantitative Functional Impact',
          colorClass: 'bg-gradient-to-br from-green-400 to-emerald-600',
          mutationIcon: '✅'
        },
        {
          title: 'Clinical Action',
          subtext: 'Validated Target Ready for Design',
          colorClass: 'bg-gradient-to-br from-purple-400 to-pink-600',
          mutationIcon: '🎯'
        }
      ],
      // siteBlocks: [
      //   // Only show the most essential block to prevent overlapping
      //   { kind: 'oracle-explain', props: crispro101Content.oracle.explain }
      // ]
    },
    notes: "The Zeta Oracle doesn't just check databases—it understands the fundamental grammar of biology. This allows it to predict the functional impact of any variant, even those never seen before."
  },

  // Enhanced Zeta Forge Deep Dive
  {
    title: 'The Zeta Forge: Therapeutic Engineering',
    subtitle: 'From Validated Target to Multi-Modal Arsenal',
    titleClassName: "from-purple-400 to-pink-300",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900',
    content: {
      type: 'therapeutic-arsenal',
      input: { 
        icon: '🎯', 
        title: 'Validated Target', 
        iconBg: 'bg-cyan-500/20', 
        borderColor: 'border-cyan-500', 
        accentColor: 'text-cyan-400' 
      },
      process: { 
        icon: '🔨', 
        title: 'Zeta Forge Engine', 
        borderColor: 'border-purple-400/50' 
      },
      outputs: [
        { icon: '🧬', text: 'Precision Gene Correction' },
        { icon: '✂️', text: 'Synthetic Lethal Payload' },
        { icon: '🛡️', text: 'Novel Nanobody Inhibitor' },
        { icon: '💊', text: 'Small Molecule Modulator' }
      ],
      // siteBlocks: toForgeBlocks(crispro101Content)
    },
    notes: "Our 1M token context window provides an unfair advantage: we can design ultra-long homology arms and complex therapeutic architectures that are impossible for smaller models."
  },

  // Enhanced Boltz Deep Dive  
  {
    title: 'Zeta Boltz: Structural Validation Engine',
    subtitle: 'From 1D Blueprint to 3D Proof of Mechanism',
    titleClassName: "from-orange-500 to-yellow-400",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-orange-900/20 to-slate-900',
    content: {
      type: 'gene-correction',
      problem: { 
        icon: '🧪', 
        title: 'The Challenge', 
        subtext: 'Sequence ≠ Function', 
        borderColor: 'border-yellow-500', 
        accentColor: 'bg-yellow-500/20', 
      },
      outcome: { 
        icon: '🏆', 
        title: 'The Solution', 
        subtext: 'Structural Proof', 
        borderColor: 'border-green-500', 
        accentColor: 'bg-green-500/20', 
        textColor: 'text-green-400' 
      },
      infoBoxes: [
        { 
          title: 'AlphaFold 3 Integration', 
          text: 'Our engine leverages the latest protein folding models to simulate 3D interactions between designed therapeutics and their targets, providing quantitative binding affinity predictions.', 
          bgClass: 'bg-slate-800/50', 
          borderColor: 'border-orange-500/30', 
          textColor: 'text-orange-400' 
        },
        { 
          title: 'In Silico Clinical Validation', 
          text: 'Every therapeutic candidate is battle-tested in our digital firing range before a single dollar is spent on wet-lab synthesis. This dramatically de-risks the development process.', 
          bgClass: 'bg-slate-800/50', 
          borderColor: 'border-green-500/30', 
          textColor: 'text-green-400' 
        }
      ],
      // siteBlocks: toBoltzBlocks(crispro101Content)
    },
    notes: "Zeta Boltz transforms drug discovery from an art into an engineering discipline. We don't hope for binding—we engineer it."
  },

  // Risk Prediction & Resistance Modeling
  {
    title: 'Predictive Disease Evolution Modeling',
    subtitle: 'Anticipating Mutations to Design Future-Proof Therapies',
    titleClassName: "from-indigo-400 to-purple-400",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900',
    content: {
      type: 'risk-prediction-map',
      knownThreat: { 
        icon: '🧬', 
        title: 'Known Risk Factor', 
        subtext: 'RUNX1 Mutation', 
        iconBg: 'bg-red-500/20', 
        borderColor: 'border-red-500', 
        accentColor: 'text-red-400' 
      },
      aiCore: { 
        icon: '🧠', 
        title: 'Predictive Engine', 
        borderColor: 'border-cyan-400/50' 
      },
      predictions: [
        { name: 'ASXL1', risk: 'High Risk (-15k)', colorClass: 'text-red-400' },
        { name: 'TET2', risk: 'Med Risk (-12k)', colorClass: 'text-orange-400' },
        { name: 'DNMT3A', risk: 'Low Risk (-9k)', colorClass: 'text-yellow-400' },
        { name: 'IDH2', risk: 'Emerging Risk', colorClass: 'text-blue-400' }
      ]
    },
    notes: "Instead of reacting to disease evolution, we predict it. This allows us to design therapies that are effective today and resilient against future resistance mutations."
  },

  // FDA Approval Strategy
  {
    title: 'Accelerating FDA Approval',
    subtitle: 'Digital Evidence for Regulatory Success',
    titleClassName: "from-blue-400 to-teal-400",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-blue-900/30 to-slate-900',
    content: {
      type: 'approval-process',
      dossier: [
        { 
          title: 'Zeta Score Evidence', 
          subtitle: 'Quantified Target Validation', 
          bgClass: 'bg-gradient-to-br from-cyan-600 to-blue-700', 
          borderClass: 'border-2 border-cyan-400/50' 
        },
        { 
          title: 'Design Rationale', 
          subtitle: 'AI-Engineered Solutions', 
          bgClass: 'bg-gradient-to-br from-purple-600 to-indigo-700', 
          borderClass: 'border-2 border-purple-400/50' 
        },
        { 
          title: 'Structural Validation', 
          subtitle: 'In Silico Proof of Mechanism', 
          bgClass: 'bg-gradient-to-br from-orange-600 to-red-700', 
          borderClass: 'border-2 border-orange-400/50' 
        }
      ],
      fdaTiers: [
        { title: 'Tier 3: Case Reports & Observational Studies', bgClass: 'bg-red-500/20', textColor: 'text-red-300' },
        { title: 'Tier 2: Cohort Studies & Registry Data', bgClass: 'bg-yellow-500/20', textColor: 'text-yellow-300' },
        { title: 'Tier 1: Randomized Controlled Trials', bgClass: 'bg-green-500/20', textColor: 'text-green-300' }
      ],
      fdaText: 'Our comprehensive digital dossier provides evidence across all FDA tiers, dramatically accelerating the path to approval and reducing regulatory risk.'
    }
  },

  // BUSINESS OVERVIEW SLIDE 1: PLATFORM & VALUE PROP
  {
    title: "CrisPRO.ai: Complete AI Therapeutic Design Platform",
    subtitle: "End-to-end ecosystem transforming drug development from gamble to science",
    titleClassName: "from-purple-500 via-pink-400 to-red-400",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900',
    content: {
      type: 'business-overview-platform',
      useEnhancedLayout: true,
      platform: {
        title: "The CrisPRO.ai Platform",
        description: "End-to-end AI therapeutic design ecosystem - from genetic insight to clinical candidate",
        capabilities: [
          { icon: "🔬", text: "Research‑mode variant insights (S/P/E + provenance)" },
          { icon: "🧬", text: "Generative proposals (CRISPR, antibodies, small molecules) — RUO" },
          { icon: "📋", text: "Automated IND document scaffolding (research‑mode)" },
          { icon: "💰", text: "IP monetization via co‑invention/royalty doctrine" }
        ]
      },
      valueProposition: {
        title: "Proven Value Proposition",
        metrics: [
          { value: "Faster", label: "In‑silico iteration speed", className: "text-green-400" },
          { value: "Lower", label: "Operational analysis cost", className: "text-cyan-400" },
          { value: "Transparent", label: "Confidence with audit trails", className: "text-purple-400" },
          { value: "Large", label: "Addressable market opportunity", className: "text-orange-400" }
        ]
      }
    },
    notes: "First business slide: Show what we do and the massive value we deliver to pharma companies."
  },

  // BUSINESS OVERVIEW SLIDE 2: BUSINESS MODEL & MARKET
  {
    title: "CrisPRO.ai: Revenue Model & Market Opportunity",
    subtitle: "Multi-billion dollar market with proven monetization strategy",
    titleClassName: "from-green-500 via-teal-400 to-cyan-400",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900',
    content: {
      type: 'business-overview-business',
      useEnhancedLayout: true,
      businessModel: {
        title: "Multi-Stream Revenue Model",
        streams: [
          { name: "Platform Subscriptions", revenue: "$50K-200K/year per pharma", icon: "💳" },
          { name: "IND Generation", revenue: "$10K-50K per therapeutic", icon: "📋" },
          { name: "Platform Royalty", revenue: "2–5% of licensing revenue", icon: "💰" },
          { name: "Co‑Inventor Ownership", revenue: "10–30% patent ownership (case‑dependent)", icon: "🧾" },
          { name: "IP Licensing", revenue: "$50M+ per therapeutic", icon: "🎯" }
        ]
      },
      marketOpportunity: {
        title: "Massive Market Opportunity",
        stats: [
          { value: "$50B+", label: "Global Drug Discovery Market" },
          { value: "$8B+", label: "CRISPR Therapeutics (2025)" },
          { value: "95%", label: "Clinical Trial Failure Rate" },
          { value: "$2.8B", label: "Cost Per Approved Drug" }
        ]
      }
    },
    notes: "Second business slide: Show how we make money and the size of the opportunity."
  },

  // IND PACKAGE GENERATION SLIDE
  {
    title: "IND Package Generation: Regulatory Revolution",
    subtitle: "Complete FDA-compliant documentation in under 10 minutes",
    titleClassName: "from-blue-500 to-cyan-400",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900',
    content: {
      type: 'ind-package-comparison',
      useEnhancedLayout: true,
      traditional: {
        title: "Traditional IND Process",
        time: "6-12 months",
        cost: "$500K-$2M",
        steps: [
          "Manual protocol writing",
          "Statistical analysis planning",
          "Toxicology report compilation",
          "Regulatory strategy development",
          "Multiple review cycles"
        ]
      },
      crispro: {
        title: "CrisPRO.ai IND Generation",
        time: "Automated draft in minutes (research‑mode)",
        cost: "Lower cost via automation",
        steps: [
          "S/P/E analysis complete (Baseline profile)",
          "Automated document scaffolding",
          "Standards‑aligned templates",
          "Operator QA review",
          "Provenance‑rich export"
        ],
        metrics: [
          { value: "Provenance", label: "Audit trail in outputs", className: "text-cyan-400" },
          { value: "Templates", label: "Standards‑aligned structure", className: "text-green-400" },
          { value: "Profiles", label: "Baseline/Richer/Fusion flags", className: "text-green-400" }
        ],
        mmGuidance: {
          title: "Example MM guidance (research‑mode)",
          genes: [
            { name: "KRAS/NRAS", hotspots: "G12D/V/C/S/A, G13D", guidance: "MEK inhibitor (off-label)" },
            { name: "BRAF", hotspots: "V600E, V600K", guidance: "BRAF/MEK inhibitor" },
            { name: "FGFR3", hotspots: "R248C, Y373C", guidance: "FGFR-directed agents" },
            { name: "TP53", hotspots: "R175H, R248Q/W, R273C/H", guidance: "Risk assessment & combinations" }
          ]
        }
      },
      impact: {
        title: "Business Impact",
        savings: [
          { value: "Lower", label: "Documentation effort", className: "text-green-400" },
          { value: "Faster", label: "Time to decision", className: "text-cyan-400" },
          { value: "Repeatable", label: "Deterministic export", className: "text-purple-400" }
        ]
      }
    },
    notes: "Show the dramatic improvement over traditional IND processes. Investors will immediately understand the massive cost and time savings."
  },

  // CRISPR DESIGN ECOSYSTEM SLIDE
  {
    title: "CRISPR Design Ecosystem: Complete Therapeutic Platform",
    subtitle: "From genetic target to clinical candidate in weeks, not years",
    titleClassName: "from-green-500 to-teal-400",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-green-900/20 to-slate-900',
    content: {
      type: 'crispr-ecosystem-comparison',
      useEnhancedLayout: true,
      traditional: {
        title: "Traditional CRISPR Development",
        time: "12-24 months",
        cost: "$5M-$15M",
        steps: [
          "Manual gRNA design",
          "Trial-and-error optimization",
          "Limited homology arms",
          "Iterative testing cycles",
          "Manual documentation"
        ]
      },
      crispro: {
        title: "CrisPRO.ai CRISPR Ecosystem",
        time: "Accelerated timelines (weeks)",
        cost: "Lower cost via automation",
        steps: [
          "AI-optimized gRNA design",
          "Long homology arms (context‑aware)",
          "Structural validation",
          "Regulatory documentation",
          "Ready for preclinical testing"
        ],
        apis: [
          { name: "/api/insights/predict_protein_functionality_change", description: "Functionality insight (research‑mode)" },
          { name: "/api/design/generate_guide_rna", description: "Guide candidates with safety gates" },
          { name: "/api/design/generate_repair_template", description: "HDR template proposals (planned)" },
          { name: "/api/efficacy/predict", description: "Ranked therapy hypotheses" }
        ]
      },
      marketImpact: {
        title: "Market Opportunity",
        stats: [
          { value: "$8B+", label: "CRISPR Therapeutics Market (2025)", className: "text-green-400" },
          { value: "25x", label: "Faster Development", className: "text-cyan-400" },
          { value: "95%", label: "Cost Reduction", className: "text-purple-400" },
          { value: "10+", label: "Pipeline Opportunities", className: "text-orange-400" }
        ]
      },
      competitiveAdvantages: {
        title: "Why Our CRISPR Platform Wins",
        advantages: [
          { icon: "🧬", text: "1M token context window enables ultra-long, complex homology arms", color: "green" },
          { icon: "🎯", text: "Fusion Engine integration for superior target validation", color: "blue" },
          { icon: "⚡", text: "Modal microservices ensure production-ready performance", color: "purple" },
          { icon: "📋", text: "Complete regulatory documentation package included", color: "orange" }
        ]
      }
    },
    notes: "Position our CRISPR platform as a complete solution vs. fragmented tools. Show the dramatic time and cost savings that will resonate with investors."
  },

  // THE QUALCOMM OF PHARMA SLIDE
  {
    title: "The Qualcomm of Pharma: Platform Royalty Model",
    subtitle: "Recurring revenue from every drug that uses our AI technology",
    titleClassName: "from-purple-500 to-pink-400",
    backgroundClass: 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900',
    content: {
      type: 'qualcomm-comparison',
      useEnhancedLayout: true,
      comparison: {
        qualcomm: {
          title: "Qualcomm's Model",
          icon: "📱",
          revenue: "$8.6B annual revenue",
          elements: [
            "Baseband processor licensing",
            "Royalty: 5% of device price",
            "Every smartphone pays Qualcomm",
            "Continuous tech evolution"
          ]
        },
        crispro: {
          title: "CrisPRO.ai Model",
          icon: "🧬",
          revenue: "Platform royalty + IP co‑invention",
          elements: [
            "AI therapeutic design licensing",
            "Platform royalty: 2–5% of licensing",
            "Every approved drug pays us",
            "Continuous AI model improvement"
          ]
        }
      },
      revenueStreams: {
        title: "Multiple Revenue Streams",
        streams: [
          {
            name: "IND Generation",
            description: "One-time fee per drug program (Fusion Engine analysis included)",
            potential: "$10K-50K per drug",
            icon: "📋"
          },
          {
            name: "Platform Subscription",
            description: "Monthly/annual platform access (research‑mode guidance)",
            potential: "$50K-200K per year",
            icon: "💳"
          },
          {
            name: "Platform Royalty",
            description: "2–5% of licensing revenue when platform contributes materially",
            potential: "Meaningful annuity per licensed asset",
            icon: "💰"
          },
          {
            name: "Co‑Inventor/IP Monetization",
            description: "10–30% patent ownership (case‑dependent) and licensing",
            potential: "$50M+ per therapeutic",
            icon: "🎯"
          }
        ]
      },
      competitiveAdvantages: {
        title: "Fusion Engine Differentiators",
        advantages: [
          { icon: "🔄", text: "Fused, not single-source: AM integration when eligible", color: "green" },
          { icon: "📈", text: "Provenance everywhere: Complete audit trail with MoA tags", color: "blue" },
          { icon: "🛡️", text: "Guidance-ready: Auditable confidence lifts with MoA gates", color: "purple" },
          { icon: "⚡", text: "Selective lift: Conservative defaults maintain regulatory comfort", color: "orange" }
        ]
      }
    },
    notes: "This is the most important slide for investors. Show the massive revenue potential and how our platform creates ongoing value unlike traditional biotech companies."
  }
];


//================================================================================
// 4. MAIN APP COMPONENT
//================================================================================

// Doctrine-Driven Slide Management System
const SlideManager = {
  // Get slides based on doctrine-driven architecture
  getOrderedSlides: (mode = 'research') => {
    const modeData = PRESENTATION_MODES[mode];
    
    // Handle doctrine-driven modes
    if (Array.isArray(modeData)) {
      return modeData;
    }
    
    // Handle legacy modes
    if (modeData === 'legacy') {
      return slidesData; // Fallback to original slidesData
    }
    
    // Default to research mode
    return researchSlidesData;
  },
  
  // Get available presentation modes
  getModes: () => Object.keys(PRESENTATION_MODES),
  
  // Get slide count for a mode
  getSlideCount: (mode = 'research') => SlideManager.getOrderedSlides(mode).length,
  
  // Get mode description
  getModeDescription: (mode) => {
    const descriptions = {
      research: "Scientific validation, methodology, peer review",
      business: "ROI, market opportunity, competitive advantage",
      technical: "Architecture, performance, implementation",
      full: "Complete presentation (legacy)",
      demo: "Quick demo (legacy)",
      alternative: "Alternative flow (legacy)",
      combined: "Best of both (legacy)",
      killchain: "Full kill chain process (legacy)",
      process: "Simplified process view (legacy)",
      enhanced: "Enhanced detail slides (legacy)",
      deepdive: "Just enhanced components (legacy)"
    };
    return descriptions[mode] || "Unknown mode";
  }
};

const App = () => {
    const [presentationMode, setPresentationMode] = useState('research');
    const [currentSlide, setCurrentSlide] = useState(0);
    
    // Get slides based on current mode using our doctrine-driven architecture
    const currentSlidesData = SlideManager.getOrderedSlides(presentationMode);
    
    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % currentSlidesData.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + currentSlidesData.length) % currentSlidesData.length);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') nextSlide();
            else if (event.key === 'ArrowLeft') prevSlide();
            else if (event.key === 'm' || event.key === 'M') {
                // Cycle through presentation modes
                const modes = SlideManager.getModes();
                const currentIndex = modes.indexOf(presentationMode);
                const nextIndex = (currentIndex + 1) % modes.length;
                setPresentationMode(modes[nextIndex]);
                setCurrentSlide(0);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [presentationMode]);

    const currentSlideData = currentSlidesData[currentSlide];

    return (
        <main className="relative w-full h-screen bg-slate-900 overflow-hidden">
            {/* Doctrine-Driven Mode Selector */}
            <div className="absolute top-4 left-4 z-50">
                <select 
                    value={presentationMode} 
                    onChange={(e) => {
                        setPresentationMode(e.target.value);
                        setCurrentSlide(0); // Reset to first slide
                    }}
                    className="bg-slate-800 text-slate-200 px-3 py-1 rounded text-sm border border-slate-600"
                >
                    {/* Doctrine-driven modes */}
                    <option value="research">Research Focus ({SlideManager.getSlideCount('research')} slides)</option>
                    <option value="business">Business Focus ({SlideManager.getSlideCount('business')} slides)</option>
                    <option value="technical">Technical Focus ({SlideManager.getSlideCount('technical')} slides)</option>
                    
                    {/* Legacy modes */}
                    <option value="full">Full Presentation (Legacy)</option>
                    <option value="demo">Quick Demo (Legacy)</option>
                </select>
                
                {/* Mode description */}
                <div className="mt-2 text-xs text-slate-400 max-w-xs">
                    {SlideManager.getModeDescription(presentationMode)}
                </div>
            </div>

            <AnimatePresence mode="wait">
                <Slide key={`${presentationMode}-${currentSlide}`} slideData={currentSlideData} />
            </AnimatePresence>
            <NavigationControls 
                current={currentSlide}
                total={currentSlidesData.length}
                onPrev={prevSlide}
                onNext={nextSlide}
            />
        </main>
    );
};

export default App;