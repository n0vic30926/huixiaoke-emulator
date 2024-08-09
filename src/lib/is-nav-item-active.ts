/**
 * 此文件包含一个用于判断导航项是否处于活动状态的函数。
 * 
 * @remarks
 * 该函数接受一个 `NavItemConfig` 对象和一个 `pathname` 字符串作为参数，并返回一个布尔值，指示导航项是否处于活动状态。
 * 
 * @param options - 导航项配置对象和当前路径的部分属性。
 * @param options.disabled - 导航项是否被禁用。
 * @param options.external - 导航项是否为外部链接。
 * @param options.href - 导航项的链接地址。
 * @param options.matcher - 导航项的匹配器对象。
 * @param options.pathname - 当前路径。
 * @returns 一个布尔值，指示导航项是否处于活动状态。
 */

import type { NavItemConfig } from '@/types/nav';

export function isNavItemActive({
  disabled,
  external,
  href,
  matcher,
  pathname,
}: Pick<NavItemConfig, 'disabled' | 'external' | 'href' | 'matcher'> & { pathname: string }): boolean {
  if (disabled || !href || external) {
    return false;
  }

  if (matcher) {
    if (matcher.type === 'startsWith') {
      return pathname.startsWith(matcher.href);
    }

    if (matcher.type === 'equals') {
      return pathname === matcher.href;
    }

    return false;
  }

  return pathname === href;
}
