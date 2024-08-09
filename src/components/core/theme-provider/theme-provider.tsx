/**
 * 这个文件是一个主题提供者组件，用于提供应用程序的主题配置。
 * 
 * @remarks
 * 该组件接受一个 `children` 属性，用于渲染子组件。
 * 
 * @public
 */

'use client';

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { createTheme } from '@/styles/theme/create-theme';

import EmotionCache from './emotion-cache';

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): React.JSX.Element {
  const theme = createTheme();

  return (
    <EmotionCache options={{ key: 'mui' }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </EmotionCache>
  );
}
