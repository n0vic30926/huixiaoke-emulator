/**
 * 这个文件是账户信息组件的实现。
 * 
 * @remarks
 * 这个组件用于显示用户的账户信息，包括姓名、头像、职位、所在国家和城市、时区等。
 * 
 * @public
 */

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const user = {
  name: '慧小可用户',
  avatar: '/assets/avatar.png',
  // jobTitle: 'Senior Developer',
  country: '中国',
  city: '大陆',
  // timezone: 'GTM-7',
} as const;

export function AccountInfo(): React.JSX.Element {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <div>
            <Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }} />
          </div>
          <Stack spacing={1} sx={{ textAlign: 'center' }}>
            <Typography variant="h5">{user.name}</Typography>
            <Typography color="text.secondary" variant="body2">
             {user.country} {user.city} 
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <CardActions>
        <Button fullWidth variant="text">
          上传头像
        </Button>
      </CardActions>
    </Card>
  );
}
