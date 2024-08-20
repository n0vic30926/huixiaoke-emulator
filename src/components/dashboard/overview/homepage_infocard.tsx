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
import Box from '@mui/material/Box';
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
            <Chip key={tag} label={tag} variant="outlined" />
          ))}
        </Stack>
        {/* 文字与开始聊天水平对齐 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Avatar src={creatorAvatar} alt={creator} />
            <Typography variant="body2" color="text.secondary">
              Created by {creator}
            </Typography>
          </Stack>
          <Button 
            variant="contained" 
            color="primary" 
            href={link} 
          >
            开始聊天
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}



