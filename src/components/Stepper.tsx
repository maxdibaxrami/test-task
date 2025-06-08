// src/components/Stepper.tsx
import React from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';

export interface StepperProps {
  totalSteps: number;
  currentStep: number;                // controlled
  nextLabels?: string[];
  prevLabels?: string[];
  nextIcons?: React.ReactNode[];
  prevIcons?: React.ReactNode[];
  canProceed?: boolean;
  onStepChange?: (step: number) => void;
}

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
  margin-top: 32px;
  background: ${({ theme }) => theme.colors.neutral.surface1};
`;

const StepText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.default};
`;

export const Stepper: React.FC<StepperProps> = ({
  totalSteps,
  currentStep,
  nextLabels = [],
  prevLabels = [],
  nextIcons = [],
  prevIcons = [],
  canProceed = true,
  onStepChange,
}) => {
  const step = currentStep;

  const go = (target: number) => {
    const next = Math.min(Math.max(target, 1), totalSteps);
    onStepChange?.(next);
  };

  const nextLabel = nextLabels[step - 1];
  const prevLabel = prevLabels[step -1];

  const PrevIcon = prevIcons[step - 1];
  const NextIcon = nextIcons[step - 1];

  const nextDisabled = step === totalSteps || !canProceed;
  const prevDisabled = step === 1;

  return (
    <Bar>
      <StepText>Шаг {step}/{totalSteps}</StepText>

      <div style={{ display: 'flex', gap: 8 }}>
        {step > 1 && (
          <Button
            variant="default"
            disabled={prevDisabled}
            startIcon={PrevIcon && <span style={{ marginRight: 4 }}>{PrevIcon}</span>}
            onClick={() => go(step - 1)}
          >
            {prevLabel}
          </Button>
        )}

        <Button
          variant={nextDisabled ? 'disabled' : 'primary'}
          disabled={nextDisabled}
          onClick={() => go(step + 1)}
          endIcon={NextIcon && <span style={{ marginLeft: 4 }}>{NextIcon}</span>}
        >
          {nextLabel}
        </Button>
      </div>
    </Bar>
  );
};

Stepper.displayName = 'Stepper';
