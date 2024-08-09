/**
 * 这个文件是用于定制化 MuiTableBody 组件的样式。
 * MuiTableBody 是 Material-UI 中的一个表格组件。
 * 该文件导出了一个对象 MuiTableBody，其中包含了对 root 样式的定制化。
 * 通过修改 root 样式，可以实现对表格 body 的样式调整。
 * 该文件依赖了以下模块：
 * - @mui/material/styles
 * - @mui/material/TableCell
 * - @mui/material/TableRow
 * 该文件的类型定义了 Components<Theme>['MuiTableBody'] 类型。
 * 
 * @see [MuiTableBody API 文档](https://mui.com/api/table-body/)
 * @see [Material-UI 官方文档](https://mui.com/)
 */

import type { Components } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { tableRowClasses } from '@mui/material/TableRow';
import type { Theme } from '../types';

export const MuiTableBody = {
  styleOverrides: {
    root: {
      [`& .${tableRowClasses.root}:last-child`]: { [`& .${tableCellClasses.root}`]: { '--TableCell-borderWidth': 0 } },
    },
  },
} satisfies Components<Theme>['MuiTableBody'];
