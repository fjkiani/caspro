import { EvidencePrinciplesLayout } from '@slides/layouts/EvidencePrinciplesLayout.tsx';
import { evidenceData } from '../data/SPEEvidenceData';

// 🎯 NEW ARCHITECTURE: Complete separation of layout and data!
const SPEEvidenceDoctrineSlide = () => <EvidencePrinciplesLayout data={evidenceData} />;

export default SPEEvidenceDoctrineSlide;
