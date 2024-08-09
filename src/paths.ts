/**
 * 这个文件定义了一个名为 `paths` 的常量对象，用于存储应用程序中的路径信息。
 * 
 * @remarks
 * `paths` 对象包含了应用程序中各个页面的路径，以及一些错误页面的路径。
 * 
 * @example
 * ```typescript
 * import { paths } from './paths';
 * 
 * console.log(paths.home); // '/'
 * console.log(paths.auth.signIn); // '/auth/sign-in'
 * console.log(paths.dashboard.overview); // '/dashboard'
 * console.log(paths.errors.notFound); // '/errors/not-found'
 * ```
 */

export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
