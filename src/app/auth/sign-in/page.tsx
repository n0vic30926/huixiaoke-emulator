/**
 * 这个文件是用于处理用户登录页面的组件。
 * 
 * @remarks
 * 这个文件包含了一个名为 `Page` 的函数组件，用于渲染用户登录页面。
 * 页面包含了一个 `Layout` 组件，用于提供整体布局，以及一个 `GuestGuard` 组件，用于保护只允许未登录用户访问的内容。
 * 在 `GuestGuard` 组件内部，使用了 `SignInForm` 组件，用于展示登录表单。
 * 
 * @packageDocumentation
 */

import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';
import { SignInForm } from '@/components/auth/sign-in-form';

export const metadata = { title: `Sign in | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <SignInForm />
      </GuestGuard>
    </Layout>
  );
}
