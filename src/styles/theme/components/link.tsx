/**
 * 这个文件是用来定义 MuiLink 组件的默认属性的。
 * MuiLink 组件是 Material-UI 中的链接组件。
 * 它具有一个默认属性 `underline`，当鼠标悬停在链接上时会显示下划线。
 */

import type { Components } from '@mui/material/styles';
import type { Theme } from '../types';

export const MuiLink = { defaultProps: { underline: 'hover' } } satisfies Components<Theme>['MuiLink'];
