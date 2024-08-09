/**
 * 这个文件定义了 MuiAvatar 组件的样式覆盖。
 * MuiAvatar 是 Material-UI 库中的一个组件，用于显示用户头像。
 * 通过 styleOverrides 属性，可以自定义 MuiAvatar 组件的根元素样式。
 * 根元素的样式包括字体大小、字体粗细和字母间距。
 */
import type { Components } from '@mui/material/styles';
import type { Theme } from '../types';

export const MuiAvatar = {
  styleOverrides: { root: { fontSize: '14px', fontWeight: 600, letterSpacing: 0 } },
} satisfies Components<Theme>['MuiAvatar'];
