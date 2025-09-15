// Scalable Breast Cancer Deck
// This deck is built using the template system - demonstrates reusability!

import { createDeckFromConfig } from '../../deckBuilder';
import { breastCancerSlideDefinition } from '../../contentConfigs/breastCancerConfig';

// Create the deck configuration
const breastCancerDeckConfig = {
  id: 'breast-cancer-scalable',
  name: 'Hereditary Breast Cancer: Scalable Template',
  description: 'Data-driven Breast Cancer deck built with reusable templates',
  slides: breastCancerSlideDefinition
};

// Create the deck component using the factory
const BreastCancerScalableComponent = createDeckFromConfig(breastCancerDeckConfig).component;

export default BreastCancerScalableComponent;

