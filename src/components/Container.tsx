// src/components/Container.tsx
import styled from 'styled-components';
import { breakpoints, containerWidths } from '../theme';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-top:48px;
  padding-bottom:48px;
  max-width: ${containerWidths.sm};

  @media (min-width: ${breakpoints.md}px) {
    max-width: ${containerWidths.md};
  }
  @media (min-width: ${breakpoints.lg}px) {
    max-width: ${containerWidths.lg};
  }
`;
