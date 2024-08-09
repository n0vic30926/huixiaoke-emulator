/**
 * 这个文件是用于定制化 MuiTab 组件的样式。
 * MuiTab 组件是 Material-UI 中的一个选项卡组件。
 * 该文件导出了一个对象 MuiTab，其中包含了对 MuiTab 组件样式的定制化。
 * 定制化的样式包括字体大小、字体粗细、行高、最小宽度、内边距、文本转换以及选项卡之间的间距。
 * 该对象满足 Components<Theme>['MuiTab'] 类型。
 */

import type { Components } from '@mui/material/styles';
import type { Theme } from '../types';

export const MuiTab = {
  styleOverrides: {
    root: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: 1.71,
      minWidth: 'auto',
      paddingLeft: 0,
      paddingRight: 0,
      textTransform: 'none',
      '& + &': { marginLeft: '24px' },
    },
  },
} satisfies Components<Theme>['MuiTab'];
