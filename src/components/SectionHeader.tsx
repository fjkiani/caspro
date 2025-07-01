import React from 'react';
import { LucideProps } from 'lucide-react';

interface SectionHeaderProps {
    icon: React.ComponentType<LucideProps>;
    title: string;
    subtitle: string;
    description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ icon: Icon, title, subtitle, description }) => {
    return (
        <header className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center bg-blue-600/10 p-3 rounded-2xl mb-6 border border-blue-500/20">
                <Icon className="h-8 w-8 text-blue-400" />
            </div>
            <h2 className="text-sm font-semibold text-blue-400 uppercase tracking-widest">
                {subtitle}
            </h2>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 leading-tight tracking-tighter">
                {title}
            </h1>
            <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
                {description}
            </p>
        </header>
    );
};

export default SectionHeader; 