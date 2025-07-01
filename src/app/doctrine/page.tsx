import { doctrineCardsData } from './data';
import DoctrineCard from './DoctrineCard';
import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';

export const metadata: Metadata = {
    title: 'Our Doctrine | CrisPRO',
    description: 'The core principles that drive our mission to revolutionize oncology: VUS Annihilation, Metastasis Prevention, and DeSci & IP-NFTs.',
};

const DoctrinePage = () => {
    return (
        <div className="bg-slate-900 text-white">
            <div className="container mx-auto px-4 py-20 md:py-28">

                <SectionHeader 
                    icon={BookOpen}
                    title="Our Doctrine"
                    subtitle="Guiding Principles"
                    description="These are the foundational tenets of CrisPRO's strategic and ethical framework. They define our approach to innovation, patient care, and the future of science." 
                />

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {doctrineCardsData.map((card) => (
                        <DoctrineCard
                            key={card.title}
                            title={card.title}
                            description={card.description}
                            href={card.href}
                            iconName={card.iconName}
                            status={card.status}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctrinePage; 