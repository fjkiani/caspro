// SPE Constants Index
// Central export point for all SPE slide constants

export * from './slideContent';
export * from './animations';
export * from './styles';

// Export new use-case slides
export { default as SPEMultipleMyelomaUseCaseSlide } from '../SPEMultipleMyelomaUseCaseSlide';
export { default as SPEOvarianCancerUseCaseSlide } from '../SPEOvarianCancerUseCaseSlide';
export { default as SPEMelanomaUseCaseSlide } from '../SPEMelanomaUseCaseSlide';
export { default as SPEAPIIntegrationSlide } from '../SPEAPIIntegrationSlide';

// Export split chemotherapy slides
export { default as SPEChemotherapySlidePart1 } from '../SPEChemotherapySlidePart1';
export { default as SPEChemotherapySlidePart2 } from '../SPEChemotherapySlidePart2';

// Export business value slide
export { default as SPEBusinessValueSlide } from '../SPEBusinessValueSlide';