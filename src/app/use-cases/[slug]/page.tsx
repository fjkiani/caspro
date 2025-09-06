import React from 'react';
import { notFound } from 'next/navigation';
import ContentPageLayout from '@/components/content/ContentPageLayout';
import { getUseCaseBySlug, getAllUseCaseSlugs } from '@/data/use-cases';

interface UseCasePageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    const slugs = getAllUseCaseSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

const UseCasePage = ({ params }: UseCasePageProps) => {
    const useCase = getUseCaseBySlug(params.slug);

    if (!useCase) {
        notFound();
    }

    return <ContentPageLayout data={useCase.content} />;
};

export default UseCasePage; 
 