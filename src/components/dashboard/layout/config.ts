/**
 * 这个文件包含了仪表盘布局中左侧导航栏的配置。
 * 它导出了一个对象数组，表示每个导航项。
 * 每个导航项都有 key、title、href 和 icon 等属性。
 * `navItems` 数组符合 `NavItemConfig` 接口。
 */

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: '主页', href: paths.dashboard.overview, icon: 'chart-pie' },
  // { key: 'customers', title: '我的角色', href: paths.myCharacters, icon: 'users' },
  // { key: 'integrations', title: 'Integrations', href: paths.dashboard.integrations, icon: 'plugs-connected' },
  // { key: 'settings', title: '设置', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: '账户', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
