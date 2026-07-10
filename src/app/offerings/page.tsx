import PipelineIndexClient from '@/components/pipeline/PipelineIndexClient';

export const metadata = {
  title: 'Offerings | CrisPRO.ai',
  description:
    'Five CrisPRO offerings — Trial Failure Decode, Patient Selection Package, IST Design Support, BD Intelligence Package, and IP Valuation.',
};

export default function PipelinePage() {
  return <PipelineIndexClient />;
}
