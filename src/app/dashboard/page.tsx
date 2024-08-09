/**
 * 这个文件是仪表板页面的组件，用于显示仪表板的概览信息。
 * 
 * 重要信息：
 * - 导入了一些第三方库和组件，如 React、@mui/material、dayjs 等。
 * - 导入了一些自定义的组件，如 Budget、LatestOrders、LatestProducts 等。
 * - 定义了一个 metadata 对象，用于设置页面的标题。
 * - 导出了一个名为 Page 的默认函数组件，用于渲染仪表板页面的内容。
 * 
 */
import * as React from 'react';
import type { Metadata } from 'next';
import Grid from '@mui/material/Unstable_Grid2';
import { config } from '@/config';
import { InfoCard } from '@/components/dashboard/overview/homepage_infocard';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Grid container spacing={2}>
      <Grid  lg={6} sm={12} xs={12} display="flex" justifyContent="center">
        <InfoCard 
          sx={{ height: '100%', maxWidth: '500px' }} 
          image="/assets/月老.png" 
          title="月老" 
          description="月老，别名柴道煌，民间又称月下老人、月下老儿，是汉族民间传说中主管婚姻的红喜神"
          tags={['传统文化', '情感']} 
          creator="张三" 
          creatorAvatar="/assets/avatar-1.png" 
        />
      </Grid>
      <Grid  lg={6} sm={12} xs={12} display="flex" justifyContent="center">
        <InfoCard 
          sx={{ height: '100%', maxWidth: '500px' }} 
          image="/assets/红娘.png" 
          title="红娘" 
          description="红娘的形象在文学作品中经历了从模糊到具体的发展过程，‌从《‌莺莺传》‌中的次要角色，‌到《‌西厢记》‌中的..."
          tags={['传统文化', '情感']} 
          creator="张三" 
          creatorAvatar="/assets/avatar-1.png" 
        />
      </Grid>
    </Grid>
  );
}

