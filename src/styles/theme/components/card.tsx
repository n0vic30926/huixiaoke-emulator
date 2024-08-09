/**
 * 这个文件是用来定义 MuiCard 组件的样式覆盖。
 * MuiCard 是一个 Material-UI 的卡片组件。
 * 通过对根元素的样式进行覆盖，实现了卡片的圆角和阴影效果。
 * 
 * @fileoverview
 * - 导入了 `@mui/material/Paper` 模块的 `paperClasses` 对象，用于获取卡片的阴影样式类名。
 * - 导入了 `@mui/material/styles` 模块的 `Components` 类型和 `Theme` 类型。
 * - 定义了 `MuiCard` 对象，包含了对卡片组件样式的覆盖。
 * - `MuiCard` 对象满足 `Components<Theme>['MuiCard']` 类型。
 */

import { paperClasses } from '@mui/material/Paper';
import type { Components } from '@mui/material/styles';
import type { Theme } from '../types';

export const MuiCard = {
  styleOverrides: {
    root: ({ theme }) => {
      return {
        borderRadius: '20px',
        [`&.${paperClasses.elevation1}`]: {
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 5px 22px 0 rgba(0, 0, 0, 0.24), 0 0 0 1px rgba(255, 255, 255, 0.12)'
              : '0 5px 22px 0 rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.06)',
        },
      };
    },
  },
} satisfies Components<Theme>['MuiCard'];
