// src/components/Radio.tsx
import React, { type InputHTMLAttributes } from 'react';
import styled, { css, useTheme, type DefaultTheme } from 'styled-components';

/* ───────── Types ───────── */
interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

/* ───────── Visually-hidden native input ───────── */
const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

/* ───────── Custom circle ───────── */
const StyledRadio = styled.div<{ disabled?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  cursor: pointer;
  /* base (outline only) */
  ${({ theme }) => css`
    border: 2px solid ${theme.colors.neutral.surface5};
    background: ${theme.colors.neutral.surface5};
  `}

  /* hover (NOT checked) */
  ${({ theme, disabled }) =>
    !disabled &&
    css`
      &:hover {
        border: 2px solid ${theme.colors.blue[110]};

        background: ${theme.colors.blue[110]};
      }
    `}

  /* checked */
  ${({ theme }) => css`
    ${HiddenRadio}:checked + & {
      border: 5px solid ${theme.colors.blue[100]};
      background: unset;
    }
  `}

  /* hover while checked */
  ${({ theme, disabled }) =>
    !disabled &&
    css`
      ${HiddenRadio}:checked + &:hover {
        border-color: ${theme.colors.blue[110]};
        background: unset;
      }
    `}

  /* disabled overrides */
  ${({ theme, disabled }) =>
    disabled &&
    css`
      border-color: ${theme.colors.neutral.disabled};
      background: ${theme.colors.neutral.disabled};
      cursor: not-allowed;
    `}
`;

/* ───────── Label wrapper ───────── */
const Label = styled.label<{ disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
`;

/* ───────── Component ───────── */
export const Radio: React.FC<RadioProps> = ({
  label,
  disabled,
  id,
  ...rest
}) => {
  const theme: DefaultTheme = useTheme();

  return (
    <Label htmlFor={id} disabled={disabled}>
      <HiddenRadio id={id} disabled={disabled} {...rest} />
      <StyledRadio disabled={disabled} />
      {label && <span>{label}</span>}
    </Label>
  );
};

Radio.displayName = 'Radio';
