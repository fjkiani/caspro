'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldAlert, BarChart, Dna, FileText } from 'lucide-react';

interface BattlePlanEntryProps {
    rank: number;
    name: string;
    score: string;
    status: 'Validated' | 'Pending';
}

const BattlePlanEntry = ({ rank, name, score, status }: BattlePlanEntryProps) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: rank * 0.1 }}
        className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700"
    >
        <div className="flex items-center">
            <span className="text-xl font-bold text-red-400 mr-4">{rank}.</span>
            <div>
                <p className="font-semibold text-slate-200">{name}</p>
                <p className="text-xs text-slate-500">Therapeutic Candidate</p>
            </div>
        </div>
        <div className="flex items-center space-x-4">
            <div className="text-right">
                <p className="font-bold text-lg text-green-400">{score}</p>
                <p className="text-xs text-slate-500">Assassin Score</p>
            </div>
            {status === 'Validated' ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
                <ShieldAlert className="w-6 h-6 text-yellow-500" />
            )}
        </div>
    </motion.div>
);

const FinalBattlePlanViz = () => {
    const candidates: BattlePlanEntryProps[] = [
        { rank: 1, name: 'gRNA-TP53-R175H-Opt1', score: '0.95', status: 'Validated' },
        { rank: 2, name: 'gRNA-TP53-R175H-Opt2', score: '0.91', status: 'Validated' },
        { rank: 3, name: 'gRNA-TP53-R175H-Opt3', score: '0.88', status: 'Validated' },
    ];

    return (
        <div>
            <div className="flex items-center text-red-400 mb-4">
                <FileText className="w-6 h-6 mr-3" />
                <h3 className="text-xl font-bold">Step 7: Final Battle Plan</h3>
            </div>
            <p className="text-slate-400 mb-6">
                The campaign concludes. The platform delivers a rank-ordered list of fully validated, `in silico` proven therapeutic weapons, ready for experimental deployment.
            </p>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
                <h4 className="font-semibold text-slate-300 mb-4 px-2">Top Therapeutic Candidates:</h4>
                <div className="space-y-3">
                    {candidates.map(c => <BattlePlanEntry key={c.rank} {...c} />)}
                </div>
            </div>
        </div>
    );
};

export default FinalBattlePlanViz; 
 
 