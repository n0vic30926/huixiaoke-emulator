/**
 * 这个文件是用于定制 MUI Button 组件的样式的。
 * 它导出了一个名为 `MuiButton` 的对象，该对象包含了对 Button 组件样式的定制。
 * 通过修改 `styleOverrides` 属性，可以改变 Button 组件的根元素样式以及不同尺寸和文本大小的样式。
 * 
 * @packageDocumentation
 */

import type { Components } from '@mui/material/styles';
import type { Theme } from '../types';

export const MuiButton = {
  styleOverrides: {
    root: { borderRadius: '12px', textTransform: 'none' },
    sizeSmall: { padding: '6px 16px' },
    sizeMedium: { padding: '8px 20px' },
    sizeLarge: { padding: '11px 24px' },
    textSizeSmall: { padding: '7px 12px' },
    textSizeMedium: { padding: '9px 16px' },
    textSizeLarge: { padding: '12px 16px' },
  },
} satisfies Components<Theme>['MuiButton'];
