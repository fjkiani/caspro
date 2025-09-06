'use client';

import React from 'react';
import { PageData, PageSectionData } from '@/types/pages';
import PageHeader from './PageHeader';
import TextSection from './TextSection';
import BulletedListSection from './BulletedListSection';

const SectionComponentFactory: React.FC<{ section: PageSectionData }> = ({ section }) => {
    switch (section.type) {
        case 'header':
            return <PageHeader data={section} />;
        case 'text':
            return <TextSection data={section} />;
        case 'bulleted-list':
            return <BulletedListSection data={section} />;
        default:
            return null;
    }
};

const ContentPageLayout: React.FC<{ data: PageData }> = ({ data }) => {
    return (
        <div className="bg-black text-white min-h-screen">
            <main className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-5xl mx-auto">
                    {data.sections.map((section, index) => (
                        <SectionComponentFactory key={index} section={section} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ContentPageLayout;
