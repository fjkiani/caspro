import { discriminativeUseCases } from './discriminative';
import { generativeUseCases } from './generative';

export const allUseCases = [...discriminativeUseCases, ...generativeUseCases];

export { discriminativeUseCases, generativeUseCases };

export * from './discriminative';
export * from './generative';
