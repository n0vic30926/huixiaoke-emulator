/**
 * 这个文件是左侧导航栏的组件，用于显示网站的导航菜单。
 *
 * @remarks
 * 该组件包含以下功能：
 * - 显示网站的Logo
 * - 显示工作区信息
 * - 渲染导航菜单项
 * - 显示Pro版本信息和链接
 * - 为网页端和移动端提供不同的展示方式
 * @packageDocumentation
 */

'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Link from 'next/link'; // 确保导入 Link 组件
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { ArrowSquareUpRight as ArrowSquareUpRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowSquareUpRight';
import { CaretUpDown as CaretUpDownIcon } from '@phosphor-icons/react/dist/ssr/CaretUpDown';

import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { Logo } from '@/components/core/logo';

import { navItems } from './config';
import { navIcons } from './nav-icons';

export function SideNav(): React.JSX.Element {
  const pathname = usePathname();

  return (
    <Box
      sx={{
        '--SideNav-background': '#f0f0f0',
        '--SideNav-color': 'var(--mui-palette-common-white)',
        '--NavItem-color': 'var(--mui-palette-neutral-300)',
        '--NavItem-hover-background': 'rgba(255, 255, 255, 0.04)',
        '--NavItem-active-background': 'var(--mui-palette-primary-main)',
        '--NavItem-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-disabled-color': 'var(--mui-palette-neutral-500)',
        '--NavItem-icon-color': 'var(--mui-palette-neutral-400)',
        '--NavItem-icon-active-color': 'var(--mui-palette-primary-contrastText)',
        '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
        bgcolor: 'var(--SideNav-background)',
        color: 'var(--SideNav-color)',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        left: 0,
        maxWidth: '100%',
        position: 'fixed',
        scrollbarWidth: 'none',
        top: 0,
        width: 'var(--SideNav-width)',
        zIndex: 'var(--SideNav-zIndex)',
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
          <Logo color="light" height={32} width={122} />
        </Box>
          <Button
            component={RouterLink}
            href={paths.createCharacter}  // 使用路径常量定义新建角色页面的URL
            variant="contained"
            color="primary"
            fullWidth
          >
            新建角色
          </Button>

          </Stack>
      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
        {renderNavItems({ pathname, items: navItems })}
      </Box>
      <Divider sx={{ borderColor: 'var(--mui-palette-neutral-700)' }} />
      <Stack spacing={2} sx={{ p: '12px' }}>
      <Typography color="text.primary" variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
        最近聊天
      </Typography>
        
        <Link href="/chat/yuelao" passHref>
          <Box sx={{ display: 'inline-flex' }}>
            <ChatItem 
              image="/assets/月老.png" 
              name="月老" 
              description="生命中遇到的人总能教会你些什么" 
              href = "/chat/yuelao"
            />
          </Box>
        </Link>
        <Link href="/chat/hongniang" passHref>
          <Box sx={{ display: 'inline-flex' }}>
            <ChatItem 
              image="/assets/红娘.png" 
              name="红娘" 
              description="红娘的形象在文学作品中经历了从模糊到具体的发展过程" 
              href = "/chat/hongniang"
            />
          </Box>
        </Link>

      </Stack>
    </Box>
  );
}

function ChatItem({ image, name, description, href }: { image: string; name: string; description: string; href: string }) {
  return (
    <Box
      component={RouterLink}
      href={href}
      sx={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        mb: 2,
        p: 1,
        borderRadius: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
      }}
    >
      <Avatar src={image} sx={{ width: 48, height: 48, mr: 2 }} />
      <Box>
      <Typography variant="body1" color="text.primary" sx={{ fontWeight: 'bold' }}>
        {name}
      </Typography>
        <Typography variant="body2" color="#B0B0B0">
          {description}
        </Typography>
      </Box>
    </Box>
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
