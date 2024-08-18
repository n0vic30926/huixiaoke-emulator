/**
 * 这个文件是用户上下文的定义和提供者。
 * 它导出了一个名为`UserContext`的React上下文，用于在应用程序中共享用户信息。
 * `UserContext`提供了一个名为`checkSession`的方法，用于检查用户会话并更新上下文状态。
 * `UserProvider`组件是`UserContext`的提供者，它使用React的`useState`和`useEffect`钩子来管理上下文状态。
 * 它还导出了一个名为`UserConsumer`的消费者，用于在应用程序中访问`UserContext`的值。
 */

'use client';

import * as React from 'react';
import type { User } from '@/types/user';
import { authClient } from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
  setUser?: (user: User | null) => void; // 新增
}

export const UserContext = React.createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = React.useState<UserContextValue>({
    user: null,
    error: null,
    isLoading: true,
  });

  const checkSession = React.useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await authClient.getUser();

      if (error) {
        logger.error(error);
        setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
        return;
      }

      setState((prev) => ({ ...prev, user: data ?? null, error: null, isLoading: false }));
    } catch (err) {
      logger.error(err);
      setState((prev) => ({ ...prev, user: null, error: 'Something went wrong', isLoading: false }));
    }
  }, []);

  // 新增的 setUser 函数，用于手动设置用户信息
  const setUser = React.useCallback((user: User | null): void => {
    setState((prev) => ({ ...prev, user, isLoading: false, error: null }));
  }, []);

  React.useEffect(() => {
    checkSession().catch((err: unknown) => {
      logger.error(err);
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return (
    <UserContext.Provider value={{ ...state, checkSession, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const UserConsumer = UserContext.Consumer;
