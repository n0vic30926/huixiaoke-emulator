/**
 * @description 移动端导航栏组件，包含首页左上角和左下角 Logo、workspace和导航栏
 * 
 * @typedef {Object} NavItemConfig 导航项配置对象
 * @property {string} key 导航项的唯一标识
 * @property {string} title 导航项的标题
 * @property {string} href 导航项的链接地址
 * @property {string} icon 导航项的图标名称
 * @property {boolean} disabled 导航项是否禁用
 * @property {boolean} external 导航项是否为外部链接
 * @property {string} matcher 导航项的匹配规则
 * 
 * @typedef {Object} MobileNavProps 移动端导航栏组件的属性
 * @property {() => void} [onClose] 关闭导航栏的回调函数
 * @property {boolean} [open] 导航栏是否打开
 * @property {NavItemConfig[]} [items] 导航栏的导航项配置数组
 * 
 * @function MobileNav 移动端导航栏组件
 * @param {MobileNavProps} props 移动端导航栏组件的属性
 * @returns {JSX.Element} 移动端导航栏组件的 JSX 元素
 * 
 * @function renderNavItems 渲染导航项列表
 * @param {Object} options 渲染导航项列表的选项
 * @param {NavItemConfig[]} [options.items] 导航项配置数组
 * @param {string} options.pathname 当前路径名
 * @returns {JSX.Element} 导航项列表的 JSX 元素
 * 
 * @function NavItem 导航项组件
 * @param {NavItemProps} props 导航项组件的属性
 * @returns {JSX.Element} 导航项组件的 JSX 元素
 * 
 * @typedef {Object} NavItemProps 导航项组件的属性
 * @property {string} pathname 当前路径名
 * @property {boolean} [disabled] 导航项是否禁用
 * @property {boolean} [external] 导航项是否为外部链接
 * @property {string} [href] 导航项的链接地址
 * @property {string} [icon] 导航项的图标名称
 * @property {string} title 导航项的标题
 */

'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ArrowSquareUpRight as ArrowSquareUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareUpRight';
import { CaretUpDown as CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { Logo } from '@/components/core/logo';

import { navItems } from './config';
import { navIcons } from './nav-icons';

// 首页左上角和左下角 Logo，workspace和导航栏，移动端

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
  items?: NavItemConfig[];
}

export function MobileNav({ open, onClose }: MobileNavProps): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Drawer
      PaperProps={{
        sx: {
          '--MobileNav-background': 'var(--mui-palette-neutral-950)',
          '--MobileNav-color': 'var(--mui-palette-common-white)',
          '--NavItem-color': 'var(--mui-palette-neutral-300)',
          '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
          '--NavItem-active-background': 'var(--mui-palette-primary-main)',
          '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
          '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
          '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
          '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
          '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
          bgcolor: 'var(--MobileNav-background)',
          color: 'var(--MobileNav-color)',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          scrollbarWidth: 'none',
          width: 'var(--MobileNav-width)',
          zIndex: 'var(--MobileNav-zIndex)',
          '&::-webkit-scrollbar': { display: 'none' },
        },
      }}
      onClose={onClose}
      open={open}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
          <Logo color="light" height={32} width={122} />
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'var(--mui-palette-neutral-950)',
            border: '1px solid var(--mui-palette-neutral-700)',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'flex',
            p: '4px 12px',
          }}
        >
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography color="var(--mui-palette-neutral-400)" variant="body2">
              Workspace
            </Typography>
            <Typography color="inherit" variant="subtitle1">
              Devias
            </Typography>
          </Box>
          <CaretUpDownIcon />
        </Box>
      </Stack>
      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
        {renderNavItems({ pathname, items: navItems })}
      </Box>
      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
      <Stack spacing={2} sx={{ p: '12px' }}>
        <div>
          <Typography color="var(--mui-palette-neutral-100)" variant="subtitle2">
            Need more features?
          </Typography>
          <Typography color="var(--mui-palette-neutral-400)" variant="body2">
            Check out our Pro solution template.
          </Typography>
        </div>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            component="img"
            alt="Pro version"
            src="/assets/devias-kit-pro.png"
            sx={{ height: 'auto', width: '160px' }}
          />
        </Box>

      </Stack>
    </Drawer>
  );
}

function renderNavItems({ items = [], pathname }: { items?: NavItemConfig[]; pathname: string }): React.JSX.Element {
  const children = items.reduce((acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
    const { key, ...item } = curr;

    acc.push(<NavItem key={key} pathname={pathname} {...item} />);

    return acc;
  }, []);

  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

interface NavItemProps extends Omit<NavItemConfig, 'items'> {
  pathname: string;
}

function NavItem({ disabled, external, href, icon, matcher, pathname, title }: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null;

  return (
    <li>
      <Box
        {...(href
          ? {
              component: external ? 'a' : RouterLink,
              href,
              target: external ? '_blank' : undefined,
              rel: external ? 'noreferrer' : undefined,
            }
          : { role: 'button' })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--NavItem-color)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          position: 'relative',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--NavItem-disabled-background)',
            color: 'var(--NavItem-disabled-color)',
            cursor: 'not-allowed',
          }),
          ...(active && { bgcolor: 'var(--NavItem-active-background)', color: 'var(--NavItem-active-color)' }),
        }}
      >
        <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'center', flex: '0 0 auto' }}>
          {Icon ? (
            <Icon
              fill={active ? 'var(--NavItem-icon-active-color)' : 'var(--NavItem-icon-color)'}
              fontSize="var(--icon-fontSize-md)"
              weight={active ? 'fill' : undefined}
            />
          ) : null}
        </Box>
        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </li>
  );
}
