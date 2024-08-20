/**
 * 这个文件包含了一个名为AccountDetailsForm的React函数组件。
 * AccountDetailsForm组件用于渲染一个用户账户详情表单。
 * 表单包含了用户的个人信息，如姓名、邮箱、电话号码等。
 * 用户可以编辑表单中的信息，并保存修改后的详情。
 */

'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';

const provinces = [
  { label: '北京', value: '北京' },
  { label: '天津', value: '天津' },
  { label: '上海', value: '上海' },
  { label: '重庆', value: '重庆' },
  { label: '河北', value: '河北' },
  { label: '山西', value: '山西' },
  { label: '辽宁', value: '辽宁' },
  { label: '吉林', value: '吉林' },
  { label: '黑龙江', value: '黑龙江' },
  { label: '江苏', value: '江苏' },
  { label: '浙江', value: '浙江' },
  { label: '安徽', value: '安徽' },
  { label: '福建', value: '福建' },
  { label: '江西', value: '江西' },
  { label: '山东', value: '山东' },
  { label: '河南', value: '河南' },
  { label: '湖北', value: '湖北' },
  { label: '湖南', value: '湖南' },
  { label: '广东', value: '广东' },
  { label: '海南', value: '海南' },
  { label: '四川', value: '四川' },
  { label: '贵州', value: '贵州' },
  { label: '云南', value: '云南' },
  { label: '陕西', value: '陕西' },
  { label: '甘肃', value: '甘肃' },
  { label: '青海', value: '青海' },
  { label: '台湾', value: '台湾' },
  { label: '内蒙古', value: '内蒙古' },
  { label: '广西', value: '广西' },
  { label: '西藏', value: '西藏' },
  { label: '宁夏', value: '宁夏' },
  { label: '新疆', value: '新疆' },
  { label: '香港', value: '香港' },
  { label: '澳门', value: '澳门' }
] as const;



export function AccountDetailsForm(): React.JSX.Element {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="信息可以编辑" title="个人资料" />
        <Divider />
        <CardContent>
        <Grid container spacing={3}>
          <Grid md={6} xs={12}>
            <FormControl fullWidth required>
              <InputLabel>昵称</InputLabel>
              <OutlinedInput defaultValue="慧小可用户" label="nickname" name="nickname" />
            </FormControl>
          </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>邮箱地址</InputLabel>
                <OutlinedInput label="Email address" name="email" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>电话号码</InputLabel>
                <OutlinedInput label="Phone number" name="phone" type="tel" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>省</InputLabel>
                <Select label="Province" name="province" variant="outlined">
                  {provinces.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>市</InputLabel>
                <OutlinedInput label="City" />
              </FormControl>
            </Grid>
            {/* 新增详细街道地址的输入框 */}
          <Grid md={12} xs={12}>
            <FormControl fullWidth>
              <InputLabel>详细街道地址</InputLabel>
              <OutlinedInput label="streetAddress" name="streetAddress" />
            </FormControl>
          </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">保存资料</Button>
        </CardActions>
      </Card>
    </form>
  );
}
