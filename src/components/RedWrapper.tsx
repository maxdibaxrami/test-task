// src/components/Container.tsx
import styled from 'styled-components';

export const RedWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  background:${({ theme }) => theme.colors.red[50]};
  border-radius: 8px;
  gap:16px;
  display:flex;
  flex-direction: column;

`;
