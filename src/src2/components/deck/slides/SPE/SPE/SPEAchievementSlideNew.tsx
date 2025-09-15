import { HeroIntroLayout } from '@slides/layouts/HeroIntroLayout.tsx';
import { achievementData } from '../../data/SPEAchievementData';

// 🎯 NEW ARCHITECTURE: Complete separation of layout and data!
const SPEAchievementSlide = () => <HeroIntroLayout data={achievementData} />;

export default SPEAchievementSlide;
