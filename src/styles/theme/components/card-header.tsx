/**
 * 这个文件是用于定义 MuiCardHeader 组件的样式和默认属性的。
 * MuiCardHeader 组件是 Material-UI 中的一个卡片头部组件。
 * 它包含了标题和副标题，并可以通过样式覆盖来自定义外观。
 *
 * @module styles/theme/components/card-header
 */

import type { Components } from '@mui/material/styles';
import type { Theme } from '../types';

export const MuiCardHeader = {
  defaultProps: { titleTypographyProps: { variant: 'h6' }, subheaderTypographyProps: { variant: 'body2' } },
  styleOverrides: { root: { padding: '32px 24px 16px' } },
} satisfies Components<Theme>['MuiCardHeader'];
