/**
 * 这个文件是仪表板布局组件，用于渲染仪表板页面的布局结构。
 * 
 * @remarks
 * 重要信息：
 * - 该组件接受一个名为`children`的React节点作为props，用于渲染仪表板页面的内容。
 * - 该组件依赖于`AuthGuard`组件，用于验证用户权限。
 * - 该组件使用了`@mui/material`库中的`Box`、`Container`和`GlobalStyles`组件。
 * - 该组件还使用了自定义的`MainNav`和`SideNav`组件。
 * 
 * @param children - 用于渲染仪表板页面的内容的React节点。
 * @returns 渲染出的仪表板页面的布局结构。
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import { AuthGuard } from '@/components/auth/auth-guard';
import { MainNav } from '@/components/dashboard/layout/main-nav';
import { SideNav } from '@/components/dashboard/layout/side-nav';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <AuthGuard>
      <GlobalStyles
        styles={{
          body: {
            '--MainNav-height': '56px',
            '--MainNav-zIndex': 1000,
            '--SideNav-width': '280px',
            '--SideNav-zIndex': 1100,
            '--MobileNav-width': '320px',
            '--MobileNav-zIndex': 1100,
          },
        }}
      />
      <Box
        sx={{
          bgcolor: 'var(--mui-palette-background-default)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
        }}
      >
        <SideNav />
        <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', pl: { lg: 'var(--SideNav-width)' } }}>
          <MainNav />
          <main>
            <Container maxWidth="xl" sx={{ py: '64px' }}>
              {children}
            </Container>
          </main>
        </Box>
      </Box>
    </AuthGuard>
  );
}
