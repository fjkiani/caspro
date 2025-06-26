'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Brain, Zap, AlertTriangle } from 'lucide-react';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string[] }) => (
    <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4 animate-fade-in">{title}</h3>
        {subtitle.map((text, index) => (
            <p key={index} className="text-lg text-gray-400 max-w-4xl mx-auto mb-4 animate-fade-in-delay">
                {text}
            </p>
        ))}
    </div>
);

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById(`counter-${end}`);
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, [end]);

    useEffect(() => {
        if (!isVisible) return;

        let startTime: number;
        let animationFrame: number;

        const updateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            setCount(Math.floor(progress * end));
            
            if (progress < 1) {
                animationFrame = requestAnimationFrame(updateCount);
            }
        };

        animationFrame = requestAnimationFrame(updateCount);
        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration]);

    return (
        <span id={`counter-${end}`} className="font-bold text-3xl text-red-400">
            {count}{suffix}
        </span>
    );
};

const StatCard = ({ icon: Icon, stat, description, color }: { 
    icon: any, 
    stat: string | React.ReactNode, 
    description: string, 
    color: string 
}) => (
    <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 group">
        <div className="flex items-center space-x-3 mb-3">
            <Icon className={`w-8 h-8 ${color} group-hover:scale-110 transition-transform duration-300`} />
            <div className={`text-2xl font-bold ${color}`}>{stat}</div>
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);

const reportComponents = [
    {
        title: "Metastatic Risk Score",
        description: "AI-powered risk assessment across all 8 metastasis stages",
        icon: TrendingUp,
        color: "text-red-400",
        bgGradient: "bg-gradient-to-br from-red-500/20 to-red-600/10"
    },
    {
        title: "Stage-by-Stage Breakdown",
        description: "Detailed analysis of vulnerability at each metastatic step",
        icon: Target,
        color: "text-orange-400",
        bgGradient: "bg-gradient-to-br from-orange-500/20 to-orange-600/10"
    },
    {
        title: "Key Genetic Drivers",
        description: "Prioritized mutations driving metastatic potential",
        icon: Brain,
        color: "text-blue-400",
        bgGradient: "bg-gradient-to-br from-blue-500/20 to-blue-600/10"
    },
    {
        title: "Prioritized Strategies",
        description: "Ranked therapeutic interventions based on efficacy prediction",
        icon: Zap,
        color: "text-green-400",
        bgGradient: "bg-gradient-to-br from-green-500/20 to-green-600/10"
    },
    {
        title: "Pre-Designed Interventions",
        description: "Ready-to-implement CRISPR guide RNAs and therapeutic protocols",
        icon: AlertTriangle,
        color: "text-purple-400",
        bgGradient: "bg-gradient-to-br from-purple-500/20 to-purple-600/10"
    },
];

export const OpportunitySection = () => {
    const [hoveredComponent, setHoveredComponent] = useState<number | null>(null);
    
    return (
        <section className="mb-20">
            <SectionHeader
                title="1.0 The True Enemy: Preventing Metastasis"
                subtitle={[
                    "The Problem: Over 90% of cancer-related deaths are not caused by the primary tumor, but by metastasis—the process by which cancer spreads to other parts of the body. The current medical paradigm is reactive, treating metastasis only after it's clinically detectable. We are missing the critical window to prevent it.",
                    "Our Solution: A strategic transformation from a simple research tool to the world's first AI-powered metastasis prevention system. We don't just provide data; we provide a predictive, proactive, and personalized strategy to stop metastasis before it starts."
                ]}
            />

            {/* Shocking Statistics */}
            <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={AlertTriangle}
                    stat={<AnimatedCounter end={90} suffix="%" />}
                    description="of cancer deaths caused by metastasis, not primary tumors"
                    color="text-red-400"
                />
                <StatCard
                    icon={TrendingUp}
                    stat={<AnimatedCounter end={650000} />}
                    description="cancer deaths annually in US - most preventable"
                    color="text-orange-400"
                />
                <StatCard
                    icon={Brain}
                    stat="$0"
                    description="current solutions for metastasis prevention"
                    color="text-blue-400"
                />
            </div>

            <div className="p-8 bg-gray-800 border-2 border-blue-500/50 rounded-lg text-center shadow-2xl shadow-blue-500/10 relative overflow-hidden">
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 animate-pulse"></div>
                
                <div className="relative z-10">
                    <h4 className="text-2xl font-bold text-white mb-4 flex items-center justify-center space-x-3">
                        <Zap className="w-8 h-8 text-blue-400" />
                        <span>Introducing: The Metastatic Potential Report</span>
                        <Zap className="w-8 h-8 text-blue-400" />
                    </h4>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
                        Instead of simple mutation lists, our platform generates a comprehensive, actionable report that provides oncologists with a roadmap to prevention. This is our core, revolutionary output.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {reportComponents.map((component, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg ${component.bgGradient} ${
                                    hoveredComponent === index ? 'ring-2 ring-blue-400' : ''
                                }`}
                                onMouseEnter={() => setHoveredComponent(index)}
                                onMouseLeave={() => setHoveredComponent(null)}
                            >
                                <div className="flex flex-col items-center text-center space-y-2">
                                    <component.icon className={`w-8 h-8 ${component.color} transition-transform duration-300 ${
                                        hoveredComponent === index ? 'scale-125' : ''
                                    }`} />
                                    <p className={`font-bold ${component.color} text-sm`}>
                                        {component.title}
                                    </p>
                                    {hoveredComponent === index && (
                                        <p className="text-xs text-gray-400 animate-fade-in">
                                            {component.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-8 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <p className="text-blue-300 text-sm font-medium">
                            💡 <strong>Interactive Demo:</strong> Hover over each component above to see how our Metastatic Potential Report transforms cancer care from reactive to preventive.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}; 