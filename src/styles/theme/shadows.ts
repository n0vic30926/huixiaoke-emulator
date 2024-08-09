/**
 * 这个文件定义了阴影的样式数组。
 * 
 * @module shadows
 * @remarks
 * 这个模块导出了一个名为 `shadows` 的数组，用于定义阴影的样式。
 * 数组中的每个元素都是一个字符串，表示不同的阴影效果。
 * 
 * @typedef {string[]} Shadows
 * @memberof module:shadows
 * @summary
 * `Shadows` 是一个字符串数组，用于定义阴影的样式。
 * 
 * @example
 * import type { Shadows } from '@mui/material/styles/shadows';
 * 
 * export const shadows: Shadows = [
 *   'none',
 *   '0px 1px 2px rgba(0, 0, 0, 0.08)',
 *   '0px 1px 5px rgba(0, 0, 0, 0.08)',
 *   // ...
 *   '0px 9px 46px rgba(0, 0, 0, 0.08)',
 * ];
 */

import type { Shadows } from '@mui/material/styles/shadows';

export const shadows = [
  'none',
  '0px 1px 2px rgba(0, 0, 0, 0.08)',
  '0px 1px 5px rgba(0, 0, 0, 0.08)',
  '0px 1px 8px rgba(0, 0, 0, 0.08)',
  '0px 1px 10px rgba(0, 0, 0, 0.08)',
  '0px 1px 14px rgba(0, 0, 0, 0.08)',
  '0px 1px 18px rgba(0, 0, 0, 0.08)',
  '0px 2px 16px rgba(0, 0, 0, 0.08)',
  '0px 3px 14px rgba(0, 0, 0, 0.08)',
  '0px 3px 16px rgba(0, 0, 0, 0.08)',
  '0px 4px 18px rgba(0, 0, 0, 0.08)',
  '0px 4px 20px rgba(0, 0, 0, 0.08)',
  '0px 5px 22px rgba(0, 0, 0, 0.08)',
  '0px 5px 24px rgba(0, 0, 0, 0.08)',
  '0px 5px 26px rgba(0, 0, 0, 0.08)',
  '0px 6px 28px rgba(0, 0, 0, 0.08)',
  '0px 6px 30px rgba(0, 0, 0, 0.08)',
  '0px 6px 32px rgba(0, 0, 0, 0.08)',
  '0px 7px 34px rgba(0, 0, 0, 0.08)',
  '0px 7px 36px rgba(0, 0, 0, 0.08)',
  '0px 8px 38px rgba(0, 0, 0, 0.08)',
  '0px 8px 40px rgba(0, 0, 0, 0.08)',
  '0px 8px 42px rgba(0, 0, 0, 0.08)',
  '0px 9px 44px rgba(0, 0, 0, 0.08)',
  '0px 9px 46px rgba(0, 0, 0, 0.08)',
] satisfies Shadows;
