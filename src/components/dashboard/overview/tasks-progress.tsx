/**
 * 这个文件包含了一个名为 TasksProgress 的组件。
 * TasksProgress 组件用于显示任务进度的卡片。
 * 
 * @remarks
 * 该组件接受以下属性：
 * - `value`：任务进度的值，取值范围为 0 到 100。
 * - `sx`：可选的样式属性。
 * 
 * @param value - 任务进度的值。
 * @param sx - 可选的样式属性。
 * @returns 一个 React 元素，用于显示任务进度的卡片。
 */

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { ListBullets as ListBulletsIcon } from '@phosphor-icons/react/dist/ssr/ListBullets';

export interface TasksProgressProps {
  sx?: SxProps;
  value: number;
}

export function TasksProgress({ value, sx }: TasksProgressProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" gutterBottom variant="overline">
                Task Progress
              </Typography>
              <Typography variant="h4">{value}%</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-warning-main)', height: '56px', width: '56px' }}>
              <ListBulletsIcon fontSize="var(--icon-fontSize-lg)" />
            </Avatar>
          </Stack>
          <div>
            <LinearProgress value={value} variant="determinate" />
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
}
