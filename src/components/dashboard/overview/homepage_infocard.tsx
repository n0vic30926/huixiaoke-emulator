/**
 * 这个文件包含了一个名为 TotalProfit 的组件。
 * TotalProfit 组件用于显示总利润信息。
 *
 * @component
 * @example
 * ```tsx
 * <TotalProfit value="1000" />
 * ```
 */

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import { SxProps } from '@mui/material/styles';

export interface InfoCardProps {
  sx?: SxProps;
  image: string;
  title: string;
  description: string;
  tags: string[];
  creator: string;
  creatorAvatar: string;
  link: string;
}

export function InfoCard({
  sx,
  image,
  title,
  description,
  tags,
  creator,
  creatorAvatar,
  link

}: InfoCardProps): React.JSX.Element {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: '600px', height: '100%', position: 'relative', ...sx }}>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ height: 600, objectFit: 'cover' }} 
      />
      <CardContent sx={{ flexGrow: 1 }}> 
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {tags.map((tag) => (
            <Chip key={tag} label={tag} variant="outlined" /> // 使用Chip组件代替Button，成为不可点击的标签
          ))}
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2, alignItems: 'center' }}>
          <Avatar src={creatorAvatar} alt={creator} />
          <Typography variant="body2" color="text.secondary">
            Create by {creator}
          </Typography>
        </Stack>
      </CardContent>
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ position: 'absolute', bottom: 30, right: 40 }} 
        href  =  {link} // 替换为实际的聊天页面URL
      >
        开始聊天
      </Button>
    </Card>
  );
}



