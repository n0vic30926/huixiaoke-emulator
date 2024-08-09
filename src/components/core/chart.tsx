/**
 * 这个文件包含了一个名为 Chart 的组件。
 * Chart 组件是一个基于 react-apexcharts 的图表组件。
 * 它使用 styled-components 进行样式定制。
 * 
 * @component
 * @example
 * ```tsx
 * import { Chart } from './components/core/chart';
 * 
 * const MyChart = () => {
 *   return (
 *     <Chart options={chartOptions} series={chartSeries} />
 *   );
 * }
 * ```
 */

'use client';

import dynamic from 'next/dynamic';
import { styled } from '@mui/material/styles';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false, loading: () => null });

export const Chart = styled(ApexChart)``;
