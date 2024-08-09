/**
 * 这个文件是用于注册页面的组件。
 * 
 * @remarks
 * 这个组件导出了一个默认的函数组件 `Page`，用于渲染注册页面。
 * 
 * @public
 */

import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';
import { SignUpForm } from '@/components/auth/sign-up-form';

export const metadata = { title: `Sign up | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <SignUpForm />
      </GuestGuard>
    </Layout>
  );
}
