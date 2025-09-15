import { AudienceValuePropLayout } from '@slides/layouts/AudienceValuePropLayout.tsx';
import { cliniciansData } from '../data/SPEForCliniciansData';

// 🎯 NEW ARCHITECTURE: Complete separation of layout and data!
const SPEForCliniciansSlide = () => <AudienceValuePropLayout data={cliniciansData} />;

export default SPEForCliniciansSlide;
