import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, UserPlus, ArrowRight, Bot, CheckCircle, Link, ShieldAlert, ShieldCheck, FileClock, Fingerprint, Cpu, Package, Dna, FlaskConical, BrainCircuit, Gem, Globe, KeyRound, Lock, FileJson, Building, Zap, UserCheck, Eye, Activity, AlertTriangle, Users, Settings, Database, Network, Workflow, FileCheck, Layers, Monitor, Bell, Search, BarChart3, Target } from 'lucide-react';
import { useAccessibility } from '../../contexts/AccessibilityContext';

//================================================================================
// 1. REUSABLE UI & LAYOUT COMPONENTS
//================================================================================

const Brand = () => (
    <div className="absolute bottom-6 right-6 z-20 text-lg font-semibold text-slate-400/70">
        Zeta Shield 🛡️
    </div>
);

const DigitalSynapseBackground = () => {
    const mountRef = useRef(null);
    useEffect(() => {
        // Placeholder for a more complex background.
    }, []);
    return <div ref={mountRef} className="absolute inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"></div>;
};

const SlideLayout = ({ children, className = '' }) => (
    <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className={`absolute inset-0 flex flex-col items-center justify-center text-center p-8 text-slate-200 ${className}`}
    >
        <DigitalSynapseBackground />
        <div className="relative z-10 w-full max-w-6xl space-y-12">
            {children}
        </div>
    </motion.section>
);

const SlideHeader = ({ title, subtitle, titleGradient, subtitleClassName = '' }) => {
    const { getTextSize } = useAccessibility();
    
    return (
            <div className="space-y-4">
            <h1 className={`${getTextSize('text-5xl')} md:${getTextSize('text-7xl')} font-black text-transparent bg-clip-text bg-gradient-to-r ${titleGradient}`}>
                {title}
                </h1>
            <p className={`${getTextSize('text-2xl')} md:${getTextSize('text-3xl')} font-light text-slate-300 ${subtitleClassName}`}>
                {subtitle}
                </p>
            </div>
    );
};

const InfoBlock = ({ icon, mainText, subText, iconColor, animateIcon }) => {
    const { getTextSize, getIconSize } = useAccessibility();
    
    return (
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 max-w-4xl mx-auto text-center">
            {React.createElement(icon, {
                size: getIconSize(64),
                className: `mx-auto ${iconColor} mb-6 ${animateIcon ? 'animate-pulse' : ''}`
            })}
            <p className={`${getTextSize('text-xl')} text-slate-200 mb-4 max-w-3xl mx-auto`} dangerouslySetInnerHTML={{ __html: mainText }}></p>
            <p className={`${getTextSize('text-lg')} text-slate-300 mt-6`} dangerouslySetInnerHTML={{ __html: subText }}></p>
        </div>
    );
};

const ZetaShieldIntroVisual = ({ visual, summary }) => (
    <>
        <div className="relative flex justify-center items-center h-80">
            {React.createElement(visual.icon, { size: 128, className: `${visual.iconColor} z-20 animate-pulse` })}
            
            {/* Inner ring with main capabilities */}
            <div className="absolute w-96 h-96 border-2 border-cyan-500/30 rounded-full animate-spin" style={{animationDuration: '20s'}}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-3 rounded-full border border-cyan-500/50">
                    <UserCheck className="text-cyan-400" />
                    </div>
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-800 p-3 rounded-full border border-cyan-500/50">
                    <Bot className="text-cyan-400" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-slate-800 p-3 rounded-full border border-cyan-500/50">
                    <Eye className="text-cyan-400" />
                    </div>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-3 rounded-full border border-cyan-500/50">
                    <Fingerprint className="text-cyan-400" />
                </div>
            </div>

            {/* Outer ring with supporting capabilities */}
            <div className="absolute w-[32rem] h-[32rem] border-2 border-slate-700/50 rounded-full animate-spin" style={{animationDuration: '30s', animationDirection: 'reverse'}}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-full border border-slate-600">
                    <Monitor className="text-slate-400 w-4 h-4" />
                </div>
                <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-full border border-slate-600">
                    <Bell className="text-slate-400 w-4 h-4" />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-slate-800 p-2 rounded-full border border-slate-600">
                    <FileCheck className="text-slate-400 w-4 h-4" />
                </div>
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-2 rounded-full border border-slate-600">
                    <Database className="text-slate-400 w-4 h-4" />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {summary.items.map((item, i) => (
                <div key={i} className={`bg-slate-800/50 p-4 rounded-xl border border-${item.color}-500/30 text-center`}>
                    {React.createElement(item.icon, { className: `mx-auto text-${item.color}-400 mb-2`, size: 32 })}
                    <h4 className={`font-semibold text-${item.color}-400`}>{item.title}</h4>
                    <p className="text-xs text-slate-300">{item.subtitle}</p>
                </div>
            ))}
        </div>
    </>
);

const Auth0Visual = ({ processSteps }) => (
    <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Left Side - Users */}
        <div className="flex flex-col space-y-6">
            <div className="flex flex-col items-center space-y-3 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                <UserCheck size={48} className="text-slate-300" />
                <p className="font-semibold text-slate-200">Researchers</p>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                <UserCheck size={48} className="text-slate-300" />
                <p className="font-semibold text-slate-200">Partners</p>
            </div>
        </div>

        {/* Center Flow */}
        <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-6">
            <ArrowRight className="text-4xl text-blue-400 animate-pulse" />
            
            {/* Auth0 Logo Card */}
            <div className="p-8 bg-white rounded-2xl shadow-2xl border-4 border-orange-500/30">
                <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-20 w-20">
                    <title>Auth0</title>
                    <path fill="#EB5424" d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.537c3.785-2.809 5.167-7.703 3.815-12.015zm-9.973 5.134c-2.212 0-4.003-1.79-4.003-4.003s1.79-4.003 4.003-4.003 4.003 1.79 4.003 4.003-1.791 4.003-4.003 4.003z"/>
                </svg>
                <p className="text-center text-slate-800 font-bold mt-3">Enterprise Identity</p>
            </div>
            
            <ArrowRight className="text-4xl text-green-400 animate-pulse" />
        </div>

        {/* Right Side - Result */}
        <div className="flex flex-col items-center space-y-3 p-8 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl border border-green-500/50">
            <ShieldCheck size={64} className="text-green-400" />
            <h3 className="font-bold text-green-400 text-xl">Secure Platform Access</h3>
            <p className="text-slate-300 text-center max-w-xs">Verified, trusted, enterprise-grade security for all users</p>
        </div>
    </div>
);

const ProcessSteps = ({ steps }) => {
    const { getTextSize, getIconSize } = useAccessibility();
    
    return (
        <div className="bg-slate-800/50 p-12 rounded-3xl border border-slate-700">
            <div className="flex flex-col lg:flex-row items-center justify-around space-y-8 lg:space-y-0 lg:space-x-4">
                {steps.map((step, i) => (
                    <React.Fragment key={i}>
                        <div className="flex flex-col items-center space-y-3 text-center">
                            <div className={`${getTextSize('text-4xl')} p-4 rounded-full border-2 ${step.iconBgClass} ${step.iconBorderClass} ${step.iconColorClass}`}>
                                {React.createElement(step.icon)}
                            </div>
                            <h3 className={`${getTextSize('text-xl')} font-bold ${step.titleColor}`}>{step.title}</h3>
                            <p className={`text-slate-300 ${getTextSize('text-base')} max-w-xs`} dangerouslySetInnerHTML={{ __html: step.description }}></p>
                        </div>
                        {i < steps.length - 1 && <div className={`${getTextSize('text-3xl')} text-slate-600 animate-pulse hidden lg:block`}><ArrowRight/></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

const TwoColumnGrid = ({ content }) => {
    const { getTextSize, getIconSize } = useAccessibility();
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`bg-slate-800/50 p-8 rounded-2xl border ${content.column1.borderColor}`}>
                <div className="flex items-center space-x-4 mb-6">
                    {React.createElement(content.column1.icon, { size: getIconSize(48), className: content.column1.iconColor })}
                    <h3 className={`${getTextSize('text-2xl')} font-bold ${content.column1.titleColor}`}>{content.column1.title}</h3>
                </div>
                <div className="space-y-4 text-left">
                    {content.column1.items.map((item, i) => (
                        <div key={i} className="flex items-start space-x-3">
                            {React.createElement(item.icon, { className: `${item.iconColor} mt-1`, size: getIconSize(20) })}
                            <div>
                                <h4 className={`font-semibold text-slate-200 ${getTextSize('text-base')}`}>{item.title}</h4>
                                <p className={`text-slate-200 ${getTextSize('text-base')}`}>{item.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={`bg-slate-800/50 p-8 rounded-2xl border ${content.column2.borderColor}`}>
                <div className="flex items-center space-x-4 mb-6">
                    {React.createElement(content.column2.icon, { size: getIconSize(48), className: content.column2.iconColor })}
                    <h3 className={`${getTextSize('text-2xl')} font-bold ${content.column2.titleColor}`}>{content.column2.title}</h3>
                </div>
                <div className="space-y-4">
                    {content.column2.items.map((item, i) => (
                        <div key={i} className="bg-slate-900/50 p-4 rounded-lg border border-slate-700">
                            <div className={`flex justify-between items-center ${getTextSize('text-sm')}`}>
                                <span className="text-slate-400">{item.label}</span>
                                <span className={item.statusColor}>{item.status}</span>
                            </div>
                            <p className={`text-slate-200 mt-2 ${getTextSize('text-base')}`}>{item.description}</p>
                            <p className={`${getTextSize('text-sm')} text-slate-400`}>{item.metadata}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const SecurityDoctrineVisual = ({ visual }) => (
    <div className="relative flex justify-center items-center h-64">
        {React.createElement(visual.icon, { size: 128, className: `${visual.iconColor} z-10` })}
        {visual.rings.map((ring, i) => (
            <div key={i} className={`absolute ${ring.size} ${ring.borderClass} ${ring.animation}`} style={{ animationDuration: ring.animationDuration, animationDirection: ring.animationDirection }}>
                <div className={`absolute ${ring.circlePosition} ${ring.circleBg} ${ring.circleBorder} ${ring.circleAnimation}`}>
                    {React.createElement(ring.circleIcon, { className: ring.circleIconColor })}
                </div>
            </div>
        ))}
    </div>
);

const MarketOpportunityVisual = ({ content }) => (
    <div className="flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12">
        <div className="relative w-96 h-96 flex items-center justify-center">
            <div className="absolute w-96 h-96 border-2 border-slate-700 rounded-full flex items-center justify-center">
                <div className="absolute w-64 h-64 border-2 border-slate-800 rounded-full"></div>
            </div>
            <div className="relative z-10 bg-slate-800/50 p-4 rounded-full border border-slate-600">
                {React.createElement(content.icon, { size: 48, className: "text-green-400" })}
                    </div>
            {content.satellites.map((satellite, i) => (
                <div key={i} className={`absolute ${satellite.position}`}>
                    {React.createElement(satellite.icon, { size: 32, className: "text-slate-400 mx-auto mb-1" })}
                    <p className="text-sm font-semibold">{satellite.text}</p>
                </div>
            ))}
            </div>
        <div className="max-w-md text-left">
            <h3 className="text-3xl font-bold text-green-400 mb-4">{content.strategyTitle}</h3>
            <p className="text-xl text-slate-300">
                {content.strategyMainText}
            </p>
            <p className="text-lg text-slate-400 mt-4">
                {content.strategySubText}
            </p>
        </div>
    </div>
);

const NavigationControls = ({ current, total, onPrev, onNext }) => (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/30 backdrop-blur-sm p-2 rounded-full border border-slate-700">
        <button onClick={onPrev} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&larr;</button>
        <span className="text-slate-300 font-semibold text-sm">Slide {current + 1} / {total}</span>
        <button onClick={onNext} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&rarr;</button>
            </div>
);

//================================================================================
// 2. UNIVERSAL SLIDE COMPONENT
//================================================================================

const Slide = ({ slideData }) => {
    const { title, subtitle, titleGradient, content } = slideData;

    return (
        <SlideLayout className={content.backgroundClass}>
            <SlideHeader title={title} subtitle={subtitle} titleGradient={titleGradient} />

            {content.type === 'high-stakes' && (
                <InfoBlock
                    icon={content.block.icon}
                    iconColor={content.block.iconColor}
                    animateIcon={true}
                    mainText={content.block.mainText}
                    subText={content.block.subText}
                />
            )}

            {content.type === 'intro' && (
                <ZetaShieldIntroVisual visual={content.visual} summary={content.summary} />
            )}

            {content.type === 'access-control' && (
                <>
            <div className="flex items-center justify-center space-x-4">
                <div className="flex flex-col items-center space-y-2 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                    <div className="p-4 bg-white rounded-lg">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12"><title>Auth0</title><path fill="#EB5424" d="M21.98 7.448L19.62 0H4.347L2.02 7.448c-1.352 4.312.03 9.206 3.815 12.015L12.007 24l6.157-4.537c3.785-2.809 5.167-7.703 3.815-12.015zm-9.973 5.134c-2.212 0-4.003-1.79-4.003-4.003s1.79-4.003 4.003-4.003 4.003 1.79 4.003 4.003-1.791 4.003-4.003 4.003z"/></svg>
                    </div>
                        <h3 className="text-2xl font-bold text-orange-400">{content.auth0.title}</h3>
                        <p className="text-slate-400">{content.auth0.text}</p>
                </div>
                <div className="text-5xl text-slate-500 font-black">+</div>
                <div className="flex flex-col items-center space-y-2 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
                    <Fingerprint size={64} className="text-teal-400" />
                            <h3 className="text-2xl font-bold text-teal-400">{content.blockchain.title}</h3>
                            <p className="text-slate-400">{content.blockchain.text}</p>
                </div>
            </div>
            <div className="bg-slate-800/50 p-8 rounded-2xl border-t-4 border-purple-500 max-w-5xl mx-auto">
                        <h3 className="text-3xl font-bold text-purple-400 mb-6">{content.strategic.title}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            {content.strategic.points.map((point, i) => (
                                <div key={i} className="flex items-start space-x-4">
                                    {React.createElement(point.icon, { size: 32, className: "text-purple-400 mt-1" })}
                        <div>
                                        <h4 className="font-bold text-xl text-slate-200">{point.title}</h4>
                                        <p className="text-slate-400">{point.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {content.type === 'market-opportunity' && (
                <MarketOpportunityVisual content={content} />
            )}
            
            {content.type === 'security-doctrine' && (
                <>
                    <SecurityDoctrineVisual visual={content.visual} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {content.doctrinePoints.map((point, i) => (
                            <div key={i} className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 text-left">
                                <h3 className="text-2xl font-bold text-sky-400 mb-2">{point.title}</h3>
                                <p className="text-lg text-slate-300">{point.text}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {content.type === 'auth0-gatekeeper' && (
                <>
                    <Auth0Visual />
                    <p className="text-xl text-slate-300 max-w-4xl mx-auto border-l-4 border-orange-500 pl-6 text-left" dangerouslySetInnerHTML={{ __html: content.footerText }}></p>
                </>
            )}

            {content.type === 'secure-foundation' && (
                <>
                    <ProcessSteps steps={content.steps} />
                    <p className="text-xl text-slate-300 max-w-4xl mx-auto border-l-4 border-purple-500 pl-6 text-left" dangerouslySetInnerHTML={{ __html: content.footerText }}></p>
                </>
            )}
            
            {content.type === 'onboarding-pipeline' && (
                <>
                    <ProcessSteps steps={content.steps} />
                    <div className="bg-slate-800/50 p-6 rounded-xl border-l-4 border-green-500 max-w-4xl mx-auto text-left">
                        <h4 className="text-xl font-bold text-green-400 mb-3" dangerouslySetInnerHTML={{ __html: content.footer.title }}></h4>
                        <p className="text-slate-300" dangerouslySetInnerHTML={{ __html: content.footer.text }}></p>
                    </div>
                </>
            )}
            
            {content.type === 'agent-security' && (
                <>
                    <TwoColumnGrid content={content} />
                    <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 p-6 rounded-xl border border-orange-500/50 max-w-4xl mx-auto">
                        <h4 className="text-xl font-bold text-orange-400 mb-3 text-center" dangerouslySetInnerHTML={{ __html: content.footer.title }}></h4>
                        <p className="text-slate-300 text-center" dangerouslySetInnerHTML={{ __html: content.footer.text }}></p>
                    </div>
                </>
            )}

            {content.type === 'threat-detection' && (
                <>
                    <div className="flex justify-center mb-8">
                        <div className="relative bg-slate-800/70 p-8 rounded-full border-4 border-red-500/50">
                            {React.createElement(content.hub.icon, { size: 64, className: content.hub.iconColor })}
                            <div className="absolute -inset-4 border-2 border-red-400/30 rounded-full animate-ping"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {content.categories.map((cat, i) => (
                            <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-red-500/30">
                                <div className="flex items-center space-x-3 mb-4">
                                    {React.createElement(cat.icon, { className: cat.iconColor, size: 32 })}
                                    <h3 className="text-xl font-bold text-red-400">{cat.title}</h3>
                                </div>
                                <ul className="text-slate-200 space-y-2 text-sm text-left">
                                    {cat.points.map((point, j) => (
                                        <li key={j}>• {point}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-8 rounded-2xl border border-red-500/50">
                        <h3 className="text-2xl font-bold text-red-400 mb-6 text-center">{content.response.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {content.response.sections.map((sec, i) => (
                                <div key={i} className="space-y-3">
                                    <h4 className="font-semibold text-slate-200">{sec.title}</h4>
                                    <div className="space-y-2 text-sm">
                                        {sec.points.map((point, j) => (
                                            <div key={j} className="flex items-center space-x-2">
                                                <div className={`w-2 h-2 ${sec.bulletColor} rounded-full`}></div>
                                                <span className="text-slate-200">{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
            
            {content.type === 'multi-tenant-architecture' && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {content.tenants.map((tenant, i) => (
                            <div key={i} className={`${tenant.bgClass} p-6 rounded-2xl border ${tenant.borderColor}`}>
                                <div className="flex items-center space-x-3 mb-4">
                                    {React.createElement(tenant.icon, { className: tenant.iconColor, size: 32 })}
                                    <h3 className={`text-xl font-bold ${tenant.titleColor}`}>{tenant.title}</h3>
                                </div>
                                <div className="space-y-3 text-sm">
                                    {tenant.items.map((item, j) => (
                                        <div key={j} className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                                            <div className="flex items-center space-x-2">
                                                {React.createElement(item.icon, { className: item.iconColor, size: 16 })}
                                                <span className="text-slate-200">{item.text}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                        <h3 className="text-2xl font-bold text-indigo-400 mb-6" dangerouslySetInnerHTML={{ __html: content.footer.title }}></h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            {content.footer.items.map((item, i) => (
                                <div key={i} className="flex items-start space-x-3">
                                    {React.createElement(item.icon, { className: `${item.iconColor} mt-1`, size: 24 })}
                        <div>
                                        <h4 className="font-semibold text-slate-200">{item.title}</h4>
                                        <p className="text-slate-400 text-sm">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {content.type === 'compliance-audit' && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-slate-800/50 p-8 rounded-2xl border border-emerald-500/30">
                            <h3 className="text-2xl font-bold text-emerald-400 mb-6" dangerouslySetInnerHTML={{ __html: content.standards.title }}></h3>
                            <div className="grid grid-cols-2 gap-4">
                                {content.standards.items.map((item, i) => (
                                    <div key={i} className="bg-slate-900/50 p-4 rounded-lg border border-emerald-500/20 text-center">
                                        {React.createElement(item.icon, { className: item.iconColor, size: 32 })}
                                        <h4 className="font-semibold text-slate-200 mt-2">{item.title}</h4>
                                        <p className="text-xs text-slate-400">{item.subtitle}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-slate-800/50 p-8 rounded-2xl border border-emerald-500/30">
                            <h3 className="text-2xl font-bold text-emerald-400 mb-6" dangerouslySetInnerHTML={{ __html: content.dashboard.title }}></h3>
                            <div className="space-y-4">
                                {content.dashboard.items.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                                        <span className="text-slate-300">{item.label}</span>
                                        <span className={`${item.color} font-mono`}>{item.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                                <div className="flex items-center space-x-2 mb-2">
                                    {React.createElement(content.dashboard.export.icon, { className: content.dashboard.export.iconColor, size: 20 })}
                                    <span className="font-semibold text-emerald-400" dangerouslySetInnerHTML={{ __html: content.dashboard.export.title }}></span>
                                </div>
                                <p className="text-slate-300 text-sm" dangerouslySetInnerHTML={{ __html: content.dashboard.export.text }}></p>
                 </div>
            </div>
        </div>
                    <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-8 rounded-2xl border border-emerald-500/50">
                        <h3 className="text-2xl font-bold text-emerald-400 mb-4 text-center" dangerouslySetInnerHTML={{ __html: content.advantage.title }}></h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                            {content.advantage.items.map((item, i) => (
                                <div key={i} className="text-center">
                                    {React.createElement(item.icon, { className: `${item.iconColor} mb-3`, size: 48 })}
                                    <h4 className="font-semibold text-slate-200 mb-2" dangerouslySetInnerHTML={{ __html: item.title }}></h4>
                                    <p className="text-slate-400 text-sm" dangerouslySetInnerHTML={{ __html: item.text }}></p>
                                </div>
                            ))}
                        </div>
            </div>
                </>
            )}

            {content.type === 'platform-architecture' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {content.layers.map((layer, i) => (
                            <div key={i} className={`bg-gradient-to-br from-${layer.color}-500/20 to-${layer.color}-600/20 p-6 rounded-2xl border border-${layer.color}-500/50`}>
                                <div className="flex items-center space-x-3 mb-4">
                                    {React.createElement(layer.icon, { className: `text-${layer.color}-400`, size: 32 })}
                                    <h3 className={`text-xl font-bold text-${layer.color}-400`}>{layer.title}</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-slate-200">
                                    {layer.features.map((feature, j) => (
                                        <li key={j} className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 bg-${layer.color}-400 rounded-full`}></div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-xl border-l-4 border-violet-500 max-w-4xl mx-auto text-left">
                        <h4 className="text-xl font-bold text-violet-400 mb-3">{content.integration.title}</h4>
                        <p className="text-slate-300">{content.integration.text}</p>
                    </div>
                </>
            )}

            {content.type === 'deployment-models' && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {content.models.map((model, i) => (
                            <div key={i} className={`bg-gradient-to-br from-${model.color}-500/20 to-${model.color}-600/20 p-6 rounded-2xl border border-${model.color}-500/50`}>
                                <div className="text-center mb-4">
                                    {React.createElement(model.icon, { className: `mx-auto text-${model.color}-400 mb-3`, size: 48 })}
                                    <h3 className={`text-xl font-bold text-${model.color}-400`}>{model.title}</h3>
                                </div>
                                <ul className="space-y-2 text-sm text-slate-200 mb-4">
                                    {model.features.map((feature, j) => (
                                        <li key={j} className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 bg-${model.color}-400 rounded-full`}></div>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="border-t border-slate-700 pt-4">
                                    <p className="text-slate-200 font-semibold">{model.pricing}</p>
                                    <p className="text-slate-300 text-sm">{model.ideal}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-slate-800/50 p-6 rounded-xl border-l-4 border-indigo-500 max-w-4xl mx-auto text-left">
                        <h4 className="text-xl font-bold text-indigo-400 mb-3">{content.footer.title}</h4>
                        <p className="text-slate-300">{content.footer.text}</p>
                    </div>
                </>
            )}

            {content.type === 'competitive-analysis' && (
                <>
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">{content.comparison.title}</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {content.comparison.competitors.map((comp, i) => (
                                <div key={i} className={`p-6 rounded-2xl border ${comp.name === 'Zeta Shield' ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/50' : 'bg-slate-800/50 border-slate-700'}`}>
                                    <div className="text-center mb-4">
                                        <h4 className={`text-lg font-bold ${comp.name === 'Zeta Shield' ? 'text-amber-400' : 'text-slate-300'}`}>{comp.name}</h4>
                                        <div className={`text-2xl font-bold ${comp.name === 'Zeta Shield' ? 'text-amber-400' : 'text-slate-400'}`}>{comp.score}</div>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <h5 className="font-semibold text-slate-200 mb-2">Features</h5>
                                            <ul className="space-y-1 text-sm">
                                                {comp.features.map((feature, j) => (
                                                    <li key={j} className="flex items-center space-x-2">
                                                        <CheckCircle className="text-green-400 w-3 h-3" />
                                                        <span className="text-slate-200">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {comp.limitations && comp.limitations.length > 0 && (
                                            <div>
                                                <h5 className="font-semibold text-slate-200 mb-2">Limitations</h5>
                                                <ul className="space-y-1 text-sm">
                                                    {comp.limitations.map((limitation, j) => (
                                                        <li key={j} className="flex items-center space-x-2">
                                                            <AlertTriangle className="text-red-400 w-3 h-3" />
                                                            <span className="text-slate-300">{limitation}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 p-8 rounded-2xl border border-amber-500/50">
                        <h3 className="text-2xl font-bold text-amber-400 mb-6 text-center">{content.advantages.title}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {content.advantages.items.map((item, i) => (
                                <div key={i} className="text-center">
                                    {React.createElement(item.icon, { className: "mx-auto text-amber-400 mb-3", size: 48 })}
                                    <h4 className="font-semibold text-slate-200 mb-2">{item.title}</h4>
                                    <p className="text-slate-300 text-sm">{item.text}</p>
                </div>
                            ))}
                </div>
            </div>
                </>
            )}
        </SlideLayout>
    );
};

//================================================================================
// 3. SLIDE DATA DEFINITION
//================================================================================

const slidesData = [
    {
        title: "The Fundamental Problem in Biotech Security",
        subtitle: "Traditional security protects infrastructure. We protect intellectual property.",
        titleGradient: "from-red-500 to-orange-400",
        content: {
            type: 'high-stakes',
            block: {
                icon: ShieldAlert,
                iconColor: "text-red-400",
                mainText: "Traditional IT security builds perimeters around servers and networks. But in biotech, the most valuable asset isn't the infrastructure—it's the **digital blueprint for a multi-billion dollar therapeutic**, contained in just a few kilobytes of sequence data.",
                subText: "How do you secure an asset that can be copied, shared, or stolen with a single click?"
            }
        }
    },
    {
        title: "Introducing Zeta Shield",
        subtitle: "The first security platform designed for biological intellectual property",
        titleGradient: "from-cyan-400 to-blue-400",
        content: {
            type: 'intro',
            visual: {
                icon: Shield,
                iconColor: "text-cyan-500"
            },
            summary: {
                title: "Comprehensive Security Architecture",
                items: [
                    { icon: UserCheck, title: "Identity Layer", subtitle: "Auth0 Integration", color: "cyan" },
                    { icon: Fingerprint, title: "Asset Control", subtitle: "Blockchain Permissions", color: "cyan" },
                    { icon: FileClock, title: "Audit Trail", subtitle: "Immutable Records", color: "cyan" },
                    { icon: Bot, title: "AI Security", subtitle: "Engine Protection", color: "cyan" }
                ]
            }
        }
    },
    {
        title: "The Three Critical Problems We Solve",
        subtitle: "Where traditional security fails biological assets",
        titleGradient: "from-violet-400 to-purple-400",
        content: {
            type: 'platform-architecture',
            layers: [
                {
                    title: "Data Integrity",
                    icon: Fingerprint,
                    color: "violet",
                    features: ["How can partners trust in silico results haven't been tampered with?", "Cryptographic signatures on every data point", "Immutable proof of computational integrity", "Verifiable chain of custody from lab to IP"]
                },
                {
                    title: "Granular Access Control",
                    icon: Lock,
                    color: "blue",
                    features: ["Grant access to specific therapeutic designs only", "No exposure of entire pipeline or platform", "Smart contract-controlled permissions", "Wallet-based asset mapping"]
                },
                {
                    title: "Proof of Invention",
                    icon: FileClock,
                    color: "emerald",
                    features: ["Unforgeable record of invention timestamps", "Blockchain-native IP documentation", "Tamper-proof research progression", "Legal-grade evidence for patent disputes"]
                }
            ],
            integration: {
                title: "The Asset-Centric Security Revolution",
                text: "We don't protect servers—we protect the cure itself. Every therapeutic blueprint, every sequence variant, every AI-generated design is secured at the asset level with cryptographic precision."
            }
        }
    },
    {
        title: "Secure Onboarding Pipeline",
        subtitle: "Zero-Trust Provisioning for Research Teams & Partners",
        titleGradient: "from-green-400 to-emerald-400",
        content: {
            type: 'onboarding-pipeline',
            steps: [
                {
                    icon: UserPlus,
                    title: "1. Identity Verification",
                    description: "Multi-factor authentication through Auth0, background verification, and role-based access assignment with cryptographic key generation.",
                    iconColor: "text-blue-400",
                    iconBgClass: "bg-blue-500/20",
                    iconBorderClass: "border-blue-500",
                    titleColor: "text-blue-400"
                },
                {
                    icon: Settings,
                    title: "2. Permission Mapping",
                    description: "Granular permissions are mapped to blockchain wallets, creating immutable access policies tied to specific research projects and data types.",
                    iconColor: "text-purple-400",
                    iconBgClass: "bg-purple-500/20",
                    iconBorderClass: "border-purple-500",
                    titleColor: "text-purple-400"
                },
                {
                    icon: ShieldCheck,
                    title: "3. Environment Provisioning",
                    description: "Secure sandbox environments with isolated compute, storage, and AI agent access—all monitored and logged on-chain.",
                    iconColor: "text-green-400",
                    iconBgClass: "bg-green-500/20",
                    iconBorderClass: "border-green-500",
                    titleColor: "text-green-400"
                }
            ],
            footer: {
                title: "Automated Compliance",
                text: "The system generates audit trails from day one, ensuring your organization stays compliant as it scales."
            }
        }
    },
    {
        title: "AI Engine Security & Verification",
        subtitle: "Protecting autonomous AI systems that generate billion-dollar IP",
        titleGradient: "from-orange-400 to-red-400",
        content: {
            type: 'agent-security',
            column1: {
                icon: Bot,
                title: "AI Engine Protection",
                iconColor: "text-orange-400",
                titleColor: "text-orange-400",
                borderColor: "border-orange-500/30",
                items: [
                    { icon: Lock, title: "Isolated Execution", text: "Each AI engine operates in secure environments with blockchain-enforced permissions for specific therapeutic assets and research projects.", iconColor: "text-orange-400" },
                    { icon: Eye, title: "Real-time Tracking", text: "Every Oracle prediction, Forge design, and Boltz validation is cryptographically signed and recorded on-chain with timestamps.", iconColor: "text-orange-400" },
                    { icon: AlertTriangle, title: "Access Control", text: "Automatic isolation protocols activate if any AI engine attempts unauthorized access to restricted IP or partner data.", iconColor: "text-orange-400" }
                ]
            },
            column2: {
                icon: FileCheck,
                title: "Verifiable AI Operations",
                iconColor: "text-orange-400",
                titleColor: "text-orange-400",
                borderColor: "border-orange-500/30",
                items: [
                    { label: "Zeta Oracle", status: "✓ Verified", statusColor: "text-green-400", description: "RUNX1 variant classified as Pathogenic (Zeta Score: 0.97)", metadata: "Hash: 0x4f7a...b3d2 | Block: 12,847,293" },
                    { label: "Zeta Forge", status: "✓ Verified", statusColor: "text-green-400", description: "Generated optimized CRISPR design for validated target", metadata: "Hash: 0x8a2f...c7e1 | Block: 12,847,305" },
                    { label: "Zeta Boltz", status: "✓ Verified", statusColor: "text-green-400", description: "Structural validation: 98.7% binding affinity confirmed", metadata: "Hash: 0x1c9e...f4a8 | Block: 12,847,312" }
                ]
            },
            footer: {
                title: "Unprecedented AI Accountability",
                text: "When AI engines generate therapeutic designs worth billions, you need verifiable proof of every decision. Zeta Shield provides cryptographic evidence of every Oracle analysis, Forge design, and Boltz validation—creating an unforgeable record of your IP creation process."
            }
        }
    },
    {
        title: "Our Therapeutic Research Services",
        subtitle: "High-value AI-driven research programs we secure for partners",
        titleGradient: "from-emerald-400 to-green-400",
        content: {
            type: 'threat-detection',
            hub: { icon: Target, iconColor: "text-emerald-400" },
            categories: [
                { icon: Search, title: "VUS Classification", iconColor: "text-emerald-400", points: ["Process entire VUS backlogs", "Deliver definitive Pathogenic/Benign classifications", "Close actionability gaps for clinical teams", "Provide cryptographically signed results"] },
                { icon: FlaskConical, title: "In Silico Drug Discovery", iconColor: "text-emerald-400", points: ["Complete pre-clinical research digitally", "Validate therapeutic targets", "Design novel therapeutic candidates", "Generate comprehensive validation packages"] },
                { icon: Activity, title: "Precision Oncology", iconColor: "text-emerald-400", points: ["Model complex metastatic processes", "Identify intervention opportunities", "Design targeted therapeutic strategies", "Develop personalized treatment approaches"] }
            ],
            response: {
                title: "Research Security Framework",
                sections: [
                    { title: "Access Control", bulletColor: "bg-emerald-400", points: ["Auth0-verified researcher authentication", "Project-specific permission validation", "Granular data access boundaries"] },
                    { title: "IP Protection", bulletColor: "bg-green-400", points: ["Real-time tracking of research outputs", "Immutable audit trail of all AI operations", "Secure IP-NFT generation upon completion"] }
                ]
            }
        }
    },
    {
        title: "Enterprise Deployment Models",
        subtitle: "Flexible Security for Every Organization",
        titleGradient: "from-indigo-400 to-purple-400",
        content: {
            type: 'deployment-models',
            models: [
                {
                    title: "Zeta Shield Cloud",
                    icon: Globe,
                    color: "indigo",
                    features: ["Multi-tenant SaaS", "99.99% uptime SLA", "Global edge deployment", "Automatic scaling"],
                    pricing: "Starting at $10K/month",
                    ideal: "Startups & Mid-size Biotechs"
                },
                {
                    title: "Zeta Shield Enterprise",
                    icon: Building,
                    color: "purple",
                    features: ["Private cloud deployment", "Custom compliance configs", "Dedicated support", "On-premises option"],
                    pricing: "Custom enterprise pricing",
                    ideal: "Large Pharma & Fortune 500"
                },
                {
                    title: "Zeta Shield Embedded",
                    icon: Cpu,
                    color: "cyan",
                    features: ["API-first integration", "White-label options", "Custom workflows", "Revenue sharing"],
                    pricing: "Per-transaction pricing",
                    ideal: "Platform Providers & VCs"
                }
            ],
            footer: {
                title: "From Proof-of-Concept to Production in 30 Days",
                text: "Our deployment team handles the technical complexity while your organization maintains focus on core R&D activities. Every deployment includes comprehensive training and 24/7 support."
            }
        }
    },
    {
        title: "Two-Layer Security Architecture",
        subtitle: "Identity verification + asset-level access control",
        titleGradient: "from-sky-400 to-cyan-400",
        content: {
            type: 'security-doctrine',
            visual: {
                icon: ShieldCheck,
                iconColor: "text-sky-500",
                rings: [
                    {
                        size: "w-64 h-64",
                        borderClass: "border-2 border-slate-700 rounded-full",
                        animation: "animate-spin",
                        animationDuration: "20s",
                        animationDirection: "normal",
                        circlePosition: "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
                        circleBg: "bg-slate-800",
                        circleBorder: "border border-slate-600",
                        circleIcon: UserCheck,
                        circleIconColor: "text-slate-300"
                    },
                    {
                        size: "w-96 h-96",
                        borderClass: "border-2 border-slate-800 rounded-full",
                        animation: "animate-spin",
                        animationDuration: "30s",
                        animationDirection: "normal",
                        circlePosition: "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
                        circleBg: "bg-slate-800",
                        circleBorder: "border border-slate-600",
                        circleIcon: Fingerprint,
                        circleIconColor: "text-slate-300"
                    }
                ]
            },
            doctrinePoints: [
                {
                    title: "Layer 1: Identity & Authentication (Auth0 Integration)",
                    text: "Auth0 serves as the authoritative source for user identity and role-based permissions. Every researcher, partner, and administrator must authenticate through Auth0's enterprise platform with multi-factor authentication before accessing any therapeutic data or AI engines."
                },
                {
                    title: "Layer 2: Asset-Level Access Control (Blockchain)",
                    text: "Access to specific therapeutic assets is controlled by smart contracts, not traditional databases. Every access request generates an on-chain transaction, creating an **immutable audit trail** that provides verifiable chain of custody for all intellectual property."
                }
            ]
        }
    },
    {
        title: "Multi-Tenant Security Architecture",
        subtitle: "Enterprise-Grade Isolation for Every Organization",
        titleGradient: "from-purple-400 to-indigo-400",
        content: {
            type: 'multi-tenant-architecture',
            tenants: [
                {
                    bgClass: "bg-gradient-to-br from-blue-500/20 to-blue-600/20",
                    borderColor: "border-blue-500/50",
                    icon: Building,
                    iconColor: "text-blue-400",
                    title: "Biotech Corp A",
                    titleColor: "text-blue-400",
                    items: [
                        { icon: Database, iconColor: "text-blue-400", text: "Isolated Data Layer" },
                        { icon: Bot, iconColor: "text-blue-400", text: "Dedicated AI Agents" },
                        { icon: KeyRound, iconColor: "text-blue-400", text: "Unique Encryption Keys" },
                    ]
                },
                {
                    bgClass: "bg-gradient-to-br from-cyan-500/20 to-cyan-600/20",
                    borderColor: "border-cyan-500/50",
                    icon: Shield,
                    iconColor: "text-cyan-400",
                    title: "Zeta Shield Core",
                    titleColor: "text-cyan-400",
                    items: [
                        { icon: UserCheck, iconColor: "text-cyan-400", text: "Unified Identity (Auth0)" },
                        { icon: Fingerprint, iconColor: "text-cyan-400", text: "Blockchain Verification" },
                        { icon: Monitor, iconColor: "text-cyan-400", text: "Global Threat Detection" },
                    ]
                },
                {
                    bgClass: "bg-gradient-to-br from-purple-500/20 to-purple-600/20",
                    borderColor: "border-purple-500/50",
                    icon: Building,
                    iconColor: "text-purple-400",
                    title: "Pharma Giant B",
                    titleColor: "text-purple-400",
                    items: [
                        { icon: Database, iconColor: "text-purple-400", text: "Isolated Data Layer" },
                        { icon: Bot, iconColor: "text-purple-400", text: "Dedicated AI Agents" },
                        { icon: KeyRound, iconColor: "text-purple-400", text: "Unique Encryption Keys" },
                    ]
                }
            ],
            footer: {
                title: "Enterprise Isolation Guarantees",
                items: [
                    { icon: Layers, iconColor: "text-indigo-400", title: "Data Sovereignty", text: "Complete data isolation with tenant-specific encryption keys and storage partitions." },
                    { icon: Network, iconColor: "text-indigo-400", title: "Network Segmentation", text: "Isolated network namespaces prevent cross-tenant data leakage." },
                    { icon: FileCheck, iconColor: "text-indigo-400", title: "Compliance Per Tenant", text: "Customizable compliance controls for different regulatory requirements." }
                ]
            }
        }
    },
    {
        title: "Enterprise Identity Management",
        subtitle: "Auth0 integration for seamless, secure access control",
        titleGradient: "from-orange-400 to-red-400",
        content: {
            type: 'auth0-gatekeeper',
            footerText: "Unlike traditional systems that apply generic IT security to biotech, Zeta Shield recognizes that **intellectual property requires asset-specific protection**. Auth0 provides enterprise-grade identity management, while our blockchain layer ensures that authenticated users can only access the specific therapeutic data they're authorized to work with."
        }
    },
    {
        title: "Compliance & Audit Trail",
        subtitle: "Immutable Records for Regulatory Excellence",
        titleGradient: "from-emerald-400 to-teal-400",
        content: {
            type: 'compliance-audit',
            standards: {
                title: "Supported Standards",
                items: [
                    { icon: FileCheck, title: "SOC 2 Type II", subtitle: "Continuous monitoring", iconColor: "text-emerald-400" },
                    { icon: Shield, title: "HIPAA", subtitle: "Healthcare data protection", iconColor: "text-emerald-400" },
                    { icon: Globe, title: "GDPR", subtitle: "EU data privacy", iconColor: "text-emerald-400" },
                    { icon: Lock, title: "ISO 27001", subtitle: "Information security", iconColor: "text-emerald-400" }
                ]
            },
            dashboard: {
                title: "Real-Time Audit Dashboard",
                items: [
                    { label: "Data Access Events", value: "1,247 logged", color: "text-emerald-400" },
                    { label: "User Authentication", value: "98.7% success", color: "text-emerald-400" },
                    { label: "Blockchain Verifications", value: "100% verified", color: "text-emerald-400" },
                    { label: "Compliance Score", value: "99.2%", color: "text-emerald-400" }
                ],
                export: {
                    icon: BarChart3,
                    iconColor: "text-emerald-400",
                    title: "Audit Export Ready",
                    text: "Generate compliance reports in seconds for any auditor or regulatory body."
                }
            },
            advantage: {
                title: "The Compliance Advantage",
                items: [
                    { icon: FileClock, iconColor: "text-emerald-400", title: "Immutable History", text: "Every action is permanently recorded on-chain, creating an unforgeable audit trail." },
                    { icon: Workflow, iconColor: "text-emerald-400", title: "Automated Reporting", text: "Compliance reports generate automatically, reducing audit preparation from weeks to hours." },
                    { icon: CheckCircle, iconColor: "text-emerald-400", title: "Continuous Monitoring", text: "Real-time compliance checking ensures you never fall out of regulatory requirements." }
                ]
            }
        }
    },
    {
        title: "Secure AI Research Pipeline",
        subtitle: "End-to-end protection for therapeutic development",
        titleGradient: "from-purple-400 to-indigo-400",
        content: {
            type: 'secure-foundation',
            steps: [
                {
                    icon: Search,
                    title: "1. Predictive Analysis",
                    description: "**Zeta Oracle** analyzes genetic variants and delivers quantitative risk scores. Every prediction is cryptographically signed and recorded on-chain with immutable timestamps for regulatory compliance.",
                    iconColor: "text-cyan-400",
                    iconBgClass: "bg-cyan-500/20",
                    iconBorderClass: "border-cyan-500",
                    titleColor: "text-cyan-400"
                },
                {
                    icon: Cpu,
                    title: "2. Therapeutic Design",
                    description: "**Zeta Forge** generates novel therapeutic candidates from validated targets. Smart contracts ensure only Oracle-verified targets can initiate design processes, with each output cryptographically protected.",
                    iconColor: "text-purple-400",
                    iconBgClass: "bg-purple-500/20",
                    iconBorderClass: "border-purple-500",
                    titleColor: "text-purple-400"
                },
                {
                    icon: Target,
                    title: "3. Structural Validation",
                    description: "**Zeta Boltz** performs 3D molecular simulations to validate therapeutic efficacy. AlphaFold 3-powered analyses create tamper-proof binding affinity records stored on-chain.",
                    iconColor: "text-orange-400",
                    iconBgClass: "bg-orange-500/20",
                    iconBorderClass: "border-orange-500",
                    titleColor: "text-orange-400"
                },
                {
                    icon: Package,
                    title: "4. IP Asset Creation",
                    description: "Completed research is packaged into verifiable IP-NFTs with complete provenance. Each asset contains the immutable record of Oracle predictions, Forge designs, and Boltz validations.",
                    iconColor: "text-green-400",
                    iconBgClass: "bg-green-500/20",
                    iconBorderClass: "border-green-500",
                    titleColor: "text-green-400"
                }
            ],
            footerText: "Zeta Shield secures every research workflow—from **variant classification** to **drug discovery** to **precision medicine**. Each project generates significant IP value, protected by cryptographic proof of every AI engine's contributions."
        }
    },
    {
        title: "Why Traditional Security Falls Short",
        subtitle: "The fundamental difference between protecting infrastructure vs. intellectual property",
        titleGradient: "from-amber-400 to-orange-400",
        content: {
            type: 'competitive-analysis',
            comparison: {
                title: "Traditional Security vs. IP-Centric Security",
                competitors: [
                    {
                        name: "Traditional IT Security",
                        features: ["Network perimeter defense", "Server-based protection", "Role-based system access"],
                        limitations: ["IP can be copied instantly", "No proof of data integrity", "Generic permissions for all assets"],
                        score: "Inadequate"
                    },
                    {
                        name: "Cloud Security Platforms",
                        features: ["Infrastructure monitoring", "General threat detection", "Compliance dashboards"],
                        limitations: ["One-size-fits-all approach", "No granular asset tracking", "No verifiable audit trails"],
                        score: "Insufficient"
                    },
                    {
                        name: "Zeta Shield",
                        features: ["Asset-specific protection", "Cryptographic access control", "Immutable audit trails", "Smart contract permissions", "Therapeutic IP security"],
                        limitations: [],
                        score: "Purpose-Built"
                    }
                ]
            },
            advantages: {
                title: "The IP-Centric Security Advantage",
                items: [
                    { icon: Dna, title: "Asset-Level Protection", text: "Secure therapeutic blueprints and research data at the individual asset level, not just system-wide" },
                    { icon: Fingerprint, title: "Granular Access Control", text: "Smart contracts enable precise permissions for specific therapeutic designs and research projects" },
                    { icon: FileClock, title: "Verifiable Provenance", text: "Immutable, blockchain-based record of every interaction with your valuable intellectual property" }
                ]
            }
        }
    },
    {
        title: "Verifiable Access Control: The Product",
        subtitle: "The New Standard for R&D Security",
        titleGradient: "from-purple-400 to-pink-400",
        content: {
            type: 'access-control',
            auth0: { title: "Identity Verification", text: "Auth0 verifies *who* you are." },
            blockchain: { title: "Permission Verification", text: "The blockchain verifies *what you're allowed to do*." },
            strategic: {
                title: "The Strategic Opportunity",
                points: [
                    { icon: Globe, title: "Bridge Web2 & Web3", text: "Combines Auth0's enterprise-grade identity with the immutable, verifiable nature of the blockchain." },
                    { icon: Zap, title: "Solve a High-Value Problem", text: "Purpose-built for securing multi-billion dollar digital assets in biotech, AI development, and beyond." },
                    { icon: Building, title: "Expand the Ecosystem", text: "Creates a new product category that extends Auth0's reach into the high-growth world of verifiable, decentralized data." }
                ]
            }
        }
    },

];

//================================================================================
// 4. MAIN APP COMPONENT
//================================================================================

const App = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slidesData.length) % slidesData.length);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowRight') nextSlide();
            else if (event.key === 'ArrowLeft') prevSlide();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const currentSlideData = slidesData[currentSlide];

    return (
        <div className="relative w-full h-screen bg-slate-900 overflow-hidden">
            <AnimatePresence mode="wait">
                <Slide key={currentSlide} slideData={currentSlideData} />
            </AnimatePresence>
            <Brand />
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-2 bg-black/30 backdrop-blur-sm p-2 rounded-full border border-slate-700">
                <button onClick={prevSlide} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&larr;</button>
                <span className="text-slate-300 font-semibold text-sm">Slide {currentSlide + 1} / {slidesData.length}</span>
                <button onClick={nextSlide} className="px-4 py-2 text-slate-300 rounded-full hover:bg-slate-700/70 transition-colors">&rarr;</button>
            </div>
        </div>
    );
};

export default App;