
/**
 * 这个文件是一个布局组件，用于渲染应用程序的整体布局。
 * 它导入了一些必要的依赖项，并提供了一个 `Layout` 组件，接受一个 `children` 属性作为子元素。
 * `Layout` 组件将子元素包装在一个 HTML 页面中，并提供了一些上下文提供者，如 `LocalizationProvider`、`UserProvider` 和 `ThemeProvider`。
 * 
 * @param children - 子元素，将被包装在布局组件中。
 * @returns 渲染的布局组件。
 */

import * as React from 'react';
import type { Viewport } from 'next';
import '@/styles/global.css';
import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
          <UserProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </UserProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
