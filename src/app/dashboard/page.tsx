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
import Typography from '@mui/material/Typography';
import { config } from '@/config';
import { InfoCard } from '@/components/dashboard/overview/homepage_infocard';
import { paths } from '@/paths';

export const metadata = { title: `Overview | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const yuelaoSceneLink = paths.story.yuelao('scene1');  // 计算路径
  const hongniangSceneLink = paths.story.hongniang('scene1');  // 计算路径
  const xiongerSceneLink = paths.story.xionger('scene1');  // 计算路径

  return (
    <Grid container spacing={2}>
      <Grid xs={12} sx={{ mb: 2 }}>
        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
          热门角色
        </Typography>
      </Grid>
      <Grid xs={12} sm={6} display="flex" justifyContent="center">
        <InfoCard 
          sx={{
            height: { xs: 'auto', sm: 'auto' },
            maxWidth: { xs: '100%', sm: '500px' },
            width: '100%',
            padding: { xs: '8px', sm: '16px' },
            '& img': {
              width: { xs: '80px', sm: '100px' },
              height: { xs: '80px', sm: '100px' },
            },
            '& .MuiTypography-h5': {
              fontSize: { xs: '1rem', sm: '1.25rem' },
            },
            '& .MuiTypography-body2': {
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }
          }} 
          image="/assets/月老.png" 
          title="月老" 
          description="月老，别名柴道煌，民间又称月下老人、月下老儿，是汉族民间传说中主管婚姻的红喜神"
          tags={['传统文化', '情感']} 
          creator="慧小可" 
          creatorAvatar="/assets/zhengjian.png"
          link={paths.chat.yuelao}  // 聊天页面路径
          sceneLink={yuelaoSceneLink}  // 剧情模式路径
        />
      </Grid>
      <Grid xs={12} sm={6} display="flex" justifyContent="center">
        <InfoCard 
          sx={{
            height: { xs: 'auto', sm: 'auto' },
            maxWidth: { xs: '100%', sm: '500px' },
            width: '100%',
            padding: { xs: '8px', sm: '16px' },
            '& img': {
              width: { xs: '80px', sm: '100px' },
              height: { xs: '80px', sm: '100px' },
            },
            '& .MuiTypography-h5': {
              fontSize: { xs: '1rem', sm: '1.25rem' },
            },
            '& .MuiTypography-body2': {
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }
          }} 
          image="/assets/红娘.png" 
          title="红娘" 
          description="红娘的形象在文学作品中经历了从模糊到具体的发展过程，‌从《‌莺莺传》‌中的次要角色，‌到《‌西厢记》‌中的..."
          tags={['传统文化', '情感']} 
          creator="慧小可" 
          creatorAvatar="/assets/zhengjian.png"
          link={paths.chat.hongniang}  // 聊天页面路径
          sceneLink={hongniangSceneLink}  // 剧情模式路径
        />
      </Grid>
      <Grid xs={12} sm={6} display="flex" justifyContent="center">
        <InfoCard 
          sx={{
            height: { xs: 'auto', sm: 'auto' },
            maxWidth: { xs: '100%', sm: '500px' },
            width: '100%',
            padding: { xs: '8px', sm: '16px' },
            '& img': {
              width: { xs: '80px', sm: '100px' },
              height: { xs: '80px', sm: '100px' },
            },
            '& .MuiTypography-h5': {
              fontSize: { xs: '1rem', sm: '1.25rem' },
            },
            '& .MuiTypography-body2': {
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }
          }} 
          image="/assets/熊二.jpg" 
          title="熊二" 
          description="光头强，你又来砍树！"
          tags={['动漫', '幽默']} 
          creator="慧小可" 
          creatorAvatar="/assets/zhengjian.png"
          link={paths.chat.xionger}  // 聊天页面路径
          sceneLink={xiongerSceneLink}  // 剧情模式路径
        />
      </Grid>
    </Grid>
  );
}
