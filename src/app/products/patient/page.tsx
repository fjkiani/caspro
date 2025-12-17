import { redirect } from 'next/navigation';

export default function PatientProductPage() {
  // Redirect to main patients page
  redirect('/patients');
}

