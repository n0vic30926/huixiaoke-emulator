/**
 * 这个文件是用于重置密码页面的组件。
 * 
 * @remarks
 * 这个组件导出了一个默认的函数组件 `Page`，用于渲染重置密码页面。
 * 
 * @public
 */

import * as React from 'react';
import type { Metadata } from 'next';

import { config } from '@/config';
import { GuestGuard } from '@/components/auth/guest-guard';
import { Layout } from '@/components/auth/layout';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';

export const metadata = { title: `Reset password | Auth | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Layout>
      <GuestGuard>
        <ResetPasswordForm />
      </GuestGuard>
    </Layout>
  );
}
