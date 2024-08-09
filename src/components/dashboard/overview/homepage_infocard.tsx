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
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SxProps } from '@mui/material/styles';

export interface InfoCardProps {
  sx?: SxProps;
  image: string;
  title: string;
  description: string;
  tags: string[];
  creator: string;
  creatorAvatar: string;
}

export function InfoCard({
  sx,
  image,
  title,
  description,
  tags,
  creator,
  creatorAvatar
}: InfoCardProps): React.JSX.Element {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', width: '600px', height: '100%', ...sx }}>
      <CardMedia
        component="img"
        image={image}
        alt={title}
        sx={{ height: 700, objectFit: 'cover' }} // 修改了图片的高度和填充方式
      />
      <CardContent sx={{ flexGrow: 1 }}> {/* 使CardContent能够填充剩余空间 */}
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {tags.map((tag) => (
            <Button key={tag} variant="outlined" size="small">
              {tag}
            </Button>
          ))}
        </Stack>
        <Stack direction="row" spacing={1} sx={{ mt: 2, alignItems: 'center' }}>
          <Avatar src={creatorAvatar} alt={creator} />
          <Typography variant="body2" color="text.secondary">
            Create by {creator}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}


