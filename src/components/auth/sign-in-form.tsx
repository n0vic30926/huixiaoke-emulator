/**
 * 这个文件包含了一个登录表单组件 `SignInForm`，用于用户登录操作。
 * 
 * @remarks
 * 重要变量：
 * - `defaultValues`：表单的默认值，包括邮箱地址和密码。
 * - `schema`：用于验证表单输入的 Zod 模式。
 * - `router`：用于导航到其他页面的 Next.js 路由对象。
 * - `showPassword`：控制密码输入框是否显示明文密码。
 * - `isPending`：表示登录请求是否正在进行中。
 * 
 * 重要函数：
 * - `onSubmit`：表单提交时的处理函数，用于进行登录操作。
 * - `useUser`：自定义 Hook，用于获取用户信息和检查会话状态。
 * 
 * @packageDocumentation
 */

'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  email: zod.string().min(1, { message: '邮箱地址不能为空' }).email(),
  password: zod.string().min(1, { message: '密码不能为空' }),
});

type Values = zod.infer<typeof schema>;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const { setUser } = useUser();  // 获取setUser方法



  const [showPassword, setShowPassword] = React.useState<boolean>();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
  
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error logging in');
        }

        try {
          const userData = await response.json();
        
          if (setUser) {
            setUser(userData.user as UserType);  // 传入符合 UserType 的对象
          } else {
            //
          }
        } catch {
          // 你可以在这里进行额外的错误处理，例如显示错误消息或采取其他操作
        }
        router.push(paths.home);  // Redirect to the homepage
      } catch (error) {
        setError('root', { type: 'server', message: (error as Error).message });
      } finally {
        setIsPending(false);
      }
    },
    [router, setUser, setError]
  );
  
  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">登录</Typography>
        <Typography color="text.secondary" variant="body2">
          还没有注册？{' '}
          <Link component={RouterLink} href={paths.auth.signUp} underline="hover" variant="subtitle2">
            注册
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>邮箱地址</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>密码</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <div>
            <Link component={RouterLink} href={paths.auth.resetPassword} variant="subtitle2">
              忘记密码？
            </Link>
          </div>
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            登录
          </Button>
        </Stack>
      </form>
      <Alert color="warning">
        使用已注册账户{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          zhengxin@test.com
        </Typography>{' '}
        和对应密码{' '}
        <Typography component="span" sx={{ fontWeight: 700 }} variant="inherit">
          zhengxin
        </Typography>
        进行登录，            
        或前往注册页面创建新账户进行测试
      </Alert>
    </Stack>
  );
}
