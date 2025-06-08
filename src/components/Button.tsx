// src/components/Button.tsx
import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonVariant = 'default' | 'primary' | 'disabled';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** visual style */
  variant?: ButtonVariant;
  /** per-instance hover override */
  hoverColor?: string;
  /** icon before the label */
  startIcon?: React.ReactNode;
  /** icon after the label */
  endIcon?: React.ReactNode;
}

/* ───────── palette ───────── */
const palette = {
  default: {
    bg:   (t: any) => t.colors.blue[50],
    fg:   (t: any) => t.colors.neutral.default,
    hover:(t: any) => t.colors.blue[70],
  },
  primary: {
    bg:   (t: any) => t.colors.blue[100],
    fg:   (t: any) => t.colors.neutral.surface1,
    hover:(t: any) => t.colors.blue[110],
  },
  disabled: {
    bg:   (t: any) => t.colors.neutral.disabledBtn,
    fg:   (t: any) => t.colors.neutral.disabled,
    hover:(t: any) => t.colors.neutral.disabledBtn,
  },
} as const;

/* ───────── styled wrappers ───────── */
const Root = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  justify-content:center;
  padding: 0.6em 1.2em;
  font-size: 16px;
  border-radius: 100px;
  border: none;
  cursor: ${({ variant }) => (variant === 'disabled' ? 'not-allowed' : 'pointer')};
  transition: background 0.15s ease;

  ${({ theme, variant = 'default' }) => css`
    background: ${palette[variant].bg(theme)};
    color:      ${palette[variant].fg(theme)};
  `}

  ${({ theme, variant = 'default', hoverColor }) =>
    variant !== 'disabled' &&
    css`
      &:hover,
      &:focus-visible {
        background: ${hoverColor ?? palette[variant].hover(theme)};
      }
    `}
`;

const IconWrapper = styled.span`
  display: inline-flex;
  line-height: 0;          /* keeps icon vertically centered */
  svg {
    width: 24px;
    height: 24px;
  }
`;

/* ───────── component ───────── */
export const Button: React.FC<ButtonProps> = ({
  children,
  startIcon,
  endIcon,
  variant = 'default',
  hoverColor,
  ...rest
}) => (
  <Root variant={variant} hoverColor={hoverColor} {...rest}>
    {startIcon && <IconWrapper>{startIcon}</IconWrapper>}
    {children}
    {endIcon && <IconWrapper>{endIcon}</IconWrapper>}
  </Root>
);

Button.displayName = 'Button';
