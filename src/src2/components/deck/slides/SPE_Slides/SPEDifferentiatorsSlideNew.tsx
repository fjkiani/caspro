import { DifferentiatorsLayout } from '../layouts/DifferentiatorsLayout.tsx';
import { differentiatorsData } from '../data/SPEDifferentiatorsData';

// 🎯 NEW ARCHITECTURE: Complete separation of layout and data!
const SPEDifferentiatorsSlide = () => {
  console.log('SPEDifferentiatorsSlide - differentiatorsData:', differentiatorsData);
  console.log('SPEDifferentiatorsSlide - features:', differentiatorsData?.features);
  return <DifferentiatorsLayout data={differentiatorsData} />;
};

export default SPEDifferentiatorsSlide;
