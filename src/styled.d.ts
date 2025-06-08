// src/styled.d.ts
import 'styled-components';

// grab the run-time theme _type_ without creating an import cycle
type Theme = typeof import('./theme').theme;

// merge it into styled-components
declare module 'styled-components' {
  // interface, not type-alias, so TS merges correctly
  export interface DefaultTheme extends Theme {}
}
