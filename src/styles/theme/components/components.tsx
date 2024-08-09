/**
 * 这个文件定义了组件的类型和主题。
 * 
 * @module components
 * @remarks
 * 这个模块导出了一个名为 `components` 的对象，它包含了各种组件的类型。
 * 这些组件的类型是通过 `Components` 泛型来定义的，该泛型接受一个 `Theme` 类型作为参数。
 * 通过将这些组件类型导出，可以在其他文件中使用它们来定义组件的样式。
 */

import type { Components } from '@mui/material/styles';
import type { Theme } from '../types';
import { MuiAvatar } from './avatar';
import { MuiButton } from './button';
import { MuiCard } from './card';
import { MuiCardContent } from './card-content';
import { MuiCardHeader } from './card-header';
import { MuiLink } from './link';
import { MuiStack } from './stack';
import { MuiTab } from './tab';
import { MuiTableBody } from './table-body';
import { MuiTableCell } from './table-cell';
import { MuiTableHead } from './table-head';

export const components = {
  MuiAvatar,
  MuiButton,
  MuiCard,
  MuiCardContent,
  MuiCardHeader,
  MuiLink,
  MuiStack,
  MuiTab,
  MuiTableBody,
  MuiTableCell,
  MuiTableHead,
} satisfies Components<Theme>;
