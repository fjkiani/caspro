import { HeroSection } from '@/components/desci/HeroSection';
import { ProblemSection } from '@/components/desci/ProblemSection';
import { DoctrineSection } from '@/components/desci/DoctrineSection';
import { InnovationPipelineSection } from '@/components/desci/InnovationPipelineSection';
import { AdvantagesSection } from '@/components/desci/AdvantagesSection';
import { FlywheelSection } from '@/components/desci/FlywheelSection';

const DeSciPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased">
      <HeroSection />
      <main className="container mx-auto px-4 py-16">
        <ProblemSection />
        <DoctrineSection />
        <InnovationPipelineSection />
        <AdvantagesSection />
        <FlywheelSection />
      </main>
    </div>
  );
};

export default DeSciPage; 