import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import TechnologySection from '@/components/sections/TechnologySection';
import TechnologyDeepDiveSection from '@/components/sections/TechnologyDeepDiveSection';
import AgentCapabilitiesSection from '@/components/sections/AgentCapabilitiesSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import FoundationalPillarsSection from '@/components/sections/FoundationalPillarsSection';
// import ImpactSection from '@/components/sections/ImpactSection'; // Commented out
import TeamSection from '@/components/sections/TeamSection';
import ContactSection from '@/components/sections/ContactSection';
import TopicsSection from '@/components/sections/TopicsSection';
import UnfairAdvantageSection from '@/components/investment-thesis/UnfairAdvantageSection';
import InvestmentThesisPage from './investment-thesis/page';
import { InvestmentThesisHeader } from '@/components/investment-thesis/InvestmentThesisHeader';
import { MetastasisFrameworkSection } from '@/components/investment-thesis/MetastasisFrameworkSection';
// Page configuration constants
const PAGE_CONFIG = {
  title: 'CrisPRO: Oncology Co-Pilot',
  sections: [
    { id: 'hero', component: HeroSection },
    { id: 'problem', component: ProblemSection },
    { id: 'investment-thesis', component: InvestmentThesisHeader },
    { id: 'metastasis-framework', component: MetastasisFrameworkSection },

    // { id: 'solution', component: SolutionSection },
    // { id: 'topics', component: TopicsSection },
    // { id: 'features', component: FeaturesSection },
    // { id: 'science', component: TechnologySection },
    // { id: 'technology-deep-dive', component: TechnologyDeepDiveSection },
    // { id: 'agent-capabilities', component: AgentCapabilitiesSection },
    // { id: 'foundational-pillars', component: FoundationalPillarsSection },
    // { id: 'impact', component: ImpactSection }, // Commented out
    // { id: 'team', component: TeamSection },
    { id: 'contact', component: ContactSection },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen">
      
      {/* Render all sections */}
      {PAGE_CONFIG.sections.map((section) => {
        const SectionComponent = section.component;
        return <SectionComponent key={section.id} />;
      })}
      
    </main>
  );
}
