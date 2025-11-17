// Extract product capabilities for homepage - aligned with product.mdc
// Formats ProductCapability[] into CapabilityCard[] for reuse with existing CapabilityCard component

import { PRODUCT_CAPABILITIES } from './product-capabilities';
import { CapabilityCard, KPIMetric } from '@/data/landing/landing-data';

export const extractProductCapabilityCards = (): CapabilityCard[] => {
  return PRODUCT_CAPABILITIES.map(capability => {
    // Convert KPIs to the format expected by CapabilityCard
    const kpis: KPIMetric[] = capability.kpis.map(kpi => ({
      label: kpi.label,
      value: kpi.value,
      unit: kpi.unit
    }));

    return {
      title: capability.title,
      subtitle: capability.subtitle,
      kpis,
      actions: [{ label: capability.cta.text, href: capability.cta.href }],
      icon: capability.icon,
      color: capability.color,
      description: capability.blurb // Map blurb to description
    };
  });
};
