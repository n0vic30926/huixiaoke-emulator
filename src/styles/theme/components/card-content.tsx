/**
 * 这个文件定义了 MuiCardContent 组件的样式覆盖。
 * MuiCardContent 是 Material-UI 中的一个组件，用于渲染卡片内容。
 * 该文件导出了一个对象，该对象包含了对 MuiCardContent 组件样式的覆盖定义。
 * 这些样式覆盖包括根元素的内边距和最后一个子元素的底部内边距。
 * 通过应用这些样式覆盖，可以自定义 MuiCardContent 组件的外观。
 */

import type { Components } from '@mui/material/styles';
import type { Theme } from '../types';

export const MuiCardContent = {
  styleOverrides: { root: { padding: '32px 24px', '&:last-child': { paddingBottom: '32px' } } },
} satisfies Components<Theme>['MuiCardContent'];
