'use client';

import React, { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  ReferenceArea
} from 'recharts';
import { Filter, Eye, TrendingUp, Zap } from 'lucide-react';

const matrixData = [
  // x: AI Capability, y: Generative Power
  { name: 'CrisPRO.ai', x: 9, y: 9, isCrispro: true, category: 'leader', threat: 'self', marketCap: 'Startup', employees: '10+' },
  { name: 'Foundation Medicine', x: 2, y: 1, category: 'niche', threat: 'low', marketCap: '$8.2B', employees: '1,200+' },
  { name: 'Caris Life Sciences', x: 4, y: 1, category: 'niche', threat: 'medium', marketCap: 'Private', employees: '800+' },
  { name: 'Guardant Health', x: 3, y: 1, category: 'niche', threat: 'medium', marketCap: '$2.1B', employees: '1,000+' },
  { name: 'Tempus', x: 5, y: 2, category: 'incumbent', threat: 'high', marketCap: '$2.8B', employees: '2,000+' },
  { name: 'Flatiron Health', x: 1, y: 1, category: 'incumbent', threat: 'medium', marketCap: 'Acquired by Roche', employees: '3,000+' },
  { name: 'Ontada', x: 1, y: 1, category: 'niche', threat: 'low', marketCap: 'Private', employees: '500+' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-w-xs">
        <p className="font-bold text-blue-400 mb-2">{data.name}</p>
        <div className="space-y-1 text-sm text-gray-300">
          <p><span className="text-gray-400">AI Capability:</span> {data.x}/10</p>
          <p><span className="text-gray-400">Generative Power:</span> {data.y}/10</p>
          <p><span className="text-gray-400">Market Cap:</span> {data.marketCap}</p>
          <p><span className="text-gray-400">Employees:</span> {data.employees}</p>
          {!data.isCrispro && (
            <p><span className="text-gray-400">Threat Level:</span> 
              <span className={`ml-1 font-semibold ${
                data.threat === 'high' ? 'text-red-400' : 
                data.threat === 'medium' ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {data.threat}
              </span>
            </p>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const renderCustomShape = (props: any) => {
    const { cx, cy, payload } = props;
    if (payload.isCrispro) {
        return (
            <g className="animate-pulse-glow">
                <circle cx={cx} cy={cy} r={16} fill="rgba(59, 130, 246, 0.3)" className="animate-pulse" />
                <circle cx={cx} cy={cy} r={12} fill="rgba(59, 130, 246, 0.5)" />
                <circle cx={cx} cy={cy} r={8} fill="rgba(59, 130, 246, 1)" stroke="#fff" strokeWidth={2}/>
                <circle cx={cx} cy={cy} r={4} fill="#ffffff" />
            </g>
        );
    }
    
    const threatColors = {
        high: '#ef4444',
        medium: '#f59e0b', 
        low: '#10b981'
    };
    
    return (
        <g className="hover:scale-110 transition-transform duration-200 cursor-pointer">
            <circle 
                cx={cx} 
                cy={cy} 
                r={8} 
                fill={threatColors[payload.threat as keyof typeof threatColors]} 
                fillOpacity={0.7}
                stroke={threatColors[payload.threat as keyof typeof threatColors]}
                strokeWidth={2}
            />
            <circle cx={cx} cy={cy} r={4} fill="#ffffff" fillOpacity={0.9} />
        </g>
    );
};

const QuadrantLabel = ({ x, y, title, description, color }: {
    x: number, y: number, title: string, description: string, color: string
}) => (
    <div 
        className="absolute pointer-events-none"
        style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
    >
        <div className={`text-center p-2 rounded-lg bg-gray-800/80 backdrop-blur-sm border ${color}`}>
            <h4 className="font-bold text-white text-sm">{title}</h4>
            <p className="text-xs text-gray-300 max-w-24">{description}</p>
        </div>
    </div>
);

export const StrategicMatrix = () => {
    const [selectedThreat, setSelectedThreat] = useState<'all' | 'low' | 'medium' | 'high'>('all');
    const [highlightQuadrant, setHighlightQuadrant] = useState<string | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const filteredData = matrixData.filter(item => 
        selectedThreat === 'all' || item.threat === selectedThreat || item.isCrispro
    );

    const quadrants = [
        { id: 'niche', title: 'Niche Players', description: 'Low AI, Low Generative', color: 'border-gray-500', count: matrixData.filter(d => d.x <= 5 && d.y <= 5 && !d.isCrispro).length },
        { id: 'challengers', title: 'Challengers', description: 'High AI, Low Generative', color: 'border-yellow-500', count: matrixData.filter(d => d.x > 5 && d.y <= 5 && !d.isCrispro).length },
        { id: 'visionaries', title: 'Visionaries', description: 'Low AI, High Generative', color: 'border-purple-500', count: matrixData.filter(d => d.x <= 5 && d.y > 5 && !d.isCrispro).length },
        { id: 'leaders', title: 'Leaders', description: 'High AI, High Generative', color: 'border-blue-500', count: matrixData.filter(d => d.x > 5 && d.y > 5).length },
    ];

    return (
        <div className="mb-12 bg-gray-900 border border-gray-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Strategic Landscape Matrix</h2>
                    <p className="text-gray-400">A 2x2 analysis of the competitive landscape based on key technological differentiators.</p>
                </div>
                
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <Filter className="w-4 h-4 text-gray-400" />
                        <select
                            value={selectedThreat}
                            onChange={(e) => setSelectedThreat(e.target.value as any)}
                            className="px-3 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-blue-500"
                        >
                            <option value="all">All Threats</option>
                            <option value="low">Low Threat</option>
                            <option value="medium">Medium Threat</option>
                            <option value="high">High Threat</option>
                        </select>
                    </div>
                    
                    <button
                        onClick={() => setShowDetails(!showDetails)}
                        className={`px-3 py-1 rounded text-sm transition-colors duration-200 ${
                            showDetails ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                    >
                        <Eye className="w-4 h-4 inline mr-1" />
                        Details
                    </button>
                </div>
            </div>

            {/* Quadrant Summary */}
            <div className="mb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
                {quadrants.map(quadrant => (
                    <div
                        key={quadrant.id}
                        className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                            highlightQuadrant === quadrant.id 
                                ? `${quadrant.color} bg-opacity-20` 
                                : 'border-gray-700 hover:border-gray-600'
                        }`}
                        onMouseEnter={() => setHighlightQuadrant(quadrant.id)}
                        onMouseLeave={() => setHighlightQuadrant(null)}
                    >
                        <h4 className="font-semibold text-white text-sm">{quadrant.title}</h4>
                        <p className="text-xs text-gray-400 mb-1">{quadrant.description}</p>
                        <span className="text-lg font-bold text-blue-400">{quadrant.count}</span>
                        <span className="text-xs text-gray-500 ml-1">companies</span>
                    </div>
                ))}
            </div>
            
            <div className="relative" style={{ width: '100%', height: 500 }}>
                {/* Quadrant Labels */}
                <QuadrantLabel x={25} y={25} title="Niche Players" description="Reactive Analysis" color="border-gray-500" />
                <QuadrantLabel x={75} y={25} title="Challengers" description="Advanced Analysis" color="border-yellow-500" />
                <QuadrantLabel x={25} y={75} title="Visionaries" description="Creative Reporting" color="border-purple-500" />
                <QuadrantLabel x={75} y={75} title="Leaders" description="AI-Powered Creation" color="border-blue-500" />
                
                <ResponsiveContainer>
                    <ScatterChart
                        margin={{
                            top: 40, right: 40, bottom: 60, left: 60,
                        }}
                    >
                        <ReferenceArea 
                            x1={0} x2={5} y1={0} y2={5} 
                            stroke="#4b5563" strokeOpacity={0.5} 
                            fill="#4b5563" fillOpacity={highlightQuadrant === 'niche' ? 0.2 : 0.1} 
                        />
                        <ReferenceArea 
                            x1={5} x2={10} y1={0} y2={5} 
                            stroke="#f59e0b" strokeOpacity={0.5} 
                            fill="#f59e0b" fillOpacity={highlightQuadrant === 'challengers' ? 0.2 : 0.1} 
                        />
                        <ReferenceArea 
                            x1={0} x2={5} y1={5} y2={10} 
                            stroke="#8b5cf6" strokeOpacity={0.5} 
                            fill="#8b5cf6" fillOpacity={highlightQuadrant === 'visionaries' ? 0.2 : 0.1} 
                        />
                        <ReferenceArea 
                            x1={5} x2={10} y1={5} y2={10} 
                            stroke="#3b82f6" strokeOpacity={0.5} 
                            fill="#3b82f6" fillOpacity={highlightQuadrant === 'leaders' ? 0.3 : 0.2} 
                        />

                        <XAxis 
                            type="number" 
                            dataKey="x" 
                            name="AI Capability" 
                            domain={[0, 10]} 
                            ticks={[2.5, 7.5]}
                            tickFormatter={(tick) => tick === 2.5 ? 'Reactive / Correlative' : 'Predictive / Causal'}
                            stroke="#9ca3af"
                        >
                            <Label value="AI Capability" offset={-40} position="insideBottom" fill="#d1d5db" fontSize={16} fontWeight="bold"/>
                        </XAxis>
                        <YAxis 
                            type="number" 
                            dataKey="y" 
                            name="Generative Power" 
                            domain={[0, 10]}
                            ticks={[2.5, 7.5]}
                            tickFormatter={(tick) => tick === 2.5 ? 'Data Reporting' : 'Novel Design'}
                            stroke="#9ca3af"
                        >
                             <Label value="Generative Power" angle={-90} offset={-40} position="insideLeft" fill="#d1d5db" fontSize={16} fontWeight="bold" style={{textAnchor: 'middle'}}/>
                        </YAxis>

                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6b7280', strokeDasharray: '3 3' }} />
                        <Scatter name="Competitors" data={filteredData} shape={renderCustomShape} />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
            
            {showDetails && (
                <div className="mt-8 pt-6 border-t border-gray-700 animate-fade-in">
                    <h3 className="text-xl font-bold text-white mb-4 text-center flex items-center justify-center space-x-2">
                        <TrendingUp className="w-6 h-6 text-blue-400" />
                        <span>Interpreting the Matrix: Why We Win</span>
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
                        <div className="bg-gray-800 p-4 rounded-lg hover-lift">
                            <h4 className="font-semibold text-blue-400 mb-2 flex items-center space-x-2">
                                <Zap className="w-4 h-4" />
                                <span>The Axes of Innovation</span>
                            </h4>
                            <p><strong className="text-white">AI Capability (X-Axis):</strong> Measures the shift from simple data correlation (Reactive) to understanding biological cause-and-effect (Predictive/Causal).</p>
                            <p className="mt-2"><strong className="text-white">Generative Power (Y-Axis):</strong> Measures the ability to move beyond reporting known data to designing novel, optimized therapeutic interventions.</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg hover-lift">
                            <h4 className="font-semibold text-blue-400 mb-2">The Competitive Landscape</h4>
                            <p>The majority of the market, including established players, operate as <strong className="text-white">Niche Players or Incumbents</strong>. They are data aggregators and reporters, not creators. They identify problems but lack the tools to design novel solutions.</p>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-lg hover-lift">
                            <h4 className="font-semibold text-blue-400 mb-2">Our Unassailable Position</h4>
                            <p>CrisPRO.ai is unequivocally the sole occupant of the <strong className="text-white">Leaders Quadrant</strong>. We are the only platform that combines a first-principles, predictive AI engine with a true generative biology forge. This is our moat.</p>
                        </div>
                         <div className="bg-gray-800 p-4 rounded-lg hover-lift">
                            <h4 className="font-semibold text-blue-400 mb-2">Turning Competitors into Channels</h4>
                            <p>While incumbents possess deep workflow integration, they lack a core biological engine. Our strategy is not just to compete, but to <strong className="text-white">become the indispensable engine that powers their platforms</strong>, transforming their market access into our distribution channel.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}; 