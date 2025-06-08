// src/components/TextField.tsx
import React, { forwardRef } from 'react';
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

import styled, { css } from 'styled-components';

/* ────────── Types ────────── */
type BaseProps = {
  /** Visible label above the field */
  label: string;
  /** Optional helper text below */
  helperText?: string;
  /** Marks the field visually invalid */
  error?: boolean;
  /** Renders a <textarea> instead of <input> */
  multiline?: boolean;
  /** Disabled state */
  disabled?: boolean;
};

export type TextFieldProps =
  | (BaseProps &
      Omit<
        InputHTMLAttributes<HTMLInputElement>,
        keyof BaseProps | 'ref'
      >)
  | (BaseProps &
      Omit<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        keyof BaseProps | 'ref'
      >);

/* ────────── Styled ────────── */
const Wrapper = styled.label<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};
`;

const Label = styled.span<{ disabled?: boolean }>`
  font-size: 16px;
  line-height: 140%;
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.neutral.disabled : theme.colors.neutral.default};
`;

const sharedFieldCSS = css<{ error?: boolean; disabled?: boolean }>`
  font-size: 14px;
  line-height: 140%;
  padding: 0.6em 0.8em;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.colors.violet[110] : theme.colors.neutral.muted};
  color: ${({ theme }) => theme.colors.neutral.default};
  background: ${({ theme }) => theme.colors.neutral.surface1};
  resize: vertical;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral.muted};
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: ${({ theme, error }) =>
      error ? theme.colors.red[110] : theme.colors.violet[110]};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme, error }) =>
      error ? theme.colors.red[110] : theme.colors.violet[110]};
  }

  /* filled but blurred */
  &:not(:focus):not(:placeholder-shown) {
    border-color: ${({ theme, error }) =>
      error ? theme.colors.red[110] : theme.colors.violet[110]};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.neutral.disabledBtn};
    color: ${({ theme }) => theme.colors.neutral.disabled};
    border-color: ${({ theme }) => theme.colors.neutral.disabled};
    cursor: not-allowed;
  }
`;

const InputField = styled.input<{ error?: boolean; disabled?: boolean }>`
  ${sharedFieldCSS}
`;

const TextAreaField = styled.textarea<{ error?: boolean; disabled?: boolean }>`
  ${sharedFieldCSS}
  min-height: 5.5em; /* ≈3 lines */
`;

/* ────────── Component ────────── */
export const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>((props, ref) => {
  const {
    label,
    helperText,
    error,
    multiline,
    disabled,
    ...rest
  } = props;

  return (
    <Wrapper disabled={disabled}>
      <Label disabled={disabled}>{label}</Label>

      {multiline ? (
        <TextAreaField
          ref={ref as React.Ref<HTMLTextAreaElement>}
          error={error}
          disabled={disabled}
          placeholder={rest.placeholder ?? label}
          {...(rest as any)}
        />
      ) : (
        <InputField
          ref={ref as React.Ref<HTMLInputElement>}
          error={error}
          disabled={disabled}
          placeholder={rest.placeholder ?? label}
          {...(rest as any)}
        />
      )}

      {helperText && (
        <span
          style={{
            fontSize: '12px',
            lineHeight: '135%',
            color: error ? '#E12828' : '#A0A9B8',
          }}
        >
          {helperText}
        </span>
      )}
    </Wrapper>
  );
});

TextField.displayName = 'TextField';
