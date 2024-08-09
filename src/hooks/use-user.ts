/**
 * 这个文件是一个自定义的React Hook，用于获取用户上下文。
 * 它使用了React的useContext Hook来获取UserContext，并返回UserContext的值。
 * 如果没有找到UserContext，将抛出一个错误。
 *
 * @returns {UserContextValue} 用户上下文的值
 * @throws {Error} 如果没有找到UserProvider，则抛出错误
 */

import * as React from 'react';
import type { UserContextValue } from '@/contexts/user-context';
import { UserContext } from '@/contexts/user-context';

export function useUser(): UserContextValue {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}
