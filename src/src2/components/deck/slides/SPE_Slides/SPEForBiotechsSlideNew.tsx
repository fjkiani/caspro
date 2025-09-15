import { AudienceValuePropLayout } from '@slides/layouts/AudienceValuePropLayout.tsx';
import { biotechsData } from '../data/SPEForBiotechsData';

// 🎯 NEW ARCHITECTURE: Complete separation of layout and data!
const SPEForBiotechsSlide = () => <AudienceValuePropLayout data={biotechsData} />;

export default SPEForBiotechsSlide;
