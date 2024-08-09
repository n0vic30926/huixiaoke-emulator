/**
 * 这个文件定义了一个名为 NoSsr 的 React 组件。
 * NoSsr 组件用于在客户端渲染时延迟加载子组件，以提高性能。
 * 
 * @remarks
 * 重要变量和函数：
 * - `children`：子组件，要延迟加载的内容。
 * - `defer`：是否延迟加载子组件的标志。
 * - `fallback`：在延迟加载期间显示的备用内容。
 * - `NoSsr`：NoSsr 组件的函数定义。
 * - `setMountedState`：用于设置组件是否已挂载的状态的函数。
 * 
 * @param props - NoSsr 组件的属性。
 * @returns 返回一个 React 元素，根据组件是否已挂载来渲染子组件或备用内容。
 * 
 * @example
 * ```tsx
 * import { NoSsr } from './no-ssr';
 * 
 * function App() {
 *   return (
 *     <NoSsr defer={true} fallback={<div>Loading...</div>}>
 *       <ChildComponent />
 *     </NoSsr>
 *   );
 * }
 * ```
 */

'use client';

import * as React from 'react';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';

export interface NoSsrProps {
  children?: React.ReactNode;
  defer?: boolean;
  fallback?: React.ReactNode;
}

// https://github.com/mui/material-ui/blob/master/packages/mui-base/src/NoSsr/NoSsr.tsx
// without prop-types
export function NoSsr(props: NoSsrProps): React.JSX.Element {
  const { children, defer = false, fallback = null } = props;
  const [mountedState, setMountedState] = React.useState(false);

  useEnhancedEffect((): void => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);

  React.useEffect((): void => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);

  return <React.Fragment>{mountedState ? children : fallback}</React.Fragment>;
}
