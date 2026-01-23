import { Metadata } from 'next';
import PatientPageClient from '@/components/patients/PatientPageClient';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'For Patients | CrisPRO - AI-Powered Precision Oncology',
    description: 'AI-powered precision medicine. Get personalized treatment insights, resolve genetic uncertainty, and access clinical trials.',
  };
}

export default function PatientsPage() {
  return <PatientPageClient />;
}


