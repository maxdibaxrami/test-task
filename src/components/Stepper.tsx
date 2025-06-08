// src/components/Stepper.tsx
import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from '../components/Button';
import { breakpoints } from '../theme';

export interface StepperProps {
  totalSteps: number;
  currentStep: number;                // controlled
  nextLabels?: string[];
  prevLabels?: string[];
  nextIcons?: React.ReactNode[];
  prevIcons?: React.ReactNode[];
  canProceed?: boolean;
  prevVariant?:"default" | "primary";
  onStepChange?: (step: number) => void;
}

const Bar = styled.div<{ single: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
  margin-top: 32px;
  background: ${({ theme }) => theme.colors.neutral.surface1};
  
   ${({ single }) =>
    single
      ? css`
          flex-direction: row;
        `
      : css`
          width: 100%;
          flex-direction: column;
        `}

  @media (min-width: ${breakpoints.md}px) {
    width: auto;
    flex-direction: row;

  }
`;

const StepText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.neutral.default};
`;


const Controls = styled.div<{ single: boolean }>`
  display: flex;
  gap: 8px;

  ${({ single }) =>
    single
      ? css`
          flex-direction: row;
        `
      : css`
          width: 100%;
          flex-direction: column;
        `}

  /* ≥ md → always row, auto width */
  @media (min-width: ${breakpoints.md}px) {
    width: auto;
    flex-direction: row;

  }
`;

export const Stepper: React.FC<StepperProps> = ({
  totalSteps,
  currentStep,
  nextLabels = [],
  prevLabels = [],
  nextIcons = [],
  prevIcons = [],
  canProceed = true,
  prevVariant="default",
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
    <Bar single={step === 1}>
      <StepText>Шаг {step}/{totalSteps}</StepText>

      <Controls single={step === 1}>
        {step > 1 && (
          <Button
            variant={prevVariant}
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
      </Controls>
    </Bar>
  );
};

Stepper.displayName = 'Stepper';
