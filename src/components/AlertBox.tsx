import React from 'react';
import styled from 'styled-components';

interface AlertBoxProps {
  children: React.ReactNode;
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.5em 1em;
  background: ${({ theme }) => theme.colors.red[50] ?? '#FADEE0'};
  color: ${({ theme }) => theme.colors.red[110] ?? '#E12828'};
  border-radius: 100px;
  font-size: 14px;
  line-height: 135%;
`;

export const AlertBox: React.FC<AlertBoxProps> = ({ children }) => (
  <Wrapper>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2C11.314 2 14 4.686 14 8s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 8.333V5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.667h.002"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {children}
  </Wrapper>
);

AlertBox.displayName = 'AlertBox';
