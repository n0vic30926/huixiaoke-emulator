/**
 * 这个文件是一个本地化提供者组件，用于在应用程序中提供日期本地化支持。
 * 它导出了一个名为 LocalizationProvider 的函数组件，接受一个名为 children 的属性作为子元素。
 * 
 * @param children - 子元素，用于包裹需要本地化支持的组件。
 * @returns 一个 React 元素，包含了提供日期本地化支持的组件。
 */

'use client';

import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as Provider } from '@mui/x-date-pickers/LocalizationProvider';

export interface LocalizationProviderProps {
  children: React.ReactNode;
}

export function LocalizationProvider({ children }: LocalizationProviderProps): React.JSX.Element {
  return <Provider dateAdapter={AdapterDayjs}>{children}</Provider>;
}
