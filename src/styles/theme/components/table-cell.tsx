/**
 * 这个文件定义了 MuiTableCell 组件的样式覆盖。
 * MuiTableCell 是 Material-UI 表格单元格组件的样式。
 * 
 * @module styles/theme/components/table-cell
 */

import type { Components } from '@mui/material/styles';
import type { Theme } from '../types';

export const MuiTableCell = {
  styleOverrides: {
    root: { borderBottom: 'var(--TableCell-borderWidth, 1px) solid var(--mui-palette-TableCell-border)' },
    paddingCheckbox: { padding: '0 0 0 24px' },
  },
} satisfies Components<Theme>['MuiTableCell'];
