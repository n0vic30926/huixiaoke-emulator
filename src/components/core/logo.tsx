/**
 * 这个文件包含了 Logo 组件和 DynamicLogo 组件的定义。
 * Logo 组件用于显示一个 Logo 图标，可以设置颜色、是否显示徽标、高度和宽度。
 * DynamicLogo 组件根据当前的颜色方案动态显示 Logo 图标，可以设置亮色和暗色的颜色、是否显示徽标、高度和宽度。
 */

'use client';

import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';
import { NoSsr } from '@/components/core/no-ssr';
import { Box, Typography } from '@mui/material'; // 确保导入 Typography 组件
import { useTheme } from '@mui/material/styles';


const HEIGHT = 60;
const WIDTH = 60;

type Color = 'dark' | 'light';

export interface LogoProps {
  color?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}
export function Logo({ color = 'light', emblem, height = HEIGHT, width = WIDTH }: LogoProps): React.JSX.Element {
  let url: string;

  if (emblem) {
    url = color === 'light' ? '/assets/zhengjian.png' : '/assets/zhengjian.png';
  } else {
    url = color === 'light' ? '/assets/zhengjian.png' : '/assets/zhengjian.png';
  }

  // 设置字体颜色，基于传入的 color 参数
  const textColor = color === 'light' ? 'black' : 'white';

  return (
    <Box display="flex" alignItems="center">
      <Box
        alt="logo"
        component="img"
        height={height}
        width={width}
        src={url}
        sx={{
          objectFit: 'contain',
          display: 'block',
          maxHeight: '100%',
          maxWidth: '100%',
          mr: -4, // 图标和标题之间的间距
          position: 'relative', // 使用定位进行调整
          left: '-30px', // 向左移动图标
        }}
      />
      <Typography 
        variant="h6" 
        component="div"
        sx={{ 
          fontWeight: 'bold', 
          color: textColor, // 明确设置字体颜色
        }}
      >
        慧小可模拟器
      </Typography>
    </Box>
  );
}

export function DynamicLogo({
  colorDark = 'light',
  colorLight = 'dark',
  height = HEIGHT,
  width = WIDTH,
  ...props
}: DynamicLogoProps): React.JSX.Element {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? colorDark : colorLight;

  return (
    <NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
      <Logo color={color} height={height} width={width} {...props} />
    </NoSsr>
  );
}
