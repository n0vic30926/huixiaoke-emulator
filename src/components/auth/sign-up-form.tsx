/**
 * 这个文件包含了一个名为 SignUpForm 的 React 组件，用于展示注册表单。
 * 
 * @remarks
 * 这个组件依赖于以下第三方库：
 * - `react`
 * - `next/link`
 * - `next/navigation`
 * - `@hookform/resolvers/zod`
 * - `@mui/material`
 * - `react-hook-form`
 * - `zod`
 * 
 * @remarks
 * 重要变量：
 * - `defaultValues`：表单的默认值对象，包含了 `firstName`、`lastName`、`email`、`password` 和 `terms` 字段。
 * - `schema`：用于验证表单字段的 Zod 模式对象。
 * - `Values`：根据 `schema` 推断出的表单值类型。
 * 
 * @remarks
 * 重要函数：
 * - `onSubmit`：表单提交时的回调函数，用于处理表单数据的提交逻辑。
 * 
 * @public
 */

'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  firstName: zod.string().min(1, { message: 'First name is required' }),
  lastName: zod.string().min(1, { message: 'Last name is required' }),
  email: zod.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email address' }),
  password: zod.string()
    .min(6, { message: 'Password should be at least 6 characters' })
    .max(18, { message: 'Password should be no more than 18 characters' }),
  terms: zod.boolean().refine((value) => value, 'You must accept the terms and conditions'),
});


type Values = zod.infer<typeof schema>;

const defaultValues = { firstName: '', lastName: '', email: '', password: '', terms: false } satisfies Values;

export function SignUpForm(): React.JSX.Element {
  const router = useRouter();

  const { checkSession } = useUser();

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const { setUser } = useUser();

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);
  
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error registering user');
        }
  
        const userData = await response.json();
        setUser(userData.user);  // 可被忽略的error
  
        // Redirect to the homepage
        router.push(paths.home);
      } catch (error) {
        if (error instanceof zod.ZodError) {
          setError('root', { type: 'validation', message: error.errors.map(e => e.message).join(', ') });
        } else if (error instanceof Error) {
          setError('root', { type: 'server', message: error.message });
        } else {
          setError('root', { type: 'server', message: String(error) });
        }
      } finally {
        setIsPending(false);
      }
    },
    [router, setError, setUser]
  );
  
  

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">注册</Typography>
        <Typography color="text.secondary" variant="body2">
          已经拥有账户？{' '}
          <Link component={RouterLink} href={paths.auth.signIn} underline="hover" variant="subtitle2">
            登录
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.firstName)}>
                <InputLabel>名</InputLabel>
                <OutlinedInput {...field} label="First name" />
                {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.firstName)}>
                <InputLabel>姓</InputLabel>
                <OutlinedInput {...field} label="Last name" />
                {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
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
                <OutlinedInput {...field} label="Password" type="password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <React.Fragment>
                      我已经阅读并同意<Link>条款和声明</Link>
                    </React.Fragment>
                  }
                />
                {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
              </div>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            注册
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
