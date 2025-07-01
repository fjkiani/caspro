import { doctrineDetailsData } from '../doctrine-details-data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import DoctrineDetailHeader from '@/components/doctrine/DoctrineDetailHeader';
import VisionSection from '@/components/doctrine/VisionSection';
import ProblemSection from '@/components/doctrine/ProblemSection';
import DoctrineSection from '@/components/doctrine/DoctrineSection';
import TargetAudienceSection from '@/components/doctrine/TargetAudienceSection';
import { MetastasisFrameworkSection } from '@/components/investment-thesis/MetastasisFrameworkSection';
import MetastaticPotentialReportSection from '@/components/doctrine/MetastaticPotentialReportSection';
import { DesciSection } from '@/components/investment-thesis/DesciSection';

type Props = {
    params: { doctrineSlug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = params.doctrineSlug;
    const doctrine = doctrineDetailsData[slug];

    if (!doctrine) {
        return {
            title: 'Doctrine Not Found | CrisPRO'
        }
    }

    return {
        title: `${doctrine.title} | CrisPRO Doctrine`,
        description: doctrine.vision.content,
    };
}

const DoctrineDetailPage = ({ params }: Props) => {
    const slug = params.doctrineSlug;
    const doctrine = doctrineDetailsData[slug];

    if (!doctrine) {
        notFound();
    }

    return (
        <div className="bg-slate-900 text-white">
            <div className="container mx-auto px-4 py-20 md:py-28">
                <DoctrineDetailHeader subtitle={doctrine.subtitle} title={doctrine.title} />
                <div className="space-y-16 mt-24">
                    <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <VisionSection title={doctrine.vision.title} content={doctrine.vision.content} />
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                        <ProblemSection title={doctrine.problem.title} content={doctrine.problem.content} points={doctrine.problem.points} />
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        <DoctrineSection doctrine={doctrine.doctrine} />
                    </div>
                    <div className="animate-fade-in" style={{ animationDelay: '0.8s' }}>
                        <TargetAudienceSection title={doctrine.targetAudience.title} audiences={doctrine.targetAudience.audiences} />
                    </div>

                    {slug === 'metastasis-prevention' && (
                        <>
                            <div className="animate-fade-in" style={{ animationDelay: '1.0s' }}>
                                <MetastaticPotentialReportSection />
                            </div>
                            <div className="animate-fade-in" style={{ animationDelay: '1.2s' }}>
                                <MetastasisFrameworkSection />
                            </div>
                        </>
                    )}

                    {slug === 'de-sci-and-ip-nfts' && (
                        <div className="animate-fade-in" style={{ animationDelay: '1.0s' }}>
                            <DesciSection />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export async function generateStaticParams() {
    return Object.keys(doctrineDetailsData).map((slug) => ({
        doctrineSlug: slug,
    }));
}

export default DoctrineDetailPage; 