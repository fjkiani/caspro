// SPE Framework Deck - Proper slide data structure
import React from 'react';

// Import actual SPE slide components
import {
  SPEIntroSlideNew,
  SPEFrameworkSlideNew,
  SPEAchievementSlideNew,
  SPEMelanomaSlideNew,
  SPEOvarianCancerSlideNew,
  SPEMultipleMyelomaSlideNew,
  SPEEvidenceDoctrineSlideNew,
  SPEForBiotechsSlideNew,
  SPEForCliniciansSlideNew,
  SPEDifferentiatorsSlideNew
} from '../../components/deck/slides/SPE/SPE';

// SPE Framework Deck - Returns slide data array instead of rendering all slides
const speSlidesData = [
  {
    id: 'spe-intro',
    title: 'SPE Framework',
    subtitle: 'Scientific Performance Evidence',
    content: {
      type: 'custom-react',
      data: {
        component: SPEIntroSlideNew
      }
    }
  },
  {
    id: 'spe-framework',
    title: 'SPE Framework',
    subtitle: 'Evidence-Based Validation',
    content: {
      type: 'custom-react',
      data: {
        component: SPEFrameworkSlideNew
      }
    }
  },
  {
    id: 'spe-achievements',
    title: 'SPE Achievements',
    subtitle: 'Validated Performance',
    content: {
      type: 'custom-react',
      data: {
        component: SPEAchievementSlideNew
      }
    }
  },
  {
    id: 'spe-melanoma',
    title: 'Melanoma Case Study',
    subtitle: 'SPE in Action',
    content: {
      type: 'custom-react',
      data: {
        component: SPEMelanomaSlideNew
      }
    }
  },
  {
    id: 'spe-ovarian',
    title: 'Ovarian Cancer Case Study',
    subtitle: 'SPE Validation',
    content: {
      type: 'custom-react',
      data: {
        component: SPEOvarianCancerSlideNew
      }
    }
  },
  {
    id: 'spe-myeloma',
    title: 'Multiple Myeloma Case Study',
    subtitle: 'SPE Application',
    content: {
      type: 'custom-react',
      data: {
        component: SPEMultipleMyelomaSlideNew
      }
    }
  },
  {
    id: 'spe-evidence',
    title: 'Evidence Doctrine',
    subtitle: 'Transparent Methodology',
    content: {
      type: 'custom-react',
      data: {
        component: SPEEvidenceDoctrineSlideNew
      }
    }
  },
  {
    id: 'spe-biotechs',
    title: 'For Biotechs',
    subtitle: 'Research Applications',
    content: {
      type: 'custom-react',
      data: {
        component: SPEForBiotechsSlideNew
      }
    }
  },
  {
    id: 'spe-clinicians',
    title: 'For Clinicians',
    subtitle: 'Clinical Applications',
    content: {
      type: 'custom-react',
      data: {
        component: SPEForCliniciansSlideNew
      }
    }
  },
  {
    id: 'spe-differentiators',
    title: 'SPE Differentiators',
    subtitle: 'Competitive Advantages',
    content: {
      type: 'custom-react',
      data: {
        component: SPEDifferentiatorsSlideNew
      }
    }
  }
];

export default speSlidesData;
