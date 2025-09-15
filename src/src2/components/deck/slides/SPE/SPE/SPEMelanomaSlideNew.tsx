import { CaseStudyLayout } from '@slides/layouts/CaseStudyLayout.tsx';
import { melanomaData } from '../../data/SPEMelanomaData';

// 🎯 NEW ARCHITECTURE: Complete separation of layout and data!
const SPEMelanomaSlide = () => <CaseStudyLayout data={melanomaData} />;

export default SPEMelanomaSlide;
