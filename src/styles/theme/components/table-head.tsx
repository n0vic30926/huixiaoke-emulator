/**
 * 这个文件是用于定义 MuiTableHead 组件的样式覆盖。
 * MuiTableHead 组件是 Material-UI 表头组件的样式定义。
 * 通过覆盖根元素的样式，可以自定义表头的背景颜色、文字颜色和行高。
 */

import type { Components } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import type { Theme } from '../types';

export const MuiTableHead = {
  styleOverrides: {
    root: {
      [`& .${tableCellClasses.root}`]: {
        backgroundColor: 'var(--mui-palette-background-level1)',
        color: 'var(--mui-palette-text-secondary)',
        lineHeight: 1,
      },
    },
  },
} satisfies Components<Theme>['MuiTableHead'];
