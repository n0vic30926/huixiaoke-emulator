/**
 * 这个文件是用于创建主题的。
 * 
 * @remarks
 * 这个文件导出了一个名为`createTheme`的函数，用于创建主题对象。
 * 
 * @returns {Theme} - 创建的主题对象。
 */

import { experimental_extendTheme as extendTheme } from '@mui/material/styles';
import { colorSchemes } from './color-schemes';
import { components } from './components/components';
import { shadows } from './shadows';
import type { Theme } from './types';
import { typography } from './typography';

declare module '@mui/material/styles/createPalette' {
  interface PaletteRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    950: string;
  }

  interface Palette {
    neutral: PaletteRange;
  }

  interface PaletteOptions {
    neutral?: PaletteRange;
  }

  interface TypeBackground {
    level1: string;
    level2: string;
    level3: string;
  }
}

export function createTheme(): Theme {
  const theme = extendTheme({
    breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440 } },
    components,
    colorSchemes,
    shadows,
    shape: { borderRadius: 8 },
    typography,
  });

  return theme;
}
