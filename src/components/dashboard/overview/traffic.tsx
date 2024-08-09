/**
 * 这个文件包含了 Traffic 组件的定义和相关函数。
 * Traffic 组件用于显示流量来源的统计信息。
 * 
 * @remarks
 * - `TrafficProps` 接口定义了组件的属性，包括 `chartSeries` 和 `labels`。
 * - `chartSeries` 是一个数字数组，表示不同来源的流量百分比。
 * - `labels` 是一个字符串数组，表示不同来源的标签。
 * - `Traffic` 组件接受 `chartSeries`、`labels` 和 `sx` 属性，并返回一个 JSX 元素。
 * - `useChartOptions` 函数根据标签生成 ApexCharts 的配置选项。
 */

'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Desktop as DesktopIcon } from '@phosphor-icons/react/dist/ssr/Desktop';
import { DeviceTablet as DeviceTabletIcon } from '@phosphor-icons/react/dist/ssr/DeviceTablet';
import { Phone as PhoneIcon } from '@phosphor-icons/react/dist/ssr/Phone';
import type { ApexOptions } from 'apexcharts';

import { Chart } from '@/components/core/chart';

const iconMapping = { Desktop: DesktopIcon, Tablet: DeviceTabletIcon, Phone: PhoneIcon } as Record<string, Icon>;

export interface TrafficProps {
  chartSeries: number[];
  labels: string[];
  sx?: SxProps;
}

export function Traffic({ chartSeries, labels, sx }: TrafficProps): React.JSX.Element {
  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="Traffic source" />
      <CardContent>
        <Stack spacing={2}>
          <Chart height={300} options={chartOptions} series={chartSeries} type="donut" width="100%" />
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'center' }}>
            {chartSeries.map((item, index) => {
              const label = labels[index];
              const Icon = iconMapping[label];

              return (
                <Stack key={label} spacing={1} sx={{ alignItems: 'center' }}>
                  {Icon ? <Icon fontSize="var(--icon-fontSize-lg)" /> : null}
                  <Typography variant="h6">{label}</Typography>
                  <Typography color="text.secondary" variant="subtitle2">
                    {item}%
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

function useChartOptions(labels: string[]): ApexOptions {
  const theme = useTheme();

  return {
    chart: { background: 'transparent' },
    colors: [theme.palette.primary.main, theme.palette.success.main, theme.palette.warning.main],
    dataLabels: { enabled: false },
    labels,
    legend: { show: false },
    plotOptions: { pie: { expandOnClick: false } },
    states: { active: { filter: { type: 'none' } }, hover: { filter: { type: 'none' } } },
    stroke: { width: 0 },
    theme: { mode: theme.palette.mode },
    tooltip: { fillSeriesColor: false },
  };
}
