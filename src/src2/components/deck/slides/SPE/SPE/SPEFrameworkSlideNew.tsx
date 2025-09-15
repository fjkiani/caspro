import { FrameworkExplanationLayout } from '@slides/layouts/FrameworkExplanationLayout.tsx';
import { frameworkData } from '../../data/SPEFrameworkData';

// 🎯 NEW ARCHITECTURE: Complete separation of layout and data!
const SPEFrameworkSlide = () => <FrameworkExplanationLayout data={frameworkData} />;

export default SPEFrameworkSlide;
