// src/components/Typography.tsx
import React from 'react';
import styled, { css } from 'styled-components';
import { type TypographyVariant, variantStyles } from '../theme';

interface TypographyProps {
  variant?: TypographyVariant;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
}

const StyledTypography = styled.p<Required<Pick<TypographyProps, 'variant'>>>`
  ${({ variant }) => css`
    ${variantStyles[variant]}
  `}
  /* reset default margins */
  margin: 0;
`;

export const Typography: React.FC<TypographyProps> = ({
  variant = 'description16',
  as = 'p',
  children,
  className,
}) => (
  <StyledTypography as={as} variant={variant} className={className}>
    {children}
  </StyledTypography>
);
