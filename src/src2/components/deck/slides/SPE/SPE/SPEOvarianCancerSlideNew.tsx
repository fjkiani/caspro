import { CaseStudyLayout } from '@slides/layouts/CaseStudyLayout.tsx';
import { ovarianCancerData } from '../../data/SPEOvarianCancerData';

// 🎯 NEW ARCHITECTURE: Complete separation of layout and data!
const SPEOvarianCancerSlide = () => <CaseStudyLayout data={ovarianCancerData} />;

export default SPEOvarianCancerSlide;
