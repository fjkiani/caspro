import { CapabilityAspect } from '../../../../data/coPilotDetails';
import { ASPECT_TITLES, ASPECT_ICONS, ASPECT_COLORS } from '../../../../data/learn/tactical-matrix-constants';

export interface NormalizedAspect {
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'teal' | 'indigo';
  keyMetric: string;
}

/**
 * Normalizes aspect data to handle both string and CapabilityAspect formats
 */
export const normalizeAspect = (aspect: CapabilityAspect | string, index: number): NormalizedAspect => {
  if (typeof aspect === 'string') {
    return {
      title: ASPECT_TITLES[index],
      description: aspect,
      icon: ASPECT_ICONS[index],
      color: ASPECT_COLORS[index],
      keyMetric: 'Advanced AI'
    };
  }
  
  return {
    title: aspect.title,
    description: aspect.description,
    icon: aspect.icon,
    color: aspect.color,
    keyMetric: aspect.keyMetric
  };
};
