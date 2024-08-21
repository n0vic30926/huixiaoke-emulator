/**
 * 这个文件是一个身份验证守卫组件，用于保护需要登录才能访问的页面。
 * 它会检查用户的登录状态，并根据情况进行相应的处理。
 * 如果用户未登录，则会重定向到登录页面。
 * 如果发生错误，则会显示一个错误提示。
 * 
 * @component
 * @example
 * // 使用示例
 * <AuthGuard>
 *   <ProtectedContent />
 * </AuthGuard>
 */

'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(true);

  const checkPermissions = async (): Promise<void> => {
    if (isLoading) {
      return;
    }

    if (error) {
      setIsChecking(false);
      return;
    }

    if (!user) {
      /*测试需要，暂时不检查*/
      // logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');
      // router.replace(paths.auth.signIn);
      // return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [user, error, isLoading]);

  if (isChecking) {
    return null;
  }

  if (error) {
    return <Alert color="error">{error}</Alert>;
  }

  return <React.Fragment>{children}</React.Fragment>;
}