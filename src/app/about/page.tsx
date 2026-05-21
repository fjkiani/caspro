import React from 'react';
import { Metadata } from 'next';
import { aboutData } from '@/data/about/about-data';
import AboutHero from '@/components/about/AboutHero';
import AboutSection from '@/components/about/AboutSection';
import AboutCmsStory from '@/components/about/AboutCmsStory';
import AboutTeamGrid from '@/components/about/AboutTeamGrid';
import TherapeuticPipeline from '@/components/insilico/FusionWorkflow/TherapeuticPipeline';
import { getAboutPageContent } from '@/lib/docs/hygraph/about-queries';

export const metadata: Metadata = {
  title: 'About CrisPRO.ai - In-Silico Research Framework',
  description:
    'Learn about CrisPRO.ai, our in-silico research framework for drug discovery through AI fusion of discriminative and generative capabilities.',
};

export default async function AboutPage() {
  const cms = await getAboutPageContent();

  const heroForUi = {
    title: cms.hero.title,
    subtitle: cms.hero.subtitle,
    description: cms.hero.description,
    keyMetrics: aboutData.hero.keyMetrics,
  };

  return (
    <div className="min-h-screen bg-white">
      <AboutHero data={heroForUi} />

      {cms.story && <AboutCmsStory story={cms.story} />}

      <nav className="sticky top-20 bg-white/80 backdrop-blur-md z-40 shadow-md rounded-full py-2 px-4 max-w-3xl mx-auto my-8 sm:my-12">
        <ul className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-6 overflow-x-auto">
          {cms.story && (
            <li>
              <a
                href="#mission"
                className="font-medium text-slate-600 hover:text-blue-600 transition-colors text-sm sm:text-base whitespace-nowrap px-2 py-1"
              >
                Mission
              </a>
            </li>
          )}
          <li>
            <a
              href="#team"
              className="font-medium text-slate-600 hover:text-blue-600 transition-colors text-sm sm:text-base whitespace-nowrap px-2 py-1"
            >
              Team
            </a>
          </li>
          <li>
            <a
              href="#business-value"
              className="font-medium text-slate-600 hover:text-blue-600 transition-colors text-sm sm:text-base whitespace-nowrap px-2 py-1"
            >
              Impact
            </a>
          </li>
        </ul>
      </nav>

      <AboutTeamGrid
        title={cms.teamSectionTitle}
        subtitle={cms.teamSectionSubtitle}
        members={cms.team}
      />

      <section id="fusion-workflow" className="py-16 sm:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
          <TherapeuticPipeline />
        </div>
      </section>

      <div id="business-value">
        <AboutSection section={aboutData.businessValue} index={4} />
      </div>
    </div>
  );
}
