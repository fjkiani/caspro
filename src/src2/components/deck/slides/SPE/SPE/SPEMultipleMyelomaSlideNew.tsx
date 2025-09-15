import { CaseStudyLayout } from '@slides/layouts/CaseStudyLayout.tsx';
import { multipleMyelomaData } from '../../data/SPEMultipleMyelomaData';

// 🎯 NEW ARCHITECTURE: Complete separation of layout and data!
const SPEMultipleMyelomaSlide = () => <CaseStudyLayout data={multipleMyelomaData} />;

export default SPEMultipleMyelomaSlide;
