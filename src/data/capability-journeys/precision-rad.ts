import { CapabilityJourneyData } from './types';
import { Radio } from 'lucide-react';

export const precisionRadJourney: CapabilityJourneyData = {
  title: 'Precision Radiation Journey',
  subtitle: 'From one-size-fits-all radiation to genetically-informed, personalized radiotherapy. (Content Coming Soon)',
  oldWaySteps: [
    {
      id: 'old-1',
      title: 'Imaging-Only Planning',
      description: 'Radiation planning is based primarily on anatomical imaging, ignoring the underlying genetic factors that determine tumor sensitivity.',
      icon: Radio,
      problems: [
        '**Suboptimal Dosing:** Without genetic data, dosages can be ineffective or unnecessarily toxic.',
        '**High Toxicity Risk:** Patients suffer from side effects that could have been predicted and mitigated.',
      ],
      solutions: [],
    },
  ],
  newWaySteps: [
    {
      id: 'new-1',
      title: 'Radio-Genomic Planning',
      description: 'CrisPRO integrates genomic insights to predict radiosensitivity, allowing for personalized treatment plans that maximize efficacy and minimize toxicity.',
      icon: Radio,
      problems: [],
      solutions: [
        '**Personalized Dosing:** Tailor radiation dosage to the tumor\'s specific genetic profile.',
        '**Reduced Toxicity:** Predict and mitigate the risk of adverse side effects before treatment begins.',
      ],
    },
  ],
};

