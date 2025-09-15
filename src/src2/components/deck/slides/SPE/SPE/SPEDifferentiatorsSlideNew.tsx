import { DifferentiatorsLayout } from '@slides/layouts/DifferentiatorsLayout.tsx';
import { differentiatorsData } from '../../data/SPEDifferentiatorsData';

// 🎯 NEW ARCHITECTURE: Complete separation of layout and data!
const SPEDifferentiatorsSlide = () => <DifferentiatorsLayout data={differentiatorsData} />;

export default SPEDifferentiatorsSlide;
