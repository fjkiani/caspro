'use client';

import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Building, Calculator, Zap } from 'lucide-react';

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
        <p className="text-lg text-gray-400 max-w-3xl mx-auto">{subtitle}</p>
    </div>
);

const RevenueCalculator = ({ 
    title, 
    description, 
    target, 
    pricePerUnit, 
    unitLabel, 
    icon: Icon, 
    color 
}: { 
    title: string, 
    description: string, 
    target: string,
    pricePerUnit: number,
    unitLabel: string,
    icon: any,
    color: string
}) => {
    const [units, setUnits] = useState(100);
    const revenue = units * pricePerUnit;
    const annualRevenue = revenue * 12;

    return (
        <div className="p-6 bg-gray-800 border border-gray-700 rounded-lg h-full hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 group">
            <div className="flex items-center space-x-3 mb-4">
                <Icon className={`w-8 h-8 ${color} group-hover:scale-110 transition-transform duration-300`} />
                <h4 className="font-bold text-white text-lg">{title}</h4>
            </div>
            
            <p className="text-gray-400 mb-4">{description}</p>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                        {unitLabel} per month:
                    </label>
                    <input
                        type="range"
                        min="10"
                        max="1000"
                        value={units}
                        onChange={(e) => setUnits(parseInt(e.target.value))}
                        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>10</span>
                        <span className="font-bold text-white">{units}</span>
                        <span>1000</span>
                    </div>
                </div>
                
                <div className="bg-gray-900/50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-400">Monthly Revenue:</span>
                        <span className={`font-bold text-lg ${color}`}>
                            ${revenue.toLocaleString()}
                        </span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Annual Revenue:</span>
                        <span className={`font-bold text-xl ${color}`}>
                            ${annualRevenue.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
            
            <p className="text-sm font-semibold text-gray-300 mt-4">
                Target: <span className="font-normal text-gray-400">{target}</span>
            </p>
        </div>
    );
};

const MarketSizeCard = ({ 
    title, 
    size, 
    description, 
    icon: Icon, 
    color 
}: { 
    title: string, 
    size: string, 
    description: string, 
    icon: any, 
    color: string 
}) => (
    <div className="p-6 bg-gray-800/50 border border-gray-700 rounded-lg hover:bg-gray-800/80 transition-all duration-300 hover:scale-105 group">
        <div className="flex items-center space-x-3 mb-3">
            <Icon className={`w-8 h-8 ${color} group-hover:scale-110 transition-transform duration-300`} />
            <div>
                <h4 className="font-bold text-white">{title}</h4>
                <div className={`text-2xl font-bold ${color}`}>{size}</div>
            </div>
        </div>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);

export const BusinessModelSection = () => {
    const [selectedModel, setSelectedModel] = useState(0);
    
    const businessModels = [
        {
            name: "Clinical Decision Support",
            description: "Per-report fee for Metastatic Potential Reports",
            pricePerUnit: 500,
            unitLabel: "Reports",
            target: "Oncologists, Cancer Centers, Hospital Networks",
            icon: Building,
            color: "text-blue-400"
        },
        {
            name: "Pharmaceutical Partnerships",
            description: "API access and custom analysis for drug development",
            pricePerUnit: 2500,
            unitLabel: "API Calls (1000s)",
            target: "Biotech & Pharmaceutical R&D Departments",
            icon: Zap,
            color: "text-purple-400"
        }
    ];

    return (
        <section className="mb-20">
            <SectionHeader
                title="4.0 Business Model: Monetizing Metastatic Prevention"
                subtitle="Our business model is designed to integrate seamlessly into the clinical oncology workflow, capturing value by providing an indispensable, first-of-its-kind decision support tool."
            />
            
            {/* Market Size Overview */}
            <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                <MarketSizeCard
                    title="Oncology Market"
                    size="$196B"
                    description="Global oncology market size in 2023, growing at 7.5% CAGR"
                    icon={TrendingUp}
                    color="text-green-400"
                />
                <MarketSizeCard
                    title="Precision Medicine"
                    size="$86B"
                    description="Precision medicine market, our direct addressable market"
                    icon={Users}
                    color="text-blue-400"
                />
                <MarketSizeCard
                    title="Cancer Diagnostics"
                    size="$25B"
                    description="Cancer diagnostics market, our immediate opportunity"
                    icon={Calculator}
                    color="text-purple-400"
                />
            </div>

            {/* Interactive Revenue Models */}
            <div className="mb-8">
                <h4 className="text-xl font-bold text-white mb-4 text-center">Interactive Revenue Calculator</h4>
                <div className="flex justify-center space-x-4 mb-6">
                    {businessModels.map((model, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedModel(index)}
                            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                                selectedModel === index
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            {model.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {businessModels.map((model, index) => (
                    <RevenueCalculator
                        key={index}
                        title={model.name}
                        description={model.description}
                        target={model.target}
                        pricePerUnit={model.pricePerUnit}
                        unitLabel={model.unitLabel}
                        icon={model.icon}
                        color={model.color}
                    />
                ))}
            </div>

            {/* Combined Revenue Projection */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
                <h4 className="text-xl font-bold text-white mb-4 text-center flex items-center justify-center space-x-2">
                    <DollarSign className="w-6 h-6 text-green-400" />
                    <span>Revenue Projection Summary</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-400">Year 1 Target</p>
                        <p className="text-2xl font-bold text-green-400">$2.4M</p>
                        <p className="text-xs text-gray-500">Conservative estimate</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-400">Year 3 Target</p>
                        <p className="text-2xl font-bold text-blue-400">$25M</p>
                        <p className="text-xs text-gray-500">Market penetration</p>
                    </div>
                    <div className="p-4 bg-gray-800/50 rounded-lg">
                        <p className="text-sm text-gray-400">Year 5 Target</p>
                        <p className="text-2xl font-bold text-purple-400">$100M</p>
                        <p className="text-xs text-gray-500">Market leadership</p>
                    </div>
                </div>
            </div>
        </section>
    );
}; 