/**
 * 这个文件定义了 MuiStack 组件的默认属性。
 * MuiStack 组件是一个使用了 flex gap 的堆叠组件。
 */

import type { Components } from '@mui/material/styles';
import type { Theme } from '../types';

export const MuiStack = { defaultProps: { useFlexGap: true } } satisfies Components<Theme>['MuiStack'];
