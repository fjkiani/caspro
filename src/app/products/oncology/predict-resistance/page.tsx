import React from 'react';
import TabbedCapabilityPage from '@/components/products/shared/TabbedCapabilityPage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Predict Resistance",
  description: "Resistance prediction for targeted therapies — built on CrisPRO.ai mechanism-alignment evidence.",
  alternates: { canonical: "/products/oncology/predict-resistance" },
};


export default function PredictResistancePage() {
  return (
    <TabbedCapabilityPage
      productSlug="oncology"
      capabilitySlug="predict-resistance"
    />
  );
}
