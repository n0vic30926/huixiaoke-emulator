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

"use client";

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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useRouter } from 'next/navigation';
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
  sceneLink: string;  // 改为字符串类型
}

export function InfoCard({
  sx,
  image,
  title,
  description,
  tags,
  creator,
  creatorAvatar,
  link,
  sceneLink,
}: InfoCardProps): React.JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    handleSelect(sceneLink); // 将 sceneLink 传递给 handleSelect
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (scene: string) => {
    // 使用 sceneLink 作为基础路径
    router.push(`${sceneLink}`);
    // handleClose(); // 关闭下拉菜单
  };

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
        {/* 文字与按钮水平对齐 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <Avatar src={creatorAvatar} alt={creator} />
            <Typography variant="body2" color="text.secondary">
              Created by {creator}
            </Typography>
          </Stack>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button 
              variant="contained" 
              color="warning" // 设置剧情模式按钮为橙色
              onClick={handleClick}
              sx={{ paddingX: '14px', marginLeft: '14px' }}
            >
              剧情模式
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              href={link} 
              sx={{ ml: 2 }} // 添加一些间距
            >
              开始聊天
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
