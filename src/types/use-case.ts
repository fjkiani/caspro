export type UseCase = {
  id: string;
  name: string;
  summary: string;
  seed: Record<string, any>;
  steps: UseCaseStep[];
  dossierApi: string;
  category: 'discriminative' | 'generative';
  tags?: string[];
};

export type UseCaseStep = {
  id: string;
  title: string;
  input: (ctx: UseCaseContext) => Record<string, any>;
  runMode: 'simulate' | 'real';
};

export type UseCaseContext = {
  seed: Record<string, any>;
  outputs: Record<string, any>;
};

export type UseCaseStepResult = {
  input: Record<string, any>;
  output: Record<string, any>;
  processingSteps?: Array<{
    step: string;
    status: 'running' | 'completed' | 'pending';
    duration?: string;
  }>;
  insights?: string[];
  evidence?: Record<string, any>;
  provenance?: {
    runId: string;
    model: string;
    timestamp: string;
  };
};


