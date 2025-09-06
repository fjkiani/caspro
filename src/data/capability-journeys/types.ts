import { 
  Clock, 
  Target, 
  Zap, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Activity,
  Users,
  FileText,
  Microscope,
  Brain,
  TrendingUp
} from 'lucide-react';

export interface JourneyStep {
  number: number;
  title: string;
  description: string;
  icon: any;
  isLast?: boolean;
  variant?: 'old' | 'new';
  problems?: string[];
  solutions?: string[];
  // Metrics will be added when we have real data
  // metrics?: {
  //   time?: string;
  //   success?: string;
  //   cost?: string;
  //   patients?: string;
  // };
}

export interface CapabilityJourneyData {
  title: string;
  subtitle: string;
  oldWaySteps: JourneyStep[];
  newWaySteps: JourneyStep[];
  // Comparison metrics will be added when we have real data
  // comparisonMetrics?: {
  //   oldWay: {
  //     timeToTreatment: string;
  //     successRate: string;
  //     averageCost: string;
  //     patientSatisfaction: string;
  //   };
  //   newWay: {
  //     timeToTreatment: string;
  //     successRate: string;
  //     averageCost: string;
  //     patientSatisfaction: string;
  //   };
  // };
}

export type CapabilityType = 'chemotherapy';
