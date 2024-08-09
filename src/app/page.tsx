/**
 * 这个文件是一个页面组件，用于重定向到仪表盘页面。
 * 
 * @remarks
 * 这个页面组件使用了 `next/navigation` 中的 `redirect` 函数来进行重定向。
 * 当页面被加载时，它会立即重定向到 `/dashboard` 页面。
 * 
 * @returns
 * 该函数没有返回值，它的返回类型被指定为 `never`，表示该函数永远不会正常返回。
 */

import { redirect } from 'next/navigation';

export default function Page(): never {
  redirect('/dashboard');
}
