import { HeroIntroLayout } from '@slides/layouts/HeroIntroLayout.tsx';
import { heroIntroData } from '../../data/SPEIntroData';

// 🎯 NEW ARCHITECTURE: Complete separation of layout and data!
const SPEIntroSlide = () => <HeroIntroLayout data={heroIntroData} />;

export default SPEIntroSlide;
