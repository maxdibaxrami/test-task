// src/theme.ts
import type { DefaultTheme } from 'styled-components';

export const breakpoints = {
  sm: 380,
  md: 640,
  lg: 1200,
} as const;

export const containerWidths = {
  sm: '296px',
  md: '600px',
  lg: '904px',
} as const;

export type TypographyVariant =
  | 'title3'
  | 'description16'
  | 'description14'
  | 'description12'
  | 'descriptionBold14';

export const variantStyles: Record<TypographyVariant, string> = {
  title3: `
    font-size: 20px;
    line-height: 106%;
    font-weight: 700;
  `,
  description16: `
    font-size: 16px;
    line-height: 135%;
    font-weight: 400;
  `,
  description14: `
    font-size: 14px;
    line-height: 140%;
    font-weight: 400;
  `,
  description12: `
    font-size: 12px;
    line-height: 135%;
    font-weight: 400;
  `,
  descriptionBold14: `
    font-size: 14px;
    line-height: 135%;
    font-weight: 700;
  `,
};

export const colors = {
  neutral: {
    surface1: '#FFFFFF',
    default:   '#293244',
    muted:     '#A0A9B8',
    surface5:  '#D0D4DC',
    surface3:  '#F6F6F8',
    disabled:  'rgba(68, 83, 113, 0.5)',
    disabledBtn:'rgba(68, 83, 113, 0.1)',
  },
  blue: {
    100: '#45A5F6',
     60: '#C7E4FC',
     50: '#DAEDFD',
     70: "#B5DBFB",
     110: '#007EE5'
  },
  red: {
    110: '#E12828',
     50: '#FADEE0',
  },
  violet: {
    110: '#8A6BF4',
  },
} as const;

// Let TypeScript infer the shape; your styled.d.ts will map DefaultTheme to typeof theme
export const theme = {
  breakpoints,
  containerWidths,
  variantStyles,
  colors,
} as const;
