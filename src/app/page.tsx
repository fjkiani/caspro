import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import SolutionSection from '@/components/sections/SolutionSection';
import TechnologySection from '@/components/sections/TechnologySection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TeamSection from '@/components/sections/TeamSection';
import ContactSection from '@/components/sections/ContactSection';

// Page configuration constants
const PAGE_CONFIG = {
  title: 'CasPro: Oncology Co-Pilot',
  sections: [
    { id: 'hero', component: HeroSection },
    { id: 'problem', component: ProblemSection },
    { id: 'solution', component: SolutionSection },
    { id: 'features', component: FeaturesSection },
    { id: 'science', component: TechnologySection },
    { id: 'team', component: TeamSection },
    { id: 'contact', component: ContactSection },
  ],
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Render all sections */}
      {PAGE_CONFIG.sections.map((section) => {
        const SectionComponent = section.component;
        return <SectionComponent key={section.id} />;
      })}
      
      <Footer />
    </main>
  );
}
