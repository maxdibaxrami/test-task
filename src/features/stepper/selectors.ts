import type { RootState } from '../../store';

export const selectCurrentStep = (s: RootState) => s.stepper.step;
